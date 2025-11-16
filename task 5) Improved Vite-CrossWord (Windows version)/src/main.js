import './style.css'
import { elementMethods } from './baseline.js';
import { renderWordList, renderAddForm } from './renderers.js';
import { WordList } from './wordlist.js';

const { first } = elementMethods();
const root = first("#root");

root.innerHTML =`
  <div id="app">
    <div class="words"></div>
    <div class="add-form"></div>
  </div>
`;

const app = root.first("#app");

const wl = new WordList();

const onChangeWordList = () => {
  root.first('#app .words').innerHTML = renderWordList(wl);
  const wlEl = first(".word-list");
  
  wlEl.on('click', (e) => {
    const target = e.target;
    if (target.classList.contains('remove')) {
      const row = target.closest('tr');
      const wordInput = row.querySelector('.word-input');
      if (wordInput) {
        wl.removeWord(wordInput.value);
      }
    }
  });

  wlEl.on('change', (e) => {
    const target = e.target;
    if (target.classList.contains('word-input') || target.classList.contains('description-input')) {
      const row = target.closest('tr');
      const wordInput = row.querySelector('.word-input');
      const descInput = row.querySelector('.description-input');
      const originalWord = row.dataset.originalWord;
      const newWord = wordInput.value.trim();
      const newDescription = descInput.value.trim();
      
      if (originalWord && newWord) {
        wl.updateWord(originalWord, newWord, newDescription);
        row.dataset.originalWord = newWord;
      }
    }
  });

  wlEl.on('blur', (e) => {
    const target = e.target;
    if (target.classList.contains('word-input') || target.classList.contains('description-input')) {}
  }, true);

  wlEl.on('keypress', (e) => {
    if (e.key === 'Enter') {
      e.target.dispatchEvent(new Event('change', { bubbles: true }));
      e.target.blur();
    }
  });
}

wl.onChange = onChangeWordList;

wl.addWord("повар", "такая профессия");
wl.addWord("чай", "вкусный, делает меня человеком");
wl.addWord("яблоки", "с ананасами");
wl.addWord("сосисочки", "я — Никита Литвинков!");

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
      saveAllCurrentEdits();
      wl.addWord(word, description);
      wordEl.value = descEl.value = "";
    }
  }
});

const saveAllCurrentEdits = () => {
  const inputs = document.querySelectorAll('.word-input, .description-input');
  inputs.forEach(input => {
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
};