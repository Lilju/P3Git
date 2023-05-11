//Ouvrir la fenêtre modale
const modal = document.querySelector("#modal");
function openModal() {
    modal.style.display = "flex";
    showProjectsModal();
  }
  document
  .querySelector("#btn1")
  .addEventListener("click", openModal);
  document
  .querySelector("#btn2")
  .addEventListener("click", openModal);
   
//Fermer la modale en cliquant sur la croix ou à l'extérieur de la fenêtre
let close = document.querySelector("#close");
let closeTwo = document.querySelector("#close2");
close.onclick = closeModal;
closeTwo.onclick = closeModal;
function closeModal() {
modal.style.display = "none";
document.querySelector(".photos-container").innerHTML = "";
}


window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
    document.querySelector(".photos-container").innerHTML = "";
}
}

//Faire apparaître les projets dans la modale
async function showProjectsModal() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    for (let i = 0; i < works.length; i++) {
        const modalWorks = document.querySelector(".photos-container");
        const figureElement = document.createElement("figure");
        figureElement.classList.add("modal-figure");
        figureElement.setAttribute("id", works[i].id);
        const imageElement = document.createElement("img");
        imageElement.src = works[i].imageUrl;
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = 'éditer';
        //Boutons et icônes
        const deleteButton = document.createElement("button");
        const moveButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
        moveButton.innerHTML = "<i class='fa-solid fa-arrows-up-down-left-right'></i>";
        deleteButton.classList.add("trash-icon");
        deleteButton.setAttribute("id", "delete" + works[i].id);
        moveButton.classList.add("move-icon");
        modalWorks.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        figureElement.appendChild(deleteButton);
        figureElement.appendChild(moveButton);
    }
    testDelete();    
};

//Faire apparaître la modale2 en cliquant sur le bouton "Ajouter une photo"
const firstModal = document.querySelector("#modal1");
const secondModal = document.querySelector("#modal2");
const backArrow = document.querySelector("#back-arrow");

document
 .getElementById("addpicture")
 .addEventListener("click", function openSecondModal() {
    firstModal.style.display = "none";
    secondModal.style.display = "flex";
 });

 //Revenir à la modale1 et annuler le preview en cliquant sur la flèche
 backArrow.addEventListener("click", backToFirstModal);
  function backToFirstModal() {
    firstModal.style.display = "block";
    secondModal.style.display = "none";
    document.getElementById("preview").removeAttribute("src");
    document.getElementById("preview-ui").style.display = "flex";
    document.getElementById("preview").style.display = "none";
  }

//Avant d'uploader un nouveau projet, afficher un preview de l'image
function showPreview(event) {
    if(event.target.files.length > 0){
        const src = URL.createObjectURL(event.target.files[0]);
        const preview = document.getElementById("preview");
        preview.src = src;
        preview.style.display = "block";
        const hideButton = document.getElementById("preview-ui");
        hideButton.style.display = "none";
    }
}