import { ReactNode } from "react";

export interface MFEAppContainerProps {
    appId:string;
    titleText:string;
    imageUrl:string;
    children?: ReactNode; // Optional children prop for rendering nested elements
}
