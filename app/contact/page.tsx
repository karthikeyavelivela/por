import type { Metadata } from "next";
import ContactContent from "@/components/sections/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Karthikeya Velivela — security work, product collaborations, or a good conversation.",
};

export default function ContactPage() {
  return <ContactContent />;
}
