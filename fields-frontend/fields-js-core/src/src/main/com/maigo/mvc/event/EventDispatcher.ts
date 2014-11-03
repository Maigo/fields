/// <reference path="../event/IEvent.ts"/>
/// <reference path="../event/IEventDispatcher.ts"/>
/// <reference path="../../core/type/IDictionary.ts"/>
module com.maigo.mvc.event {
    export class EventDispatcher implements IEventDispatcher {
        private _listeners:com.maigo.core.type.IDictionary<any[]> = null;
        private _captureListeners:com.maigo.core.type.IDictionary<any[]> = null;

        addEventListener(type:string, listener:any, useCapture:boolean = false):any {
            var listeners:{[type:string]:any[];} = null;
            if (useCapture) {
                listeners = this._captureListeners = (this._captureListeners || <com.maigo.core.type.IDictionary<any[]>>{});
            } else {
                listeners = this._listeners = (this._listeners || <com.maigo.core.type.IDictionary<any[]>>{});
            }

            var arr:any[] = listeners[type];
            if (arr) {
                this.removeEventListener(type, listener, useCapture);
            }

            arr = listeners[type]; // remove may have deleted the array
            if (!arr) {
                listeners[type] = [listener];
            } else {
                arr.push(listener);
            }
            return listener;
        }

        removeEventListener(type:string, listener:any, useCapture:boolean = false):void {
            var listeners:com.maigo.core.type.IDictionary<any[]> = (useCapture) ? this._captureListeners : this._listeners;
            if (!listeners) { return; }

            var arr:any[] = listeners[type];
            if (!arr) { return; }

            var i:number, l:number = arr.length;
            for (i = 0; i < l; ++i) {
                if (arr[i] == listener) {
                    if (l == 1) {
                        delete (listeners[type]);
                    } else { // allows for faster checks.
                        arr.splice(i, 1);
                    }
                    break;
                }
            }
        }

        removeAllEventListeners(type:string = null):void {
            if (!type) {
                this._listeners = this._captureListeners = null;
            } else {
                if (this._listeners) {
                    delete (this._listeners[type]);
                }
                if (this._captureListeners) {
                    delete (this._captureListeners[type]);
                }
            }
        }

        hasEventListener(type:string):boolean {
            var listeners:com.maigo.core.type.IDictionary<any[]> = this._listeners;
            var captureListeners:com.maigo.core.type.IDictionary<any[]> = this._captureListeners;
            return !!((listeners && listeners[type]) || (captureListeners && captureListeners[type]));
        }

        willTrigger(type:string):boolean {
            var o:EventDispatcher = this;
            while (o) {
                if (o.hasEventListener(type)) { return true; }
                o = o.parent;
            }
            return false;
        }

        on(type:string, listener:any, scope:Object = null, once:boolean = false, data:any = null, useCapture:boolean = false):any {
            if (listener.handleEvent) {
                scope = scope || listener;
                listener = listener.handleEvent;
            }
            scope = scope || this;
            return this.addEventListener(type, function (event:IEvent):void {
                listener.call(scope, event, data);
                once && event.remove();
            }, useCapture);
        }

        off(type:string, listener:any, useCapture:boolean = false):void {
            this.removeEventListener(type, listener, useCapture);
        }

        dispatchEvent(event:com.maigo.mvc.event.IEvent):boolean {
            // re-dispatching an active event object, so clone it:
            if (event.target && event.clone) {
                event = event.clone();
            }
            try {
                event.target = this;
            } catch (e) {
            } // try/catch allows redispatching of native events

            if (!event.bubbles || !this.parent) {
                this._dispatchEvent(event, 2);
            } else {
                var top:EventDispatcher = this, list:EventDispatcher[] = [top];
                while (top.parent) {
                    list.push(top = top.parent);
                }

                var i:number, l:number = list.length;
                // capture & atTarget
                for (i = l - 1; i >= 0 && !event.propagationStopped; --i) {
                    list[i]._dispatchEvent(event, (i == 0) ? 2 : 1);
                }
                // bubbling
                for (i = 1; i < l && !event.propagationStopped; ++i) {
                    list[i]._dispatchEvent(event, 3);
                }
            }
            return event.defaultPrevented;
        }

        private _dispatchEvent(event:com.maigo.mvc.event.IEvent, eventPhase:Object):void {
            var listeners:com.maigo.core.type.IDictionary<any[]> = (eventPhase == 1) ? this._captureListeners : this._listeners;
            if (event && listeners) {
                var l:number, arr:any[] = listeners[event.type];
                if (!arr || !(l = arr.length)) { return; }

                try { event.currentTarget = this; } catch (e) { }
                try { event.eventPhase = eventPhase; } catch (e) { }

                event.removed = false;
                arr = arr.slice(0); // to avoid issues with items being removed or added during the dispatch

                for (var i:number = 0; i < l && !event.immediatePropagationStopped; i++) {
                    var o:any = arr[i];
                    if (o.handleEvent) { o.handleEvent(event); }
                    else { o(event); }
                    if (event.removed) {
                        this.off(event.type, o, eventPhase == 1);
                        event.removed = false;
                    }
                }
            }
        }

        private get parent():EventDispatcher {
            return null;
        }
    }
}