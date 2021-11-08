const minBreiteDerTabelle = 5
const maxBreiteDerTabelle = 45
const ersteZahlInTabelle = 0
const derReiheNach = 1
const irgendwie = 2
const primzahl = 1
const keinePrimzahl = 2
const primzahlInFalscherReihenfolge = 3
var body = document.getElementsByTagName("body")[0]
var breiteDerTabelle = 5
var groessteZahl = breiteDerTabelle*breiteDerTabelle -1


//Beschreibung des Spiels, kann direkt in render-Funktion geschrieben werden.
function beschreibungDesSpiels(){
    var beschreibung = document.getElementById("beschreibung")
    if (beschreibung){
        body.removeChild(beschreibung)
    }
    beschreibung = document.createElement("div")
    beschreibung.id = "beschreibung"
    var ueberschrift = document.createElement("h1")
    ueberschrift.innerHTML = "<h1> Primzahlen finden </h1>"
    var anzahlAbsaetze = 4
    for (var absatzNummer = 1; absatzNummer <= anzahlAbsaetze; absatzNummer++){
        var absatz= document.createElement("p")
        absatz.id = `absatz${absatzNummer}`
        body.appendChild(absatz)
    }
    var absatz1 = document.getElementById("absatz1")
    absatz1.innerHTML =  "<p> Ziel des Spiels: Durch das Anklicken der Primzahlen in der Tabelle unten moeglichst viele Punkte gewinnen."
    var absatz2 = document.getElementById("absatz2")
    absatz2.innerHTML = "<p> Du kannst in den Optionen die Vorgehensweise, in welcher Reihenfolge die Primzahlen angeklickt werden sollen, und die Breite der Tabelle aendern.<br> Wenn du \"der Reihe nach\" anklickst, musst du immer die naechst groessere Primzahl anklicken.</p>"
    var absatz3 = document.getElementById("absatz3")
    absatz3.innerHTML = "<p> Gruene Zellen: Diese Zellen beinhalten eine Primzahl.<br> Orange Zellen: Diese Zellen beinhalten eine Primzahl, du hast sie aber nicht in der richtigen Reihenfolge angeklickt. <br> Rote Zellen: Diese Zellen beinhalten keine Primzahl."
    var absatz4 = document.getElementById("absatz4")
    absatz4.innerHTML = "<p> Unter der Tabelle siehst du deinen aktuellen Punktestand. </p>"
    beschreibung.appendChild(ueberschrift)
    beschreibung.appendChild(absatz1)
    beschreibung.appendChild(absatz2)
    beschreibung.appendChild(absatz3)
    beschreibung.appendChild(absatz4)
    body.appendChild(beschreibung)
}

function ueberschriftListenfelder(){
    var ueberschrift = document.getElementById("ueberschrift1")
    if (ueberschrift){
        body.removeChild(ueberschrift)
    }
    ueberschrift = document.createElement("p")
    ueberschrift.id = "ueberschrift1"
    ueberschrift.innerHTML = "<p><br> 1. Gib die Breite der Tabelle an: </p>"
    body.appendChild(ueberschrift)
}


function breiteDerTabelleAendern(neueBreite){
    breiteDerTabelle = parseInt(neueBreite.value)
    groessteZahl = breiteDerTabelle * breiteDerTabelle-1
    arrayFuerTabelle()
    primzahlen = zahlenInTabelle.slice(0, groessteZahl+1)
    sieben()
    primzahlen = primzahlen.filter (element => element > 0)
    zustandZellenDefinieren()
    render() 
}

function ueberschriftOptionsfelder(){
    var ueberschrift = document.getElementById("ueberschrift2")
    if (ueberschrift){
        body.removeChild(ueberschrift)
    }
    ueberschrift = document.createElement("p")
    ueberschrift.id = "ueberschrift2"
    ueberschrift.innerHTML = "<p> 2. Die Primzahlen sollen folgendermassen angeklickt werden:</p>" 
    body.appendChild(ueberschrift)
}


//ViewModel für Tabelle
var zahlenInTabelle = []
function arrayFuerTabelle(){
    zahlenInTabelle = []
    for (var zahl = ersteZahlInTabelle; zahl <= groessteZahl; zahl++){
        zahlenInTabelle.push(zahl)
    }
}


function sieben(){
    var aktuelleSiebzahl = 4
    var aktuellerSummand = 2
    primzahlen[0] = "X"
    primzahlen[1] = "X"
    while (aktuellerSummand < groessteZahl){
        while(aktuelleSiebzahl <= groessteZahl){
            primzahlen[aktuelleSiebzahl] = "X"
            aktuelleSiebzahl += aktuellerSummand
        }
        aktuellerSummand++
        aktuelleSiebzahl = 2* aktuellerSummand
    }
}



var tableHTML = ""
// var vorgehensweise = 1
// var alleAngeklicktenZellen = []
function render(){
    beschreibungDesSpiels()
    ueberschriftListenfelder()
    //Dropdown-Listenfeld erstellen
    var select = document.getElementById("select")
    if (select){
        body.removeChild(select)
    }
    select = document.createElement("select")
    select.id = "select"
    select.onchange = function(){
        breiteDerTabelleAendern(this)
    }
    var listenfeldId = 1
    for (feld = minBreiteDerTabelle; feld <= maxBreiteDerTabelle; feld++){
        var listenfeld = document.createElement("option")
        listenfeld.id = `listenfeld${listenfeldId}`
        listenfeld.innerHTML = `<option> ${feld} </option>`
        listenfeldId++
        select.appendChild(listenfeld)
    }
    body.appendChild(select)
    var startListenfeld = document.getElementById(`listenfeld${breiteDerTabelle-4}`)
    startListenfeld.setAttribute("selected", "selected")
    select.appendChild(startListenfeld)
    body.appendChild(select)
    ueberschriftOptionsfelder()
    //Optionsfelder erstellen
    var form = document.getElementById("form")
    if (form){
        body.removeChild(form)
    }
    form = document.createElement("form")
    form.id = "form"
    var optionsfeldDerReiheNach = document.createElement("input")
    optionsfeldDerReiheNach.id= "optionsfeld1"
    optionsfeldDerReiheNach.type = "radio"
    optionsfeldDerReiheNach.name = "vorgehensweise"
    optionsfeldDerReiheNach.value = derReiheNach
    optionsfeldDerReiheNach.onclick = function(){
        vorgehensweise = derReiheNach
        render()
    }
    var labelFuerOptionsfeld1 = document.createElement("label")
    labelFuerOptionsfeld1.id = "label1"
    labelFuerOptionsfeld1.innerHTML = "<label for=\"optionsfeld1\"> der Reihe nach </label>"
    var optionsfeldIrgendwie = document.createElement("input")
    optionsfeldIrgendwie.id = "optionsfeld2"
    optionsfeldIrgendwie.type = "radio"
    optionsfeldIrgendwie.name = "vorgehensweise"
    optionsfeldIrgendwie.value = irgendwie
    optionsfeldIrgendwie.onclick = function(){
        vorgehensweise = irgendwie
        render()
    }
    var labelFuerOptionsfeld2 = document.createElement("label")
    labelFuerOptionsfeld2.id = "label2"
    labelFuerOptionsfeld2.innerHTML = "<label for=\"optionsfeld2\"> irgendwie </label>"
    if(vorgehensweise == irgendwie){
        optionsfeldIrgendwie.setAttribute("checked", "checked")
    }
    if (vorgehensweise == derReiheNach){
        optionsfeldDerReiheNach.setAttribute("checked", "checked")
    }
    form.appendChild(optionsfeldDerReiheNach)
    form.appendChild(labelFuerOptionsfeld1)
    form.appendChild(optionsfeldIrgendwie)
    form.appendChild(labelFuerOptionsfeld2)
    body.appendChild(form)
    body.appendChild(form)
    
    //Tabelle erstellen
    var zellenNummer = 0
    var table = document.getElementById("table")
    if (table){
        body.removeChild(table)
    }
    table = document.createElement("table")
    table.id = "table"
    
    for(var anzahlZeilen = 0; anzahlZeilen < breiteDerTabelle; anzahlZeilen++){
        var row = document.createElement("tr")
        row.id = `zeile${anzahlZeilen}`
        for (var anzahlZellen = 0; anzahlZellen < breiteDerTabelle; anzahlZellen++){
            var zelle = document.createElement("td")
            zelle.id = `zelle${zahlenInTabelle[zellenNummer]}`
            zelle.innerHTML = `<td>${zahlenInTabelle[zellenNummer]}</td>`
            if(zustandZellen[zellenNummer] == `Primzahl`){
                zelle.innerHTML = `<td class=\"primzahl\">${zahlenInTabelle[zellenNummer]}</td>`
            }
            if(zustandZellen[zellenNummer] == `FalscheReihenfolge`){
                zelle.innerHTML = `<td class=\"primzahlInFalscherReihenfolge\">${zahlenInTabelle[zellenNummer]}</td>`
            }
            if(zustandZellen[zellenNummer] == `NichtPrimzahl`){
                zelle.innerHTML = `<td class=\"keinePrimzahl\">${zahlenInTabelle[zellenNummer]}</td>`
            }
            row.appendChild(zelle)
            zellenNummer++
        }
        table.appendChild(row)
    }
    body.appendChild(table)

    // for (var row = 0; row < breiteDerTabelle; row++){
    //     var row1 = zahlenInTabelle.slice(row * breiteDerTabelle, (row+1) * breiteDerTabelle).join("</td><td>")
    //     var row2 =  "<tr><td>" + row1 + "</td></tr>"
    //     for (var anzahlPrimzahlen = 0; anzahlPrimzahlen < groessteZahl; anzahlPrimzahlen++){
    //         row2 = row2.replace(`<td>Primzahl</td>`, `<td class =\"primzahl\">${zahlenInTabelle.indexOf(`Primzahl`)}</td>`)
    //         row2 = row2.replace(`<td>FalscheReihenfolge</td>`, `<td class =\"primzahlInFalscherReihenfolge\">${zahlenInTabelle.indexOf(`FalscheReihenfolge`)}</td>`)
    //         row2 = row2.replace(`<td>NichtPrimzahl</td>`, `<td class =\"keinePrimzahl\">${zahlenInTabelle.indexOf(`NichtPrimzahl`)}</td>`)
    //     }  
    //     tableHTML = tableHTML + row2   
    // }
    // table.innerHTML = tableHTML
    

    //Punkte anzeigen
    var anzeigeDerPunkte = document.getElementById("anzeigeDerPunkte")
    if(anzeigeDerPunkte){
        body.removeChild(anzeigeDerPunkte)
    }
    anzeigeDerPunkte = document.createElement("p")
    anzeigeDerPunkte.id = "anzeigeDerPunkte"
    anzeigeDerPunkte.innerHTML = `<p> <span class =\"rahmen\"> Punkte: ${punktestand}</span></p>`
    body.appendChild(anzeigeDerPunkte)
    //Zellen anklickbar machen
    var zellen = document.getElementsByTagName("td")
    for (var zelleNr = 0; zelleNr <= groessteZahl; zelleNr++){
        zellen[zelleNr].addEventListener("click", function(){
            punkteAnzeigen(this.innerHTML)
            zellenBewerten(this)
            render()
        });
    }
    if(gewonnen == true){
        var div = document.createElement("div")
        div.id = "fenster1"
        div.innerHTML = "<div> Du hast alle Primzahlen gefunden! </div>"
        body.appendChild(div)
    }
}

var gewonnen = false
var position = 0  
var vorgehensweise = 1
var alleAngeklicktenZellen = []
function zellenBewerten(angeklickteZelle){
    var neueZelle = parseInt(angeklickteZelle.innerHTML)
    if(vorgehensweise == derReiheNach){
        if(zustandZellen[neueZelle] == primzahl){
            if(neueZelle == primzahlen[position]){
                zustandZellen[neueZelle] = `Primzahl`  // So anstatt mit Splice Objekt ersetzen
                position++
                alleAngeklicktenZellen.push(neueZelle)
            }
            else{
                zustandZellen[neueZelle] = `FalscheReihenfolge`
            }   
        }
        else{
            if(zustandZellen[neueZelle] == keinePrimzahl){
                zustandZellen[neueZelle] = `NichtPrimzahl` 
            }
        } 
    }
    else{
        if(zustandZellen[neueZelle] == primzahl){
            zustandZellen[neueZelle] = `Primzahl`
            alleAngeklicktenZellen.push(neueZelle)
        }
        else{
            if(zustandZellen[neueZelle] == keinePrimzahl){
                zustandZellen[neueZelle] = `NichtPrimzahl`
            }
        }
    }
    if(alleAngeklicktenZellen.length == primzahlen.length){
        gewonnen = true
    }
}

var pos = 0
var punktestand = 0
function punkteAnzeigen(zahlInZelle){
    zahlInZelle = parseInt(zahlInZelle)
    if (vorgehensweise == irgendwie){
        if(zustandZellen[zahlInZelle] == primzahl){
            punktestand++
        }
        if(zustandZellen[zahlInZelle] == keinePrimzahl){
            punktestand--
        }
    }
    if (vorgehensweise == derReiheNach){
        if(primzahlen[pos] == zahlInZelle){
            punktestand++
            pos++
        }
        else{
            punktestand--
        }
    }
}

function zustandZellenDefinieren(){
    zustandZellen = []
    for(var zahl = 0; zahl <= zahlenInTabelle.length; zahl++){
        if(primzahlen.includes(zahlenInTabelle[zahl])){
            zustandZellen.push(primzahl)
        }
        else{
            zustandZellen.push(keinePrimzahl)
        }
    }
}




arrayFuerTabelle()
var primzahlen = zahlenInTabelle.slice(0, groessteZahl+1)
sieben()
primzahlen = primzahlen.filter (element => element > 0)
var zustandZellen = []
zustandZellenDefinieren()
render()













