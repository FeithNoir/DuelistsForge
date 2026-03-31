# Duelist's Forge: The Card Crafter 3D

Welcome to **Duelist's Forge**! An interactive web application designed to create, visualize, and download custom Yu-Gi-Oh! style cards with an immersive 3D flip effect.

## Key Features

- **Dynamic Sidebar**: Form fields automatically hide or show based on the selected card type (e.g., hiding levels and attributes for Spells or Traps).
- **Responsive Layout**: An optimized CSS Grid system that prevents page overflow and ensures a smooth experience across all screen sizes.
- **Language Selector**: A bilingual interface that allows users to switch between English and Spanish seamlessly, featuring flag emojis (🇺🇸/🇲🇽).
- **Custom Image Upload**: A custom-styled upload button that lets you personalize your card with your own artwork.
- **Card Export**: High-quality PNG download functionality powered by `html2canvas`, allowing you to save your creations.
- **Dynamic Star System**: Automatic generation of level/rank stars via JavaScript, contained within a single optimized and styled element.
- **Immersive 3D Effect**: Realistic card rotation triggered by mouse hover or keyboard focus, providing a premium feel.
- **Accessibility (WCAG AA)**: Built with web accessibility in mind, including full keyboard navigation (Tab key to flip), semantic HTML5, and ARIA landmarks.

## Technologies Used

- **HTML5**: For semantic structure and core content.
- **CSS3**: Utilizing Grid, Flexbox, and 3D transformations for the layout and animation.
- **JavaScript (Vanilla)**: Handling real-time UI updates, file processing, and the internationalization (i18n) system.
- **html2canvas**: A powerful library used to capture and export the card as an image.

## How to Use

1. Open `index.html` in any modern web browser.
2. Use the sidebar to fill in your card's details such as Name, Type, and Description.
3. Click the "Upload Image" button to add your custom art.
4. Interact with the card by hovering or using the **Tab** key to see the 3D flip effect.
5. Click the **Download Card** button to save a PNG of your design to your device.

## Potential Future Features (Roadmap)

- **Holographic Foils**: Implementation of CSS-based holographic overlays to simulate "Secret Rare" or "Ultra Rare" card effects.
- **Deck Manager**: A feature to save multiple cards into a local collection using `localStorage`, allowing for deck building.
- **Additional Templates**: Support for different card generations (e.g., Classic, Synchro, Xyz, Link) with era-accurate frames and fonts.
- **Interactive Duels**: A basic simulator to track life points and field positions for created cards.
- **Cloud Storage**: Integration with a backend service to store and share card designs via unique links.
- **Advanced Text Formatting**: Support for specialized symbols (e.g., ATK/DEF icons) and rich text in the description box.

## Author

Developed by [feithnoir](https://github.com/feithnoir)
