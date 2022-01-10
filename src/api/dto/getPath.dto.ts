import { KeyValDto } from './index';

export class GetPathDto {
  readonly parents: KeyValDto[];
  readonly target: number;

  constructor(parents: KeyValDto[], target: number) {
    this.parents = parents;
    this.target = target;
  }
}
