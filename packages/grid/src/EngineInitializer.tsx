"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks";
import { initialize, dispose } from "./globalSlice";

export default function EngineInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialize());

    return () => {
      dispatch(dispose());
    };
  }, [dispatch]);

  return null;
}
