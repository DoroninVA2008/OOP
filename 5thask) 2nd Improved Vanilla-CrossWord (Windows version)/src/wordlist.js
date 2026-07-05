export class WordList {
  constructor() {
    this._words = [];
  }

  addWord(word, description) {
    const lowerWord = word.toLowerCase();
    if (!this._words.some(item => item.word === lowerWord)) {
      this._words.push({ word: lowerWord, description });
      return true;
    }
    return false; 
  }

  getWords() {
    return this._words;
  }

  updateWordDescription(wordText, newDescription) {
    const lowerWord = wordText.toLowerCase();
    const wordItem = this._words.find(item => item.word === lowerWord);
    if (wordItem) {
      wordItem.description = newDescription;
      return true;
    }
    return false;
  }

  deleteWord(wordText) {
    const lowerWord = wordText.toLowerCase();
    const initialLength = this._words.length;
    this._words = this._words.filter(item => item.word !== lowerWord);
    return this._words.length < initialLength;
  }
}