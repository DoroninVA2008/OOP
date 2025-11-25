import { Word } from './word.js'

export class WordList {
  constructor() {
    this.words = [];
    this.onChange = () => null;
  }

  addWord(word, description) {
        if (typeof word && description !== 'string', word && description.trim() === '') {
          throw new Error("!!!Description!!!");
        }

        this.words.push(new Word(word, description));
        this.onChange();
      }

  removeWord(word) {
    this.words = this.words.filter((w) => !(w.word === word));
    this.onChange();
  }

  updateWord(oldWord, newWord, newDescription) {
    const wordObj = this.words.find(w => w.word === oldWord);
    if (wordObj) {
      wordObj.word = newWord;
      wordObj.description = newDescription;
      return true;
    }
    return false;
  }
}