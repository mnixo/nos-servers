import { html } from '@polymer/lit-element';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-item/paper-item';
import { NOSBaseClass } from './nos-base-class';

class NOSServerStudioDialog extends NOSBaseClass {
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
        paper-dropdown-menu {
          padding: 0;
          margin: 0 20px 20px 20px;
        }
        .label {
          font-weight: bold;
          font-size: larger;
        }
      </style>
      <paper-dialog id="dialog" with-backdrop>
        <p class="label">${this.server.label}</p>
        <paper-dropdown-menu label="Studio Project">
          <paper-listbox id="listbox" slot="dropdown-content">
            ${this._renderProjectOptions(this.server)}
          </paper-listbox>
        </paper-dropdown-menu>
        <paper-button raised dialog-dismiss @tap="${this._onModelerTap.bind(this)}">modeler</paper-button>
        <paper-button raised dialog-dismiss @tap="${this._onDesignerTap.bind(this)}">designer</paper-button>
      </paper-dialog>
    `;
  }

  _renderProjectOptions(server) {
    if (!server || !server.studioProjects || server.studioProjects.length === 0) {
      return;
    }
    return server.studioProjects.map(studioProject => html`
      <paper-item .value="${studioProject}">${studioProject}</paper-item>
    `);
  }

  open(server) {
    this.server = server;
    this.getById('listbox').selected = 0;
    this.getById('dialog').open();
  }

  _openNewTab(url) {
    window.open(url, '_blank').focus();
  }

  _onModelerTap() {
    this._openNewTab(`${this.server.url}/nuxeo/site/studio/ide?project=${this.getById('listbox').selectedItem.value}`);
  }

  _onDesignerTap() {
    this._openNewTab(`${this.server.url}/nuxeo/designer/#/${this.getById('listbox').selectedItem.value}`);
  }
}
window.customElements.define('nos-server-studio-dialog', NOSServerStudioDialog);
