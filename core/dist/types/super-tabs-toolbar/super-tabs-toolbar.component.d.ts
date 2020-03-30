import { ComponentInterface, EventEmitter } from '../stencil-public-runtime';
import { SuperTabsConfig } from '../interface';
export declare class SuperTabsToolbarComponent implements ComponentInterface {
    el: HTMLSuperTabsToolbarElement;
    /** @internal */
    config?: SuperTabsConfig;
    /**
     * Whether to show the indicator. Defaults to `true`
     */
    showIndicator: boolean;
    showPointer: boolean;
    /**
     * Background color. Defaults to `'primary'`
     */
    color: string | undefined;
    /**
     * Whether the toolbar is scrollable. Defaults to `false`.
     */
    scrollable: boolean;
    /**
     * If scrollable is set to true, there will be an added padding
     * to the left of the buttons.
     *
     * Setting this property to false will remove that padding.
     *
     * The padding is also configurable via a CSS variable.
     */
    scrollablePadding: boolean;
    /**
     * Emits an event when a button is clicked
     * Event data contains the clicked SuperTabButton component
     */
    buttonClick: EventEmitter<HTMLSuperTabButtonElement>;
    buttons: HTMLSuperTabButtonElement[];
    private indicatorPosition;
    private indicatorWidth;
    private activeButton?;
    private activeTabIndex;
    private indicatorEl;
    private buttonsContainerEl;
    private initialCoords?;
    private lastPosX;
    private isDragging;
    private leftThreshold;
    private rightThreshold;
    private slot;
    private hostCls;
    private clientWidth;
    componentDidLoad(): Promise<void>;
    componentWillUpdate(): void;
    /** @internal */
    setActiveTab(index: number, align?: boolean, animate?: boolean): Promise<void>;
    /** @internal */
    setSelectedTab(index: number, animate?: boolean): Promise<void>;
    /** @internal */
    moveContainer(scrollX: number, animate?: boolean): Promise<void>;
    onClick(ev: any): void;
    onTouchStart(ev: TouchEvent): Promise<void>;
    onTouchMove(ev: TouchEvent): Promise<void>;
    onTouchEnd(): Promise<void>;
    onColorUpdate(): Promise<void>;
    private setHostCls;
    private onSlotChange;
    private queryButtons;
    private updateThresholds;
    private markButtonActive;
    private adjustContainerScroll;
    /**
     * Align the indicator with the selected button.
     * This will adjust the width and the position of the indicator element.
     * @param index {number} the active tab index
     * @param [animate] {boolean=false} whether to animate the transition
     */
    private alignIndicator;
    /**
     * Internal method to output values in debug mode.
     */
    private debug;
    render(): any;
}
