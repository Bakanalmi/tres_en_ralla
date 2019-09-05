var matrix = [[" "," "," "],[" "," "," "],[" "," "," "]];                   //matriu de consulta
var vic = 0;                                                                //victoria
var dispo = 9;

function pintar_linea (x, y, ori) {
    for (var i = 0; i < 3; ++i) {
        switch (ori) {
            case 'h':                                                       //horitzontal
                var pos = i + 3*y;                                          //calculàr posició a pintar
                var xua = "cas" + pos;
                document.getElementById(xua).style.color = "green";
                break;
            case 'v':                                                       //vertical
                var pos = 3*(i + x);                                        //calculàr posició a pintar
                var xua = "cas" + pos;
                document.getElementById(xua).style.color = "green";
                break;
            case 'd1':                                                      //diagonal
                var pos = 4*i;                                              //calculàr posició a pintar
                var xua = "cas" + pos;
                document.getElementById(xua).style.color = "green";
                break;
            case 'd2':                                                      //diagonal inversa
                var pos = 2-i + 3*i;                                        //calculàr posició a pintar
                var xua = "cas" + pos;
                document.getElementById(xua).style.color = "green";
                break;
        }
    }
    return;
}

function comprobar_victoria (x, y) {
    var fig = matrix[x][y];
    var pila = [];
    pila.push([0, y, 0, 'h']);                                              //cas horitzontal
    pila.push([x, 0, 0, 'v']);                                              //cas vertical
    if (x-y == 0) pila.push([0, 0, 0, 'd1']);                               //cas diagonal esquerra -> dreta
    else if (x+y == 2) pila.push([0, 2, 0, 'd2']);                          //cas diagonal dreta -> esquerra
    while (pila.length > 0) {
        var aux1 = pila.pop();
        if (fig == matrix[aux1[0]][aux1[1]]) {                              //comporbar que la casella conté el mateix caràcter
            if (aux1[2] >= 2)  {                                            //comprobar victoria
                pintar_linea(x, y, aux1[3]);
                return 1;
            }
            switch (aux1[3]) {                                              //empilar següent posició
                case 'h':
                    pila.push ([++aux1[0], aux1[1], ++aux1[2], aux1[3]]);
                    break;
                case 'v':
                    pila.push ([aux1[0], ++aux1[1], ++aux1[2], aux1[3]]);
                    break;
                case 'd1':
                    pila.push ([++aux1[0], ++aux1[1], ++aux1[2], aux1[3]]);
                    break;
                case 'd2':
                    pila.push ([++aux1[0], --aux1[1], ++aux1[2], aux1[3]]);
                    break;
            }
        }
    }
    return 0;
}

function assignar_lletra(casella, x, y, j) {
    if (j == 1) {
        casella.innerHTML = "O";
        matrix[x][y] = "O";                                                 //assignar caràcter a la matriu de consulta
        document.getElementById("jugador").innerHTML = "Jugador 2";         //assignar caràcter al .html
    }
    else {
        casella.innerHTML = "X";
        matrix[x][y] = "X";                                                 //assignar caràcter a la matriu de consulta
        document.getElementById("jugador").innerHTML = "Jugador 1";         //assignar caràcter al .html
    }
}

function reset () {
    for (var i = 0; i < 3; ++i) {                                           //bucle per borra tots els caràcteres de la matriu de consulta
        for (var j = 0; j < 3; ++j) {
            matrix[i][j] = " ";
        }
    }
    for (var i = 0; i < 9; ++i) {                                           //bucle per borra tots el caràcters del .html
        var aux2 = "cas" + i;
        document.getElementById(aux2).innerHTML = " ";
        document.getElementById(aux2).style.color = "black";
    }
    document.getElementById("jugador").innerHTML = "Jugador 1";             //reiniciar torns
    vic = 0;                                                                //permetre jugar
    dispo = 9;
}

function myFunction (casella, x, y) {
    if (matrix[x][y] == " " && !vic) {                                      //escriure en cas de que no hi hagi cap caràcter assignat o no s'ha produit cap victoria des del últim reset
        --dispo;
        var aux = document.getElementById("jugador").innerHTML;             //obtenir torn
        var j = aux.substr(8);
        assignar_lletra(casella, x, y, j);
        if (comprobar_victoria(x, y)) {
            var guany = "Guanyador " + aux;
            alert(guany);                                                   //missatge de victoria
            vic = 1;                                                        //victoria
        }
        if (dispo == 0) alert("no queden més posicions disponibles, reinicia el joc");
    }
    else if (dispo == 0) alert("no queden més posicions disponibles, reinicia el joc");
    else if (vic) alert("reinicia per poder seguir jugant");
    else alert("posició inválida");
}