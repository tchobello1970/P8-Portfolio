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

    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
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



    var clipboardIcon = document.getElementById('clipboard-icon');
    var mailText = document.getElementById('email-text');
    var mailCopyDiv = document.querySelector('.mail-copy');

        document.getElementById('email-text').addEventListener('click', function() {
        copyToClipboard(mailText.innerText); // adresse mail
    });

        clipboardIcon.addEventListener('click', function() {
        copyToClipboard(mailText.innerText);
    });

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(function() {
                clipboardIcon.classList.remove('fa-clipboard');
                clipboardIcon.classList.add('fa-check-circle');
                clipboardIcon.style.color = 'green';

                var tempMessage = document.createElement('p');
                tempMessage.textContent = 'Ajouté au presse-papiers';
                tempMessage.style.color = 'green';
                tempMessage.style.marginLeft = '10px';

                clipboardIcon.insertAdjacentElement('afterend', tempMessage);

                setTimeout(function() {
                    clipboardIcon.classList.remove('fa-check-circle');
                    clipboardIcon.classList.remove('fa-regular');
                    clipboardIcon.classList.add('fa-clipboard');
                    clipboardIcon.classList.add('fa-solid');
                    clipboardIcon.style.color = 'var(--text-color)';

                    mailCopyDiv.removeChild(tempMessage);
                }, 2000);
            })
            .catch(function(err) {
                console.error('Erreur lors de la copie dans le presse-papiers : ', err);
            });
    }

} );

