import type { Metadata } from "next";
import WorkIndex from "@/components/sections/WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Projects by Karthikeya Velivela — FYRO, GuidePay, LLM Red Team Framework, SentinelX, and application security at PETZU.",
};

export default function WorkPage() {
  return <WorkIndex />;
}
