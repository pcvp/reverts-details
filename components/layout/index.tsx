import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="w-full flex items-center justify-center py-3 bg-white border-b-2 shadow-sm">
        <img src={process.env.LOGO_URL} className="max-h-10" />
      </header>
      <div className="container max-w-[800px] mx-auto px-2">{children}</div>
    </>
  );
}
