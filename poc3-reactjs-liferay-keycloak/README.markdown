## 0. Todo List (To be deleted)

### 1. Tasks (TODO)
- Pocking slots using dedicated app : https://fr.javascript.info/slots-composition
- Using jsMaps to importing javascript loader : JS seems to be imported correctly but an error is displayed in console
![Corruped content error](../images/toDelete.png "Corruped content error")

### 2. Tasks (Standby)
- Switch language
- I8N
- Split bundle.js => https://learn.liferay.com/w/dxp/liferay-development/customizing-liferays-look-and-feel/bundling-resources-in-a-javascript-import-map-entry-client-extension/javascript-import-map-entry-yaml-configuration-reference#usage-details
- Centralized logout & 

### 3. Resources
- Limit number of generated chunks : https://medium.com/@glennreyes/how-to-disable-code-splitting-in-webpack-1c0b1754a3c5
- Passing parameter to Web Component : https://sinhapiyush.hashnode.dev/share-data-between-web-components

### Principe de Lerna 
le node_module de l'application est vide car c'est le node_module racine qui est utilisé via un lien symolique
Il est possible de définir des dépendances locale à l'application. Dans ce cas le répertoire node_module de l'app contiendra ces dépendance.

npm install --workspace packages/app1

npx lerna run build

npx lerna run build --stream

npm clean-install
