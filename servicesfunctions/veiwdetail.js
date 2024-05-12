function getUrlParameter(paramName) {
    paramName = paramName.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + paramName + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const svcValue = getUrlParameter('svc');

if (!svcValue || svcValue.length < 5) {
    ///document.getElementById('coverfor').classList.add("preloader-area");
} else {
    document.getElementById('comments').innerHTML = "";
    document.getElementById('respond').innerHTML = "";

    /*document.getElementById('sel_service_b').innerText = `
     Veuillez faire défiler vers le bas pour accéder à la liste des ${svcValue}. Cliquez ensuite sur les différents ${svcValue} pour obtenir plus de détails les concernant
    `;*/
    RequestData()
}

let imageso = [];
async function RequestData() {
    try {
        const sesStoge = await GetCandidatByID(svcValue);
        //console.log(sesStoge);
        if (sesStoge.image.length > 0) {
            imageso = sesStoge.image;
            document.getElementById(`imagea`).src = sesStoge.image[0].ima;
        }


        document.getElementById('username').innerText = sesStoge.name;
        document.getElementById('userrole').innerText = sesStoge.role;
        document.getElementById('userbio').innerText = sesStoge.bio;
        document.getElementById('userphone').innerText = sesStoge.phone;
        document.getElementById('useremail').innerText = sesStoge.email;
        document.getElementById('userville').innerText = sesStoge.ville;
        document.getElementById('useraddress').innerText = sesStoge.address;
        document.getElementById('usersex').innerText = sesStoge.sex;
        //document.getElementById('userallow').innerText = sesStoge.allow === "true" ? "Authorizé" : "Non Authorisé";
        document.getElementById('useravailability').innerText = sesStoge.availability === "true" ? "Diponible" : "Indisponible";

    } catch (error) {
        console.log("View detail RequestData", error)
    }

}

function ImageNextBack(road) {
    let posi = parseInt(road);
    const nexca = document.getElementById(`nexca`);
    const nexcb = document.getElementById(`nexcb`);

    if (imageso.length > posi) {
        document.getElementById(`imagea`).src = imageso[posi].ima;
        nexca.setAttribute("onclick", `ImageNextBack('${posi + 1}')`);
        nexcb.setAttribute("onclick", `ImageNextBack('${posi - 1}')`);
    } else {
        console.log(posi);
        document.getElementById(`imagea`).src = imageso[0].ima;
        nexca.setAttribute("onclick", `ImageNextBack('${1}')`);
        nexcb.setAttribute("onclick", `ImageNextBack('${0}')`);
    }

}