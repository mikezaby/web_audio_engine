import Fader from "@/components/Fader";
import { TUpdateProps } from "..";

interface CutoffProps {
  id: string;
  value: number;
  updateProps: TUpdateProps;
}

export default function Cutoff(props: CutoffProps) {
  const { id, value, updateProps } = props;

  const updateProp = (_: number, calcValue: number) => {
    updateProps(id, { cutoff: calcValue });
  };

  return (
    <Fader
      name="Hz"
      min={20}
      max={20000}
      onChange={updateProp}
      value={value}
      exp={4}
    />
  );
}
