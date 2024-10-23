const suits = ['ハート', 'ダイヤ', 'クラブ', 'スペード'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [];
let playerHand = [];
let computerHands = [[], [], []];
let table = [];
let passCount = 0;
let currentPlayer = 0; // 0: プレイヤー、1~3: コンピュータ

function createDeck() {
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push(`${suit}${rank}`);
        }
    }
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCards() {
    while (deck.length) {
        playerHand.push(deck.pop());
        computerHands[0].push(deck.pop());
        computerHands[1].push(deck.pop());
        computerHands[2].push(deck.pop());
    }
}

function renderHand() {
    const playerHandDiv = document.getElementById('playerHand');
    playerHandDiv.innerHTML = 'あなたの手札: ' + playerHand.join(', ');
}

function renderTable() {
    const gameTableDiv = document.getElementById('gameTable');
    gameTableDiv.innerHTML = '場: ' + table.join(', ');
}

function updateMessage(msg) {
    const gameMessage = document.getElementById('gameMessage');
    gameMessage.innerHTML = msg;
}

function pass() {
    passCount++;
    if (passCount >= 5) {
        updateMessage('5回パスしました。あなたの負けです！');
        endGame();
    } else {
        updateMessage(`パスしました。残りパス回数: ${5 - passCount}`);
    }
}

function playCard() {
    if (playerHand.length === 0) {
        updateMessage('全ての手札を出しました。あなたの勝利です！');
        endGame();
        return;
    }

    const card = playerHand.pop();
    table.push(card);
    renderHand();
    renderTable();

    if (playerHand.length === 0) {
        updateMessage('全ての手札を出しました。あなたの勝利です！');
        endGame();
    } else {
        updateMessage(`${card} を出しました。`);
        nextTurn(); // 次のプレイヤーのターンに進む
    }
}

function computerPlayCard(computerIndex) {
    if (computerHands[computerIndex].length === 0) {
        updateMessage(`コンピュータ${computerIndex + 1}の勝利です！`);
        endGame();
        return;
    }

    const card = computerHands[computerIndex].pop();
    table.push(card);
    renderTable();
    updateMessage(`コンピュータ${computerIndex + 1}が ${card} を出しました。`);
}

function nextTurn() {
    if (currentPlayer === 0) {
        // プレイヤーのターン
        currentPlayer = 1; // 次はコンピュータ1のターン
    } else if (currentPlayer === 1 || currentPlayer === 2 || currentPlayer === 3) {
        // コンピュータのターン
        computerPlayCard(currentPlayer - 1); // コンピュータの手札からカードを出す
        currentPlayer = (currentPlayer + 1) % 4; // 次のプレイヤーに回す
    }

    if (currentPlayer === 0) {
        updateMessage('あなたのターンです。カードを出してください。');
    }
}

function endGame() {
    document.getElementById('passBtn').disabled = true;
    document.getElementById('playBtn').disabled = true;
}

document.getElementById('passBtn').addEventListener('click', () => {
    pass();
    nextTurn(); // パスした後も次のプレイヤーに進む
});

document.getElementById('playBtn').addEventListener('click', playCard);

createDeck();
shuffleDeck(deck);
dealCards();
renderHand();
renderTable();
updateMessage('ゲーム開始！');
