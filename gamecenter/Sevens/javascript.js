const suits = ['ハート', 'ダイヤ', 'クラブ', 'スペード'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let deck = [];
let playerHand = [];
let computerHands = [[], [], []];
let table = {
    'ハート': ['7'], 'ダイヤ': ['7'], 'クラブ': ['7'], 'スペード': ['7'] // 最初にすべての7を場に出す
};
let passCount = 0;
let currentPlayer = 0; // 0: プレイヤー、1~3: コンピュータ

// デッキを作成する
function createDeck() {
    for (let suit of suits) {
        for (let rank of ranks) {
            if (rank !== '7') { // 7は場に置くのでデッキから除外
                deck.push(`${suit}${rank}`);
            }
        }
    }
}

// デッキをシャッフルする
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// カードを配る
function dealCards() {
    while (deck.length) {
        playerHand.push(deck.pop());
        computerHands[0].push(deck.pop());
        computerHands[1].push(deck.pop());
        computerHands[2].push(deck.pop());
    }
}

// テーブルを表示（♠A〜K, ♡A〜K, ♢A〜K, ♣A〜Kの順に並べる）
function renderTable() {
    const tableContainer = document.getElementById('gameTable');
    tableContainer.innerHTML = ''; // 一旦初期化

    // 各スートの行を作成してカードを順番に表示
    for (let suit of suits) {
        const suitDiv = document.createElement('div'); // スートごとの行
        suitDiv.className = 'suit-row';

        for (let rank of ranks) {
            const cardSpan = document.createElement('span');
            const card = `${suit}${rank}`;
            
            // そのカードが出されていれば表示、出されていなければ「-」
            if (table[suit].includes(rank)) {
                cardSpan.textContent = rank;
            } else {
                cardSpan.textContent = '-'; // 未出のカード
            }
            suitDiv.appendChild(cardSpan);
        }

        tableContainer.appendChild(suitDiv);
    }
}

// プレイヤーの手札を表示する
function renderHand() {
    const playerHandDiv = document.getElementById('playerHand');
    playerHandDiv.innerHTML = ''; // 初期化
    playerHand.forEach(card => {
        const cardButton = document.createElement('button');
        cardButton.textContent = card;
        cardButton.className = 'card-btn';
        cardButton.addEventListener('click', () => playCard(card)); // 選択したカードをプレイ
        playerHandDiv.appendChild(cardButton);
    });
}

// メッセージを更新する
function updateMessage(msg) {
    const gameMessage = document.getElementById('gameMessage');
    gameMessage.innerHTML = msg;
}

// カードがプレイ可能か確認する
function canPlayCard(card) {
    const suit = card.slice(0, -1); // スートを取得
    const rank = card.slice(-1); // カードのランク（数字）を取得
    const tableRanks = table[suit]; // 場のそのスートのカードを取得

    if (tableRanks.includes(rank)) {
        return false; // 同じカードは出せない
    }

    const cardIndex = ranks.indexOf(rank);
    const minTableRank = ranks.indexOf(tableRanks[0]); // そのスートの一番小さいランク
    const maxTableRank = ranks.indexOf(tableRanks[tableRanks.length - 1]); // そのスートの一番大きいランク

    // 7を中心に前後に出せるかを確認
    return cardIndex === minTableRank - 1 || cardIndex === maxTableRank + 1;
}

// プレイヤーがカードを出す
function playCard(card) {
    if (canPlayCard(card)) {
        const suit = card.slice(0, -1); // スートを取得
        const rank = card.slice(-1);
        table[suit].push(rank); // 場にカードを追加
        table[suit].sort((a, b) => ranks.indexOf(a) - ranks.indexOf(b)); // 順番にソート
        playerHand = playerHand.filter(c => c !== card); // プレイヤーの手札からカードを削除
        renderHand();
        renderTable();
        updateMessage(`${card} を出しました。`);
    } else {
        updateMessage(`${card} は場に出せません。`);
    }

    if (playerHand.length === 0) {
        updateMessage('全ての手札を出しました。あなたの勝利です！');
        endGame();
    } else {
        nextTurn();
    }
}

// 次のターンに進む
function nextTurn() {
    if (currentPlayer === 0) {
        currentPlayer = 1; // 次はコンピュータ1のターン
    } else if (currentPlayer === 1 || currentPlayer === 2 || currentPlayer === 3) {
        computerPlayCard(currentPlayer - 1); // コンピュータの手札からカードを出す
        currentPlayer = (currentPlayer + 1) % 4; // 次のプレイヤーに回す
    }

    if (currentPlayer === 0) {
        updateMessage('あなたのターンです。カードを出してください。');
    }
}

// ゲームを終了する
function endGame() {
    document.getElementById('passBtn').disabled = true;
}

// パス機能の追加
function pass() {
    passCount++;
    updateMessage('パスしました。');
}

// イベントリスナーの設定
document.getElementById('passBtn').addEventListener('click', () => {
    pass();
    nextTurn(); // パスした後も次のプレイヤーに進む
});

// ゲームの初期設定
createDeck();
shuffleDeck(deck);
dealCards();
renderHand();
renderTable();
updateMessage('ゲーム開始！');
