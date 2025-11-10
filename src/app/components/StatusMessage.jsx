'use client';
import React from 'react';

export default function StatusMessage({ loading, error, isEmpty }) {
  if (loading) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-800 rounded border">
        Loading…
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded border">
        Unable to load tickets.
      </div>
    );
  }
  if (isEmpty) {
    return (
      <div className="p-4 bg-gray-50 text-gray-700 rounded border">
        No tickets match your filters.
      </div>
    );
  }
  return null;
}
