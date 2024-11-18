## 1. Technical Solution

This demo is based on a purely SSO integration, meaning the demo application (APP1) is not integrated into Liferay. Both systems, Liferay and APP1, are connected to the same SSO server, which manages authentication. APP1 obtains a token from the SSO and uses it to access the API through the APIM, which validates the token with the same SSO.

#### 1. Architecture

```mermaid

graph  LR

%% Nodes

APP1[App1 - ReactJS<br>app1.dev.local]
Portal[Portal - Liferay<br>portal.dev.local]
APIM[APIM - Kong<br>apim.dev.local]
API[Public API]
C([client])
SSO([SSO - Keycloak<br>sso.dev.local])


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
## 2. Initial Setup 

see [Initial Setup](../README.markdown#2-initial-setup)

## 3. Usefull commands & tips

#### Start all containers stack
```
cd ./poc1-reactjs-liferay-keycloak/runtime/scripts
start-all.sh

```

#### Clean current compose containers, images and volumes
```
cd ./poc1-reactjs-liferay-keycloak/runtime/scripts
clean-all.sh

```

#### Test communication between containers
```
docker exec -it lfroauth-portal sh -c "curl -k -v https://sso.dev.local"
```








