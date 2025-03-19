import { isNumber } from "lodash";
import { Engine } from "@/Engine";

type BarsBeatsSixteenths = `${number}:${number}:${number}`;

type TTime = number | BarsBeatsSixteenths;

export const t = (value: TTime) => new Time(value);

export default class Time {
  value: TTime;

  constructor(value: TTime) {
    this.value = value;
  }

  toNotation(): BarsBeatsSixteenths {
    if (!isNumber(this.value)) return this.value;

    const [count, factor] = this.transport.timeSignature;
    const divisionsPerBeat = 16 / factor;
    const divisionsPerBar = count * divisionsPerBeat;
    const secondsPerBeat = 60 / this.transport.bpm;

    const totalDivisions = Math.floor(
      (this.value / secondsPerBeat) * divisionsPerBeat,
    );

    const bars = Math.floor(totalDivisions / divisionsPerBar);
    const beats = Math.floor(
      (totalDivisions % divisionsPerBar) / divisionsPerBeat,
    );
    const divisions = totalDivisions % divisionsPerBeat;

    return `${bars}:${beats}:${divisions}`;
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
