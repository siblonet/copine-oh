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
    //document.getElementById('respond').innerHTML = "";

    /*document.getElementById('sel_service_b').innerText = `
     Veuillez faire défiler vers le bas pour accéder à la liste des ${svcValue}. Cliquez ensuite sur les différents ${svcValue} pour obtenir plus de détails les concernant
    `;*/
    RequestData()
}

let imageso = [];
async function RequestData() {
    try {
        const sesStoge = await GetCandidatByID(svcValue);
        console.log(sesStoge);
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


        //const everrouillage = document.getElementById('Deverrouillage');
        //everrouillage.setAttribute("onclick", `Deverrouillage('${}')`);

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
let paymen_method_selected = "noselected";


const paymenhtm = `
                <div class="form-group text-center">
                    <a style="cursor: pointer; padding: 5px 20px 5px 20px !important; border: 1px solid #145fb8; border-radius: 20px;" class="btn font_weight_600">Payer</a>
                </div>
        `;


const PaymenSelecion = (paymen_method) => {
    paymen_method_selected = paymen_method;
    const Orangeci = document.getElementById('orangeci');
    const Mtnci = document.getElementById('mtnci');
    const Waveci = document.getElementById('waveci');
    const Cards = document.getElementById('cards');
    const payer = document.getElementById('payer');

    Orangeci.classList.remove('payment_icons_selected');
    Mtnci.classList.remove('payment_icons_selected');
    Waveci.classList.remove('payment_icons_selected');
    Cards.classList.remove('payment_icons_selected');

    document.getElementById(paymen_method).classList.add('payment_icons_selected');

    if (paymen_method !== "cards") {
        const customerphone = document.getElementById('customerphone');
        customerphone.placeholder = `Entrez tél pour ${paymen_method === "orangeci" ? "ORANGE MONEY" : paymen_method === "mtnci" ? "MTN MONEY" : "Wave"}`;
        customerphone.style.display = "block";
        payer.innerHTML = paymenhtm;

    } else {
        const customerphone = document.getElementById('customerphone');
        customerphone.value = "";
        customerphone.placeholder = "";
        customerphone.style.display = "none";
    };


    if (paymen_method_selected !== "noselected" && prenomValueA.value.length > 2 && nomValueA.value.length > 2 && villeValueA.value.length > 2 && adresseValueA.value.length > 4 && telephoneValueA.value.length > 9 && telephoneValueA.value.length < 11) {
        document.getElementById("validate-hide-forfil").innerHTML = VALIDAHTML

    }
};


const KaliaPay = async () => {
    try {
        const customer = encodeURIComponent(document.getElementById('customerphone').value);

        const response = await requesttoBackend('POST', `orders/${customer ? customer : "0701743686"}/nuance`, order);

        if (response && response.orderid) {
            await deletePannier();
            window.location.href = response.orderid


        } else if (!response) {
            handleError("Erreur inconnue, Veuillez réessayer plus tard");
            document.getElementById('noorderduplu').setAttribute('onclick', 'sendCommen()');
        }

    } catch (error) {
        console.log(error);
        handleError("Vérifiez que vous avez accès à l'internet");
        document.getElementById('noorderduplu').setAttribute('onclick', 'sendCommen()');

        // Handle errors appropriately
    }
}




const PaymenSession = `
               

<div style="margin-bottom: -50px; align-items: center; text-align: center;">
                                    <P style="color: #007bff;">Vous serez facturé à 500 pour voir les infos complètes
                                    </P>
                                </div>
                                <div class="tab products-details-tab">
                                    <br>
                                    <br>
                                    <br>

                                    <div class="tab-content">
                                        <div class="tabs-item">
                                            <div class="products-details-tab-content">
                                                <div
                                                    style="display: flex; justify-content: space-between; width: 100%;">
                                                    <div class="payment_icons" id="orangeci"
                                                        onclick="PaymenSelecion('orangeci')">
                                                        <img src="assets/images/orange.png" alt="ORANGE MONEY">
                                                    </div>
                                                    <div class="payment_icons" id="mtnci"
                                                        onclick="PaymenSelecion('mtnci')">
                                                        <img src="assets/images/mtn.png" alt="MTN MONEY">
                                                    </div>
                                                    <div class="payment_icons" id="waveci"
                                                        onclick="PaymenSelecion('waveci')">
                                                        <img src="assets/images/icon.png" alt="WAVE CI">
                                                    </div>
                                                    <div class="payment_icons" id="cards"
                                                        onclick="PaymenSelecion('cards')">
                                                        <img src="assets/images/vm.png" alt="VISA MASTERCARD">
                                                    </div>
                                                </div>
                                                <br>
                                                <input style="height: 40px !important; display: none;"
                                                    placeholder="Entrez tél pour " type="tel" class="form-control"
                                                    id="customerphone">
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div class="payment-box" id="validate-hide-forfil">


                                </div>
                                <div class="col-lg-12" id="payer">
                                    
                                </div>


        `;





const Deverrouillage = async () => {
    const sesStoge = await GetCandidatByID(svcValue);
    const username = whatisthis(sesStoge.name);
    const userphone = whatisthis(sesStoge.phone);
    const useremail = whatisthis(sesStoge.email);
    const userrole = whatisthis(sesStoge.role);
    const userville = whatisthis(sesStoge.ville);
    const userbio = whatisthis(sesStoge.bio);
    const usersex = whatisthis(sesStoge.sex);
    const useravailability = sesStoge.availability;
    const useraddress = whatisthis(sesStoge.address);

    /*const usersituation = whatisthis(sesStoge.situation);
    const userage = whatisthis(sesStoge.age);
    const userwapp = whatisthis(sesStoge.wapp);
    const usernatinalite = whatisthis(sesStoge.natinalite);
    const userreligion = whatisthis(sesStoge.religion);
    const useretudient = whatisthis(sesStoge.etudient);*/



    document.getElementById('username').innerText = username;
    document.getElementById('userrole').innerText = userrole;
    document.getElementById('userbio').innerText = userbio;
    document.getElementById('userphone').innerText = userphone;
    document.getElementById('useremail').innerText = useremail;
    document.getElementById('userville').innerText = userville;
    document.getElementById('useraddress').innerText = useraddress;
    document.getElementById('usersex').innerText = usersex;
    document.getElementById('useravailability').innerText = useravailability === "true" ? "Diponible" : "Indisponible";


    /*document.getElementById('usersituation').innerText = usersituation;
    document.getElementById('userage').innerText = userage;
    document.getElementById('userwhatsapp').innerText = userwapp;
    document.getElementById('usernationality').innerText = usernatinalite;
    document.getElementById('userreligion').innerText = userreligion;
    document.getElementById('userschool').innerText = useretudient;*/


    ///document.getElementById('paymensession').innerHTML = PaymenSession;
}





const commentsHtml = `
            <div class="comment_number text-uppercase font_weight_600">
                Commentaires <span id="comentnumbera">(0)</span>
            </div>
            <div class="comment-list">
                    <div class="comment" id="comment-1">
                        <div class="image" data-aos="flip-left" data-aos-once="true"><img alt=""
                                src="assets/images/we.png" class="avatar"></div>
                        <div class="text">
                            <h5 class="name font_weight_700">John Kokar</h5>
                            <span class="comment_date">
                                <i class="far fa-clock"></i> 15:32h, 06 July
                            </span>
                            <a class="comment-reply-link"
                                style="cursor: pointer; color: #145fb8;">Repondre
                            </a>
                            <div class="text_holder">
                                <p class="text-size-16">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry.
                                </p>
                            </div>
                        </div>

                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->

                        <div class="comment post-item-description" id="comment-1-1">
                            <div class="image" data-aos="flip-left" data-aos-once="true">
                                <img alt="" src="assets/images/wed.JPG" class="avatar">
                            </div>

                            <div class="text">
                                <h5 class="name font_weight_700">John Doe</h5>
                                <span class="comment_date">
                                    <i class="far fa-clock"></i> 15:32h, 06 July
                                </span>
                            </div>
                            <div class="blockquote text_holder">
                                <p class="text-size-16">It is a long established fact that a
                                    reader will be distracted by the readable content of a page
                                    when looking at its layout.
                                </p>
                                <small style="cursor: pointer; color: #145fb8;">Repondre</small>
                            </div>
                        </div>
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment end  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment end  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment end  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment end  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
                        <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ subecomment end  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->

                    </div>
                    
            </div>


`;





const ShowComment = async () => {
    document.getElementById('comments').innerHTML = `
        <div class="comment_number text-uppercase font_weight_600">
            Commentaires <span id="comentnumbera">(0)</span>
        </div>
    `;
}
