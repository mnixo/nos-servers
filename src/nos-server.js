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
        .title {
          font-weight: bold;
          font-size: larger;
        } 
      </style>
      <paper-card @tap="${this._onTap.bind(this)}">
        <p class="title">${this.server.label}</p>
        <p>${this.server.url}</p>
        <nos-server-status url="${this.server.url}"></nos-server-status>
      </paper-card>
    `;
  }

  _onTap() {
    window.open(this.server.url, '_blank').focus();
  }
}
window.customElements.define('nos-server', NOSServer);
