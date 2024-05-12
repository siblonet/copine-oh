async function Login() {
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const loading = document.getElementById('loading');

    if (phone && password) {
        loading.removeAttribute("onclick");
        loading.innerHTML = `
        En cours ...
        <i class="circle fa-thin fa-arrow-right"></i>
        `;

        const data = {
            phone: phone,
            password: password,

        };
        const response = await requesttoBackend('POST', 'copineconnexion', data);

        if (!response) {
            alert("Échec, vérifiez votre connexion ou essayez plus tard.");

            loading.setAttribute("onclick", "Login()");
            loading.innerHTML = `
            Connecter
            <i class="circle fa-thin fa-arrow-right"></i>
            `;
        } else if (response) {
            sessionStorage.setItem('copine', "connected");
            loading.innerHTML = `
            Connecté
            <i class="circle fa-thin fa-arrow-right"></i>
            `;
            ///window.location.href = "/dashboard";
        } else if (response.ee) {
            alert("Identifient inccorect");
            loading.setAttribute("onclick", "Login()");
            loading.innerHTML = `
            Connecter
            <i class="circle fa-thin fa-arrow-right"></i>
            `;
        }

    } else {
        alert("Renseignez tous.");


    }

};