import { Component, Element, Event, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { checkGesture, debugLog, getNormalizedScrollX, getScrollX, pointerCoord, scrollEl } from '../utils';
export class SuperTabsToolbarComponent {
    constructor() {
        /**
         * Whether to show the indicator. Defaults to `true`
         */
        this.showIndicator = true;
        this.showPointer = false;
        /**
         * Background color. Defaults to `'primary'`
         */
        this.color = 'primary';
        /**
         * Whether the toolbar is scrollable. Defaults to `false`.
         */
        this.scrollable = false;
        /**
         * If scrollable is set to true, there will be an added padding
         * to the left of the buttons.
         *
         * Setting this property to false will remove that padding.
         *
         * The padding is also configurable via a CSS variable.
         */
        this.scrollablePadding = true;
        this.buttons = [];
        this.activeTabIndex = 0;
        this.leftThreshold = 0;
        this.rightThreshold = 0;
        this.hostCls = {};
        this.clientWidth = 0;
    }
    async componentDidLoad() {
        this.debug('componentDidLoad');
        this.setHostCls();
        await this.queryButtons();
        this.slot = this.el.shadowRoot.querySelector('slot');
        this.slot.addEventListener('slotchange', this.onSlotChange.bind(this));
        this.clientWidth = this.el.clientWidth;
        if (this.activeTabIndex > 0) {
            requestAnimationFrame(() => {
                this.alignIndicator(this.activeTabIndex);
            });
        }
    }
    componentWillUpdate() {
        this.debug('componentWillUpdate');
        this.updateThresholds();
    }
    /** @internal */
    setActiveTab(index, align, animate) {
        this.activeTabIndex = index;
        this.markButtonActive(this.buttons[index]);
        if (align) {
            this.alignIndicator(index, animate);
        }
        return Promise.resolve();
    }
    /** @internal */
    setSelectedTab(index, animate) {
        this.alignIndicator(index, animate);
        return Promise.resolve();
    }
    /** @internal */
    moveContainer(scrollX, animate) {
        if (!this.buttonsContainerEl) {
            this.debug('moveContainer called before this.buttonsContainerEl was defined');
            return Promise.resolve();
        }
        scrollEl(this.buttonsContainerEl, scrollX, 0, animate ? this.config.transitionDuration : 0);
        return Promise.resolve();
    }
    onClick(ev) {
        if (!ev || !ev.target) {
            return;
        }
        let button = ev.target;
        const tag = button.tagName.toLowerCase();
        if (tag !== 'super-tab-button') {
            if (tag === 'super-tabs-toolbar') {
                return;
            }
            button = button.closest('super-tab-button');
        }
        this.setActiveTab(button.index, true, true);
        this.buttonClick.emit(button);
    }
    async onTouchStart(ev) {
        if (!this.scrollable) {
            return;
        }
        this.debug('onTouchStart', ev);
        const coords = pointerCoord(ev);
        const vw = this.clientWidth;
        if (coords.x < this.leftThreshold || coords.x > vw - this.rightThreshold) {
            // ignore this gesture, it started in the side menu touch zone
            return;
        }
        this.initialCoords = coords;
        this.lastPosX = coords.x;
    }
    async onTouchMove(ev) {
        if (!this.buttonsContainerEl ||
            !this.scrollable ||
            !this.initialCoords ||
            typeof this.lastPosX !== 'number') {
            this.debug('onTouchMove called before this.buttonsContainerEl was defined');
            return Promise.resolve();
        }
        const coords = pointerCoord(ev);
        if (!this.isDragging) {
            const shouldCapture = checkGesture(coords, this.initialCoords, this.config);
            if (!shouldCapture) {
                if (Math.abs(coords.y - this.initialCoords.y) > 100) {
                    this.initialCoords = void 0;
                    this.lastPosX = void 0;
                }
                return;
            }
            // gesture is good, let's capture all next onTouchMove events
            this.isDragging = true;
        }
        if (!this.isDragging) {
            return;
        }
        ev.stopImmediatePropagation();
        // get delta X
        const deltaX = this.lastPosX - coords.x;
        // update last X value
        this.lastPosX = coords.x;
        if (deltaX === 0) {
            return;
        }
        // scroll container
        const scrollLeft = getScrollX(this.buttonsContainerEl);
        const scrollX = getNormalizedScrollX(this.buttonsContainerEl, deltaX);
        if (scrollX === scrollLeft) {
            return;
        }
        this.moveContainer(scrollX, false);
    }
    async onTouchEnd() {
        this.debug('onTouchEnd');
        this.isDragging = false;
        this.initialCoords = void 0;
        this.lastPosX = void 0;
    }
    async onColorUpdate() {
        this.setHostCls();
    }
    setHostCls() {
        const cls = {};
        if (typeof this.color === 'string' && this.color.trim().length > 0) {
            cls['ion-color-' + this.color.trim()] = true;
        }
        this.hostCls = cls;
    }
    async onSlotChange() {
        this.debug('onSlotChange');
        this.clientWidth = this.el.clientWidth;
        await this.queryButtons();
        await this.alignIndicator(this.activeTabIndex);
    }
    async queryButtons() {
        this.debug('Querying buttons');
        const buttons = Array.from(this.el.querySelectorAll('super-tab-button'));
        await Promise.all(buttons.map((b) => b.componentOnReady()));
        if (buttons) {
            for (let i = 0; i < buttons.length; i++) {
                const button = buttons[i];
                button.index = i;
                button.scrollableContainer = this.scrollable;
                button.active = this.activeTabIndex === i;
                if (button.active) {
                    this.activeButton = button;
                }
            }
        }
        this.buttons = buttons;
    }
    updateThresholds() {
        if (!this.config) {
            return;
        }
        if (this.config.sideMenu === 'both' || this.config.sideMenu === 'left') {
            this.leftThreshold = this.config.sideMenuThreshold;
        }
        if (this.config.sideMenu === 'both' || this.config.sideMenu === 'right') {
            this.rightThreshold = this.config.sideMenuThreshold;
        }
    }
    markButtonActive(button) {
        if (!button) {
            return;
        }
        if (this.activeButton) {
            this.activeButton.active = false;
        }
        button.active = true;
        this.activeButton = button;
    }
    adjustContainerScroll(animate) {
        if (!this.buttonsContainerEl) {
            this.debug('adjustContainerScroll called before this.buttonsContainerEl was defined');
            return;
        }
        let pos;
        const ip = this.indicatorPosition;
        const iw = this.indicatorWidth;
        const mw = this.buttonsContainerEl.clientWidth;
        const sp = getScrollX(this.buttonsContainerEl);
        const centerDelta = mw / 2 - iw / 2;
        if (ip + iw + centerDelta > mw + sp) {
            // we need to move the segment container to the left
            const delta = ip + iw + centerDelta - mw - sp;
            pos = sp + delta;
        }
        else if (ip - centerDelta < sp) {
            // we need to move the segment container to the right
            pos = ip - centerDelta;
            pos = Math.max(pos, 0);
            pos = pos > ip ? ip - mw + iw : pos;
        }
        if (typeof pos === 'number') {
            this.moveContainer(pos, animate);
        }
    }
    /**
     * Align the indicator with the selected button.
     * This will adjust the width and the position of the indicator element.
     * @param index {number} the active tab index
     * @param [animate] {boolean=false} whether to animate the transition
     */
    alignIndicator(index, animate = false) {
        if (!this.showIndicator) {
            this.debug('showIndicator is false');
            return;
        }
        if (!this.indicatorEl) {
            this.debug('alignIndicator called before this.buttonsContainerEl was defined');
            return;
        }
        requestAnimationFrame(() => {
            const remainder = index % 1;
            const isDragging = (this.isDragging = remainder > 0);
            let position, width;
            const floor = Math.floor(index), ceil = Math.ceil(index);
            const button = this.buttons[floor];
            if (!button) {
                return;
            }
            position = button.offsetLeft;
            width = button.clientWidth;
            if (this.isDragging && floor !== ceil) {
                const buttonB = this.buttons[ceil];
                const buttonBWidth = buttonB.clientWidth;
                const buttonBPosition = buttonB.offsetLeft;
                position += remainder * (buttonBPosition - position);
                width += remainder * (buttonBWidth - width);
            }
            this.indicatorPosition = position;
            this.indicatorWidth = width;
            if (this.scrollable) {
                this.adjustContainerScroll(animate || !isDragging);
            }
            this.indicatorEl.style.setProperty('--st-indicator-position-x', this.indicatorPosition + 'px');
            this.indicatorEl.style.setProperty('--st-indicator-scale-x', String(this.indicatorWidth / 100));
            this.indicatorEl.style.setProperty('--st-indicator-transition-duration', this.isDragging ? '0' : `${this.config.transitionDuration}ms`);
        });
    }
    /**
     * Internal method to output values in debug mode.
     */
    debug(...vals) {
        debugLog(this.config, 'toolbar', vals);
    }
    render() {
        return (h(Host, { role: "navigation", class: this.hostCls },
            h("div", { class: "buttons-container", ref: (ref) => (this.buttonsContainerEl = ref) },
                h("slot", null),
                this.showIndicator && (h("super-tab-indicator", { ref: (ref) => (this.indicatorEl = ref), toolbarPosition: this.el.assignedSlot.name, showPointer: this.showPointer })))));
    }
    static get is() { return "super-tabs-toolbar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["super-tabs-toolbar.component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["super-tabs-toolbar.component.css"]
    }; }
    static get properties() { return {
        "config": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "SuperTabsConfig",
                "resolved": "SuperTabsConfig | undefined",
                "references": {
                    "SuperTabsConfig": {
                        "location": "import",
                        "path": "../interface"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [{
                        "text": undefined,
                        "name": "internal"
                    }],
                "text": ""
            }
        },
        "showIndicator": {
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
                "text": "Whether to show the indicator. Defaults to `true`"
            },
            "attribute": "show-indicator",
            "reflect": false,
            "defaultValue": "true"
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
        },
        "color": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string | undefined",
                "resolved": "string | undefined",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Background color. Defaults to `'primary'`"
            },
            "attribute": "color",
            "reflect": false,
            "defaultValue": "'primary'"
        },
        "scrollable": {
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
                "text": "Whether the toolbar is scrollable. Defaults to `false`."
            },
            "attribute": "scrollable",
            "reflect": true,
            "defaultValue": "false"
        },
        "scrollablePadding": {
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
                "text": "If scrollable is set to true, there will be an added padding\nto the left of the buttons.\n\nSetting this property to false will remove that padding.\n\nThe padding is also configurable via a CSS variable."
            },
            "attribute": "scrollable-padding",
            "reflect": true,
            "defaultValue": "true"
        }
    }; }
    static get states() { return {
        "buttons": {}
    }; }
    static get events() { return [{
            "method": "buttonClick",
            "name": "buttonClick",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emits an event when a button is clicked\nEvent data contains the clicked SuperTabButton component"
            },
            "complexType": {
                "original": "HTMLSuperTabButtonElement",
                "resolved": "HTMLSuperTabButtonElement",
                "references": {
                    "HTMLSuperTabButtonElement": {
                        "location": "global"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "setActiveTab": {
            "complexType": {
                "signature": "(index: number, align?: boolean | undefined, animate?: boolean | undefined) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": [{
                        "name": "internal",
                        "text": undefined
                    }]
            }
        },
        "setSelectedTab": {
            "complexType": {
                "signature": "(index: number, animate?: boolean | undefined) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": [{
                        "name": "internal",
                        "text": undefined
                    }]
            }
        },
        "moveContainer": {
            "complexType": {
                "signature": "(scrollX: number, animate?: boolean | undefined) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }, {
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": [{
                        "name": "internal",
                        "text": undefined
                    }]
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "color",
            "methodName": "onColorUpdate"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "touchstart",
            "method": "onTouchStart",
            "target": undefined,
            "capture": false,
            "passive": true
        }, {
            "name": "touchmove",
            "method": "onTouchMove",
            "target": undefined,
            "capture": true,
            "passive": true
        }, {
            "name": "touchend",
            "method": "onTouchEnd",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
