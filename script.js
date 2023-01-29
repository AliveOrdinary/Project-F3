const superHeroName = document.getElementById("super_hero");

const submitBtn = document.getElementById("sub_btn");

const superResult = document.getElementById("super_result");

const superHeroDetails = document.getElementById('superhero_result');

let favHeros = []



function searchSuperHero() {
    const sName = superHeroName.value;
    console.log("searching")
    fetchSuperHeroData(sName);
}


let superHeros = JSON.parse(localStorage.getItem('superHeros')) || [];



async function fetchSuperHeroData(name) {

    try {
        const response = await fetch(`https://www.superheroapi.com/api.php/1628132770683309/search/${name}`);

        const superData = await response.json();

        superHeros = superData.results;

        localStorage.setItem('superHeros', JSON.stringify(superData.results));

        console.log(superData);

        for(let i =0; i <superData.results.length; i++){
            
            renderSuperData(superData.results[i],i);

        }


        if(superData.response == "error"){
            throw new Error();
        }
    } catch (error) {
        console.log("Sorry, No such superhero");
    }

}

function renderSuperData(data, index){
    let div = document.createElement('div');
    div.id = index;
    div.onclick = (event)=>{
        handleSuperHeroClick(data)
    }

    div.innerHTML =
    `
    <h1>${data.name}</h1>

    <img src="${data.image.url}">

    `

    div.classList.add('superherocards'); 

    superResult.appendChild(div); 

}


function handleSuperHeroClick(superHeroDetails){
    let superHeros = JSON.parse(localStorage.getItem('superHeros')) || [];
    // window.open("superhero.html")
    renderSuperHeroDetails(superHeroDetails)
    // setTimeout((superHeros , index) => {
    //     renderSuperHeroDetails(superHeros[indexId])
    // }, 3000);
}

function renderSuperHeroDetails(data){
    document.getElementById("main-container").style.display = "None"
    let detailsContainer = document.getElementById("details-container")
    document.getElementById("details-container").style.display = ""

    
    // console.log(data)
    let div = document.createElement('div');
    let detailsdiv = document.createElement('div')
    detailsdiv.setAttribute('id','details-div')


    div.innerHTML=
    `
    <h1>${data.name}</h1>

    <img width="150px" src="${data.image.url}">

    <button id="add-fav-btn">Add Fav</button>
    <button id="home-btn">Home</button>
    
    `

    detailsdiv.innerHTML = 
    `
    <h3>Appearance</h3>
    <p>${JSON.stringify(data.appearance)}</p>
    <h3>Powerstats</h3>
    <p>${JSON.stringify(data.powerstats)}</p>
    <h3>Biography</h3>
    <p>${JSON.stringify(data.biography)}</p>
    <h3>Work</h3>
    <p>${JSON.stringify(data.work)}</p>
    <h3>Connections</h3>
    <p>${JSON.stringify(data.connections)}</p>
    
    `
    detailsContainer.appendChild(div)
    detailsContainer.appendChild(detailsdiv)

    document.addEventListener("click", function(e){
        const target = e.target.closest("#home-btn"); // Or any other selector.
      
        if(target){
            detailsContainer = " "
            document.getElementById("main-container").style.display = ""
            superResult.innerHTML = ""
            div.innerHTML= ""
            detailsdiv.innerHTML = ""
        }
      });
    document.addEventListener("click", function(e){
        const target = e.target.closest("#add-fav-btn"); // Or any other selector.
      
        if(target){
           favHeros.push(data.name)
           console.log(favHeros)
        }
      });


    // superHeroDetails.appendChild(div)
}

submitBtn && submitBtn.addEventListener("click", searchSuperHero);



