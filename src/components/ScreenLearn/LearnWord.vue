<template>
  <div class="learn-word" :class="{fake: fake}">
    <div class="learn-word__content">
      <p class="learn-word__original">{{word.original}}<a href="#" @click.prevent="editWord">(✎)</a></p>
      <p class="learn-word__transcription" v-if="word.transcription">[{{word.transcription}}]</p>
      <div class="learn-word__hidden" v-if="isWordOpened">
        <p class="learn-word__translation">{{word.translation}}</p>
        <ul class="learn-word__samples" v-if="word.samples">
          <LearnWordSample v-for="(sample, id) in word.samples" :key="id" :sample="sample" />
        </ul>
      </div>
      <button class="button learn-word__open-button" v-else @click="openWord">Открыть слово</button>
    </div>
    <div class="learn-word__buttons" :class="{'with-border': isWordOpened}">
      <button class="button learn-word__button" @click="changeWord('bad')">Повторять еще</button>
      <button class="button learn-word__button" @click="changeWord('good')">Знаю слово.<br>Не показывать</button>
    </div>
  </div>
</template>

<script>
  import {ref, computed} from 'vue';
  import {useStore} from 'vuex';
  import {screens} from '../../db';

  import LearnWordSample from './LearnWordSample';

  export default {
    name: 'LearnWord',
    components: {
      LearnWordSample
    },
    props: {
      fake: Boolean
    },
    setup(props, {emit}) {
      let store = useStore();
      let state = store.state;

      let word = props.fake
        ? ref(state.nextActiveWord)
        : computed(() => state.activeWord);

      let isWordOpened = ref(false);

      const openWord = () => {
        isWordOpened.value = true;
      }

      const changeWord = which => {
        if (props.fake) return;

        if (which == 'good') {
          state.activeWord.completed = true;
          store.dispatch('changeWord', state.activeWord);
        }

        store.commit('setNextActiveWord');
        isWordOpened.value = false;
        store.commit('changeActiveWord', which);

        emit('changeWordsAnimation', which);
      }

      const editWord = () => {
        store.commit('setEditedWord', word.value);
        store.commit('setPreviousScreen');
        store.commit('changeScreen', screens.editWord);
      }

      return {
        word,
        isWordOpened,
        openWord,
        changeWord,
        editWord
      }
    }
  }
</script>

<style lang="sass">
  @import '../../assets/vars'

  .learn-word
    margin: 0 5px
    border: 1px solid
    padding: 10px
    display: flex
    flex-flow: column nowrap
    justify-content: space-between
    position: absolute
    left: 0
    right: 0
    top: 20px
    bottom: 20px
    z-index: 2
    .eng-app.light &
      border-color: $thirdLightColor
      box-shadow: 0 0 3px rgba(0,0,0,0.3)
    .eng-app.dark &
      border-color: $thirdDarkColor
      box-shadow: 0 0 3px rgba(255,255,255,0.3)
    &.fake
      z-index: 1

  .learn-word__content
    display: flex
    flex-flow: column nowrap
    overflow: scroll
    flex-basis: 100%
    position: relative
    &::-webkit-scrollbar
      width: 0
      height: 0

  .learn-word__original
    font-size: 24px
    text-align: center
    position: relative
    & > a
      font-size: 14px
      position: absolute
      margin-left: 5px

  .learn-word__transcription
    font-style: italic
    text-align: center

  .learn-word__translation
    text-align: center
    margin: 15px 0

  .learn-word__sample
    margin-bottom: 7px

  .learn-word__sample-original
    font-weight: bold

  .learn-word__open-button
    height: 50px
    width: 100%
    position: absolute
    bottom: 0

  .learn-word__buttons
    display: flex
    padding-top: 10px
    &.with-border
      border-top: 1px solid
      .eng-app.light &
        border-top-color: $thirdLightColor
      .eng-app.dark &
        border-top-color: $thirdDarkColor

  .learn-word__button
    flex-basis: 50%
    height: 50px
</style>
