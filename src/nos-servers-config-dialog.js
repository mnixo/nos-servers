import { html } from '@polymer/lit-element';
import '@polymer/iron-autogrow-textarea/iron-autogrow-textarea';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog/paper-dialog';
import { defaultConfig } from './default-config';
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
          max-width: 800px;
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
        .container-buttons {
          display: flex;
          justify-content: space-between;
          padding: 0;
          margin: 20px;
          min-height: 40px;
        }
        .container-buttons > paper-button {
          margin: 0;
        }
        .container-buttons > div > paper-button {
          margin: 0 0 0 8px;
        }
      </style>
      <paper-dialog id="dialog" with-backdrop>
        <h3>Edit Configuration</h3>
        <div class="text-area-container">
          <iron-autogrow-textarea id="textArea" @value-changed="${this._onValueChanged.bind(this)}">
          </iron-autogrow-textarea>
        </div>
        <div class="container-buttons">
          <paper-button raised @tap="${this._onReset.bind(this)}">reset</paper-button>
          <div>
            <paper-button dialog-confirm raised @tap="${this._onSubmitConfig.bind(this)}" .disabled="${!this.isValid}">
              confirm
            </paper-button>
            <paper-button dialog-dismiss raised>
              cancel
            </paper-button>
          </div>
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

  _onReset() {
    this.getById('textArea').value = JSON.stringify(defaultConfig, null, 2);
  }

  _onSubmitConfig() {
    this.fire('config-submitted', {
      config: JSON.parse(this.getById('textArea').value),
    });
  }
}
window.customElements.define('nos-servers-config-dialog', NOSServersConfigDialog);
