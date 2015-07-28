# Front-end Jumpstart

* [X] Gulp
* [X] HTML Boilerplate
* [X] Sprites
* [X] Browserify
* [X] Stylus
* [X] Nib
* [X] Jeet
* [X] Rupture
* [X] Extra Mixins
* [ ] Utilities Classes
* [X] FontAwesome
* [X] JSHint
* [X] JSCS
* [X] Editorconfig

## Usage

Clone the repository

```git clone https://github.com/gsantiago/jumpstart.git```

Install all dependencies

```npm install```

If you don't have Gulp globally installed, then install it:

```npm install -g gulp```

Now, it's just use the available gulp commands:

```gulp watch```

```gulp lint```

```gulp sprite```

```gulp css```

```gulp js```

## Structure

```
package.json
.editorconfig
.jshintrc
.jscsrc

dist/
__index.html
__assets/
___img/
___fonts/
___css/
___js/

src/
__stylus/
__sprites/
__js/
```

## Code Style

It follows the [Node Style Guide](https://github.com/felixge/node-style-guide)
with only two differences:

1. Spaces before functions opening round braces are **REQUIRED**

  ```javascript
  // WRONG
  var myFunction() { ... };

  // RIGHT
  var myFunction () { ... };
  ```

2. Commas after the last item in a literal object are **PROHIBITED**.

  ```javascript
  // WRONG
  var obj = {
    a: 1,
    b: 2,
    c: 3,
  };

  // RIGHT
  var obj = {
    a: 1,
    b: 2,
    c: 3
  };
  ```
