export class Portal {
    /**
     * Checks if the application is running in a Liferay environment.
     * @returns {boolean} True if window.Liferay exists, otherwise false.
     */
    static isInPortal(): boolean {
        return typeof window !== 'undefined' && typeof (window as any).Liferay !== 'undefined';
    }

    /**
     * Checks if the user is signed in to the Liferay portal.
     * @returns {boolean} True if the user is signed in, otherwise false.
     */
    static isPortalSignedIn(): boolean {
        // Check if we are in a Liferay environment
        if (typeof window !== 'undefined' && (window as any).Liferay) {
            try {
                const Liferay = (window as any).Liferay;

                // Check if the function `Liferay.ThemeDisplay.isSignedIn` exists
                if (
                    Liferay.ThemeDisplay &&
                    typeof Liferay.ThemeDisplay.isSignedIn === 'function'
                ) {
                    // Call the `isSignedIn` function to check if the user is signed in
                    const signIn = Liferay.ThemeDisplay.isSignedIn();
                    if (signIn) {
                        console.debug("User is SIGNED IN in Liferay portal");
                    } else {
                        console.debug("User is UNSIGNED in Liferay portal");
                    }
                    return signIn;
                } else {
                    // Warn if the `isSignedIn` function is not available
                    console.warn("Liferay.ThemeDisplay.isSignedIn is not available");
                    return false; // Return false if the function is not available
                }
            } catch (error) {
                // Catch and log any error that occurs while calling `isSignedIn`
                console.error("Error while checking sign-in status in Liferay portal:", error);
                return false; // Return false in case of an error
            }
        }

        // If Liferay is not available, warn and return false
        console.warn("Liferay is not available in this environment.");
        return false;
    }
}
