import { fetchWorks, generateWorks, clearWorks } from "./app.js";

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
  document.querySelector(".photos-container").innerHTML = "";
  modal.style.display = "none";
}


window.onclick = function(event) {
if (event.target == modal) {
  backToFirstModal();
  closeModal();    
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
        figureElement.setAttribute("id", "workModal" + works[i].id);
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
        deleteButton.setAttribute("id", works[i].id);
        moveButton.classList.add("move-icon");
        modalWorks.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        figureElement.appendChild(deleteButton);
        figureElement.appendChild(moveButton);
    }
    deleteWork();
    modal.style.display = "flex";  
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
    document.getElementById("size-error").style.display = "none";
    document.getElementById("add-form").reset();
  }

//Avant d'uploader un nouveau projet, afficher un preview de l'image
uploadphoto.addEventListener("change", showPreview);
function showPreview(event) {
    if(event.target.files.length > 0 && event.target.files[0].size < 4000000){
        const src = URL.createObjectURL(event.target.files[0]);
        const preview = document.getElementById("preview");
        preview.src = src;
        preview.style.display = "block";
        const hideButton = document.getElementById("preview-ui");
        hideButton.style.display = "none";
    } else {
        document.getElementById("size-error").innerHTML = "La taille de l'image ne doit pas dépasser 4Mo";
        setTimeout(function(){
          document.getElementById("add-form").reset();
          const preview = document.getElementById("preview");
        preview.src = "";
        preview.style.display = "none";
          document.getElementById("size-error").innerHTML = ""; }, 3000);
    }
};

//Effacer un des projets en cliquant sur l'icône poubelle
function deleteWork() {
    let trashes = document.querySelectorAll(".trash-icon");
    for (let trashIcon of trashes) {
      trashIcon.addEventListener("click",(e)=> {
        e.stopPropagation();
        const id = ((e.target).parentNode.id);
        const figureToDelete = document.getElementById("work"+id);
        const figureToDeleteModal = document.getElementById("workModal"+id);
        const token = localStorage.getItem("token"); 
        fetch(`http://localhost:5678/api/works/${id}`,{
          method:"DELETE",
           headers: {
          'authorization': `Bearer ${token}`,
          }
        })
        .then (response => {
          if (response.status === 204 ) {
          figureToDelete.remove();
          figureToDeleteModal.remove();
          } 
        }) 
      }) 
    } 
  }
//Bloquer l'envoi si les champs du formulaire d'ajout ne sont pas remplis
function validateForm() {
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;
  let file = document.getElementById("uploadphoto");
  if (title == "" || category == "" || !file.files[0]) {
    document.getElementById("validate").disabled = true;
    validate.style.backgroundColor = "#A7A7A7";
    document.getElementById("size-error").innerHTML = "Veuillez renseigner un titre et une catégorie et ajouter une image";
    return false;
  } else if (file.files[0].size > 4000000) {
    document.getElementById("size-error").innerHTML = "La taille de l'image ne doit pas dépasser 4Mo";
    validate.style.backgroundColor = "#A7A7A7";
    return false;
  } else {
    document.getElementById("validate").disabled = false;
    validate.style.backgroundColor = "#1D6154";
    document.getElementById("size-error").style.display = "none";
    return true;
  }
};
//En cliquant sur le bouton Valider, envoi du nouveau projet avec un fetch POST
document.querySelector("#add-form").addEventListener("submit",(e)=> {
  e.preventDefault();
  if(validateForm()) {
    fetchPostWork();
  }
});

async function fetchPostWork() {
    try {
      const token = localStorage.getItem("token");
const file = document.querySelector("#uploadphoto");
const title = document.querySelector("#title");
const category = document.querySelector("#category");
let formData = new FormData();
formData.append('image', file.files[0]);
formData.append('title', title.value);
formData.append('category', category.selectedIndex);

      const response = await fetch("http://localhost:5678/api/works",{
        method: "POST",
        headers: {
          'authorization': `Bearer ${token}`,
        },
        body: formData  
      });
      const rep = await response.json();
      if (response.status === 201) { 
        backToFirstModal();
        closeModal();
        document.querySelector(".photos-container").innerHTML = "";
        clearWorks();
        fetchWorks().then((works) => generateWorks(works));
        document.querySelector("#add-form").reset();
      } else {
        console.log('Une erreur est survenue', rep);
      }
    } catch (err) {
      console.log('Une erreur est survenue', err);
    }
  }
