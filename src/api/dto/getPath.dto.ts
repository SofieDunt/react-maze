import { KeyValDto } from './index';

export class GetPathDto {
  readonly parents: KeyValDto[];
  readonly source: number;
  readonly target: number;

  constructor(parents: KeyValDto[], source: number, target: number) {
    this.parents = parents;
    this.source = source;
    this.target = target;
  }
}
