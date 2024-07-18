
document.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) { // 60 is the offset for the fixed navbar height
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

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


    function openModal(modalId) {
        document.getElementById(modalId).style.display = "block";
    }
    
    // Fonction pour fermer la fenêtre modale
    function closeModal(modalId) {
        document.getElementById(modalId).style.display = "none";
    }
    
    // Ajouter des événements aux icônes et aux boutons de fermeture
    document.querySelectorAll('.fa-question-circle').forEach(function(element) {
        element.onclick = function() {
            var modalId = this.getAttribute('data-modal');
            openModal(modalId);
        }
    });
    
    document.querySelectorAll('.close').forEach(function(element) {
        element.onclick = function() {
            var modalId = this.getAttribute('data-modal');
            closeModal(modalId);
        }
    });
    
    // Fermer la fenêtre modale lorsque l'utilisateur clique en dehors de celle-ci
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    }


} );

