import { useEffect } from "react";
import Select from "@/components/Select";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { TUpdateProps } from "..";
import Container from "../Container";
import { initialize, devicesSelector } from "./midiDevicesSlice";

export default function MidiDeviceSelector(props: {
  id: string;
  props: { selectedId: string };
  updateProps: TUpdateProps;
}) {
  const {
    id,
    updateProps,
    props: { selectedId },
  } = props;

  const dispatch = useAppDispatch();
  const devices = useAppSelector((state) => devicesSelector.selectAll(state));

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  const updateSelectedId = (value: string) => {
    updateProps(id, { selectedId: value });
  };

  return (
    <Container>
      <Select
        label="Select MIDI device"
        value={selectedId || ""}
        options={devices}
        onChange={updateSelectedId}
      />
    </Container>
  );
}
