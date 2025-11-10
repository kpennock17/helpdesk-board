'use client';
import React from 'react';

export default function StatusFilter({ value, onChange }) {
  const options = ['All', 'Open', 'In Progress', 'On Hold', 'Resolved'];
  return (
    <label className="flex items-center gap-2">
      <span className="text-sm">Status</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded p-1"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}
