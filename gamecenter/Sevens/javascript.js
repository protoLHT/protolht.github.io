// 手札を表す配列
const hand = ['7♠', '9♥', '5♦', '6♣', '8♠']; // 例としていくつかのカードを手札にする

// ゲームを開始するボタン
document.getElementById('start-game').addEventListener('click', () => {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // ゲームボードを初期化
    
    // 手札を動的に表示する
    hand.forEach((card, index) => {
        const button = document.createElement('button');
        button.innerText = card; // カード名をボタンに表示
        button.id = `card-${index}`; // 各ボタンにユニークなIDを付与
        button.classList.add('card-button'); // クラス名を追加（CSS用）
        button.addEventListener('click', () => {
            document.getElementById('message').innerText = `${card} をプレイしました。`;
            // クリックされたボタンを非表示にするなど、後続の処理を追加
            button.disabled = true; // ボタンを無効化する例
        });
        gameBoard.appendChild(button); // ゲームボードにボタンを追加
    });
});
