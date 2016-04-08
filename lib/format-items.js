import assign from 'object-assign';

const embedTypes = {
  youtube: () => ({
    figureProps: {
      'data-feedback': 'fb:likes,fb:comments',
      'class': 'op-social'
    }
  }),
  image: () => ({
    figureProps: {
      'data-feedback': 'fb:likes,fb:comments'
    }
  }),
  twitter: () => ({
    figureProps: {
      'data-feedback': 'fb:likes,fb:comments',
      'class': 'op-social'
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
