import test from 'ava';
import tsml from 'tsml';
import 'babel-core/register';
import toFbia from './lib';
import formatItems from './lib/format-items';

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

  t.is(toFbia(data), tsml
    `<article>
      <p>
        <a href="http://mic.com">link</a>
        <br/>
        normal text<b>bold text</b><i>italic text</i>
      </p>
      <p>other text</p>
      <h3>header text</h3>
    </article>`
  );
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

  t.is(toFbia(data), tsml
    `<article>
      <h1>header1</h1>
      <h2>header2</h2>
      <h3>header3</h3>
      <h4>header4</h4>
      <h5>header5</h5>
      <h6>header6</h6>
    </article>`
  );
});

test('embeds', t => {
  const data = [{
    type: 'paragraph',
    children: [
      { type: 'text', content: 'normal text' }
    ]
  }, {
    type: 'embed',
    embedType: 'youtube',
    youtubeId: 'abc'
  }, {
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200
  }];

  t.is(toFbia(data), tsml
    `<article>
      <p>normal text</p>
      <figure data-feedback="fb:likes,fb:comments">
        <iframe allowfullscreen="true" frameborder="0" height="480" scrolling="no" src="https://www.youtube.com/embed/abc" width="640"></iframe>
      </figure>
      <figure data-type="image" data-feedback="fb:likes,fb:comments">
        <img src="http://example.com/image.jpg"></img>
      </figure>
    </article>`
  );
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

  t.is(toFbia(data), tsml
    `<article>
      <figure>
        <img src="http://example.com/image.jpg"></img>
        <figcaption>Source: <a href="http://example.com/author">Author</a></figcaption>
      </figure>
    </article>`
  );
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

  t.is(toFbia(data), tsml
    `<article>
      <blockquote>
        <p>abc</p>
        <p><b>def</b></p>
      </blockquote>
    </article>`
  );
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

  t.is(toFbia(data), tsml
    `<article>
      <figure>
        <amp-iframe width="600" height="200" layout="responsive" frameborder="0" src="https://example.com/frame"></amp-iframe>
      </figure>
    </article>`
  );
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

  t.is(toFbia(data), `<article><figure></figure></article>`);
});

test('formatItems', t => {
  const items = [{
    type: 'embed',
    embedType: 'youtube'
  }];
  const expected = [{
    type: 'embed',
    embedType: 'youtube',
    figureProps: {
      'data-feedback': 'fb:likes,fb:comments'
    }
  }];
  const actual = formatItems(items);
  t.same(actual, expected);
});
