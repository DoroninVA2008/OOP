const SELECTORS = {
  table: 'table.word-list',
  addButton: '.word-list-add',
  deleteButton: 'button.row-delete',
  wordInput: '#new-word-input',
  descriptionInput: '#new-description-input'
};

const WORD_LIST_CHANGE_EVENT = 'wordListChanged';

export function renderWordList(wordList) {
  const rows = wordList.getWords().map(renderWordRow).join('');

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

  queueMicrotask(attachWordListHandlers);

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

function attachWordListHandlers() {
  const table = document.querySelector(SELECTORS.table);
  if (!table || table.dataset.handlersAttached === 'true') return;

  table.dataset.handlersAttached = 'true';
  table.addEventListener('click', handleRowDelete);

  const addButton = document.querySelector(SELECTORS.addButton);
  if (addButton) {
    addButton.addEventListener('click', handleWordAdd);
  }
}

function handleRowDelete(event) {
  const deleteButton = event.target.closest(SELECTORS.deleteButton);
  if (!deleteButton) return;

  const row = deleteButton.closest('tr');
  if (!row) return;

  row.remove();
  dispatchWordListChanged();
}

function handleWordAdd() {
  const table = document.querySelector(SELECTORS.table);
  const wordInput = document.querySelector(SELECTORS.wordInput);
  const descriptionInput = document.querySelector(SELECTORS.descriptionInput);
  if (!table || !wordInput || !descriptionInput) return;

  const word = wordInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!word || !description) {
    return;
  }

  const tbody = table.querySelector('tbody');
  if (!tbody) return;

  tbody.insertAdjacentHTML('beforeend', renderWordRow({ word, description }));

  wordInput.value = '';
  descriptionInput.value = '';

  dispatchWordListChanged();
}

function dispatchWordListChanged() {
  document.dispatchEvent(new CustomEvent(WORD_LIST_CHANGE_EVENT));
}