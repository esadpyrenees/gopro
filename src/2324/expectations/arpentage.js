

let main = document.querySelector('main article');
let childnodes = main.children;
let step = Math.floor(childnodes.length / 7);

for (let index = 0; index <= 7; index ++) {
  const element = childnodes[index * step];
  console.log(element); 
  element.insertAdjacentHTML('beforebegin', `<hr> <h2>GROUPE ${index + 1}</h2>`)
}

const liste = [
  "Marjorie B.",
  "Solange C.",
  "Ryan C.",
  "Maëva H.",
  "Morgane L.",
  "Yuyuan M.",
  "Mélina M.",
  "Émilie R.",
  "Izis S.",
  "Kassandra V.",
  "Sarah B.", 
  "Anita B.",
  "Maxime C.",
  "Coralie E.",
  "Amandine L.",
  "Coline M.",
  "Morganne M.",
  "Emma M.",
  "Alice M.",
  "Guilhem P.",
  "Aurore T."
  ]

  document.onclick = () => {
      for (let i = liste.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [liste[i], liste[j]] = [liste[j], liste[i]];
      }

      let randomized = liste.reduce((liste, item, idx) => (liste[idx / 3 | 0] ??= []).push(item) && liste, []);

      console.log(JSON.stringify(randomized));
  }