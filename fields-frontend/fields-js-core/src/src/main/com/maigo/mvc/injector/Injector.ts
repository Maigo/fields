/// <reference path="../../.././../../libs/dijon.d.ts"/>
/// <reference path="../injector/IInjector.ts"/>
/// <reference path="../../core/type/Class.ts"/>
module com.maigo.mvc.injector {

    export class Injector implements com.maigo.mvc.injector.IInjector {
        private _system:dijon.System;

        public constructor() {
            this._system = new dijon.System();
        }

        mapValue(key:string, useValue:Object):com.maigo.mvc.injector.IInjector {
            this._system.mapValue(key, useValue).mapOutlet(key);
            return this;
        }

        mapClass(key:string, clazz:com.maigo.core.type.Class):com.maigo.mvc.injector.IInjector {
            this._system.mapClass(key, clazz).mapOutlet(key);
            return this;
        }

        mapSingleton(key:string, clazz:com.maigo.core.type.Class):com.maigo.mvc.injector.IInjector {
            this._system.mapSingleton(key, clazz).mapOutlet(key);
            return this;
        }

        hasMapping(key:string):boolean {
            return this._system.hasMapping(key);
        }

        unmap(key:string):com.maigo.mvc.injector.IInjector {
            this._system.unmapOutlet("global", key).unmap(key);
            return this;
        }

        getInstance(key:string):Object {
            return this._system.instantiate(key);
        }

        injectInto(instance:Object, key?:string):com.maigo.mvc.injector.IInjector {
            this._system.injectInto(instance, key);
            return this;
        }
    }
}