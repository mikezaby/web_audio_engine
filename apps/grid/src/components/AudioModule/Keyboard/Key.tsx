import Engine, { Note } from "@blibliki/engine";
import { useCallback, useMemo, useState } from "react";

interface StyleProps {
  toneWidth: number;
  toneHeight: number;
  semiToneWidth: number;
  semiToneHeight: number;
}

const Keys: { [key: string]: string } = {
  C: "c-key",
  "C#": "c-sharp-key",
  D: "d-key",
  "D#": "d-sharp-key",
  E: "e-key",
  F: "f-key",
  "F#": "f-sharp-key",
  G: "g-key",
  "G#": "g-sharp-key",
  A: "a-key",
  "A#": "a-sharp-key",
  B: "b-key",
};

interface KeyProps extends StyleProps {
  id: string;
  note: Note;
  active: boolean;
  triggerable: boolean;
}

export default function Key(props: KeyProps) {
  const [mouseDown, setMouseDown] = useState<boolean>();
  const { id, note, active, triggerable } = props;

  const className = useMemo(() => {
    const names = [Keys[note.name]];
    names.push("nodrag cursor-pointer");

    if (active || mouseDown) names.push("active");

    return names.join(" ");
  }, [active, mouseDown, note.name]);

  const trigger = useCallback(
    (type: "noteOn" | "noteOff", force: boolean = false) =>
      () => {
        if (!triggerable && !force) return;

        setMouseDown(type === "noteOn");
        Engine.triggerVirtualMidi(id, note.fullName, type);
      },
    [id, triggerable, note.fullName],
  );

  return (
    <div
      onMouseEnter={trigger("noteOn")}
      onMouseLeave={trigger("noteOff")}
      onMouseDown={trigger("noteOn", true)}
      onMouseUp={trigger("noteOff", true)}
      className={className}
    />
  );
}
