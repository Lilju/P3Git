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

//Logout click bouton innerText login et localStorage.removeItem

function logOut() {
  if (logoutlink.innerText === "logout") {
    logoutlink.addEventListener("click", ()=> {
      localStorage.removeItem("token");
      logoutlink.innerText = "login";
      window.location.replace("index.html"); 
  }
 )};
}
/*
 
//Afficher à l'utilisateur si la connexion a échoué, message “Erreur dans l’identifiant ou le mot de passe”

  if (response.ok === true) {
    
    let result = await response.json()
    //Stocker le token dans le localStorage
    localStorage.setItem("token", result.token)
    //Si la connexion est bien effectuée, login-link.innerText = logout
    let loginButton = document.querySelector("#login-link").innerText = "logout";
  } else {
    throw new Error("Une erreur est survenue");
  }

}
*/

    /*
    const submitInfos = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value
    }
  
   const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitInfos),  
    })
      .then(console.log('Submit ok'))
      .then(response => response.json())
      .then((result) => {
        if (result.error) {
          document.querySelector('.login-error').innerText = "Erreur dans l'identifiant";
          document.querySelector('.login-error').style.color = red;
        }
        else {
          document.querySelector('.login-error').innerText = "Connexion réussie.";
        }
        if (response.token != undefined) {
          //Stocker le token dans le localStorage
          localStorage.setItem("token", response.token);
          console.log("token" + response.token);
      }
      let loginButton = document.querySelector("#login-link").innerText = "logout";
    
    document.querySelector('.edition-mode').classList.remove("hidden");
    document.querySelector('.filter-buttons').classList.add("hidden");
    document.querySelector('.edit').classList.remove("hidden");
      });  
  }
  
  /*
  //Vérifier que le contenu des champs est correct
  function isValid(value) {
   if (document.querySelector("#email").value === "sophie.bluel@test.tld" && document.querySelector("#password").value === "s0phie") {
    console.log('Champs corrects');
   }
  }
  
  //Faire apparaître la modale en cliquant sur modifier
  document
    .querySelector('#edit')
    .addEventListener("click", function(e) {
  
    })
  */   