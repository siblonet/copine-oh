const bottom_action_single = `
    <div class="form-group text-center">
    <a style="cursor: pointer; padding: 5px 20px 5px 20px !important; border: 1px solid #145fb8; border-radius: 20px;"
        class="btn font_weight_600">Modifier</a>
    </div>
    `;


const bottom_action_both = `
    <div class="form-group text-center">
    <a style="cursor: pointer; padding: 5px 20px 5px 20px !important; border: 1px solid #145fb8; border-radius: 20px;"
        class="btn font_weight_600">Modifier</a>
    </div>
    <div class="form-group text-center">
    <a id="Supprimer" onclick="DeleteMyAccount()" style="cursor: pointer; padding: 5px 20px 5px 20px !important; border: 1px solid #ff0000; border-radius: 20px; color: #ff0000;"
        class="btn font_weight_600">Supprimer</a>
    </div>
`;

async function getAdmin() {
    const user_id = sessionStorage.getItem('_id');
    const account_action = document.getElementById('account_action');
    const imagbotoma = document.getElementById('imagbotoma');
    const imagbotomb = document.getElementById('imagbotomb');
    const imagbotomc = document.getElementById('imagbotomc');

    account_action.innerHTML = "";


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
        const userphoto = sesStoge.image;

        if (userphoto.length > 0) {
            document.getElementById(`imagea`).src = userphoto[0].ima;
            document.getElementById(`ioda`).value = userphoto[0]._id;
            imagbotoma.setAttribute("onclick", `DeleteImage('${userphoto[0].ima}', '${userphoto[0]._id}', 'imagbotoma')`);
            imagbotoma.innerHTML = `
                Modifier
                <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
            `;
        }


        if (userphoto.length > 1) {
            document.getElementById(`imageb`).src = userphoto[1].ima;
            document.getElementById(`iodb`).value = userphoto[1]._id;
            imagbotomb.setAttribute("onclick", `DeleteImage('${userphoto[1].ima}', '${userphoto[1]._id}', 'imagbotomb')`);
            imagbotomb.innerHTML = `
                Modifier
                <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
            `;
        }

        if (userphoto.length > 2) {
            document.getElementById(`imagec`).src = userphoto[2].ima;
            document.getElementById(`iodc`).value = userphoto[2]._id;
            imagbotomc.setAttribute("onclick", `DeleteImage('${userphoto[2].ima}', '${userphoto[2]._id}', 'imagbotomc')`);
            imagbotomc.innerHTML = `
                Modifier
                <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
            `;
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
        if (userrole === "Owner") {
            account_action.innerHTML = bottom_action_both;
        } else {
            account_action.innerHTML = bottom_action_single;
        }

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

async function DeleteMyAccount() {
    var result = window.confirm("Etes vous sur ne vouloir supprimer votre compte?");
    const user_id = sessionStorage.getItem('_id');

    if (result) {
        const Supprimer = document.getElementById("Supprimer");
        Supprimer.removeAttribute("onclick");
        Supprimer.innerText = "En cours..."
        const deleting = await requesttoBackend('DELETE', `copinedeletinguser/${user_id}`);
        if (deleting.done) {
            await deletePeople();
            sessionStorage.clear();
            window.location.href = "login"
        } else {
            alert("échè re-essayez");
            Supprimer.setAttribute("onclick", "DeleteMyAccount()")
            Supprimer.innerText = "Supprimer"
        }
    }
};



let imagbotom;
let fileboton;

async function AddUserImage() {
    const imagbotomc = document.getElementById(`${imagbotom}`);
    imagbotomc.removeAttribute("onclick");
    function getLastCharacter(text) {
        return text[text.length - 1];
    }

    const lastCharacter = getLastCharacter(imagbotom);

    const imagePreview = document.getElementById(`image${lastCharacter}`);
    imagePreview.src = '';

    const fileInput = document.getElementById(`${fileboton}`);
    const file = fileInput.files[0];

    if (!file) {
        alert("Aucune image n'a été sélectionnée !");
        return;
    }

    const imageUrl = URL.createObjectURL(file);
    imagePreview.src = imageUrl;

    const reader = new FileReader();
    reader.onload = async function (event) {
        const base64Data = event.target.result.split(',')[1];
        const fileName = file.name;

        if (`${fileboton}` === "filec") {
            imagbotomc.setAttribute("onclick", `SendTheImage('${base64Data}', '${fileName}')`);
        } else {
            imagbotomc.setAttribute("onclick", `ChangeTheImage('${base64Data}', '${fileName}')`);
        };

        imagbotomc.innerHTML = `
        Valider
        <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
    `;
    };

    reader.readAsDataURL(file);
}


const SendTheImage = async (base64Data, fileName) => {
    const imagbotomc = document.getElementById(`${imagbotom}`);
    imagbotomc.innerHTML = `En Cours ...`;

    try {
        // Assuming requesttoBackend is a function that returns a Promise
        const url = await requesttoBacken('POST', 'boutique/uploadImage', { ima: base64Data, nam: fileName });
        if (url.ima) {
            const us_id = sessionStorage.getItem('_id');
            function getLastCharacter(text) {
                return text[text.length - 1];
            }
            const useimach = await GetPersonByID(us_id);

            const urlo = useimach.image.length > 0 ? `pushcandidateimage/${us_id}` : `/${us_id}`;
            const obco = useimach.image.length > 0 ? { ima: url.ima } : { image: [{ ima: url.ima }] };

            const sending = await requesttoBackend('PUT', urlo, obco);

            if (sending.name) {
                const lastCharacter = getLastCharacter(imagbotom);
                const imagbo = document.getElementById(`image${lastCharacter}`);
                imagbo.src = url.ima;

                await deletePeople();
                imagbotomc.setAttribute("onclick", `OpenFileDia('${imagbotom}')`);
                imagbotomc.innerHTML = `
                    Modifier
                    <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
                `;
                await PutPeople(sending);

            } else {
                console.log(sending);
            }
        }

    } catch (error) {
        imagbotomc.innerHTML = `
            échèc
            <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
        `;
        console.error("Error uploading image:", error);
    }


}

function OpenFileDia(imagbotoma) {
    imagbotom = imagbotoma;
    fileboton = "filec";
    document.getElementById('filec').click();

}


const DeleteImage = async (image_url, id, html_tag_id) => {
    const user_id = sessionStorage.getItem('_id');
    function getLastCharacter(text) {
        return text[text.length - 1];
    }
    const lastCharacter = getLastCharacter(html_tag_id);
    const imagbo = document.getElementById(`image${lastCharacter}`);
    
    if (image_url !== null) {
        try {
            const del_url = await requesttoBacken('POST', 'boutique/deleteImage', { image_url: image_url });
            if (del_url.done) {
                const send = await requesttoBackend('PUT', `changecandidateimage/${user_id}/${id}`, { url: null });
                if (send.name) {
                    await deletePeople();
                    

                    const imagboto = document.getElementById(`${html_tag_id}`);
                    imagboto.setAttribute("onclick", `OpenFileDia('${html_tag_id}')`);
                    imagboto.innerHTML = `
                    En cours...
                    <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
                `;
                    await PutPeople(send);

                    imagbo.src = "assets/images/baby1.webp";
                    imagbotom = html_tag_id;
                    fileboton = "filea";
                    document.getElementById('filea').click();
                }
            }

        } catch (error) {

            console.error("Error uploading image:", error);
        }

    } else {
        imagbo.src = "assets/images/baby1.webp";
        imagbotom = html_tag_id;
        fileboton = "filea";
        document.getElementById('filea').click();
    }

}

const ChangeTheImage = async (base64Data, fileName) => {
    const imagbotomc = document.getElementById(`${imagbotom}`);

    imagbotomc.innerHTML = `En Cours ...`;

    try {
        // Assuming requesttoBackend is a function that returns a Promise
        const url = await requesttoBacken('POST', 'boutique/uploadImage', { ima: base64Data, nam: fileName });
        if (url.ima) {
            function getLastCharacter(text) {
                return text[text.length - 1];
            }
            const lastiod = getLastCharacter(imagbotom);

            const us_id = sessionStorage.getItem('_id');
            const iod = document.getElementById(`iod${lastiod}`).value;

            const send = await requesttoBackend('PUT', `changecandidateimage/${us_id}/${iod}`, { url: url.ima });
            if (send.name) {
                const lastCharacter = getLastCharacter(imagbotom);
                const imagbo = document.getElementById(`image${lastCharacter}`);
                imagbo.src = url.ima;

                await deletePeople();
                const imagboto = document.getElementById(`${imagbotom}`);
                imagboto.setAttribute("onclick", `OpenFileDia('${imagbotom}')`);
                imagboto.innerHTML = `
                    Changer la photo
                    <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
                `;
                await PutPeople(send);
            }
        }

    } catch (error) {
        imagbotomc.innerHTML = `
            échèc
            <figure class="arrow mb-0"><i class="fa-solid fa-arrow-right"></i></figure>
        `;
        console.error("Error uploading image:", error);
    }


}