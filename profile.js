let comment_fetched = [];
async function getAdmin() {
    const user_id = sessionStorage.getItem('_id');
    if (user_id) {
        const sesStoge = await GetPersonByID(user_id);
        const username = whatisthis(sesStoge.name);
        const userrole = whatisthis(sesStoge.role);
        const userbio = whatisthis(sesStoge.bio);
        const userstatus = sesStoge.status;
        const userphoto = sesStoge.image;



        if (userphoto.length > 0) {
            document.getElementById(`profile_ima_tag`).src = userphoto[0].ima == null ? "assets/images/baby1.webp" : userphoto[0].ima;
            document.getElementById(`comment_ima_tag`).src = userphoto[0].ima == null ? "assets/images/baby1.webp" : userphoto[0].ima;

        } else {
            document.getElementById(`profile_ima_tag`).src = "assets/images/baby1.webp";
            document.getElementById(`comment_ima_tag`).src = "assets/images/baby1.webp"

        }


        if (userphoto.length > 1) {
            document.getElementById(`cover_ima_tag`).src = userphoto[1].ima == null ? "assets/images/baby1.webp" : userphoto[1].ima;
        } else {
            document.getElementById(`cover_ima_tag`).src = "assets/images/baby1.webp"
        }



        document.getElementById('name_tag').innerText = username;
        document.getElementById('status_tag').innerHTML = `
                    @${userrole}
                    <img style="height: 15px; width: 15px; margin-bottom: -2px;" src="assets/images/${userstatus ? userrole === "Owner" ? 'verified.png' : 'verify.png' : userrole === "Owner" ? 'verified.png' : 'bad_verify.png'}" alt="">
                `;

        document.getElementById('desc_tag').innerText = userbio;

        comment_fetched = await requesttoBackend('GET', `gettingbycopinecomment/${user_id}`);
        document.getElementById('comennt_tag').innerText = `${comment_fetched.length}`;


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

const NaveTo = () => {
    window.location.href = 'dashboard'

}

const SendComennt = async () => {
    const user_id = sessionStorage.getItem('_id');
    const loading = document.getElementById('Envoyer');


    if (user_id) {
        loading.removeAttribute("onclick");
        loading.innerHTML = `
            <i class="fa fa-spinner fa-spin" style="color: #aaaaaa !important;"></i>
        `;

        const data = {
            commenta: user_id,
            recepto: user_id,
            message: document.getElementById('comment_data').value,
        };

        const comment = await requesttoBackend('POST', 'commentcopinecreating', data);
        if (comment && comment.length > 0) {
            document.getElementById('comment_data').value = "";
            comment_fetched = await requesttoBackend('GET', `gettingbycopinecomment/${user_id}`);
            document.getElementById('comennt_tag').innerText = `${comment_fetched.length}`;
            ShowComments()
        }


        loading.setAttribute("onclick", "SendComennt()");
        loading.innerHTML = `
            <i class="fa fa-send" style="color: #aaaaaa !important;"></i>
        `;

    } else {
        alert("Connectez-vous ou Créez un compte pour commenter")
    }

}



const ShowComments = async () => {
    const user_id = sessionStorage.getItem('_id');
    const comment_data_render = document.getElementById('comment_data_render');
    comment_data_render.innerHTML = "";
    moment.locale('fr');

    comment_fetched.forEach((commo, index) => {
        const CommotHTML = `
        <div class="comment_dis_sessse">
        <div class="comment_photo_sess_style">
            <div class="comment_photo_style">
                <img id="comment_ima_tagb" src="${commo.commenta.image.length > 0 ? commo.commenta.image[0].ima : "assets/images/avatay.png"}"
                    style="height: 50px; width: 50px;" alt="">
            </div>
        </div>


        <div class="comment_text_style">
            <span style="font-weight: bold; color: #333333; font-size: 18px;">
                ${whatisthis(commo.commenta.name)} ${commo.commenta.status ? whatisthis(commo.commenta.role) === "Owner" ? '<img  style="height: 13px; width: 13px;" src="assets/images/verified.png">' : '<img  style="height: 13px; width: 13px;" src="assets/images/verify.png">' : '<img  style="height: 13px; width: 13px;" src="assets/images/bad_verify.png">'}
            </span>
            <br>
            <span style="color: #aaaaaa; font-size: 12px;">
                <i class="far fa-clock"></i> ${moment(commo.comented_at).format('MMMM Do YYYY, HH:mm:ss')}
            </span>
            <div style="height: 7px;"></div>
            <span style="text-align: start !important;">${commo.message}</span>
            <div class="comment_down_buttons">
                <a onclick="ShowReplies('${commo._id}')" style="font-size: 15px; color: #042c57; cursor: pointer;" class="mefirst">${commo.reply}
                    Réponses
                </a>

                <a onclick="ShowReplyInput('${commo._id}')" class="mefirst" style="color: #042c57 !important; font-size: 15px; cursor: pointer;">
                    <i class="fa fa-reply" style="color: #042c57 !important;"></i>
                    Répondre
                </a>
                ${commo.commenta._id === user_id ?
                `
                        <a onclick="DeleteComment('${commo._id}')" class="mefirst" style="background-color: #da1a344f; border-radius: 7px !important; padding: 5px !important; color: #da1a34 !important; font-size: 15px; cursor: pointer;">
                            <i id="${commo._id}a" class="fa fa-trash" style="color: #da1a34 !important;"></i>
                        </a>                
                        ` :

                ''
            }
               
            </div>
        </div>
    </div>
    <div style="height: 42px;"></div>



    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ replay @@@@@@@@@@@@@@@@@@@-->

    <div class="reply_input_dis displo" id="${commo._id}rep">

    <div class="comment_dis_sessse replay">
        <div class="comment_photo_sess_style">
            <div class="comment_photo_style">
                <img id="comment_ima_tagd" src="${commo.commenta.image.length > 0 ? commo.commenta.image[0].ima : "assets/images/avatay.png"}" style="height: 50px; width: 50px;"
                    alt="">
            </div>
        </div>


        <div class="comment_inpu_style">
            <textarea class="" name="replay_data" id="replay_data${commo._id}"></textarea>

            <a id="Envoyera${commo._id}" onclick="SendReply('${commo._id}')" class="send_button">
                <i class="fa fa-send" style="color: #aaaaaa !important;"></i>
            </a>
        </div>
    </div>
</div>

    <br>



    <div id="replay_data_render"></div>

        `;
        comment_data_render.innerHTML += CommotHTML;

    });
}

const DeleteComment = async (id) => {
    const user_id = sessionStorage.getItem('_id');
    const trashlodin = document.getElementById(`${id}a`);
    trashlodin.classList = "fa fa-spinner fa-spin";


    const deleti = await requesttoBackend('DELETE', `deletingcopinecomment/${id}`);
    if (deleti.done) {
        //document.getElementById('commentsa').innerHTML = "";
        //CommentNumber()
        comment_fetched = await requesttoBackend('GET', `gettingbycopinecomment/${user_id}`);
        document.getElementById('comennt_tag').innerText = `${comment_fetched.length}`;
        ShowComments()
    }
}


const ShowReplies = async (id) => {
    const user_id = sessionStorage.getItem('_id');
    const replay_data_render = document.getElementById('replay_data_render');
    replay_data_render.innerHTML = "";
    const replies = await requesttoBackend('GET', `gettingbycopinereply/${id}`);

    moment.locale('fr');

    replies.forEach((reply, index) => {
        const ReplyHTML = `
        <div class="comment_dis_sessse replay">
                            <div class="comment_photo_sess_style">
                                <div class="comment_photo_style">
                                <img id="comment_ima_taga" src="${reply.commenta.image.length > 0 ? reply.commenta.image[0].ima : "assets/images/avatay.png"}"
                                style="height: 50px; width: 50px;" alt="">
                                </div>
                            </div>


                            <div class="comment_text_style">
                                <span style="font-weight: bold; color: #333333; font-size: 18px;">
                                    ${whatisthis(reply.commenta.name)} ${reply.commenta.status ? whatisthis(reply.commenta.role) === "Owner" ? '<img  style="height: 13px; width: 13px;" src="assets/images/verified.png">' : '<img  style="height: 13px; width: 13px;" src="assets/images/verify.png">' : '<img  style="height: 13px; width: 13px;" src="assets/images/bad_verify.png">'}
                                </span>
                                <br>
                                <span style="color: #aaaaaa; font-size: 12px;">
                                    <i class="far fa-clock"></i> ${moment(reply.comented_at).format('MMMM Do YYYY, HH:mm:ss')}
                                </span>
                                <div style="height: 7px;"></div>
                                <span style="text-align: start !important;">${reply.message}</span>
                                <div class="comment_down_buttons">
                                    ${reply.commenta._id === user_id ?
                `
                                            <a onclick="DeleteReply('${reply._id}', '${reply.recepto}')" class="mefirst" style="background-color: #da1a344f; border-radius: 7px !important; padding: 5px !important; color: #da1a34 !important; font-size: 15px; cursor: pointer;">
                                                <i id="${reply._id}a" class="fa fa-trash" style="color: #da1a34 !important;"></i>
                                            </a>             
                                            ` :

                ''
            }
                                
                                </div>
                            </div>
                        </div>
                        <br>

        `;
        replay_data_render.innerHTML += ReplyHTML;

    });
}

const DeleteReply = async (id, com_id) => {
    const trashlodin = document.getElementById(`${id}a`);
    trashlodin.classList = "fa fa-spinner fa-spin";


    const deleti = await requesttoBackend('DELETE', `deletingreplycopine/${id}`);
    if (deleti.done) {
        ShowReplies(com_id)
    }
}

const SendReply = async (comid) => {
    const user_id = sessionStorage.getItem('_id');
    const loading = document.getElementById("Envoyera" + comid);


    if (user_id) {
        loading.innerHTML = `
        <i class="fa fa-spinner fa-spin" style="color: #aaaaaa !important;"></i>
        `;
        
        const data = {
            commenta: user_id,
            recepto: comid,
            message: document.getElementById('replay_data' + comid).value,
        };

        const comment = await requesttoBackend('POST', 'replycopinecreating', data);
        if (comment && comment.length > 0) {
            document.getElementById('replay_data' + comid).value = "";
            loading.innerHTML = `
            <i class="fa fa-send" style="color: #aaaaaa !important;"></i>
            `;
            ShowReplies(comid)
        }
    } else {
        alert("Connectez-vous ou Créez un compte pour commenter")
    }

}

function ShowReplyInput(params) {
    document.getElementById(`${params}rep`).classList.remove("displo");
    document.getElementById(`${params}rep`).style.display = "block";
}