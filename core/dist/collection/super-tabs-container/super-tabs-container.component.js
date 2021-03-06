import { Component, Element, Event, h, Listen, Method, Prop, State, } from '@stencil/core';
import { checkGesture, debugLog, getNormalizedScrollX, getScrollX, getTs, pointerCoord, scrollEl, } from '../utils';
export class SuperTabsContainerComponent {
    constructor() {
        /**
         * Enable/disable swiping
         */
        this.swipeEnabled = true;
        /**
         * Set to true to automatically scroll to the top of the tab when the button is clicked while the tab is
         * already selected.
         */
        this.autoScrollTop = false;
        this.tabs = [];
        this.isDragging = false;
        this.leftThreshold = 0;
        this.rightThreshold = 0;
        this.scrollWidth = 0;
        this.clientWidth = 0;
    }
    async componentDidLoad() {
        this.debug('componentDidLoad');
        await this.indexTabs();
        this.slot = this.el.shadowRoot.querySelector('slot');
        this.slot.addEventListener('slotchange', this.onSlotChange.bind(this));
    }
    async onSlotChange() {
        this.debug('onSlotChange', this.tabs.length);
    }
    async componentWillUpdate() {
        await this.indexTabs();
    }
    /**
     * @internal
     */
    async reindexTabs() {
        await this.indexTabs();
    }
    /**
     * @internal
     *
     * Moves the container to align with the specified tab index
     * @param index {number} Index of the tab
     * @param animate {boolean} Whether to animate the transition
     */
    moveContainerByIndex(index, animate) {
        const scrollX = this.indexToPosition(index);
        if (scrollX === 0 && index > 0) {
            return Promise.resolve();
        }
        return this.moveContainer(scrollX, animate);
    }
    /**
     * @internal
     *
     * Sets the scrollLeft property of the container
     * @param scrollX {number}
     * @param animate {boolean}
     */
    moveContainer(scrollX, animate) {
        scrollEl(this.el, scrollX, 0, animate ? this.config.transitionDuration : 0);
        return Promise.resolve();
    }
    /** @internal */
    async setActiveTabIndex(index, moveContainer = true, animate = true) {
        this.debug('setActiveTabIndex', index);
        if (this._activeTabIndex === index) {
            if (!this.autoScrollTop) {
                return;
            }
            await this.scrollToTop();
        }
        if (moveContainer) {
            await this.moveContainerByIndex(index, animate);
        }
        await this.updateActiveTabIndex(index, false);
    }
    /**
     * Scroll the active tab to the top.
     */
    async scrollToTop() {
        if (this._activeTabIndex === undefined || this.tabs === undefined) {
            this.debug('activeTabIndex or tabs was undefined');
            return;
        }
        const current = this.tabs[this._activeTabIndex];
        this.queue.read(() => {
            if (!current) {
                this.debug('Current active tab was undefined in scrollToTop');
                return;
            }
            current.getRootScrollableEl()
                .then(el => {
                if (el) {
                    scrollEl(el, 0, 0, this.config.transitionDuration);
                }
            });
        });
    }
    updateActiveTabIndex(index, emit = true) {
        this.debug('updateActiveTabIndex', index, emit, this._activeTabIndex);
        this._activeTabIndex = index;
        emit && this.activeTabIndexChange.emit(this._activeTabIndex);
    }
    updateSelectedTabIndex(index) {
        if (index === this._selectedTabIndex) {
            return;
        }
        this._selectedTabIndex = index;
        this.selectedTabIndexChange.emit(this._selectedTabIndex);
    }
    async onTouchStart(ev) {
        if (!this.swipeEnabled) {
            return;
        }
        if (this.config.avoidElements) {
            let avoid = false;
            let element = ev.target;
            if (element) {
                do {
                    if (typeof element.getAttribute === 'function' && element.getAttribute('avoid-super-tabs')) {
                        return;
                    }
                    element = element.parentElement;
                } while (element && !avoid);
            }
        }
        const coords = pointerCoord(ev);
        const vw = this.clientWidth;
        if (coords.x < this.leftThreshold || coords.x > vw - this.rightThreshold) {
            // ignore this gesture, it started in the side menu touch zone
            return;
        }
        if (this.config.shortSwipeDuration > 0) {
            this.initialTimestamp = getTs();
        }
        this.initialCoords = coords;
        this.lastPosX = coords.x;
    }
    async onClick(ev) {
        if (this.isDragging) {
            ev.stopImmediatePropagation();
            ev.preventDefault();
        }
    }
    async onTouchMove(ev) {
        if (!this.swipeEnabled || !this.initialCoords || typeof this.lastPosX !== 'number') {
            return;
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
        // scroll container
        if (!this.isDragging) {
            return;
        }
        // stop anything else from capturing these events, to make sure the content doesn't slide
        if (!this.config.allowElementScroll) {
            ev.stopImmediatePropagation();
        }
        // get delta X
        const deltaX = this.lastPosX - coords.x;
        if (deltaX === 0) {
            return;
        }
        const scrollLeft = getScrollX(this.el);
        const scrollX = getNormalizedScrollX(this.el, deltaX);
        if (scrollX === scrollLeft) {
            return;
        }
        this.updateSelectedTabIndex(this.positionToIndex(scrollX));
        // update last X value
        this.lastPosX = coords.x;
        this.moveContainer(scrollX, false);
    }
    async onTouchEnd(ev) {
        if (!this.swipeEnabled || !this.isDragging) {
            return;
        }
        const coords = pointerCoord(ev);
        const deltaTime = getTs() - this.initialTimestamp;
        const shortSwipe = this.config.shortSwipeDuration > 0 && deltaTime <= this.config.shortSwipeDuration;
        const shortSwipeDelta = coords.x - this.initialCoords.x;
        let selectedTabIndex = this.calcSelectedTab();
        const expectedTabIndex = Math.round(selectedTabIndex);
        if (shortSwipe && expectedTabIndex === this._activeTabIndex) {
            selectedTabIndex += shortSwipeDelta > 0 ? -1 : 1;
        }
        selectedTabIndex = this.normalizeSelectedTab(selectedTabIndex);
        this.updateActiveTabIndex(selectedTabIndex);
        this.moveContainerByIndex(selectedTabIndex, true);
        this.isDragging = false;
        this.initialCoords = void 0;
        this.lastPosX = void 0;
    }
    async indexTabs() {
        this.scrollWidth = this.el.scrollWidth;
        this.clientWidth = this.el.clientWidth;
        this.debug('indexTab', this.scrollWidth, this.clientWidth);
        if (this.scrollWidth === 0 || this.clientWidth === 0) {
            requestAnimationFrame(() => {
                this.indexTabs();
            });
            return;
        }
        const tabs = Array.from(this.el.querySelectorAll('super-tab'));
        await Promise.all(tabs.map(t => t.componentOnReady()));
        this.tabs = tabs;
        if (this.ready && typeof this._activeTabIndex === 'number') {
            this.moveContainerByIndex(this._activeTabIndex, true);
        }
        if (this.config) {
            switch (this.config.sideMenu) {
                case 'both':
                    this.rightThreshold = this.leftThreshold = this.config.sideMenuThreshold || 0;
                    break;
                case 'left':
                    this.leftThreshold = this.config.sideMenuThreshold || 0;
                    break;
                case 'right':
                    this.rightThreshold = this.config.sideMenuThreshold || 0;
                    break;
            }
        }
        if (this._activeTabIndex !== undefined) {
            this.moveContainerByIndex(this._activeTabIndex, false)
                .then(() => {
                this.ready = true;
            });
        }
    }
    calcSelectedTab() {
        const tabsWidth = this.scrollWidth;
        const tabWidth = this.clientWidth;
        const minX = 0;
        const maxX = tabsWidth - tabWidth;
        const scrollX = Math.max(minX, Math.min(maxX, getScrollX(this.el)));
        return this.positionToIndex(scrollX);
    }
    positionToIndex(scrollX) {
        const tabWidth = this.clientWidth;
        return scrollX / tabWidth;
    }
    indexToPosition(tabIndex) {
        this.debug('indexToPosition', tabIndex, this.clientWidth);
        const tabWidth = this.clientWidth;
        return tabIndex * tabWidth;
    }
    normalizeSelectedTab(index) {
        const tabsWidth = this.scrollWidth;
        const tabWidth = this.clientWidth;
        const minX = 0;
        const maxX = tabsWidth - tabWidth;
        const scrollX = Math.max(minX, Math.min(maxX, tabWidth * Math.round(index)));
        return scrollX / tabWidth;
    }
    /**
     * Internal method to output values in debug mode.
     */
    debug(...vals) {
        debugLog(this.config, 'container', vals);
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "super-tabs-container"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["super-tabs-container.component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["super-tabs-container.component.css"]
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
        "swipeEnabled": {
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
                "text": "Enable/disable swiping"
            },
            "attribute": "swipe-enabled",
            "reflect": false,
            "defaultValue": "true"
        },
        "autoScrollTop": {
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
                "text": "Set to true to automatically scroll to the top of the tab when the button is clicked while the tab is\nalready selected."
            },
            "attribute": "auto-scroll-top",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get contextProps() { return [{
            "name": "queue",
            "context": "queue"
        }]; }
    static get states() { return {
        "tabs": {}
    }; }
    static get events() { return [{
            "method": "activeTabIndexChange",
            "name": "activeTabIndexChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emits an event when the active tab changes.\nAn active tab is the tab that the user looking at.\n\nThis event emitter will not notify you if the user has changed the current active tab.\nIf you need that information, you should use the `tabChange` event emitted by the `super-tabs` element."
            },
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            }
        }, {
            "method": "selectedTabIndexChange",
            "name": "selectedTabIndexChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emits events when the container moves.\nSelected tab index represents what the user should be seeing.\nIf you receive a decimal as the emitted number, it means that the container is moving between tabs.\nThis number is used for animations, and can be used for high tab customizations."
            },
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "reindexTabs": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
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
        "moveContainerByIndex": {
            "complexType": {
                "signature": "(index: number, animate?: boolean | undefined) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "index Index of the tab",
                                "name": "param"
                            }],
                        "text": "Index of the tab"
                    }, {
                        "tags": [{
                                "text": "animate Whether to animate the transition",
                                "name": "param"
                            }],
                        "text": "Whether to animate the transition"
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
                        "text": "Moves the container to align with the specified tab index"
                    }, {
                        "name": "param",
                        "text": "index Index of the tab"
                    }, {
                        "name": "param",
                        "text": "animate Whether to animate the transition"
                    }]
            }
        },
        "moveContainer": {
            "complexType": {
                "signature": "(scrollX: number, animate?: boolean | undefined) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "scrollX",
                                "name": "param"
                            }],
                        "text": ""
                    }, {
                        "tags": [{
                                "text": "animate",
                                "name": "param"
                            }],
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
                        "text": "Sets the scrollLeft property of the container"
                    }, {
                        "name": "param",
                        "text": "scrollX"
                    }, {
                        "name": "param",
                        "text": "animate"
                    }]
            }
        },
        "setActiveTabIndex": {
            "complexType": {
                "signature": "(index: number, moveContainer?: boolean, animate?: boolean) => Promise<void>",
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
        "scrollToTop": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Scroll the active tab to the top.",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get listeners() { return [{
            "name": "touchstart",
            "method": "onTouchStart",
            "target": undefined,
            "capture": false,
            "passive": true
        }, {
            "name": "click",
            "method": "onClick",
            "target": undefined,
            "capture": true,
            "passive": false
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
