import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface FileDropZoneComponentArgs {
  disabled: boolean;
  onDrop?: (files: File[]) => void;
  onDragEnter?: (count: number) => void;
  onDragLeave?: () => void;
}

export default class FileDropZoneComponent extends Component<FileDropZoneComponentArgs> {

  @tracked hovering = false;
  @tracked dragging = false;
  @tracked windowEnteredCounter = 0;

 @action
  registerListener(element: HTMLElement) {
    window.addEventListener('dragenter', this.onWindowDragEnter, false);
    window.addEventListener('dragleave', this.onWindowDragLeave, false);
    window.addEventListener('dragover', this.onWindowDragOver, false);
    window.addEventListener('drop', this.onWindowDrop, false);
    element.addEventListener('dragenter', this.onDragEnter, false);
    element.addEventListener('dragleave', this.onDragLeave, false);
    element.addEventListener('dragover', this.onDragOver, false);
    element.addEventListener('drop', this.onDrop, false);
  }

  @action
  unregisterListener(element: HTMLElement) {
    window.removeEventListener('dragenter', this.onWindowDragEnter, false);
    window.removeEventListener('dragleave', this.onWindowDragLeave, false);
    window.removeEventListener('dragover', this.onWindowDragOver, false);
    window.removeEventListener('drop', this.onWindowDrop, false);
    element.removeEventListener('dragenter', this.onDragEnter, false);
    element.removeEventListener('dragleave', this.onDragLeave, false);
    element.removeEventListener('dragover', this.onDragOver, false);
    element.removeEventListener('drop', this.onDrop, false);
  }

  hasFiles(e: DragEvent): boolean {
    return e.dataTransfer?.types?.includes('Files') ?? false;
  }

  @action
  onWindowDragEnter(e: DragEvent) {
    if (!this.hasFiles(e)) return;
    this.dragging = true;
    ++this.windowEnteredCounter;
  }

  @action
  onWindowDragLeave(e: DragEvent) {
    if (!this.hasFiles(e)) return;
    if (--this.windowEnteredCounter == 0) {
      this.dragging = false;
    }
  }

  @action
  onWindowDragOver(e: DragEvent) {
    if (!this.hasFiles(e)) return;
    e.preventDefault();
  }

  @action
  onWindowDrop(e: DragEvent) {
    if (!this.hasFiles(e)) return;
    e.preventDefault();
    this.reset();
  }

  @action
  onDragEnter(e: DragEvent) {
    if (!this.hasFiles(e)) return;
    this.hovering = true;
    if (!this.args.disabled && this.args.onDragEnter) {
      this.args.onDragEnter(this.extractFiles(e).length);
    }
  }

  @action
  onDragLeave(e: DragEvent) {
    if (!this.hasFiles(e)) return;
    this.hovering = false;
    if (!this.args.disabled && this.args.onDragLeave) {
      this.args.onDragLeave();
    }
  }

  @action
  onDragOver(e: DragEvent) {
    if (!this.hasFiles(e)) return;
    e.preventDefault();
  }

  @action
  onDrop(e: DragEvent) {
    if (!this.hasFiles(e)) return;
    e.preventDefault();
    this.reset();

    if (this.args.disabled) {
      return true;
    }
    if (this.args.onDrop) {
      this.args.onDrop(this.extractFiles(e));
    }
  }

  reset() {
    this.dragging = false;
    this.hovering = false;
    this.windowEnteredCounter = 0;
  }

  extractFiles(event: DragEvent) {
    let files: File[] = [];

    if (event.dataTransfer?.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        const item = event.dataTransfer.items[i];
        if (item.kind === 'file') {
          files.push(item.getAsFile()!);
        }
      }
    } else if (event.dataTransfer) {
      // Use DataTransfer interface to access the file(s)
      for (var j = 0; j < event.dataTransfer.files.length; j++) {
        files.push(event.dataTransfer.files[j]);
      }
    }
    return files;
  }
}
