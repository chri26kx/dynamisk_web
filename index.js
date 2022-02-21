const url = "https://musik-d337.restdb.io/rest/musik";
const options = {
  headers: {
    "x-apikey": "620f6d3234fd6215658587b9",
  },
};

const mainHeader = document.querySelector("body h2");

document.addEventListener("DOMContentLoaded", start);
let sange;
let filter = "alle";

function start() {
  const filtrerKnapper = document.querySelectorAll("nav button");
  filtrerKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerSange)
  );

  hentData(url);
}

async function hentData(url) {
  const respons = await fetch(url, options);
  sange = await respons.json();
  console.log({ sange });
  visSange();
}

function filtrerSange() {
  console.log(this.dataset);

  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  filter = this.dataset.kategori;
  visSange();
  mainHeader.textContent = this.textContent;
}

function visSange() {
  console.log("visSange");

  const container = document.querySelector("#container");
  const template = document.querySelector("template");

  container.textContent = "";

  sange.forEach((sang) => {
    if (filter == sang.Genre || filter == "alle") {
      const klon = template.cloneNode(true).content;
      klon.querySelector(".billede").src = "billeder/" + sang.Billede + ".png";
      klon.querySelector(".sang").textContent = sang.Sang;
      klon.querySelector(".kunstner").textContent = sang.Kunstner;
      klon.querySelector(".genre").textContent = sang.Genre;
      klon
        .querySelector("article")
        .addEventListener("click", () => visEnkelSang(sang));
      container.appendChild(klon);
    }
  });
}
const singleView = document.querySelector("#singleView");
function visEnkelSang(sang) {
  console.log(sang);

  singleView.querySelector(".billede").src =
    "billeder/" + sang.Billede + ".png";
  singleView.querySelector(".sang").textContent = sang.Sang;
  singleView.querySelector(".kunstner").textContent = sang.Kunstner;
  // singleView.querySelector(".udgivelsesår").textContent = sang.Udgivelses år;
  singleView.querySelector(".genre").textContent = sang.Genre;
  singleView.querySelector(".fact").textContent = sang.Fact;
  singleView.style.display = "block";
}

document
  .querySelector(".luk")
  .addEventListener("click", () => (singleView.style.display = "none"));
