"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 print:hidden"
    >
      Print / Save as PDF
    </button>
  );
}
