import { useEffect, useState, ChangeEvent } from "react";
import { INote } from "@blibliki/engine";

import { SequenceProps } from ".";
import { Input, Label } from "@/components/ui";

const INITIAL_DURATION = "16n";

interface IStepProps {
  step: number;
  sequence: SequenceProps;
  updateCallback: (props: Partial<SequenceProps>) => void;
}

export default function StepProps(props: IStepProps) {
  const { step, sequence, updateCallback } = props;
  const [duration, setDuration] = useState<string>(INITIAL_DURATION);
  const [notes, setNotes] = useState<Array<INote | null>>(
    Array.from({ length: 7 }, () => null),
  );

  useEffect(() => {
    const newDuration = sequence.notes[0]?.duration || INITIAL_DURATION;
    setDuration(newDuration);

    const newNotes = notes.map((_, i) => sequence.notes[i] || null);
    setNotes(newNotes);
  }, [step]);

  const setNote = (index: number) => (note: string | null) => {
    const newNotes = [...notes];
    newNotes[index] = note ? ({ note, duration } as INote) : null;

    updateCallback({ notes: newNotes.filter((n) => n) as INote[] });
    setNotes(newNotes);
  };

  const onDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDuration = event.target.value;
    const newNotes = notes.map(
      (note) => note && ({ ...note, duration: newDuration } as INote),
    );

    updateCallback({
      notes: newNotes.filter((n) => n) as INote[],
      duration: newDuration,
    });
    setDuration(newDuration);
    setNotes(newNotes);
  };

  return (
    <div className="flex ml-2">
      <div>
        <Label>Duration</Label>
        <Input
          onChange={onDurationChange}
          value={sequence.duration || "16n"}
          className="w-[92px] mr-2"
        />
      </div>

      {Array.from({ length: 7 }, (_, i) => (
        <Note key={i} note={notes[i]} setNote={setNote(i)} />
      ))}
    </div>
  );
}

const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const allNotes = Array.from({ length: 8 }, (_, i) => {
  return notes.map((note) => `${note}${i}`);
}).flat();
allNotes.push("");

function Note(props: {
  note: INote | null;
  setNote: (note: string | null) => void;
}) {
  const { note, setNote } = props;
  const noteName = note?.note || "";

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  return (
    <div>
      <Label>Note</Label>
      <Input value={noteName} onChange={onChange} className="w-[78px] mr-2" />
    </div>
  );
}
