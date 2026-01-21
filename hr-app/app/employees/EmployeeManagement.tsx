"use client";

import * as React from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  FileDown,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";

type Status = "Active" | "On Leave" | "Offboarded";

type Employee = {
  id: string;
  name: string;
  department: string;
  role: string;
  status: Status;
  location: string;
  startDate: string;
  email: string;
  phone: string;
  schedule: string;
};

const employees: Employee[] = [];

const summaryCards: Array<{ label: string; value: number; icon: typeof Users }> = [];

const lifecycleStages: Array<{ label: string; value: number }> = [];

const documentChecklist: Array<{ label: string; status: string }> = [];

const hiringPipeline: Array<{ label: string; value: number }> = [];

const statusStyles: Record<Status, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  "On Leave": "bg-amber-100 text-amber-700",
  Offboarded: "bg-rose-100 text-rose-700",
};

type SortKey = "name" | "department" | "startDate";

export default function EmployeeManagement() {
  const [statusFilter, setStatusFilter] = React.useState<"All" | Status>("All");
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState<{ key: SortKey; direction: "asc" | "desc" }>({
    key: "name",
    direction: "asc",
  });
  const [page, setPage] = React.useState(1);
  const [selectedId, setSelectedId] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const filtered = React.useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = employees.filter((employee) => {
      const matchesStatus = statusFilter === "All" || employee.status === statusFilter;
      const matchesSearch =
        !term ||
        employee.name.toLowerCase().includes(term) ||
        employee.department.toLowerCase().includes(term) ||
        employee.id.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });

    const sorted = [...list].sort((a, b) => {
      const valueA = a[sort.key].toString();
      const valueB = b[sort.key].toString();
      return sort.direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    return sorted;
  }, [search, statusFilter, sort]);

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const selectedEmployee = employees.find((employee) => employee.id === selectedId) ?? null;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Employee management</p>
            <h1 className="text-2xl font-semibold">Employees</h1>
            <p className="text-sm text-slate-500">Manage profiles, roles, and approvals in one place.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/hr"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Back to HR Dashboard
            </Link>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              <FileDown className="h-4 w-4" />
              Export
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              <Plus className="h-4 w-4" />
              Import CSV
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              <UserPlus className="h-4 w-4" />
              Add employee
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-5 text-center text-sm text-slate-500">
              No employee metrics yet
            </div>
          ) : (
            summaryCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">{card.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
                  </div>
                  <div className="rounded-xl bg-slate-100 p-2 text-slate-600">
                    <card.icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search employee / ID / department"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                />
              </div>
              <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600">
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(["All", "Active", "On Leave", "Offboarded"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status as "All" | Status);
                    setPage(1);
                  }}
                  className={
                    statusFilter === status
                      ? "rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white"
                      : "rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
                  }
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    {(
                      [
                        { label: "Employee", key: "name" },
                        { label: "Department", key: "department" },
                        { label: "Status", key: "status" },
                        { label: "Start date", key: "startDate" },
                      ] as const
                    ).map((column) => (
                      <th key={column.key} className="whitespace-nowrap px-3 py-3 text-left">
                        <button
                          onClick={() =>
                            setSort({
                              key: column.key as SortKey,
                              direction:
                                sort.key === column.key && sort.direction === "asc" ? "desc" : "asc",
                            })
                          }
                          className="inline-flex items-center gap-1 font-semibold"
                        >
                          {column.label}
                          <MoreHorizontal className="h-3 w-3 text-slate-300" />
                        </button>
                      </th>
                    ))}
                    <th className="px-3 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {pageItems.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-3 py-6 text-center text-sm text-slate-500">
                        No employees yet
                      </td>
                    </tr>
                  ) : (
                    pageItems.map((employee) => (
                      <tr
                        key={employee.id}
                        onClick={() => setSelectedId(employee.id)}
                        className="cursor-pointer text-slate-700 hover:bg-slate-50"
                      >
                        <td className="px-3 py-3">
                          <div className="font-semibold text-slate-900">{employee.name}</div>
                          <div className="text-xs text-slate-400">{employee.id}</div>
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-slate-400" />
                            {employee.department}
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[employee.status]}`}>
                            {employee.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-slate-500">{employee.startDate}</td>
                        <td className="px-3 py-3 text-right">
                          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
                            <CheckCircle2 className="h-4 w-4" />
                            Review
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <span>Showing {pageItems.length} of {filtered.length} employees</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(1)}
                  className="rounded-lg border border-slate-200 px-2 py-1 text-slate-500"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage(Math.max(1, currentPage - 1))}
                  className="rounded-lg border border-slate-200 px-2 py-1 text-slate-500"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                  className="rounded-lg border border-slate-200 px-2 py-1 text-slate-500"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage(totalPages)}
                  className="rounded-lg border border-slate-200 px-2 py-1 text-slate-500"
                >
                  <ChevronsRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {selectedEmployee ? (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{selectedEmployee.name}</p>
                      <p className="text-xs text-slate-500">{selectedEmployee.role}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[selectedEmployee.status]}`}>
                      {selectedEmployee.status}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      {selectedEmployee.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      {selectedEmployee.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-slate-400" />
                      {selectedEmployee.department} · {selectedEmployee.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-slate-400" />
                      {selectedEmployee.schedule}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      Started on {selectedEmployee.startDate}
                    </div>
                  </div>
                  <div className="mt-6 grid gap-2">
                    <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                      <CheckCircle2 className="h-4 w-4" />
                      Approve change
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
                      <ShieldCheck className="h-4 w-4" />
                      View access
                    </button>
                  </div>
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                  No employee selected
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Lifecycle overview</p>
              {lifecycleStages.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                  No lifecycle data yet
                </div>
              ) : (
                <div className="mt-4 grid gap-3">
                  {lifecycleStages.map((stage) => (
                    <div key={stage.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <span className="text-sm font-medium text-slate-600">{stage.label}</span>
                      <span className="text-lg font-semibold text-slate-900">{stage.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Quick actions</p>
              <div className="mt-4 grid gap-2">
                <button className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">
                  Send onboarding email
                  <Mail className="h-4 w-4 text-slate-400" />
                </button>
                <button className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">
                  Update schedule
                  <Clock className="h-4 w-4 text-slate-400" />
                </button>
                <button className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100">
                  Promote role
                  <BadgeCheck className="h-4 w-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Documents checklist</p>
              {documentChecklist.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                  No documents yet
                </div>
              ) : (
                <div className="mt-4 space-y-3 text-sm">
                  {documentChecklist.map((doc) => (
                    <div key={doc.label} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-2">
                      <span className="text-slate-600">{doc.label}</span>
                      <span className={doc.status === "Received" ? "text-emerald-600" : "text-amber-600"}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Hiring pipeline</p>
              {hiringPipeline.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                  No hiring pipeline yet
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {hiringPipeline.map((stage) => (
                    <div key={stage.label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-slate-600">{stage.label}</span>
                      <span className="text-base font-semibold text-slate-900">{stage.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">Add new employee</h2>
                <p className="text-sm text-slate-500">Capture the essential profile details.</p>
              </div>
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-500"
              >
                Close
              </button>
            </div>
            <div className="mt-4 grid gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500">Full name</label>
                <input className="h-10 rounded-xl border border-slate-200 px-3 text-sm" placeholder="Full name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500">Department</label>
                <div className="flex gap-2">
                  <input className="h-10 flex-1 rounded-xl border border-slate-200 px-3 text-sm" placeholder="Department" />
                  <button className="h-10 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-600">
                    Create department
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500">Job role</label>
                <div className="flex gap-2">
                  <input className="h-10 flex-1 rounded-xl border border-slate-200 px-3 text-sm" placeholder="Job role" />
                  <button className="h-10 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-600">
                    Create job role
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500">Start date</label>
                <input type="date" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                Save employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
