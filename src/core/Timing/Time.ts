import { isNumber } from "lodash";
import { Engine } from "@/Engine";

type BarsBeatsSixteenths = `${number}:${number}:${number}`;

type TTime = number | BarsBeatsSixteenths;

export const time = (value: TTime) => new Time(value);

export default class Time {
  value: TTime;

  constructor(value: TTime) {
    this.value = value;
  }

  toNumber(): number {
    if (isNumber(this.value)) return this.value;

    const [beatsPerBar, sixteenths] = this.transport.timeSignature;
    const secondsPerBeat = 60 / this.transport.bpm;

    const [bars, beats, divisions] = this.value.split(":").map(Number);

    const totalBeats =
      bars * beatsPerBar + beats + divisions / (sixteenths / 4);

    return totalBeats * secondsPerBeat;
  }

  private get transport() {
    return Engine.current.transport;
  }
}
