import './style.css';
import { elementMethods } from './baseline.js';
import { renderWordList, renderAddForm } from './renderers.js';
import { Crossword, renderCrossword } from './crossword.js';
import { WordList } from './wordlist.js';

const { first } = elementMethods();
const root = first("#root");

root.innerHTML = `
  <div id="app">
    <div class="words"></div>
    <div class="add-form"></div>
  </div>
`;

const app = root.first("#app");

const wl = new WordList();

const attachTableEventListeners = () => {
  const wlEl = first(".word-list");
  if (wlEl) {
    wlEl.on('click', (e) => {
      const target = e.target;
      if (target.classList.contains('remove')) {
        const row = target.closest('tr');
        const word = row.querySelector('.word');
        if (word) {
          wl.removeWord(word.innerText);
        }
      }
    });

    wlEl.on('input', (e) => {
      const target = e.target;
      if (target.classList.contains('description-input')) {
        const row = target.closest('tr');
        const originalWord = row.dataset.originalWord;
        const currentWord = row.querySelector('.word').innerText;
        const newDescription = target.value.trim();

        if (originalWord && currentWord) {
          wl.updateWord(originalWord, currentWord, newDescription);
        }
      }
    });

    wlEl.on('blur', (e) => {
        const target = e.target;
        if (target.classList.contains('description-input')) {
        }
    });

    wlEl.on('keydown', (e) => {
        const target = e.target;
        if (target.classList.contains('description-input') && e.key === 'Enter') {
            e.preventDefault();
            target.blur();
        }
    });
  }
};

const onChangeWordList = () => {
  root.first('#app .words').innerHTML = '';
  root.first('#app .words').innerHTML = renderWordList(wl);
  attachTableEventListeners();
};

wl.onChange = onChangeWordList;

if (wl.words.length === 0) {
  wl.addWord("повар", "такая профессия");
  wl.addWord("чай", "вкусный, делает меня человеком");
  wl.addWord("яблоки", "с ананасами");
  wl.addWord("сосисочки", "я — Никита Литвинков!");
}

root.first('#app .add-form').innerHTML = renderAddForm();

const formEl = first('.add-form');
formEl.on('click', (e) => {
  const target = e.target;
  if (target.type === 'button') {
    const form = target.closest('form');
    const wordEl = form.querySelector('input[name="word"]');
    const descEl = form.querySelector('input[name="description"]');
    const word = wordEl.value.trim();
    const description = descEl.value.trim();

    if (word) {
      wl.addWord(word, description);
      wordEl.value = "";
      descEl.value = "";
    }
  }
});

onChangeWordList();