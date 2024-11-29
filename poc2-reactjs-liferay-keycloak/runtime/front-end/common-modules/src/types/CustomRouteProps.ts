export interface CustomRouteProps {
    path: string;
    element: JSX.Element;
    protected?: boolean;  // Optionnel : Indique si la route est protégée
  }