import { IStepSequence } from "@/modules/Sequencer";
import { now } from "@/utils/time";
import { TTime } from "./Time";

export default class Part {
  private events: { time: TTime; data: IStepSequence }[] = [];
  private callback: (time: TTime, data: IStepSequence) => void;
  private intervalId: number | null = null;
  public loop: boolean = false;
  public loopEnd: string = "1:0:0"; // Default loop end

  constructor(
    callback: (time: TTime, data: IStepSequence) => void,
    sequences: IStepSequence[],
  ) {
    this.callback = callback;

    this.initializeSequences(sequences);
  }

  private initializeSequences(sequences: IStepSequence[]) {
    this.clear();
    sequences.forEach((seq) => {
      this.add(seq);
    });
  }

  public add(sequence: IStepSequence) {
    this.events.push({ time: sequence.time, data: sequence });
  }

  public clear() {
    this.events = [];
  }

  public start(startTime: number) {
    if (this.intervalId !== null) return; // Prevent multiple starts

    const processEvents = () => {
      const currentTime = now();
      this.events.forEach(({ time, data }) => {
        const eventTime = startTime + time;
        console.log(`eventTime: ${eventTime}`);
        console.log(`currentTime: ${currentTime}`);

        if (eventTime >= currentTime) {
          setTimeout(
            () => {
              this.callback(eventTime, data);
            },
            (eventTime - currentTime) * 1000,
          );
        }
      });
    };

    processEvents();
  }

  public stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
