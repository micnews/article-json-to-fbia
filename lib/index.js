import { string, element } from 'deku';
import setupArticle from 'article-json-html-render';
import formatItems from './format-items';
import {render} from 'embeds';

const embeds = {
  youtube: ({youtubeId}) => render({type: 'youtube', youtubeId}),
  image: ({src}) => render({type: 'image', src}),
  twitter: ({text, url, date, user, id}) => (<iframe>
    {render({
      type: 'twitter',
      text, url, date, user, id
    })}
    <script async="true" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
  </iframe>),
  vine: ({url}) => render({type: 'vine', url}),
  // custom needs to be last
  custom: ({src, width, height, secure}) => secure && render({type: 'custom', src, width, height}) || ''
};

const Article = setupArticle({ embeds });

module.exports = items => string.render(<Article items={formatItems(items || [])} />)
  .replace(/<br><\/br>/g, '<br/>'); // fix double br bug
