import Mixin from '@ember/object/mixin';

export default Mixin.create({

  classNames: ['ember-file-drop-zone'],
  classNameBindings: ['disabled', 'dragging', 'hovering'],

  disabled: false,

  didInsertElement() {
    this._super(...arguments);
    window.addEventListener('dragenter', this.set('_windowDragEnterHandler', this.windowDragEnter.bind(this)), false);
    window.addEventListener('dragleave', this.set('_windowDragLeaveHandler', this.windowDragLeave.bind(this)), false);
    window.addEventListener('dragover', this.set('_windowDragOverHandler', this.windowDragOver.bind(this)), false);
    window.addEventListener('drop', this.set('_windowDropHandler', this.windowDrop.bind(this)), false);
  },

  willDestroyElement() {
    this._super(...arguments);
    window.removeEventListener('dragenter', this.get('_windowDragEnterHandler'), false);
    window.removeEventListener('dragleave', this.get('_windowDragLeaveHandler'), false);
    window.removeEventListener('dragover', this.get('_windowDragOverHandler'), false);
    window.removeEventListener('drop', this.get('_windowDropHandler'), false);
  },

  windowDrop(e) {
    e.preventDefault();
    this.reset();
  },

  reset() {
    this.setProperties({
      dragging: false,
      hovering: false,
      _windowEnteredCounter: 0
    });
  },

  drop(e) {
    e.preventDefault();
    this.reset();

    if (this.disabled) {
      return true;
    }
    this.onDrop(this._extractFiles(e));
  },

  windowDragOver(e) {
    e.preventDefault();
  },

  dragOver(e) {
    e.preventDefault();
  },

  windowDragEnter() {
    this.set('dragging', true);
    this.incrementProperty('_windowEnteredCounter');
  },

  windowDragLeave() {
    if (this.decrementProperty('_windowEnteredCounter') == 0) {
      this.set('dragging', false);
    }
  },

  dragEnter(e) {
    this.set('hovering', true);
    if (!this.disabled) {
      this.onDragEnter(this._extractFiles(e).length);
    }
  },

  dragLeave() {
    this.set('hovering', false);
    if (!this.disabled) {
      this.onDragLeave();
    }
  },

  _extractFiles(event) {
    let files = [];

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        const item = event.dataTransfer.items[i];
        if (item.kind === 'file') {
          files.push(item.getAsFile());
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var j = 0; j < event.dataTransfer.files.length; j++) {
        files.push(event.dataTransfer.files[j]);
      }
    }
    return files;
  },

  onDrop() { },

  onDragEnter() { },

  onDragLeave() { }
});
