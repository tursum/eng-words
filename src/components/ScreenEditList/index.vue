<template>
  <div class="screen edit-list">
    <form class="edit-list-form">
      <label for="edit-list-title">
        <p class="label-p">Название списка:*</p>
        <input id="edit-list-title" type="text" v-model="title">
      </label>
      <ul class="edit-list-words-list">
        <li v-for="word in words" class="edit-list-words-item">
          <label :for="`edit-list-words-item-${word.original}`" class="edit-list-words-item-label">
            <p class="edit-list-word-item-original">{{word.completed ? '✓' : ''}} {{word.original}} <a href="#" @click.prevent="editWord(word)">(✎)</a></p>
            <ul class="edit-list-word-item-lists-list">
              <ListItem v-for="(list, key) in getWordLists(word.id, lists)" :wordLists="getWordLists(word.id, lists)" :key="key" :id="key" :list="list" />
            </ul>
          </label>
          <input
            type="checkbox"
            :checked="isChecked(word.id)"
            class="edit-list-words-item-input"
            :id="`edit-list-words-item-${word.original}`"
            @change="toggleWord(word.id)"
          >
        </li>
      </ul>
      <p class="warn" v-if="warn">{{warn}}</p>
      <div class="submit-cover">
        <input type="submit" value="Закончить редактирование" class="button edit-list-submit" @click.prevent="finishEditing">
        <input type="submit" :value="`Отменить ${list ? 'редактирование' : 'создание'} списка`" class="button warn-button edit-list-submit" @click.prevent="cancelEditing">
      </div>
    </form>
  </div>
</template>

<script>
  import {ref, computed} from 'vue';
  import {useStore} from 'vuex';

  import {getWordLists} from '../../assets/funcs';
  import {List, screens} from '../../db';

  import ListItem from './ListItem';

  export default {
    name: 'ScreenEditList',
    components: {
      ListItem
    },
    props: {

    },
    setup(props) {
      let store = useStore();
      let state = store.state;

      let words = computed(() => state.words);
      let lists = computed(() => state.lists);

      let list = state.editedList ? state.editedList : null;

      let title = ref(list ? list.title : null);
      let newListWordsIDs = ref(list ? list.wordsIDs : []);

      let warn = ref('');

      const isChecked = wordID => {
        if (newListWordsIDs.value.length == 0) {
          return false;
        } else {
          if (newListWordsIDs.value.findIndex(id => id == wordID) != -1) return true;
        }
      }

      const toggleWord = wordID => {
        let position = newListWordsIDs.value.findIndex(id => id === wordID);

        if (position == -1) {
          newListWordsIDs.value.push(wordID);
        } else {
          newListWordsIDs.value.splice(position, 1);
        }
      }

      const finishEditing = () => {
        if (!title.value) {
          warn.value = 'Должно быть заполнено поле "Название';
          return;
        }

        if (list) {
          list.title = title.value;
          list.wordsIDs = newListWordsIDs.value;

          store.dispatch('changeList', list);

          return;
        }

        let newList = new List(title.value, newListWordsIDs.value);
        
        store.dispatch('addList', newList);
      }

      const cancelEditing = () => {
        store.commit('changeScreen', screens.lists);
        store.commit('unsetEditedList');
      }

      const editWord = word => {
        store.commit('setEditedWord', word);
        store.commit('setPreviousScreen');
        store.commit('changeScreen', screens.editWord);
      }

      return {
        words,
        lists,
        list,
        getWordLists,
        isChecked,
        toggleWord,
        title,
        warn,
        finishEditing,
        cancelEditing,
        editWord
      }
    }
  }
</script>

<style lang="sass">
  .edit-list
    padding: 20px 0
    position: relative

  .edit-list-form
    display: flex
    flex-flow: column nowrap
    height: 100%
    overflow: scroll
    padding-bottom: 80px
    &::-webkit-scrollbar
      width: 0
      height: 0
    & > label > input
      padding: 5px
      margin-bottom: 10px
      width: 100%

  .label-p
    font-size: 14px
    margin-bottom: 2px

  .edit-list-words-list
    margin-bottom: 20px

  .edit-list-words-item
    display: flex
    min-height: 21px
    align-items: center
    margin-bottom: 5px

  .edit-list-words-item-label
    display: flex
    align-items: center
    flex-basis: 100%

  .edit-list-word-item-original
    width: 150px
    line-height: 16px
    & a
      font-size: 14px

  .edit-list-word-item-lists-list
    display: flex
    color: grey
    flex-flow: row wrap
    line-height: 16px
    padding-left: 5px

  .edit-list-words-item-input
    margin-left: auto

  .submit-cover
    position: absolute
    bottom: 0
    width: 100%
    padding: 20px 0
    background-color: #fff

  .edit-list-submit
    padding: 5px
    width: 100%
    margin-bottom: 3px
</style>
