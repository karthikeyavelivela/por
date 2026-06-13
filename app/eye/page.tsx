import type { Metadata } from "next";
import EyeStage from "@/components/sections/EyeStage";

export const metadata: Metadata = {
  title: "Eye",
  description:
    "A real-time WebGL eye rendered on a single fragment shader — the pupil follows your cursor. A shader experiment by Karthikeya Velivela.",
};

export default function EyePage() {
  return <EyeStage />;
}
