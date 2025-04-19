import Fader, { MarkProps } from "@/components/Fader";
import { TUpdateProps } from "..";

interface FilterTypeProps {
  id: string;
  value: BiquadFilterType;
  updateProps: TUpdateProps;
}

const FILTER_TYPES: MarkProps[] = [
  { value: 0, label: "lowpass" },
  { value: 1, label: "highpass" },
  { value: 2, label: "bandpass" },
];

export default function FilterType(props: FilterTypeProps) {
  const { id, value, updateProps } = props;

  const index = FILTER_TYPES.find((t) => t.label === value)?.value;

  const updateProp = (value: number) => {
    const val =
      FILTER_TYPES.find((t) => t.value === value)?.label ||
      FILTER_TYPES[0].label;
    updateProps(id, { filterType: val });
  };

  return (
    <Fader
      name="Type"
      marks={FILTER_TYPES}
      onChange={updateProp}
      value={index}
    />
  );
}
