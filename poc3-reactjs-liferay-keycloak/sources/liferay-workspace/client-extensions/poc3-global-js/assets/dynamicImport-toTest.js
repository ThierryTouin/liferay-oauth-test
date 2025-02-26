/**
 * Generic function to add CSS or JS dependencies to a specific target.
 * @param {string} dependencies - Comma-separated list of files to import.
 * @param {string} target - Target location: "head" or "body".
 * @param {string} basePath - Base path for the files.
 * @param {Function} [callback] - Optional callback to execute after loading the scripts.
 */
export const addDependencies = (dependencies, target, basePath, callback) => {
    const dependencyArray = dependencies.split(",");
    const targetElement = target === "body" ? document.body : document.head;

    const onLoad = () => {
        let loadedCount = 0;
        const totalDependencies = dependencyArray.length;

        dependencyArray.forEach((dependency) => {
            if (dependency) {
                const url = `${basePath}${dependency}`;
                const type = dependency.endsWith('.css') ? 'css' : 'js';

                if (targetElement.innerHTML.includes(url)) {
                    console.debug(`${dependency} already exists.`);
                    loadedCount++;
                    if (loadedCount === totalDependencies && callback) {
                        callback();
                    }
                } else {
                    const element = document.createElement(type === "css" ? "link" : "script");
                    if (type === "css") {
                        element.rel = "stylesheet";
                        element.type = "text/css";
                        element.href = url;
                    } else {
                        element.type = "text/javascript";
                        element.src = url;
                        element.onload = () => {
                            loadedCount++;
                            if (loadedCount === totalDependencies && callback) {
                                callback();
                            }
                        };
                    }
                    targetElement.appendChild(element);
                    console.debug(`${dependency} added.`);
                }
            }
        });

        // Call the callback if all dependencies are already loaded
        if (loadedCount === totalDependencies && callback) {
            callback();
        }
    };

    if (target === "body") {
        document.addEventListener("DOMContentLoaded", onLoad);
    } else {
        onLoad();
    }
};


/**
 * Adds dependencies to the head.
 * @param {string} dependencies - Comma-separated list of files.
 * @param {string} basePath - Base path for the files.
 * @param {Function} [callback] - Optional callback to execute after loading the files.
 */
export const addDependenciesToHead = (dependencies, basePath, callback) => {
    addDependencies(dependencies, "head", basePath, callback);
};

/**
 * Adds dependencies to the body.
 * @param {string} dependencies - Comma-separated list of files.
 * @param {string} basePath - Base path for the files.
 * @param {Function} [callback] - Optional callback to execute after loading the files.
 */
export const addDependenciesToBody = (dependencies, basePath, callback) => {
    addDependencies(dependencies, "body", basePath, callback);
};

/* USAGE 
addDependenciesToBody('bundle.js', 'https://app3.dev.local/static/js', () => {
    console.log('Tous les fichiers ont été chargés.');
    // Ton code à exécuter après le chargement des fichiers
});
*/