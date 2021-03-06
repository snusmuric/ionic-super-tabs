/* eslint-disable */
/* tslint:disable */
import { fromEvent } from 'rxjs';
export const proxyInputs = (Cmp, inputs) => {
    const Prototype = Cmp.prototype;
    inputs.forEach(item => {
        Object.defineProperty(Prototype, item, {
            get() {
                return this.el[item];
            },
            set(val) {
                this.z.runOutsideAngular(() => (this.el[item] = val));
            }
        });
    });
};
export const proxyMethods = (Cmp, methods) => {
    const Prototype = Cmp.prototype;
    methods.forEach(methodName => {
        Prototype[methodName] = function () {
            const args = arguments;
            return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
        };
    });
};
export const proxyOutputs = (instance, el, events) => {
    events.forEach(eventName => instance[eventName] = fromEvent(el, eventName));
};
export function ProxyCmp(opts) {
    const decorator = function (cls) {
        if (opts.inputs) {
            proxyInputs(cls, opts.inputs);
        }
        if (opts.methods) {
            proxyMethods(cls, opts.methods);
        }
        return cls;
    };
    return decorator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJveGllcy11dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bpb25pYy1zdXBlci10YWJzL2FuZ3VsYXIvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3Byb3hpZXMtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpDLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQVEsRUFBRSxNQUFnQixFQUFFLEVBQUU7SUFDeEQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUNoQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRTtZQUNyQyxHQUFHO2dCQUNILE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixDQUFDO1lBQ0QsR0FBRyxDQUFDLEdBQVE7Z0JBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN0RCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxHQUFRLEVBQUUsT0FBaUIsRUFBRSxFQUFFO0lBQzFELE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFDaEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM3QixTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUc7WUFDdEIsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FDckMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FDdkMsQ0FBQztRQUNKLENBQUMsQ0FBQztJQUNGLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUMsUUFBYSxFQUFFLEVBQU8sRUFBRSxNQUFnQixFQUFFLEVBQUU7SUFDdkUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFDOUUsQ0FBQyxDQUFBO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxJQUFxQztJQUM1RCxNQUFNLFNBQVMsR0FBSSxVQUFTLEdBQVE7UUFDcEMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDL0I7UUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakM7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNYLENBQUMsQ0FBQztJQUNGLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY29uc3QgcHJveHlJbnB1dHMgPSAoQ21wOiBhbnksIGlucHV0czogc3RyaW5nW10pID0+IHtcbiAgY29uc3QgUHJvdG90eXBlID0gQ21wLnByb3RvdHlwZTtcbiAgaW5wdXRzLmZvckVhY2goaXRlbSA9PiB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShQcm90b3R5cGUsIGl0ZW0sIHtcbiAgICBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxbaXRlbV07XG4gICAgfSxcbiAgICBzZXQodmFsOiBhbnkpIHtcbiAgICB0aGlzLnoucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gKHRoaXMuZWxbaXRlbV0gPSB2YWwpKTtcbiAgICB9XG4gIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcm94eU1ldGhvZHMgPSAoQ21wOiBhbnksIG1ldGhvZHM6IHN0cmluZ1tdKSA9PiB7XG4gIGNvbnN0IFByb3RvdHlwZSA9IENtcC5wcm90b3R5cGU7XG4gIG1ldGhvZHMuZm9yRWFjaChtZXRob2ROYW1lID0+IHtcbiAgUHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIHRoaXMuei5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxuICAgIHRoaXMuZWxbbWV0aG9kTmFtZV0uYXBwbHkodGhpcy5lbCwgYXJncylcbiAgICApO1xuICB9O1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcm94eU91dHB1dHMgPSAoaW5zdGFuY2U6IGFueSwgZWw6IGFueSwgZXZlbnRzOiBzdHJpbmdbXSkgPT4ge1xuICBldmVudHMuZm9yRWFjaChldmVudE5hbWUgPT4gaW5zdGFuY2VbZXZlbnROYW1lXSA9IGZyb21FdmVudChlbCwgZXZlbnROYW1lKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQcm94eUNtcChvcHRzOiB7IGlucHV0cz86IGFueTsgbWV0aG9kcz86IGFueSB9KSB7XG4gIGNvbnN0IGRlY29yYXRvciA9ICBmdW5jdGlvbihjbHM6IGFueSl7XG4gIGlmIChvcHRzLmlucHV0cykge1xuICAgIHByb3h5SW5wdXRzKGNscywgb3B0cy5pbnB1dHMpO1xuICB9XG4gIGlmIChvcHRzLm1ldGhvZHMpIHtcbiAgICBwcm94eU1ldGhvZHMoY2xzLCBvcHRzLm1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBjbHM7XG4gIH07XG4gIHJldHVybiBkZWNvcmF0b3I7XG59XG4iXX0=