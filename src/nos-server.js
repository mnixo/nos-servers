import { html } from '@polymer/lit-element';
import '@polymer/paper-card/paper-card';
import { NOSBaseClass } from './nos-base-class';

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
          padding: 0 1em;
          cursor: pointer;
        }
        .title {
          font-weight: bold;
        } 
      </style>
      <paper-card @tap="${this._onTap.bind(this)}">
        <p class="title">${this.server.label}</p>
        <p>${this.server.url}</p>
      </paper-card>
    `;
  }

  _onTap() {
    window.open(this.server.url, '_blank').focus();
  }
}
window.customElements.define('nos-server', NOSServer);
