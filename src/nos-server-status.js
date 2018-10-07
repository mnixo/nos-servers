import { html } from '@polymer/lit-element';
import { NOSBaseClass } from './nos-base-class';

class NOSServerStatus extends NOSBaseClass {
  static get properties() {
    return {
      url: {
        type: String,
      },
      _message: {
        type: String,
      },
    };
  }

  render() {
    return html`
      <p>${this._message}</p>
    `;
  }

  firstUpdated(changedProperties) {
    this._pingServer();
  }

  _pingServer() {
    this._message = 'Waiting...';
    const timeBefore = new Date();
    fetch(this.url).then(() => {
      this._message = `Success (${(new Date()) - timeBefore}ms)`;
    }).catch(() => {
      this._message = `Failed (${(new Date()) - timeBefore}ms)`;
    });
  }
}
window.customElements.define('nos-server-status', NOSServerStatus);
