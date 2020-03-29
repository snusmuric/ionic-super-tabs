import { r as registerInstance, h, H as Host, g as getElement, c as createEvent } from './index-f2e2846b.js';
import { s as scrollEl, d as debugLog, p as pointerCoord, c as checkGesture, g as getScrollX, a as getNormalizedScrollX } from './utils-21fc65cd.js';

const superTabButtonComponentCss = ":host{-ms-flex:1 0 0px;flex:1 0 0;cursor:pointer;position:relative;max-width:100%;overflow:hidden;display:-ms-flexbox;display:flex;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);height:72px;padding:0 24px;-webkit-touch-callout:none;-webkit-user-select:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);-webkit-font-smoothing:antialiased}:host ion-label,:host ion-icon,:host ::slotted(ion-label),:host ::slotted(ion-icon){-webkit-transition-property:all;transition-property:all;-webkit-transition-duration:300ms;transition-duration:300ms;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transition-delay:0s;transition-delay:0s;-webkit-box-sizing:content-box !important;box-sizing:content-box !important;-webkit-user-select:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);-webkit-font-smoothing:antialiased}:host ion-label,:host ::slotted(ion-label){color:var(--st-label-color-inactive, var(--st-base-color-inactive));line-height:var(--st-label-line-height, 14px);height:var(--st-label-height, 14px);font-size:var(--st-label-font-size, 14px);text-transform:var(--st-label-text-transform, uppercase);font-weight:var(--st-label-font-weight, 500);padding-bottom:var(--st-label-padding-bottom, 16px)}:host ion-icon,:host ::slotted(ion-icon){color:var(--st-icon-color-inactive, var(--st-base-color-inactive));fill:var(--st-icon-color-inactive, var(--st-base-color-inactive));min-height:var(--st-icon-size, 24px);min-width:var(--st-icon-size, 24px);font-size:var(--st-icon-size, 24px);padding-top:12px}@media (hover: hover){:host(:hover){background:rgba(var(--ion-color-contrast-rgb), 0.04)}}:host(.active) ion-label,:host(.active) ion-icon,:host(.active) ::slotted(ion-label),:host(.active) ::slotted(ion-icon){-webkit-transition-delay:75ms;transition-delay:75ms}:host(.active) ion-label,:host(.active) ::slotted(ion-label){color:var(--st-label-color-active, var(--st-base-color-active))}:host(.active) ion-icon,:host(.active) ::slotted(ion-icon){color:var(--st-icon-color-active, var(--st-base-color-active));fill:var(--st-icon-color-active, var(--st-base-color-active))}:host(.icon-only),:host(.label-only){height:48px;-ms-flex-pack:center;justify-content:center}:host(.scrollableContainer){-ms-flex-positive:0;flex-grow:0;-ms-flex-preferred-size:auto;flex-basis:auto;min-width:90px;max-width:360px}::slotted{-ms-flex-negative:1;flex-shrink:1}:host(.label-only) ion-label,:host(.label-only) ::slotted(ion-label){padding-bottom:0}:host(.icon-only) ion-icon,:host(.icon-only) ::slotted(ion-icon){padding-top:0}";

const maxRetryAttempts = 1e3;
const SuperTabButtonComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
            } }, h("slot", null), h("ion-ripple-effect", { type: "unbounded" })));
    }
    get el() { return getElement(this); }
};
SuperTabButtonComponent.style = superTabButtonComponentCss;

const superTabsToolbarComponentCss = ":host{-ms-flex:0 1 auto;flex:0 1 auto;display:block;width:100%;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);position:relative;background:var(--super-tabs-toolbar-background, var(--ion-color-base));overflow:visible;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:auto;-ms-touch-action:pan-x;touch-action:pan-x;z-index:2;-ms-flex-order:-1;order:-1;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);-webkit-font-smoothing:antialiased}:host .buttons-container{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;width:100%;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);overflow:hidden}:host(:not([no-border])):after{left:0;bottom:-8px;background-position:left 0 top 0;position:absolute;width:100%;height:8px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAIBAMAAAACWGKkAAAAFVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAASAQCkAAAAB3RSTlMFTEIzJBcOYhQUIwAAAB9JREFUCNdjEIQCBiUoYDCGAgYXKGAIhQKGNChgwAAAorMLKSCkL40AAAAASUVORK5CYII=);background-repeat:repeat-x;content:\"\";z-index:3;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}:host([scrollable]) .buttons-container{will-change:scroll-position}:host([scrollable][scrollable-padding]) .buttons-container{padding-left:var(--st-scrollable-toolbar-padding-left, 52px);width:calc(100% - var(--st-scrollable-toolbar-padding-left, $st-scrollable-toolbar-padding-left))}";

const SuperTabsToolbarComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.buttonClick = createEvent(this, "buttonClick", 7);
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
        return (h(Host, { role: "navigation", class: this.hostCls }, h("div", { class: "buttons-container", ref: (ref) => (this.buttonsContainerEl = ref) }, h("slot", null), this.showIndicator && (h("super-tab-indicator", { ref: (ref) => (this.indicatorEl = ref), toolbarPosition: this.el.assignedSlot.name, showPointer: this.showPointer })))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "color": ["onColorUpdate"]
    }; }
};
SuperTabsToolbarComponent.style = superTabsToolbarComponentCss;

export { SuperTabButtonComponent as super_tab_button, SuperTabsToolbarComponent as super_tabs_toolbar };
