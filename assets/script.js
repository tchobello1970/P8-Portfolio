document.addEventListener('DOMContentLoaded', function() {
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
    const toggleLanguageBtn = document.getElementById('toggle-language');

    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');

    toggleDarkModeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        moonIcon.classList.toggle('hidden');
        sunIcon.classList.toggle('hidden');
    });

    const hobbiesGrid = document.getElementById('hobbiesGrid');
    const hobbyItems = hobbiesGrid.querySelectorAll('.hobby-item');

    hobbyItems.forEach(item => {
        const frontImage = item.getAttribute('data-front');
        const backImage = item.getAttribute('data-back');

        item.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${frontImage}" alt="">
                </div>
                <div class="flip-card-back">
                    <img src="${backImage}" alt="">
                </div>
            </div>
        `;

        if (window.innerWidth <= 768) {
            item.addEventListener('click', () => {
                console.log('item clicked');
                item.classList.toggle('flipped');
            });
        }
    });

} );

