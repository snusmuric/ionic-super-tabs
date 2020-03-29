/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { SuperTabChangeEventDetail, SuperTabsConfig, } from "./interface";
export namespace Components {
    interface SuperTab {
        /**
          * Returns the root scrollable element
         */
        "getRootScrollableEl": () => Promise<HTMLElement | null>;
        /**
          * Set this to true to prevent vertical scrolling of this tab. Defaults to `false`.  This property will automatically be set to true if there is a direct child element of `ion-content`. To override this behaviour make sure to explicitly set this property to `false`.
         */
        "noScroll": boolean;
    }
    interface SuperTabButton {
        "active"?: boolean;
        /**
          * Whether the button is disabled
         */
        "disabled"?: boolean;
        "index"?: number;
        "scrollableContainer": boolean;
    }
    interface SuperTabIndicator {
        "showPointer": boolean;
        /**
          * Toolbar position This determines the position of the indicator
         */
        "toolbarPosition": "top" | "bottom";
    }
    interface SuperTabs {
        /**
          * Initial active tab index. Defaults to `0`.
          * @type {number}
         */
        "activeTabIndex": number;
        /**
          * Global Super Tabs configuration.  This is the only place you need to configure the components. Any changes to this input will propagate to child components.
          * @type {SuperTabsConfig}
         */
        "config"?: SuperTabsConfig;
        /**
          * Set the selected tab. This will move the container and the toolbar to the selected tab.
          * @param index the index of the tab you want to select
          * @param animate whether you want to animate the transition
         */
        "selectTab": (index: number, animate?: boolean) => Promise<void>;
        /**
          * Set/update the configuration
          * @param config Configuration object
         */
        "setConfig": (config: SuperTabsConfig) => Promise<void>;
    }
    interface SuperTabsContainer {
        /**
          * Set to true to automatically scroll to the top of the tab when the button is clicked while the tab is already selected.
         */
        "autoScrollTop": boolean;
        "config"?: SuperTabsConfig;
        /**
          * @param scrollX
          * @param animate
         */
        "moveContainer": (scrollX: number, animate?: boolean | undefined) => Promise<void>;
        /**
          * @param index Index of the tab
          * @param animate Whether to animate the transition
         */
        "moveContainerByIndex": (index: number, animate?: boolean | undefined) => Promise<void>;
        "reindexTabs": () => Promise<void>;
        /**
          * Scroll the active tab to the top.
         */
        "scrollToTop": () => Promise<void>;
        "setActiveTabIndex": (index: number, moveContainer?: boolean, animate?: boolean) => Promise<void>;
        /**
          * Enable/disable swiping
         */
        "swipeEnabled": boolean;
    }
    interface SuperTabsToolbar {
        /**
          * Background color. Defaults to `'primary'`
         */
        "color": string | undefined;
        "config"?: SuperTabsConfig;
        "moveContainer": (scrollX: number, animate?: boolean | undefined) => Promise<void>;
        /**
          * Whether the toolbar is scrollable. Defaults to `false`.
         */
        "scrollable": boolean;
        /**
          * If scrollable is set to true, there will be an added padding to the left of the buttons.  Setting this property to false will remove that padding.  The padding is also configurable via a CSS variable.
         */
        "scrollablePadding": boolean;
        "setActiveTab": (index: number, align?: boolean | undefined, animate?: boolean | undefined) => Promise<void>;
        "setSelectedTab": (index: number, animate?: boolean | undefined) => Promise<void>;
        /**
          * Whether to show the indicator. Defaults to `true`
         */
        "showIndicator": boolean;
        "showPointer": boolean;
    }
}
declare global {
    interface HTMLSuperTabElement extends Components.SuperTab, HTMLStencilElement {
    }
    var HTMLSuperTabElement: {
        prototype: HTMLSuperTabElement;
        new (): HTMLSuperTabElement;
    };
    interface HTMLSuperTabButtonElement extends Components.SuperTabButton, HTMLStencilElement {
    }
    var HTMLSuperTabButtonElement: {
        prototype: HTMLSuperTabButtonElement;
        new (): HTMLSuperTabButtonElement;
    };
    interface HTMLSuperTabIndicatorElement extends Components.SuperTabIndicator, HTMLStencilElement {
    }
    var HTMLSuperTabIndicatorElement: {
        prototype: HTMLSuperTabIndicatorElement;
        new (): HTMLSuperTabIndicatorElement;
    };
    interface HTMLSuperTabsElement extends Components.SuperTabs, HTMLStencilElement {
    }
    var HTMLSuperTabsElement: {
        prototype: HTMLSuperTabsElement;
        new (): HTMLSuperTabsElement;
    };
    interface HTMLSuperTabsContainerElement extends Components.SuperTabsContainer, HTMLStencilElement {
    }
    var HTMLSuperTabsContainerElement: {
        prototype: HTMLSuperTabsContainerElement;
        new (): HTMLSuperTabsContainerElement;
    };
    interface HTMLSuperTabsToolbarElement extends Components.SuperTabsToolbar, HTMLStencilElement {
    }
    var HTMLSuperTabsToolbarElement: {
        prototype: HTMLSuperTabsToolbarElement;
        new (): HTMLSuperTabsToolbarElement;
    };
    interface HTMLElementTagNameMap {
        "super-tab": HTMLSuperTabElement;
        "super-tab-button": HTMLSuperTabButtonElement;
        "super-tab-indicator": HTMLSuperTabIndicatorElement;
        "super-tabs": HTMLSuperTabsElement;
        "super-tabs-container": HTMLSuperTabsContainerElement;
        "super-tabs-toolbar": HTMLSuperTabsToolbarElement;
    }
}
declare namespace LocalJSX {
    interface SuperTab {
        /**
          * Set this to true to prevent vertical scrolling of this tab. Defaults to `false`.  This property will automatically be set to true if there is a direct child element of `ion-content`. To override this behaviour make sure to explicitly set this property to `false`.
         */
        "noScroll": boolean;
    }
    interface SuperTabButton {
        /**
          * Whether the button is disabled
         */
        "disabled"?: boolean;
    }
    interface SuperTabIndicator {
        "showPointer"?: boolean;
        /**
          * Toolbar position This determines the position of the indicator
         */
        "toolbarPosition"?: "top" | "bottom";
    }
    interface SuperTabs {
        /**
          * Initial active tab index. Defaults to `0`.
          * @type {number}
         */
        "activeTabIndex"?: number;
        /**
          * Global Super Tabs configuration.  This is the only place you need to configure the components. Any changes to this input will propagate to child components.
          * @type {SuperTabsConfig}
         */
        "config"?: SuperTabsConfig;
        /**
          * Tab change event.  This event fires up when a tab button is clicked, or when a user swipes between tabs.  The event will fire even if the tab did not change, you can check if the tab changed by checking the `changed` property in the event detail.
         */
        "onTabChange"?: (event: CustomEvent<SuperTabChangeEventDetail>) => void;
    }
    interface SuperTabsContainer {
        /**
          * Set to true to automatically scroll to the top of the tab when the button is clicked while the tab is already selected.
         */
        "autoScrollTop"?: boolean;
        /**
          * Emits an event when the active tab changes. An active tab is the tab that the user looking at.  This event emitter will not notify you if the user has changed the current active tab. If you need that information, you should use the `tabChange` event emitted by the `super-tabs` element.
         */
        "onActiveTabIndexChange"?: (event: CustomEvent<number>) => void;
        /**
          * Emits events when the container moves. Selected tab index represents what the user should be seeing. If you receive a decimal as the emitted number, it means that the container is moving between tabs. This number is used for animations, and can be used for high tab customizations.
         */
        "onSelectedTabIndexChange"?: (event: CustomEvent<number>) => void;
        /**
          * Enable/disable swiping
         */
        "swipeEnabled"?: boolean;
    }
    interface SuperTabsToolbar {
        /**
          * Background color. Defaults to `'primary'`
         */
        "color"?: string | undefined;
        /**
          * Emits an event when a button is clicked Event data contains the clicked SuperTabButton component
         */
        "onButtonClick"?: (event: CustomEvent<HTMLSuperTabButtonElement>) => void;
        /**
          * Whether the toolbar is scrollable. Defaults to `false`.
         */
        "scrollable"?: boolean;
        /**
          * If scrollable is set to true, there will be an added padding to the left of the buttons.  Setting this property to false will remove that padding.  The padding is also configurable via a CSS variable.
         */
        "scrollablePadding"?: boolean;
        /**
          * Whether to show the indicator. Defaults to `true`
         */
        "showIndicator"?: boolean;
        "showPointer"?: boolean;
    }
    interface IntrinsicElements {
        "super-tab": SuperTab;
        "super-tab-button": SuperTabButton;
        "super-tab-indicator": SuperTabIndicator;
        "super-tabs": SuperTabs;
        "super-tabs-container": SuperTabsContainer;
        "super-tabs-toolbar": SuperTabsToolbar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "super-tab": LocalJSX.SuperTab & JSXBase.HTMLAttributes<HTMLSuperTabElement>;
            "super-tab-button": LocalJSX.SuperTabButton & JSXBase.HTMLAttributes<HTMLSuperTabButtonElement>;
            "super-tab-indicator": LocalJSX.SuperTabIndicator & JSXBase.HTMLAttributes<HTMLSuperTabIndicatorElement>;
            "super-tabs": LocalJSX.SuperTabs & JSXBase.HTMLAttributes<HTMLSuperTabsElement>;
            "super-tabs-container": LocalJSX.SuperTabsContainer & JSXBase.HTMLAttributes<HTMLSuperTabsContainerElement>;
            "super-tabs-toolbar": LocalJSX.SuperTabsToolbar & JSXBase.HTMLAttributes<HTMLSuperTabsToolbarElement>;
        }
    }
}
