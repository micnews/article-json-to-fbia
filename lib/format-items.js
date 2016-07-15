import assign from 'object-assign';

const embedTypes = {
  youtube: () => ({
    figureProps: {
      'data-feedback': 'fb:likes,fb:comments',
      'class': 'op-interactive'
    }
  }),
  vine: () => ({
    figureProps: {
      'data-feedback': 'fb:likes,fb:comments',
      'class': 'op-interactive'
    }
  }),
  spotify: () => ({
    figureProps: {
      'class': 'op-interactive'
    }
  }),
  instagram: () => ({
    figureProps: {
      'data-feedback': 'fb:likes,fb:comments',
      'class': 'op-interactive'
    }
  }),
  image: () => ({
    figureProps: {
      'data-feedback': 'fb:likes,fb:comments'
    }
  }),
  twitter: () => ({
    figureProps: {
      'class': 'op-interactive'
    }
  })
};

export default items => items.map(
  item => item &&
    item.type === 'embed' &&
    embedTypes[item.embedType]
  ? assign(embedTypes[item.embedType](), item)
  : item
);
