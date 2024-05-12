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
    document.getElementById('sel_service_a').innerText = svcValue;
    
    /*document.getElementById('sel_service_b').innerText = `
     Veuillez faire défiler vers le bas pour accéder à la liste des ${svcValue}. Cliquez ensuite sur les différents ${svcValue} pour obtenir plus de détails les concernant
    `;*/
   
}

async function RequestData() {
    try {
        const data = await requesttoBackend('GET', `${svcValue}`);
        document.getElementById('sel_service_c').innerText = data.length;

        if (data.length > 0) {
            recentProduct(data, svcValue)
        } else {
            recentProduct([], svcValue)
        }
    } catch (error) {
        console.log(error);
        const userContainera = document.getElementById('rendadatb');

        userContainera.innerHTML = `
                            <h6>échèc de chargement</h6>
                            <h2>échèc</h2>
                            <p>Vérifiez que vous avez de la connexion internet et actualisez</p>
            
        `;
    }

}