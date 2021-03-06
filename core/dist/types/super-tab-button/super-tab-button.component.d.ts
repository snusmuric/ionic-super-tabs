import { ComponentInterface } from '../stencil-public-runtime';
export declare class SuperTabButtonComponent implements ComponentInterface {
    el: HTMLSuperTabButtonElement;
    /** @internal */
    active?: boolean;
    /** @internal */
    index?: number;
    /**
     * Whether the button is disabled
     */
    disabled?: boolean;
    /** @internal */
    scrollableContainer: boolean;
    label: HTMLElement | null;
    icon: HTMLElement | null;
    private retryAttempts;
    componentDidLoad(): void;
    private initCmp;
    private indexChildren;
    render(): any;
}
