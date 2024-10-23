// 場に出ているカードと手札を表す配列
const board = ['7♠', '6♠', '8♠']; // 場に出ているカードの例
const hand = ['9♥', '5♦', '6♣', '7♥']; // 手札の例

// ページがロードされた時に場と手札を表示
window.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const handBoard = document.getElementById('hand-board');
    
    // 場に出ているカードを表示
    board.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = card;
        cardDiv.id = `board-card-${index}`;
        cardDiv.classList.add('board-card');
        gameBoard.appendChild(cardDiv); // 場にカードを追加
    });

    // 手札を動的に表示
    hand.forEach((card, index) => {
        const button = document.createElement('button');
        button.innerText = card; // カード名をボタンに表示
        button.id = `card-${index}`; // 各ボタンにユニークなIDを付与
        button.classList.add('card-button'); // クラス名を追加（CSS用）
        button.addEventListener('click', () => {
            document.getElementById('message').innerText = `${card} をプレイしました。`;
            button.disabled = true; // ボタンを無効化する例
        });
        handBoard.appendChild(button); // 手札を表示
    });
});
