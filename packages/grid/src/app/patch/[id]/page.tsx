"use client";

import Grid from "@/components/Grid";
import { useAppDispatch } from "@/hooks";
import { loadById } from "@/patchSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function RoomComponent() {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadById(id as string));
  }, [dispatch, id]);

  return <Grid />;
}
