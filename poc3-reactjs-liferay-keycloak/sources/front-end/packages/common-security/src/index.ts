
// Services section
export { buildAppConfiguration, getAuthConfiguration } from './services/configService';

// Components section
export { CustomOIDCAuthProvider } from './components/CustomOIDCAuthProvider';
export { MFEAppContainer } from './components/MFEAppContainer';
    // React Context
export { AppProvider, useAppContext } from './components/context/AppContext';

// Models section
export { AppConfiguration } from './models/AppConfiguration';
export { ProvidedAppConfiguration } from './models/ProvidedAppConfiguration';
export { CustomOIDCAuthProviderProps } from './models/CustomOIDCAuthProviderProps';
export { MFEAppContainerProps } from './models/MFEAppContainerProps';
export { DefaultAppRouterProps } from './models/DefaultAppRouterProps';
export { CustomRouteProps } from './models/CustomRouteProps';

// Routes section
export { DefaultAppRouter } from './routes/DefaultAppRouter';
export { ErrorMessage } from './routes/ErrorMessage';

//
//export { Portal } from './utils/Portal';