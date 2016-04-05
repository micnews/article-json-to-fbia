import { string, element } from 'deku';
import setupArticle from 'article-json-html-render';
import formatItems from './format-items';

const embeds = {
  youtube: function ({youtubeId}) {
    return <iframe
      allowfullscreen
      frameborder='0'
      height='480'
      scrolling='no'
      src={`https://www.youtube.com/embed/${youtubeId}`}
      width='640'>
    </iframe>;
  },
  image: function ({src}) {
    return <img src={src} />;
  }
};

const Article = setupArticle({ embeds });

module.exports = items => string.render(<Article items={formatItems(items || [])} />)
  .replace(/<br><\/br>/g, '<br/>'); // fix double br bug
