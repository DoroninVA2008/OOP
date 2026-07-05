export class Crossword {
  constructor(size) {
    this.size = size;
    this._grid = Array(size).fill(null).map(() => Array(size).fill(''));
    this._placedWords = [];
  }

  getGrid() { return this._grid; }
  getPlacedWords() { return this._placedWords; }
  placeWord(word, row, col, isHorizontal) {
    const letters = word.toUpperCase().split('');
    
    if (isHorizontal) {
      if (col + letters.length > this.size) {
        return { success: false, error: 'Слово не помещается!' };
      }
      for (let i = 0; i < letters.length; i++) {
        const existing = this._grid[row][col + i];
        if (existing && existing !== letters[i]) {
          return { success: false, error: 'Слово конфликтует с другим словом!' };
        }
      }
      for (let i = 0; i < letters.length; i++) this._grid[row][col + i] = letters[i];
    } else {
      if (row + letters.length > this.size) {
        return { success: false, error: 'Слово не помещается!' };
      }
      for (let i = 0; i < letters.length; i++) {
        const existing = this._grid[row + i][col];
        if (existing && existing !== letters[i]) {
          return { success: false, error: 'Слово конфликтует с другим словом!' };
        }
      }
      for (let i = 0; i < letters.length; i++) this._grid[row + i][col] = letters[i];
    }
    
    this._placedWords.push({ word: word.toUpperCase(), row, col, isHorizontal });
    return { success: true };
  }
}

export function renderCrossword(crossword, wordList) {
  const grid = crossword.getGrid();
  const placedWords = crossword.getPlacedWords();
  
  let gridHTML = '<div class="crossword-grid">';
  for (let row = 0; row < crossword.size; row++) {
    for (let col = 0; col < crossword.size; col++) {
      gridHTML += `<div class="crossword-cell" data-row="${row}" data-col="${col}">${grid[row][col]}</div>`;
    }
  }
  gridHTML += '</div>';

  const words = wordList.getWords();
  const horizontal = placedWords.filter(w => w.isHorizontal);
  const vertical = placedWords.filter(w => !w.isHorizontal);

  let infoHTML = '<div class="crossword-info">';
  
  if (horizontal.length > 0) {
    infoHTML += '<h3>По горизонтали</h3><ul>';
    horizontal.forEach(({ word }) => {
      const wordData = words.find(w => w.word === word.toLowerCase());
      if (wordData) {
        infoHTML += `<li><strong>${word.toLowerCase()}</strong>: ${wordData.description}</li>`;
      }
    });
    infoHTML += '</ul>';
  }

  if (vertical.length > 0) {
    infoHTML += '<h3>По вертикали</h3><ul>';
    vertical.forEach(({ word }) => {
      const wordData = words.find(w => w.word === word.toLowerCase());
      if (wordData) {
        infoHTML += `<li><strong>${word.toLowerCase()}</strong>: ${wordData.description}</li>`;
      }
    });
    infoHTML += '</ul>';
  }

  infoHTML += '</div>';

  const wrapperHTML = `
    <div class="crossword-wrapper">
      ${gridHTML}
      ${infoHTML}
      <button class="export-button">Экспорт в PDF</button>
    </div>
  `;

  return wrapperHTML;
}

function attachCrosswordHandlers() {
  const crosswordGrid = app.querySelector('.crossword-grid');
  if (crosswordGrid && crosswordGrid.dataset.handlersAttached !== 'true') {
    crosswordGrid.dataset.handlersAttached = 'true';
    crosswordGrid.addEventListener('click', handleCrosswordCellClick);
  }

  const exportButton = app.querySelector('.export-button');
  if (exportButton && exportButton.dataset.handlersAttached !== 'true') {
    exportButton.dataset.handlersAttached = 'true';
    exportButton.addEventListener('click', exportToPDF);
  }
}


function handleCrosswordCellClick(event) {
  const cell = event.target.closest('.crossword-cell');
  if (cell) {
    handleCellClick(cell);
  }
}