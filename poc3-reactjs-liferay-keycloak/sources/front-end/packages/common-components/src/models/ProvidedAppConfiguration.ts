//This interface is designed to contain all generic parameters needed by common-component
export interface ProvidedAppConfiguration {
    appId: string;
    appDomain: string;
    appImagesCompleteUrl:string;
    appVersion: string;
    embedded: boolean;
    signInSilently: boolean;
}