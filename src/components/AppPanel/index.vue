<template>
  <aside class="app-panel flex-center">
    <ul class="flex-center">
      <PanelButton :screen="'learn'" :text="'Учить'" />
      <PanelButton :screen="'lists'" :text="'Списки'" />
      <PanelButton :screen="'menu'" :text="'Меню'" />
    </ul>
  </aside>
</template>

<script>
  import {ref, computed} from 'vue';
  import {useStore} from 'vuex';

  import PanelButton from './PanelButton';

  export default {
    name: 'AppPanel',
    components: {
      PanelButton
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
