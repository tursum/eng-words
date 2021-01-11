<template>
  <li class="learn-word__sample">
    <p class="learn-word__sample-original" @click="toggleSample">{{sample.original}}</p>
    <p class="learn-word__sample-translation" v-if="isSampleOpened">{{sample.translation}}</p>
  </li>
</template>

<script>
  import {ref, computed} from 'vue';
  import {useStore} from 'vuex';

  export default {
    name: 'LearnWordSample',
    components: {

    },
    props: {
      sample: Object
    },
    setup(props) {
      let store = useStore();
      let state = store.state;

      let isSampleOpened = ref (false);

      const toggleSample = () => {
        isSampleOpened.value = !isSampleOpened.value;
      }

      return {
        isSampleOpened,
        toggleSample
      }
    }
  }
</script>

<style lang="sass">
  .learn-word__sample-original
    cursor: pointer
</style>
