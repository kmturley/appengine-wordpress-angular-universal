import { Expose, Deserializable } from './deserialize';

export class Category extends Deserializable {
  @Expose description: string;
  @Expose id: number;
  @Expose link: string;
  @Expose name: string;
  @Expose slug: string;
  @Expose taxonomy: string;
}

export class Page extends Deserializable {
  @Expose content: object;
  @Expose date: string;
  @Expose id: number;
  @Expose link: string;
  @Expose slug: string;
  @Expose title: object;
  @Expose type: string;
}
