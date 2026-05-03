"use client";

import { Download, Printer } from "lucide-react";

export function CvPrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-md bg-cyan-400 px-4 text-sm font-semibold text-slate-950 hover:bg-cyan-300 print:hidden"
    >
      <Printer className="h-4 w-4" />
      <Download className="h-4 w-4" />
      Print / Save as PDF
    </button>
  );
}
