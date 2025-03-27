function getCards(number){
    let htmlList = [];
    for (let i = 0; i < number; i=i+2){
        let value1 = getValue();
        htmlList.push(`<div class="card" id="${i}" value="${value1}"></div>`);
        htmlList.push(`<div class="card" id="${(i+1)}" value="${value1}"></div>`);
    }
    return htmlList;
}

function getValue(){
    // let value2 = rgb(Math.floor(Math.random() * 256),Math.floor(Math.random() * 256),Math.floor(Math.random() * 256));
    //revised vvv
    let value2 = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    return value2;
}

function shuffleCards(number){
    let htmlList = getCards(number);
    let shuffledCards = [];
    for (let i = 0; htmlList.length > 0;i++){
        let randomIndex = Math.floor(Math.random() * htmlList.length);
        shuffledCards.push(htmlList[randomIndex]);
        htmlList.splice(randomIndex,1);
    }
    let html =''
    for (let i = 0; i < shuffledCards.length; i++){
        html += shuffledCards[i];
    }
    return html;
}

function flipCard(cardId, flipIdList, correctList, number, health) {
    if (health<0){
        return;
    }
    let returnPacket = []
    const card = document.getElementById(cardId);
    const value = card.getAttribute('value');

    //log
        // console.log(flipIdList);
        // console.log(correctList);
    
    //if current card is in correct list break function
    for (i=0;i<correctList.length;i++){
        if (correctList[i] === cardId){
            //return packet of the two arrays
            returnPacket.push(flipIdList);
            returnPacket.push(correctList);
            returnPacket.push(health);
            return returnPacket;
        }
    }
    //if current card is in flip id list break function unless it is a reflip
    for (i=0;i<flipIdList.length;i++){
        if (flipIdList[i] === cardId){
            //return packet of the two arrays
            returnPacket.push(flipIdList);
            returnPacket.push(correctList);
            returnPacket.push(health);
            return returnPacket;
        }
    }
    //add current card to flipped card list
    flipIdList.push(cardId);

    //log
        console.log(flipIdList);
        console.log(correctList);

    //renders all as white
    for (i=0;i<number;i++){
            // console.log("card"+ i +"set to white")
        document.getElementById(i).style.backgroundColor = `rgb(255, 255, 255)`;
        document.getElementById(i).style.border =`3px solid rgb(69, 6, 46)`;
    }
    //renders each correct card
    for (i=0;i<correctList.length;i++){
        document.getElementById(correctList[i]).style.backgroundColor = document.getElementById(correctList[i]).getAttribute('value');
    }
    //renders flipped cards
    for (i=0;i<flipIdList.length;i++){
        document.getElementById(flipIdList[i]).style.backgroundColor = document.getElementById(flipIdList[i]).getAttribute('value');
        document.getElementById(flipIdList[i]).style.border =`3px solid rgb(229, 164, 203)`;
    }
    //log
        // console.log(value);
        // console.log("card");
        console.log(card);

    //match checker
    if(flipIdList.length === 2){
        if (document.getElementById(flipIdList[0]).getAttribute('value') === document.getElementById(flipIdList[1]).getAttribute('value')){
            for (i=0;i<flipIdList.length;i++){
                    console.log("match!! >:)");
                correctList.push(flipIdList[i]);
            }
        } else {
            console.log("no match!! D:");
            console.log(health);
            health = health - 1;
            console.log(health);
            document.querySelector("#health-value").textContent = health;
        }
        flipIdList = [];
    }
    //return packet of the two arrays
        returnPacket.push(flipIdList);
        returnPacket.push(correctList);
        returnPacket.push(health);
            console.log(returnPacket);
        return returnPacket;
}

function init(){
    let number = 6;
    let score = 0;
    let healthMultiplier = 1;
    let health = 3;
    document.querySelector("#score-value").textContent = score;
    document.querySelector("#health-value").textContent = health;
    const areaContainer = document.querySelector('#play-area');
    let html = shuffleCards(number);
    areaContainer.innerHTML += html;
    let flipIdList = [];
    let correctList = [];
    cardEvent();
    function cardEvent(){
        let cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                    console.log(`${card.id}`);
                let packet = flipCard(card.id, flipIdList, correctList, number, health);
                    console.log(packet);
                //packet decoder
                flipIdList = packet[0];
                correctList = packet[1];
                health = packet[2];
                if (health<0){
                    for (i=0;i<number;i++){
                        document.getElementById(i).style.backgroundColor = `rgb(201, 9, 9)`;
                        document.getElementById(i).style.border =`3px solid rgb(69, 6, 46)`;
                    }
                    document.querySelector("#health-value").textContent = "You Lose";
                }
                    console.log(flipIdList);
                    console.log(correctList);
                if (correctList.length === number){
                    flipIdList = [];
                    correctList = [];
                    score = number;
                    number += 2;
                    healthMultiplier +=1;
                    health = (Math.floor(healthMultiplier * 2.5));
                    html = shuffleCards(number);
                    areaContainer.innerHTML =``;
                    areaContainer.innerHTML += html;
                    for (i=0;i<number;i++){
                        document.getElementById(i).style.backgroundColor = `rgb(255, 255, 255)`;
                        document.getElementById(i).style.border =`3px solid rgb(69, 6, 46)`;
                    }
                    document.querySelector("#score-value").textContent = score;
                    document.querySelector("#health-value").textContent = health;
                    cardEvent();
                }
            });
        });
    }
}

init();
    