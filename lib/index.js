import { string, element } from 'deku';
import setupArticle from 'article-json-html-render';
import formatItems from './format-items';
import {render} from 'embeds';

const embeds = {
  youtube: ({youtubeId}) => render({type: 'youtube', youtubeId}),
  image: ({src}) => render({type: 'image', src}),
  custom: ({src, width, height, secure}) => secure && render({type: 'custom', src, width, height}) || ''
};

const Article = setupArticle({ embeds });

module.exports = items => string.render(<Article items={formatItems(items || [])} />)
  .replace(/<br><\/br>/g, '<br/>'); // fix double br bug
