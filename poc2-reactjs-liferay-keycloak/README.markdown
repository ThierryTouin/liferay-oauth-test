## 0. Todo List (To be deleted)

### 1. Tasks (TODO)
- Pocking slots using dedicated app : https://fr.javascript.info/slots-composition
- Maybe a POC 3 Moving to lerna and npm workspace and a single server to serve all js resources: https://docs.npmjs.com/cli/v10/using-npm/workspaces https://lerna.js.org/docs/getting-started#package-dependency-management https://www.velotio.com/engineering-blog/scalable-front-end-with-lerna-yarn-react
- Follow requests and understand duplicates

### 2. Tasks (Standby)
- Switch language
- I8N
- Split bundle.js => https://learn.liferay.com/w/dxp/liferay-development/customizing-liferays-look-and-feel/bundling-resources-in-a-javascript-import-map-entry-client-extension/javascript-import-map-entry-yaml-configuration-reference#usage-details
- Centralized logout & 

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

## 3. React application 

#### 1. Applications description

| Application / Modules   | Description                                                                                                    |
| --------                | -------  
| common-modules          | Contain react components and classes to be used from 3rd party applications |
| APP1                    | React App in standard javascript, Transpiled in one single file |
| APP2                    | React App in typescript, Leverage code from common-modules, Transpiled in multiple files |

#### 2. Required adaptations

##### 1. Applications

###### 1. Declaring Web Component

To convert your React app into a Web Component, follow these steps:

Files to Modify

    src/index.js
        Declare an use Web Component see :
        ```
        /home/dev/git/liferay-oauth-test/poc2-reactjs-liferay-keycloak/runtime/front-end/react-app/src/index.js
        ```

    public/index.html (for usage)
        Include use the custom Web Component tag.

###### 2. Adapting Webpack Configuration for Liferay Compatibility

Liferay does not support chunks with variable file names. To ensure compatibility, we modified the React app's Webpack configuration to bundle all JavaScript into a single bundle.js file across all environments. This was achieved using react-app-rewired to override the default Webpack configuration without ejecting.

The following changes were made:

    Used react-app-rewired to modify Webpack settings.
    Disabled code splitting in Webpack.
    Ensured all JavaScript files are merged into one, named bundle.js.

This adjustment ensures that Liferay can properly load and render the React app without issues related to dynamic chunk file names.

###### 3. Important: Use HashRouter for Liferay Compatibility

Liferay does not fully support `BrowserRouter` due to its clean URL routing, which conflicts with Liferay's own URL management system. To ensure proper navigation and integration within Liferay, you must use `HashRouter`, which relies on fragment-based routing (e.g., `http://example.com/#/route`). This avoids conflicts and ensures seamless functionality. Update your routing setup and any relevant URLs (e.g., `silent_redirect_uri`) to include hash fragments, and test thoroughly to prevent navigation issues. Using `BrowserRouter` may lead to broken routes and unexpected behavior within the Liferay environment.

###### 4. Modify package.json to allow npm run start to run on default port in https

To enable the application to run over HTTPS on the default port (443), the following modifications were made to the `package.json` file:

`package.json` Changes

```json
"scripts": {
  // Prestart script ensures Node.js has permissions to bind to port 443
  "prestart": "sudo setcap 'cap_net_bind_service=+ep' $(which node)",

  // Start script configured for HTTPS with certificates
  "start": "PORT=443 HOST=app1.dev.local HTTPS=true SSL_CRT_FILE=../../../traefik/providers/files/app1.dev.local.crt SSL_KEY_FILE=../../../traefik/providers/files/app1.dev.local.key react-app-rewired start",

  // Build script
  "build": "react-app-rewired build",

  // Test script
  "test": "react-app-rewired test",

  // Eject script (use with caution, this will eject Webpack configuration)
  "eject": "react-app-rewired eject"
}
```

