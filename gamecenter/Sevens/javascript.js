const suits = ["spades", "diamonds", "clubs", "hearts"];
const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
let playerHand = [];
let computerHands = [[], [], []];
let board = { spades: [], diamonds: [], clubs: [], hearts: [] };
let currentTurn = 0; // 0: player, 1-3: computer players

// Initialize the game
function initializeGame() {
    const deck = createDeck();
    shuffle(deck);

    // Deal cards
    for (let i = 0; i < deck.length; i++) {
        if (i % 4 === 0) {
            playerHand.push(deck[i]);
        } else {
            computerHands[(i % 4) - 1].push(deck[i]);
        }
    }

    // Place the initial 7s on the board
    suits.forEach(suit => {
        board[suit].push(7);
    });

    updateBoard();
    updatePlayerHand();
    showMessage("あなたのターンです。カードを選ぶか、パスしてください。");
}

function createDeck() {
    let deck = [];
    suits.forEach(suit => {
        ranks.forEach(rank => {
            deck.push({ suit, rank });
        });
    });
    return deck;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateBoard() {
    suits.forEach(suit => {
        const boardDiv = document.getElementById(suit);
        boardDiv.innerHTML = `${getSuitSymbol(suit)} `;
        ranks.forEach(rank => {
            const card = document.createElement("span");
            card.className = "card";
            card.textContent = rank;
            if (board[suit].includes(rank)) {
                card.style.visibility = "visible";
            } else {
                card.style.visibility = "hidden";
            }
            boardDiv.appendChild(card);
        });
    });
}

function getSuitSymbol(suit) {
    switch (suit) {
        case "spades": return "♠";
        case "diamonds": return "♢";
        case "clubs": return "♣";
        case "hearts": return "♡";
    }
}

function updatePlayerHand() {
    const playerDiv = document.getElementById("playerCards");
    playerDiv.innerHTML = "";
    playerHand.forEach(card => {
        const cardElement = document.createElement("span");
        cardElement.className = "card";
        cardElement.textContent = `${card.rank}`;
        cardElement.onclick = () => playCard(card);
        if (canPlay(card)) {
            cardElement.classList.add("highlight");
        }
        playerDiv.appendChild(cardElement);
    });
}

function canPlay(card) {
    const suit = board[card.suit];
    const rankIndex = ranks.indexOf(card.rank);
    if (suit.includes(ranks[rankIndex - 1]) || suit.includes(ranks[rankIndex + 1])) {
        return true;
    }
    return false;
}

function playCard(card) {
    if (canPlay(card)) {
        board[card.suit].push(card.rank);
        playerHand = playerHand.filter(c => c !== card);
        updateBoard();
        updatePlayerHand();
        endTurn();
    } else {
        showMessage("このカードは出せません。");
    }
}

function playerPass() {
    showMessage("パスしました。");
    endTurn();
}

function endTurn() {
    currentTurn = (currentTurn + 1) % 4;
    if (currentTurn === 0) {
        showMessage("あなたのターンです。");
        updatePlayerHand();
    } else {
        computerTurn();
    }
}

function computerTurn() {
    const hand = computerHands[currentTurn - 1];
    const playableCards = hand.filter(canPlay);
    if (playableCards.length > 0) {
        const randomCard = playableCards[Math.floor(Math.random() * playableCards.length)];
        board[randomCard.suit].push(randomCard.rank);
        computerHands[currentTurn - 1] = hand.filter(c => c !== randomCard);
        showMessage(`プレイヤー${currentTurn + 1}がカードを出しました。`);
    } else {
        showMessage(`プレイヤー${currentTurn + 1}はパスしました。`);
    }
    updateBoard();
    setTimeout(endTurn, 1000);
}

function showMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
}

// Start the game
initializeGame();
