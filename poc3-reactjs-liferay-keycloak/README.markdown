## 0. Todo List (To be deleted)

### 1. Tasks (TODO)
- Maybe a POC 3 Moving to lerna and npm workspace and a single server to serve all js resources: https://docs.npmjs.com/cli/v10/using-npm/workspaces https://lerna.js.org/docs/getting-started#package-dependency-management https://www.velotio.com/engineering-blog/scalable-front-end-with-lerna-yarn-react
- Follow requests and understand duplicates
- Pocking slots using dedicated app : https://fr.javascript.info/slots-composition
- Use keycloakJS to avoid storing accessToken in local storage

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
Pour utiliser une dépendance globale dans app1 il faut définir dans le package.json la dépendance avec exactement la même version que celle définie au niveau du package.json global (redondant oui).

npm install --workspace packages/app1

npx lerna run build

npx lerna run build --stream

npm clean-install
