import ElectionRalley from "./election-ralley";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Election Ralley",
  description: "Election Ralley page",
};

export default function ElectionRalleyPage() {
  return <ElectionRalley />;
}
