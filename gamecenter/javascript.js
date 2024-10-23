document.addEventListener('DOMContentLoaded', function () {
    // ページ内のリンクをスムーズにスクロール
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ゲームがクリックされたときに、そのゲームの説明を表示する関数
    const gameLinks = document.querySelectorAll('.page-link');
    gameLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const gameUrl = this.getAttribute('href');
            openGame(gameUrl);
        });
    });

    function openGame(url) {
        // ここにゲームを開く処理を記述
        // 例えば、新しいタブでゲームを開く
        window.open(url, '_blank');
    }

    // ゲーム説明のモーダル表示を追加することも可能です
    // 例:
    /*
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModal');
    
    gameLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const gameName = this.previousElementSibling.textContent;
            const gameDescription = this.previousElementSibling.textContent;
            
            modal.querySelector('.modal-title').textContent = gameName;
            modal.querySelector('.modal-body').textContent = gameDescription;
            modal.classList.add('open');
        });
    });
    
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('open');
    });
    */
});
