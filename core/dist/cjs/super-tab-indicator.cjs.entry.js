'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7da53ae9.js');

const superTabIndicatorComponentCss = ":host{display:block;height:var(--st-indicator-height, 2px);width:100px;background:var(--st-indicator-color, var(--ion-color-contrast, white));position:absolute;pointer-events:none;-ms-touch-action:none;touch-action:none;left:0;-webkit-transform-origin:0;transform-origin:0;-webkit-transform:translate3d(var(--st-indicator-position-x, 0), 0, 0) scale3d(var(--st-indicator-scale-x, 0), 1, 1);transform:translate3d(var(--st-indicator-position-x, 0), 0, 0) scale3d(var(--st-indicator-scale-x, 0), 1, 1);-webkit-transition:-webkit-transform var(--st-indicator-transition-duration, 300ms) cubic-bezier(0.4, 0, 0.2, 1);transition:-webkit-transform var(--st-indicator-transition-duration, 300ms) cubic-bezier(0.4, 0, 0.2, 1);transition:transform var(--st-indicator-transition-duration, 300ms) cubic-bezier(0.4, 0, 0.2, 1);transition:transform var(--st-indicator-transition-duration, 300ms) cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform var(--st-indicator-transition-duration, 300ms) cubic-bezier(0.4, 0, 0.2, 1);will-change:transform;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-order:-1;order:-1;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);-webkit-font-smoothing:antialiased}:host(.indicator-pointer):after{background-image:none;content:\"\";position:absolute;top:100%;left:0;right:0;width:0;height:0;border-bottom:solid 5px var(--st-indicator-color, var(--ion-color-contrast, white));border-left:solid 5px transparent;border-right:solid 5px transparent;margin:-5px auto 0}";

const SuperTabIndicatorComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        return (index.h(index.Host, { style: style, className: this.showPointer ? 'indicator-pointer' : '' }));
    }
};
SuperTabIndicatorComponent.style = superTabIndicatorComponentCss;

exports.super_tab_indicator = SuperTabIndicatorComponent;
