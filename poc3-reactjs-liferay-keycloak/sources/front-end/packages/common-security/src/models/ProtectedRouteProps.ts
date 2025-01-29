import { ReactNode } from "react";
import { AuthContextProps } from "react-oidc-context";

export interface ProtectedRouteProps {
    children: ReactNode;
    oidc: AuthContextProps;
}