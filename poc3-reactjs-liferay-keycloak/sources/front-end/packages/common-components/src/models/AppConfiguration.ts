import { ProvidedAppConfiguration } from "./ProvidedAppConfiguration";

//This interface is designed to contain all parameters generics and those specific to an application
export interface AppConfiguration extends ProvidedAppConfiguration {
    appCustomConfig: any // Contain specific app parameters (valid params for a single app but not for others)
}