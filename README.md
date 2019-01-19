ember-file-drop-zone
==============================================================================

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
import dropZone from 'ember-file-drop-zone/mixins/file-drop-zone';

export default Component.extend(dropZone, {

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
  // styles when files are being dragged and dropzone is not disabled
}
```


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
