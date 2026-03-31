/**
 * Duelist's Forge - App Logic
 * Responsibilities: UI updates, dynamic visibility, file handling, translations, and downloading.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Translation Data ---
    const translations = {
        en: {
            lang_label: "🇺🇸 English",
            page_title: "Duelist's Forge: The Card Crafter",
            header_title: "Duelist's Forge: The Card Crafter",
            skip_link: "Skip to main content",
            sidebar_title: "Customize Card",
            legend_core: "Core Info",
            label_name: "Card Name",
            placeholder_name: "Ej: Dark Magician",
            label_type: "Card Type",
            opt_monster_normal: "Normal Monster",
            opt_monster_effect: "Effect Monster",
            opt_monster_synchro: "Synchro Monster",
            opt_monster_xyz: "Xyz Monster",
            opt_monster_pendulum: "Pendulum Monster",
            opt_monster_link: "Link Monster",
            opt_spell: "Spell Card",
            opt_trap: "Trap Card",
            legend_monster: "Monster Specs",
            label_attribute: "Attribute",
            attr_dark: "DARK",
            attr_light: "LIGHT",
            attr_earth: "EARTH",
            attr_water: "WATER",
            attr_fire: "FIRE",
            attr_wind: "WIND",
            attr_divine: "DIVINE",
            label_level: "Level-Rank",
            label_race: "Type-Race",
            placeholder_race: "Ej: [Spellcaster / Effect]",
            legend_visuals: "Visuals & Text",
            label_art: "Art Image",
            btn_upload: "Upload Image",
            label_description: "Card Description",
            placeholder_text: "Describe the effect or lore...",
            aria_preview: "Card preview. Press Tab to focus and flip.",
            aria_art: "Card art",
            hint_prefix: "Tip: Use the",
            hint_suffix: "key to focus and flip the card.",
            footer_dev: "Developed by",
            btn_download: "Download Card",
            default_card_name: "Dark Magician",
            default_card_race: "[Spellcaster / Normal]",
            default_card_text: "The ultimate wizard in terms of attack and defense.",
            attr_aria_label: "Attribute"
        },
        es: {
            lang_label: "🇲🇽 Español",
            page_title: "Duelist's Forge: El Forjador de Cartas",
            header_title: "Duelist's Forge: El Forjador de Cartas",
            skip_link: "Saltar al contenido principal",
            sidebar_title: "Personaliza tu Carta",
            legend_core: "Información Base",
            label_name: "Nombre de la Carta",
            placeholder_name: "Ej: Mago Oscuro",
            label_type: "Tipo de Carta",
            opt_monster_normal: "Monstruo Normal",
            opt_monster_effect: "Monstruo de Efecto",
            opt_monster_synchro: "Monstruo de Sincronía",
            opt_monster_xyz: "Monstruo Xyz",
            opt_monster_pendulum: "Monstruo de Péndulo",
            opt_monster_link: "Monstruo de Enlace",
            opt_spell: "Carta Mágica",
            opt_trap: "Carta Trampa",
            legend_monster: "Detalles del Monstruo",
            label_attribute: "Atributo",
            attr_dark: "OSCURIDAD",
            attr_light: "LUZ",
            attr_earth: "TIERRA",
            attr_water: "AGUA",
            attr_fire: "FUEGO",
            attr_wind: "VIENTO",
            attr_divine: "DIVINO",
            label_level: "Nivel-Rango",
            label_race: "Tipo-Raza",
            placeholder_race: "Ej: [Lanzador de Conjuros / Efecto]",
            legend_visuals: "Visual y Texto",
            label_art: "Imagen de Arte",
            btn_upload: "Subir Imagen",
            label_description: "Texto de la Carta",
            placeholder_text: "Describe el efecto o leyenda...",
            aria_preview: "Vista previa de la carta. Presiona Tab para enfocar y girar.",
            aria_art: "Arte de la carta",
            hint_prefix: "Consejo: Usa la tecla",
            hint_suffix: "para enfocar y girar la carta.",
            footer_dev: "Desarrollado por",
            btn_download: "Descargar Carta",
            default_card_name: "Mago Oscuro",
            default_card_race: "[Lanzador de Conjuros / Normal]",
            default_card_text: "El más grande de los magos en cuanto al ataque y la defensa.",
            attr_aria_label: "Atributo"
        }
    };

    let currentLang = 'en';

    // DOM References - Form
    const inputName = document.getElementById('input-name');
    const inputAttribute = document.getElementById('input-attribute');
    const inputCardType = document.getElementById('input-card-type');
    const inputLevel = document.getElementById('input-level');
    const inputRace = document.getElementById('input-race');
    const inputImage = document.getElementById('input-image');
    const inputText = document.getElementById('input-text');
    const monsterFieldsGroup = document.getElementById('monster-fields-group');
    const customFileUpload = document.querySelector('.custom-file-upload');
    const langToggle = document.getElementById('lang-toggle');
    const langText = langToggle.querySelector('.lang-text');
    const downloadBtn = document.getElementById('download-btn');

    // DOM References - Card
    const displayName = document.getElementById('display-name');
    const displayAttribute = document.getElementById('display-attribute');
    const displayStars = document.getElementById('display-stars');
    const displayArt = document.getElementById('display-art');
    const displayRace = document.getElementById('display-race');
    const displayText = document.getElementById('display-text');
    const cardFace = document.querySelector('.card-front');
    const cardPreviewBtn = document.getElementById('card-preview-btn');
    const cardFrontSide = document.getElementById('card-front-side');

    // Attribute Mapping
    const attributeSymbols = {
        'DARK': '闇',
        'LIGHT': '光',
        'EARTH': '地',
        'WATER': '水',
        'FIRE': '炎',
        'WIND': '風',
        'DIVINE': '神'
    };

    /**
     * Updates UI based on current language
     */
    const updateUI = () => {
        const langData = translations[currentLang];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (langData[key]) el.textContent = langData[key];
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (langData[key]) el.placeholder = langData[key];
        });

        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria');
            if (langData[key]) el.setAttribute('aria-label', langData[key]);
        });

        langText.textContent = langData.lang_label;
        cardPreviewBtn.setAttribute('aria-label', langData.aria_preview);
        displayAttribute.setAttribute('aria-label', langData.attr_aria_label);
        
        document.documentElement.lang = currentLang;

        if (!inputName.value) displayName.textContent = langData.default_card_name;
        if (!inputRace.value) displayRace.textContent = langData.default_card_race;
        if (!inputText.value) displayText.textContent = langData.default_card_text;
    };

    /**
     * Toggles between languages
     */
    const toggleLanguage = () => {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        updateUI();
    };

    /**
     * Updates card name
     */
    const updateName = () => {
        displayName.textContent = inputName.value || translations[currentLang].default_card_name;
    };

    /**
     * Updates attribute symbol
     */
    const updateAttribute = () => {
        const attr = inputAttribute.value;
        displayAttribute.textContent = attributeSymbols[attr] || '?';
    };

    /**
     * Toggles visibility of monster-specific fields
     */
    const toggleFieldsVisibility = () => {
        const type = inputCardType.value;
        const isMonster = type.includes('monster');
        
        if (isMonster) {
            monsterFieldsGroup.hidden = false;
            monsterFieldsGroup.style.display = 'block';
        } else {
            monsterFieldsGroup.hidden = true;
            monsterFieldsGroup.style.display = 'none';
        }
    };

    /**
     * Updates card colors and visibility based on type
     */
    const updateCardType = () => {
        const type = inputCardType.value;
        
        const classesToRemove = [
            'monster-normal', 'monster-effect', 'monster-synchro', 
            'monster-xyz', 'monster-pendulum', 'monster-link', 
            'spell', 'trap'
        ];
        cardFace.classList.remove(...classesToRemove);
        cardFace.classList.add(type);

        if (type === 'spell' || type === 'trap') {
            displayStars.style.visibility = 'hidden';
            displayAttribute.textContent = type === 'spell' ? '魔' : '罠';
        } else {
            displayStars.style.visibility = 'visible';
            updateAttribute();
        }

        toggleFieldsVisibility();
    };

    /**
     * Updates stars/level using textContent for the single span
     */
    const updateLevel = () => {
        const level = parseInt(inputLevel.value) || 0;
        const starChar = '★';
        displayStars.textContent = starChar.repeat(Math.max(0, Math.min(12, level)));
        displayStars.setAttribute('aria-label', `Level ${level}`);
    };

    /**
     * Updates race/type text
     */
    const updateRace = () => {
        displayRace.textContent = inputRace.value || translations[currentLang].default_card_race;
    };

    /**
     * Updates description text
     */
    const updateText = () => {
        displayText.textContent = inputText.value || translations[currentLang].default_card_text;
    };

    /**
     * Handles local image upload
     */
    const handleImageUpload = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                displayArt.style.backgroundImage = `url('${e.target.result}')`;
            };
            reader.readAsDataURL(file);
        }
    };

    /**
     * Downloads the card using html2canvas
     */
    const downloadCard = () => {
        // We capture only the front side of the card
        html2canvas(cardFrontSide, {
            useCORS: true,
            scale: 2, // Better quality
            backgroundColor: null
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = `${displayName.textContent.replace(/\s+/g, '_')}_Card.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    };

    // Event Listeners
    inputName.addEventListener('input', updateName);
    inputAttribute.addEventListener('change', updateAttribute);
    inputCardType.addEventListener('change', () => {
        updateCardType();
        updateLevel();
    });
    inputLevel.addEventListener('input', updateLevel);
    inputRace.addEventListener('input', updateRace);
    inputText.addEventListener('input', updateText);
    
    inputImage.addEventListener('change', (e) => handleImageUpload(e.target.files[0]));

    // Language Toggle
    langToggle.addEventListener('click', toggleLanguage);

    // Download Logic
    downloadBtn.addEventListener('click', downloadCard);

    // Accessibility: Support Enter/Space on custom file upload button
    customFileUpload.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputImage.click();
        }
    });

    // Initialize
    updateUI();
    updateCardType();
    updateLevel();
});
