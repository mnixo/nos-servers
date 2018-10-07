import { html } from '@polymer/lit-element';
import '@polymer/iron-icon/iron-icon';
import '@polymer/paper-spinner/paper-spinner';
import { NOSBaseClass } from './nos-base-class';

class NOSServerStatus extends NOSBaseClass {
  static get properties() {
    return {
      url: {
        type: String,
      },
      /**
       * `?` when the request has been made but no response was returned yet
       * `ok` when the response returned successfully
       * `ko` when the response returned an error
       */
      _status: {
        type: String,
      },
      _message: {
        type: String,
      },
    };
  }

  render() {
    return html`
      <style>
        :host {
          display: flex;
          align-items: center;
        }
        paper-spinner {
          width: 16px;
          height: 16px;
          padding: 4px;
        }
        p {
          margin: 0 0 0 0.2em;
        }
        .ok {
          color:var(--google-green-700);
        }
        .ko {
          color:var(--google-red-700);
        }
      </style>
      ${this._renderIcon()}
      <p>${this._message}</p>
    `;
  }

  firstUpdated(changedProperties) {
    this._pingServer();
  }

  _pingServer() {
    this._status = '?';
    this._message = 'Waiting...';
    const timeBefore = new Date();
    fetch(this.url).then(() => {
      this._status = 'ok';
      this._message = `Online (${(new Date()) - timeBefore}ms)`;
    }).catch(() => {
      this._status = 'ko';
      this._message = `Offline (${(new Date()) - timeBefore}ms)`;
    });
  }

  _renderIcon() {
    switch (this._status) {
      case '?':
        return html`
          <paper-spinner active></paper-spinner>
        `;
      case 'ok':
        return html`
          <iron-icon class="ok" icon="check"></iron-icon>
        `;
      case 'ko':
        return html`
          <iron-icon class="ko" icon="close"></iron-icon>
        `;
    }
  }
}
window.customElements.define('nos-server-status', NOSServerStatus);
