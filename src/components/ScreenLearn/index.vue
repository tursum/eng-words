<template>
  <div class="screen learn">
    <template v-if="word">
      <transition :name="`word-true-${direction}`">
        <LearnWord @changeWordsAnimation="changeWordsAnimation" v-if="!isTrueHidden" />
      </transition>
      <transition name="word-fake">
        <LearnWord :fake="true" v-if="isFakeExist" />
      </transition>
    </template>
    <div v-else class="message">
      <p v-if="activeListsLength === 0">Ни один список не выбран</p>
      <p v-else>В выбранных списках нет слов для изучения</p>
    </div>
  </div>
</template>

<script>
  import {ref, computed} from 'vue';
  import {useStore} from 'vuex';

  import LearnWord from './LearnWord';

  export default {
    name: 'ScreenLearn',
    components: {
      LearnWord
    },
    setup(props) {
      let store = useStore();
      let state = store.state;

      let isFakeExist = ref(false);
      let isTrueHidden = ref(false);
      let direction = ref(null);
      let word = computed(() => state.activeWord);
      let activeListsLength = computed(() => state.lists.filter(l => l.active).length);

      const changeWordsAnimation = (which) => {
        direction.value = (which == 'good') ? 'right' : 'left';

        isTrueHidden.value = true;
        setTimeout(() => isFakeExist.value = true, 100);

        setTimeout(() => {
          isTrueHidden.value = false;
          isFakeExist.value = false;
          store.commit('unsetNextActiveWord');
        }, 600);
      }

      return {
        isFakeExist,
        changeWordsAnimation,
        isTrueHidden,
        direction,
        word,
        activeListsLength
      }
    }
  }
</script>

<style lang="sass">
  .learn
    position: relative
    max-height: 600px

  .word-true-left-leave-active, .word-true-right-leave-active 
    transition: all .3s ease
  
  .word-true-left-leave-to
    transform: translateX(-10%)
    opacity: 0

  .word-true-right-leave-to
    transform: translateX(10%)
    opacity: 0

  .word-true-left-enter-from, .word-true-right-enter-from
    opacity: 1

  .word-true-left-leave-to, .word-true-left-leave-to
    opacity: 0

  .word-fake-enter-active 
    transition: all .5s ease
  
  .word-fake-enter-from
    opacity: 0
</style>
