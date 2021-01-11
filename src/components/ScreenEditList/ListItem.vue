<template>
  <li class="edit-list-word-item-lists-item">{{`${list}${id + 1 == wordLists.length ? '' : ',\&nbsp'}`}}</li>
</template>

<script>
  import {ref, computed} from 'vue';
  import {useStore} from 'vuex';

  export default {
    name: 'ListItem',
    components: {

    },
    props: {
      wordLists: Array,
      list: String,
      id: Number
    },
    setup(props) {
      let store = useStore();
      let state = store.state;

      return {

      }
    }
  }
</script>

<style lang="sass">
  
</style>
