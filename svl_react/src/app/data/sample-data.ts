export const openTasksData = [
  { day: "Mon", tasks: 48 },
  { day: "Tue", tasks: 62 },
  { day: "Wed", tasks: 53 },
  { day: "Thu", tasks: 67 },
  { day: "Fri", tasks: 58 },
  { day: "Sat", tasks: 72 },
  { day: "Sun", tasks: 62 },
];

export const myTasksData = [
  { day: "Mon", tasks: 48 },
  { day: "Tue", tasks: 62 },
  { day: "Wed", tasks: 53 },
  { day: "Thu", tasks: 67 },
  { day: "Fri", tasks: 58 },
  { day: "Sat", tasks: 72 },
  { day: "Sun", tasks: 62 },
];

export const statusCards = [
  { title: "Overdue Tasks", count: 3, description: "Requires attention", status: "danger" as const },
  { title: "Blocked Tasks", count: 3, description: "Need resolution", status: "warning" as const },
  { title: "In Progress Tasks", count: 2, description: "On track", status: "success" as const },
];

export const navItems = [
  { icon: "grid_view", label: "My Overviews", active: true },
  { icon: "check_box", label: "My Tasks", active: false },
  { icon: "bar_chart", label: "My Analytics", active: false },
  { icon: "push_pin", label: "My Pins", active: false },
  { icon: "track_changes", label: "Goals & Strategies", active: false },
  { icon: "people", label: "Shared Library", active: false },
];

export const workspaces = [
  { name: "Greenfelder Ltd", initial: "G", color: "#8b5cf6" },
  { name: "Sales", initial: "S", color: "#f59e0b" },
  { name: "Consulting", initial: "C", color: "#10b981" },
  {
    name: "Creative", initial: "C", color: "#6366f1", expanded: true,
    projects: [
      { name: "Product Roadmap", active: true },
      { name: "Another Project", active: false },
      { name: "Yet one more", active: false },
    ]
  },
];
