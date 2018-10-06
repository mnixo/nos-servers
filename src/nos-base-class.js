import { LitElement, html } from '@polymer/lit-element';

export class NOSBaseClass extends LitElement {
  render() {
    return html``;
  }

  getById(id) {
    return this.shadowRoot.getElementById(id);
  }

  fire(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail,
    }));
  }
}
window.customElements.define('nos-base-class', NOSBaseClass);
