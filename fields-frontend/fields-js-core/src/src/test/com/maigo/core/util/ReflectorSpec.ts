/// <reference path="../../../../../libs/jasmine.d.ts"/>
/// <reference path="../../../../../main/com/maigo/core/rtti/RTTI.ts"/>
/// <reference path="../../../../../main/com/maigo/core/util/Reflector.ts"/>
module com.maigo.core.util {

    class TestClass { }
    class TestChildClass extends TestClass { }

    class TestRTTIClass {
        static rtti:com.maigo.core.rtti.RTTI = new com.maigo.core.rtti.RTTI("__TestRTTIClass");
    }

    describe("com.maigo.core.util.Reflector", () => {
        it("should test instance is class", () => {
            var instance:TestClass = new TestClass();
            expect(com.maigo.core.util.Reflector.instanceOf(instance, TestClass)).toBe(true);
        });

        it("should test instance is class or sub-class", () => {
            var instance:TestChildClass = new TestChildClass();
            expect(com.maigo.core.util.Reflector.instanceOf(instance, TestClass)).toBe(true);
        });

        it("should give class name", () => {
            expect(com.maigo.core.util.Reflector.className(TestClass)).toBe("TestClass");
        });

        it("should give class name using rtti", () => {
            expect(com.maigo.core.util.Reflector.className(TestRTTIClass)).toBe("__TestRTTIClass");
        });
    });
}