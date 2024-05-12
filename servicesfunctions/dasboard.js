function getAdmin() {

    const user_id = sessionStorage.getItem('_id');
    const username = whatisthis(sessionStorage.getItem('name'));
    const userphone = whatisthis(sessionStorage.getItem('phone'));
    const useremail = whatisthis(sessionStorage.getItem('email'));
    const userpassword = sessionStorage.getItem('password');
    const userrole = whatisthis(sessionStorage.getItem('role'));
    const userpushtoken = whatisthis(sessionStorage.getItem('pushtoken'));
    const userallow = sessionStorage.getItem('allow');
    const userville = whatisthis(sessionStorage.getItem('ville'));
    const userbio = whatisthis(sessionStorage.getItem('bio'));
    const usersex = whatisthis(sessionStorage.getItem('sex'));
    const useravailability = sessionStorage.getItem('availability');
    const useraddress = whatisthis(sessionStorage.getItem('address'));


    if (user_id) {
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
        sessionStorage.clear();
        window.location.href = "login"
    }
};