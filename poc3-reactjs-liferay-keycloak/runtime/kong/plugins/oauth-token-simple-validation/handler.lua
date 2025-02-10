local utils = require("kong.plugins.oauth-token-simple-validation.utils")
local http = require "resty.http"
local jwt = require "resty.jwt"
local cjson = require "cjson.safe"
local kong_meta = require "kong.meta"

local function get_public_key(realm_url)

  kong.log.info("Inside function ", "get_public_key")
  kong.log.info("Requesting :", realm_url)

  local httpc = http.new()
  local res, err = httpc:request_uri(realm_url, {
      method = "GET",
      ssl_verify = false
  })

  if not res then
      return nil, "Failed to request: " .. err
  end

  local keys = cjson.decode(res.body).keys

  kong.log.info("Received payload", cjson.encode(keys))

  for _, key in ipairs(keys) do
    if key.use == "sig" and key.kty == "RSA" and key.x5c and #key.x5c > 0 then
        local public_key = "-----BEGIN CERTIFICATE-----\n" ..
                           key.x5c[1] ..
                           "\n-----END CERTIFICATE-----"
        kong.log.info("Public Key:\n" .. public_key)
        return public_key
    end
  end

  return nil, "No suitable key found"
end

local function validate_access_token(access_token, config)

  kong.log.info("Inside function ", "validate_access_token")
  kong.log.info("Received access_token ", access_token)

  local publicKey, err = get_public_key(config.realms_certs_url);
  kong.log.info("Extracted sso public key ", publicKey)

  if publicKey then

    local jwt_obj = jwt:verify(publicKey, access_token)
    
    if not jwt_obj.verified then
      kong.log.err("JWT verification failed: " .. jwt_obj.reason)
      return false, jwt_obj.reason
    end

    local payload = jwt_obj.payload
    -- Expiration date verification
    if payload.exp and os.time() > payload.exp then
      return false, "Token has expired"
    end

    return true, jwt_obj.payload

  else 
    return false, "No suitable key found from " .. config.realms_certs_url
  end 

  return true, payload

end

local TokenValidationHandler = {
 VERSION = kong_meta.version:sub(1, -2),
 PRIORITY = 1100,
}

function TokenValidationHandler:access(config)

  kong.log.info("Inside function ", "TokenValidationHandler")
  local bearer_token = utils.get_header(config.token_header)
  if not bearer_token then
    kong.log.warn("Exiting with : ", ngx.HTTP_UNAUTHORIZED)
    utils.exit(ngx.HTTP_UNAUTHORIZED, "Unauthenticated.")
  end
  -- remove Bearer prefix
  kong.log.info("Bearer Token : ", bearer_token)
  local access_token, removed = string.gsub(bearer_token, "Bearer ", "", 1)
  if removed == 0 then
    kong.log.warn("Exiting with : ", ngx.HTTP_UNAUTHORIZED)
    utils.exit(ngx.HTTP_UNAUTHORIZED, "Unauthenticated.")
  end
  -- Validate token
  local isValid, result = validate_access_token(access_token, config)
  if isValid then
    kong.log.info("Token is valid : ", cjson.encode(result))
  else 
    kong.log.warn("Token is invalid : ", cjson.encode(result))
    kong.log.warn("Exiting with : ", ngx.HTTP_INTERNAL_SERVER_ERROR)
    utils.exit(ngx.HTTP_INTERNAL_SERVER_ERROR, "Authorization server error: " .. err)
  end

  -- Authorization successful, set headers based on information from access token
  utils.set_header("X-Credential-Scope", result.scope)
  utils.set_header("X-Credential-Client-ID", config.client_id)
  utils.set_header("X-Credential-Token-Type", result.typ)
  utils.set_header("X-Credential-Exp", result.exp)
  utils.set_header("X-Credential-Iat", result.iat)
  utils.set_header("X-Credential-Nbf", result.nbf)
  utils.set_header("X-Credential-Sub", result.sub)
  utils.set_header("X-Credential-Aud", result.aud)
  utils.set_header("X-Credential-Iss", result.iss)
  utils.set_header("X-Credential-Jti", result.jti)
  
  -- Optionally remove token and certificate headers
 --if config.hide_credentials then
    --utils.clear_header(config.token_header)
    --utils.clear_header(config.certificate_header)
  --end
end

return TokenValidationHandler