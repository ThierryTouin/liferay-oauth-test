## 1. Technical Solution

This demo showcases Liferay's ability to integrate a React application using a web component through the mechanism called client extension. The React application obtains the OAuth security token using the silent mode. Technically, this involves acquiring a token via an invisible iframe, assuming the user is already logged in (i.e., the user has successfully entered their login/password on the SSO server).

#### 1. Architecture

```mermaid

graph LR

%% Nodes
APP1[App1 - ReactJS<br>app1.dev.local]
Portal[Portal - Liferay<br>portal.dev.local]
APIM[APIM - Kong<br>apim.dev.local]
API[Public API]
C([client])
SSO([SSO - Keycloak<br>sso.dev.local])

%% Links	
C <--> APP1
C <--> Portal

subgraph Environement
  APP1 <--> SSO
  APP1 <--> APIM
  APIM <--> SSO
  Portal <--> SSO
end

APIM <--> API

%% React Web Component Integration with Liferay
APP1 -. Web Component integration <br>Client extension .-> Portal

%% Token Validation Legend
APIM -. Token validation .-> SSO

%% Defining node styles
classDef plain fill:#ddd,stroke:#fff,stroke-width:4px,color:#000
classDef k8s fill:#326ce5,stroke:#fff,stroke-width:4px,color:#fff
classDef cluster fill:#fff,stroke:#bbb,stroke-width:2px,color:#326ce5

%% Assigning styles to nodes
class Portal,APP1,APIM,API,SSO k8s
class C plain
class cluster cluster
```

## 2. Initial Setup 

see [Initial Setup](../README.markdown#2-initial-setup)

## 3. Usefull commands & tips

#### Start all containers stack
```
cd ./poc2-reactjs-liferay-keycloak/runtime/scripts
start-all.sh

```

#### Clean current compose containers, images and volumes
```
cd ./poc2-reactjs-liferay-keycloak/runtime/scripts
clean-all.sh

```

#### Test communication between containers
```
docker exec -it lfroauth-portal sh -c "curl -k -v https://sso.dev.local"
```








