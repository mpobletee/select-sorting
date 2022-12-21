/* eslint-disable */
import "bootstrap";
import "./style.css";

window.onload = function() {
  //write your code here
  let btnDraw = document.querySelector("#draw");
  let btnSort = document.querySelector("#sort");
  let amount = document.querySelector("#amount");
  let contenedor = document.querySelector(".contenedor-cartas");
  let selectDiv = document.querySelector(".selectSort");
  let deck = [];

  const crearDeck = () => {
    let valores = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K"
    ];
    let tipos = ["Hearts", "Diamonds", "Spades", "Clubs"];

    for (let i = 0; i < tipos.length; i++) {
      for (let j = 0; j < valores.length; j++) {
        const valor = valores[j];
        const tipo = tipos[i];

        deck.push({ valor, tipo });
      }
    }
    return deck;
  };

  let randomCard = elem => {
    const random = Math.floor(Math.random() * 51);
    const valorCarta = deck[random].valor;
    const tipoCarta = deck[random].tipo;

    let icono = "";
    if (tipoCarta === "Hearts") icono = "&hearts;";
    if (tipoCarta === "Diamonds") icono = "&diams;";
    if (tipoCarta === "Spades") icono = "&spades;";
    if (tipoCarta === "Clubs") icono = "&clubs;";

    const divCarta = document.createElement("div");
    divCarta.classList.add("carta");
    divCarta.innerHTML = `
  <div class="header"> ${icono} </div> 
  <div class="valor"> ${valorCarta} </div>
  <div class="footer"> ${icono} </div>
  `;
    contenedor.appendChild(divCarta);
    if (icono == "&hearts;" || icono == "&diams;") {
      divCarta.classList.add("text-danger");
    }
  };

  btnDraw.addEventListener("click", () => {
    contenedor.innerHTML = "";
    selectDiv.innerHTML = "";
    let cantidad = amount.value;

    if (cantidad > 0) {
      for (let i = cantidad; i > 0; i--) {
        randomCard(crearDeck());
      }
    }
  });

  btnSort.addEventListener("click", () => {
    // bubbleDiv.innerHTML = contenedor.innerHTML;
    let contenedorCarta = document.querySelector(".contenedor-cartas");
    let grupoDivsCartas = contenedorCarta.childNodes;

    let arrValor = [];
    for (let i = 0; i < grupoDivsCartas.length; i++) {
      let cuerpoDivCarta = grupoDivsCartas[i].textContent;
      let expresionRegular = /\s*/;
      let valorNumericoCarta = cuerpoDivCarta.trim();
      const valorFinal = valorNumericoCarta.split(expresionRegular)[1];
      if (valorFinal === "1") {
        valorFinal = 10;
      } else if (valorFinal === "A") {
        valorFinal = 1;
      } else if (valorFinal === "J") {
        valorFinal = 11;
      } else if (valorFinal === "Q") {
        valorFinal = 12;
      } else if (valorFinal === "K") {
        valorFinal = 13;
      } else if (valorFinal !== Number) {
        valorFinal = valorFinal * 1;
      }
      arrValor.push(valorFinal);
    }
    // console.log(arrValor);

    //BUBBLE SORTING
    /* let bubbleSort = arr => {
      let wall = arr.length - 1; //we start the wall at the end of the array
      while (wall > 0) {
        let index = 0;
        while (index < wall) {
          //compare the adjacent positions, if the right one is bigger, we have to swap
          if (arr[index] > arr[index + 1]) {
            let aux = arr[index];
            arr[index] = arr[index + 1];
            arr[index + 1] = aux;
          }
          index++;
        }
        wall--; //decrease the wall for optimization
      }
      return arr;
    }; */

    //SELECT SORTING
    const selectSort = arr => {
      let min = 0;
      while (min < arr.length - 1) {
        for (let i = min + 1; i < arr.length; i++) {
          if (arr[min] > arr[i]) {
            let aux = arr[min];
            arr[min] = arr[i];
            arr[i] = aux;
          }
        }
        min++;
      }
      return arr;
    };

    /* let sortListo = bubbleSort(arrValor);
    let cc = document.querySelector(".contenedor-cartas");
    let ccChildren = cc.childNodes;
    for (let i = 0; i < ccChildren.length; i++) {
      let dCartas = ccChildren[i];
      console.log(sortListo);
      console.log(dCartas);
    } */

    // let sortedFinal = randomCard(arrValor);
    selectSort(arrValor);
    arrValor.forEach(element => {
      const divCartaSorted = document.createElement("div");
      divCartaSorted.classList.add("carta");
      // let newIcono = contenedor.childNodes[2];
      // console.log(contenedor.childNodes);
      if (element === 1) {
        element = "A";
      }
      if (element === 11) {
        element = "J";
      }
      if (element === 12) {
        element = "Q";
      }
      if (element === 13) {
        element = "K";
      }
      divCartaSorted.innerHTML = `
      
      <div class="valor"> ${element} </div>
      `;

      selectDiv.appendChild(divCartaSorted);
    });
  });
};
