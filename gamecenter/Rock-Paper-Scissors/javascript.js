// じゃんけんの手を定義
const hands = ["グー", "チョキ", "パー"];

// 各ボタンのクリックイベントを設定
document.getElementById("rock").addEventListener("click", function() {
    playGame("グー");
});
document.getElementById("scissors").addEventListener("click", function() {
    playGame("チョキ");
});
document.getElementById("paper").addEventListener("click", function() {
    playGame("パー");
});

// じゃんけんのゲームロジック
function playGame(yourChoice) {
    const computerChoice = hands[Math.floor(Math.random() * hands.length)];
    document.getElementById("yourChoice").textContent = yourChoice;
    document.getElementById("computerChoice").textContent = computerChoice;
    
    let result;
    
    if (yourChoice === computerChoice) {
        result = "引き分け";
    } else if (
        (yourChoice === "グー" && computerChoice === "チョキ") ||
        (yourChoice === "チョキ" && computerChoice === "パー") ||
        (yourChoice === "パー" && computerChoice === "グー")
    ) {
        result = "あなたの勝ち！";
    } else {
        result = "コンピュータの勝ち！";
    }
    
    document.getElementById("result").textContent = result;
}
