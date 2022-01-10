import { PosnDto } from "./index";

export class PlayerDto {
  readonly playerPosn: PosnDto;
  readonly nodeLocation: number;

  constructor(playerPosn: PosnDto, nodeLocation: number) {
    this.playerPosn = playerPosn;
    this.nodeLocation = nodeLocation;
  }
}
