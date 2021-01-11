<template>
  <div class="screen lists">
    <div class="add-buttons">
      <button class="button" @click="addWord">+ Слово</button>
      <button class="button" @click="addList">+ Список</button>
    </div>
    <ul class="lists-items">
      <ListsItem v-for="list in lists" :list="list" />
    </ul>
  </div>
</template>

<script>
  import {ref, computed} from 'vue';
  import {useStore} from 'vuex';

  import {screens} from '../../db';

  import ListsItem from './ListsItem';

  export default {
    name: 'ScreenLists',
    components: {
      ListsItem
    },
    setup(props) {
      let store = useStore();
      let state = store.state;

      let lists = computed(() => state.lists);

      const addWord = () => {
        store.commit('changeScreen', screens.editWord);
      }

      const addList = () => {
        store.commit('changeScreen', screens.editList);
      }

      return {
        lists,
        addWord,
        addList
      }
    }
  }
</script>

<style lang="sass">
  .lists-items
    height: 100%
    overflow: scroll
    &::-webkit-scrollbar
      width: 0
      height: 0

  .add-buttons
    margin-bottom: 15px
    .button
      width: 100%
      margin-bottom: 1px
      padding: 5px 0
</style>
