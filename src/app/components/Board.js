'use client';
import { useEffect, useMemo, useState, useCallback } from 'react';
import StatusFilter from './StatusFilter';
import PriorityFilter from './PriorityFilter';
import SearchBox from './SearchBox';
import TicketList from './TicketList';
import MyQueueSummary from './MyQueueSummary';
import StatusMessage from './StatusMessage';
import { priorities, statuses } from '../lib/severity';

export default function Board() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({ status: 'All', priority: 'All' });
  const [search, setSearch] = useState('');
  const [queue, setQueue] = useState({}); // map { [ticketId]: true }

  // Fetch tickets on mount
  useEffect(() => {
    let cancelled = false;
    async function fetchTickets() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/tickets');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        if (!cancelled) {
          setTickets(data);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Unable to fetch');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchTickets();
    return () => {
      cancelled = true;
    };
  }, []);

  // Live updates effect: every 6-10 seconds randomly update one ticket
  useEffect(() => {
    if (tickets.length === 0) return;
    let active = true;

    function randomInterval() {
      return 6000 + Math.floor(Math.random() * 4000); // 6000-9999 ms
    }

    function pickAndMutate() {
      setTickets(prev => {
        if (!active || prev.length === 0) return prev;
        const idx = Math.floor(Math.random() * prev.length);
        const ticket = prev[idx];
        // Decide to change status or priority
        const changeType = Math.random() < 0.6 ? 'status' : 'priority';

        const statusTransitions = {
          'Open': ['In Progress', 'On Hold'],
          'In Progress': ['On Hold', 'Resolved'],
          'On Hold': ['In Progress', 'Resolved'],
          'Resolved': ['In Progress'] // reopen sometimes
        };

        const priorityTransitions = {
          'Low': ['Medium'],
          'Medium': ['Low', 'High'],
          'High': ['Medium', 'Critical'],
          'Critical': ['High']
        };

        const newTicket = { ...ticket };
        if (changeType === 'status') {
          const options = statusTransitions[ticket.status] || Object.keys(statusTransitions);
          newTicket.status = options[Math.floor(Math.random() * options.length)];
        } else {
          const options = priorityTransitions[ticket.priority] || Object.keys(priorityTransitions);
          newTicket.priority = options[Math.floor(Math.random() * options.length)];
        }
        newTicket.updatedAt = new Date().toISOString();

        const copy = [...prev];
        copy[idx] = newTicket;
        return copy;
      });
    }

    const tick = () => {
      pickAndMutate();
      if (!active) return;
      timer = setTimeout(tick, randomInterval());
    };

    let timer = setTimeout(tick, randomInterval());

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [tickets.length]);

  // Derived visible tickets from tickets, filters, search
  const visibleTickets = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tickets.filter(t => {
      if (filters.status !== 'All' && t.status !== filters.status) return false;
      if (filters.priority !== 'All' && t.priority !== filters.priority) return false;
      if (!q) return true;
      return (
        (t.title && t.title.toLowerCase().includes(q)) ||
        (t.description && t.description.toLowerCase().includes(q))
      );
    });
  }, [tickets, filters, search]);

  // Add/remove queue handlers
  const addToQueue = useCallback((ticketId) => {
    setQueue(prev => ({ ...prev, [ticketId]: true }));
  }, []);

  const removeFromQueue = useCallback((ticketId) => {
    setQueue(prev => {
      const next = { ...prev };
      delete next[ticketId];
      return next;
    });
  }, []);

  const clearQueue = useCallback(() => {
    setQueue({});
  }, []);

  // Render
  const isEmpty = !loading && !error && visibleTickets.length === 0;

  return (
    <div className="space-y-4">
      <section className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex gap-2 items-center">
          <StatusFilter
            value={filters.status}
            onChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
          />
          <PriorityFilter
            value={filters.priority}
            onChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}
          />
          <SearchBox value={search} onChange={(v) => setSearch(v)} />
        </div>
        <div>
          <MyQueueSummary
            queue={queue}
            tickets={tickets}
            onRemove={removeFromQueue}
            onClear={clearQueue}
          />
        </div>
      </section>

      <StatusMessage loading={loading} error={error} isEmpty={isEmpty} />

      <TicketList
        tickets={visibleTickets}
        queued={queue}
        onAddToQueue={addToQueue}
      />
    </div>
  );
}
