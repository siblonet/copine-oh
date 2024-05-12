async function PostPeople(person) {
    const peopledb = await openCopineDatabase();
    const PpTransation = peopledb.transaction(["copineContent"], "readwrite");
    const PpStore = PpTransation.objectStore("copineContent");

    let added = false;
    const adding = PpStore.add(person);

    adding.onsuccess = () => {
        added = true;
    };

    adding.onerror = (event) => {
        console.log("PostPeople", event.target.error);
    };


    return added
}


/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ adding systme as post end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ adding systme as post end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ adding systme as post end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ adding systme as post end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */



/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ getting systme as get start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ getting systme as get start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ getting systme as get start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */



async function GetPersonByID(id) {
    return new Promise(async (resolve, reject) => {
        const peopledb = await openCopineDatabase();
        const GPTransation = peopledb.transaction(["copineContent"], "readonly");
        const GPStore = GPTransation.objectStore("copineContent");

        const requestingByID = GPStore.get(id);

        requestingByID.onsuccess = (event) => {
            const personphone = event.target.result;
            resolve(personphone);
        };

        requestingByID.onerror = (event) => {
            console.error("Error accessing object GetPersonByID store:", event.target.error);
            reject(event.target.error);
        };
    })



}




/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ getting systme as get end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ deleting systme as delete start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


async function deletePeople() {
    const peopledb = await openCopineDatabase();
    const CPTransation = peopledb.transaction(["copineContent"], "readwrite");
    const CPStore = CPTransation.objectStore("copineContent");

    const clearPeople = CPStore.clear();

    let deleted = false;
    clearPeople.onsuccess = () => {
        deleted = true;
    };

    clearPeople.onerror = (event) => {
        console.error("Error accessing object deletePeople store:", event.target.error);
    };

    return deleted
}



/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ deleting systme as delete end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */