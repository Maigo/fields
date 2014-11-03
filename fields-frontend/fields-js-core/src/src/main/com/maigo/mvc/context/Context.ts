/// <reference path="../command/ICommandMap.ts"/>
/// <reference path="../command/CommandMap.ts"/>
/// <reference path="../context/ContextBase.ts"/>
/// <reference path="../context/ContextEvent.ts"/>
/// <reference path="../injector/IInjector.ts"/>
/// <reference path="../injector/Injector.ts"/>
module com.maigo.mvc.context {

    class Context extends com.maigo.mvc.context.ContextBase {
        private static INJECTOR_KEY_INJECTOR:string = "injector";
        private static INJECTOR_KEY_EVENTDISPATCHER:string = "eventDispatcher";
        private static INJECTOR_KEY_COMMANDMAP:string = "commandMap";

        private _injector:com.maigo.mvc.injector.IInjector;
        private _commandMap:com.maigo.mvc.command.ICommandMap;

        private _autoStartup:boolean;

        public constructor(autoStartup:boolean = true) {
            super();
            this._autoStartup = autoStartup;

            this.mapInjections();
        }

        public startup():void {
            this.dispatchEvent(new com.maigo.mvc.context.ContextEvent(com.maigo.mvc.context.ContextEvent.STARTUP_COMPLETE));
        }

        public shutdown():void {
            this.dispatchEvent(new com.maigo.mvc.context.ContextEvent(com.maigo.mvc.context.ContextEvent.SHUTDOWN_COMPLETE));
        }


        public get injector():com.maigo.mvc.injector.IInjector {
            return this._injector = (this._injector || this.createInjector());
        }

        public get commandMap():com.maigo.mvc.command.ICommandMap {
            return this._commandMap = (this._commandMap || this.createCommandMap());
        }


        private mapInjections():void {
            this.injector.mapValue(Context.INJECTOR_KEY_INJECTOR, this.injector);
            this.injector.mapValue(Context.INJECTOR_KEY_EVENTDISPATCHER, this.eventDispatcher);
            this.injector.mapValue(Context.INJECTOR_KEY_COMMANDMAP, this.commandMap);
        }

        private createInjector():com.maigo.mvc.injector.IInjector {
            return new com.maigo.mvc.injector.Injector();
        }

        private createCommandMap():com.maigo.mvc.command.ICommandMap {
            return new com.maigo.mvc.command.CommandMap(this.eventDispatcher, this.injector);
        }
    }
}