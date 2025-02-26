## 0. Todo List (To be deleted)

### 1. Tasks (TODO)
- Pocking slots using dedicated app : https://fr.javascript.info/slots-composition
- Using current code to load JS files from a fragment see (https://github.com/mahmoudhtayem87/lr-slider) : 
 ** Manage this code in git 
 ** Replace   configElement.setAttribute('signInSilently', 'true'); with  configElement.setAttribute('signInSilently', '${theme_display.isSignedIn()}');

#### Html

```
<div id="app3-container" class="fragment_1">
 	[#assign isSignedIn = themeDisplay.isSignedIn() ]
	${isSignedIn?string}

</div>
<script>
loadScript('https://app3.dev.local/static/js/bundle.js', function() {
	
  // Créer et ajouter le Web Component au DOM après le chargement du script
  const app3DockerExample = document.createElement('app3-docker-example');
  
  // Créer et ajouter l'élément <config>
  const configElement = document.createElement('config');
  configElement.setAttribute('embedded', 'true');
	
	const signInSilently = '${isSignedIn?string}';
	console.debug("signInSilently:" + signInSilently);
  configElement.setAttribute('signInSilently', signInSilently);
  
  app3DockerExample.appendChild(configElement);

  // Ajouter le Web Component comme enfant de la div avec l'ID app3-container
  const container = document.getElementById('app3-container');
  if (container) {
    container.appendChild(app3DockerExample);
  } else {
    console.error('Aucun élément avec l\'ID "app3-container" trouvé.');
  }
  });
</script>
```

#### JS
```
export const loadScript = (url, callback) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Appeler le callback une fois que le script est chargé
  script.onload = function() {
    console.log(`Script ${url} chargé avec succès.`);
    callback();
  };

  // Gérer les erreurs de chargement
  script.onerror = function() {
    console.error(`Erreur lors du chargement du script ${url}.`);
  };

  document.head.appendChild(script);
}

window.loadScript = loadScript;


```

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
