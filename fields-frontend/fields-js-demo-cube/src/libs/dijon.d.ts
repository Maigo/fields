declare module dijon {
    export var version:string;

    export class System {
        strictInjections:boolean;
        autoMapOutlets:boolean;
        postInjectionHook:string;

        new ():System;
        mapOutlet(sourceKey:string, targetKey?:string /* 'global' */, outletName?:string /* sourceKey */):System;
        getObject(key:Object):Object;
        mapValue(key:string, useValue:Object):System;
        hasMapping(key:string):boolean;
        mapClass(key:string, clazz:Function):System;
        mapSingleton(key:string, clazz:Function):System;
        instantiate(key:string):Object;
        injectInto(instance:Object, key?:string /* 'undefined' */):System;
        unmap(key:string):System;
        unmapOutlet(target:string, outlet:string):System;
        mapHandler(eventName:string, key?:string /* null */, handler?:any /* eventName */, oneShot?:boolean /* false */, passEvent?:boolean /* false */):System;
        unmapHandler(eventName:string, key?:string /* null */, handler?:any /* eventName */):System;
        notify(eventName:string):System;
    }
}