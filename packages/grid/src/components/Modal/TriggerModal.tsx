import { ReactNode } from "react";
import { useAppDispatch } from "@/hooks";
import { open, close } from "./modalSlice";

interface Props {
  children: ReactNode;
  modalName: string;
  type: "open" | "close";
}

export default function TriggerModal(props: Props) {
  const dispatch = useAppDispatch();
  const { children, modalName, type } = props;

  const onClick = () => {
    type === "open" ? dispatch(open(modalName)) : dispatch(close(modalName));
  };

  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}
