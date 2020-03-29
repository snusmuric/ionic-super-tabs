import * as tslib_1 from "tslib";
/* eslint-disable */
/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from "@angular/core";
import { ProxyCmp, proxyOutputs } from "./proxies-utils";
var SuperTab = /** @class */ (function () {
    function SuperTab(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    SuperTab.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    SuperTab = tslib_1.__decorate([
        ProxyCmp({ inputs: ["noScroll"], "methods": ["getRootScrollableEl"] }),
        Component({ selector: "super-tab", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["noScroll"] })
    ], SuperTab);
    return SuperTab;
}());
export { SuperTab };
var SuperTabButton = /** @class */ (function () {
    function SuperTabButton(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    SuperTabButton.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    SuperTabButton = tslib_1.__decorate([
        ProxyCmp({ inputs: ["disabled"] }),
        Component({ selector: "super-tab-button", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["disabled"] })
    ], SuperTabButton);
    return SuperTabButton;
}());
export { SuperTabButton };
var SuperTabs = /** @class */ (function () {
    function SuperTabs(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["tabChange"]);
    }
    SuperTabs.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    SuperTabs = tslib_1.__decorate([
        ProxyCmp({ inputs: ["activeTabIndex", "config"], "methods": ["setConfig", "selectTab"] }),
        Component({ selector: "super-tabs", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["activeTabIndex", "config"] })
    ], SuperTabs);
    return SuperTabs;
}());
export { SuperTabs };
var SuperTabsContainer = /** @class */ (function () {
    function SuperTabsContainer(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["activeTabIndexChange", "selectedTabIndexChange"]);
    }
    SuperTabsContainer.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    SuperTabsContainer = tslib_1.__decorate([
        ProxyCmp({ inputs: ["autoScrollTop", "swipeEnabled"], "methods": ["scrollToTop"] }),
        Component({ selector: "super-tabs-container", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["autoScrollTop", "swipeEnabled"] })
    ], SuperTabsContainer);
    return SuperTabsContainer;
}());
export { SuperTabsContainer };
var SuperTabsToolbar = /** @class */ (function () {
    function SuperTabsToolbar(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ["buttonClick"]);
    }
    SuperTabsToolbar.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    SuperTabsToolbar = tslib_1.__decorate([
        ProxyCmp({ inputs: ["color", "scrollable", "scrollablePadding", "showIndicator", "showPointer"] }),
        Component({ selector: "super-tabs-toolbar", changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>", inputs: ["color", "scrollable", "scrollablePadding", "showIndicator", "showPointer"] })
    ], SuperTabsToolbar);
    return SuperTabsToolbar;
}());
export { SuperTabsToolbar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveGllcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bpb25pYy1zdXBlci10YWJzL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3Byb3hpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9CQUFvQjtBQUNwQixvQkFBb0I7QUFDcEIsOENBQThDO0FBQzlDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU16RDtJQUVJLGtCQUFZLENBQW9CLEVBQUUsQ0FBYSxFQUFZLENBQVM7UUFBVCxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQ2hFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNYLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDOztnQkFIYyxpQkFBaUI7Z0JBQUssVUFBVTtnQkFBZSxNQUFNOztJQUYzRCxRQUFRO1FBRnBCLFFBQVEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQztRQUN0RSxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLDJCQUEyQixFQUFFLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7T0FDdEksUUFBUSxDQU1wQjtJQUFELGVBQUM7Q0FBQSxBQU5ELElBTUM7U0FOWSxRQUFRO0FBV3JCO0lBRUksd0JBQVksQ0FBb0IsRUFBRSxDQUFhLEVBQVksQ0FBUztRQUFULE1BQUMsR0FBRCxDQUFDLENBQVE7UUFDaEUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FB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RSxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGVBQWUsRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDO1FBQ2xHLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGVBQWUsRUFBRSxhQUFhLENBQUMsRUFBRSxDQUFDO09BQy9NLGdCQUFnQixDQVE1QjtJQUFELHVCQUFDO0NBQUEsQUFSRCxJQVFDO1NBUlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qIHRzbGludDpkaXNhYmxlICovXG4vKiBhdXRvLWdlbmVyYXRlZCBhbmd1bGFyIGRpcmVjdGl2ZSBwcm94aWVzICovXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUHJveHlDbXAsIHByb3h5T3V0cHV0cyB9IGZyb20gXCIuL3Byb3hpZXMtdXRpbHNcIjtcbmltcG9ydCB7IENvbXBvbmVudHMgfSBmcm9tIFwiQGlvbmljLXN1cGVyLXRhYnMvY29yZVwiO1xuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFN1cGVyVGFiIGV4dGVuZHMgQ29tcG9uZW50cy5TdXBlclRhYiB7XG59XG5AUHJveHlDbXAoeyBpbnB1dHM6IFtcIm5vU2Nyb2xsXCJdLCBcIm1ldGhvZHNcIjogW1wiZ2V0Um9vdFNjcm9sbGFibGVFbFwiXSB9KVxuQENvbXBvbmVudCh7IHNlbGVjdG9yOiBcInN1cGVyLXRhYlwiLCBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCwgdGVtcGxhdGU6IFwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlwiLCBpbnB1dHM6IFtcIm5vU2Nyb2xsXCJdIH0pXG5leHBvcnQgY2xhc3MgU3VwZXJUYWIge1xuICAgIHByb3RlY3RlZCBlbDogSFRNTEVsZW1lbnQ7XG4gICAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICAgICAgYy5kZXRhY2goKTtcbiAgICAgICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgICB9XG59XG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgU3VwZXJUYWJCdXR0b24gZXh0ZW5kcyBDb21wb25lbnRzLlN1cGVyVGFiQnV0dG9uIHtcbn1cbkBQcm94eUNtcCh7IGlucHV0czogW1wiZGlzYWJsZWRcIl0gfSlcbkBDb21wb25lbnQoeyBzZWxlY3RvcjogXCJzdXBlci10YWItYnV0dG9uXCIsIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLCB0ZW1wbGF0ZTogXCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XCIsIGlucHV0czogW1wiZGlzYWJsZWRcIl0gfSlcbmV4cG9ydCBjbGFzcyBTdXBlclRhYkJ1dHRvbiB7XG4gICAgcHJvdGVjdGVkIGVsOiBIVE1MRWxlbWVudDtcbiAgICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgICAgICBjLmRldGFjaCgpO1xuICAgICAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgIH1cbn1cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBTdXBlclRhYnMgZXh0ZW5kcyBDb21wb25lbnRzLlN1cGVyVGFicyB7XG59XG5AUHJveHlDbXAoeyBpbnB1dHM6IFtcImFjdGl2ZVRhYkluZGV4XCIsIFwiY29uZmlnXCJdLCBcIm1ldGhvZHNcIjogW1wic2V0Q29uZmlnXCIsIFwic2VsZWN0VGFiXCJdIH0pXG5AQ29tcG9uZW50KHsgc2VsZWN0b3I6IFwic3VwZXItdGFic1wiLCBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCwgdGVtcGxhdGU6IFwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlwiLCBpbnB1dHM6IFtcImFjdGl2ZVRhYkluZGV4XCIsIFwiY29uZmlnXCJdIH0pXG5leHBvcnQgY2xhc3MgU3VwZXJUYWJzIHtcbiAgICB0YWJDaGFuZ2UhOiBFdmVudEVtaXR0ZXI8Q3VzdG9tRXZlbnQ+O1xuICAgIHByb3RlY3RlZCBlbDogSFRNTEVsZW1lbnQ7XG4gICAgY29uc3RydWN0b3IoYzogQ2hhbmdlRGV0ZWN0b3JSZWYsIHI6IEVsZW1lbnRSZWYsIHByb3RlY3RlZCB6OiBOZ1pvbmUpIHtcbiAgICAgICAgYy5kZXRhY2goKTtcbiAgICAgICAgdGhpcy5lbCA9IHIubmF0aXZlRWxlbWVudDtcbiAgICAgICAgcHJveHlPdXRwdXRzKHRoaXMsIHRoaXMuZWwsIFtcInRhYkNoYW5nZVwiXSk7XG4gICAgfVxufVxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFN1cGVyVGFic0NvbnRhaW5lciBleHRlbmRzIENvbXBvbmVudHMuU3VwZXJUYWJzQ29udGFpbmVyIHtcbn1cbkBQcm94eUNtcCh7IGlucHV0czogW1wiYXV0b1Njcm9sbFRvcFwiLCBcInN3aXBlRW5hYmxlZFwiXSwgXCJtZXRob2RzXCI6IFtcInNjcm9sbFRvVG9wXCJdIH0pXG5AQ29tcG9uZW50KHsgc2VsZWN0b3I6IFwic3VwZXItdGFicy1jb250YWluZXJcIiwgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsIHRlbXBsYXRlOiBcIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cIiwgaW5wdXRzOiBbXCJhdXRvU2Nyb2xsVG9wXCIsIFwic3dpcGVFbmFibGVkXCJdIH0pXG5leHBvcnQgY2xhc3MgU3VwZXJUYWJzQ29udGFpbmVyIHtcbiAgICBhY3RpdmVUYWJJbmRleENoYW5nZSE6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudD47XG4gICAgc2VsZWN0ZWRUYWJJbmRleENoYW5nZSE6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudD47XG4gICAgcHJvdGVjdGVkIGVsOiBIVE1MRWxlbWVudDtcbiAgICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgICAgICBjLmRldGFjaCgpO1xuICAgICAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgICAgICBwcm94eU91dHB1dHModGhpcywgdGhpcy5lbCwgW1wiYWN0aXZlVGFiSW5kZXhDaGFuZ2VcIiwgXCJzZWxlY3RlZFRhYkluZGV4Q2hhbmdlXCJdKTtcbiAgICB9XG59XG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgU3VwZXJUYWJzVG9vbGJhciBleHRlbmRzIENvbXBvbmVudHMuU3VwZXJUYWJzVG9vbGJhciB7XG59XG5AUHJveHlDbXAoeyBpbnB1dHM6IFtcImNvbG9yXCIsIFwic2Nyb2xsYWJsZVwiLCBcInNjcm9sbGFibGVQYWRkaW5nXCIsIFwic2hvd0luZGljYXRvclwiLCBcInNob3dQb2ludGVyXCJdIH0pXG5AQ29tcG9uZW50KHsgc2VsZWN0b3I6IFwic3VwZXItdGFicy10b29sYmFyXCIsIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLCB0ZW1wbGF0ZTogXCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XCIsIGlucHV0czogW1wiY29sb3JcIiwgXCJzY3JvbGxhYmxlXCIsIFwic2Nyb2xsYWJsZVBhZGRpbmdcIiwgXCJzaG93SW5kaWNhdG9yXCIsIFwic2hvd1BvaW50ZXJcIl0gfSlcbmV4cG9ydCBjbGFzcyBTdXBlclRhYnNUb29sYmFyIHtcbiAgICBidXR0b25DbGljayE6IEV2ZW50RW1pdHRlcjxDdXN0b21FdmVudD47XG4gICAgcHJvdGVjdGVkIGVsOiBIVE1MRWxlbWVudDtcbiAgICBjb25zdHJ1Y3RvcihjOiBDaGFuZ2VEZXRlY3RvclJlZiwgcjogRWxlbWVudFJlZiwgcHJvdGVjdGVkIHo6IE5nWm9uZSkge1xuICAgICAgICBjLmRldGFjaCgpO1xuICAgICAgICB0aGlzLmVsID0gci5uYXRpdmVFbGVtZW50O1xuICAgICAgICBwcm94eU91dHB1dHModGhpcywgdGhpcy5lbCwgW1wiYnV0dG9uQ2xpY2tcIl0pO1xuICAgIH1cbn1cbiJdfQ==