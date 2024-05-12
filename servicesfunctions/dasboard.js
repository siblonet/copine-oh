async function getAdmin() {
    const user_id = sessionStorage.getItem('_id');



    if (user_id) {

        const sesStoge = await GetPersonByID(user_id);
        const username = whatisthis(sesStoge.name);
        const userphone = whatisthis(sesStoge.phone);
        const useremail = whatisthis(sesStoge.email);
        const userpassword = sesStoge.password;
        const userrole = whatisthis(sesStoge.role);
        const userpushtoken = whatisthis(sesStoge.pushtoken);
        const userallow = sesStoge.allow;
        const userville = whatisthis(sesStoge.ville);
        const userbio = whatisthis(sesStoge.bio);
        const usersex = whatisthis(sesStoge.sex);
        const useravailability = sesStoge.availability;
        const useraddress = whatisthis(sesStoge.address);
        const userphoto = whatisthis(sesStoge.image);
        if (userphoto.length > 0) {
            document.getElementById(`imagbotoma`).src = userphoto[0].ima;

        }
        if (userphoto.length > 1) {
            document.getElementById(`imagbotomb`).src = userphoto[1].ima;

        }
        if (userphoto.length > 2) {
            document.getElementById(`imagbotomc`).src = userphoto[2].ima;

        }



        document.getElementById('username').innerText = username;
        document.getElementById('userrole').innerText = userrole;
        document.getElementById('userbio').innerText = userbio;


        document.getElementById('userphone').innerText = userphone;
        document.getElementById('useremail').innerText = useremail;
        document.getElementById('userville').innerText = userville;
        document.getElementById('useraddress').innerText = useraddress;
        document.getElementById('usersex').innerText = usersex;
        document.getElementById('userallow').innerText = userallow === "true" ? "Authorizé" : "Non Authorisé";
        document.getElementById('useravailability').innerText = useravailability === "true" ? "Diponible" : "Indisponible";

    } else {
        window.location.href = "/";

    }
};

getAdmin();

async function Disconexion() {
    var result = window.confirm("Etes vous sur ne vouloir, vous deconnectez?");

    if (result) {
        await deletePeople();
        sessionStorage.clear();
        window.location.href = "login"
    }
};

let imagbotom;

async function AddUserImage() {
    const imagbotomc = document.getElementById(`${imagbotom}`);
    imagbotomc.removeAttribute("onclick");
    const imagePreview = document.getElementById(`imagec`);
    imagePreview.src = '';

    const fileInput = document.getElementById(`filec`);
    const file = fileInput.files[0];

    if (!file) {
        alert("Aucune image n'a été sélectionnée !");
        return;
    }

    const imageUrl = URL.createObjectURL(file);
    imagePreview.src = imageUrl;

    imagbotomc.setAttribute("onclick", `SendTheImage('${file}')`);
    imagbotomc.innerHTML = `
        Valider
        <i class="circle fa-thin fa-arrow-right"></i>
    `;
}


const SendTheImage = async (file) => {
    const reader = new FileReader();

    reader.onload = async function (event) {
        try {
            const base64Data = event.target.result.split(',')[1];
            const fileName = file.name;

            // Assuming requesttoBackend is a function that returns a Promise
            const url = await requesttoBackend('POST', 'boutique/uploadImage', { ima: base64Data, nam: fileName });
            if (url.ima) {
                const us_id = sessionStorage.getItem('_id');

                const sending = await requesttoBackend('PUT', `${us_id}`, { image: [{ ima: url.ima }] });
                if (sending.name) {
                    await PostPeople(sending);
                    window.location.reload()
                } else {
                    console.log(sending);
                }
            }

        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    reader.readAsDataURL(file);
}

function OpenFileDia(imagbotoma) {
    imagbotom = imagbotoma;
    document.getElementById('filec').click();

}