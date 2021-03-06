import { ComponentInterface, EventEmitter } from '../stencil-public-runtime';
import { SuperTabChangeEventDetail, SuperTabsConfig } from '../interface';
/**
 * Root component that controls the other super-tab components.
 *
 * This component propagates configuration over to children and keeps track of the tabs state.
 */
export declare class SuperTabsComponent implements ComponentInterface {
    el: HTMLSuperTabsElement;
    /**
     * Tab change event.
     *
     * This event fires up when a tab button is clicked, or when a user swipes between tabs.
     *
     * The event will fire even if the tab did not change, you can check if the tab changed by checking the `changed`
     * property in the event detail.
     */
    tabChange: EventEmitter<SuperTabChangeEventDetail>;
    /**
     * Global Super Tabs configuration.
     *
     * This is the only place you need to configure the components. Any changes to this input will propagate to child
     * components.
     *
     * @type {SuperTabsConfig}
     */
    config?: SuperTabsConfig;
    /**
     * Initial active tab index.
     * Defaults to `0`.
     *
     * @type {number}
     */
    activeTabIndex: number;
    private container;
    private toolbar;
    private _config;
    private initAttempts;
    private initPromise;
    private initPromiseResolve;
    constructor();
    /**
     * Set/update the configuration
     * @param {SuperTabsConfig} config Configuration object
     */
    setConfig(config: SuperTabsConfig): Promise<void>;
    private propagateConfig;
    /**
     * Set the selected tab.
     * This will move the container and the toolbar to the selected tab.
     * @param index {number} the index of the tab you want to select
     * @param [animate=true] {boolean} whether you want to animate the transition
     */
    selectTab(index: number, animate?: boolean): Promise<void>;
    onConfigChange(config: SuperTabsConfig): Promise<void>;
    onWindowResize(): void;
    componentWillLoad(): Promise<void>;
    componentDidLoad(): void;
    private initComponent;
    /**
     * Setup event listeners to synchronize child components
     */
    private setupEventListeners;
    private onContainerSelectedTabChange;
    private emitTabChangeEvent;
    private onContainerActiveTabChange;
    private onToolbarButtonClick;
    private indexChildren;
    private onSlotchange;
    /**
     * Internal method to output values in debug mode.
     */
    private debug;
    render(): any;
}
