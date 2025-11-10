'use client';
import React from 'react';

export default function SearchBox({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 grow">
      <input
        type="text"
        placeholder="Search title or description..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
    </label>
  );
}
