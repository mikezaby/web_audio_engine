import { Scheduler as InternalScheduler } from "@ircam/sc-scheduling";
import { now } from "@/utils/time";
import { nt, t, TTime } from "./Time";
import Transport from "./Transport";

export default class Scheduler {
  transport: Transport;
  internalScheduler: InternalScheduler;

  constructor(transport: Transport) {
    this.transport = transport;
    this.internalScheduler = new InternalScheduler(now, {
      currentTimeToProcessorTimeFunction: () => this.transport.playhead,
    });
  }

  start(actionAt: TTime, callback: () => void) {
    this.internalScheduler.add(this.processor, nt(actionAt));
    this.defer(callback, actionAt);
  }

  stop(actionAt: TTime, callback: () => void) {
    this.defer(() => {
      this.internalScheduler.remove(this.processor);
      callback();
    }, actionAt);
  }

  defer(callback: () => void, actionAt: TTime) {
    this.internalScheduler.defer(callback, nt(actionAt));
  }

  private processor = (currentTime: number, playhead: TTime) => {
    console.log(`playhead: ${t(playhead).toNotation()}`);
    return currentTime + 0.5;
  };
}
