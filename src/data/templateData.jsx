const template = {
  uuid: '',
  typeUUID: '',
  title: 'Untitled',
  name: 'Untitled',
  categories: [],
  positionLevel: [],
  pipelineType: '',
  description: 'Edit description',
  source: null,
  isGrid: false,
  primaryLang: 'en',
  secondaryLang: '',
  layout: 'row',         // layout -        ['column', 'row']
  editorRole: 'creator', // editorRole -    ['creator', 'sender', 'recipient']
  sender: {
    name: '',
    avatar: '',
  },
  recipient: {
    name: '',
    avatar: '',
  },
  updatedAt: '',
  createdAt: '',
  sections: {},
  languages: {
    en: {
      name: 'English',
      icon: '',
    },
    ar: {
      name: 'Arabic',
      icon: '',
    },
    de: {
      name: 'Deutsch',
      icon: '',
    },
  },
};

export default template;
