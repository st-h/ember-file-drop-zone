ember-file-drop-zone
==============================================================================
[![Greenkeeper badge](https://badges.greenkeeper.io/st-h/ember-file-drop-zone.svg)](https://greenkeeper.io/)
[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![Coverage Status](https://coveralls.io/repos/github/st-h/ember-file-drop-zone/badge.svg?branch=master)](https://coveralls.io/github/st-h/ember-file-drop-zone?branch=master)
[![Code Climate][codeclimate-badge]][codeclimate-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]

easily add a dropzone to enable file drag and drop to your ember app


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-file-drop-zone
```

Demo
------------------------------------------------------------------------------

check out the [demo page](https://st-h.github.io/ember-file-drop-zone/)


Usage
------------------------------------------------------------------------------

Ember file drop-zone provides both a mixin to add to existing components and a simple component that can be used in block form.

See the source code of the [demo app](tests/dummy/app/) for more complex examples

### Component
```
{{#file-drop-zone onDrop=(action "addFiles")}}
  just drop your files here...
{{/file-drop-zone}}
```

### Mixin
```
import Component from '@ember/component';
import DropZone from 'ember-file-drop-zone/mixins/file-drop-zone';

export default Component.extend(DropZone, {

});
```

### Parameters
|Paramter|type|default|description
|-|-|-|-|
|**disabled**| boolean | false | when set to true, the dropzone is disabled and files can no longer be dropped|

### Events

#### onDrop(files)
called when files have been dropped

**files** an EmberArray of js file objects that were dropped

#### onDragEnter()
called when files are being dragged over the dropzone

#### onDragLeave()
called when files are no longer dragged over the dropzone

Styling
------------------------------------------------------------------------------
This addon does not provide any predefined styles. However, it applies appropriate css class names so that look can be modified as needed.

|class|description|
|-|-|
|ember-file-drop-zone|Used to style the default state of the dropzone|
|disabled|Applied when the dropzone is disabled|
|dragging|Applied when one or more files are current being dragged over the dropzone|

Please see [app.css](tests/dummy/app/styles/app.css) for a styling example:

```
.ember-file-drop-zone {
  // initial styles
}

.ember-file-drop-zone.disabled {
  // styles when disabled
}

.ember-file-drop-zone.dragging:not(.disabled) {
  // styles when files are being dragged over the window, but not over the dropzone and dropzone is not disabled
}

.ember-file-drop-zone.hovering {
  // styles when files are being dragged over the dropzone (independent of the disabled state)
}
```


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

[npm-badge]: https://img.shields.io/npm/v/ember-file-drop-zone.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-file-drop-zone
[travis-badge]: https://img.shields.io/travis/st-h/ember-file-drop-zone/master.svg?label=TravisCI
[travis-badge-url]: https://travis-ci.org/st-h/ember-file-drop-zone
[codeclimate-badge]: https://api.codeclimate.com/v1/badges/7bb1e87f845bf2cf5cb8/maintainability
[codeclimate-badge-url]: https://codeclimate.com/github/st-h/ember-file-drop-zone/maintainability
[ember-observer-badge]: http://emberobserver.com/badges/ember-file-drop-zone.svg
[ember-observer-badge-url]: http://emberobserver.com/addons/ember-file-drop-zone
[dependencies-badge]: https://img.shields.io/david/st-h/ember-file-drop-zone.svg
[dependencies-badge-url]: https://david-dm.org/st-h/ember-file-drop-zone
[devDependencies-badge]: https://img.shields.io/david/dev/st-h/ember-file-drop-zone.svg
[devDependencies-badge-url]: https://david-dm.org/st-h/ember-file-drop-zone#info=devDependencies
