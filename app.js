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