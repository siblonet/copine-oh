const selectElement = document.getElementById('selectcity');

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
    ville = thisiswhat(this.value);
});



const selectrole = document.getElementById('selecrole');
selectrole.addEventListener('change', function () {
    role = thisiswhat(this.value);
});



const selectsex = document.getElementById('selecsex');
selectsex.addEventListener('change', function () {
    sex = thisiswhat(this.value);
});




async function SignUp() {
    const full_name = thisiswhat(document.getElementById('name').value);
    const email = thisiswhat(document.getElementById('email').value);
    const phone = thisiswhat(document.getElementById('phone').value);
    const password = thisiswhat(document.getElementById('password').value);
    const password1 = thisiswhat(document.getElementById('passworda').value);
    const commune = thisiswhat(document.getElementById('commune').value);
    const bio = thisiswhat(document.getElementById('bio').value);

    const loading = document.getElementById('loading');


    if (full_name && email && phone && commune && password && bio && ville && sex && role) {
        if (password === password1) {
            loading.removeAttribute("onclick");
            loading.innerHTML = `
                En Cours ...
            <i class="circle fa-thin fa-arrow-right"></i>
            `;

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
            } else if (response.name) {
                sessionStorage.setItem('_id', response._id);
                await PostPeople(response);
                window.location.href = "dashboard";
                loading.innerHTML = `
                Compte Créé
                <i class="circle fa-thin fa-arrow-right"></i>
                `;
            } else if (response.ee) {
                alert(`Le ${phone} est déjà associé à un compte`);
                loading.setAttribute("onclick", "SignUp()");
                loading.innerHTML = `
                    Créer
                <i class="circle fa-thin fa-arrow-right"></i>
                `;
            }
        } else {
            alert("Les mot de passe ne sont pas conform.");
        }
    } else {
        alert("Renseignez tous.");
    }
};