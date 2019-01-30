[![Build Status](https://travis-ci.org/vybu/externalize-lodash.svg?branch=master)](https://travis-ci.org/vybu/externalize-lodash)
[![npm version](https://badge.fury.io/js/webpack-externalize-lodash.svg)](https://badge.fury.io/js/webpack-externalize-lodash)

This module exports a simple utility function that externalizes lodash from your bundle.

`npm install webpack-externalize-lodash`
__________________________________

## Why this is needed

There are many ways to use lodash:

```
import { get } from 'lodash'
import { get } from 'lodash-es'
import get from 'lodash/get'
import get from 'lodash-es/get'
import get from 'lodash.get'
```

As your project grows and depends on different libraries, some of them will use different lodash helpers, imported in a different way. As a result **your bundle will sometimes include lodash multiple times**, even if you have it defined it as external in webpack `lodash: "_"` (this covers only one case).

 So the only way to prevent it from being included into your bundle is use [externals function](https://webpack.js.org/configuration/externals/#function) which handles all cases. That's exactly what this package does.

## Usage

Inside your webpack config

```js
externals: [
  {...} // your config,
  require('webpack-externalize-lodash')
]
```

and load it inside your html file

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```
