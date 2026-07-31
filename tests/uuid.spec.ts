import { expect } from "chai";
import "mocha"
import { Uuid } from "../lib/uuid";

describe("Uuid test", () => {
    it("Should create a uuid", () => {
        const wrong = "whatever";
        expect(Uuid.isUuid(wrong)).equals(false);

        const right = Uuid.create();
        expect(Uuid.isUuid(right)).equal(true);
        expect(right.toString()).match(
            /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/
        );
    });

    it("Should use cryptographically secure randomness", () => {
        const originalRandom = Math.random;
        Math.random = () => { throw new Error("Math.random should not be called"); };

        try {
            expect(Uuid.isUuid(Uuid.create())).equal(true);
        } finally {
            Math.random = originalRandom;
        }
    });

    it("Should create an empty uuid", () => {
        const empty = Uuid.createEmpty();

        expect(empty.toString()).equal(Uuid.EMPTY);
        expect(empty.isEmpty()).equal(true);
        expect(Uuid.isUuid(empty)).equal(true);
        expect(Object.getOwnPropertyDescriptor(Uuid, "EMPTY")?.set).equal(undefined);
    });

    it("Should reject invalid values", () => {
        const nonHex = "zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz";

        expect(Uuid.isUuid(nonHex)).equal(false);
        expect(Uuid.isUuid(null)).equal(false);
        expect(Uuid.isUuid(undefined)).equal(false);
        expect(Uuid.isUuid(0)).equal(false);
        expect(() => Uuid.parse("whatever")).to.throw(TypeError);
    });

    it("Should be unique value", () => {        
        const guids = [];
        for (let index = 0; index < 3000; index++) {
            guids.push(Uuid.create());
        }
        expect(guids.indexOf(guids[0]) < 0).equal(false);
        
        expect(guids.indexOf(Uuid.create()) < 0).equal(true);
    });
});