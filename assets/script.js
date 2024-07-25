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
    const hobbyItems = hobbiesGrid.querySelectorAll('.hobby-item');
    const clipboardIcon = document.getElementById('clipboard-icon');
    const mailText = document.getElementById('email-text');
    const mailCopyDiv = document.querySelector('.mail-copy');

    /********************************************************************************* 
    /*
    /* updateNavLinks
    /* Fonction pour mettre à jour les liens de navigation en fonction du défilement
    /*
    **********************************************************************************/
    const updateNavLinks = () => {
        let currentSection = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 60) { 
                // 60 est le décalage pour la hauteur de la barre de navigation fixe
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').substring(1) === currentSection);
        });
    };

    /********************************************************************************* 
    /*
    /* toggleDarkMode
    /* Fonction pour gérer le mode Sombre
    /*
    **********************************************************************************/
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        moonIcon.classList.toggle('hidden');
        sunIcon.classList.toggle('hidden');
    };

    /********************************************************************************* 
    /*
    /* toggleMenu
    /* Fonction pour gérer l'affichage du menu en mode Mobile
    /*
    **********************************************************************************/
    const toggleMenu = () => {
        navLinksContainer.classList.toggle('show');
    };

    /********************************************************************************* 
    /*
    /* initializeHobbies
    /* initializeHobbies permet d'afficher tous les Hobbies (des cartes recto-verso) à la volée.
    /* On ajoute le cas responsive pour retourner une carte au clic au lieu du survol
    /*
    **********************************************************************************/
    const initializeHobbies = () => {
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

    /********************************************************************************* 
    /*
    /* copyToClipboard
    /* copyToClipboard utilise l'API Clipboard de JavaScript pour copier le texte. 
    /* Elle manipule le DOM pour fournir des retours visuels.
    /*
    **********************************************************************************/
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

    /********************************************************************************* 
    /*
    /* openModal
    /* openModal ouvre la modale au clic sur l'icone dédié.
    /*
    **********************************************************************************/

    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
            // Transférer le focus à la modale
            modal.querySelector('.close').focus();
            // Enregistrer le dernier élément focusé pour la restauration
            lastFocus = document.activeElement;
        }
    };

    /********************************************************************************* 
    /*
    /* closeModal
    /* closeModal ferme la modale au clic sur l'icone dédié ou à l'extérieur de la modale.
    /*
    **********************************************************************************/
    const closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            // Restaurer le focus à l'élément qui a ouvert la modale
            if (lastFocus) lastFocus.focus();
        }
    };

    /********************************************************************************* 
    /*
    /* validateForm
    /* validateForm vérifie si le contenu des champs est valide.
    /*
    **********************************************************************************/
    const validateForm = () => {
        const email = document.getElementById('email').value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const message = document.getElementById('message').value.trim();
        
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

      /********************************************************************************* 
    /*
    /* Ecouteurs d'évenements.
    /* Initialisations.
    /*
    **********************************************************************************/
    document.addEventListener('scroll', updateNavLinks);
    
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

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modal[aria-hidden="false"]');
            if (openModal) {
                closeModal(openModal.id);
            }
        }
    });


    document.querySelector('form')?.addEventListener('submit', event => {
        if (!validateForm()) {
            event.preventDefault();
        }
    });

    toggleDarkModeBtn && toggleDarkModeBtn.addEventListener('click', toggleDarkMode);
    menuBtn && menuBtn.addEventListener('click', toggleMenu);
    hobbiesGrid && initializeHobbies();
    clipboardIcon && clipboardIcon.addEventListener('click', () => copyToClipboard(mailText.innerText));
    mailText && mailText.addEventListener('click', () => copyToClipboard(mailText.innerText));
});