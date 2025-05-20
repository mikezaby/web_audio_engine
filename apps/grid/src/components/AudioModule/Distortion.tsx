import Fader from "@/components/Fader";
import { TUpdateProps } from ".";
import Container from "./Container";

interface DistortionProps {
  id: string;
  updateProps: TUpdateProps;
  props: { drive: number; wet: number };
}

export default function Reverb(props: DistortionProps) {
  const {
    id,
    updateProps,
    props: { drive, wet },
  } = props;

  const updateProp = (propName: string) => (value: number) => {
    updateProps(id, { [propName]: value });
  };

  return (
    <Container>
      <Fader
        name="drive"
        min={0}
        max={1}
        onChange={updateProp("drive")}
        value={drive}
      />
      <Fader
        name="wet"
        min={0}
        max={1}
        onChange={updateProp("wet")}
        value={wet}
      />
    </Container>
  );
}
