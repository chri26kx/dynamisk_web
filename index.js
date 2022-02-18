const url = "https://musik-d337.restdb.io/rest/musik";
const options = {
  headers: {
    "x-apikey": "7aa41eea49f685272e92a6b885689cb8dd470",
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
    if (filter == sang.kategori || filter == "alle") {
      const klon = template.cloneNode(true).content;
      klon.querySelector(".billede").src = "????/" + sang.billednavn + ".png";
      klon.querySelector(".sang").textContent = sang.sang;
      klon.querySelector(".kunstner").textContent = sang.kunstner;
      klon.querySelector(".genre").textContent = sang.genre;
      klon
        .querySelector("article")
        .addEventListener("click", () => visEnkelSang(sang));
      container.appendChild(klon);
    }
  });
}

function visEnkelSang(sang) {
  console.log(sang);

  singleView.style.display = "block";
  singleView.querySelector("img").src = "/" + sang.billednavn + ".png";
  singleView.querySelector("h2").textContent = sang.sang;
  singleView.querySelector(".").textContent = sang.kunstner;
  singleView.querySelector(".").textContent = sang.fact;

  document
    .querySelector(".luk")
    .addEventListener("click", () => (singleView.style.display = "none"));
}
