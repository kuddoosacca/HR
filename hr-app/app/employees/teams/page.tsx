"use client";

import Link from "next/link";
import * as React from "react";
import { FileText, Pencil, RotateCcw, UserPlus } from "lucide-react";

type Correspondence = {
  id: string;
  subject: string;
  message: string;
  date: string;
};

type EmployeeProfile = {
  id: string;
  fullName: string;
  department: string;
  role: string;
  employeeCode: string;
  status: string;
  workLocation: string;
  civilId: string;
  passportNumber: string;
  residencyNumber: string;
  basicSalary: string;
  bankName: string;
  iban: string;
  dependents: Array<{
    id: string;
    name: string;
    relationship: string;
    dob: string;
    civilId: string;
  }>;
  correspondence: Correspondence[];
};

export default function TeamsPage() {
  const [employees, setEmployees] = React.useState<EmployeeProfile[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [noteSubject, setNoteSubject] = React.useState("");
  const [noteMessage, setNoteMessage] = React.useState("");
  const [search, setSearch] = React.useState("");
  const createId = React.useCallback(() => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }, []);

  const reloadEmployees = React.useCallback(() => {
    try {
      const storedEmployees = localStorage.getItem("hr_employees");
      const parsed = storedEmployees ? JSON.parse(storedEmployees) : [];
      setEmployees(Array.isArray(parsed) ? parsed : []);
    } catch {
      setEmployees([]);
    }
  }, []);

  React.useEffect(() => {
    reloadEmployees();
    const handleFocus = () => reloadEmployees();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [reloadEmployees]);

  const selectedEmployee = employees.find((item) => item.id === selectedId) || null;
  const filteredEmployees = employees.filter((employee) => {
    if (!search.trim()) return true;
    const haystack = [
      employee.fullName,
      employee.employeeCode,
      employee.workLocation,
      employee.role,
      employee.status,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(search.trim().toLowerCase());
  });

  const addCorrespondence = () => {
    if (!selectedEmployee || !noteSubject.trim() || !noteMessage.trim()) return;
    const newEntry: Correspondence = {
      id: createId(),
      subject: noteSubject.trim(),
      message: noteMessage.trim(),
      date: new Date().toISOString().slice(0, 10),
    };
    setEmployees((prev) =>
      prev.map((item) =>
        item.id === selectedEmployee.id
          ? { ...item, correspondence: [newEntry, ...item.correspondence] }
          : item
      )
    );
    setNoteSubject("");
    setNoteMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Employee database</p>
            <h1 className="text-2xl font-semibold">Employee Master Records (Kuwait-ready)</h1>
            <p className="text-sm text-slate-500">
              Complete employee profiles with identity, residency, payroll, and compliance details.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/employees"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Back to Employees
            </Link>
            <Link
              href="/employees/teams/add"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              <UserPlus className="h-4 w-4" />
              Add new employee
            </Link>
            <button
              onClick={reloadEmployees}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              <RotateCcw className="h-4 w-4" />
              Refresh
            </button>
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Settings
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr,1.15fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Employees ({employees.length})</p>
                <FileText className="h-5 w-5 text-slate-400" />
              </div>
              <div className="mt-4">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name, code, role, location..."
                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
                />
              </div>
              {employees.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                  No employees added yet.
                </div>
              ) : (
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full table-fixed text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400">
                      <tr>
                        <th className="px-4 py-2">Employee #</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Work location</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredEmployees.map((employee) => (
                        <tr
                          key={employee.id}
                          onClick={() => setSelectedId(employee.id)}
                          className={`cursor-pointer ${
                            selectedId === employee.id
                              ? "bg-slate-50"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <td className="px-4 py-3 text-xs font-semibold text-slate-700">{employee.employeeCode || "-"}</td>
                          <td className="px-4 py-3">
                            <Link
                              href={`/employees/teams/view?id=${employee.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-slate-900 hover:text-slate-700"
                              onClick={(event) => event.stopPropagation()}
                            >
                              {employee.fullName}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-600">{employee.workLocation || "-"}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex w-fit rounded-full px-2 py-1 text-[11px] font-semibold ${
                                employee.status === "Active"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {employee.status || "-"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-600">{employee.role || "Role not set"}</td>
                          <td className="px-4 py-3">
                            <Link
                              href={`/employees/teams/add?id=${employee.id}`}
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                              onClick={(event) => event.stopPropagation()}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Employee details</p>
            </div>
            {!selectedEmployee ? (
              <div className="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
                Select an employee to view their full profile.
              </div>
            ) : (
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-slate-900">{selectedEmployee.fullName}</p>
                  <p className="text-xs text-slate-500">{selectedEmployee.role || "Role"} · {selectedEmployee.department || "Department"}</p>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-xl border border-slate-200 px-4 py-3">
                    <p className="text-xs font-semibold uppercase text-slate-400">Identity</p>
                    <p className="text-sm">Civil ID: {selectedEmployee.civilId || "-"}</p>
                    <p className="text-sm">Passport: {selectedEmployee.passportNumber || "-"}</p>
                    <p className="text-sm">Residency/Iqama: {selectedEmployee.residencyNumber || "-"}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 px-4 py-3">
                    <p className="text-xs font-semibold uppercase text-slate-400">Employment</p>
                    <p className="text-sm">Code: {selectedEmployee.employeeCode || "-"}</p>
                    <p className="text-sm">Status: {selectedEmployee.status}</p>
                    <p className="text-sm">Location: {selectedEmployee.workLocation || "-"}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 px-4 py-3">
                    <p className="text-xs font-semibold uppercase text-slate-400">Payroll</p>
                    <p className="text-sm">Basic salary: {selectedEmployee.basicSalary || "-"}</p>
                    <p className="text-sm">Bank: {selectedEmployee.bankName || "-"}</p>
                    <p className="text-sm">IBAN: {selectedEmployee.iban || "-"}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 px-4 py-3">
                  <p className="text-xs font-semibold uppercase text-slate-400">Dependents</p>
                  {selectedEmployee.dependents.length === 0 ? (
                    <p className="text-sm text-slate-500">No dependents added.</p>
                  ) : (
                    <div className="mt-2 space-y-2">
                      {selectedEmployee.dependents.map((dep) => (
                        <div key={dep.id} className="text-sm">
                          <p className="font-semibold text-slate-900">{dep.name}</p>
                          <p className="text-xs text-slate-500">{dep.relationship} · {dep.dob || "-"} · {dep.civilId}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-slate-200 px-4 py-3">
                  <p className="text-xs font-semibold uppercase text-slate-400">Correspondence & notes</p>
                  <div className="mt-3 grid gap-2">
                    <input
                      value={noteSubject}
                      onChange={(event) => setNoteSubject(event.target.value)}
                      placeholder="Subject"
                      className="h-9 rounded-lg border border-slate-200 px-3 text-sm"
                    />
                    <textarea
                      value={noteMessage}
                      onChange={(event) => setNoteMessage(event.target.value)}
                      placeholder="Write a note, letter, or follow-up."
                      className="min-h-[90px] rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                    <button
                      onClick={addCorrespondence}
                      className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                    >
                      Add correspondence
                    </button>
                  </div>
                  {selectedEmployee.correspondence.length === 0 ? (
                    <p className="mt-3 text-sm text-slate-500">No correspondence yet.</p>
                  ) : (
                    <div className="mt-3 space-y-3">
                      {selectedEmployee.correspondence.map((note) => (
                        <div key={note.id} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
                          <p className="text-xs text-slate-500">{note.date}</p>
                          <p className="font-semibold text-slate-900">{note.subject}</p>
                          <p className="text-sm text-slate-600">{note.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
