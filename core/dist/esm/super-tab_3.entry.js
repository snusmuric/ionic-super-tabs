import { r as registerInstance, h, g as getElement, c as createEvent, H as Host, d as getContext } from './index-f2e2846b.js';
import { D as DEFAULT_CONFIG, d as debugLog, s as scrollEl, b as getTs, p as pointerCoord, c as checkGesture, g as getScrollX, a as getNormalizedScrollX } from './utils-21fc65cd.js';

const superTabComponentCss = ":host{height:var(--super-tab-height, 100%);position:relative;display:block;overflow-x:hidden;overflow-y:auto;contain:size style;z-index:1;-ms-flex-negative:0;flex-shrink:0;-ms-flex-positive:0;flex-grow:0;width:var(--super-tab-width, 100vw);-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-order:-1;order:-1;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);-webkit-font-smoothing:antialiased}:host[noScroll]{overflow-y:hidden}ion-nav,ion-content{height:100%;max-height:100%;position:absolute}ion-nav>.ion-page,ion-content>.ion-page{position:absolute}";

const SuperTabComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentDidLoad() {
        this.checkIonContent();
    }
    componentDidUpdate() {
        // check for ion-content after update, in case it was dynamically loaded
        this.checkIonContent();
    }
    /**
     * Check if we have an ion-content as a child and update the `noScroll` property
     * if it's not set yet.
     */
    checkIonContent() {
        if (typeof this.noScroll !== 'boolean') {
            const ionContentEl = this.el.querySelector('ion-content');
            if (ionContentEl && ionContentEl.parentElement === this.el) {
                this.noScroll = true;
            }
        }
    }
    /**
     * Returns the root scrollable element
     */
    async getRootScrollableEl() {
        if (!this.noScroll && this.el.scrollHeight > this.el.clientHeight) {
            return this.el;
        }
        const ionContent = this.el.querySelector('ion-content');
        if (ionContent) {
            return ionContent.getScrollElement();
        }
        if (this.noScroll) {
            return null;
        }
        return this.el;
    }
    render() {
        return h("slot", null);
    }
    get el() { return getElement(this); }
};
SuperTabComponent.style = superTabComponentCss;

const superTabsComponentCss = ":host{height:100%;max-height:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden;z-index:1;position:relative;contain:layout size style;-ms-flex-order:-1;order:-1;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);-webkit-font-smoothing:antialiased;-ms-touch-action:none;touch-action:none;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0}";

const maxInitRetries = 1e3;
const SuperTabsComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.tabChange = createEvent(this, "tabChange", 7);
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
        return (h(Host, null, h("slot", { name: "top" }), h("slot", null), h("slot", { name: "bottom" })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "config": ["onConfigChange"]
    }; }
};
SuperTabsComponent.style = superTabsComponentCss;

const superTabsContainerComponentCss = ":host{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;min-width:100%;-ms-flex:1 1 auto;flex:1 1 auto;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--super-tab-width, 100vw);height:var(--super-tab-height, 100%);overflow:hidden;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);-ms-touch-action:pan-y;touch-action:pan-y;-moz-user-select:none;-ms-user-select:none;user-select:none;will-change:scroll-position;-ms-flex-order:-1;order:-1;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);-webkit-font-smoothing:antialiased}";

const SuperTabsContainerComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.activeTabIndexChange = createEvent(this, "activeTabIndexChange", 7);
        this.selectedTabIndexChange = createEvent(this, "selectedTabIndexChange", 7);
        this.queue = getContext(this, "queue");
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
    get el() { return getElement(this); }
};
SuperTabsContainerComponent.style = superTabsContainerComponentCss;

export { SuperTabComponent as super_tab, SuperTabsComponent as super_tabs, SuperTabsContainerComponent as super_tabs_container };
