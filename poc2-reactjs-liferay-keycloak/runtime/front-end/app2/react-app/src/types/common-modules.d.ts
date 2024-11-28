declare module 'common-modules' {

    import { ReactNode } from "react";
    export const DefaultRoutes: React.FC<{ routes: { path: string; element: ReactNode }[] }>;
    
}
  