//In order to keep portal in js 
declare module './utils/Portal' {
    export class Portal {
      static isInPortal(): boolean;
      static isPortalSignedIn(): boolean;
    }
}