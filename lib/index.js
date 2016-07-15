/* eslint-disable deku/no-unknown-property */

import {renderString, tree} from 'deku';
import element from 'magic-virtual-element';
import setupArticle from 'article-json-html-render';
import formatItems from './format-items';
import {render} from 'embeds';
import join from 'url-join';

function renderSpotify ({url, height}) {
  const w = 300;
  // Small and large sizes are supported only
  const h = height <= 80 ? 80 : 380;
  return <iframe src={url} width={w} height={h} frameborder='0'/>;
}

const embeds = {
  youtube: ({youtubeId}) => render({type: 'youtube', youtubeId}),
  image: ({src}) => render({type: 'image', src}),
  twitter: ({embedAs, text, url, date, user, id}) => (<iframe>
    {render({
      type: 'twitter',
      embedAs, text, url, date, user, id
    })}
    <script async='true' src='//platform.twitter.com/widgets.js' charset='utf-8'></script>
  </iframe>),
  vine: ({url}) => render({type: 'vine', url, size: 480}),

  // the embeds module adds the instagram embed code, for FBIA the iframe is enough
  instagram: ({url}) => <iframe src={join(url, 'embed')} />,

  spotify: renderSpotify,

  tumblr: ({did, url, text}) => (
    <iframe>
      {render({type: 'tumblr', did, url, text})}
      <script async src='https://secure.assets.tumblr.com/post.js'></script>
    </iframe>
  ),

  // custom needs to be last
  custom: ({src, width, height, secure}) => secure && render({type: 'custom', src, width, height}) || ''
};

const customCaption = text => <figcaption><cite>{text}</cite></figcaption>;

const Article = setupArticle({ embeds, customCaption });

module.exports = items => renderString(tree(<Article items={formatItems(items || [])} />))
  .replace(/<br><\/br>/g, '<br/>'); // fix double br bug
