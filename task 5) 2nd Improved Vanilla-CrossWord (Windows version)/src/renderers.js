const SELECTORS = {
  table: 'table.word-list',
  addButton: '.word-list-add',
  deleteButton: 'button.row-delete',
  wordInput: '#new-word-input',
  descriptionInput: '#new-description-input',
  rowDescriptionInput: 'td.description input.description-input'
};


export function renderWordList(wordListInstance) {
  const rows = wordListInstance.getWords().map(renderWordRow).join('');

  const tableHTML = `
    <div class="word-list-wrapper">
      <table class="word-list">
      <thead>
        <tr>
          <th>Слово</th>
          <th>Описание</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div id="new-inputs">
    <input type="text" id="new-word-input" placeholder="Слово">
    <input type="text" id="new-description-input" placeholder="Описание">
    <td class="button-deleter"><button type="button" class="word-list-add">+</button></td>
    </div>
  </div>
  `;

  queueMicrotask(() => attachWordListHandlers(wordListInstance));

  return tableHTML;
}

function renderWordRow({ word, description }) {
  return `
        <tr>
          <td>${word}</td>
          <td class="description">
        <input type="text" class="description-input" value="${description}" />
      </td>
          <td class="button-deleter"><button class="row-delete">-</button></td>
        </tr>
  `;
}

function attachWordListHandlers(wordListInstance) {
  const table = document.querySelector(SELECTORS.table);
  if (!table || table.dataset.handlersAttached === 'true') return;

  table.dataset.handlersAttached = 'true';

  table.addEventListener('click', (event) => handleRowDelete(event, wordListInstance));

  table.addEventListener('input', (event) => handleDescriptionChange(event, wordListInstance));

  const addButton = document.querySelector(SELECTORS.addButton);
  if (addButton) {
    addButton.addEventListener('click', () => handleWordAdd(wordListInstance));
  }
}

function handleRowDelete(event, wordListInstance) {
  const deleteButton = event.target.closest(SELECTORS.deleteButton);
  if (!deleteButton) return;

  const row = deleteButton.closest('tr');
  if (!row) return;

  const wordCell = row.querySelector('td:first-child');
  if (!wordCell) return;

  const wordToDelete = wordCell.textContent.trim();

  if (wordListInstance.deleteWord(wordToDelete)) {
    row.remove();
    updateGrid();
  } else {
    alert(`Не удалось удалить слово "${wordToDelete}". Оно может не существовать.`);
  }
}

function handleDescriptionChange(event, wordListInstance) {
  const descriptionInput = event.target.closest(SELECTORS.rowDescriptionInput);
  if (!descriptionInput) return;

  const row = descriptionInput.closest('tr');
  if (!row) return;

  const wordCell = row.querySelector('td:first-child');
  if (!wordCell) return;

  const word = wordCell.textContent.trim();
  const newDescription = descriptionInput.value.trim(); 

  if (wordListInstance.updateWordDescription(word, newDescription)) {
    updateGrid();
  }
}

function handleWordAdd(wordListInstance) {
  const table = document.querySelector(SELECTORS.table);
  const wordInput = document.querySelector(SELECTORS.wordInput);
  const descriptionInput = document.querySelector(SELECTORS.descriptionInput);
  if (!table || !wordInput || !descriptionInput) return;

  const word = wordInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!word || !description) {
    alert('Пожалуйста, введите слово и описание.');
    return;
  }

  if (wordListInstance.addWord(word, description)) {
    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    tbody.insertAdjacentHTML('beforeend', renderWordRow({ word, description }));

    wordInput.value = '';
    descriptionInput.value = '';

    updateGrid();
  } else {
    alert(`Слово "${word}" уже существует в списке.`);
  }
}