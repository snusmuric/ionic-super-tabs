const t={dragThreshold:10,allowElementScroll:!1,maxDragAngle:40,sideMenuThreshold:50,transitionDuration:300,shortSwipeDuration:300,debug:!1,avoidElements:!1};function r(t){if(t){const r=t.changedTouches;if(r&&r.length>0){const t=r[0];return{x:t.clientX,y:t.clientY}}if(void 0!==t.pageX)return{x:t.pageX,y:t.pageY}}return{x:0,y:0}}const n=()=>window.performance&&window.performance.now?window.performance.now():Date.now();function o(t,r,n,o,a){const e=(i=Math.min(1,(o-n)/a))<.5?4*i*i*i:(i-1)*(2*i-2)*(2*i-2)+1;var i;return Math.ceil(e*(r-t)+t)}const a=(t,r,a,e=300)=>{e<=0?requestAnimationFrame(()=>{t.scrollTo(r,a)}):requestAnimationFrame(()=>{const i=t.scrollLeft,s=t.scrollTop,d=n();!function t(r,a,e,i,s,d,u){const c=n(),f=a===i?i:o(a,i,d,c,u),p=e===s?s:o(e,s,d,c,u);r.scrollTo(f,p),c-d>=u||requestAnimationFrame(()=>{t(r,a,e,i,s,d,u)})}(t,i,s,r,a,d,e)})};function e(t,r,n){if(!r)return!1;const o=n.maxDragAngle*(Math.PI/180),a=Math.cos(o),e=t.x-r.x,i=t.y-r.y;if(Math.sqrt(e*e+i*i)>=n.dragThreshold){const t=Math.atan2(i,e),r=Math.cos(t);return Math.abs(r)>a}return!1}function i(t,r){return t.scrollLeft+("number"==typeof r?r:0)}function s(t,r){const n=t.scrollWidth-t.clientWidth;let o=i(t,r);return o=Math.max(0,Math.min(n,o)),o}function d(t,r,n){t&&t.debug&&console.log("%csuper-tabs %c%s","background: linear-gradient(135deg,#4150b2,#f71947); border: 1px solid #9a9a9a; color: #ffffff; border-bottom-left-radius: 2px; border-top-left-radius: 2px; padding: 2px 0 2px 4px;","background: #252b3e; border: 1px solid #9a9a9a; border-top-right-radius: 2px; border-bottom-right-radius: 2px; margin-left: -2px; padding: 2px 4px; color: white;"," ".repeat(10-r.length)+r,...n)}export{t as D,s as a,n as b,e as c,d,i as g,r as p,a as s}