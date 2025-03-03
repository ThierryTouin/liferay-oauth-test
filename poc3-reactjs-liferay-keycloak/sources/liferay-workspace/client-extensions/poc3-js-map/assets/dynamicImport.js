/**
 * Generic function to add CSS or JS dependencies to a specific target.
 * @param {string} dependencies - Comma-separated list of files to import.
 * @param {string} target - Target location: "head" or "body".
 * @param {Function} [onAfterLoadcallback] - Optional callback to execute after loading all scripts.
 */
export const addDependencies = (dependencies, target, onAfterLoadcallback) => {

    console.debug(`V1.0 : Adding dependencies to ${target}: ${dependencies}`);

    const dependencyArray = dependencies.split(",");
    const targetElement = target === "body" ? document.body : document.head;

    const onLoad = () => {
        let loadedCount = 0;
        const jsDependencies = dependencyArray.filter(dep => dep.endsWith('.js'));
        const totalJsDependencies = jsDependencies.length;

        console.debug(`Total JS dependencies to load: ${totalJsDependencies}`);

        const checkAllLoaded = () => {
            loadedCount++;
            console.debug(`Loaded JS count: ${loadedCount}`);
            if (loadedCount === totalJsDependencies && onAfterLoadcallback) {
                console.debug("All JS dependencies loaded. Executing callback.");
                onAfterLoadcallback();
            }
        };

        const handleError = (dependency) => {
            console.error(`Failed to load dependency: ${dependency}`);
        };

        dependencyArray.forEach((dependency, index) => {
            if (dependency) {
                const url = `${dependency}`;
                const type = dependency.endsWith('.css') ? 'css' : 'js';

                console.debug(`Processing dependency ${index + 1}/${dependencyArray.length}: ${dependency}`);

                const isAlreadyAdded = Array.from(targetElement.children).some(child => {
                    return (type === 'css' && child.href === url) || (type === 'js' && child.src === url);
                });

                if (isAlreadyAdded) {
                    console.debug(`${dependency} already exists.`);
                    if (type === 'js') {
                        checkAllLoaded();
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
                        element.onload = checkAllLoaded;
                        element.onerror = () => handleError(dependency);
                    }
                    targetElement.appendChild(element);
                    console.debug(`${dependency} added.`);
                }
            }
        });
    };

    if (target === "body") {
        console.debug("Waiting for DOMContentLoaded event.");
        document.addEventListener("DOMContentLoaded", onLoad);
    } else {
        onLoad();
    }
};

/**
 * Adds JS dependencies to the head.
 * @param {string} dependencies - Comma-separated list of JS files.
 * @param {Function} onAfterLoadcallback - Optional callback to execute after loading all scripts.
 */
export const addDependenciesToHead = (dependencies, onAfterLoadcallback) => {
    addDependencies(dependencies, "head", onAfterLoadcallback);
};

/**
 * Adds JS dependencies to the body.
 * @param {string} dependencies - Comma-separated list of JS files.
 * @param {Function} onAfterLoadcallback - Optional callback to execute after loading all scripts.
 */
export const addDependenciesToBody = (dependencies, onAfterLoadcallback) => {
    addDependencies(dependencies, "body", onAfterLoadcallback);
};