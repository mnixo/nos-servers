import { LitElement, html } from '@polymer/lit-element';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-styles/paper-styles';

class NOSServersApp extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
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
      </style>
      <app-header reveals>
        <app-toolbar>NOS Servers</app-toolbar>
      </app-header>
    `;
  }

}
window.customElements.define('nos-servers-app', NOSServersApp);
