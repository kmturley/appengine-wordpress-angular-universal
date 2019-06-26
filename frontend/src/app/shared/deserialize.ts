import 'reflect-metadata';

export const Metadata: any = {};

export function Expose(target: any, key: string) {
  const type = Reflect.getMetadata('design:type', target, key);
  if (!Metadata[target.constructor.name]) {
    Metadata[target.constructor.name] = {};
  }
  Metadata[target.constructor.name][key] = type;
}

export class Deserializable {
  deserialize(input: object): this {
    Object.keys(Metadata[this.constructor.name]).forEach(key => {
      this[key] = input[key] || Metadata[this.constructor.name][key]();
    });
    return this;
  }
}
