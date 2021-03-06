import { Component, Element, Event, h, Host, Listen, Method, Prop, Watch, } from '@stencil/core';
import { debugLog, DEFAULT_CONFIG } from '../utils';
const maxInitRetries = 1e3;
/**
 * Root component that controls the other super-tab components.
 *
 * This component propagates configuration over to children and keeps track of the tabs state.
 */
export class SuperTabsComponent {
    constructor() {
        /**
         * Initial active tab index.
         * Defaults to `0`.
         *
         * @type {number}
         */
        this.activeTabIndex = 0;
        this._config = DEFAULT_CONFIG;
        this.initAttempts = 0;
        this.initPromise = new Promise((resolve) => {
            this.initPromiseResolve = resolve;
        });
    }
    /**
     * Set/update the configuration
     * @param {SuperTabsConfig} config Configuration object
     */
    async setConfig(config) {
        this.debug('setConfig called with: ', config);
        this._config = Object.assign(Object.assign({}, DEFAULT_CONFIG), config);
    }
    propagateConfig() {
        this.container && (this.container.config = this._config);
        this.toolbar && (this.toolbar.config = this._config);
    }
    /**
     * Set the selected tab.
     * This will move the container and the toolbar to the selected tab.
     * @param index {number} the index of the tab you want to select
     * @param [animate=true] {boolean} whether you want to animate the transition
     */
    async selectTab(index, animate = true) {
        this.debug('selectTab', index, animate);
        await this.initPromise;
        const lastIndex = this.activeTabIndex;
        if (this.container) {
            await this.container.setActiveTabIndex(index, true, animate);
        }
        if (this.toolbar) {
            await this.toolbar.setActiveTab(index, true, animate);
        }
        this.emitTabChangeEvent(index, lastIndex);
        this.activeTabIndex = lastIndex;
    }
    async onConfigChange(config) {
        await this.setConfig(config);
    }
    onWindowResize() {
        this.debug('onWindowResize');
        this.toolbar && this.toolbar.setSelectedTab(this.activeTabIndex);
        this.container.reindexTabs();
    }
    async componentWillLoad() {
        this.debug('componentWillLoad');
        if (this.config) {
            await this.setConfig(this.config);
        }
    }
    componentDidLoad() {
        this.debug('componentDidLoad');
        // index children
        this.indexChildren();
        // set the selected tab so the toolbar & container are aligned and in sync
        if (this.container) {
            this.container.setActiveTabIndex(this.activeTabIndex);
        }
        if (this.toolbar) {
            this.toolbar.setActiveTab(this.activeTabIndex);
        }
        // listen to `slotchange` event to detect any changes in children
        this.el.shadowRoot.addEventListener('slotchange', this.onSlotchange.bind(this));
        requestAnimationFrame(() => {
            this.initComponent();
        });
    }
    initComponent() {
        if (!this.container) {
            if (++this.initAttempts < maxInitRetries) {
                requestAnimationFrame(() => {
                    this.initComponent();
                });
                return;
            }
        }
        this.debug(`failed to init ${this.initAttempts} times`);
        if (this.container) {
            this.container.moveContainerByIndex(this.activeTabIndex, false);
        }
        if (this.toolbar) {
            this.toolbar.setSelectedTab(this.activeTabIndex, false);
        }
        this.propagateConfig();
        this.setupEventListeners();
        this.initPromiseResolve();
    }
    /**
     * Setup event listeners to synchronize child components
     */
    async setupEventListeners() {
        if (this.container) {
            await this.container.componentOnReady();
            this.el.addEventListener('selectedTabIndexChange', this.onContainerSelectedTabChange.bind(this));
            this.el.addEventListener('activeTabIndexChange', this.onContainerActiveTabChange.bind(this));
        }
        else {
            this.debug('setupEventListeners: container does not exist');
        }
        if (this.toolbar) {
            await this.toolbar.componentOnReady();
            this.el.addEventListener('buttonClick', this.onToolbarButtonClick.bind(this));
        }
        else {
            this.debug('setupEventListeners: toolbar does not exist');
        }
    }
    async onContainerSelectedTabChange(ev) {
        // this.debug('onContainerSelectedTabChange called with: ', ev);
        if (this.toolbar) {
            await this.toolbar.setSelectedTab(ev.detail);
        }
    }
    emitTabChangeEvent(newIndex, oldIndex) {
        if (typeof newIndex !== 'number' || newIndex < 0) {
            return;
        }
        if (typeof oldIndex !== 'number' || oldIndex < 0) {
            oldIndex = this.activeTabIndex;
        }
        this.tabChange.emit({
            changed: newIndex !== oldIndex,
            index: newIndex,
        });
    }
    onContainerActiveTabChange(ev) {
        this.debug('onContainerActiveTabChange', ev);
        const index = ev.detail;
        this.emitTabChangeEvent(index);
        this.activeTabIndex = index;
        this.toolbar && this.toolbar.setActiveTab(index, true, true);
    }
    onToolbarButtonClick(ev) {
        this.debug('onToolbarButtonClick', ev);
        const { index } = ev.detail;
        this.container && this.container.setActiveTabIndex(index, true, true);
        this.emitTabChangeEvent(index);
        this.activeTabIndex = index;
    }
    indexChildren() {
        this.debug('indexChildren');
        const container = this.el.querySelector('super-tabs-container');
        const toolbar = this.el.querySelector('super-tabs-toolbar');
        if (container && this.container !== container) {
            this.container = container;
        }
        if (toolbar && this.toolbar !== toolbar) {
            this.toolbar = toolbar;
        }
        this.propagateConfig();
    }
    async onSlotchange() {
        // re-index the child components
        this.indexChildren();
        // reselect the current tab to ensure that we're on the correct tab
        this.selectTab(this.activeTabIndex);
    }
    /**
     * Internal method to output values in debug mode.
     */
    debug(...vals) {
        debugLog(this._config, 'tabs', vals);
    }
    render() {
        // Render 3 slots
        // Top & bottom slots allow the toolbar position to be configurable via slots.
        // The nameless slot is used to hold the `super-tabs-container`.
        return (h(Host, null,
            h("slot", { name: "top" }),
            h("slot", null),
            h("slot", { name: "bottom" })));
    }
    static get is() { return "super-tabs"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["super-tabs.component.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["super-tabs.component.css"]
    }; }
    static get properties() { return {
        "config": {
            "type": "unknown",
            "mutable": false,
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
                        "text": "{SuperTabsConfig}",
                        "name": "type"
                    }],
                "text": "Global Super Tabs configuration.\n\nThis is the only place you need to configure the components. Any changes to this input will propagate to child\ncomponents."
            }
        },
        "activeTabIndex": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{number}",
                        "name": "type"
                    }],
                "text": "Initial active tab index.\nDefaults to `0`."
            },
            "attribute": "active-tab-index",
            "reflect": true,
            "defaultValue": "0"
        }
    }; }
    static get events() { return [{
            "method": "tabChange",
            "name": "tabChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Tab change event.\n\nThis event fires up when a tab button is clicked, or when a user swipes between tabs.\n\nThe event will fire even if the tab did not change, you can check if the tab changed by checking the `changed`\nproperty in the event detail."
            },
            "complexType": {
                "original": "SuperTabChangeEventDetail",
                "resolved": "SuperTabChangeEventDetail",
                "references": {
                    "SuperTabChangeEventDetail": {
                        "location": "import",
                        "path": "../interface"
                    }
                }
            }
        }]; }
    static get methods() { return {
        "setConfig": {
            "complexType": {
                "signature": "(config: SuperTabsConfig) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "config Configuration object",
                                "name": "param"
                            }],
                        "text": "Configuration object"
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "SuperTabsConfig": {
                        "location": "import",
                        "path": "../interface"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Set/update the configuration",
                "tags": [{
                        "name": "param",
                        "text": "config Configuration object"
                    }]
            }
        },
        "selectTab": {
            "complexType": {
                "signature": "(index: number, animate?: boolean) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "index the index of the tab you want to select",
                                "name": "param"
                            }],
                        "text": "the index of the tab you want to select"
                    }, {
                        "tags": [{
                                "text": "animate whether you want to animate the transition",
                                "name": "param"
                            }],
                        "text": "whether you want to animate the transition"
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Set the selected tab.\nThis will move the container and the toolbar to the selected tab.",
                "tags": [{
                        "name": "param",
                        "text": "index the index of the tab you want to select"
                    }, {
                        "name": "param",
                        "text": "animate whether you want to animate the transition"
                    }]
            }
        }
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "config",
            "methodName": "onConfigChange"
        }]; }
    static get listeners() { return [{
            "name": "resize",
            "method": "onWindowResize",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
