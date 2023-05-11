//Effacer les travaux affichés par défaut
function clearWorks() {
  const refresh = document.querySelector('.gallery');
  refresh.innerHTML = "";
}
clearWorks();

//Fetch et affichage par défaut des travaux
async function fetchWorks () {
  const r = await fetch("http://localhost:5678/api/works")
  if (r.ok === true) {
    return r.json();
  }  
}
fetchWorks().then((works) => generateWorks(works))
//Fonction d'affichage des travaux
function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const workElement = document.createElement("figure");
        workElement.setAttribute("id", "work" + works[i].id);
        const imageElement = document.createElement("img");
        const fig = document.createElement("figcaption");
        imageElement.src = works[i].imageUrl;
        fig.innerText = works[i].title;
        workElement.appendChild(imageElement);        
        workElement.appendChild(fig);
        const gallery = document.querySelector('.gallery');
        gallery.appendChild(workElement);
  }
}

//Bouton Tous
const allButton = document.getElementById("all");
allButton.addEventListener("click", function () {  
  clearWorks();    
  fetchWorks().then((works) => generateWorks(works))
});

//Bouton objet
const objectButton = document.getElementById("objects");
objectButton.addEventListener("click", function () {  
  clearWorks();
  fetchWorks().then((works) => {
    let objet = works.filter(function(work) {
      return work.categoryId === 1;
    })
    generateWorks(objet);
  })
});

//Bouton appartement
const appartmentButton = document.getElementById("appartments");
appartmentButton.addEventListener("click", function () {
  clearWorks();
  fetchWorks().then((works) => {
    let appartment = works.filter(function(work) {
        return work.categoryId === 2;
    });
    generateWorks(appartment);
  })
});

//Bouton hotels
const hotelButton = document.querySelector("#hotels");
hotelButton.addEventListener("click", function () {
  const hotelResponse = fetch("http://localhost:5678/api/works")
   .then((hotelResponse) => { 
    return hotelResponse.json()
  })
   .then((hotelResponse) => {
    let hotelWorks = hotelResponse;
    let hotelFilter = hotelWorks.filter(function(work) {
      return work.categoryId === 3;
   })
    clearWorks();
    generateWorks(hotelFilter);
    });    
});
//Si le token est stocké dans le localstorage, modifier la page d'accueil
let token = window.localStorage.getItem("token");
if ( token !== null) {
  logoutlink.innerText = "logout";
  document.getElementById("btn1").classList.remove("hidden");
  document.getElementById("btn2").classList.remove("hidden");
  document.getElementById("btn3").classList.remove("hidden");
  filters.classList.add("hidden");
  document.querySelector('.edition-mode').classList.remove("hidden");  
}
