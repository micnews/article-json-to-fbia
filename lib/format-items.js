import assign from 'object-assign';

const embeds = {
  youtube: () => ({
    figureProps: {
      'data-feedback': 'fb:likes,fb:comments'
    }
  }),
  image: () => ({
    figureProps: {
      'data-type': 'image',
      'data-feedback': 'fb:likes,fb:comments'
    }
  })
};

export default items => items.map(
  item => item &&
    item.type === 'embed' &&
    embeds[item.embedType]
  ? assign(embeds[item.embedType](), item)
  : item
);
