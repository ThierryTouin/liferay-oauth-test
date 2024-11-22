## 0. Todo (To be deleted)
1. CSS files not loaded
2. Follow requests and understand underlying behavior
3. Centralized logout 
4. Testing multiple application in portal


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

## 3. React application required adaptations

#### 1. Declaring Web Component

To convert your React app into a Web Component, follow these steps:

Files to Modify

    src/index.js
        Declare an use Web Component see :
        ```
        /home/dev/git/liferay-oauth-test/poc2-reactjs-liferay-keycloak/runtime/front-end/react-app/src/index.js
        ```

    public/index.html (for usage)
        Include use the custom Web Component tag.

#### 2. Adapting Webpack Configuration for Liferay Compatibility

Liferay does not support chunks with variable file names. To ensure compatibility, we modified the React app's Webpack configuration to bundle all JavaScript into a single bundle.js file across all environments. This was achieved using react-app-rewired to override the default Webpack configuration without ejecting.

The following changes were made:

    Used react-app-rewired to modify Webpack settings.
    Disabled code splitting in Webpack.
    Ensured all JavaScript files are merged into one, named bundle.js.

This adjustment ensures that Liferay can properly load and render the React app without issues related to dynamic chunk file names.

#### 3. Important: Use HashRouter for Liferay Compatibility

Liferay does not fully support `BrowserRouter` due to its clean URL routing, which conflicts with Liferay's own URL management system. To ensure proper navigation and integration within Liferay, you must use `HashRouter`, which relies on fragment-based routing (e.g., `http://example.com/#/route`). This avoids conflicts and ensures seamless functionality. Update your routing setup and any relevant URLs (e.g., `silent_redirect_uri`) to include hash fragments, and test thoroughly to prevent navigation issues. Using `BrowserRouter` may lead to broken routes and unexpected behavior within the Liferay environment.









