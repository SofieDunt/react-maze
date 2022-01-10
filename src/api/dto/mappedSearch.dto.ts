import { IdMap, KeyValDto, SearchDto } from "./index";

export class MappedSearchDto {
  readonly found: IdMap;
  readonly parents: IdMap;
  readonly path: IdMap;

  constructor(searchDto: SearchDto) {
    this.found = new Map<number, number>();
    this.parents = new Map<number, number>();
    this.path = new Map<number, number>();

    searchDto.found.forEach((keyVal) => this.found.set(keyVal.key, keyVal.val));
    searchDto.parents.forEach((keyVal) =>
      this.parents.set(keyVal.key, keyVal.val)
    );
    searchDto.path.forEach((keyVal) => this.path.set(keyVal.key, keyVal.val));
  }
}
