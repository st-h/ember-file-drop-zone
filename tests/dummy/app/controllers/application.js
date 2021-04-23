import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class ApplicationController extends Controller {

  @tracked dropZoneDisabled = false;
  @tracked files = A();
  @tracked fileCount = 0;

  @action
  addFiles(files) {
    files.forEach((file) => {
      this.files.pushObject(file);
    });
  }

  @action
  countFiles(files) {
    this.fileCount += files.length;
  }
}