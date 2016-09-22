import test from 'ava';
import tsml from 'tsml';
import 'babel-core/register';
import toFbia from './lib';

test('blocks', t => {
  const data = [{
    type: 'paragraph',
    children: [
      { type: 'text', href: 'http://mic.com', content: 'link' },
      { type: 'linebreak' },
      { type: 'text', content: 'normal text' },
      { type: 'text', bold: true, content: 'bold text' },
      { type: 'text', italic: true, content: 'italic text' }
    ]
  }, {
    type: 'paragraph',
    children: [
      { type: 'text', content: 'other text' }
    ]
  }, {
    type: 'header3',
    children: [
      { type: 'text', content: 'header text' }
    ]
  }];

  const actual = toFbia(data);
  const expected = tsml`<article>
      <p>
        <a href="http://mic.com">link</a>
        <br/>
        normal text<b>bold text</b><i>italic text</i>
      </p>
      <p>other text</p>
      <h3>header text</h3>
    </article>`;

  t.is(actual, expected);
});

test('headers', t => {
  const data = [{
    type: 'header1',
    children: [{ type: 'text', content: 'header1' }]
  }, {
    type: 'header2',
    children: [{ type: 'text', content: 'header2' }]
  }, {
    type: 'header3',
    children: [{ type: 'text', content: 'header3' }]
  }, {
    type: 'header4',
    children: [{ type: 'text', content: 'header4' }]
  }, {
    type: 'header5',
    children: [{ type: 'text', content: 'header5' }]
  }, {
    type: 'header6',
    children: [{ type: 'text', content: 'header6' }]
  }];

  const actual = toFbia(data);
  const expected = tsml`<article>
      <h1>header1</h1>
      <h2>header2</h2>
      <h3>header3</h3>
      <h4>header4</h4>
      <h5>header5</h5>
      <h6>header6</h6>
    </article>`;

  t.is(actual, expected);
});

test('image', t => {
  const data = [{
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200
  }];

  const actual = toFbia(data);
  const expected = tsml`<article>
      <figure data-feedback="fb:likes,fb:comments">
        <img src="http://example.com/image.jpg"></img>
      </figure>
    </article>`;

  t.is(actual, expected);
});

test('image with caption', t => {
  const data = [{
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200,
    caption: [{
      type: 'text',
      content: 'Source: ',
      href: null,
      italic: false,
      bold: false
    }, {
      type: 'text',
      content: 'Author',
      href: 'http://example.com/author',
      italic: false,
      bold: false
    }]
  }];

  const actual = toFbia(data);
  const expected = tsml`<article>
      <figure data-feedback="fb:likes,fb:comments">
        <img src="http://example.com/image.jpg"></img>
        <figcaption><cite>Source: <a href="http://example.com/author">Author</a></cite></figcaption>
      </figure>
    </article>`;

  t.is(actual, expected);
});

test('youtube', t => {
  const data = [{
    type: 'embed',
    embedType: 'youtube',
    youtubeId: 'abc'
  }];

  const actual = toFbia(data);
  const expected = tsml`<article>
      <figure data-feedback="fb:likes,fb:comments" class="op-interactive">
        <iframe src="https://www.youtube.com/embed/abc" width="640" height="360" frameborder="0" allowfullscreen="true"></iframe>
      </figure>
    </article>`;

  t.is(actual, expected);
});

test('twitter', t => {
  const input = [{
    type: 'embed',
    embedType: 'twitter',
    embedAs: 'tweet',
    text: [
      {content: 'GIF vs. JIF… This ', href: null},
      {content: 'pic.twitter.com/qFAHWgdbL6', href: 'https://t.co/qFAHWgdbL6'}
    ],
    url: 'https://twitter.com/MattNavarra/status/684690494841028608',
    date: 'January 6, 2016',
    user: {
      slug: 'MattNavarra',
      name: 'Matt (foo) Navarra'
    },
    id: '684690494841028608'
  }];
  const actual = toFbia(input);
  const expected = tsml`
    <article>
      <figure class="op-interactive">
        <iframe>
          <blockquote class="twitter-tweet" data-lang="en">
            <p lang="en" dir="ltr">GIF vs. JIF… This <a href="https://t.co/qFAHWgdbL6">pic.twitter.com/qFAHWgdbL6</a></p>&mdash; Matt (foo) Navarra (@MattNavarra) <a href="https://twitter.com/MattNavarra/status/684690494841028608">January 6, 2016</a>
          </blockquote>
          <script async="true" src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
        </iframe>
      </figure>
    </article>`;
  t.is(actual, expected);
});

test('vine', t => {
  const input = [{
    type: 'embed',
    embedType: 'vine',
    url: 'https://vine.co/v/bjHh0zHdgZT/embed/simple'
  }];
  const actual = toFbia(input);
  const expected = tsml`
    <article>
      <figure data-feedback="fb:likes,fb:comments" class="op-interactive">
        <iframe src="https://vine.co/v/bjHh0zHdgZT/embed/simple" width="480" height="480" frameborder="0"></iframe>
      </figure>
    </article>
  `;
  t.is(actual, expected);
});

test('spotify small', t => {
  const input = [{
    type: 'embed',
    embedType: 'spotify',
    url: 'https://embed.spotify.com/?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf',
    spotifyUri: 'spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf',
    width: 400,
    height: 80
  }];
  const actual = toFbia(input);
  const expected = tsml`
    <article>
      <figure class="op-interactive">
        <iframe src="https://embed.spotify.com/?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf" width="300" height="80" frameborder="0"></iframe>
      </figure>
    </article>
  `;
  t.is(actual, expected);
});

test('spotify large', t => {
  const input = [{
    type: 'embed',
    embedType: 'spotify',
    url: 'https://embed.spotify.com/?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf',
    spotifyUri: 'spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf',
    width: 400,
    height: 300
  }];
  const actual = toFbia(input);
  const expected = tsml`
    <article>
      <figure class="op-interactive">
        <iframe src="https://embed.spotify.com/?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf" width="300" height="380" frameborder="0"></iframe>
      </figure>
    </article>
  `;
  t.is(actual, expected);
});

test('instagram', t => {
  const input = [{
    type: 'embed',
    embedType: 'instagram',
    url: 'https://www.instagram.com/p/-7PIhyA6J3/'
  }];
  const actual = toFbia(input);
  const expected = tsml`
    <article>
      <figure data-feedback="fb:likes,fb:comments" class="op-interactive">
        <iframe src="https://www.instagram.com/p/-7PIhyA6J3/embed"></iframe>
      </figure>
    </article>
  `;
  t.is(actual.slice(0, 100), expected.slice(0, 100));
});

test('instagram, small diff in url', t => {
  const input = [{
    type: 'embed',
    embedType: 'instagram',
    url: 'https://www.instagram.com/p/-7PIhyA6J3'
  }];
  const actual = toFbia(input);
  const expected = tsml`
    <article>
      <figure data-feedback="fb:likes,fb:comments" class="op-interactive">
        <iframe src="https://www.instagram.com/p/-7PIhyA6J3/embed"></iframe>
      </figure>
    </article>
  `;
  t.is(actual, expected);
});

test('blockquote', t => {
  const data = [{
    type: 'blockquote',
    children: [{
      type: 'paragraph',
      children: [{
        type: 'text',
        content: 'abc'
      }]
    }, {
      type: 'paragraph',
      children: [{
        type: 'text',
        content: 'def',
        bold: true
      }]
    }]
  }];

  const actual = toFbia(data);
  const expected = tsml
    `<article>
      <blockquote>
        <p>abc</p>
        <p><b>def</b></p>
      </blockquote>
    </article>`;

  t.is(actual, expected);
});

test('tumblr embed', t => {
  const data = [{
    caption: [],
    type: 'embed',
    embedType: 'tumblr',
    did: '7c08ba46cb75162284770cdee2a59365891a5e18',
    url: 'https://embed.tumblr.com/embed/post/8_SX4ALNOf1fYyEcjq78YQ/147291233392',
    text: [{
      content: 'http://jencita.tumblr.com/post/147291233392/tswiftdaily-taylor-swift-at-lady-cilento',
      href: 'http://jencita.tumblr.com/post/147291233392/tswiftdaily-taylor-swift-at-lady-cilento'
    }]
  }];

  const actual = toFbia(data);
  const expected = tsml`
    <article>
      <figure class="op-interactive">
        <iframe>
          <div class="tumblr-post" data-href="https://embed.tumblr.com/embed/post/8_SX4ALNOf1fYyEcjq78YQ/147291233392" data-did="7c08ba46cb75162284770cdee2a59365891a5e18">
            <a href="http://jencita.tumblr.com/post/147291233392/tswiftdaily-taylor-swift-at-lady-cilento">
              http://jencita.tumblr.com/post/147291233392/tswiftdaily-taylor-swift-at-lady-cilento
            </a>
          </div>
          <script async="true" src="https://secure.assets.tumblr.com/post.js"></script>
        </iframe>
      </figure>
    </article>
  `;

  t.is(actual, expected);
});

test('custom secure iframe', t => {
  const data = [{
    type: 'embed',
    embedType: 'custom',
    src: 'https://example.com/frame',
    width: 600,
    height: 200,
    secure: true,
    caption: []
  }];

  const actual = toFbia(data);
  const expected = tsml
    `<article>
      <figure>
        <iframe src="https://example.com/frame" width="600" height="200" frameborder="0"></iframe>
      </figure>
    </article>`;

  t.is(actual, expected);
});

test('custom non-secure iframe', t => {
  const data = [{
    type: 'embed',
    embedType: 'custom',
    src: 'http://example.com/frame',
    width: 600,
    height: 200,
    secure: false,
    caption: []
  }];

  const actual = toFbia(data);
  const expected = `<article><figure></figure></article>`;

  t.is(actual, expected);
});
