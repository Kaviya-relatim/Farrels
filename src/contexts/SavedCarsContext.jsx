// @ts-nocheck
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const SavedCarsContext = createContext(undefined);

export function SavedCarsProvider({ children }) {
  const [savedCarIds, setSavedCarIds] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("saved_cars");
    if (saved) {
      try {
        setSavedCarIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved cars", e);
      }
    }
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("saved_cars", JSON.stringify(savedCarIds));
  }, [savedCarIds]);

  function toggleSaveCar(id) {
    setSavedCarIds((prev) =>
      prev.includes(id) ? prev.filter((carId) => carId !== id) : [...prev, id]
    );
  }

  function isCarSaved(id) {
    return savedCarIds.includes(id);
  }

  return (
    <SavedCarsContext.Provider value={{ savedCarIds, toggleSaveCar, isCarSaved }}>
      {children}
    </SavedCarsContext.Provider>
  );
}

export function useSavedCars() {
  const context = useContext(SavedCarsContext);
  if (context === undefined) {
    throw new Error("useSavedCars must be used within a SavedCarsProvider");
  }
  return context;
}
