document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // デフォルトのリンク動作を防止
        const targetId = this.getAttribute('href').substring(1); // リンク先ID取得
        const targetElement = document.getElementById(targetId); // IDで要素を取得

        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight; // ヘッダーの高さを取得
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight, // ヘッダー分を引いてスクロール
                behavior: 'smooth' // スムーズスクロール
            });
        }
    });
});
