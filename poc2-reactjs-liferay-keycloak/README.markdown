
## 1. Technical Solution

This demo showcases Liferay's ability to integrate a React application using a web component through the mechanism called client extension. Some of React applications obtains the OAuth security token using the silent mode. Technically, this involves acquiring a token via an invisible iframe, assuming the user is already logged in (i.e., the user has successfully entered their login/password on the SSO server).

This scenario also demonstrates the use of a shared library for all React applications, allowing for :
- Share common context between alls Aps
- Share simple components
- Share oauth components

This scenario has a few issues, including :
1. Css code is embedded in JS (not in separate files) which is a design problem
2. Using shdow DOM and slots is not possible because CSS does not load properly because of problem 1
3. Over complex webpack configuration to make it work.

POC 3 should demonstrate the ability to solve these problems.

#### 1. Architecture

```mermaid

graph LR

%% Nodes
APP1[App1 - ReactJS<br>app1.dev.local]
APP2[App2 - ReactJS<br>app2.dev.local]
APP3[App3 - ReactJS<br>app3.dev.local]
Portal[Portal - Liferay<br>portal.dev.local]
APIM[APIM - Kong<br>apim.dev.local]
API[Public API]
C([Browser])
SSO([SSO - Keycloak<br>sso.dev.local])

%% Links	
  C <--> Portal
  APP1 <--> SSO
  APP2 <--> SSO
  APP1 <--> APIM
  APP2 <--> APIM
  APIM <--> SSO
  Portal <--> SSO

subgraph Environement
  subgraph Client
    C
  end
  subgraph Portal Layer
    Portal
  end
  subgraph Apps containers Layer
    APP1
    APP2
    APP3
  end
  subgraph Authorization Layer
    SSO
    APIM
  end
  subgraph API Layer
    API
  end
end

APIM <--> API

%% React Web Component Integration with Liferay
APP1 -. Web Component integration <br>Client extension .-> Portal
APP2 -. Web Component integration <br>Client extension .-> Portal
APP3 -. Web Component integration <br>Client extension .-> Portal

%% Token Validation Legend
APIM -. Token validation .-> SSO

%% Defining node styles
classDef plain fill:#ddd,stroke:#fff,stroke-width:4px,color:#000
classDef k8s fill:#326ce5,stroke:#fff,stroke-width:4px,color:#fff
classDef cluster fill:#fff,stroke:#bbb,stroke-width:2px,color:#326ce5

%% Assigning styles to nodes
class Portal,APP1,APP2,APP3,APIM,API,SSO k8s
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
| APP3                    | Empty React App in typescript |

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

