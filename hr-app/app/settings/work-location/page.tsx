"use client";

import Link from "next/link";
import * as React from "react";

type WorkLocation = {
  id: string;
  name: string;
  city: string;
  address: string;
  type: string;
};

export default function WorkLocationSettingsPage() {
  const [name, setName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [type, setType] = React.useState("Office");
  const [locations, setLocations] = React.useState<WorkLocation[]>([]);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("hr_work_locations");
      if (stored) {
        setLocations(JSON.parse(stored));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem("hr_work_locations", JSON.stringify(locations));
    } catch {
      // ignore storage errors
    }
  }, [locations]);

  const addLocation = () => {
    if (!name.trim()) return;
    if (editingId) {
      setLocations((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: name.trim(),
                city: city.trim() || "-",
                address: address.trim() || "-",
                type,
              }
            : item
        )
      );
    } else {
      const newLocation: WorkLocation = {
        id: crypto.randomUUID(),
        name: name.trim(),
        city: city.trim() || "-",
        address: address.trim() || "-",
        type,
      };
      setLocations((prev) => [newLocation, ...prev]);
    }
    setName("");
    setCity("");
    setAddress("");
    setType("Office");
    setEditingId(null);
  };

  const deleteLocation = (id: string) => {
    setLocations((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setName("");
      setCity("");
      setAddress("");
      setType("Office");
    }
  };

  const startEdit = (item: WorkLocation) => {
    setEditingId(item.id);
    setName(item.name);
    setCity(item.city === "-" ? "" : item.city);
    setAddress(item.address === "-" ? "" : item.address);
    setType(item.type);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setCity("");
    setAddress("");
    setType("Office");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Settings</p>
          <h1 className="text-2xl font-semibold">Work Locations</h1>
          <p className="text-sm text-slate-500">Define office locations, remote hubs, and branches.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">
            {editingId ? "Edit location" : "Add new location"}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Location name"
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400"
            />
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="City"
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400"
            />
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Address"
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400 sm:col-span-2"
            />
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-slate-400 sm:col-span-2"
            >
              <option>Office</option>
              <option>Remote hub</option>
              <option>Branch</option>
            </select>
          </div>
          <div className="mt-4 flex flex-wrap justify-end gap-2">
            {editingId ? (
              <button
                onClick={cancelEdit}
                className="inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
            ) : null}
            <button
              onClick={addLocation}
              className="inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              {editingId ? "Save changes" : "Add location"}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">Locations</p>
          {locations.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-sm text-slate-500">
              No work locations configured yet.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {locations.map((item) => (
                <div key={item.id} className="flex flex-col gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.city} · {item.type}</p>
                    <p className="text-xs text-slate-500">{item.address}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteLocation(item.id)}
                      className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      Delete
                    </button>
                  </div>
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
