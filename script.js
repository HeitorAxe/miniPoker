const naipes = {
    "clubs": "♣ ",
    "spades": "♠ ",
    "diams": "♦ ",
    "hearts": "♥ "
}

//for the sort() to work properly
function compareNumbers(a, b) {
    return b - a;
}

function getTrueValue(value) {
    let valueNumber;
    if (value == 'A') {
        valueNumber = 1
    }
    else if (value == "J") {
        valueNumber = 11
    }
    else if (value == "Q") {
        valueNumber = 12
    }
    else if (value == "K") {
        valueNumber = 13
    }
    else {
        valueNumber = value
    }

    return valueNumber;
}

//Return list of all upwards cards in
//the format of an array [[naipe, value], [naipe, value], ...]
function cardsTurned() {
    const table = document.querySelector(".table-cards")
    const tableCards = table.childNodes;
    const hand = document.querySelector(".player-hand")
    const playerCards = hand.childNodes;
    const combination = document.querySelector(".player-hand-combination")


    let upwardCards = 0;
    let turnedCardsList = [];

    // gets all turned cards on the table
    tableCards.forEach(card => {
        if (!card.classList.contains("turned-card")) {
            const cardValue = card.firstChild.lastChild;
            const value = cardValue.innerText;
            //console.log(card.firstChild.id +" "+value);
            newCard = [card.firstChild.id, value];
            turnedCardsList.push(newCard)
            upwardCards += 1;
        }
    });
    playerCards.forEach(card => {

        const cardValue = card.firstChild.lastChild;
        const value = cardValue.innerText;
        //console.log(card.firstChild.id +" "+value);
        newCard = [card.firstChild.id, value];
        turnedCardsList.push(newCard)
    });


    //combination.innerText = upwardCards;

    return turnedCardsList;
}

//Count how many times card with naipe appears
function countInTable(turnedCards, naipe) {
    let count = 0;
    turnedCards.forEach(card => {
        if (card[0] == naipe) {
            count += 1;
        }
    });

    return count;
}
//Count how many times card with value appears
function countValueInTable(turnedCards, value) {
    let count = 0;
    turnedCards.forEach(card => {
        if (card[1] == value) {
            count += 1;
        }
    });

    return count;
}

//Executes when card is turned
function turnCard(flipCard) {
    flipCard.classList.toggle("turned-card");
    getCombination(cardsTurned());
}

//Creates a card to either the table or the hand of the player
function createCard(naipe, value, code, isTableCard) {
    let valueNumber;
    valueNumber = value;
    if (value == 'A') {
        valueNumber = 1
    }
    else if (value == "J") {
        valueNumber = 11
    }
    else if (value == "Q") {
        valueNumber = 12
    }
    else if (value == "K") {
        valueNumber = 13
    }
    else {
        valueNumber = value;
    }

    let cardSpace;
    if (isTableCard) {
        cardSpace = document.querySelector(".table-cards");
    }
    else {
        cardSpace = document.querySelector(".player-hand");
    }

    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    if (isTableCard) {
        flipCard.classList.add("turned-card");
    }

    flipCard.onclick = function() { turnCard(flipCard) };


    //Front part of the card    
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.classList.add("card");
    cardFront.classList.add("n" + value);
    cardFront.id = naipe;
    if (valueNumber >= 11) {

        const topValue = document.createElement("div");
        topValue.classList.add("value");
        topValue.classList.add("value-top");
        topValue.innerText = code;
        cardFront.appendChild(topValue);
    }

    else {
        const topValue = document.createElement("div");
        topValue.classList.add("value");
        topValue.classList.add("value-top");
        topValue.innerText = value;
        cardFront.appendChild(topValue);
    }

    const naipes = document.createElement("div");
    naipes.classList.add("naipes");

    let prepend = false;

    if (valueNumber >= 11) {
        const image = document.createElement("img");
        image.classList.add("card-image");
        image.src = "Styles/Images/" + valueNumber + ".gif";
        naipes.appendChild(image);
    }
    else {
        //Organizes the naipes
        for (let i = 0; i < valueNumber; i++) {
            if ((valueNumber - i) % 3 == 0 && valueNumber - i >= 3) {
                const naipe3 = document.createElement("div");
                naipe3.classList.add("naipe");

                const naipeSpan4 = document.createElement("span");
                naipeSpan4.innerText = code;
                naipe3.appendChild(naipeSpan4);

                const naipeSpan5 = document.createElement("span");
                naipeSpan5.innerText = code;
                naipe3.appendChild(naipeSpan5);

                const naipeSpan6 = document.createElement("span");
                naipeSpan6.innerText = code;
                naipe3.appendChild(naipeSpan6);

                naipes.appendChild(naipe3);
                if (prepend) {
                    naipes.prepend(naipe3);
                    prepend = false;
                }
                else {
                    naipes.appendChild(naipe3);
                    prepend = true;
                }

                i += 2;
            }
            else if ((valueNumber - i) % 2 != 0 && (valueNumber != 1 || i != 1)) {
                const naipe1 = document.createElement("div");
                naipe1.classList.add("naipe");
                const naipeSpan = document.createElement("span");
                naipeSpan.innerText = code;
                naipe1.appendChild(naipeSpan);
                naipes.appendChild(naipe1);
            }
            else {
                const naipe2 = document.createElement("div");
                naipe2.classList.add("naipe");
                const naipeSpan2 = document.createElement("span");
                naipeSpan2.innerText = code;
                const naipeSpan3 = document.createElement("span");
                naipeSpan3.innerText = code;
                naipe2.appendChild(naipeSpan2);
                naipe2.appendChild(naipeSpan3);
                if (prepend) {
                    naipes.prepend(naipe2);
                    prepend = false;
                }
                else {
                    naipes.appendChild(naipe2);
                    prepend = true;
                }
                i++;
            }


        }
    }



    cardFront.appendChild(naipes);

    const bottomValue = document.createElement("div");
    bottomValue.classList.add("value");
    bottomValue.classList.add("value-bottom");
    bottomValue.innerText = value;
    cardFront.appendChild(bottomValue);

    flipCard.appendChild(cardFront);
    //End of front part of the card

    //back part of the card
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    flipCard.appendChild(cardBack);



    cardSpace.appendChild(flipCard);
}

function printAllCards() {
    for (let naipe in naipes) {
        for (let i = 1; i < 14; i++) {
            if (i == '1') {
                createCard(naipe, "A", naipes[naipe]);
            }
            else if (i == 11) {
                createCard(naipe, "J", naipes[naipe]);
            }
            else if (i == 12) {
                createCard(naipe, "Q", naipes[naipe]);
            }
            else if (i == 13) {
                createCard(naipe, "K", naipes[naipe]);
            }

            else {
                createCard(naipe, i, naipes[naipe]);
            }
        }
    }
}

//Creates multiple cards at either the table or players hand
function createCards(cardNum, isTableCard) {
    for (let i = 0; i < cardNum; i++) {
        const naipeOpts = ["clubs", "spades", "diams", "hearts"];

        let value = Math.floor(Math.random() * 13) + 1;
        const naipe = Math.floor(Math.random() * 4);
        // console.log(value);
        // console.log(naipeOpts[naipe]);
        // console.log(naipes[naipeOpts[naipe]]);
        if (value >= 11 || value == 1) {
            if (value == 1) {
                value = "A";
            }
            if (value == 11) {
                value = "J";
            }
            if (value == 12) {
                value = "Q";
            }
            if (value == 13) {
                value = "K";
            }

        }
        createCard(naipeOpts[naipe], value, naipes[naipeOpts[naipe]], isTableCard);


    }
}

//Takes values from function cardsTurned
//Returns [isStraight, highestValueOfStraight];
function isStraight(turnedCards) {
    let values = [];
    //Getting only the values so i can sort it
    for (card of turnedCards) {
        values.push(parseInt(getTrueValue(card[1])));
    }

    //Sorts numerically
    values.sort(compareNumbers);

    let straightTopCard;
    let isStraight;
    let foundNext = true;

    for (i of values) {
        //checks if it is a royal (now the 1/"A" would be part of the royal sequence)
        if (i == 1) {
            for (j of values) {
                values[values.indexOf(1)] = 14;
                i = 14;
            }
            values.sort(compareNumbers);
        }

        foundNext = true;
        for (let j = i; j > i - 5; j--) {
            if (foundNext) {
                foundNext = values.includes(j);
            }
            else {
                break;
            }
        }

        if (foundNext) {
            isStraight = true;
            straightTopCard = i;
            break;
        }
        else {
            isStraight = false
        }

    }


    return [isStraight, straightTopCard];
}

//Takes values from cardsTurned and isStraight(trunedCards)[1];
//Returns array with [isStraightFlush, isRoyalStraightFlush];
function isStraightFlush(turnedCards, straightTopValue) {
    let straightCards = [];
    let count = 0;
    let isRoyal = false;

    for (let i = straightTopValue; i > straightTopValue - 5; i--) {
        if (i == 14) {
            straightCards.push(1);
            isRoyal = true;
        }
        else {
            straightCards.push(i);
        }
    }

    console.log("Straight cards" + straightCards);
    console.log("Turned cards" + turnedCards);


    const naipeList = ["clubs", "spades", "diams", "hearts"];

    for (currentNaipe of naipeList) {
        if (count != 5) {
            count = 0;
            for (let i = 0; i < straightCards.length; i++) {
                console.log(count);
                for (card of turnedCards) {
                    if (card[0] == currentNaipe && getTrueValue(card[1]) == straightCards[i]) {
                        count += 1;
                        break;
                    }
                };

            }
        }

        else {
            break;
        }
    }

    if (count == 5) {
        console.log(count);
        return [true, isRoyal];
    }
    else {
        console.log("Count = " + count);
        return [false, false];
    }
}

function isFlush(turnedCards) {
    let isFlush = false;
    let clubCount = countInTable(turnedCards, "clubs");
    let spadesCount = countInTable(turnedCards, "spades");
    let diamsCount = countInTable(turnedCards, "diams");
    let heartsCount = countInTable(turnedCards, "hearts");

    if (clubCount >= 5 || spadesCount >= 5 || diamsCount >= 5 || heartsCount >= 5) {
        isFlush = true;
    }

    return isFlush;

}

function getHighCard(turnedCards) {
    let values = [];
    let max = 0;
    //Getting only the values so i can sort it
    for (card of turnedCards) {
        values.push(parseInt(getTrueValue(card[1])));
    }

    for (i of values) {
        if (i == 1) { i = 14 }
        if (i > max) {
            max = i
        }
    }

    if (max == 14) {
        max = "A";
    }
    else if (max == 11) {
        max = "J";
    }
    else if (max == 12) {
        max = "Q";
    }
    else if (max == 13) {
        max = "K";
    }

    return max;


}

function isRepetition(turnedCards) {
    let max = 0;
    let pairCount = 0
    let repetition = [];
    let countedCards = [];
    for (card of turnedCards) {
        if (!countedCards.includes(card[1])) {
            let repeats = countValueInTable(turnedCards, card[1]);
            repetition.push(repeats);
            countedCards.push(card[1]);
        }
    }

    for (i of repetition) {
        if (i > max) {
            max = i;
        }
    }

    repetition.forEach(repeats => {
        if (repeats == 2) {
            pairCount += 1;
        }
    });


    if (max >= 3 && repetition.includes(2)) {
        return "Full House";
    }
    if (max >= 4) {
        return "Four of a Kind";
    }
    if (max == 3) {
        return "Three of a Kind";
    }
    if (max == 2 && pairCount >= 2) {
        return "Two Pair";
    }
    if (max == 2) {
        return "Pair";
    }

    return false;

}

//Takes values from function cardsTurned
function getCombination(turnedCards) {
    playerHandCombination = document.querySelector(".player-hand-combination");
    isStraightFlushRoyal = isStraightFlush(turnedCards, isStraight(turnedCards)[1]);

    if (isStraight(turnedCards)[0] && isStraightFlushRoyal[0]) {
        if (isStraightFlushRoyal[1]) {
            playerHandCombination.innerText = "ROYAL STRAIGHT FLUSH";
        }
        else {
            playerHandCombination.innerText = "Straight Flush";
        }
    }

    else if (isRepetition(turnedCards) == "Full House") {
        playerHandCombination.innerText = "Full House";
    }

    else if (isRepetition(turnedCards) == "Four of a Kind") {
        playerHandCombination.innerText = "Four of a Kind";
    }

    else if (isFlush(turnedCards)) {
        playerHandCombination.innerText = "Flush";
    }

    else if (isStraight(turnedCards)[0]) {
        playerHandCombination.innerText = "Straight";
    }

    else if (isRepetition(turnedCards) != false) {
        playerHandCombination.innerText = isRepetition(turnedCards);
    }

    else {
        playerHandCombination.innerText = "High Card " + getHighCard(turnedCards);
    }
}



//For Testing Combinations:
// createCard("hearts", "Q", naipes["hearts"], true);
// createCard("diams", "J", naipes["diams"], true);
// createCard("spades", "J", naipes["spades"], true);
// createCard("spades", "J", naipes["spades"], true);
// createCard("spades", "J", naipes["spades"], true);

// createCard("spades", "10", naipes["spades"], false);
// createCard("spades", "9", naipes["spades"], false);
// getCombination(cardsTurned());

createCards(5, true);//creates table Cards
createCards(2, false);//creates players Cards
getCombination(cardsTurned());
