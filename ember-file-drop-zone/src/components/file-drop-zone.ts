import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface FileDropZoneComponentArgs {
  disabled: boolean;
  accept?: string;
  onDrop?: (files: File[]) => void;
  onDropRejected?: (files: File[]) => void;
  onDragEnter?: (count: number) => void;
  onDragLeave?: () => void;
}

export default class FileDropZoneComponent extends Component<FileDropZoneComponentArgs> {

  @tracked hovering = false;
  @tracked dragging = false;
  windowEnteredCounter = 0;

  constructor(owner: unknown, args: FileDropZoneComponentArgs) {
    super(owner, args);
    window.addEventListener('dragenter', this.onWindowDragEnter);
    window.addEventListener('dragleave', this.onWindowDragLeave);
    window.addEventListener('dragover', this.onWindowDragOver);
    window.addEventListener('drop', this.onWindowDrop);
  }

  willDestroy() {
    super.willDestroy();
    window.removeEventListener('dragenter', this.onWindowDragEnter);
    window.removeEventListener('dragleave', this.onWindowDragLeave);
    window.removeEventListener('dragover', this.onWindowDragOver);
    window.removeEventListener('drop', this.onWindowDrop);
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

    const files = this.extractFiles(e);
    const { accepted, rejected } = this.filterFiles(files);

    if (accepted.length > 0 && this.args.onDrop) {
      this.args.onDrop(accepted);
    }
    if (rejected.length > 0 && this.args.onDropRejected) {
      this.args.onDropRejected(rejected);
    }
  }

  filterFiles(files: File[]): { accepted: File[]; rejected: File[] } {
    const accept = this.args.accept;
    if (!accept) {
      return { accepted: files, rejected: [] };
    }

    const tokens = accept.split(',').map((t) => t.trim().toLowerCase());
    const accepted: File[] = [];
    const rejected: File[] = [];

    for (const file of files) {
      const fileName = file.name.toLowerCase();
      const fileType = file.type.toLowerCase();

      const matches = tokens.some((token) => {
        if (token.startsWith('.')) {
          return fileName.endsWith(token);
        }
        if (token.endsWith('/*')) {
          const prefix = token.slice(0, -1);
          return fileType.startsWith(prefix);
        }
        return fileType === token;
      });

      if (matches) {
        accepted.push(file);
      } else {
        rejected.push(file);
      }
    }

    return { accepted, rejected };
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
