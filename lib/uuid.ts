export class Uuid {
  private static pattern =
    "^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$";
  private static flags = "i";
  private static validator = new RegExp(this.pattern, this.flags);
  private static readonly empty = "00000000-0000-0000-0000-000000000000";

  private value: string;

  // an empty guid
  public static get EMPTY (): string {
    return this.empty
  }

  private constructor (uuid: string) {
    if (!Uuid.validator.test(uuid)) {
      throw new TypeError("Invalid argument; `value` is not a valid UUID.")
    }

    this.value = uuid
  }

  public static create (): Uuid {
    const bytes = crypto.getRandomValues(new Uint8Array(16))
    bytes[6] = (bytes[6] & 0x0f) | 0x40
    bytes[8] = (bytes[8] & 0x3f) | 0x80

    const value = Array.from(bytes, byte => ("0" + byte.toString(16)).slice(-2))
    return new Uuid([
      value.slice(0, 4).join(""),
      value.slice(4, 6).join(""),
      value.slice(6, 8).join(""),
      value.slice(8, 10).join(""),
      value.slice(10, 16).join("")
    ].join("-"))
  }

  public static createEmpty (): Uuid {
    return new Uuid(Uuid.EMPTY)
  }

  public static parse (uuid: string): Uuid {
    return new Uuid(uuid)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static isUuid (uuid: any): boolean {
    return uuid instanceof Uuid ||
      (typeof uuid === "string" && this.validator.test(uuid))
  }

  public toString(): string {
    return this.value;
  }

  public isEmpty(): boolean {
    return this.value == Uuid.EMPTY;
  }
}
