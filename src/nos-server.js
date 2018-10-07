import { html } from '@polymer/lit-element';
import '@polymer/paper-card/paper-card';
import { NOSBaseClass } from './nos-base-class';
import './nos-server-status';

class NOSServer extends NOSBaseClass {
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
        paper-card {
          width: 100%;
          margin-bottom: 0.5em;
          padding: 1em;
          cursor: pointer;
        }
        p {
          margin: 0;
        }
        .label {
          font-weight: bold;
          font-size: larger;
        }
        .url {
          font-size: small;
        }
      </style>
      <paper-card @tap="${this._onTap.bind(this)}">
        <p class="label">${this.server.label}</p>
        <p class="url">${this.server.url}</p>
        <nos-server-status url="${this.server.url}"></nos-server-status>
      </paper-card>
    `;
  }

  _onTap() {
    this.fire('tap');
  }
}
window.customElements.define('nos-server', NOSServer);
