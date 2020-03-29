import { Component, h, Host, Prop } from '@stencil/core';
export class SuperTabIndicatorComponent {
    constructor() {
        /**
         * Toolbar position
         * This determines the position of the indicator
         */
        this.toolbarPosition = 'top';
        this.showPointer = false;
    }
    render() {
        const style = {};
        if (this.toolbarPosition === 'bottom') {
            style.top = 0;
        }
        else {
            style.bottom = 0;
        }
        return (h(Host, { style: style, className: this.showPointer ? 'indicator-pointer' : '' }));
    }
    static get is() { return "super-tab-indicator"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["super-tab-indicator.component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["super-tab-indicator.component.css"]
    }; }
    static get properties() { return {
        "toolbarPosition": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'top' | 'bottom'",
                "resolved": "\"bottom\" | \"top\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Toolbar position\nThis determines the position of the indicator"
            },
            "attribute": "toolbar-position",
            "reflect": false,
            "defaultValue": "'top'"
        },
        "showPointer": {
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
                "tags": [],
                "text": ""
            },
            "attribute": "show-pointer",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
}
