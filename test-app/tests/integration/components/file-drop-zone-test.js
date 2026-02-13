import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | file-drop-zone', function (hooks) {
  setupRenderingTest(hooks);

  const createDropEvent = function (dataTransferInterface) {
    const dropEvent = document.createEvent('CustomEvent');
    dropEvent.initCustomEvent('drop', true, true, null);
    if (dataTransferInterface) {
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
    dropEvent.preventDefault = function () {
      //do nothing
    };
    return dropEvent;
  };

  const createDragEnterEvent = function (dataTransferInterface) {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('dragenter', true, true, null);
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
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('dragleave', true, true, null);
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
        'dropped file name matches parameter provided by action'
      );
    });
    await render(hbs`<FileDropZone @onDrop={{this.onDrop}} />`);

    const editable = this.element.getElementsByClassName(
      'ember-file-drop-zone'
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
        'dropped file name matches parameter provided by action'
      );
    });
    await render(hbs`<FileDropZone @onDrop={{this.onDrop}} />`);

    const editable = this.element.getElementsByClassName(
      'ember-file-drop-zone'
    )[0];
    await editable.dispatchEvent(createDropEvent(true)); // paste mock event
  });

  test('dragging files over dropzone should trigger action and set hovering', async function (assert) {
    await render(hbs`
      <FileDropZone @onDragEnter={{this.onDragEnter}} as |state|>
        dragging: {{state.dragging}} hovering: {{state.hovering}}
      </FileDropZone>
    `);

    const editable = this.element.getElementsByClassName(
      'ember-file-drop-zone'
    )[0];
    await editable.dispatchEvent(createDragEnterEvent());
    await settled();
    assert.strictEqual(this.element.innerText, 'dragging: true hovering: true');

    await editable.dispatchEvent(createDragLeaveEvent());
    await settled();
    assert.strictEqual(
      this.element.innerText,
      'dragging: false hovering: false'
    );
  });
});
