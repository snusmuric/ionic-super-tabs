import { Component, Element, h, Host, Prop, State } from '@stencil/core';
const maxRetryAttempts = 1e3;
export class SuperTabButtonComponent {
    constructor() {
        /** @internal */
        this.scrollableContainer = false;
        this.retryAttempts = 0;
    }
    componentDidLoad() {
        this.indexChildren();
        this.initCmp();
    }
    initCmp() {
        if (!this.el || !this.el.shadowRoot) {
            if (++this.retryAttempts < maxRetryAttempts) {
                requestAnimationFrame(() => this.initCmp());
                return;
            }
        }
        if (!this.label && !this.icon) {
            this.indexChildren();
        }
        const slot = this.el.shadowRoot.querySelector('slot');
        slot.addEventListener('slotchange', () => {
            this.indexChildren();
        });
    }
    indexChildren() {
        this.label = this.el.querySelector('ion-label');
        this.icon = this.el.querySelector('ion-icon');
    }
    render() {
        return (h(Host, { role: "button", "aria-label": this.label ? this.label.innerText : false, "aria-disabled": this.disabled ? 'true' : false, "aria-selected": this.active ? 'true' : 'false', class: {
                'ion-activatable': true,
                'ion-focusable': true,
                'icon-only': !!this.icon && !this.label,
                'label-only': !!this.label && !this.icon,
                active: Boolean(this.active),
                scrollableContainer: this.scrollableContainer,
            } },
            h("slot", null),
            h("ion-ripple-effect", { type: "unbounded" })));
    }
    static get is() { return "super-tab-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["super-tab-button.component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["super-tab-button.component.css"]
    }; }
    static get properties() { return {
        "active": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "active",
            "reflect": true
        },
        "index": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "index",
            "reflect": true
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean | undefined",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Whether the button is disabled"
            },
            "attribute": "disabled",
            "reflect": true
        },
        "scrollableContainer": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            },
            "attribute": "scrollable-container",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "label": {},
        "icon": {}
    }; }
    static get elementRef() { return "el"; }
}
