import ManojTiwari from "./manoj-tiwari";
import { Metadata } from "next";    

export const metadata: Metadata = {
    title: "Manoj Tiwari",
    description: "Manoj Tiwari is a member of the Lok Sabha from the constituency of Delhi.",
}

export default function ManojTiwariPage() {
    return (
        <ManojTiwari />
    );
}