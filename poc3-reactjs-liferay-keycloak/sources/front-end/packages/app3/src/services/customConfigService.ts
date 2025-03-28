import { App3CustomConfig } from '../models/App3CustomConfig';

const DEFAULT_EMBEDDED = false;
const DEFAULT_SIGN_IN_SILENTLY = false;
const DEFAULT_PAYLOAD_COLOR = 'green';

const defaultAppCustomConfig: App3CustomConfig = {
  embedded: DEFAULT_EMBEDDED,
  signInSilently: DEFAULT_SIGN_IN_SILENTLY,
  payloadColor: DEFAULT_PAYLOAD_COLOR
};

export function getDefaultAppCustomConfig(): App3CustomConfig {
  return defaultAppCustomConfig;
}

export function getDefaultPayloadColor(): string {
  return DEFAULT_PAYLOAD_COLOR;
}

export function getAppCustomConfig(elementId: string): App3CustomConfig | undefined {

  let config: App3CustomConfig;
  const configElement = document.querySelector(elementId);

  if (configElement) {

    let payloadColor = configElement.getAttribute('payloadColor');
    if (!payloadColor) {
      payloadColor = getDefaultPayloadColor();
    }
    
    config = {
      embedded: configElement.getAttribute('embedded') === 'true',
      payloadColor: String(payloadColor),
      signInSilently: configElement.getAttribute('signInSilently') === 'true'
    };

  } else {
    console.debug(`No <${elementId}> element found.`);
    config = defaultAppCustomConfig;
  }

  console.debug('Current AppCustomConfig used by app :', config);
  return config;

}



