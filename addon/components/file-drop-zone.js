import Component from '@ember/component';
import layout from '../templates/components/file-drop-zone';
import DropZone from '../mixins/file-drop-zone';

export default Component.extend(DropZone, {
  layout
});
