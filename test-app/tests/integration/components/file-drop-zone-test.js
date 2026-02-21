import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | file-drop-zone', function (hooks) {
  setupRenderingTest(hooks);

  const createDropEvent = function (dataTransferInterface, files) {
    const dropEvent = new CustomEvent('drop', {
      bubbles: true,
      cancelable: true,
    });
    if (files) {
      dropEvent.dataTransfer = {
        types: ['Files'],
        items: files.map((f) => ({
          kind: 'file',
          getAsFile() {
            return f;
          },
        })),
      };
    } else if (dataTransferInterface) {
      dropEvent.dataTransfer = {
        types: ['Files'],
        files: [new File([], 'test-file-interface')],
      };
    } else {
      dropEvent.dataTransfer = {
        types: ['Files'],
        items: [
          {
            kind: 'file',
            getAsFile() {
              return new File([], 'test-file');
            },
          },
        ],
      };
    }
    return dropEvent;
  };

  const createDragEnterEvent = function (dataTransferInterface) {
    const event = new CustomEvent('dragenter', {
      bubbles: true,
      cancelable: true,
    });
    if (dataTransferInterface) {
      event.dataTransfer = {
        types: ['Files'],
        files: [null],
      };
    } else {
      event.dataTransfer = {
        types: ['Files'],
        items: [
          {
            kind: 'file',
            getAsFile() {
              return null;
            },
          },
        ],
      };
    }
    return event;
  };

  const createDragLeaveEvent = function () {
    const event = new CustomEvent('dragleave', {
      bubbles: true,
      cancelable: true,
    });
    event.dataTransfer = { types: ['Files'] };
    return event;
  };

  test('it renders', async function (assert) {
    await render(hbs`<FileDropZone />`);

    assert.strictEqual(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <FileDropZone>
        template block text
      </FileDropZone>
    `);

    assert.strictEqual(this.element.textContent.trim(), 'template block text');
  });

  test('correct file is reported via DataTransferItemList', async function (assert) {
    assert.expect(2);

    this.set('onDrop', function (files) {
      assert.strictEqual(files.length, 1);
      assert.strictEqual(
        'test-file',
        files[0].name,
        'dropped file name matches parameter provided by action',
      );
    });
    await render(hbs`<FileDropZone @onDrop={{this.onDrop}} />`);

    const editable = this.element.getElementsByClassName(
      'ember-file-drop-zone',
    )[0];
    await editable.dispatchEvent(createDropEvent()); // paste mock event
  });

  test('correct file is reported via DataTransfer interface', async function (assert) {
    assert.expect(2);

    this.set('onDrop', function (files) {
      assert.strictEqual(files.length, 1);
      assert.strictEqual(
        'test-file-interface',
        files[0].name,
        'dropped file name matches parameter provided by action',
      );
    });
    await render(hbs`<FileDropZone @onDrop={{this.onDrop}} />`);

    const editable = this.element.getElementsByClassName(
      'ember-file-drop-zone',
    )[0];
    await editable.dispatchEvent(createDropEvent(true)); // paste mock event
  });

  test('accept filters by MIME type', async function (assert) {
    assert.expect(2);

    const pdf = new File([''], 'doc.pdf', { type: 'application/pdf' });
    const png = new File([''], 'image.png', { type: 'image/png' });

    this.set('onDrop', function (files) {
      assert.strictEqual(files.length, 1);
      assert.strictEqual(files[0].name, 'doc.pdf');
    });
    this.set('onDropRejected', function () {
      // not asserted here
    });
    await render(
      hbs`<FileDropZone @accept="application/pdf" @onDrop={{this.onDrop}} @onDropRejected={{this.onDropRejected}} />`,
    );

    const zone = this.element.querySelector('.ember-file-drop-zone');
    await zone.dispatchEvent(createDropEvent(false, [pdf, png]));
  });

  test('accept filters by extension', async function (assert) {
    assert.expect(2);

    const pdf = new File([''], 'doc.pdf', { type: 'application/pdf' });
    const png = new File([''], 'image.png', { type: 'image/png' });

    this.set('onDrop', function (files) {
      assert.strictEqual(files.length, 1);
      assert.strictEqual(files[0].name, 'doc.pdf');
    });
    this.set('onDropRejected', function () {});
    await render(
      hbs`<FileDropZone @accept=".pdf" @onDrop={{this.onDrop}} @onDropRejected={{this.onDropRejected}} />`,
    );

    const zone = this.element.querySelector('.ember-file-drop-zone');
    await zone.dispatchEvent(createDropEvent(false, [pdf, png]));
  });

  test('accept filters by wildcard MIME type', async function (assert) {
    assert.expect(3);

    const png = new File([''], 'image.png', { type: 'image/png' });
    const pdf = new File([''], 'doc.pdf', { type: 'application/pdf' });

    this.set('onDrop', function (files) {
      assert.strictEqual(files.length, 1);
      assert.strictEqual(files[0].name, 'image.png');
    });
    this.set('onDropRejected', function (files) {
      assert.strictEqual(files[0].name, 'doc.pdf');
    });
    await render(
      hbs`<FileDropZone @accept="image/*" @onDrop={{this.onDrop}} @onDropRejected={{this.onDropRejected}} />`,
    );

    const zone = this.element.querySelector('.ember-file-drop-zone');
    await zone.dispatchEvent(createDropEvent(false, [png, pdf]));
  });

  test('accept with multiple types', async function (assert) {
    assert.expect(2);

    const pdf = new File([''], 'doc.pdf', { type: 'application/pdf' });
    const png = new File([''], 'image.png', { type: 'image/png' });
    const txt = new File([''], 'readme.txt', { type: 'text/plain' });

    this.set('onDrop', function (files) {
      assert.strictEqual(files.length, 2);
    });
    this.set('onDropRejected', function (files) {
      assert.strictEqual(files.length, 1);
    });
    await render(
      hbs`<FileDropZone @accept="application/pdf,image/*" @onDrop={{this.onDrop}} @onDropRejected={{this.onDropRejected}} />`,
    );

    const zone = this.element.querySelector('.ember-file-drop-zone');
    await zone.dispatchEvent(createDropEvent(false, [pdf, png, txt]));
  });

  test('no accept arg passes all files to onDrop', async function (assert) {
    assert.expect(1);

    const pdf = new File([''], 'doc.pdf', { type: 'application/pdf' });
    const png = new File([''], 'image.png', { type: 'image/png' });

    this.set('onDrop', function (files) {
      assert.strictEqual(files.length, 2);
    });
    await render(hbs`<FileDropZone @onDrop={{this.onDrop}} />`);

    const zone = this.element.querySelector('.ember-file-drop-zone');
    await zone.dispatchEvent(createDropEvent(false, [pdf, png]));
  });

  test('all files rejected calls only onDropRejected', async function (assert) {
    assert.expect(2);

    const png = new File([''], 'image.png', { type: 'image/png' });
    const txt = new File([''], 'readme.txt', { type: 'text/plain' });

    this.set('onDrop', function () {
      assert.true(false, 'onDrop should not be called');
    });
    this.set('onDropRejected', function (files) {
      assert.strictEqual(files.length, 2);
      assert.deepEqual(
        files.map((f) => f.name),
        ['image.png', 'readme.txt'],
      );
    });
    await render(
      hbs`<FileDropZone @accept=".pdf" @onDrop={{this.onDrop}} @onDropRejected={{this.onDropRejected}} />`,
    );

    const zone = this.element.querySelector('.ember-file-drop-zone');
    await zone.dispatchEvent(createDropEvent(false, [png, txt]));
  });

  test('dragging files over dropzone should trigger action and set hovering', async function (assert) {
    await render(hbs`
      <FileDropZone @onDragEnter={{this.onDragEnter}} as |state|>
        dragging: {{state.dragging}} hovering: {{state.hovering}}
      </FileDropZone>
    `);

    const editable = this.element.getElementsByClassName(
      'ember-file-drop-zone',
    )[0];
    await editable.dispatchEvent(createDragEnterEvent());
    await settled();
    assert.strictEqual(this.element.innerText, 'dragging: true hovering: true');

    await editable.dispatchEvent(createDragLeaveEvent());
    await settled();
    assert.strictEqual(
      this.element.innerText,
      'dragging: false hovering: false',
    );
  });
});
