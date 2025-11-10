'use client';
import React from 'react';
import TicketCard from './TicketCard';

export default function TicketList({ tickets, queued, onAddToQueue }) {
  if (!tickets || tickets.length === 0) return null;
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {tickets.map(ticket => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          isQueued={!!queued[ticket.id]}
          onAdd={() => onAddToQueue(ticket.id)}
        />
      ))}
    </div>
  );
}
