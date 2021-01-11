<template>
  <div class="eng-app" :class="theme">
    <div class="app-screen flex-center">
      <ScreenLearn v-if="screen === 'learn'" />
      <ScreenLists v-else-if="screen === 'lists'" />
      <ScreenMenu v-else-if="screen === 'menu'" />
      <ScreenEditWord :create="false" v-else-if="screen === 'editWord'" />
      <ScreenEditList v-else-if="screen === 'editList'" />
      <p v-else class="load-message">Загрузка...</p>
    </div>
    <AppPanel />
  </div>
</template>

<script>
  import AppPanel from './components/AppPanel';
  import ScreenLearn from './components/ScreenLearn';
  import ScreenLists from './components/ScreenLists';
  import ScreenMenu from './components/ScreenMenu';
  import ScreenEditWord from './components/ScreenEditWord';
  import ScreenEditList from './components/ScreenEditList';

  import {computed} from 'vue';
  import {useStore} from 'vuex';

  export default {
    name: 'App',
    components: {
      AppPanel,
      ScreenLearn,
      ScreenLists,
      ScreenMenu,
      ScreenEditWord,
      ScreenEditList
    },
    setup() {
      let store = useStore();
      let state = store.state;

      let screen = computed(() => state.screen);
      let theme = computed(() => state.theme);

      return {
        screen,
        theme
      }
    }
  }
</script>

<style lang="sass">
  @import './assets/vars'

  *
    margin: 0
    padding: 0
    list-style-type: none
    text-decoration: none
    box-sizing: border-box
    font-family: sans-serif
    outline: none

  body
    overflow: hidden

  a
    color: lightseagreen

  .flex-center
    display: flex
    align-items: center
    justify-content: center

  .button
    cursor: pointer
    display: flex
    justify-content: center
    align-items: center
    transition: .2s
    outline: none
    border: 1px solid
    .eng-app.light &
      background-color: $secondLightColor
      color: $lightTextColor
      border-color: $thirdLightColor
      &.active
        background-color: $thirdLightColor
      &.warn-button
        color: #f00
      &:hover
        background-color: $thirdLightColor
    .eng-app.dark &
      background-color: $secondDarkColor
      color: $darkTextColor
      border-color: $thirdDarkColor
      &.active
        background-color: $thirdDarkColor
      &.warn-button
        color: #fa8072
      &:hover
        background-color: $thirdDarkColor

  .eng-app
    display: flex
    flex-flow: column nowrap
    align-items: center
    width: 100vw
    height: 100vh
    &.light
      background-color: $firstLightColor
      color: $lightTextColor
    &.dark
      background-color: $firstDarkColor
      color: $darkTextColor

  input[type="text"]
    border: 1px solid
    .eng-app.light &
      background-color: $firstLightColor
      color: $lightTextColor
      border-color: $thirdLightColor
    .eng-app.dark &
      background-color: $firstDarkColor
      color: $darkTextColor
      border-color: $thirdDarkColor

  .app-screen
    overflow: scroll
    flex-basis: 600px
    width: 360px
    padding: 20px 0
    &::-webkit-scrollbar
      width: 0
      height: 0
    @media (max-width: 380px)
      width: 100%
      padding: 20px 10px

  .screen
    height: 100%
    width: 100%
    display: flex
    flex-flow: column nowrap
    justify-content: center

  .message
    text-align: center
</style>
