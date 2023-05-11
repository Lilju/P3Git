

function login() {
  const loginInfo = {
    email: email.value,
    password: password.value
  };
  const regex = new RegExp('(.*)@(.*)([.])(.*)');
    if (!loginInfo.password || !regex.test(loginInfo.email)) {
        erreurLogin();
        return;
    } else {
  fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),  
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.token === undefined) {
        erreurLogin();
      } else {
        localStorage.setItem("token", data.token);
      window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

loginform.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});

let token = window.localStorage.getItem("token");
if ( token !== null) {
  loginlink.innerText = "logout";
}

//Afficher à l'utilisateur si la connexion a échoué
function erreurLogin() {
     document.getElementById("password-error").innerText = "Erreur dans l’identifiant ou le mot de passe";
}  