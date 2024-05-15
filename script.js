let currentPageUrl = "https://rickandmortyapi.com/api/character";

window.onload = async () => {
  try {
    await loadCharacters(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar cards");
  }

  const nextButton = document.getElementById("next-button");
  nextButton.addEventListener("click", loadNextPage);

  const backButton = document.getElementById("back-button");
  backButton.addEventListener("click", loadPreviousPage);
};

async function loadCharacters(url) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = ""; // Limpa os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((character) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url(${character.image})`;  //mudar
      card.className = "cards";
      const characterNameBG = document.createElement("div");
      characterNameBG.className = "character-name-bg";
      const characterName = document.createElement("span");
      characterName.className = "character-name";
      characterName.innerText = `${character.name}`;
      characterNameBG.appendChild(characterName);
      card.appendChild(characterNameBG);
      
      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";
        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = "";

        const characterImage = document.createElement("div");
        characterImage.style.backgroundImage = `url(${character.image})`;   //mudar
        characterImage.className = "character-image";

        const name = document.createElement("span");
        name.className = "character-details";
        name.innerText = `Nome: ${character.name}`;

        const characterStatus = document.createElement("span");      //mudar
        characterStatus.className = "character-details";
        characterStatus.innerText = `Status: ${convertStatus(character.status)}`;

        const species = document.createElement("span");                      //muda
        species.className = "character-details";
        species.innerText = `Especies: ${convertSpecies(character.species)}`;

        const gender = document.createElement("span");                     //muda
        gender.className = "character-details";
        gender.innerText = `Genero: ${convertGender(character.gender)}`;
                                                                         //muda
        const origin = document.createElement("span");
        origin.className = "character-details";
        origin.innerText = `Origem: ${character.origin.name === "unknown" ? "Desconhecida" : character.origin.name }`;


        modalContent.appendChild(characterImage);
        modalContent.appendChild(name);
        modalContent.appendChild(characterStatus);
        modalContent.appendChild(species);
        modalContent.appendChild(gender);
        modalContent.appendChild(origin);
      };
      const mainContent = document.getElementById("main-content");
      mainContent.appendChild(card);
    });

    // Habilita ou desabilita os botões de acordo com a presença de URLs de próxima e página anterior
    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");
    nextButton.disabled = !responseJson.info.next;
    backButton.disabled = !responseJson.info.prev;

    backButton.style.visibility = responseJson.info.prev ? "visible" : "hidden";

    currentPageUrl = url;
  } catch (error) {
    throw new Error("Erro ao carregar personagens");
  }
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}



  

function convertStatus(status) {
  const characterStatus = {
    alive: "Vivo",
    dead:  "Morto",
    unknown: "desconhecido",
  };
  return characterStatus [status.toLowerCase()] || status;

}

function convertSpecies(species) {
  const characterSpecies = {
    human: "Humano",
    alien:  "Alienigina",
    humanoid: "Humanoide",
    robot: "Robo",
    unknown: "Desconhecido",
    "mythological creature": "Criatura Mitologica",
    disease: "Doença",


    
    
  };
  
  return characterSpecies [species.toLowerCase()] || species;

}



function convertGender(gender) {
  const characterGender = {
    male: "Macho",
    female:  "Femea",
    unknown: "Desconhecido",
    
  };
  return characterGender [gender.toLowerCase()] || gender;

}



function convertOrigin(origin) {
  return origin;
}
  




async function loadNextPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.info.next);
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar a próxima página");
  }
}

async function loadPreviousPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.info.prev);
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar a página anterior");
  }
}
