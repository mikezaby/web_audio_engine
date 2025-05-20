import { ChangeEvent } from "react";
import Fader, { MarkProps } from "@/components/Fader";
import { TUpdateProps } from ".";
import { Input, Label } from "../ui";
import Container from "./Container";

const WAVES = ["sine", "triangle", "square", "sawtooth"];

const WAVE_MARKS: MarkProps[] = [
  { value: 0, label: "sin" },
  { value: 1, label: "tri" },
  { value: 2, label: "sqr" },
  { value: 3, label: "saw" },
];

export default function LFO(props: {
  id: string;
  name: string;
  props: {
    min: number;
    max: number;
    amount: number;
    frequency: number;
    wave: string;
  };
  updateProps: TUpdateProps;
}) {
  const {
    id,
    updateProps,
    props: { min, max, amount, frequency, wave: waveName },
  } = props;

  const waveIndex = WAVES.findIndex((w) => w === waveName);

  const onInputChange =
    (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      updateProp(prop)(value);
    };

  const updateProp = (propName: string) => (value: number) => {
    const updatedValue = propName === "wave" ? WAVES[value] : value;

    updateProps(id, { [propName]: updatedValue });
  };

  return (
    <Container>
      <div className="flex flex-col">
        <div>
          <Label>Min</Label>
          <Input
            type="number"
            onChange={onInputChange("min")}
            value={min}
            className="w-[92px] mr-2"
          />
        </div>
        <div>
          <Label>Max</Label>
          <Input
            type="number"
            onChange={onInputChange("max")}
            value={max}
            className="w-[92px] mr-2"
          />
        </div>
      </div>
      <Fader
        name="Frequency"
        min={0.1}
        max={10}
        onChange={updateProp("frequency")}
        value={frequency}
      />
      <Fader
        name="Amount"
        min={0}
        max={1}
        onChange={updateProp("amount")}
        value={amount}
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
