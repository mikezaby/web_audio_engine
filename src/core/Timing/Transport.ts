import Scheduler from "./Scheduler";
import Time, { time } from "./Time";
import { now, realNow } from "./utils";

export enum TransportState {
  playing = "playing",
  stopped = "stopped",
  paused = "paused",
}

export type TransportEvents = {
  start: { actionAt: number; offset: number };
  stop: { actionAt: number };
  pause: { actionAt: number };
};

type TPlaybackCallback = (actionAt: number) => void;

type TransportProps = {
  onStart?: TPlaybackCallback;
  onStop?: TPlaybackCallback;
};

export default class Transport {
  bpm: number = 95;
  timeSignature: [number, number] = [4, 4];
  loopStart: Time;
  loopEnd?: Time;

  state: TransportState = TransportState.stopped;
  offset: number = 0;

  private startTime: number = 0;
  private onStart: TransportProps["onStart"];
  private onStop: TransportProps["onStop"];
  private scheduler: Scheduler;

  constructor(props: TransportProps) {
    this.onStart = props.onStart;
    this.onStop = props.onStop;
    this.loopStart = time("0:0:0");
    this.scheduler = new Scheduler(this);
  }

  start({
    offset = this.offset,
    actionAt = now(),
  }: {
    offset?: number;
    actionAt?: number;
  }) {
    if (this.state === TransportState.playing) return;

    this.validateFutureTime(actionAt);

    this.scheduler.start(actionAt, () => {
      this.state = TransportState.playing;
      this.offset = offset;
      this.startTime = actionAt - this.offset;
    });
    this.onStart?.(actionAt);

    return actionAt;
  }

  stop({ actionAt: actionAt = now() }: { actionAt?: number }) {
    if (this.state === TransportState.stopped) return;

    this.validateFutureTime(actionAt);

    this.scheduler.stop(actionAt, () => {
      this.state = TransportState.stopped;
      this.offset = 0;
    });
    this.onStop?.(actionAt);

    return actionAt;
  }

  pause({ actionAt: actionAt = now() }: { actionAt?: number }) {
    if (this.state === TransportState.paused) return;

    this.validateFutureTime(actionAt);

    this.scheduler.stop(actionAt, () => {
      this.state = TransportState.paused;
      this.offset = actionAt - this.startTime;
    });
    this.onStop?.(actionAt);

    return actionAt;
  }

  get playhead() {
    if (this.state === TransportState.stopped) return 0;
    if (this.state === TransportState.paused) return this.offset;

    return now() - this.startTime;
  }

  private validateFutureTime(time: number) {
    if (time < realNow()) throw Error("Past time not allowed");
  }
}
