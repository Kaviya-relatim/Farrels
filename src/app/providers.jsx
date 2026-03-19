// @ts-nocheck
"use client";

import { SavedCarsProvider } from "@/contexts/SavedCarsContext";

export function Providers({ children }) {
  return (
    <SavedCarsProvider>
      {children}
    </SavedCarsProvider>
  );
}
