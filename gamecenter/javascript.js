let selectedCard = null; // プレイヤーが選んだカードを記録する

// プレイヤーの手札をボタンとして表示
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

// カードを選択する関数
function selectCard(index) {
    selectedCard = playerHand[index];
    updateMessage(`${selectedCard} を選択しました。カードを出すには「カードを出す」ボタンを押してください。`);
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
