import { html } from '@polymer/lit-element';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-styles/paper-styles';
import { defaultConfig } from './default-config';
import { NOSBaseClass } from './nos-base-class';
import './nos-server';
import './nos-server-dialog';
import './nos-server-studio-dialog';
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
      this._servers = defaultConfig;
      localStorage.setItem('servers', JSON.stringify(this._servers));
    }
  }

  render() {
    return html`
      <style> 
        app-header {
          font-family: var(--paper-font-common-base_-_font-family);
          background-color: #1f28bf;
          color: #fff;
        }
        app-drawer {
          z-index: 1;
        }
        app-toolbar {
          justify-content: space-between;
        }
        .server-listing {
          display: flex;
          flex-direction: column;
          padding: 0.5em;
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
      <nos-server-dialog id="serverDialog" @studio-tap="${this._onGoToStudioTap.bind(this)}"></nos-server-dialog>
      <nos-server-studio-dialog id="studioDialog"></nos-server-studio-dialog>
      <div class="server-listing">
        ${this._renderServers(this._servers)}
      </div>
    `;
  }

  _renderServers(servers) {
    return servers.map(server => html`
      <nos-server .server="${server}" @tap="${() => this._onServerTap(server)}"></nos-server>
    `);
  }

  _openConfigDialog() {
    this.getById('configDialog').open(this._servers);
  }

  _onConfigSubmitted(e) {
    this._servers = e.detail.config;
    localStorage.setItem('servers', JSON.stringify(this._servers));
  }

  _onServerTap(server) {
    this.getById('serverDialog').open(server);
  }

  _onGoToStudioTap(e) {
    this.getById('studioDialog').open(e.detail.server);
  }
}
window.customElements.define('nos-servers-app', NOSServersApp);
