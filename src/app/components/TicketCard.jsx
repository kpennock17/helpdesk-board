'use client';
import React from 'react';

function badgeForPriority(p) {
  const base = 'inline-block px-2 py-0.5 text-xs rounded';
  switch (p) {
    case 'Critical': return base + ' bg-red-200 text-red-800';
    case 'High': return base + ' bg-orange-200 text-orange-800';
    case 'Medium': return base + ' bg-yellow-200 text-yellow-800';
    default: return base + ' bg-gray-200 text-gray-800';
  }
}

function badgeForStatus(s) {
  const base = 'inline-block px-2 py-0.5 text-xs rounded';
  switch (s) {
    case 'Open': return base + ' bg-blue-100 text-blue-800';
    case 'In Progress': return base + ' bg-indigo-100 text-indigo-800';
    case 'On Hold': return base + ' bg-amber-100 text-amber-800';
    case 'Resolved': return base + ' bg-green-100 text-green-800';
    default: return base + ' bg-gray-100 text-gray-800';
  }
}

export default function TicketCard({ ticket, onAdd, isQueued }) {
  const { id, title, description, priority, status, assignee, updatedAt } = ticket;
  const updated = new Date(updatedAt).toLocaleString();

  return (
    <article className="border rounded p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex gap-2">
          <span className={badgeForPriority(priority)}>{priority}</span>
          <span className={badgeForStatus(status)}>{status}</span>
        </div>
      </div>

      <p className="text-sm text-black-700 mt-2">{description}</p>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
        <div>Assignee: <span className="font-medium text-gray-800">{assignee}</span></div>
        <div>Updated: <span className="font-medium text-gray-800">{updated}</span></div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={onAdd}
          disabled={isQueued}
          className={`px-3 py-1 rounded ${isQueued ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          {isQueued ? 'In My Queue' : 'Add to My Queue'}
        </button>

        {isQueued && <p className="text-xs text-gray-500">This ticket is in your queue.</p>}
      </div>

      <div className="mt-2 text-xs text-gray-400">ID: {id}</div>
    </article>
  );
}
