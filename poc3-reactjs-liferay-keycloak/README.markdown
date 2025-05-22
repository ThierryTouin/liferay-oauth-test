
## 1. Technical Solution

This demo showcases Liferay's ability to integrate a React application using a web component. Some of React applications obtains the OAuth security token using the silent mode. Technically, this involves acquiring a token via an invisible iframe, assuming the user is already logged in (i.e., the user has successfully entered their login/password on the SSO server).

This scenario also demonstrates the use of a shared library for all React applications, using Lerna and Webpack allowing for :
- Share common context between alls Aps
- Share simple components
- Share oauth components

This also demonstrates 
- Inclusion of web component inside web component
- Liferay integration using custom fragment

#### 1. Architecture

```mermaid

graph LR

%% Nodes

APPS[App1 App2 App3 - ReactJS<br>apps.dev.local]
Portal[Portal - Liferay<br>portal.dev.local]
APIM[APIM - Kong<br>apim.dev.local]
API[Public API]
C([Browser])
SSO([SSO - Keycloak<br>sso.dev.local])

%% Links	

  C <--> Portal
  APPS <--> SSO
  APPS <--> APIM
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
    APPS
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
APPS -.Resources server .-> Portal

%% Token Validation Legend
APIM -. Token validation .-> SSO

%% Defining node styles
classDef plain fill:#ddd,stroke:#fff,stroke-width:4px,color:#000
classDef k8s fill:#326ce5,stroke:#fff,stroke-width:4px,color:#fff
classDef cluster fill:#fff,stroke:#bbb,stroke-width:2px,color:#326ce5

%% Assigning styles to nodes
class Portal,APPS,APIM,API,SSO k8s
class C plain
class cluster cluster
```

#### 2. Applications description

##### App1

* Standard Open Id Connect integration using Keycloak (Silent Mode used when deployed inside Liferay)
* Using standard React Router (HashRouter)
* Integrated in Liferay as REMOTE APP using OSGI configuration : see com.liferay.client.extension.type.configuration.CETConfiguration_app1-docker-example.config

  ![Liferay Integration](./images/liferay-integration-app1.png "Liferay Integration")

* Served in Dedicated Nginx container using dedicated hostname 
![Nginx App1](./images/nginx-app1.png "Nginx App1")

| URL                       | Liferay Integration | Stack         | Common Library | Web Component | Lerna | OIDC |
|---------------------------|---------------------|---------------|----------------|---------------|-------|------|
| `https://app1.dev.local`  | Yes                 | React, Webpack| Yes            | Yes           | Yes   |Yes

##### App2

* Very simple application  designed to be integrated as Web Component to App3
* This receive data from APP3 using shared context.
* Integrated in Liferay as REMOTE APP using OSGI configuration : see com.liferay.client.extension.type.configuration.CETConfiguration_app2-docker-example.config

  ![Liferay Integration](./images/liferay-integration-app2.png "Liferay Integration")

* Served in Dedicated Nginx container using dedicated hostname 
![Nginx App2](./images/nginx-app2.png "Nginx App2")

| URL                       | Liferay Integration | Stack         | Common Library | Web Component | Lerna | OIDC |
|---------------------------|---------------------|---------------|----------------|---------------|-------|------|
| `https://app2.dev.local`  | Yes                 | React, Webpack| Yes            | Yes           | Yes   |No


##### App3

An evolution of APP1

* Standard Open Id Connect integration using Keycloak (Silent Mode used when deployed inside Liferay)
* Using standard React Router (HashRouter)
* This application include APP3 as Web Component. 
* This application is able to receive parameters from Liferay and then send it to APP2
* Integrated in Liferay as FRAGMENT using custom library implementation to include 3rd party resources.Fragment implementation is available in Liferay workspace inside site initializer client extension.
  ![Liferay Integration](./images/liferay-integration-app3.png "Liferay Integration")

* Served in Dedicated Nginx container using dedicated hostname 
![Nginx App3](./images/nginx-app2.png "Nginx App3)

| URL                       | Liferay Integration | Stack         | Common Library | Web Component | Lerna | OIDC |
|---------------------------|---------------------|---------------|----------------|---------------|-------|------|
| `https://app3.dev.local`  | Yes                 | React, Webpack| Yes            | Yes           | Yes   |Yes

##### App4

App4 provide great integration inside Liferay using js-maps without having to store source code in a Liferay workspace. The generated bundle.js is copied in Liferay workspace inside poc3-app4-js-map client extension

* Integrated in Liferay as FRAGMENT using standard js-map client extension. Custom Fragment implementation is available in Liferay workspace inside site initializer client extension.
  ![Liferay Integration](./images/liferay-integration-app4.png "Liferay Integration")
* Served in Dedicated Nginx container using dedicated hostname 
![Nginx App4](./images/nginx-app4.png "Nginx App4)
* The application is hosted in Liferay (not in using Nginx)

| URL                       | Liferay Integration | Stack         | Common Library | Web Component | Lerna | OIDC |
|---------------------------|---------------------|---------------|----------------|---------------|-------|------|
| Not Available  | Yes                 | React, Webpack| Yes            | Yes           | Yes   |No


## 2. Initial Setup 

see [Initial Setup](../README.markdown#2-initial-setup)

## 3. Get started

### Production mode / First start 

#### Start all containers stack
```
$ cd ./poc3-reactjs-liferay-keycloak
$ build.sh
$ start.sh
```

### Development mode

This environment support 2 modes

#### Option 01 - Detached mode 

This mode allow to develop apps without Liferay using standard npm development server.

##### 1. Start 3rd party dependencies
```
$ cd ./poc3-reactjs-liferay-keycloak/runtime/scripts
$ ./start-apps-dependencies.sh
```
##### 2. Start application
```
$ cd ./poc3-reactjs-liferay-keycloak/sources/front-end/packages/<APP_NAME>
$ npm run start
```
A browser is opened automatically showing the application

#### Option 02 - Runtime mode

This mode allow to develop apps without Liferay but deploying inside docker-compose stack. This method is usefull if you need to work on several applications at the same time.

##### 1. Start app server and 3rd party dependencies
```
$ cd ./poc3-reactjs-liferay-keycloak/runtime/scripts
$ ./start-apps.sh
```
##### 2. build application
```
$ cd ./poc3-reactjs-liferay-keycloak/sources/front-end
$ ./frontend.sh refresh ../
```
To see all available option from command manual : 

```
$ ./frontend.sh
Available commands:
  clean <path> [module]   : Deletes 'node_modules', 'build', and 'package-lock.json' in directories with a package.json. The 'module' parameter is optional.
  npmInstall <path>       : Executes 'npm install --no-cache' in directories with a package.json.
  build <path> [module]   : Deletes existing output folder and executes 'npm run build' in all directories containing a package.json. The 'module' parameter is optional.
  rebuild <path> [module] : Build all apps cleaning the output directory before. The 'module' parameter is optional.
  refresh <path>          : Executes clean, install, and build.
  deployApps <path>       : Deploy apps to docker-compose containers.
  help                    : Displays this help message.
```

##### 3. deploy application
```
cd ./poc3-reactjs-liferay-keycloak/sources/front-end
./frontend.sh deployApps ../
```
It is also possible to build a single app using : 
```
./frontend.sh deployApps ../ <app_name> 
```
ex : ./frontend.sh deployApps ../ app1

#### 4. Access application uding domain
Open ./poc3-reactjs-liferay-keycloak/index.html and then click on the application URL you want to use. Modify the app and then repeat step 2 and 3 to build and redeploy it.

### Usefull commands & tips
#### Gracefully stops all containers
```
cd ./poc3-reactjs-liferay-keycloak/runtime/scripts
stop-all.sh

```
#### Clean current compose containers, images and volumes
Be aware this action deletes all datas stored in volumes
```
cd ./poc3-reactjs-liferay-keycloak/runtime/scripts
clean-all.sh

```

## 3. React application 

#### 1. Applications description

Start project and see description available in each application source code.

#### 2. Required adaptations

##### 1. Applications

###### 1. Declaring Web Component

To convert your React app into a Web Component, follow these steps:

Files to Modify

    src/index.js
        Declare an use Web Component see :
        ```
        /home/dev/git/liferay-oauth-test/poc3-reactjs-liferay-keycloak/runtime/front-end/react-app/src/index.js
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








## 0. Todo List (To be deleted)

### 1. Tasks (TODO)
- Embedding a custom Element in Liferay using fragments => WIP
- Export sample site using site-initializer => Not Working
- APP2 is not wortking in APP1 when deployed inside Liferay
- Including MUI and I8N in another sample app
- Deploying APP1 in Liferay using OSGI/configs files (APP1 contains APP2)
- Pocking slots using dedicated app : https://fr.javascript.info/slots-composition
- Using portal Language to automatically setup the react app to load it properly")
- Try to put app twice in page

### 2. Tasks (Standby)
- Switch language
- I8N
- Split bundle.js => https://learn.liferay.com/w/dxp/liferay-development/customizing-liferays-look-and-feel/bundling-resources-in-a-javascript-import-map-entry-client-extension/javascript-import-map-entry-yaml-configuration-reference#usage-details
- Centralized logout & 

### 3. Resources
- Limit number of generated chunks : https://medium.com/@glennreyes/how-to-disable-code-splitting-in-webpack-1c0b1754a3c5
- Passing parameter to Web Component : https://sinhapiyush.hashnode.dev/share-data-between-web-components

### Principe de Lerna 
le node_module de l'application est vide car c'est le node_module racine qui est utilisé via un lien symbolique
Il est possible de définir des dépendances locale à l'application. Dans ce cas le répertoire node_module de l'app contiendra ces dépendances.

npm install --workspace packages/app1

npx lerna run build

npx lerna run build --stream

npm clean-install
