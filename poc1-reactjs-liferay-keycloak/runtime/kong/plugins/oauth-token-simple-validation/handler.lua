local utils = require("kong.plugins.oauth-token-simple-validation.utils")
local http = require "resty.http"
local jwt = require "resty.jwt"
local cjson = require "cjson.safe"
local kong_meta = require "kong.meta"

local function validate_access_token(access_token, config)

  kong.log.info("Inside function ", "validate_access_token")
  kong.log.info("Received access_token ", access_token)

  local jwt_obj = jwt:load_jwt(access_token)
  kong.log.info("DECODED TOKEN : ", cjson.encode(jwt_obj))  

  --local exp = jwt_obj.exp
  --local time = os.time()

  --kong.log.info("Checking token expiration : ", exp .. "<=" .. time) 

  --if not jwt.active then
    --utils.exit(ngx.HTTP_UNAUTHORIZED, "The resource owner or authorization server denied the request.")
  --end

  --if exp <= time then error()
    --err = "token expired"
  --end 
  -- https://github.com/callistaenterprise/kong-plugin-token-introspection/blob/main/kong/plugins/token-introspection/handler.lua

  return jwt_obj
    
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
  local jwt_obj, err = validate_access_token(access_token, config)
  if err then
    kong.log.warn("Exiting with : ", ngx.HTTP_INTERNAL_SERVER_ERROR)
    utils.exit(ngx.HTTP_INTERNAL_SERVER_ERROR, "Authorization server error: " .. err)
  end

  -- Authorization successful, set headers based on information from access token
  -- utils.set_header("X-Credential-Scope", jwt.scope)
  -- utils.set_header("X-Credential-Client-ID", config.client_id)
  -- utils.set_header("X-Credential-Token-Type", jwt.typ)
  -- utils.set_header("X-Credential-Exp", jwt.exp)
  -- utils.set_header("X-Credential-Iat", jwt.iat)
  -- utils.set_header("X-Credential-Nbf", jwt.nbf)
  -- utils.set_header("X-Credential-Sub", jwt.sub)
  -- utils.set_header("X-Credential-Aud", jwt.aud)
  -- utils.set_header("X-Credential-Iss", jwt.iss)
  -- utils.set_header("X-Credential-Jti", jwt.jti)
  
  -- Optionally remove token and certificate headers
 --if config.hide_credentials then
    --utils.clear_header(config.token_header)
    --utils.clear_header(config.certificate_header)
  --end
end

kong.log.info("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX88", "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

return TokenValidationHandler