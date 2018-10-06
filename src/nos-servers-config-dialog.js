import { html } from '@polymer/lit-element';
import '@polymer/iron-autogrow-textarea/iron-autogrow-textarea';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog/paper-dialog';
import { NOSBaseClass } from './nos-base-class';

class NOSServersConfigDialog extends NOSBaseClass {
  static get properties() {
    return {
      isValid: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.isValid = false;
  }

  render() {
    return html`
      <style>
        paper-dialog {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        div.text-area-container {
          padding: 0.5em;
          margin: 0 20px;
          background-color: #eee;
          max-height: 100%;
          overflow-y: scroll;
        }
        iron-autogrow-textarea {
          width: calc(100% - 40px);
          padding: 0;
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
          border: none;         
        }
        div.buttons {
          min-height: 40px;
          padding: 0;
          margin: 20px;
        }
      </style>
      <paper-dialog id="dialog" with-backdrop>
        <h3>Edit Configuration</h3>
        <div class="text-area-container">
          <iron-autogrow-textarea maxlength="999" id="textArea" @value-changed="${this._onValueChanged.bind(this)}">
          </iron-autogrow-textarea>
        </div>
        <div class="buttons">
          <paper-button dialog-confirm raised @tap="${this._onSubmitConfig.bind(this)}" .disabled="${!this.isValid}">
            ok
          </paper-button>
          <paper-button dialog-dismiss raised>
            cancel
          </paper-button>
        </div>
      </paper-dialog>
    `;
  }

  open(config) {
    this.getById('textArea').value = JSON.stringify(config, null, 2);
    this.getById('dialog').open();
  }

  _onValueChanged() {
    this.getById('dialog').center();
    try {
      JSON.parse(this.getById('textArea').value);
      this.isValid = true;
    } catch (error) {
      this.isValid = false;
    }
  }

  _onSubmitConfig() {
    this.fire('config-submitted', {
      config: JSON.parse(this.getById('textArea').value),
    });
  }
}
window.customElements.define('nos-servers-config-dialog', NOSServersConfigDialog);
