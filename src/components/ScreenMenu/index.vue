<template>
  <div class="screen menu">
    <ul class="menu-actions">
      <li><button class="button menu-button" @click="toggleTheme">Выбрать {{theme == 'light' ? 'темную' : 'светлую'}} тему</button></li>
      <li><button class="button menu-button" @click="clearProgress">Сбросить прогресс по словам</button></li>
    </ul>
  </div>
</template>

<script>
  import {ref, computed} from 'vue';
  import {useStore} from 'vuex';

  export default {
    name: 'ScreenMenu',
    components: {

    },
    setup(props) {
      let store = useStore();
      let state = store.state;

      let theme = computed(() => state.theme);

      const toggleTheme = () => {
        store.commit('toggleTheme', state.theme == 'light' ? 'dark' : 'light');
      }

      const clearProgress = () => {
        store.dispatch('clearProgress');
      }

      return {
        theme,
        toggleTheme,
        clearProgress
      }
    }
  }
</script>

<style lang="sass">
  .menu-actions
    display: flex
    flex-flow: column nowrap

  .menu-button
    width: 100%
    padding: 5px 0
    margin-bottom: 2px
</style>
