"use client";

import * as React from "react";
import {
  Bell,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock3,
  LayoutDashboard,
  LifeBuoy,
  Loader2,
  LogOut,
  Menu,
  Moon,
  Pencil,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const kpis = [
  {
    label: "Present Today",
    value: 186,
    trend: "+4 vs yesterday",
    icon: CheckCircle2,
    tone: "text-emerald-600",
  },
  {
    label: "Late Today",
    value: 12,
    trend: "-2 vs yesterday",
    icon: Clock3,
    tone: "text-amber-600",
  },
  {
    label: "Absent Today",
    value: 9,
    trend: "+1 vs yesterday",
    icon: LifeBuoy,
    tone: "text-rose-600",
  },
  {
    label: "Overtime Hours (week)",
    value: 74,
    trend: "+9.2% this week",
    icon: Loader2,
    tone: "text-sky-600",
  },
  {
    label: "Pending Approvals",
    value: 23,
    trend: "5 urgent",
    icon: ShieldCheck,
    tone: "text-indigo-600",
  },
  {
    label: "Payroll Run Status",
    value: "Draft",
    trend: "Next run: Jan 25",
    icon: Wallet,
    tone: "text-slate-600",
  },
];

const attendanceTrend = [
  { day: "Jan 8", present: 162 },
  { day: "Jan 9", present: 168 },
  { day: "Jan 10", present: 171 },
  { day: "Jan 11", present: 166 },
  { day: "Jan 12", present: 172 },
  { day: "Jan 13", present: 176 },
  { day: "Jan 14", present: 179 },
  { day: "Jan 15", present: 182 },
  { day: "Jan 16", present: 184 },
  { day: "Jan 17", present: 188 },
  { day: "Jan 18", present: 183 },
  { day: "Jan 19", present: 189 },
  { day: "Jan 20", present: 190 },
  { day: "Jan 21", present: 186 },
];

const overtimeByDept = [
  { department: "Engineering", hours: 18 },
  { department: "Sales", hours: 14 },
  { department: "Support", hours: 12 },
  { department: "Operations", hours: 10 },
  { department: "Finance", hours: 9 },
  { department: "Marketing", hours: 8 },
];

const employees = [
  {
    id: "EMP-1001",
    name: "Ayesha Malik",
    department: "Engineering",
    schedule: "09:00 - 18:00",
    lastCheckIn: "08:57 AM",
    status: "Present" as const,
  },
  {
    id: "EMP-1002",
    name: "Hassan Ali",
    department: "Support",
    schedule: "10:00 - 19:00",
    lastCheckIn: "10:12 AM",
    status: "Late" as const,
  },
  {
    id: "EMP-1003",
    name: "Maria Khan",
    department: "Marketing",
    schedule: "09:30 - 18:30",
    lastCheckIn: "09:28 AM",
    status: "Present" as const,
  },
  {
    id: "EMP-1004",
    name: "Omar Farooq",
    department: "Operations",
    schedule: "08:00 - 17:00",
    lastCheckIn: "--",
    status: "Absent" as const,
  },
  {
    id: "EMP-1005",
    name: "Sarah Iqbal",
    department: "Finance",
    schedule: "09:00 - 18:00",
    lastCheckIn: "09:02 AM",
    status: "Present" as const,
  },
  {
    id: "EMP-1006",
    name: "Bilal Ahmed",
    department: "Sales",
    schedule: "09:00 - 18:00",
    lastCheckIn: "09:40 AM",
    status: "Late" as const,
  },
  {
    id: "EMP-1007",
    name: "Nida Tariq",
    department: "Engineering",
    schedule: "10:00 - 19:00",
    lastCheckIn: "09:59 AM",
    status: "Present" as const,
  },
  {
    id: "EMP-1008",
    name: "Zain Raza",
    department: "Support",
    schedule: "09:00 - 18:00",
    lastCheckIn: "--",
    status: "Absent" as const,
  },
];

const requests = {
  attendance: [
    {
      id: "REQ-201",
      employee: "Ayesha Malik",
      type: "Clock-in edit",
      datetime: "Jan 21 • 09:05 AM",
      status: "Pending",
    },
    {
      id: "REQ-202",
      employee: "Bilal Ahmed",
      type: "Clock-out edit",
      datetime: "Jan 20 • 06:12 PM",
      status: "Pending",
    },
  ],
  leaves: [
    {
      id: "REQ-301",
      employee: "Sarah Iqbal",
      type: "Annual leave (2 days)",
      datetime: "Jan 24 - Jan 25",
      status: "Pending",
    },
    {
      id: "REQ-302",
      employee: "Omar Farooq",
      type: "Sick leave (1 day)",
      datetime: "Jan 22",
      status: "Pending",
    },
  ],
  overtime: [
    {
      id: "REQ-401",
      employee: "Hassan Ali",
      type: "OT approval (3h)",
      datetime: "Jan 21 • 07:00 PM",
      status: "Pending",
    },
  ],
};

const complianceAlerts = [
  {
    id: "AL-01",
    title: "Contract renewal due",
    detail: "5 employees with contracts ending this month",
    priority: "High",
  },
  {
    id: "AL-02",
    title: "Policy acknowledgment",
    detail: "12 employees have not signed the 2026 handbook",
    priority: "Medium",
  },
  {
    id: "AL-03",
    title: "Document expiry",
    detail: "4 IDs expiring in the next 30 days",
    priority: "Low",
  },
];

const quickActions = [
  {
    id: "add",
    label: "Add Employee",
    icon: Plus,
    description: "Capture core profile and assign department.",
    fields: [
      { label: "Full name", placeholder: "e.g. Ayesha Malik" },
      { label: "Department", placeholder: "e.g. Engineering" },
      { label: "Start date", placeholder: "YYYY-MM-DD" },
    ],
  },
  {
    id: "schedule",
    label: "Assign Schedule",
    icon: Calendar,
    description: "Bulk assign schedules to a team.",
    fields: [
      { label: "Department", placeholder: "e.g. Support" },
      { label: "Schedule", placeholder: "09:00 - 18:00" },
      { label: "Effective from", placeholder: "YYYY-MM-DD" },
    ],
  },
  {
    id: "payroll",
    label: "Run Payroll",
    icon: Wallet,
    description: "Start a payroll run with validations.",
    fields: [
      { label: "Payroll period", placeholder: "Jan 1 - Jan 15" },
      { label: "Approval owner", placeholder: "e.g. Finance Lead" },
    ],
  },
  {
    id: "approve",
    label: "Approve Requests",
    icon: CheckCircle2,
    description: "Bulk approve pending items.",
    fields: [
      { label: "Request type", placeholder: "Attendance / Leave" },
      { label: "Priority filter", placeholder: "Urgent only" },
    ],
  },
  {
    id: "export",
    label: "Export Report",
    icon: ShieldCheck,
    description: "Generate an HR summary export.",
    fields: [
      { label: "Report type", placeholder: "Attendance summary" },
      { label: "Format", placeholder: "CSV / PDF" },
    ],
  },
];

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Employees", icon: Users },
  { label: "Attendance", icon: Clock3 },
  { label: "Schedules", icon: Calendar },
  { label: "Payroll", icon: Wallet },
  { label: "Leaves", icon: LifeBuoy },
  { label: "Reports", icon: ShieldCheck },
  { label: "Settings", icon: Settings },
];

type StatusType = "Present" | "Late" | "Absent";

type Employee = (typeof employees)[number];

type SortKey = keyof Pick<
  Employee,
  "name" | "department" | "schedule" | "lastCheckIn" | "status"
>;

const statusBadgeStyles: Record<StatusType, string> = {
  Present: "bg-emerald-100 text-emerald-700",
  Late: "bg-amber-100 text-amber-700",
  Absent: "bg-rose-100 text-rose-700",
};

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useSort<T>(items: T[], initial: { key: keyof T; direction: "asc" | "desc" }) {
  const [sort, setSort] = React.useState(initial);

  const sorted = React.useMemo(() => {
    const cloned = [...items];
    cloned.sort((a, b) => {
      const valueA = String(a[sort.key] ?? "");
      const valueB = String(b[sort.key] ?? "");
      return sort.direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
    return cloned;
  }, [items, sort]);

  return { sorted, sort, setSort };
}

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [filter, setFilter] = React.useState<"All" | StatusType>("All");
  const [activeTab, setActiveTab] = React.useState("attendance");
  const [page, setPage] = React.useState(1);

  const { sorted, sort, setSort } = useSort(employees, {
    key: "name",
    direction: "asc",
  });

  const filtered = React.useMemo(() => {
    if (filter === "All") return sorted;
    return sorted.filter((item) => item.status === filter);
  }, [sorted, filter]);

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageSlice = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className={classNames("min-h-screen bg-slate-50 text-slate-900", theme === "dark" && "bg-slate-950 text-slate-100")}>
      <div className="flex">
        <aside
          className={classNames(
            "sticky top-0 h-screen border-r border-slate-200 bg-white px-3 py-6 transition-all duration-200",
            theme === "dark" && "border-slate-800 bg-slate-900",
            sidebarCollapsed ? "w-20" : "w-64"
          )}
        >
          <div className="flex items-center justify-between gap-2 px-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
                HR
              </div>
              {!sidebarCollapsed && (
                <div>
                  <p className="text-sm font-semibold">Master HR</p>
                  <p className="text-xs text-slate-500">Admin Console</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed((value) => !value)}
              className="hidden md:inline-flex"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          <nav className="mt-8 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={classNames(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100",
                  item.label === "Dashboard" && "bg-slate-900 text-white hover:bg-slate-900",
                  theme === "dark" && "text-slate-300 hover:bg-slate-800"
                )}
              >
                <item.icon className="h-4 w-4" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-2 px-2 pt-6">
            <Button variant="outline" className="justify-start gap-2">
              <UserRound className="h-4 w-4" />
              {!sidebarCollapsed && "Support"}
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <LogOut className="h-4 w-4" />
              {!sidebarCollapsed && "Sign out"}
            </Button>
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
              <div className="flex flex-1 items-center gap-3">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input placeholder="Search employee / PIN / code" className="pl-9" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Select
                  value="This week"
                  options={["This week", "This month", "Custom"]}
                  icon={<ChevronDown className="h-4 w-4" />}
                />
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                        MU
                      </div>
                      <span className="hidden text-sm font-medium md:inline">Master User</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Profile settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Security
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="hidden md:inline-flex"
                >
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </header>

          <section className="space-y-8 px-6 py-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold">Master HR Dashboard</h1>
                <p className="text-sm text-slate-500">Operations overview for today and the current payroll cycle.</p>
              </div>
              <Button variant="default" className="gap-2">
                <Plus className="h-4 w-4" />
                New Announcement
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {kpis.map((kpi) => (
                <Card key={kpi.label}>
                  <CardContent className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500">{kpi.label}</p>
                      <p className="mt-2 text-2xl font-semibold">
                        {kpi.value}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{kpi.trend}</p>
                    </div>
                    <div className={classNames("rounded-xl bg-slate-100 p-3", kpi.tone)}>
                      <kpi.icon className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Trend</CardTitle>
                  <CardDescription>Present employees for the last 14 days.</CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceTrend} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="present" stroke="#0f172a" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Overtime by Department</CardTitle>
                  <CardDescription>Top 6 departments this week.</CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={overtimeByDept} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="department" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#1e293b" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Shortcuts to high-impact admin workflows.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {quickActions.map((action) => (
                      <Dialog key={action.id}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="h-auto w-full justify-start gap-3 p-4">
                            <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                              <action.icon className="h-4 w-4" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-semibold">{action.label}</p>
                              <p className="text-xs text-slate-500">{action.description}</p>
                            </div>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{action.label}</DialogTitle>
                            <DialogDescription>{action.description}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            {action.fields.map((field) => (
                              <div key={field.label} className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">{field.label}</label>
                                <Input placeholder={field.placeholder} />
                              </div>
                            ))}
                          </div>
                          <DialogFooter>
                            <Button variant="ghost">Cancel</Button>
                            <Button>Submit</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Alerts</CardTitle>
                  <CardDescription>Proactive reminders to reduce HR risk.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {complianceAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold">{alert.title}</p>
                        <p className="text-xs text-slate-500">{alert.detail}</p>
                      </div>
                      <Badge variant="secondary">{alert.priority}</Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View compliance center
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
              <Card>
                <CardHeader className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <CardTitle>Employees (latest changes)</CardTitle>
                    <CardDescription>Track status, schedules, and quick actions.</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(["All", "Present", "Late", "Absent"] as const).map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={filter === status ? "default" : "outline"}
                        onClick={() => {
                          setFilter(status);
                          setPage(1);
                        }}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {(
                          [
                            { label: "Employee", key: "name" },
                            { label: "Department", key: "department" },
                            { label: "Schedule", key: "schedule" },
                            { label: "Last Check-in", key: "lastCheckIn" },
                            { label: "Status", key: "status" },
                          ] as const
                        ).map((column) => (
                          <TableHead key={column.key}>
                            <button
                              className="flex items-center gap-1 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                              onClick={() =>
                                setSort({
                                  key: column.key,
                                  direction:
                                    sort.key === column.key && sort.direction === "asc"
                                      ? "desc"
                                      : "asc",
                                })
                              }
                            >
                              {column.label}
                              <ChevronDown className="h-3 w-3" />
                            </button>
                          </TableHead>
                        ))}
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pageSlice.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <div>
                              <p className="text-sm font-semibold">{employee.name}</p>
                              <p className="text-xs text-slate-500">{employee.id}</p>
                            </div>
                          </TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.schedule}</TableCell>
                          <TableCell>{employee.lastCheckIn}</TableCell>
                          <TableCell>
                            <Badge className={statusBadgeStyles[employee.status]}>
                              {employee.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-1">
                                  Actions
                                  <ChevronDown className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <UserRound className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ShieldCheck className="mr-2 h-4 w-4" />
                                  Reset PIN
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-slate-500">
                      Showing {pageSlice.length} of {filtered.length} employees
                    </p>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" onClick={() => setPage(1)}>
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setPage(Math.max(1, currentPage - 1))}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-xs font-medium">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button size="icon" variant="ghost" onClick={() => setPage(Math.min(totalPages, currentPage + 1))}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setPage(totalPages)}>
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Requests</CardTitle>
                  <CardDescription>Review and approve quickly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="attendance">Attendance edits</TabsTrigger>
                      <TabsTrigger value="leaves">Leave requests</TabsTrigger>
                      <TabsTrigger value="overtime">Overtime requests</TabsTrigger>
                    </TabsList>
                    <TabsContent value="attendance">
                      <RequestList items={requests.attendance} />
                    </TabsContent>
                    <TabsContent value="leaves">
                      <RequestList items={requests.leaves} />
                    </TabsContent>
                    <TabsContent value="overtime">
                      <RequestList items={requests.overtime} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function RequestList({
  items,
}: {
  items: Array<{ id: string; employee: string; type: string; datetime: string; status: string }>;
}) {
  return (
    <div className="mt-4 space-y-4">
      {items.map((item) => (
        <div key={item.id} className="rounded-xl border border-slate-200 px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">{item.employee}</p>
              <p className="text-xs text-slate-500">{item.type}</p>
              <p className="text-xs text-slate-400">{item.datetime}</p>
            </div>
            <Badge variant="outline">{item.status}</Badge>
          </div>
          <div className="mt-3 flex gap-2">
            <Button size="sm" className="flex-1">Approve</Button>
            <Button size="sm" variant="outline" className="flex-1">Reject</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Button({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "md" | "sm" | "icon";
}) {
  const base = "inline-flex items-center justify-center rounded-xl text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50";
  const variants: Record<string, string> = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-200 text-slate-700 hover:bg-slate-100",
    ghost: "text-slate-600 hover:bg-slate-100",
    secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
  };
  const sizes: Record<string, string> = {
    md: "h-10 px-4",
    sm: "h-8 px-3 text-xs",
    icon: "h-9 w-9",
  };
  return (
    <button className={classNames(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={classNames(
        "flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
        className
      )}
      {...props}
    />
  );
}

function Select({
  value,
  options,
  icon,
}: {
  value: string;
  options: string[];
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        defaultValue={value}
        className="h-10 appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-9 text-sm text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </span>
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={classNames("rounded-2xl border border-slate-200 bg-white shadow-sm", className)}>
      {children}
    </div>
  );
}

function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={classNames("px-6 pt-6", className)}>{children}</div>;
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-sm text-slate-500">{children}</p>;
}

function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={classNames("px-6 pb-6 pt-4", className)}>{children}</div>;
}

function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline";
}) {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold";
  const variants: Record<string, string> = {
    default: "bg-slate-900 text-white",
    secondary: "bg-slate-100 text-slate-700",
    outline: "border border-slate-200 text-slate-600",
  };
  return <span className={classNames(base, variants[variant], className)}>{children}</span>;
}

function Table({ children }: { children: React.ReactNode }) {
  return <div className="w-full overflow-x-auto">{children}</div>;
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>;
}

function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-slate-200">{children}</tbody>;
}

function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="text-sm text-slate-700">{children}</tr>;
}

function TableHead({ children }: { children: React.ReactNode }) {
  return <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase text-slate-400">{children}</th>;
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="whitespace-nowrap px-4 py-3 align-middle">{children}</td>;
}

type DropdownMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-flex" onBlur={() => setOpen(false)}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({ children, asChild }: { children: React.ReactElement; asChild?: boolean }) {
  const context = React.useContext(DropdownMenuContext);
  if (!context) return null;
  const triggerProps = {
    onClick: () => context.setOpen(!context.open),
  };
  return asChild ? React.cloneElement(children, triggerProps) : <button {...triggerProps}>{children}</button>;
}

function DropdownMenuContent({ children, align = "start" }: { children: React.ReactNode; align?: "start" | "end" }) {
  const context = React.useContext(DropdownMenuContext);
  if (!context?.open) return null;
  return (
    <div
      className={classNames(
        "absolute z-20 mt-2 min-w-[180px] rounded-xl border border-slate-200 bg-white p-2 shadow-lg",
        align === "end" ? "right-0" : "left-0"
      )}
    >
      {children}
    </div>
  );
}

function DropdownMenuItem({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
      {children}
    </button>
  );
}

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
};

const TabsContext = React.createContext<TabsProps | null>(null);

function Tabs({ value, onValueChange, children }: TabsProps) {
  return <TabsContext.Provider value={{ value, onValueChange, children }}>{children}</TabsContext.Provider>;
}

function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2 rounded-xl bg-slate-100 p-1">{children}</div>;
}

function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const context = React.useContext(TabsContext);
  if (!context) return null;
  const isActive = context.value === value;
  return (
    <button
      className={classNames(
        "rounded-lg px-3 py-2 text-xs font-semibold",
        isActive ? "bg-white text-slate-900 shadow" : "text-slate-500"
      )}
      onClick={() => context.onValueChange(value)}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  const context = React.useContext(TabsContext);
  if (!context || context.value !== value) return null;
  return <div className="mt-4">{children}</div>;
}

type DialogContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function Dialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>;
}

function DialogTrigger({ children, asChild }: { children: React.ReactElement; asChild?: boolean }) {
  const context = React.useContext(DialogContext);
  if (!context) return null;
  const triggerProps = { onClick: () => context.setOpen(true) };
  return asChild ? React.cloneElement(children, triggerProps) : <button {...triggerProps}>{children}</button>;
}

function DialogContent({ children }: { children: React.ReactNode }) {
  const context = React.useContext(DialogContext);
  if (!context?.open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40" onClick={() => context.setOpen(false)} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        {children}
      </div>
    </div>
  );
}

function DialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 space-y-1">{children}</div>;
}

function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}

function DialogDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-slate-500">{children}</p>;
}

function DialogFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex justify-end gap-2">{children}</div>;
}
