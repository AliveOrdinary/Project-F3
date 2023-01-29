const superHeroName = document.getElementById("super_hero");

const submitBtn = document.getElementById("sub_btn");

const superResult = document.getElementById("super_result");

const superHeroDetails = document.getElementById('superhero_result');



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
        handleSuperHeroClick(event)
    }

    div.innerHTML =
    `
    <h1>${data.name}</h1>

    <img src="${data.image.url}">

    `

    div.classList.add('superherocards'); 

    superResult.appendChild(div); 
}


function handleSuperHeroClick(event){
    let superHeros = JSON.parse(localStorage.getItem('superHeros')) || [];
    const index = event.target.id;
    window.open("superhero.html")
    setTimeout((superHeros , index) => {
        renderSuperHeroDetails(superHeros[index])
    }, 3000);
}

function renderSuperHeroDetails(data){
    let div = document.createElement('div');


    div.innerHTML=
    `
    <h1>${data.name}</h1>

    <img src="${data.image.url}">
    
    `

    superHeroDetails.appendChild(div)
}

submitBtn && submitBtn.addEventListener("click", searchSuperHero);



