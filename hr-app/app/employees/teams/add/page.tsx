"use client";

import Link from "next/link";
import * as React from "react";
import { PlusCircle, UserPlus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

type Dependent = {
  id: string;
  name: string;
  relationship: string;
  dob: string;
  civilId: string;
};

type EmployeeProfile = {
  id: string;
  fullName: string;
  arabicName: string;
  gender: string;
  dob: string;
  nationality: string;
  maritalStatus: string;
  placeOfBirth: string;
  civilId: string;
  civilIdExpiry: string;
  passportNumber: string;
  passportExpiry: string;
  residencyNumber: string;
  residencyExpiry: string;
  visaType: string;
  workPermitNumber: string;
  workPermitExpiry: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  area: string;
  country: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  employeeCode: string;
  joinDate: string;
  contractType: string;
  status: string;
  workLocation: string;
  department: string;
  role: string;
  manager: string;
  grade: string;
  basicSalary: string;
  allowances: string;
  payFrequency: string;
  overtimeEligible: string;
  bankName: string;
  iban: string;
  accountNumber: string;
  salaryTransferDate: string;
  healthInsuranceProvider: string;
  healthInsuranceExpiry: string;
  medicalTestDate: string;
  drivingLicenseNumber: string;
  drivingLicenseExpiry: string;
  dependents: Dependent[];
  correspondence: Array<{ id: string; subject: string; message: string; date: string }>;
};

const initialEmployee: Omit<EmployeeProfile, "id" | "dependents" | "correspondence"> = {
  fullName: "",
  arabicName: "",
  gender: "Male",
  dob: "",
  nationality: "",
  maritalStatus: "Single",
  placeOfBirth: "",
  civilId: "",
  civilIdExpiry: "",
  passportNumber: "",
  passportExpiry: "",
  residencyNumber: "",
  residencyExpiry: "",
  visaType: "Work",
  workPermitNumber: "",
  workPermitExpiry: "",
  email: "",
  phone: "",
  addressLine: "",
  city: "",
  area: "",
  country: "Kuwait",
  emergencyName: "",
  emergencyPhone: "",
  emergencyRelation: "",
  employeeCode: "",
  joinDate: "",
  contractType: "Full-time",
  status: "Active",
  workLocation: "",
  department: "",
  role: "",
  manager: "",
  grade: "",
  basicSalary: "",
  allowances: "",
  payFrequency: "Monthly",
  overtimeEligible: "No",
  bankName: "",
  iban: "",
  accountNumber: "",
  salaryTransferDate: "",
  healthInsuranceProvider: "",
  healthInsuranceExpiry: "",
  medicalTestDate: "",
  drivingLicenseNumber: "",
  drivingLicenseExpiry: "",
};

type OptionItem = { id: string; name?: string; title?: string };

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Côte d’Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (Swaziland)",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default function AddEmployeePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editingId = searchParams.get("id");
  const createId = React.useCallback(() => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }, []);
  const [form, setForm] = React.useState(initialEmployee);
  const [dependents, setDependents] = React.useState<Dependent[]>([]);
  const [dependentName, setDependentName] = React.useState("");
  const [dependentRelationship, setDependentRelationship] = React.useState("");
  const [dependentDob, setDependentDob] = React.useState("");
  const [dependentCivilId, setDependentCivilId] = React.useState("");
  const [workLocations, setWorkLocations] = React.useState<OptionItem[]>([]);
  const [departments, setDepartments] = React.useState<OptionItem[]>([]);
  const [roles, setRoles] = React.useState<OptionItem[]>([]);
  const [lastGeneratedCode, setLastGeneratedCode] = React.useState<string | null>(null);

  const readEmployees = React.useCallback((): EmployeeProfile[] => {
    try {
      const stored = localStorage.getItem("hr_employees");
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, []);

  const writeEmployees = React.useCallback((items: EmployeeProfile[]) => {
    try {
      localStorage.setItem("hr_employees", JSON.stringify(items));
      localStorage.setItem("hr_employees_last_saved", new Date().toISOString());
    } catch {
      // ignore storage errors
    }
  }, []);

  const getNextEmployeeCode = React.useCallback((items: EmployeeProfile[]) => {
    const prefix = "EMP-";
    const used = new Set<number>();
    items.forEach((item) => {
      const match = String(item.employeeCode || "").match(/(\d+)/);
      if (match) {
        const num = Number(match[1]);
        if (!Number.isNaN(num)) used.add(num);
      }
    });
    let candidate = 1;
    while (used.has(candidate)) candidate += 1;
    return `${prefix}${String(candidate).padStart(4, "0")}`;
  }, []);

  const loadOptions = React.useCallback(() => {
    try {
      const storedLocations = localStorage.getItem("hr_work_locations");
      const storedDepartments = localStorage.getItem("hr_departments");
      const storedRoles = localStorage.getItem("hr_employee_roles");
      setWorkLocations(storedLocations ? JSON.parse(storedLocations) : []);
      setDepartments(storedDepartments ? JSON.parse(storedDepartments) : []);
      setRoles(storedRoles ? JSON.parse(storedRoles) : []);
    } catch {
      setWorkLocations([]);
      setDepartments([]);
      setRoles([]);
    }
  }, []);

  React.useEffect(() => {
    loadOptions();
  }, [loadOptions]);

  React.useEffect(() => {
    if (!editingId) return;
    try {
      const parsed = readEmployees();
      const match = parsed.find((item) => item.id === editingId);
      if (match) {
        setForm({
          fullName: match.fullName || "",
          arabicName: match.arabicName || "",
          gender: match.gender || "Male",
          dob: match.dob || "",
          nationality: match.nationality || "",
          maritalStatus: match.maritalStatus || "Single",
          placeOfBirth: match.placeOfBirth || "",
          civilId: match.civilId || "",
          civilIdExpiry: match.civilIdExpiry || "",
          passportNumber: match.passportNumber || "",
          passportExpiry: match.passportExpiry || "",
          residencyNumber: match.residencyNumber || "",
          residencyExpiry: match.residencyExpiry || "",
          visaType: match.visaType || "Work",
          workPermitNumber: match.workPermitNumber || "",
          workPermitExpiry: match.workPermitExpiry || "",
          email: match.email || "",
          phone: match.phone || "",
          addressLine: match.addressLine || "",
          city: match.city || "",
          area: match.area || "",
          country: match.country || "Kuwait",
          emergencyName: match.emergencyName || "",
          emergencyPhone: match.emergencyPhone || "",
          emergencyRelation: match.emergencyRelation || "",
          employeeCode: match.employeeCode || "",
          joinDate: match.joinDate || "",
          contractType: match.contractType || "Full-time",
          status: match.status || "Active",
          workLocation: match.workLocation || "",
          department: match.department || "",
          role: match.role || "",
          manager: match.manager || "",
          grade: match.grade || "",
          basicSalary: match.basicSalary || "",
          allowances: match.allowances || "",
          payFrequency: match.payFrequency || "Monthly",
          overtimeEligible: match.overtimeEligible || "No",
          bankName: match.bankName || "",
          iban: match.iban || "",
          accountNumber: match.accountNumber || "",
          salaryTransferDate: match.salaryTransferDate || "",
          healthInsuranceProvider: match.healthInsuranceProvider || "",
          healthInsuranceExpiry: match.healthInsuranceExpiry || "",
          medicalTestDate: match.medicalTestDate || "",
          drivingLicenseNumber: match.drivingLicenseNumber || "",
          drivingLicenseExpiry: match.drivingLicenseExpiry || "",
        });
        setDependents(match.dependents || []);
      }
    } catch {
      // ignore storage errors
    }
  }, [editingId]);

  React.useEffect(() => {
    if (editingId) return;
    if (form.employeeCode.trim()) return;
    const nextCode = getNextEmployeeCode(readEmployees());
    setForm((prev) => ({ ...prev, employeeCode: nextCode }));
    setLastGeneratedCode(nextCode);
  }, [editingId, form.employeeCode, getNextEmployeeCode, readEmployees]);

  const updateField = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const addDependent = () => {
    if (!dependentName.trim()) return;
    setDependents((prev) => [
      ...prev,
      {
        id: createId(),
        name: dependentName.trim(),
        relationship: dependentRelationship.trim() || "-",
        dob: dependentDob,
        civilId: dependentCivilId.trim() || "-",
      },
    ]);
    setDependentName("");
    setDependentRelationship("");
    setDependentDob("");
    setDependentCivilId("");
  };

  const addEmployee = () => {
    if (!form.fullName.trim()) return;
    try {
      const parsed = readEmployees();
      const existingCodes = new Set(
        parsed
          .filter((item) => !editingId || item.id !== editingId)
          .map((item) => String(item.employeeCode || "").trim())
          .filter(Boolean)
      );
      let finalEmployeeCode = form.employeeCode.trim();
      if (!finalEmployeeCode || existingCodes.has(finalEmployeeCode)) {
        finalEmployeeCode = getNextEmployeeCode(parsed);
      }
      if (editingId) {
        const updated = parsed.map((item) =>
          item.id === editingId
            ? { ...item, ...form, employeeCode: finalEmployeeCode, dependents }
            : item
        );
        writeEmployees(updated);
      } else {
        const newEmployee: EmployeeProfile = {
          id: createId(),
          ...form,
          employeeCode: finalEmployeeCode,
          dependents,
          correspondence: [],
        };
        writeEmployees([newEmployee, ...parsed]);
      }
    } catch {
      // ignore storage errors
    }

    setForm(initialEmployee);
    setLastGeneratedCode(null);
    setDependents([]);
    router.push("/employees/teams");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Employee database</p>
            <h1 className="text-2xl font-semibold">{editingId ? "Edit employee" : "Add new employee"}</h1>
            <p className="text-sm text-slate-500">Complete the Kuwait-ready employee profile.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/employees/teams"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Back to list
            </Link>
            <button
              onClick={loadOptions}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Refresh options
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Employee profile</p>
              <p className="text-xs text-slate-500">Fill required information before saving.</p>
            </div>
            <UserPlus className="h-5 w-5 text-slate-400" />
          </div>

          <div className="mt-6 space-y-6">
            <section className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">Personal information</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={form.fullName} onChange={updateField("fullName")} placeholder="Full name" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.arabicName} onChange={updateField("arabicName")} placeholder="Arabic name" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <select value={form.gender} onChange={updateField("gender")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <input type="date" value={form.dob} onChange={updateField("dob")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input
                  value={form.nationality}
                  onChange={updateField("nationality")}
                  placeholder="Nationality"
                  list="country-options"
                  className="h-10 rounded-xl border border-slate-200 px-3 text-sm"
                />
                <datalist id="country-options">
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country} />
                  ))}
                </datalist>
                <select value={form.maritalStatus} onChange={updateField("maritalStatus")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm">
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </select>
                <input value={form.placeOfBirth} onChange={updateField("placeOfBirth")} placeholder="Place of birth" className="h-10 rounded-xl border border-slate-200 px-3 text-sm sm:col-span-2" />
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">Identification & residency</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={form.civilId} onChange={updateField("civilId")} placeholder="Civil ID number" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input type="date" value={form.civilIdExpiry} onChange={updateField("civilIdExpiry")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.passportNumber} onChange={updateField("passportNumber")} placeholder="Passport number" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input type="date" value={form.passportExpiry} onChange={updateField("passportExpiry")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.residencyNumber} onChange={updateField("residencyNumber")} placeholder="Residency/Iqama number" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input type="date" value={form.residencyExpiry} onChange={updateField("residencyExpiry")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.visaType} onChange={updateField("visaType")} placeholder="Visa type" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.workPermitNumber} onChange={updateField("workPermitNumber")} placeholder="Work permit number" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input type="date" value={form.workPermitExpiry} onChange={updateField("workPermitExpiry")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">Contact & address</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={form.email} onChange={updateField("email")} placeholder="Work email" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.phone} onChange={updateField("phone")} placeholder="Mobile number" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.addressLine} onChange={updateField("addressLine")} placeholder="Address line" className="h-10 rounded-xl border border-slate-200 px-3 text-sm sm:col-span-2" />
                <input value={form.city} onChange={updateField("city")} placeholder="City" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.area} onChange={updateField("area")} placeholder="Area / block" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.country} onChange={updateField("country")} placeholder="Country" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <input value={form.emergencyName} onChange={updateField("emergencyName")} placeholder="Emergency contact" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.emergencyPhone} onChange={updateField("emergencyPhone")} placeholder="Emergency phone" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.emergencyRelation} onChange={updateField("emergencyRelation")} placeholder="Relationship" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">Employment</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span>Manage dropdowns:</span>
                <Link href="/settings/work-location" className="font-semibold text-slate-700 hover:text-slate-900">
                  Work locations
                </Link>
                <span>·</span>
                <Link href="/settings/department" className="font-semibold text-slate-700 hover:text-slate-900">
                  Departments
                </Link>
                <span>·</span>
                <Link href="/settings/employee-role" className="font-semibold text-slate-700 hover:text-slate-900">
                  Roles
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <input
                    value={form.employeeCode}
                    onChange={updateField("employeeCode")}
                    placeholder="Employee code"
                    className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm"
                  />
                  {lastGeneratedCode ? (
                    <p className="text-xs text-slate-400">Auto generated: {lastGeneratedCode}</p>
                  ) : null}
                </div>
                <input type="date" value={form.joinDate} onChange={updateField("joinDate")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <select value={form.contractType} onChange={updateField("contractType")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Probation</option>
                </select>
                <select value={form.status} onChange={updateField("status")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm">
                  <option>Active</option>
                  <option>On leave</option>
                  <option>Suspended</option>
                </select>
                <select value={form.workLocation} onChange={updateField("workLocation")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm">
                  <option value="">Select work location</option>
                  {workLocations.length === 0 ? (
                    <option value="" disabled>
                      No work locations found
                    </option>
                  ) : null}
                  {workLocations.map((item) => (
                    <option key={item.id} value={item.name || ""}>{item.name || "Unnamed"}</option>
                  ))}
                </select>
                <select value={form.department} onChange={updateField("department")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm">
                  <option value="">Select department</option>
                  {departments.length === 0 ? (
                    <option value="" disabled>
                      No departments found
                    </option>
                  ) : null}
                  {departments.map((item) => (
                    <option key={item.id} value={item.name || ""}>{item.name || "Unnamed"}</option>
                  ))}
                </select>
                <select value={form.role} onChange={updateField("role")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm">
                  <option value="">Select role</option>
                  {roles.length === 0 ? (
                    <option value="" disabled>
                      No roles found
                    </option>
                  ) : null}
                  {roles.map((item) => (
                    <option key={item.id} value={item.title || ""}>{item.title || "Unnamed"}</option>
                  ))}
                </select>
                <input value={form.manager} onChange={updateField("manager")} placeholder="Reporting manager" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.grade} onChange={updateField("grade")} placeholder="Grade / Level" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">Bank & payroll</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={form.bankName} onChange={updateField("bankName")} placeholder="Bank name" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.iban} onChange={updateField("iban")} placeholder="IBAN" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.accountNumber} onChange={updateField("accountNumber")} placeholder="Account number" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input type="date" value={form.salaryTransferDate} onChange={updateField("salaryTransferDate")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">Compliance & documents</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={form.healthInsuranceProvider} onChange={updateField("healthInsuranceProvider")} placeholder="Health insurance provider" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input type="date" value={form.healthInsuranceExpiry} onChange={updateField("healthInsuranceExpiry")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input type="date" value={form.medicalTestDate} onChange={updateField("medicalTestDate")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={form.drivingLicenseNumber} onChange={updateField("drivingLicenseNumber")} placeholder="Driving license number" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input type="date" value={form.drivingLicenseExpiry} onChange={updateField("drivingLicenseExpiry")} className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">Dependents</p>
              <div className="grid gap-3 sm:grid-cols-4">
                <input value={dependentName} onChange={(event) => setDependentName(event.target.value)} placeholder="Full name" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={dependentRelationship} onChange={(event) => setDependentRelationship(event.target.value)} placeholder="Relationship" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input type="date" value={dependentDob} onChange={(event) => setDependentDob(event.target.value)} className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
                <input value={dependentCivilId} onChange={(event) => setDependentCivilId(event.target.value)} placeholder="Civil ID" className="h-10 rounded-xl border border-slate-200 px-3 text-sm" />
              </div>
              <div className="flex justify-end">
                <button onClick={addDependent} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
                  <PlusCircle className="h-4 w-4" />
                  Add dependent
                </button>
              </div>
              {dependents.length > 0 ? (
                <div className="rounded-xl border border-slate-200 px-4 py-3 text-sm">
                  <div className="space-y-2">
                    {dependents.map((dep) => (
                      <div key={dep.id} className="flex flex-wrap justify-between gap-2">
                        <div>
                          <p className="font-semibold text-slate-800">{dep.name}</p>
                          <p className="text-xs text-slate-500">{dep.relationship} · {dep.dob || "-"} · {dep.civilId}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={addEmployee} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              <UserPlus className="h-4 w-4" />
              {editingId ? "Save changes" : "Save employee"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
