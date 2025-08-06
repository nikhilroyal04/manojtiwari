import React from "react";
import Header from "@/components/layouts/website/header"; 
import Footer from "@/components/layouts/website/footer";
import FloatingButton from "@/components/layouts/website/floatingButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
      <FloatingButton />
    </div>
  );
}
