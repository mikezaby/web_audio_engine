import { Scheduler as InternalScheduler } from "@ircam/sc-scheduling";
import { now } from "@/utils/time";
import Time from "./Time";
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

  start(actionAt: number, callback: () => void) {
    this.internalScheduler.add(this.processor, actionAt);
    this.defer(callback, actionAt);
  }

  stop(actionAt: number, callback: () => void) {
    this.defer(() => {
      this.internalScheduler.remove(this.processor);
      callback();
    }, actionAt);
  }

  defer(callback: () => void, actionAt: number) {
    this.internalScheduler.defer(callback, actionAt);
  }

  private processor = (currentTime: number, playhead: Time) => {
    console.log(`playhead: ${playhead.toNotation()}`);
    return currentTime + 0.5;
  };
}
