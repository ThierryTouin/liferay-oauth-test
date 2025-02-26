import React from 'react';
import App from './App';
import { createRoot, Root } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { getAppCustomConfig, defaultAppCustomConfig } from './services/customConfigService';

// Define the custom element ID
const ELEMENT_ID = 'app3-docker-example';
const CONF_ELEMENT_ID = 'config';

// Define WebComponent class, extending HTMLElement
class WebComponent extends HTMLElement {
  // Declare root as a ReactRoot element, making it optionally undefined
  private root: Root | undefined;

  // Lifecycle method when the element is added to the DOM
  connectedCallback(): void {

    const appCustomConfig = getAppCustomConfig(CONF_ELEMENT_ID);

    this.root = createRoot(this);
    this.root.render(<App appCustomConfig={appCustomConfig || defaultAppCustomConfig} />);

  }

  // Lifecycle method when the element is removed from the DOM
  disconnectedCallback(): void {
    if (this.root) { // Check if root exists before unmounting
      this.root.unmount();
      delete this.root; // Now it is safe to delete
    }
  }
}

// Register the custom element if it hasn't been registered yet
if (!customElements.get(ELEMENT_ID)) {
  console.log('Registering ' + ELEMENT_ID + ' as custom element');
  customElements.define(ELEMENT_ID, WebComponent);
} else {
  console.log('Skipping registration for ' + ELEMENT_ID + ' (already registered)');
}

// Optionally, you can use the below code to mount React in a regular element:
// const root = ReactDOM.createRoot(document.getElementById('root')!);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// Measure performance if needed
reportWebVitals();
