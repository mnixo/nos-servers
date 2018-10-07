import { html } from '@polymer/lit-element';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog/paper-dialog';
import { NOSBaseClass } from './nos-base-class';

class NOSServerDialog extends NOSBaseClass {
  static get properties() {
    return {
      server: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this.server = {};
  }

  render() {
    return html`
      <style>
        paper-dialog {
          display: flex;
          flex-direction: column;
        }
        paper-button {
          padding: 0.7em 0.57em;
          margin: 0 20px 20px 20px;
        }
        .label {
          font-weight: bold;
          font-size: larger;
        }
      </style>
      <paper-dialog id="dialog" with-backdrop>
        <p class="label">${this.server.label}</p>
        <paper-button raised dialog-dismiss @tap="${this._onConnectDashboardTap.bind(this)}">connect dashboard</paper-button>
        <paper-button raised dialog-dismiss @tap="${this._onNuxeoBackendTap.bind(this)}">nuxeo backend</paper-button>
        <paper-button raised dialog-dismiss @tap="${this._onStudioTap.bind(this)}">studio</paper-button>
      </paper-dialog>
    `;
  }

  open(server) {
    this.server = server;
    this.getById('dialog').open();
  }

  _openNewTab(url) {
    window.open(url, '_blank').focus();
  }

  _onConnectDashboardTap() {
    this._openNewTab(this.server.url);
  }

  _onNuxeoBackendTap() {
    this._openNewTab(`${this.server.url}/nuxeo`);
  }

  _onStudioTap() {
    this.fire('studio-tap', {
      server: this.server,
    });
  }
}
window.customElements.define('nos-server-dialog', NOSServerDialog);