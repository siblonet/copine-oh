function openCopineDatabase() {
    return new Promise((resolve, reject) => {
        const dbName = "copineUser";
        const dbVersion = 1;

        const request = indexedDB.open(dbName, dbVersion);
        let copine;

        request.onerror = (event) => {
            reject("Database error: " + event.target.errorCode);
        };

        request.onsuccess = (event) => {
            copine = event.target.result;
            resolve(copine);
        };

        request.onupgradeneeded = (event) => {
            copine = event.target.result;

            if (!copine.objectStoreNames.contains("copineContent")) {
                copine.createObjectStore("copineContent", { keyPath: "_id" });
            }
        };
    });
};
