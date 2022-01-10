import { IdMap, KeyValDto } from "./index";

export class SearchDto {
  readonly found: KeyValDto[];
  readonly parents: KeyValDto[];
  readonly path: KeyValDto[];

  constructor(found: IdMap, parents: IdMap, path: IdMap) {
    this.found = [];
    this.parents = [];
    this.path = [];

    found.forEach((val, key) => this.found.push(new KeyValDto(key, val)));
    parents.forEach((val, key) => this.parents.push(new KeyValDto(key, val)));
    path.forEach((val, key) => this.path.push(new KeyValDto(key, val)));
  }
}
