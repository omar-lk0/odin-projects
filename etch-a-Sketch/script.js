const container = document.querySelector('#container');
const resetBtn = document.querySelector('#reset-btn'); // Fixed typo!

function createGrid(sides) {
    container.innerHTML = '';

    const totalSquares = sides * sides;
    const squarePercentage = 100 / sides;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('grid');

        square.style.width = `${squarePercentage}%`;
        square.style.height = `${squarePercentage}%`;

        square.addEventListener('mouseover', () => {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        });

        container.appendChild(square);
    }
}

createGrid(16);

resetBtn.addEventListener('click', () => {
    let userInput = prompt('Enter number of squares per side (Max: 100):');

    if (userInput === null) return; // Ignore if user clicks Cancel

    let sides = parseInt(userInput);

    if (isNaN(sides) || sides < 1 || sides > 100) {
        alert('Enter valid number 1-100');
    } else { 
        createGrid(sides);
    }
});