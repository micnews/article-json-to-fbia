# article-json-to-fbia
Render [article json](https://github.com/micnews/html-to-article-json#format) in [Facebook Instant Article Format](https://developers.facebook.com/docs/instant-articles/reference)

[![Build Status](https://travis-ci.org/micnews/article-json-to-fbia.svg?branch=master)](https://travis-ci.org/micnews/article-json-to-fbia)

## Usage

```
npm install article-json-to-fbia
```

```js
const convertToFbia = require('article-json-to-fbia');
const articleJson = [
  {
    type: 'paragraph',
    children: [
      {
        type: 'text',
        content: 'This is the text and '
      },
      {
        type: 'text',
        bold: true,
        content: 'some bold text '
      },
      {
        type: 'text',
        href: 'http://example.com',
        content: 'some link'
      }
    ]
  },
  {
    type: 'embed',
    embedType: 'image',
    src: 'http://example/image.jpg',
    width: 300,
    height: 150
  }
]
;

console.log(convertToFbia(articleJson));
```

### Body format

https://github.com/micnews/html-to-article-json#format

## License

MIT
