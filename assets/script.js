document.addEventListener('DOMContentLoaded', () => {
    // Variables globales pour les éléments DOM
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const toggleDarkModeBtn = document.getElementById('toggle-dark-mode');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const hobbiesGrid = document.getElementById('hobbiesGrid');
    const clipboardIcon = document.getElementById('clipboard-icon');
    const mailText = document.getElementById('email-text');
    const mailCopyDiv = document.querySelector('.mail-copy');

    // Fonction pour mettre à jour les liens de navigation en fonction du défilement
    const updateNavLinks = () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 60) { // 60 est le décalage pour la hauteur de la barre de navigation fixe
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').substring(1) === currentSection);
        });
    };

    // Fonction pour gérer le mode sombre
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        moonIcon.classList.toggle('hidden');
        sunIcon.classList.toggle('hidden');
    };

    // Fonction pour gérer le menu
    const toggleMenu = () => {
        navLinksContainer.classList.toggle('show');
    };

    // Fonction pour gérer les cartes de loisirs
    const initializeHobbies = () => {
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
                    item.classList.toggle('flipped');
                });
            }
        });
    };

    // Fonction pour copier du texte dans le presse-papiers
    const copyToClipboard = text => {
        navigator.clipboard.writeText(text)
            .then(() => {
                clipboardIcon.classList.replace('fa-clipboard', 'fa-check-circle');
                clipboardIcon.style.color = 'green';

                const tempMessage = document.createElement('p');
                tempMessage.textContent = 'Ajouté au presse-papiers';
                tempMessage.style.color = 'green';
                tempMessage.style.marginLeft = '10px';

                clipboardIcon.insertAdjacentElement('afterend', tempMessage);

                setTimeout(() => {
                    clipboardIcon.classList.replace('fa-check-circle', 'fa-clipboard');
                    clipboardIcon.style.color = 'var(--text-color)';
                    mailCopyDiv.removeChild(tempMessage);
                }, 2000);
            })
            .catch(err => {
                console.error('Erreur lors de la copie dans le presse-papiers : ', err);
            });
    };

    // Fonction pour ouvrir une modale
    const openModal = modalId => {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'block';
    };

    // Fonction pour fermer une modale
    const closeModal = modalId => {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'none';
    };

    // Fonction de validation de formulaire
    const validateForm = () => {
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert('Veuillez entrer une adresse email valide.');
            return false;
        }

        if (message.length <= 5) {
            alert('Le message doit contenir plus de 5 caractères et ne doit pas être constitué uniquement d\'espaces.');
            return false;
        }

        return true;
    };

    // Ajouter les écouteurs d'événements
    document.addEventListener('scroll', updateNavLinks);
    toggleDarkModeBtn && toggleDarkModeBtn.addEventListener('click', toggleDarkMode);
    menuBtn && menuBtn.addEventListener('click', toggleMenu);
    hobbiesGrid && initializeHobbies();
    clipboardIcon && clipboardIcon.addEventListener('click', () => copyToClipboard(mailText.innerText));
    mailText && mailText.addEventListener('click', () => copyToClipboard(mailText.innerText));

    document.querySelectorAll('.fa-question-circle').forEach(element => {
        element.addEventListener('click', () => openModal(element.getAttribute('data-modal')));
    });

    document.querySelectorAll('.close').forEach(element => {
        element.addEventListener('click', () => closeModal(element.getAttribute('data-modal')));
    });

    window.addEventListener('click', event => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });

    document.querySelector('form')?.addEventListener('submit', event => {
        if (!validateForm()) {
            event.preventDefault();
        }
    });
});