import { ChangeEvent } from "react";
import { Input, Label } from "@/components/ui";
import { useAppDispatch } from "@/hooks";
import { updateModule } from "../modulesSlice";

interface NameInterface {
  id: string;
  value: number;
}

export default function Voices(props: NameInterface) {
  const dispatch = useAppDispatch();
  const { id, value } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateModule({
        id,
        changes: { numberOfVoices: Number(event.target.value) },
      }),
    );
  };

  return (
    <div className="p-2">
      <Label>Voices</Label>
      <Input type="number" value={value} onChange={onChange} />
    </div>
  );
}
