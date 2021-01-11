export class Word {
  static counter = 0;

  constructor(original, props) {
    this.original = original || '';
    this.transcription = props.transcription || '';
    this.translation = props.translation || '';
    this.samples = props.samples || [];
    this.completed = false;
    this.id = Word.counter++;
  }
}

export let words = [
  {
    original: 'dog',
    props: {
      transcription: 'dɔːɡ',
      translation: 'собака, пес',
      samples: [
        {original: 'Such a big dog!', translation: 'Какая большая собака!'},
        {original: 'What\'s your dog\'s name?', translation: 'Как зовут твою собаку?'},
      ]
    }
  }, {
    original: 'cat',
    props: {
      transcription: 'kæt',
      translation: 'кот, кошка',
      samples: [
        {original: 'Do you like cats?', translation: 'Ты любишь кошек?'}
      ]
    }
  }, {
    original: 'duck',
    props: {
      transcription: 'dʌk',
      translation: 'утка',
      samples: [
        {original: 'This is duck', translation: 'Это утка'}
      ]
    }
  }, {
    original: 'climb',
    props: {
      transcription: 'klaɪm',
      translation: 'карабкаться, взбираться',
      samples: [
        {original: 'We\'ve climbed this fucking mountain!', translation: 'Мы вскарабкались на эту чертову гору!'}
      ]
    }
  }, {
    original: 'write down',
    props: {
      transcription: '\'raɪt \'daʊn',
      translation: 'записывать',
      samples: [
        {original: 'Write down what he says', translation: 'Запиши то, что он скажет'}
      ]
    }
  }
].map(word => new Word(word.original, word.props));

export class List {
  constructor(title, wordsIDs) {
    this.title = title;
    this.wordsIDs = wordsIDs;
    this.active = wordsIDs.length == 0 ? false : true;
  }
}

export let lists = [
  ['animals', [0, 1, 2]],
  ['verbs', [3, 4]]
].map(list => new List(list[0], list[1]));

export const screens = {
  learn: 'learn',
  lists: 'lists',
  menu: 'menu',
  editWord: 'editWord',
  editList: 'editList'
}