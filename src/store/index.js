import {createStore} from 'vuex';
import {screens} from '../db';
import {getActualWords, getRandomActiveWord, getActiveLists, updateWord, addNewWord, addWordToList, removeWordFromList} from '../assets/funcs';
import {api} from '../assets/api';

export default createStore({
  state: {
    theme: 'dark',
    screen: null,
    previousScreen: null,
    words: [],
    actualWords: [],
    lists: [],
    activeWord: null,
    editedWord: null,
    editedList: null,
    nextActiveWord: null
  },
  mutations: {
    changeScreen(state, screen) {
      state.screen = screen;
    },
    updateLists(state, lists) {
      state.lists = lists;
    },
    updateWords(state, words) {
      state.words = words;
    },
    updateActualWords(state) {
      state.actualWords = getActualWords(state.lists, state.words);
    },
    changeActiveWord(state) {
      state.activeWord = state.nextActiveWord ? state.nextActiveWord : getRandomActiveWord(state);
    },
    setNextActiveWord(state) {
      state.nextActiveWord = getRandomActiveWord(state);
    },
    unsetNextActiveWord(state) {
      state.nextActiveWord = null;
    },
    setEditedWord(state, word) {
      state.editedWord = word;
    },
    unsetEditedWord(state) {
      state.editedWord = null;
    },
    setEditedList(state, list) {
      state.editedList = list;
    },
    unsetEditedList(state) {
      state.editedList = null;
    },
    setPreviousScreen(state) {
      state.previousScreen = state.screen;
    },
    unsetPreviousScreen(state) {
      state.previousScreen = null;
    },
    toggleTheme(state, theme) {
      state.theme = theme;
    }
  },
  actions: {
    updateData(context) {
      let lists = api.getLists();
      let words = api.getWords();

      context.commit('updateLists', lists);
      context.commit('updateWords', words);

      context.commit('updateActualWords');
      context.commit('changeActiveWord');
    },
    initialize(context) {  
      context.dispatch('updateData');
      context.commit('changeScreen', screens.learn);
    },
    toggleList(context, listTitle) {
      api.toggleList(listTitle);

      context.dispatch('updateData');
    },
    addWord(context, props) {
      api.addNewWord(props.newWord);

      context.dispatch('addWordToLists', {lists: props.lists, wordID: props.newWord.id});
      context.commit('unsetEditedWord');
    },
    addWordToLists(context, props) {
      props.lists.forEach(list => {
        api.addWordToList(props.wordID, list);
      });

      context.dispatch('updateData');
    },
    removeWordFromLists(context, props) {
      props.lists.forEach(list => {
        api.removeWordFromList(props.wordID, list.title);
      });

      context.dispatch('updateData');
    },
    changeWord(context, word) {
      api.updateWord(word);

      context.commit('changeScreen', screens.learn);
      context.commit('unsetEditedWord');
      context.dispatch('updateData');
    },
    addList(context, list) {
      api.addNewList(list);

      context.commit('changeScreen', screens.lists);
      context.commit('unsetEditedList');
      context.dispatch('updateData');
    },
    changeList(context, list) {
      api.updateList(list);

      context.commit('changeScreen', screens.lists);
      context.commit('unsetEditedList');
      context.dispatch('updateData');
    },
    clearProgress(context) {
      api.clearProgress();
      context.dispatch('updateData');
    }
  },
  modules: {
  }
});