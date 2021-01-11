<template>
  <li class="list-item">
    <p class="list-title">{{list.title}}<a href="#" class="list-edit" @click.prevent="editList">(✎)</a></p>
    <p class="list-length">{{list.wordsIDs.length}} слов(а)</p>
    <input :checked="list.active" class="list-active" type="checkbox" @input="toggleList(list.title)">
  </li>
</template>

<script>
  import {ref, computed} from 'vue';
  import {useStore} from 'vuex';

  import {screens} from '../../db';

  export default {
    name: 'ListsItem',
    components: {

    },
    props: {
      list: Object
    },
    setup(props) {
      let store = useStore();
      let state = store.state;

      const toggleList = listTitle => {
        store.dispatch('toggleList', listTitle);
      }

      const editList = () => {
        store.commit('setEditedList', props.list);
        store.commit('changeScreen', screens.editList);
      }

      return {
        toggleList,
        editList
      }
    }
  }
</script>

<style lang="sass">
  @import '../../assets/vars'

  .list-item
    display: flex
    padding: 5px
    border-bottom: 1px solid
    align-items: center
    .eng-app.light &
      border-bottom-color: $thirdLightColor
    .eng-app.dark &
      border-bottom-color: $thirdDarkColor

  .list-edit
    font-size: 14px
    margin-left: 5px

  .list-length
    margin-left: auto

  .list-active
    margin-left: 20px
</style>
