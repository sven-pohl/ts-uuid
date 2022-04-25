export class Uuid {
  private static pattern =
    "^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$";
  private static flags = "i";
  private static base = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  private static validator = new RegExp(this.pattern, this.flags);

  private value: string;

  // an empty guid
  public static EMPTY = "00000000-0000-0000-0000-000000000000";

  private constructor (uuid: string) {
    if (!uuid) {
      throw new TypeError("Invalid argument; `value` has no value.")
    }

    this.value = Uuid.EMPTY
    if (uuid) this.value = uuid
  }

  public static create (): Uuid {
    // get the current timestamp
    let t = new Date().getTime()
    // time in microseconds since page load or 0 if not supported
    let d = (performance && performance.now && performance.now() * 1000) || 0

    return new Uuid(
      this.base.replace(/[xy]/g, (c: string) => {
        let r = Math.random() * 16
        if (t > 0) {
          // Use timestamp until depleted
          r = (t + r) % 16 | 0
          t = Math.floor(t / 16)
        } else {
          // Use microseconds since page-load if supported
          r = (d + r) % 16 | 0
          d = Math.floor(d / 16)
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
      })
    )
  }

  public static createEmpty (): Uuid {
    return new Uuid("empty")
  }

  public static parse (uuid: string): Uuid {
    return new Uuid(uuid)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static isUuid (uuid: any): boolean {
    const value: string = uuid.toString()
    return uuid && (uuid instanceof Uuid || this.validator.test(value))
  }

  public toString(): string {
    return this.value;
  }

  public isEmpty(): boolean {
    return this.value == Uuid.EMPTY;
  }
}
