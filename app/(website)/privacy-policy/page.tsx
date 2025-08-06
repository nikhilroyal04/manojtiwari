import PrivacyPolicy from "./privacy-policy";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy",
}

export default function PrivacyPolicyPage() {
    return (
        <PrivacyPolicy />
    );
}