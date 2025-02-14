import { AppSharedContextParams } from './AppSharedContextParams';

export interface AppSharedContextProps {
    appSharedContextParams: AppSharedContextParams;
    setAppSharedContextParams: (params: AppSharedContextParams) => void;
}