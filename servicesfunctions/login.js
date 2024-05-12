async function Login() {
    const phone = thisiswhat(document.getElementById('phone').value);
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
        console.log(response);

        if (!response) {
            alert("Échec, vérifiez votre connexion ou essayez plus tard.");

            loading.setAttribute("onclick", "Login()");
            loading.innerHTML = `
            Connecter
            <i class="circle fa-thin fa-arrow-right"></i>
            `;
        } else if (response.name) {
            sessionStorage.setItem('_id', response._id);
            sessionStorage.setItem('name', response.name);
            sessionStorage.setItem('phone', response.phone);
            sessionStorage.setItem('email', response.email);
            sessionStorage.setItem('password', response.password);
            sessionStorage.setItem('role', response.role);
            sessionStorage.setItem('pushtoken', response.pushtoken);
            sessionStorage.setItem('allow', response.allow);
            sessionStorage.setItem('ville', response.ville);
            sessionStorage.setItem('bio', response.bio);
            sessionStorage.setItem('sex', response.sex);
            sessionStorage.setItem('availability', response.availability);
            sessionStorage.setItem('address', response.address);


            loading.innerHTML = `
            Connecté
            <i class="circle fa-thin fa-arrow-right"></i>
            `;
            window.location.href = "dashboard";
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