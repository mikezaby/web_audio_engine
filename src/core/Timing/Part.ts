import { ISequence } from "@/modules/Sequencer";
import { now } from "@/utils/time";

export default class Part {
  private events: { time: number; data: ISequence }[] = [];
  private callback: (time: number, data: ISequence) => void;
  private intervalId: number | null = null;
  public loop: boolean = false;
  public loopEnd: string = "1:0:0"; // Default loop end

  public stepsPerBar: number;
  public beatsPerBar: number;
  public bpm: number; // Beats per minute for timing calculations

  constructor(
    callback: (time: number, data: ISequence) => void,
    sequences: ISequence[],
    stepsPerBar: number = 16,
    beatsPerBar: number = 4,
    bpm: number = 120, // Default tempo
  ) {
    this.callback = callback;
    this.stepsPerBar = stepsPerBar;
    this.beatsPerBar = beatsPerBar;
    this.bpm = bpm;

    this.initializeSequences(sequences);
  }

  private initializeSequences(sequences: ISequence[]) {
    this.clear();
    sequences.forEach((seq) => {
      this.add(seq);
    });
  }

  public add(sequence: ISequence) {
    const eventTime = this.convertTimeStringToSeconds(sequence.time);
    this.events.push({ time: eventTime, data: sequence });
    this.events.sort((a, b) => a.time - b.time);
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

      if (this.loop) {
        setTimeout(
          processEvents,
          this.convertTimeStringToSeconds(this.loopEnd) * 1000,
        );
      }
    };

    processEvents();
  }

  public stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private convertTimeStringToSeconds(time: string): number {
    const [bars, beats, steps] = time.split(":").map(Number);
    const beatsPerSecond = this.bpm / 60;
    const secondsPerBeat = 1 / beatsPerSecond;

    return (
      (bars * this.beatsPerBar +
        beats +
        (steps / this.stepsPerBar) * this.beatsPerBar) *
      secondsPerBeat
    );
  }
}
