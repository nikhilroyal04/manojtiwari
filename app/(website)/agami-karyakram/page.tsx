import AgamiKaryakram from "./agami-karyakram";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "अगमी कर्यक्रम",
    description: "अगमी कर्यक्रम",
}

export default function AgamiKaryakramPage() {
    return (
        <AgamiKaryakram />
    )
}