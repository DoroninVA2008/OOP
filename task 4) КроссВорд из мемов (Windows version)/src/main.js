import './style.css'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <template id="word-list">
      <table>
        <thead>
          <tr>
            <th>Слово</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </template>
    <template id="table-row">
      <tr>
        <td>%word</td>
        <td>%description</td>
      </tr>
    </template>
`

class WordList {
  constructor() {
    this.words = [];
  }
  
  addWord(word, description) {
    this.words.push({ word, description });
  }
}

export function renderWordList(wordList) {
  const template = document.getElementById('word-list');
  const clone = template.content.cloneNode(true);
  const tbody = clone.querySelector('tbody');

  tbody.innerHTML = '';

  wordList.words.forEach(word => {
    const rowTemplate = document.getElementById('table-row');
    const rowClone = rowTemplate.content.cloneNode(true);
    const row = rowClone.querySelector('tr');
    
    row.innerHTML = row.innerHTML
      .replace('%word', word.word)
      .replace('%description', word.description);
    
    tbody.appendChild(row);
  });
  
  return clone.firstElementChild.outerHTML;
}

// Код, начиная с этого места НЕ меняем
const wl = new WordList();

wl.addWord("повар", "такая профессия");
wl.addWord("чай", "вкусный, делает меня человеком");
wl.addWord("яблоки", "с ананасами");
wl.addWord("сосисочки", "я — Никита Литвинков!");

document.querySelector('#app').innerHTML = renderWordList(wl);

setupCounter(document.querySelector('#counter'));