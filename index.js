const url = "https://musik-d337.restdb.io/rest/musik";
const options = {
  headers: {
    "x-apikey": "620f6d3234fd6215658587b9",
  },
};

const mainHeader = document.querySelector("body h2");

// Når DOMContent er loaded kald funktionen start
document.addEventListener("DOMContentLoaded", start);
let sange;
let filter = "alle";

// Definere en variabel for knapperne i nav, tilføjer en eventListener for hver enkel kanp, som ved klik kalder funktionen filtrerSange -- Kald funktionen hentData:
function start() {
  // Definere variabel filtrerKnapper
  const filtrerKnapper = document.querySelectorAll("nav button");

  filtrerKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerSange)
  );

  // Kald funktionen hentData
  hentData(url);
}

// Venter på at dataen bliver hentet og laver den herefter om til jason -> kalder funktionen visSange
async function hentData(url) {
  const respons = await fetch(url, options);
  sange = await respons.json();
  console.log({ sange });
  visSange();
}

//
function filtrerSange() {
  console.log(this.dataset);

  //Fjerner klassen vlagt, og tilføjer den til den valgte knap
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  // Definerer f
  filter = this.dataset.kategori;

  // Kald funktionen visSange
  visSange();

  // Giver mainHeader teksten som den valgte knap
  mainHeader.textContent = this.textContent;
}

//
function visSange() {
  console.log("visSange");

  // Definerer variabler
  const container = document.querySelector("#container");
  const template = document.querySelector("template");

  container.textContent = "";

  sange.forEach((sang) => {
    if (filter == sang.Genre || filter == "alle") {
      const klon = template.cloneNode(true).content;

      // Tilføjer elementer fra Jason
      klon.querySelector(".billede").src = "billeder/" + sang.Billede + ".png";
      klon.querySelector(".sang").textContent = sang.Sang;
      klon.querySelector(".kunstner").textContent = sang.Kunstner;
      klon.querySelector(".genre").textContent = sang.Genre;

      // Tilføjer en EventListener der gør hver enkel article element klikbart og ved klik -> Kalder funktionen visEnkelSang
      klon
        .querySelector("article")
        .addEventListener("click", () => visEnkelSang(sang));

      //
      container.appendChild(klon);
    }
  });
}

// Definerer variablen singleView
const singleView = document.querySelector("#singleView");

// Kør Funktionen visEnkelSang -> Tilføjer de forskellige elementer fra Jason som skal være på sinlgeView sektionen --> Tilføjer 'display: "block"; til variablen singleView
function visEnkelSang(sang) {
  console.log(sang);

  singleView.querySelector(".billede").src =
    "billeder/" + sang.Billede + ".png";
  singleView.querySelector(".sang").textContent = sang.Sang;
  singleView.querySelector(".kunstner").textContent = sang.Kunstner;
  singleView.querySelector(".link").src = sang.Link;
  singleView.querySelector(".udgivelsesar").textContent = sang.Udgivelsesar;
  singleView.querySelector(".genre").textContent = sang.Genre;
  singleView.querySelector(".fact").textContent = sang.Fact;

  // Tilføjer 'display: "block"; til variablen singleView - Gør singleView siden synlig
  singleView.style.display = "block";
}

// Tilføjer en EventListener til classen luk, som gør at der ved klik  -> tilføjes i css 'display: "none";' til variablen singleView.
document
  .querySelector(".luk")
  .addEventListener("click", () => (singleView.style.display = "none"));

//      MENU
// Tilføjer EventListener til menu knappen og gør at ved klik så kalder den funktionen toggleMenu
document.querySelector(".dropbtn").addEventListener("click", toggleMenu);

// Toggler klassen show på dropdown-elementer
function toggleMenu() {
  console.log("toggle");

  document.querySelector(".dropdownElementer").classList.toggle("show");
}
