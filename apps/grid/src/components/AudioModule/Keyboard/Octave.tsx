import { Note } from "@blibliki/engine";
import Key from "./Key";

const toneWidth = 25.3;
const toneHeight = toneWidth * 5;
const semiToneWidth = toneWidth * 0.8;
const semiToneHeight = 24 * 4;

const toneWidthColumn = `${(toneWidth * 2.0) / 3}px`;
const semiToneWidthColumn = `${(toneWidth * 1.0) / 3}px`;

const style = {
  display: "inline-grid",
  gridTemplateColumns: `${toneWidthColumn} ${semiToneWidthColumn}
    ${semiToneWidthColumn} ${semiToneWidthColumn} ${semiToneWidthColumn}
    ${semiToneWidthColumn} ${toneWidthColumn}
    ${toneWidthColumn} ${semiToneWidthColumn}
    ${semiToneWidthColumn} ${semiToneWidthColumn} ${semiToneWidthColumn}
    ${semiToneWidthColumn} ${semiToneWidthColumn} ${semiToneWidthColumn}
    ${semiToneWidthColumn} ${toneWidthColumn}`,
  gridTemplateRows: `${semiToneHeight}px`,
};

interface OctaveProps {
  id: string;
  octave: number;
  props: { activeNotes: string[] };
  triggerable: boolean;
}

export default function Octave(params: OctaveProps) {
  const {
    id,
    props: { activeNotes },
    octave,
    triggerable,
  } = params;

  return (
    <div style={style}>
      {Note.notes(octave).map((note: Note) => (
        <Key
          key={note.fullName}
          id={id}
          triggerable={triggerable}
          toneWidth={toneWidth}
          semiToneWidth={semiToneWidth}
          toneHeight={toneHeight}
          semiToneHeight={semiToneHeight}
          note={note}
          active={activeNote(activeNotes, note)}
        />
      ))}
    </div>
  );
}

function activeNote(activeNotes: string[], note: Note) {
  return activeNotes.some((n) => n === note.fullName);
}
