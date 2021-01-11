<template>
  <li>
    <button
      class="button panel-button"
      @click="changeScreen(screen)"
      :class="{active: currentScreen == screen ? true : false}"
    >{{text}}</button>
  </li>
</template>

<script>
  import {ref, computed} from 'vue';
  import {useStore} from 'vuex';

  export default {
    name: 'PanelButton',
    components: {

    },
    props: {
      screen: String,
      text: String
    },
    setup(props) {
      let store = useStore();
      let state = store.state;

      let currentScreen = computed(() => state.screen);

      const changeScreen = screen => {
        store.commit('changeScreen', screen);
      }

      return {
        screen: props.screen,
        text: props.text,
        currentScreen,
        changeScreen
      }
    }
  }
</script>

<style lang="sass">
  .panel-button
    width: 60px
    height: 60px
    margin: 5px 5px 50px
    box-shadow: 0 0 2px rgba(0,0,0,0.5)
</style>
