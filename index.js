/**
 * Duelist's Forge - Lógica de la aplicación
 * Sigue principios de responsabilidad única y código limpio.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias al DOM - Formulario
    const inputName = document.getElementById('input-name');
    const inputAttribute = document.getElementById('input-attribute');
    const inputCardType = document.getElementById('input-card-type');
    const inputLevel = document.getElementById('input-level');
    const inputRace = document.getElementById('input-race');
    const inputImage = document.getElementById('input-image');
    const inputText = document.getElementById('input-text');
    const levelContainer = document.getElementById('level-container');

    // Referencias al DOM - Carta
    const displayName = document.getElementById('display-name');
    const displayAttribute = document.getElementById('display-attribute');
    const displayStars = document.getElementById('display-stars');
    const displayArt = document.getElementById('display-art');
    const displayRace = document.getElementById('display-race');
    const displayText = document.getElementById('display-text');
    const cardFace = document.querySelector('.card-front');

    // Mapeo de Atributos a Símbolos Kanji/Iconos
    const attributeSymbols = {
        'OSCURIDAD': '闇',
        'LUZ': '光',
        'TIERRA': '地',
        'AGUA': '水',
        'FUEGO': '炎',
        'VIENTO': '風',
        'DIVINO': '神'
    };

    /**
     * Actualiza el nombre de la carta
     */
    const updateName = () => {
        displayName.textContent = inputName.value || 'Nombre de la Carta';
    };

    /**
     * Actualiza el atributo y su símbolo
     */
    const updateAttribute = () => {
        const attr = inputAttribute.value;
        displayAttribute.textContent = attributeSymbols[attr] || '?';
        // Accesibilidad: Actualizar etiqueta para lectores de pantalla
        displayAttribute.setAttribute('aria-label', `Atributo: ${attr}`);
    };

    /**
     * Actualiza el color de la carta según su tipo
     */
    const updateCardType = () => {
        const type = inputCardType.value;
        
        // Limpiar clases previas de tipo
        const classesToRemove = [
            'monster-normal', 'monster-effect', 'monster-synchro', 
            'monster-xyz', 'monster-pendulum', 'monster-link', 
            'spell', 'trap'
        ];
        cardFace.classList.remove(...classesToRemove);
        
        // Añadir nueva clase
        cardFace.classList.add(type);

        // Ocultar/Mostrar nivel según si es monstruo
        if (type === 'spell' || type === 'trap') {
            levelContainer.style.display = 'none';
            displayStars.style.display = 'none';
        } else {
            levelContainer.style.display = 'flex';
            displayStars.style.display = 'block';
        }
    };

    /**
     * Actualiza las estrellas de nivel o rango
     */
    const updateLevel = () => {
        const level = parseInt(inputLevel.value) || 0;
        const starChar = inputCardType.value === 'monster-xyz' ? '★' : '★'; // En físico son distintas, aquí usamos la misma por simplicidad visual
        displayStars.textContent = starChar.repeat(Math.max(0, Math.min(12, level)));
        displayStars.setAttribute('aria-label', `Nivel ${level}`);
    };

    /**
     * Actualiza la raza/tipo
     */
    const updateRace = () => {
        displayRace.textContent = inputRace.value || '[Tipo / Raza]';
    };

    /**
     * Actualiza el texto de descripción/efecto
     */
    const updateText = () => {
        displayText.textContent = inputText.value || 'Descripción de la carta...';
    };

    /**
     * Maneja la carga de imagen local
     */
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                displayArt.style.backgroundImage = `url('${e.target.result}')`;
                displayArt.setAttribute('aria-label', 'Arte personalizado de la carta');
            };
            reader.readAsDataURL(file);
        }
    };

    // Event Listeners con enfoque en actualización en tiempo real
    inputName.addEventListener('input', updateName);
    inputAttribute.addEventListener('change', updateAttribute);
    inputCardType.addEventListener('change', () => {
        updateCardType();
        updateLevel(); // Re-calcular estrellas por si cambió a Xyz o Hechizo
    });
    inputLevel.addEventListener('input', updateLevel);
    inputRace.addEventListener('input', updateRace);
    inputText.addEventListener('input', updateText);
    inputImage.addEventListener('change', handleImageUpload);

    // Inicialización
    updateCardType();
    updateAttribute();
});
