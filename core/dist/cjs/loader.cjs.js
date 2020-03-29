'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7da53ae9.js');

const defineCustomElements = (win, options) => index.patchEsm().then(() => {
  return index.bootstrapLazy([["super-tab-indicator.cjs",[[1,"super-tab-indicator",{"toolbarPosition":[1,"toolbar-position"],"showPointer":[4,"show-pointer"]}]]],["super-tab-button_2.cjs",[[1,"super-tabs-toolbar",{"config":[1040],"showIndicator":[4,"show-indicator"],"showPointer":[4,"show-pointer"],"color":[1],"scrollable":[516],"scrollablePadding":[516,"scrollable-padding"],"buttons":[32],"setActiveTab":[64],"setSelectedTab":[64],"moveContainer":[64]},[[0,"click","onClick"],[1,"touchstart","onTouchStart"],[3,"touchmove","onTouchMove"],[2,"touchend","onTouchEnd"]]],[1,"super-tab-button",{"active":[516],"index":[514],"disabled":[516],"scrollableContainer":[4,"scrollable-container"],"label":[32],"icon":[32]}]]],["super-tab_3.cjs",[[1,"super-tab",{"noScroll":[516,"no-scroll"],"getRootScrollableEl":[64]}],[1,"super-tabs",{"config":[16],"activeTabIndex":[1538,"active-tab-index"],"setConfig":[64],"selectTab":[64]},[[9,"resize","onWindowResize"]]],[1,"super-tabs-container",{"config":[1040],"swipeEnabled":[4,"swipe-enabled"],"autoScrollTop":[4,"auto-scroll-top"],"tabs":[32],"reindexTabs":[64],"moveContainerByIndex":[64],"moveContainer":[64],"setActiveTabIndex":[64],"scrollToTop":[64]},[[1,"touchstart","onTouchStart"],[2,"click","onClick"],[3,"touchmove","onTouchMove"],[2,"touchend","onTouchEnd"]]]]]], options);
});

exports.defineCustomElements = defineCustomElements;
