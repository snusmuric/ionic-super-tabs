import { ComponentInterface, EventEmitter, QueueApi } from '../stencil-public-runtime';
import { SuperTabsConfig } from '../interface';
export declare class SuperTabsContainerComponent implements ComponentInterface {
    el: HTMLSuperTabsContainerElement;
    /** @internal */
    config?: SuperTabsConfig;
    /** @internal */
    queue: QueueApi;
    /**
     * Enable/disable swiping
     */
    swipeEnabled: boolean;
    /**
     * Set to true to automatically scroll to the top of the tab when the button is clicked while the tab is
     * already selected.
     */
    autoScrollTop: boolean;
    /**
     * Emits an event when the active tab changes.
     * An active tab is the tab that the user looking at.
     *
     * This event emitter will not notify you if the user has changed the current active tab.
     * If you need that information, you should use the `tabChange` event emitted by the `super-tabs` element.
     */
    activeTabIndexChange: EventEmitter<number>;
    /**
     * Emits events when the container moves.
     * Selected tab index represents what the user should be seeing.
     * If you receive a decimal as the emitted number, it means that the container is moving between tabs.
     * This number is used for animations, and can be used for high tab customizations.
     */
    selectedTabIndexChange: EventEmitter<number>;
    tabs: HTMLSuperTabElement[];
    private initialCoords;
    private lastPosX;
    private isDragging;
    private initialTimestamp?;
    private _activeTabIndex;
    private _selectedTabIndex?;
    private leftThreshold;
    private rightThreshold;
    private scrollWidth;
    private clientWidth;
    private slot;
    private ready?;
    componentDidLoad(): Promise<void>;
    private onSlotChange;
    componentWillUpdate(): Promise<void>;
    /**
     * @internal
     */
    reindexTabs(): Promise<void>;
    /**
     * @internal
     *
     * Moves the container to align with the specified tab index
     * @param index {number} Index of the tab
     * @param animate {boolean} Whether to animate the transition
     */
    moveContainerByIndex(index: number, animate?: boolean): Promise<void>;
    /**
     * @internal
     *
     * Sets the scrollLeft property of the container
     * @param scrollX {number}
     * @param animate {boolean}
     */
    moveContainer(scrollX: number, animate?: boolean): Promise<void>;
    /** @internal */
    setActiveTabIndex(index: number, moveContainer?: boolean, animate?: boolean): Promise<void>;
    /**
     * Scroll the active tab to the top.
     */
    scrollToTop(): Promise<void>;
    private updateActiveTabIndex;
    private updateSelectedTabIndex;
    onTouchStart(ev: TouchEvent): Promise<void>;
    onClick(ev: TouchEvent): Promise<void>;
    onTouchMove(ev: TouchEvent): Promise<void>;
    onTouchEnd(ev: TouchEvent): Promise<void>;
    private indexTabs;
    private calcSelectedTab;
    private positionToIndex;
    private indexToPosition;
    private normalizeSelectedTab;
    /**
     * Internal method to output values in debug mode.
     */
    private debug;
    render(): any;
}
