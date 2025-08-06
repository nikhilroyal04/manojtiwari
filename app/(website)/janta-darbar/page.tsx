import JantaDarbar from "./janta-darbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Janta Darbar",
  description: "Janta Darbar page",
};

export default function JantaDarbarPage() {
  return <JantaDarbar />;
}
