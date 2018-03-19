
ac-vue-app
==========

Down-to-earth vue component and application development

Install
-------

If npx works as expected, then *uh-yeah*, nothing to do here

Usage
-----

```sh
$ [NODE_ENV=production] npx ac-vue-app [build|watch|dev]
```

#### Create a new app *my-app*

```sh
$ mkdir my-app && cd my-app
$ npm init
$ npx ac-vue-app create
$ npm install
```

The layout will be:

```
src/app.vue
package.json
```

Thats it. ``package.json`` is created by ``npm init``. ``src/app.vue`` is the main entry-point of *my-app* and everything **ac-vue-app** does will be related to this file.

To build and start *my-app*:

```sh
$ npx ac-vue-app build && npm ac-vue-app start
```

#### Build *my-app* for production

```sh
$ npx ac-vue-app build
```

The ``build``-command always sets ``NODE_ENV=production``

#### Run a local dev-server

```sh
$ npx ac-vue-app dev
```

#### Run *my-app* in production-mode

```sh
$ NODE_ENV=production npx ac-vue-app [dev|start|...]
```

#### Enable server-side-rendering

```sh
$ ENABLE_SSR=1 npx ac-vue-app [dev|start|...]
```

### Commands

```
$ npx ac-vue-app [command]

  create   Create a new app in current folder
  update   Update app

  build    Build all files from src
  watch    Build on changes in src
  dev      Start a server and build files in watch-mode
  start    Start a server

```

### One application by multiple servers

```
$ cd ../my-app
$ npm ac-vue-app start
Listening: http://localhost:3000 (main)

$ cd ../my-other-app
$ npm ac-vue-app start
Listening: http://localhost:60269 (leaf)
Registered as a service: ac-vue-example
  http://localhost:3000/my-other-app => http://localhost:60269
```

### Folders and their files

#### ``build/package/*``

##### Files

```
build/package/app.js
build/package/app.js.map
```

##### Reason

```js
Vue.component('my-app', require('my-app'));
```

#### ``build/browser/*``

##### Files

```
build/browser/app.js
build/browser/app.js.map
build/browser/index.html
```

##### Reason

```js
app.use(express.static('build/browser'))
```

#### ``build/server/*``

##### Files

```
build/server/app.js
build/server/app.js.map
```

##### Reason

Server side rendering (SSR)

MIT License
-----------

Copyright (c) 2018 Oliver Leics <oliver.leics@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
