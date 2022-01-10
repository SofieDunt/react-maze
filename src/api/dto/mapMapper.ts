import { KeyValDto, IdMap } from "./index";

export class MapMapper {
  public static mapIdMap(idMap: IdMap): KeyValDto[] {
    const keyVals: KeyValDto[] = [];
    idMap.forEach((val, key) => keyVals.push(new KeyValDto(key, val)));
    return keyVals;
  }

  public static mapKeyVals(keyVals: KeyValDto[]): IdMap {
    const idMap = new Map<number, number>();
    keyVals.forEach((keyVal) => idMap.set(keyVal.key, keyVal.val));
    return idMap;
  }
}
