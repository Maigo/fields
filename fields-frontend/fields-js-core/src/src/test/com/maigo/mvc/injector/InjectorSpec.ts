/// <reference path="../../../../../libs/jasmine.d.ts"/>
/// <reference path="../../../../../libs/dijon.d.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/injector/IInjector.ts"/>
/// <reference path="../../../../../main/com/maigo/mvc/injector/Injector.ts"/>
module com.maigo.mvc.injector {

    class Value {
        public flag:boolean = false;
    }
    class Target {
        value:Value = undefined;
    }

    describe("com.maigo.mvc.injector.Injector", () => {
        var injector:com.maigo.mvc.injector.IInjector;

        beforeEach(() => {
            injector = new com.maigo.mvc.injector.Injector();
        });
        afterEach(() => {
            injector = null;
        });

        it("should valid version", () => {
            expect(dijon.version).toMatch(/[0-9]\.[0-9]\.[0-9]/);
        });

        it("should map value", () => {
            var value:Value = new Value();
            var target:Target = new Target();
            expect(target.value).toBeUndefined();

            injector.mapValue("value", value);
            injector.injectInto(target);
            expect(target.value).toBeDefined();
            expect(target.value).toBe(value);
        });

        it("should has mapping after map value", () => {
            injector.mapValue("value", new Value());
            expect(injector.hasMapping("value")).toBe(true);
        });

        it("should inject map class", () => {
            var target:Target = new Target();
            expect(target.value).toBeUndefined();

            injector.mapClass("value", Value).injectInto(target);
            expect(target.value).toBeDefined();
        });

        it("should has mapping after map class", () => {
            injector.mapClass("value", Value);
            expect(injector.hasMapping("value")).toBe(true);
        });

        it("should inject map class", () => {
            var target:Target = new Target();
            expect(target.value).toBeUndefined();

            injector.mapClass("value", Value).injectInto(target);
            expect(target.value).toBeDefined();
        });

        it("should inject map class new each time", () => {
            var targetA:Target = new Target();
            var targetB:Target = new Target();
            expect(targetA.value).toBeUndefined();

            injector.mapClass("value", Value)
                .injectInto(targetA)
                .injectInto(targetB);
            expect(targetA.value).toBeDefined();
            expect(targetB.value).toBeDefined();
            expect(targetA.value).not.toBe(targetB.value);
        });

        it("should has mapping after map singleton", () => {
            injector.mapSingleton("value", Value);
            expect(injector.hasMapping("value")).toBe(true);
        });

        it("should inject map singleton same each time", () => {
            var targetA:Target = new Target();
            var targetB:Target = new Target();
            expect(targetA.value).toBeUndefined();

            injector.mapSingleton("value", Value)
                .injectInto(targetA)
                .injectInto(targetB);
            expect(targetA.value).toBeDefined();
            expect(targetB.value).toBeDefined();
            expect(targetA.value).toBe(targetB.value);
        });

        it("should unmap", () => {
            injector.mapValue("value", new Value());
            expect(injector.hasMapping("value")).toBe(true);
            injector.unmap("value");
            expect(injector.hasMapping("value")).toBe(false);
        })
    });
}