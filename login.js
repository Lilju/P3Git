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

document.getElementById("loginform").addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});

//Logout
let token = window.localStorage.getItem("token");
if ( token !== null) {
  const loginLink = document.getElementById("loginlink");
  loginLink.innerText = "logout";
  loginLink.addEventListener("click", (e)=> {
    localStorage.removeItem("token");
    loginLink.innerText = "login";
    window.location.replace("index.html");
}
);
}

//Afficher à l'utilisateur si la connexion a échoué
function erreurLogin() {
     document.getElementById("password-error").innerText = "Erreur dans l’identifiant ou le mot de passe";
} 

