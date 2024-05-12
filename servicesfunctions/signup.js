const selectElement = document.getElementById('ivorycoastcity');

// Loop through the ivoireCities array to create options dynamically
ivoireCities.forEach(city => {
    const option = document.createElement('option');
    option.value = city.name;
    option.textContent = city.name;
    selectElement.appendChild(option);
});

let ville;
let role;
let sex;

const selectville = document.getElementById('selectcity');
selectville.addEventListener('change', function () {
    ville = this.value;
    console.log(ville);
});



const selectrole = document.getElementById('selecrole');
selectrole.addEventListener('change', function () {
    role = this.value;
    console.log(role);
});



const selectsex = document.getElementById('selecsex');
sex.addEventListener('change', function () {
    sex = this.value;
    console.log(sex);
});




async function SignUp() {
    const full_name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const password1 = document.getElementById('passworda').value;
    const commune = document.getElementById('commune').value;
    const bio = document.getElementById('bio').value;

    const loading = document.getElementById('loading');


    if (full_name && email && phone && commune && password && bio && ville && sex && role) {
        if (password === password1) {
            loading.removeAttribute("onclick");
            loading.innerText = "En cours ...";

            const data = {
                name: full_name,
                phone: phone,
                password: password,
                role: role,
                address: commune,
                email: email,
                pushtoken: "null",
                allow: false,
                ville: ville,
                bio: bio,
                sex: sex,
                availability: true
            };

            const response = await requesttoBackend('POST', '', data);

            if (!response) {
                alert("Échec, vérifiez votre connexion ou essayez plus tard.");

                loading.setAttribute("onclick", "SignUp()");
                loading.innerText = "Créer";
            } else if (response) {
                sessionStorage.setItem('copine', "connected");
                //window.location.href = "/dashboard";
                console.log(response);
                loading.innerText = "Compte créé";
            } else if (response.ee) {
                alert(`Le ${phone} est déjà associé à un compte`);
                loading.setAttribute("onclick", "SignUp()");
                loading.innerText = "Créer";
            }
        } else {
            alert("Les mot de passe ne sont pas conform.");
        }
    } else {
        alert("Renseignez tous.");
    }
};