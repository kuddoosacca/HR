"use client";

import Link from "next/link";
import * as React from "react";

type Department = {
  id: string;
  name: string;
  lead: string;
  costCenter: string;
};

export default function DepartmentSettingsPage() {
  const [name, setName] = React.useState("");
  const [lead, setLead] = React.useState("");
  const [costCenter, setCostCenter] = React.useState("");
  const [departments, setDepartments] = React.useState<Department[]>([]);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("hr_departments");
      if (stored) {
        setDepartments(JSON.parse(stored));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem("hr_departments", JSON.stringify(departments));
    } catch {
      // ignore storage errors
    }
  }, [departments]);

  const addDepartment = () => {
    if (!name.trim()) return;
    const newDepartment: Department = {
      id: crypto.randomUUID(),
      name: name.trim(),
      lead: lead.trim() || "-",
      costCenter: costCenter.trim() || "-",
    };
    setDepartments((prev) => [newDepartment, ...prev]);
    setName("");
    setLead("");
    setCostCenter("");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Settings</p>
          <h1 className="text-2xl font-semibold">Departments</h1>
          <p className="text-sm text-slate-500">Manage department lists for payroll and reporting.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Add new department</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Department name"
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400"
            />
            <input
              value={lead}
              onChange={(event) => setLead(event.target.value)}
              placeholder="Department lead (optional)"
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400"
            />
            <input
              value={costCenter}
              onChange={(event) => setCostCenter(event.target.value)}
              placeholder="Cost center (optional)"
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400 sm:col-span-2"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={addDepartment}
              className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              Add department
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Departments</p>
          {departments.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
              No departments configured yet.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {departments.map((dept) => (
                <div key={dept.id} className="flex flex-col gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{dept.name}</p>
                    <p className="text-xs text-slate-500">{dept.lead} · {dept.costCenter}</p>
                  </div>
                  <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    Active
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/settings"
            className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Back to Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
