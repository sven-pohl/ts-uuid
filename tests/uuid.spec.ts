import { expect } from "chai";
import "mocha"
import { Uuid } from "../lib/uuid";

describe("Uuid test", () => {
    it("Should create a uuid", () => {
        const wrong = "whatever";
        expect(Uuid.isUuid(wrong)).equals(false);

        const right = Uuid.create();
        expect(Uuid.isUuid(right)).equal(true);
    });

    it("Should create an empty uuid", () => {
        const empty = Uuid.createEmpty();

        expect(empty.toString()).equal(Uuid.EMPTY);
        expect(empty.isEmpty()).equal(true);
        expect(Uuid.isUuid(empty)).equal(true);
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