/*  ==========================================================================
    CONSTANTEN
    ==========================================================================
    Constanten zijn variabelen die niet gewijzigd zullen en kunnen worden
    in onze applicatie. We gebruiken ze eigenlijk vaak om waarden die we
    vaak gebruiken voor b.v. controles een duidelijker naam te geven.
    Hierdoor kunnen we in onze code makkelijker lezen wat we bedoelen.
    Dus puur voor de leesbaarheid van onze code.
    ==========================================================================
 */
const SPELER1               = 0;    // o.a. index 0 in de array ronde_scores en totaal_scores
const SPELER2               = 1;    // o.a. index 1 in de array ronde_scores en totaal_scores
const CARD_BACK             = 0;    // Index in de array van speelveld om aan te kunnen geven...
const CARD_FRONT            = 1;    // ...of we de voorkant of de achterkant willen bedoelen

// De 4 constante variabelen hieronder zijn alleen maar bedoeld om onze code leesbaarder te maken
// want als we alleen maar gebruik maken van de keywords TRUE en FALSE is dat minder duidelijk.
const OFF                   = false;
const ON                    = true;
const YES                   = true;
const NO                    = false;

const NO_CARD_CLICKED       = -1;   // -1 kan geen index waarde zijn, daarom hebben deze waarde hier gekozen
const FIRST_CARD_CLICKED    = 0;    // Index 0 in de array cards_clicked
const LAST_CARD_CLICKED     = 1;    // Index 1 in de array cards_clicked

/*  ==========================================================================
    VARIABELEN
    ==========================================================================
    Variabelen zullen wel gewijzigd worden. Op z'n minst om bij het starten
    van ons programma ze alvast te vullen met een object of een waarde.
    ==========================================================================
 */
var speelveld;                      // Element met alle kaarten op het scherm
                                    // Hierin zitten dus alle kaarten op het scherm
                                    // met per kaart een voorkant en een achterkant
var game_button;                    // Element met de button
var score_speler_1;                 // Element met de score van speler 1 om deze te kunnen tonen
var score_speler_2;                 // Element met de score van speler 2 om deze te kunnen tonen
var huidige_speler = SPELER1;       // HULPVARIABELE: Welke speler is aan de beurt
var naam_speler_1;                  // Element met de naam van speler 1 om deze te kunnen tonen
var naam_speler_2;                  // Element met de naam van speler 2 om deze te kunnen tonen
var cards = [                       // De nummers zijn tevens de namen van de jpeg
    1, 2, 3, 4, 5, 6, 7, 8,         // afbeeldingen (1.jpg bijvoorbeeld)
    1, 2, 3, 4, 5, 6, 7, 8          // Daarom zien we de nummers twee keer.
];
/*
    In de onderstaande array houden we bij op welke twee kaarten geclicked is
    We kunnen deze array ook gebruiken om te controleren of het maximaal
    aantal aan te klikken kaarten al is bereikt. De waarden die we hier in
    plaatsen zijn de index waarden van een kaart in de array cards.
    B.v. index = 0 betekent kaart 0 in de array cards, en daarmee hebben we gelijk
    het nummer van de afbeelding die bij deze kaart hoort.
 */
var cards_clicked = [ NO_CARD_CLICKED, NO_CARD_CLICKED ];   // Welke kaarten heeft een speler al aangeklikt?

var ronde_scores = [ 0, 0 ];    // Hier houden we tijdelijk de rondescores bij
var totaal_scores = [ 0, 0 ];   // Hier houden we de totaal scores per speler bij

/*  ==========================================================================
    FUNCTIES
    ==========================================================================
    Hieronder schrijven we al onze functies die samen het spel vormen en het
    dus mogelijk maken ons spel ook echt te spelen.
    De twee kernfuncties zijn:

    clickOnGameButton
    -----------------
    Deze functie gaat alle kliks op de button afhandelen en de dingen doen
    die we in de voorbereiding hebben bedacht.

    clickOnCard
    -----------
    Deze functie gaat alle kliks op de kaarten afhandelen. In deze functie
    wordt eigenlijk het spel gespeeld en moeten we dus ook verschillende
    controles inbouwen

    ==========================================================================
 */

/*
 * START FUNCTIE
 * -------------
 * Hieronder zie je de functie die wordt uitgevoerd zodra de browser onze
 * webpagina klaar heeft staan voor presentatie in het browservenster.
 * We kunnen deze functie dus gebruiken om voorwerk te verrichten.
 */
window.onload = function() {

    // Wat coderen we hieronder?
    // Binnenhalen van alle elementen op de pagina waar we in onze code iets
    // mee willen of moeten doen.
    // Dit zijn de elementen: speelveld, game_button, score_speler_1, score_speler2,
    // naam_speler_1 en naam_speler_2
    // Binnenhalen van alle benodigde pagina elementen
    game_button = document.getElementById("game-button");
    score_speler_1 = document.getElementById("score-speler-1");
    score_speler_2 = document.getElementById("score-speler-2");
    naam_speler_1 = document.getElementById('name-speler-1');
    naam_speler_2 = document.getElementById('name-speler-2');
    speelveld = document.getElementsByClassName('play-card');

    // Wat coderen we hieronder?
    // Click event koppelen aan de game button
    // Click event koppelen aan de game button
    game_button.addEventListener("click", clickOnGameButton );

}

/*
    resetScores()
    -------------
    Reset de rondescores

    TYPE:   Hulpfunctie
 */
function resetScores()
{
    // Hier coderen we de code om de scores te resetten
    // Scores resetten
    ronde_scores[0] = 0;
    ronde_scores[1] = 0;
}

/*
    getCardImageTag()
    -----------------
    Maak de image tag af met een kaart op basis van de kaartnummer
    Een kaartnummer loopt van 0 t/m 15

    @return string  De image-tag naar een juiste afbeelding

    TYPE:   Hulpfunctie
 */
function getCardImageTag(card_index)
{
    /*
        Onderstaande opdracht levert bijvoorbeeld het volgende op als card_index gelijk is 1
        en op cards[1] staat het afbeeldingsnummer 8:

        <img class="play-card-img" src="img/8.jpg" />
     */
    return '<img  class="play-card-img" src="img/' + cards[card_index] + ".jpg\" />"
}

/*
    clickOnGameButton()
    -------------------
    Handel de clicks op de button af

    TYPE:   Main Functie
 */
function clickOnGameButton(event)
{
    // Hier coderen we alles wat moet worden gedaan zodra een speler op de game button clicked
    // Click event van de game button programmeren. Wat moet er allemaal gebeuren na een klik?
    if (game_button.innerHTML === 'Start') {
        shuffleCards();                                 // Kaarten schudden
        game_button.innerHTML = 'Reset';                // Knoptekst veranderen
        huidige_speler = Math.round(Math.random());     // Bepalen wie mag beginnen
        showCurrentPlayer();                            // Tonen wie mag beginnen
        for (var index = 0; index < speelveld.length; index++) {    // Met deze lus lopen we langs alle kaarten
            speelveld[index].addEventListener('click', clickOnCard);    // Klikken mogelijk maken
        }
    } else {
        game_button.innerHTML = 'Start';        // Knoptekst veranderen
        resetScores();                          // Deze functie moeten we nog programmeren
        naam_speler_1.style.color = "black";    // Kleur speler 1 herstellen naar standaard
        naam_speler_2.style.color = "black";    // Kleur speler 2 herstellen naar standaard

        // Alle open kaarten terug draaien en klikken onmogelijk maken voor alle kaarten
        for (var index = 0; index < speelveld.length; index++) {    // Met deze lus lopen we langs alle kaarten
            if (speelveld[index].classList.contains('flipped')) {   // Is de kaart omgedraaid?
                flipCard(index);                                    // Zo ja, dan terug draaien
            }
            speelveld[index].removeEventListener('click', clickOnCard); // Stop klikken
        }
    }
    
}

/*
    @TODO: clickOnCard()
    -------------
    Handel de clicks op de cards af
    In deze functie handelen we een ronde af

    TYPE:   Main Functie
 */
function clickOnCard(event)
{
    // Voorbereiden van lokale variabelen
    var parentDiv = event.target.parentElement.parentElement;
    var card_back = event.target.parentElement.parentElement.children[0];
    var card_front = event.target.parentElement.parentElement.children[1];
    var cellNumber = event.target.parentElement.parentElement.parentElement.cellIndex;
    var rowNumber = event.target.parentElement.parentElement.parentElement.parentElement.rowIndex;
    var cardNumber = (rowNumber * 4) + cellNumber;

    alert('Kaart geklikt');
    /* Wat coderen we hieronder?
        - Als de speler die aan de beurt is (huidige_speler) nog niet
        het maximaal aantal kaarten heeft aangeklikt dan:
            - kaart die de speler heeft aangeklikt omdraaien
            - vastleggen in de array cards_clicked op welke kaart de speler
              heeft geklikt. Dit doen we door de index van de kaart in deze
              array te stoppen.
            - Als de huidige speler nu twee kaarten heeft aangeklikt dan:
                - Als de twee aangeklikte kaarten gelijk zijn dan:
                    - ronde score van deze speler verhogen met 1 punt
                      (ronde_scores[huidige_speler])
                    - schakel de klik mogelijkheid op deze twee kaarten uit
                    - reset de variabele cards_clicked, beide waarden
                      in deze array weer terug zetten op NO_CARD_CLICKED
                - anders (de kaarten zijn niet gelijk) dan:
                    - beide kaarten terug draaien
                    - geven de beurt over aan de andere speler
                    - reset de variabele cards_clicked

         - Als we het einde van de ronde hebben bereikt (alle kaarten zijn
           al gedraaid) dan:
            - De ronde beëindigen.
                > scores moeten bijgewerkt worden op het scherm
                > alle kaarten terugdraaien
                > de tekst op de knop terugzetten naar "Start"
                > Klikmogelijkheid van alle kaarten uitzetten
                > Tonen de bijgewerkte totaal score op het scherm
        Alles samenvoegen om het spel te laten werken
     */


}

/*
    Moeten we nog zelf functies maken?
    Zoals bijvoorbeeld: toggleClickOnCard, 
*/

/*
    @TODO: endRound()
    ----------
    Einde van een ronde. Dus afhandelen wanneer een ronde ten einde is

    TYPE:   Hulpfunctie
 */
function endRound()
{
    // Hier coderen we alles om een ronde te beëindigen

}

/*
    shuffleCards()
    --------------
    Shuffle de kaarten

    TYPE:   Hulpfunctie
 */
function shuffleCards()
{
    var i = 0;
    var j = 0;
    var temp = null;

    for (i = cards.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
}

/*
    @TODO: determineStartingPlayer()
    -------------------------
    Bepaal random (willekeurig) welke van de 2 spelers mag beginnen

    @return int Speler nummer (0 of 1)

    TYPE:   Hulpfunctie
 */
function determineStartingPlayer()
{
    // Random laten bepalen welke speler aan de beurt is of mag beginnen
    
}

/*
    showCurrentPlayer()
    -------------------
    Toont op het scherm welke speler aan de beurt is

    TYPE:   Hulpfunctie
 */
function showCurrentPlayer()
{
    if(huidige_speler === SPELER1) {
        naam_speler_1.style.color = "red";
        naam_speler_2.style.color = "black";
    } else if(huidige_speler === SPELER2) {
        naam_speler_1.style.color = "black";
        naam_speler_2.style.color = "red";
    } else {
        naam_speler_1.style.color = "black";
        naam_speler_2.style.color = "black";
    }
}

/*
    flipCard(card_index)
    --------------------
    Draait kaart om van gegeven object carddiv. 
    Als de kaart al is omgedraaid dan
    draaien we de kaart weer terug. 
    Dit doen we met een CSS-class, genaamd flipped.
    Deze zorgt voor het draai effect. 
    Door de tweede div te vullen met de juiste img-tag
	wordt de bijbehorende afbeelding zichtbaar.

	We vertellen tussen haakjes welke kaart moet worden omgedraaid.
*/
function flipCard(card_index)
{
    if(speelveld[card_index].classList.contains('flipped')) {	// Bevat de kaart al de css class flipped?
        /*
            Ja!
            Dan gaan de kaart weer terugdraaien door de css class flipped weer weg te halen
        */
        speelveld[card_index].classList.remove('flipped');			// Hier halen we de css class flipped weg
        speelveld[card_index].children[CARD_FRONT].innerHTML = "";	// We gaan de img-tag ook weer verwijderen
    } else {
        /*
            Nee!
            Dan draaien we de kaart om zodat de afbeelding zichtbaar wordt.
            Dit doen we door de css class flipped toe te voegen aan de kaart en de tweede div
            in de kaart te vullen met de img-tag van de echte afbeelding
        */
        speelveld[card_index].children[CARD_FRONT].innerHTML = getCardImageTag(card_index);	// Toon de afbeelding
        speelveld[card_index].classList.add('flipped');										// Voeg de css class flipped toe.
    }
}

