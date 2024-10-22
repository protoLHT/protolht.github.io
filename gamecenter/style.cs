/* 全体の背景やフォント設定 */
body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #000; /* 黒背景 */
    color: #adff2f; /* 黄緑文字 */
}

/* ヘッダーのスタイル */
.header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 10vh;
    background-color: #000; /* 黒背景 */
    color: #adff2f; /* 黄緑文字 */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 10;
}

.header h1 {
    margin: 0;
    letter-spacing: 6px;
    font-family: 'Poppins', sans-serif;
    color: #adff2f; /* 黄緑文字 */
}

/* ナビゲーションリンクのスタイル */
.nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.nav a {
    text-decoration: none;
    color: #adff2f; /* 黄緑文字 */
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    padding: 10px 25px;
    background-color: #000; /* 黒背景 */
    border: 2px solid #adff2f; /* 黄緑のボーダー */
    border-radius: 30px;
    transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}

.nav a:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(173, 255, 47, 0.6); /* 黄緑の影 */
    background-color: #adff2f; /* ホバー時に黄緑 */
    color: #000; /* ホバー時は黒文字 */
}

/* コンテンツのスタイル */
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    margin: 15vh auto 0; /* ヘッダーを避けるために15vhの余白を追加 */
    padding: 20px;
}

.content {
    flex: 1 1 30%;
    max-width: 30%;
    text-align: center;
    padding: 20px;
    margin: 10px;
    background-color: #1a1a1a; /* 黒に近いグレーの背景 */
    border-radius: 15px;
    box-shadow: 0 6px 12px rgba(173, 255, 47, 0.5); /* 黄緑の影 */
    transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.content:hover {
    transform: translateY(-10px);
    background-color: #adff2f; /* ホバー時に黄緑 */
    color: #000; /* ホバー時は黒文字 */
}

.content img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 15px;
}

.content a {
    text-decoration: none;
    color: #adff2f; /* 黄緑文字 */
    font-weight: bold;
    padding: 10px 25px;
    cursor: pointer;
    border: 2px solid #adff2f; /* 黄緑のボーダー */
    border-radius: 20px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.content a:hover {
    background-color: #adff2f; /* ホバー時に黄緑 */
    color: #000; /* ホバー時は黒文字 */
}

/* Aboutセクションのスタイル */
.about-section {
    background-color: #000;
    color: #adff2f;
    padding: 40px 20px;
    text-align: center;
}

.about-title {
    font-size: 2em;
    margin-bottom: 20px;
}

/* レスポンシブ対応 */
@media screen and (max-width: 768px) {
    .content {
        flex: 1 1 100%;
        max-width: 100%;
    }
}
