import {lists, words} from '../db';

export const api = {
  getLists() {
    return lists.map(list => list);
  },
  getWords() {
    return words.map(word => word);
  },
  updateWord(word) {
    let position = words.findIndex(w => w.id == word.id);
    words[position] = word;
  },
  toggleList(listTitle) {
    let position = lists.findIndex(list => list.title == listTitle);
    lists[position].active = !lists[position].active;
  },
  addNewWord(word) {
    words.push(word);
  },
  addWordToList(wordID, listTitle) {
    let position = lists.findIndex(list => list.title == listTitle);
    lists[position].wordsIDs.push(wordID);
  },
  removeWordFromList(wordID, listTitle) {
    let positionList = lists.findIndex(list => list.title == listTitle);
    let positionWord = lists[positionList].wordsIDs.findIndex(id => id == wordID);

    lists[positionList].wordsIDs.splice(positionWord, 1);
  },
  addNewList(list) {
    lists.push(list);
  },
  updateList(list) {
    let position = lists.findIndex(l => l.title == list.title);
    lists[position] = list;
  },
  clearProgress() {
    words.forEach(word => {
      word.completed = false;
    });
  }
}