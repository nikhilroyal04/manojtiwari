import Gallery from "./gallery";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Gallery page",
};

export default function GalleryPage() {
  return <Gallery />;
}
