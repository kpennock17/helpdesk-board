export async function GET() {
  const tickets = [
    {
      id: 't-1001',
      title: 'Cannot connect to VPN',
      description: 'User reports intermittent VPN connectivity errors.',
      priority: 'High',
      status: 'Open',
      assignee: 'Unassigned',
      updatedAt: '2025-10-31T14:05:00Z'
    },
    {
      id: 't-1002',
      title: 'Email sync failing',
      description: 'Mail app fails to sync new messages since last update.',
      priority: 'Medium',
      status: 'In Progress',
      assignee: 'Alice Johnson',
      updatedAt: '2025-11-03T09:12:00Z'
    },
    {
      id: 't-1003',
      title: 'Printer offline on Floor 2',
      description: 'Network printer shows offline; users cannot print.',
      priority: 'Low',
      status: 'On Hold',
      assignee: 'Bob Martin',
      updatedAt: '2025-11-01T12:30:00Z'
    },
    {
      id: 't-1004',
      title: 'Critical security patch failed',
      description: 'Patch installation failed on multiple servers.',
      priority: 'Critical',
      status: 'Open',
      assignee: 'Unassigned',
      updatedAt: '2025-11-05T18:42:00Z'
    },
    {
      id: 't-1005',
      title: 'Account locked out',
      description: 'User locked out after multiple failed logins.',
      priority: 'High',
      status: 'In Progress',
      assignee: 'Carlos Vega',
      updatedAt: '2025-11-04T08:20:00Z'
    },
    {
      id: 't-1006',
      title: 'Wi-Fi dropouts in Conference Room',
      description: 'Wi-Fi frequently disconnects during presentations.',
      priority: 'Medium',
      status: 'Open',
      assignee: 'Unassigned',
      updatedAt: '2025-10-29T15:00:00Z'
    },
    {
      id: 't-1007',
      title: 'Broken display on reception PC',
      description: 'Reception monitor shows artifacts, blinking occasionally.',
      priority: 'Low',
      status: 'Resolved',
      assignee: 'Diane Lee',
      updatedAt: '2025-10-28T11:10:00Z'
    },
    {
      id: 't-1008',
      title: 'Slow database queries',
      description: 'Report generation times have increased dramatically.',
      priority: 'High',
      status: 'In Progress',
      assignee: 'Evan Smith',
      updatedAt: '2025-11-02T07:45:00Z'
    },
    {
      id: 't-1009',
      title: 'Phone system intermittent',
      description: 'Calls drop unexpectedly across several extensions.',
      priority: 'Medium',
      status: 'On Hold',
      assignee: 'Unassigned',
      updatedAt: '2025-11-06T13:55:00Z'
    },
    {
      id: 't-1010',
      title: 'New user account provisioning',
      description: 'Create accounts and set permissions for new hires.',
      priority: 'Low',
      status: 'Open',
      assignee: 'HR Bot',
      updatedAt: '2025-10-30T09:00:00Z'
    },
    {
      id: 't-1011',
      title: 'VPN throughput degraded',
      description: 'Large file transfers over VPN are slow for remote staff.',
      priority: 'High',
      status: 'In Progress',
      assignee: 'Frank Gomez',
      updatedAt: '2025-11-07T16:20:00Z'
    },
    {
      id: 't-1012',
      title: 'Application crash on launch',
      description: 'Critical in-house app crashes immediately on some Macs.',
      priority: 'Critical',
      status: 'In Progress',
      assignee: 'Grace Park',
      updatedAt: '2025-11-06T10:10:00Z'
    },
    {
      id: 't-1013',
      title: 'Keyboard replacements needed',
      description: 'Multiple keyboards have stuck keys across office.',
      priority: 'Low',
      status: 'Resolved',
      assignee: 'Inventory Team',
      updatedAt: '2025-10-25T08:44:00Z'
    },
    {
      id: 't-1014',
      title: 'Permissions mismatch on shared drive',
      description: 'Some users cannot access shared project folders.',
      priority: 'Medium',
      status: 'Open',
      assignee: 'Unassigned',
      updatedAt: '2025-11-08T14:59:00Z'
    }
  ];
  return Response.json(tickets);
}
