import { template } from './baseline.js'

export const renderWordList = (wordlist) => {
  const tpl = template('word-list');
  return tpl.
    replace(
      '<tr></tr>',
      wordlist.words.map(renderWord).join(''));
}

export const renderWord = (word) => {
  const tpl = template('table-row');
  const rowHtml = tpl.
    replace('%word', word.word).
    replace('%description', word.description);
    
  return rowHtml.replace('<tr>', `<tr data-original-word="${word.word}">`);
}


export const renderAddForm = () => {
  return template('add-form');
}
