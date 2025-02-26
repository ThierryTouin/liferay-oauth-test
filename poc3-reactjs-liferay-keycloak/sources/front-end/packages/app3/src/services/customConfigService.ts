import { AppCustomConfig } from '../models/AppCustomConfig';

export const defaultAppCustomConfig: AppCustomConfig = {
  embedded: false,
  signInSilently: false
};

export function getAppCustomConfig(elementId: string): AppCustomConfig | undefined {

  let config: AppCustomConfig;
  const configElement = document.querySelector(elementId);

  if (configElement) {
    config = {
      embedded: configElement.getAttribute('embedded') === 'true',
      signInSilently: configElement.getAttribute('signInSilently') === 'true'
    };
  } else {
    console.debug(`No <${elementId}> element found.`);
    config = defaultAppCustomConfig;
  }

  console.debug('Current AppCustomConfig used by app :', config);
  return config;

}



