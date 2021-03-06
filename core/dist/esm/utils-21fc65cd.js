const DEFAULT_CONFIG = {
    dragThreshold: 10,
    allowElementScroll: false,
    maxDragAngle: 40,
    sideMenuThreshold: 50,
    transitionDuration: 300,
    shortSwipeDuration: 300,
    debug: false,
    avoidElements: false,
};
function pointerCoord(ev) {
    // get X coordinates for either a mouse click
    // or a touch depending on the given event
    if (ev) {
        const changedTouches = ev.changedTouches;
        if (changedTouches && changedTouches.length > 0) {
            const touch = changedTouches[0];
            return { x: touch.clientX, y: touch.clientY };
        }
        if (ev.pageX !== undefined) {
            return { x: ev.pageX, y: ev.pageY };
        }
    }
    return { x: 0, y: 0 };
}
const getTs = () => window.performance && window.performance.now ? window.performance.now() : Date.now();
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
function getScrollCoord(start, dest, startTime, currentTime, duration) {
    const time = Math.min(1, (currentTime - startTime) / duration);
    const timeFn = easeInOutCubic(time);
    return Math.ceil((timeFn * (dest - start)) + start);
}
function scroll(el, startX, startY, x, y, startTime, duration) {
    const currentTime = getTs();
    const scrollX = startX === x ? x : getScrollCoord(startX, x, startTime, currentTime, duration);
    const scrollY = startY === y ? y : getScrollCoord(startY, y, startTime, currentTime, duration);
    el.scrollTo(scrollX, scrollY);
    if (currentTime - startTime >= duration) {
        return;
    }
    requestAnimationFrame(() => {
        scroll(el, startX, startY, x, y, startTime, duration);
    });
}
const scrollEl = (el, x, y, duration = 300) => {
    if (duration <= 0) {
        requestAnimationFrame(() => {
            el.scrollTo(x, y);
        });
        return;
    }
    requestAnimationFrame(() => {
        const startX = el.scrollLeft;
        const startY = el.scrollTop;
        const now = getTs();
        scroll(el, startX, startY, x, y, now, duration);
    });
};
function checkGesture(newCoords, initialCoords, config) {
    if (!initialCoords) {
        return false;
    }
    const radians = config.maxDragAngle * (Math.PI / 180);
    const maxCosine = Math.cos(radians);
    const deltaX = newCoords.x - initialCoords.x;
    const deltaY = newCoords.y - initialCoords.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance >= config.dragThreshold) {
        // swipe is long enough
        // lets check the angle
        const angle = Math.atan2(deltaY, deltaX);
        const cosine = Math.cos(angle);
        return Math.abs(cosine) > maxCosine;
    }
    return false;
}
function getScrollX(el, delta) {
    return el.scrollLeft + (typeof delta === 'number' ? delta : 0);
}
function getNormalizedScrollX(el, delta) {
    const minX = 0;
    const maxX = el.scrollWidth - el.clientWidth;
    let scrollX = getScrollX(el, delta);
    scrollX = Math.max(minX, Math.min(maxX, scrollX));
    return scrollX;
}
const debugStyle1 = 'background: linear-gradient(135deg,#4150b2,#f71947); border: 1px solid #9a9a9a; color: #ffffff; border-bottom-left-radius: 2px; border-top-left-radius: 2px; padding: 2px 0 2px 4px;';
const debugStyle2 = 'background: #252b3e; border: 1px solid #9a9a9a; border-top-right-radius: 2px; border-bottom-right-radius: 2px; margin-left: -2px; padding: 2px 4px; color: white;';
function debugLog(config, tag, vals) {
    if (!config || !config.debug) {
        return;
    }
    // Some gorgeous logging, because apparently I have lots of free time to style console logs and write this comment
    console.log(`%csuper-tabs %c%s`, debugStyle1, debugStyle2, ' '.repeat(10 - tag.length) + tag, ...vals);
}

export { DEFAULT_CONFIG as D, getNormalizedScrollX as a, getTs as b, checkGesture as c, debugLog as d, getScrollX as g, pointerCoord as p, scrollEl as s };
