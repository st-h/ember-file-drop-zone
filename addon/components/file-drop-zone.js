import Component from '@ember/component';
import layout from '../templates/components/file-drop-zone';
import dropZone from '../mixins/file-drop-zone';

export default Component.extend(dropZone, {
  layout
});
