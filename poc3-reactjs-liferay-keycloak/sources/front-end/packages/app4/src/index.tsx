import React from 'react';
import App from './App';
import { createRoot, Root } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// Define the custom element ID
const ELEMENT_ID = 'app4-docker-example';

// Define WebComponent class, extending HTMLElement
export class App4DockerExample extends HTMLElement {

  // Declare root as a ReactRoot element, making it optionally undefined
  private root: Root | undefined;


  // Lifecycle method when the element is added to the DOM
  connectedCallback(): void {
    this.root = createRoot(this);
    this.root.render(<App />);

    console.log('APP4 : Web Component Connected');
  }

  // Méthode du cycle de vie lorsque l'élément est retiré du DOM
  disconnectedCallback(): void {
    if (this.root) { // Vérifier si root existe avant de démonter
      this.root.unmount();
      delete this.root; // Now it is safe to delete
    }
    console.log('APP4 : Web Component disconnected');
  }


}

// Enregistrer l'élément personnalisé s'il n'a pas encore été enregistré
if (!customElements.get(ELEMENT_ID)) {
  console.log('Registering ' + ELEMENT_ID + ' as custom element');
  customElements.define(ELEMENT_ID, App4DockerExample);
} else {
  console.log('Skipping registration for ' + ELEMENT_ID + ' (already registered)');
}

// You can use this code to mount React to a regular component
// const root = ReactDOM.createRoot(document.getElementById('root')!);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// Mesurer les performances si nécessaire
reportWebVitals();
