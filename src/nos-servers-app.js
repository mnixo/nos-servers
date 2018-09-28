import { LitElement, html } from '@polymer/lit-element';

class NOSServersApp extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div>Nuxeo Online Services servers.</div>
    `;
  }
}
window.customElements.define('nos-servers-app', NOSServersApp);
