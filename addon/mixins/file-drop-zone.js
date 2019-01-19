import Mixin from '@ember/object/mixin';

export default Mixin.create({

  classNames: ['ember-file-drop-zone'],
  classNameBindings: ['disabled', 'dragging'],

  disabled: false,

  dragOver(e) {
    e.preventDefault();
  },

  drop(e) {
    e.preventDefault();
    this.set('dragging', false);

    if (this.disabled) {
      return true;
    }

    let files = [];

    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === 'file') {
          files.push(e.dataTransfer.items[i].getAsFile());
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var j = 0; j < e.dataTransfer.files.length; j++) {
        files.push(e.dataTransfer.files[j]);
      }
    }

    this.onDrop(files);
  },

  dragEnter() {
    this.set('dragging', true);
    if (!this.disabled) {
      this.onDragEnter();
    }
  },

  dragLeave() {
    this.set('dragging', false);
    if (!this.disabled) {
      this.onDragLeave();
    }
  },

  onDrop() { },

  onDragEnter() { },

  onDragLeave() { }
});
