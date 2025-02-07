import { ProvidedAppConfiguration } from "./ProvidedAppConfiguration";

export interface AppConfiguration extends ProvidedAppConfiguration {
    embeddedMode: boolean;
}