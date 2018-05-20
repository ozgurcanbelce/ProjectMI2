var startpaginaBtn = document.querySelector('.startpagina-btn');
var kaders = Array.from(document.querySelectorAll('.kader'));
var startpagina = document.querySelector('.startpagina');
var startpaginaTitel = document.querySelector('.startpagina-titel');

startpaginaBtn.addEventListener('click', () => {
    startpagina.style.display = "none";
    startNieuwSpel();
});

function startNieuwSpel() {
    kaders.map(kader => {
        kader.classList.remove('X');
        kader.classList.remove('O');
        kader.textContent = "";
        return kader;
    });
}
kaders.map(kader => {
    kader.addEventListener('click', aantal);
});

var pogingen = true;
var teller = 0

function aantal() {
    if (this.textContent === "") {
        ++teller;
        if (pogingen) {
            this.classList.add('X');
            this.textContent = "X";
            pogingen = false;
        }
        else {
            this.classList.add('O');
            this.textContent = "O";
            pogingen = true;
        }
    }
    /*als het gelijkspel is*/
    var winnaar = gewonnen();
    console.log(winnaar);
    if (winnaar) {
        window.setTimeout(spelEinde(winnaar));
        teller = 0;
    }
    else if (teller === 9) {
        teller = 0;
        window.setTimeout(spelEinde());
    }
}

function spelEinde(welkeIsWelke) {
    if (welkeIsWelke === "X") {
        startpagina.style.display = "block";
        startpaginaTitel.innerHTML = '<span class="X">X </span>Winnaar!'
    }
    else if (welkeIsWelke === "O") {
        startpagina.style.display = "block";
        startpaginaTitel.innerHTML = '<span class="O">O </span>Winnaar!'
    }
    else {
        startpagina.style.display = "block";
        startpaginaTitel.innerHTML = 'Gelijkspel!'
    }
}

function gewonnen() {
    var extraKaders = document.querySelectorAll('.kader');
    var kaders = [
    []
    , []
    , []
  ];
    var i;
    for (i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var el = extraKaders[i * 3 + j];
            if (el.classList.contains('X')) {
                kaders[i][j] = 'X';
                console.log("kader " + i + " " + j + "X");
            }
            if (el.classList.contains('O')) {
                kaders[i][j] = 'O';
                console.log("kader " + i + " " + j + "y");
            }
        }
    }
    if (
        ((kaders[0][0] === kaders[1][1]) && (kaders[1][1] === kaders[2][2])) || ((kaders[2][0] === kaders[1][1]) && (kaders[1][1] === kaders[0][2]))) {
        return kaders[1][1];
    }
    for (i = 0; i <= 2; i++) {
        if ((kaders[0][i] === kaders[1][i]) && (kaders[1][i] === kaders[2][i] && kaders[0][i] && kaders[1][i] && kaders[2][i])) {
            return kaders[0][i];
        }
        if ((kaders[i][0] === kaders[i][1]) && (kaders[i][1] === kaders[i][2] && kaders[i][0] && kaders[i][1] && kaders[i][2])) {
            return kaders[i][0];
        }
    }
}