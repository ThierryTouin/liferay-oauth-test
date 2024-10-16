## Architectures

### Traefik network

```mermaid
graph  LR

%% Nodes

RProxy[Traefik<br>traefik.dev.local]
Portal[Liferay<br>portal.dev.local]
Apim[Apim<br>apim.dev.local]
C([client])
SSO([Keycloak<br>sso.dev.local])


%% Links	

C -- https --> RProxy;
subgraph Environement
    RProxy -- http --> SSO;
    RProxy -- http --> Portal;
    RProxy -- http --> Apim;
end

%% Defining node styles

  classDef plain fill:#ddd,stroke:#fff,stroke-width:4px,color:#000;
  classDef k8s fill:#326ce5,stroke:#fff,stroke-width:4px,color:#fff;
  classDef cluster fill:#fff,stroke:#bbb,stroke-width:2px,color:#326ce5;
  
%% Assigning styles to nodes

  class Portal,SSO,Apim k8s;
  class C plain;
  class RProxy cluster;
```

### Oauth system

```mermaid

graph  LR

%% Nodes

APP1[ReactJS<br>app1.dev.local:3008]
Portal[Liferay<br>portal.dev.local]
APIM[Kong<br>apim.dev.local:8443]
API[API]
C([client])
SSO([Keycloak<br>sso.dev.local])


%% Links	

C <--> APP1 ;
C <--> Portal ;
subgraph Environement
    APP1 <--> SSO;
	APP1 <--> APIM;
	APIM <--> SSO;
	Portal <--> SSO;
	%%APP1-.servi par.-SRV;
end

APIM <--> API;

%% Defining node styles

  classDef plain fill:#ddd,stroke:#fff,stroke-width:4px,color:#000;
  classDef k8s fill:#326ce5,stroke:#fff,stroke-width:4px,color:#fff;
  classDef cluster fill:#fff,stroke:#bbb,stroke-width:2px,color:#326ce5;
  
%% Assigning styles to nodes

  class Portal,APP1,APIM,API,SSO k8s;
  class C plain;
  class cluster cluster;
	


```
## Start Runtime
```
startAll.sh
```

## Accès 
### Liferay



### Accès 

| Service             | Title   | Links |
| --------        | ------- | -------                                                        |
| Portail         | https://portal.dev.local              | |
| App ReactJS     | https://app1.dev.local:3008          |  |
| Keycloak        | https://sso.dev.local            |  |
| Kong GUI        | http://apim.dev.local:8002           | Kong administration |
| Cities          | https://apim.dev.local/cities   | Returned the headers of original request has a response |
| Debug           | https://apim.dev.local/debug/get    | Returned all french cities using the public french government API |
| Traefik         | https://traefik.dev.local            |  traefikadmin / traefikadmin |
| Mail            | http://localhost:5000            |  smtp4dev |






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
./install-licence.sh "/mnt/disque1/Soft/_binaries/Liferay/activation-key-dxpdevelopment-7.4-developeractivationkeys2.xml"
```

## Test communication from container to another
```
docker exec -it lfroauth-liferay sh -c "curl -k -v https://sso.dev.local"
```
## A garder
https://sso.dev.local/realms/Liferay/.well-known/openid-configuration


## Pour test
https://github.com/tnishada/keycloak-react-js-example/blob/master/src/App.js
https://developers.onelogin.com/quickstart/authentication/react
https://github.com/onelogin/onelogin-oidc-react/blob/master/src/api/oidcApi.js
https://slash-root.fr/keycloak-installation-avec-docker-et-reverse-proxy-ssl-nginx/
https://stackoverflow.com/questions/51132711/introspection-endpoint-of-keycloak-server





