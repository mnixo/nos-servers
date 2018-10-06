import { html } from '@polymer/lit-element';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-styles/paper-styles';
import { NOSBaseClass } from './nos-base-class';
import './nos-servers-config-dialog';

class NOSServersApp extends NOSBaseClass {
  static get properties() {
    return {
      _servers: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this._servers = JSON.parse(localStorage.getItem('servers'));
    if (!this._servers) {
      this._servers = [];
      localStorage.setItem('servers', JSON.stringify(this._servers));
    }
  }

  render() {
    return html`
      <style>
        app-header {
          font-family: var(--paper-font-common-base_-_font-family);
          background-color: #0066ff;
          color: #fff;
        }
        app-drawer {
          z-index: 1;
        }
        app-toolbar {
          justify-content: space-between;
        }
      </style>
      <app-header reveals>
        <app-toolbar>
          NOS Servers
          <paper-icon-button icon="settings" @tap="${this._openConfigDialog.bind(this)}"></paper-icon-button>
        </app-toolbar>
      </app-header>
      <nos-servers-config-dialog id="configDialog" @config-submitted="${this._onConfigSubmitted.bind(this)}">
      </nos-servers-config-dialog>
      ${this._renderServers(this._servers)}
    `;
  }

  _openConfigDialog() {
    this.getById('configDialog').open(this._servers);
  }

  _onConfigSubmitted(e) {
    this._servers = e.detail.config;
    localStorage.setItem('servers', JSON.stringify(this._servers));
  }

  _renderServers(servers) {
    return servers.map(s => html`
      <div>${JSON.stringify(s)}</div>
    `);
  }
}
window.customElements.define('nos-servers-app', NOSServersApp);
