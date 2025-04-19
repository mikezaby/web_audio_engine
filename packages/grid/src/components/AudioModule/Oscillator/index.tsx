import Fader, { MarkProps } from "@/components/Fader";
import { TUpdateProps } from "..";
import Container from "../Container";

const Center: MarkProps[] = [{ value: 0, label: "-" }];

const WAVES = ["sine", "triangle", "square", "sawtooth"];

const WAVE_MARKS: MarkProps[] = [
  { value: 0, label: "sin" },
  { value: 1, label: "tri" },
  { value: 2, label: "sqr" },
  { value: 3, label: "saw" },
];

const RANGES: MarkProps[] = [
  { value: -1, label: "" },
  { value: 0, label: "" },
  { value: 1, label: "" },
  { value: 2, label: "" },
];

export default function Oscillator(props: {
  id: string;
  name: string;
  props: { range: number; coarse: number; fine: number; wave: string };
  updateProps: TUpdateProps;
}) {
  const {
    id,
    updateProps,
    props: { range, coarse, fine, wave: waveName },
  } = props;

  const waveIndex = WAVES.findIndex((w) => w === waveName);

  const updateProp = (propName: string) => (value: number) => {
    const updatedValue = propName === "wave" ? WAVES[value] : value;

    updateProps(id, { [propName]: updatedValue });
  };

  return (
    <Container>
      <Fader
        name="Octave"
        marks={RANGES}
        min={-1}
        max={2}
        onChange={updateProp("range")}
        value={range}
      />
      <Fader
        name="Coarse"
        marks={Center}
        min={-12}
        max={12}
        onChange={updateProp("coarse")}
        value={coarse}
      />
      <Fader
        name="Fine"
        marks={Center}
        min={-1}
        max={1}
        step={0.01}
        onChange={updateProp("fine")}
        value={fine}
      />
      <Fader
        name="Wave"
        marks={WAVE_MARKS}
        onChange={updateProp("wave")}
        value={waveIndex}
      />
    </Container>
  );
}
