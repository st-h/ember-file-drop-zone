import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | file-drop-zone', function(hooks) {
  setupRenderingTest(hooks);

  const createDropEvent = function(dataTransferInterface) {
    const dropEvent = document.createEvent("CustomEvent");
    dropEvent.initCustomEvent('drop', true, true, null);
    if (dataTransferInterface) {
      dropEvent.dataTransfer = {
        files: [
          new File([], 'test-file-interface')
        ]
      }
    } else {
      dropEvent.dataTransfer = {
        items: [
          {
            kind: 'file',
            getAsFile() {
              return new File([], 'test-file');
            }
          }
        ]
      }
    }
    dropEvent.preventDefault = function() {
        //do nothing
    };
    return dropEvent;
  }

  const createDragEnterEvent = function(dataTransferInterface) {
    const event = document.createEvent("CustomEvent");
    event.initCustomEvent('dragenter', true, true, null);
    if (dataTransferInterface) {
      event.dataTransfer = {
        files: [
           null
        ]
      }
    } else {
      event.dataTransfer = {
        items: [
          {
            kind: 'file',
            getAsFile() {
              return null;
            }
          }
        ]
      }
    }
    return event;
  }

  const createDragLeaveEvent = function() {
    const event = document.createEvent("CustomEvent");
    event.initCustomEvent('dragleave', true, true, null);
    return event;
  }

  const createWindowDragEnterEvent = function() {
    const event = document.createEvent("CustomEvent");
    event.initCustomEvent('dragenter', true, true, null);
    return event;
  }

  const createWindowDragLeaveEvent = function() {
    const event = document.createEvent("CustomEvent");
    event.initCustomEvent('dragleave', true, true, null);
    return event;
  }

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{file-drop-zone}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#file-drop-zone}}
        template block text
      {{/file-drop-zone}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('correct file is reported via DataTransferItemList', async function(assert) {
    assert.expect(2);

    this.set('onDrop', function(files) {
      assert.equal(files.length, 1);
      assert.equal('test-file', files[0].name, 'dropped file name matches parameter provided by action')
    })
    await render(hbs`{{file-drop-zone onDrop=onDrop}}`);

    const editable = this.element.getElementsByClassName('ember-file-drop-zone')[0];
    await editable.dispatchEvent(createDropEvent()); // paste mock event
  });

  test('correct file is reported via DataTransfer interface', async function(assert) {
    assert.expect(2);

    this.set('onDrop', function(files) {
      assert.equal(files.length, 1);
      assert.equal('test-file-interface', files[0].name, 'dropped file name matches parameter provided by action')
    })
    await render(hbs`{{file-drop-zone onDrop=onDrop}}`);

    const editable = this.element.getElementsByClassName('ember-file-drop-zone')[0];
    await editable.dispatchEvent(createDropEvent(true)); // paste mock event
  });

  // test('dragging files into window should set dragging, window leave should reset', async function(assert) {
  //   assert.expect(4);
  //   await render(hbs`{{file-drop-zone dragging=this.dragging _windowEnteredCounter=counter}}`);
  //   await window.dispatchEvent(createWindowDragEnterEvent()); // paste mock event
  //   assert.ok(this.dragging);
  //   assert.equal(this.counter, 1, 'window enter counter should be incremented');

  //   await window.dispatchEvent(createWindowDragLeaveEvent()); // paste mock event
  //   assert.notOk(this.dragging);
  //   assert.equal(this.counter, 0, 'window enter counter should be reset');
  // });

  test('dragging files over dropzone should trigger action and set hovering', async function(assert) {
    await render(hbs`
      <FileDropZone @onDragEnter={{this.onDragEnter}} as |state|>
        dragging: {{state.dragging}} hovering: {{state.hovering}}
      </FileDropZone>
    `);

    const editable = this.element.getElementsByClassName('ember-file-drop-zone')[0];
    await editable.dispatchEvent(createDragEnterEvent()); // paste mock event
    await settled();
    assert.equal(this.element.innerText, 'dragging: true hovering: true');

    await editable.dispatchEvent(createDragLeaveEvent()); // paste mock event
    await settled();
    assert.equal(this.element.innerText, 'dragging: false hovering: false');
  });
});
