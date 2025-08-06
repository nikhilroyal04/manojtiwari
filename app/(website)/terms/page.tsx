import Terms from "./terms";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms",
    description: "Terms",
}   

export default function TermsPage() {
    return (
        <Terms />
    );
}   