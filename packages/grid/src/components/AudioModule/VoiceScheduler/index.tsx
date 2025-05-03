import Select from "@/components/Select";
import { TUpdateProps } from "..";
import Container from "../Container";

const VOICE_SELECTIONS = [1, 2, 3, 4, 5, 6];

export default function VoiceScheduler(props: {
  id: string;
  props: { polyNumber: number };
  updateProps: TUpdateProps;
}) {
  const {
    id,
    updateProps,
    props: { polyNumber },
  } = props;

  const updateSelectedId = (value: string) => {
    updateProps(id, { polyNumber: Number(value) });
  };

  return (
    <Container>
      <Select
        value={polyNumber}
        options={VOICE_SELECTIONS}
        onChange={updateSelectedId}
      />
    </Container>
  );
}
