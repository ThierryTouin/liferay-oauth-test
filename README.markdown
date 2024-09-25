## Start Runtime
```
startAll.sh
```

## Accès 
### Liferay
```
http://portal.dev.local
http://app1.dev.local:3007
```

### APIM / API

| Service             | Title   | Links |
| --------         | ------- | -------                                                        |
| Kong GUI         | http://apim.dev.local:8002              | Kong administration |
| Cities           | https://apim.dev.local:8443/cities      | Returned the headers of original request has a response |
| Debug            | http://apim.dev.local:8800/debug/get    | Returned all french cities using the public french government API |

## Configuration

### Add in hosts file :
```
127.0.0.1	portal.dev.local
127.0.0.1	sso.dev.local
127.0.0.1	mail.dev.local
127.0.0.1	apim.dev.local
127.0.0.1	app1.dev.local
```

### Install licence only after the first start

```
./install-licence.sh "/mnt/c/Soft/_binaries/Liferay/activation-key-dxpdevelopment-7.4-developeractivationkeys.xml"
```

## Pour test
https://github.com/tnishada/keycloak-react-js-example/blob/master/src/App.js
https://developers.onelogin.com/quickstart/authentication/react
https://github.com/onelogin/onelogin-oidc-react/blob/master/src/api/oidcApi.js



