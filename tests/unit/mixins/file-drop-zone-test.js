import EmberObject from '@ember/object';
import FileDropZoneMixin from 'ember-file-drop-zone/mixins/file-drop-zone';
import { module, test } from 'qunit';

module('Unit | Mixin | file-drop-zone', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let FileDropZoneObject = EmberObject.extend(FileDropZoneMixin);
    let subject = FileDropZoneObject.create();
    assert.ok(subject);
  });
});
