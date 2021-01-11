export const getActualWords = (lists, words) => {
  let actualWordsList = [];

  lists.forEach(list => {
    if (list.active) {
      list.wordsIDs.forEach(wordID => {
        let word = words.find(w => w.id == wordID);

        if (actualWordsList.findIndex(w => w.id === word.id) == -1) {
          if (!word.completed) {
            actualWordsList.push(word);
          }
        }
      });
    }
  });

  return actualWordsList;
}

export const getRandomActiveWord = state => {
  if (state.actualWords.length === 1) return state.actualWords[0];
  
  if (state.actualWords.length == 0) {
    return null;
  }

  const getIndex = () => {
    return Math.floor(Math.random() * state.actualWords.length);
  }

  let randIndex = getIndex();

  while (state.actualWords[randIndex] === state.activeWord) {
    randIndex = getIndex();
  }

  return state.actualWords[randIndex];
}

export const getWordLists = (id, lists) => {
  let listsArray = [];

  lists.forEach(list => {
    if (list.wordsIDs.findIndex(wordID => wordID === id) != -1) {
      listsArray.push(list.title);
    }
  });

  return listsArray;
}