import mitt, { Emitter } from "mitt";
import { Engine } from "@/Engine";

export enum TransportStatus {
  playing = "playing",
  stopped = "stopped",
  paused = "paused",
}

export type TransportEvents = {
  start: { actionAt: number; offset: number };
  stop: { actionAt: number };
  pause: { actionAt: number };
};

const LOOK_AHEAD = 0.01;

export function realNow(time: number = 0) {
  return Engine.current.context.currentTime + time;
}

export function now(time: number = 0) {
  return realNow() + LOOK_AHEAD + time;
}

export default class Transport {
  bpm: number = 95;
  engine: Engine;
  state: TransportStatus = TransportStatus.stopped;
  private startTime: number = 0;
  private offset: number = 0;
  private emitter: Emitter<TransportEvents> = mitt<TransportEvents>();

  constructor(engine: Engine) {
    this.engine = engine;
  }

  start({
    offset = this.offset,
    actionAt = now(),
  }: {
    offset?: number;
    actionAt?: number;
  }) {
    if (this.state === TransportStatus.playing) return;

    this.validateFutureTime(actionAt);

    this.state = TransportStatus.playing;
    this.offset = offset;
    this.startTime = actionAt - this.offset;

    this.emit("start", { actionAt, offset });
  }

  stop({ actionAt: actionAt = now() }: { actionAt?: number }) {
    if (this.state === TransportStatus.stopped) return;

    this.validateFutureTime(actionAt);

    this.state = TransportStatus.stopped;
    this.offset = 0;

    this.emit("stop", { actionAt });
  }

  pause({ actionAt: actionAt = now() }: { actionAt?: number }) {
    if (this.state === TransportStatus.paused) return;

    this.validateFutureTime(actionAt);

    this.state = TransportStatus.paused;
    this.offset = actionAt - this.startTime;

    this.emit("pause", { actionAt });
  }

  get playhead() {
    if (this.state === TransportStatus.stopped) return 0;
    if (this.state === TransportStatus.paused) return this.offset;

    return now() - this.startTime;
  }

  on<EventKey extends keyof TransportEvents>(
    event: EventKey,
    handler: (payload: TransportEvents[EventKey]) => void,
  ) {
    this.emitter.on(event, handler);
  }

  off<EventKey extends keyof TransportEvents>(
    event: EventKey,
    handler: (payload: TransportEvents[EventKey]) => void,
  ) {
    this.emitter.off(event, handler);
  }

  private emit(
    event: keyof TransportEvents,
    payload: TransportEvents[keyof TransportEvents],
  ) {
    this.emitter.emit(event, payload);
  }

  private validateFutureTime(time: number) {
    if (time < realNow()) throw Error("Past time not allowed");
  }
}
