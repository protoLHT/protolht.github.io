const suits = ['♠', '♥', '♦', '♣'];
let deck = [];
let playerHand = [];
let table = [];

function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let i = 1; i <= 13; i++) {
            deck.push({ suit: suit, value: i });
        }
    }
    deck = deck.sort(() => Math.random() - 0.5);
}

function dealCards() {
    playerHand = deck.splice(0, 13);
    table = Array(13).fill(null);
}

function renderTable() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let i = 0; i < 13; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = table[i] ? `${table[i].suit}${table[i].value}` : '?';
        card.addEventListener('click', () => playCard(i));
        gameBoard.appendChild(card);
    }
}

function playCard(index) {
    if (table[index] || playerHand.length === 0) return;

    const validCard = playerHand.find(card => card.value === (index + 1));
    if (validCard) {
        table[index] = validCard;
        playerHand = playerHand.filter(card => card !== validCard);
        renderTable();
        updateMessage('カードを置きました！');
    } else {
        updateMessage('置けるカードがありません。');
    }
}

function updateMessage(msg) {
    document.getElementById('message').textContent = msg;
}

document.getElementById('start-game').addEventListener('click', () => {
    createDeck();
    dealCards();
    renderTable();
    updateMessage('ゲーム開始！');
});
