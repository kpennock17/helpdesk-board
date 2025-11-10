'use client';
import React, { useMemo } from 'react';

export default function MyQueueSummary({ queue, tickets, onRemove, onClear }) {

  const queuedIds = useMemo(() => Object.keys(queue), [queue]);
  const queuedTickets = queuedIds
    .map(id => tickets.find(t => t.id === id))
    .filter(Boolean);

  return (
    <div className="border rounded p-3 bg-gray-50">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">My Queue</h4>
        <div className="text-sm text-gray-600">{queuedTickets.length} selected</div>
      </div>

      <div className="mt-2">
        {queuedTickets.length === 0 ? (
          <div className="text-xs text-gray-500">No tickets selected.</div>
        ) : (
          <ul className="space-y-2">
            {queuedTickets.map(t => (
              <li key={t.id} className="flex items-center justify-between text-sm">
                <div className="truncate pr-2">{t.title}</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRemove(t.id)}
                    className="text-xs px-2 py-0.5 border rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={onClear}
          disabled={queuedTickets.length === 0}
          className={`px-3 py-1 rounded ${queuedTickets.length === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`}
        >
          Clear Queue
        </button>
      </div>
    </div>
  );
}
