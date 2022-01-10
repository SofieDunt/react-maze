import { IdMap } from "./index";

export class GetPathDto {
  readonly parents: IdMap;
  readonly target: number;

  constructor(parents: IdMap, target: number) {
    this.parents = parents;
    this.target = target;
  }
}
