/// <reference path="../command/ICommand.ts"/>
/// <reference path="../command/ICommandMap.ts"/>
/// <reference path="../event/IEvent.ts"/>
/// <reference path="../event/IEventDispatcher.ts"/>
/// <reference path="../event/Event.ts"/>
/// <reference path="../injector/IInjector.ts"/>
/// <reference path="../../core/util/Reflector.ts"/>
/// <reference path="../../core/type/IDictionary.ts"/>
/// <reference path="../../core/type/Class.ts"/>
module com.maigo.mvc.command {

    export class CommandMap implements com.maigo.mvc.command.ICommandMap {
        private eventDispatcher:com.maigo.mvc.event.IEventDispatcher = null;
        private injector:com.maigo.mvc.injector.IInjector = null;

        private eventTypeMap:com.maigo.core.type.IDictionary<any> = {};
        private detainedCommands:Array<com.maigo.mvc.command.ICommand> = [];

        public constructor(eventDispatcher:com.maigo.mvc.event.IEventDispatcher, injector:com.maigo.mvc.injector.IInjector) {
            this.eventDispatcher = eventDispatcher;
            this.injector = injector;
        }

        mapEvent(eventType:string, commandClass:com.maigo.core.type.Class, eventClass:com.maigo.core.type.Class = null, oneshot:boolean = false):void {
            eventClass = eventClass || com.maigo.mvc.event.Event;

            var eventClassMap:com.maigo.core.type.IDictionary<any> = (this.eventTypeMap[eventType] = (this.eventTypeMap[eventType] || {}));

            var eventClassName:string = com.maigo.core.util.Reflector.className(eventClass);
            var callbacksByCommandClass:com.maigo.core.type.IDictionary<any> = (eventClassMap[eventClassName] = (eventClassMap[eventClassName] || {}));

            var commandClassName:string = com.maigo.core.util.Reflector.className(commandClass);
            if (callbacksByCommandClass[commandClassName] != null) {
                throw new Error('Cannot overwrite map - eventType (' + eventType + ') and Command (' + commandClassName + ')');
            }
            var callback:Function = (event:com.maigo.mvc.event.IEvent)=> {
                this.routeEventToCommand(event, commandClass, oneshot, eventClass);
            };
            this.eventDispatcher.addEventListener(eventType, callback, false);
            callbacksByCommandClass[commandClassName] = callback;
        }

        unmapEvent(eventType:string, commandClass:com.maigo.core.type.Class, eventClass:com.maigo.core.type.Class = null):void {
            eventClass = eventClass || com.maigo.mvc.event.Event;

            var eventClassMap:com.maigo.core.type.IDictionary<any> = this.eventTypeMap[eventType];
            if (eventClassMap == null) { return; }

            var eventClassName:string = com.maigo.core.util.Reflector.className(eventClass);
            var callbacksByCommandClass:com.maigo.core.type.IDictionary<any> = eventClassMap[eventClassName];
            if (callbacksByCommandClass == null) { return; }

            var commandClassName:string = com.maigo.core.util.Reflector.className(commandClass);
            var callback:Function = callbacksByCommandClass[commandClassName];
            if (callback == null) { return; }

            this.eventDispatcher.removeEventListener(eventType, callback, false);
            delete callbacksByCommandClass[commandClassName];
        }

        unmapEvents():void {
            var eventTypeMap:com.maigo.core.type.IDictionary<any> = this.eventTypeMap;
            for (var eventType in eventTypeMap) {
                var eventClassMap:com.maigo.core.type.IDictionary<any> = eventTypeMap[eventType];
                for (var eventClassName in eventClassMap) {
                    var callbacksByCommandClass:com.maigo.core.type.IDictionary<any> = eventClassMap[eventClassName];
                    for (var commandClassName in callbacksByCommandClass) {
                        var callback:Function = callbacksByCommandClass[commandClassName];
                        this.eventDispatcher.removeEventListener(eventType, callback, false);
                    }
                }
            }
            this.eventTypeMap = {};
        }

        hasEventCommand(eventType:string, commandClass:com.maigo.core.type.Class, eventClass:com.maigo.core.type.Class = null):boolean {
            eventClass = eventClass || com.maigo.mvc.event.Event;

            var eventClassMap:com.maigo.core.type.IDictionary<any> = this.eventTypeMap[eventType];
            if (eventClassMap == null) { return false; }

            var eventClassName:string = com.maigo.core.util.Reflector.className(eventClass);
            var callbacksByCommandClass:com.maigo.core.type.IDictionary<any> = eventClassMap[eventClassName];
            if (callbacksByCommandClass == null) { return false; }

            var commandClassName:string = com.maigo.core.util.Reflector.className(commandClass);
            return callbacksByCommandClass[commandClassName] != null;
        }

        execute(commandClass:com.maigo.core.type.Class, payload:Object = null, payloadClass:com.maigo.core.type.Class = null, named:String = ""):void {
            if (payload != null || payloadClass != null) {
                payloadClass = (payloadClass || com.maigo.core.util.Reflector.classOf(payload));

//            if (payload is Event && payloadClass != Event)
//            injector.mapValue(Event, payload);

//            injector.mapValue(payloadClass, payload, named);
            }

            var command:com.maigo.mvc.command.ICommand = <com.maigo.mvc.command.ICommand>(new commandClass());
            this.injector.injectInto(command);

            if (payload !== null || payloadClass != null) {
//            if (payload is Event && payloadClass != Event)
//            injector.unmap(Event);

//            injector.unmap(payloadClass, named);
            }

            command.execute();
        }

        detain(command:com.maigo.mvc.command.ICommand):void {
            var index:number = this.detainedCommands.indexOf(command);
            if (index == -1) {
                this.detainedCommands.push(command);
            }
        }

        release(command:com.maigo.mvc.command.ICommand):void {
            var index:number = this.detainedCommands.indexOf(command);
            if (index != -1) {
                this.detainedCommands.splice(index, 1);
            }
        }

        private routeEventToCommand(event:com.maigo.mvc.event.IEvent, commandClass:com.maigo.core.type.Class, oneShot:boolean, eventClass:com.maigo.core.type.Class = null):boolean {
            if (!com.maigo.core.util.Reflector.instanceOf(event, eventClass)) { return false; }

            this.execute(commandClass, event, eventClass);
            if (oneShot) {
                this.unmapEvent(event.type, commandClass);
            }

            return true;
        }
    }
}