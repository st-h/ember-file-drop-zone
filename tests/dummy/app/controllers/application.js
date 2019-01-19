import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({

  dropZoneDisabled: false,

  init() {
    this._super(...arguments);
    this.set('files', A());
  },

  actions: {
    addFiles(files) {
      files.forEach((file) => {
        this.files.pushObject(file);
      })
    }
  }
});