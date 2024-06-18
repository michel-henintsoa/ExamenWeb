document.addEventListener('DOMContentLoaded', async () => {         //evenement sur la recharge de la page
    const listContainer = document.getElementById("list-book")
    const butsearch = document.getElementById("butsearch")
    try {
        const response = await fetch('js/json/data.json')           //prise des données par un fichier json
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText)
        }
        const data = await response.json()
        console.log('Fetched data:', data)
        
        /* test si le local storage n'a pas encore été créer */
        const tmpData = localStorage.getItem("localData")           
        if(!tmpData){
            localStorage.setItem("localData", JSON.stringify(data))
        }

        let donnee = JSON.parse(localStorage.getItem("localData"))

        /* valeur de la section de recherche par rapport au titre à l'auteur ou au genre*/
        butsearch.addEventListener("click", (e)=>{
            const search = document.getElementById("recherche").value
            if(search){
                donnee = donnee.filter(item => (item.titre === search || item.auteur === search || item.genre === search))
            }
        })
        
        Object.keys(donnee).forEach(key => {
            const list = donnee[key]
            list.forEach(el => {
                let div = document.createElement('div')
                div.classList.add('list-content')
                div.innerHTML = `
                    <br><br>
                    <div style="width: 60%">
                        <font>Titre : </font>${el.titre}<br>
                        <font>Auteur : </font>${el.auteur.join(', ')}<br>
                        <font>Genre : </font>${el.genre}
                    </div>
                `
                let divContent = document.createElement('div')

                let buttonDetails = document.createElement('button')
                // buttonDetails.style.padding = "1em"
                buttonDetails.style.margin = "1em"
                buttonDetails.textContent = "Details"
                buttonDetails.addEventListener("click",()=>{
                    const detail = document.getElementById('details-book')
                    detail.innerHTML = `
                        <font>Titre : </font>${el.titre}<br>
                        <font>Auteur : </font>${el.auteur.join(', ')}<br>
                        <font>Editeur : </font>${el.editeur}<br>
                        <font>Date de Publication : </font>${el.datePublication}<br>
                        <font>Genre : </font>${el.genre}<br>
                        <font>Langage : </font>${el.langue}<br>
                        <font>Resumé : </font><p>${el.resume}</p>
                        <font>Nombre de pages : </font>${el.nombrePages}<br>
                        <font>Disponibilité : </font>${el.disponibil ? "Disponible" : "Indisponible"}<br>
                        <font>Etat : </font>${el.etat}<br>
                        <font>Emplacement : </font>${el.emplacement}<br>
                        <img src="${el.image}" alt="${el.titre}" width="50px">
                    `
                })
            
                let buttonSupprime = document.createElement('button')
                buttonSupprime.textContent = "Supprimer"
                buttonSupprime.style.margin = "1em"
                buttonSupprime.addEventListener("click", ()=>{
                    const updatedList = donnee[key].filter(item => item.titre != el.titre)
                    donnee[key] = updatedList
                    localStorage.setItem("localData", JSON.stringify(donnee))
                    div.remove()
                })

                divContent.appendChild(buttonDetails)
                divContent.appendChild(buttonSupprime)
                div.appendChild(divContent)
                div.appendChild(document.createElement('hr'))

                listContainer.appendChild(div)
            })
        })

    } catch (error) {
        console.error("Erreur d'ouverture : ", error)
        listContainer.innerHTML = "Erreur lors de l'ouverture de la liste"
    }
})
/** Ajout d'element à la liste */
document.getElementById("formAdd").addEventListener('submit', async (e) => {
    e.preventDefault();
    let titre = document.getElementById("titre").value;
    let author = document.getElementById("author").value;
    let img = document.getElementById("image").value;
    let editeur = document.getElementById("editor").value;
    let date = document.getElementById("date").value;
    let genre = document.getElementById("genre").value;
    let resume = document.getElementById("resume").value;
    let langue = document.getElementById("langue").value;
    let nombrepage = document.getElementById("pages").value;
    let disp = document.getElementById("disp").value;
    let etat = document.getElementById("etat").value;
    let emplacement = document.getElementById("emplacement").value;

    let newBook = {
        "titre": titre,
        "auteur": [author],
        "isbn": "978-207-036822-8",
        "image": img,
        "editeur": editeur,
        "datePublication": date,
        "genre": genre,
        "resume": resume,
        "langue": langue,
        "nombrePages": Number(nombrepage),
        "disponibil": (disp === "true"),
        "etat": etat,
        "emplacement": emplacement
    };

    try {
        let donnee = JSON.parse(localStorage.getItem("localData"));
        if (!donnee) {
            donnee = {};
        }
        
        // Générer une nouvelle clé pour le livre (par exemple, "livreX" où X est le prochain nombre)
        let newKey = "livre" + (Object.keys(donnee).length + 1);
        donnee[newKey] = [newBook];
        localStorage.setItem("localData", JSON.stringify(donnee));

    } catch (error) {
        console.error("Erreur d'ouverture : ", error);
    }
    finally{
        location.reload()
    }
});
