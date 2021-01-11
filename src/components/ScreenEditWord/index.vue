<template>
  <div class="screen edit-word">
    <form action="#" @submit.prevent class="edit-word-form">
      <label for="is-completed" class="is-completed">
        <p class="label-p">Слово выучено?</p>
        <input :disabled="!word" type="checkbox" id="is-completed" v-model="completed">
      </label>
      <label for="new-word-original">
        <p class="label-p">Слово:*</p>
        <input type="text" id="new-word-original" v-model="original" class="edit-word-original">
      </label>
      <label for="new-word-transcription">
        <p class="label-p">Транскрипция:</p>
        <input type="text" id="new-word-transcription" v-model="transcription" class="edit-word-transcription">
      </label>
      <label for="new-word-translation">
        <p class="label-p">Перевод:*</p>
        <input type="text" id="new-word-translation" v-model="translation" class="edit-word-translation">
      </label>
      <div class="new-words-lists">
        <p  class="label-p">Списки:*</p>
        <ul class="new-word-lists-list">
          <li class="new-word-lists-item" v-for="list in lists" :key="list.id">
            <label :for="`new-word-lists-list-${list.title}`">
              {{list.title}}
              <input :id="`new-word-lists-list-${list.title}`" type="checkbox" :checked="isChecked(list.title)" @change="toggleList(list.title)">
            </label>
          </li>
        </ul>
      </div>
      <div class="new-word-samples flex-center">
        <p class="label-p">Примеры:</p>
        <ul class="new-word-samples-list">
          <li v-for="(sample, key) in samples" :key="key" class="new-word-samples-item">
            <input
              type="text"
              placeholder="Текст примера"
              v-model="samples[samples.findIndex(s => s.id === sample.id)].original"
            >
            <input
              type="text"
              placeholder="Перевод примера"
              v-model="samples[samples.findIndex(s => s.id === sample.id)].translation"
            >
            <button class="button new-word-samples-item__remove-button" @click="removeSample(sample.id)">x</button>
          </li>
        </ul>
        <button class="button new-word-samples-button" @click="addSample">+ Пример</button>
      </div>
      <p class="warn" v-if="warn">{{warn}}</p>
      <div class="submit-cover">
        <input type="submit" value="Закончить редактирование" class="button edit-word-submit" @click.prevent="finishEditing">
        <input type="submit" :value="`Отменить ${word ? 'редактирование' : 'создание'} слова`" class="button warn-button edit-word-submit" @click.prevent="cancelEditing">
      </div>
    </form>
  </div>
</template>

<script>
  import {ref, computed} from 'vue';
  import {useStore} from 'vuex';

  import {Word, screens} from '../../db';
  import {getWordLists} from  '../../assets/funcs';

  export default {
    name: 'ScreenEditWord',
    components: {

    },
    props: {
      
    },
    setup(props) {
      let store = useStore();
      let state = store.state;

      let lists = computed(() => state.lists);

      let word = state.editedWord ? state.editedWord : null;

      let original = ref(word ? word.original : null);
      let transcription = ref(word ? word.transcription : null)
      let translation = ref(word ? word.translation : null);
      let newWordLists = ref(word ? getWordLists(word.id, lists.value) : []);
      let samples = ref(word ? word.samples : []);
      let completed = ref(word ? word.completed : false);

      let warn = ref('');
      let counter = 0;

      const isChecked = listName => {
        if (newWordLists.value.length == 0) {
          return false;
        } else {
          if (newWordLists.value.findIndex(l => l == listName) != -1) return true;
        }
      }

      const addSample = () => {
        samples.value.push({original: '', translation: '', id: counter++});
      }

      const removeSample = id => {
        samples.value.splice(samples.value.findIndex(s => s.id === id), 1);
      }

      const toggleList = listName => {
        let position = newWordLists.value.findIndex(l => l === listName);

        if (position == -1) {
          newWordLists.value.push(listName);
        } else {
          newWordLists.value.splice(position, 1);
        }
      }

      const finishEditing = () => {
        if (!original.value || !translation.value || newWordLists.value.length === 0) {
          warn.value = 'Поля "слово", "перевод" и "списки" должны быть заполнены';
          return;
        }

        if (word) {
          word.original = original.value;
          word.transcription = transcription.value;
          word.translation = translation.value;
          word.samples = samples.value;
          word.completed = completed.value;

          store.dispatch('changeWord', word);

          let listsToAdd = state.lists.filter(list => {
            return newWordLists.value.includes(list.title) && !list.wordsIDs.includes(word.id);
          });

          store.dispatch('addWordToLists', {wordID: word.id, lists: listsToAdd});

          let listsToRemove = state.lists.filter(list => {
            return !newWordLists.value.includes(list.title) && list.wordsIDs.includes(word.id);
          });

          store.dispatch('removeWordFromLists', {wordID: word.id, lists: listsToRemove});
          store.commit('changeScreen', state.previousScreen || screens.lists);
          store.commit('unsetPreviousScreen');

          return;
        }

        let newWord = new Word(original.value, {
          transcription: transcription.value,
          translation: translation.value,
          samples: samples.value.filter(sample => sample.original).map(s => {
            return {original: s.original, translation: s.translation}
          }),
          completed: false
        });
        
        store.dispatch('addWord', {lists: newWordLists.value, newWord});
        store.commit('changeScreen', screens.lists);
      }

      const cancelEditing = () => {
        store.commit('changeScreen', state.previousScreen || screens.lists);
        store.commit('unsetPreviousScreen');
        store.commit('unsetEditedWord');
      }

      return {
        lists,
        original,
        transcription,
        translation,
        newWordLists,
        lists,
        samples,
        completed,
        finishEditing,
        warn,
        addSample,
        removeSample,
        toggleList,
        cancelEditing,
        isChecked,
        word
      }
    }
  }
</script>

<style lang="sass">
  @import '../../assets/vars'

  .edit-word
    padding: 20px 0
    position: relative

  .edit-word-form
    display: flex
    flex-flow: column nowrap
    height: 100%
    overflow: scroll
    padding-bottom: 80px
    &::-webkit-scrollbar
      width: 0
      height: 0
    & > label.is-completed
      display: flex
      align-items: center
      margin-bottom: 15px
      & > input
        width: auto
        margin-left: 10px
        margin-bottom: 0
      & > p
        margin-bottom: 0
    & > label > input
      padding: 5px
      margin-bottom: 10px
      width: 100%

  .edit-word-label-is-completed
    position: absolute
    align-items: flex-end
    display: flex
    flex-flow: column nowrap
    right: 15px
    top: 25px
    font-size: 14px

  .label-p
    font-size: 14px
    margin-bottom: 2px

  .new-word-lists-item > label
    display: flex
    justify-content: space-between
    padding: 0 100px

  .new-word-samples
    flex-flow: column nowrap
    padding: 15px 0
    & .label-p
      align-self: flex-start
      margin-bottom: 3px
    & .button
      padding: 5px

  .new-word-samples-list
    width: 100%

  .new-word-samples-item
    display: flex
    flex-flow: column nowrap
    margin-bottom: 10px
    position: relative
    padding-right: 30px
    & > input
      margin-bottom: 2px
      padding: 2px

  .new-word-samples-item__remove-button
    position: absolute
    top: 50%
    transform: translateY(-50%)
    right: 5px
    width: 20px
    height: 20px

  .submit-cover
    position: absolute
    bottom: 0
    width: 100%
    padding: 20px 0
    .eng-app.light &
      background-color: $firstLightColor
    .eng-app.dark &
      background-color: $firstDarkColor

  .edit-word-submit
    padding: 5px
    width: 100%
    margin-bottom: 3px
</style>
