import BhojpuriDuniya from "./bhojpuri-duniya";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "भोजपुरी दुनिया",
    description: "भोजपुरी दुनिया",
}

export default function BhojpuriDuniyaPage() {
    return (
        <BhojpuriDuniya />
    )
}