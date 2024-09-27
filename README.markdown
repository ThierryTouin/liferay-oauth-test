## Start Runtime
```
startAll.sh
```

## Accès 
### Liferay
```





```

### Accès 

| Service             | Title   | Links |
| --------        | ------- | -------                                                        |
| Portail         | http://portal.dev.local              | Kong administration |
| App ReactJS     | http://app1.dev.local:3007           | Unsecured |
|                 | https://app1.dev.local:3008          | Secured |
| Keycloak        | http://sso.dev.local:8080            | Unsecured |
|                 | https://ssof.dev.local:8043          | Secured |
| Kong GUI        | http://apim.dev.local:8002           | Kong administration |
| Cities          | https://apim.dev.local:8443/cities   | Returned the headers of original request has a response |
| Debug            | http://apim.dev.local:8800/debug/get    | Returned all french cities using the public french government API |

## Configuration

### Add in hosts file :
```
127.0.0.1	portal.dev.local
127.0.0.1	sso.dev.local ssof.dev.local
127.0.0.1	mail.dev.local
127.0.0.1	apim.dev.local
127.0.0.1	app1.dev.local
```

### Install licence only after the first start

```
./install-licence.sh "/mnt/c/Soft/_binaries/Liferay/activation-key-dxpdevelopment-7.4-developeractivationkeys.xml"
```

## Pour générer les certificat, nous utilisons un service dans le docker compose

```
./scripts/gen-certicate.sh
```

ou alors directement une commande du type :

```
docker run -v $PWD:/root/.local/share/mkcert brunopadz/mkcert-docker:latest \
/bin/sh -c "mkcert -install && \
mkcert -cert-file /root/.local/share/mkcert/mkcert.pem \
-key-file /root/.local/share/mkcert/mkcert.key localhost.dev"
```

## Pour test
https://github.com/tnishada/keycloak-react-js-example/blob/master/src/App.js
https://developers.onelogin.com/quickstart/authentication/react
https://github.com/onelogin/onelogin-oidc-react/blob/master/src/api/oidcApi.js
https://slash-root.fr/keycloak-installation-avec-docker-et-reverse-proxy-ssl-nginx/


