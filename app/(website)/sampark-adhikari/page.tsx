import SamparkAdhikari from "./sampark-adhikari";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "समपर्क अधिकारी",
    description: "समपर्क अधिकारी",
}

export default function SamparkAdhikariPage() {
    return (
        <SamparkAdhikari />
    )
}