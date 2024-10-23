const suits = ['ハート', 'ダイヤ', 'クラブ', 'スペード'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let deck = [];
let playerHand = [];
let computerHands = [[], [], []];
let table = {
    'ハート': ['7'], 'ダイヤ': ['7'], 'クラブ': ['7'], 'スペード': ['7'] // 初期状態としてすべての7を場に配置
};
let passCount = 0;
let currentPlayer = 0; // 0: プレイヤー、1~3: コンピュータ
let selectedCard = null; // プレイヤーが選んだカードを記録する

function createDeck() {
    for (let suit of suits) {
        for (let rank of ranks) {
            if (rank !== '7') { // 7は場に置くのでデッキから除外
                deck.push(`${suit}${rank}`);
            }
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
    playerHandDiv.innerHTML = 'あなたの手札: ';
    
    playerHand.forEach((card, index) => {
        const cardButton = document.createElement('button');
        cardButton.textContent = card;
        cardButton.classList.add('card-btn');
        cardButton.onclick = () => selectCard(index); // クリック時にカードを選択
        playerHandDiv.appendChild(cardButton);
    });
}

function renderTable() {
    const gameTableDiv = document.getElementById('gameTable');
    let tableDisplay = '場: ';
    for (let suit in table) {
        tableDisplay += `${suit}: ${table[suit].join(', ')} | `;
    }
    gameTableDiv.innerHTML = tableDisplay;
}

function updateMessage(msg) {
    const gameMessage = document.getElementById('gameMessage');
    gameMessage.innerHTML = msg;
}

// カードを選択する関数
function selectCard(index) {
    selectedCard = playerHand[index];
    updateMessage(`${selectedCard} を選択しました。カードを出すには「カードを出す」ボタンを押してください。`);
}

// 場に出せるカードかどうかを判定する関数
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

// カードを出す処理
function playCard() {
    if (!selectedCard) {
        updateMessage('まずカードを選択してください。');
        return;
    }

    if (playerHand.includes(selectedCard)) {
        // カードが出せるかチェック
        if (canPlayCard(selectedCard)) {
            const suit = selectedCard.slice(0, -1); // スートを取得
            table[suit].push(selectedCard); // 場にカードを追加
            table[suit].sort((a, b) => ranks.indexOf(a) - ranks.indexOf(b)); // 順番にソート
            playerHand = playerHand.filter(card => card !== selectedCard); // 手札から削除
            selectedCard = null; // 選択リセット
            renderHand(); // 手札の再描画
            renderTable(); // テーブルの再描画
            updateMessage('カードを出しました。');
        } else {
            updateMessage(`${selectedCard} は場に出せません。`);
        }
    } else {
        updateMessage('選択したカードは手札にありません。');
    }

    if (playerHand.length === 0) {
        updateMessage('全ての手札を出しました。あなたの勝利です！');
        endGame();
    } else {
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

    if (canPlayCard(card)) {
        const suit = card.slice(0, -1); // スートを取得
        table[suit].push(card); // 場にカードを追加
        table[suit].sort((a, b) => ranks.indexOf(a) - ranks.indexOf(b)); // 順番にソート
        renderTable();
        updateMessage(`コンピュータ${computerIndex + 1}が ${card} を出しました。`);
    } else {
        computerHands[computerIndex].push(card); // 出せない場合は手札に戻す
        updateMessage(`コンピュータ${computerIndex + 1}はパスしました。`);
    }
}

function pass() {
    passCount++;
    if (passCount >= 5) {
        updateMessage('5回パスしました。あなたの負けです！');
        endGame();
    } else {
        updateMessage(`パスしました。残りパス回数: ${5 - passCount}`);
    }
    nextTurn(); // 次のプレイヤーのターンに進む
}

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
