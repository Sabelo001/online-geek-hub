"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import {
  updateProfileBio,
  updateProfileLanguages,
  updateProfilePortfolioLinks,
  updateProfileSkills,
  uploadProfilePhoto
} from "@/lib/actions";

export function PhotoIdentityBlock({
  avatarUrl,
  initials,
  fullName,
  roleLabel,
  email
}: {
  avatarUrl: string | null;
  initials: string;
  fullName: string;
  roleLabel: string;
  email: string;
}) {
  function openPhotoUpload() {
    document.getElementById("photo-upload")?.click();
  }

  return (
    <>
      <div className="mt-5 flex flex-col items-center gap-8 sm:flex-row sm:items-center">
        <form action={uploadProfilePhoto} className="flex flex-col items-center gap-3">
          <div className="grid h-[120px] w-[120px] place-items-center overflow-hidden rounded-full bg-[#0f172a] text-3xl font-extrabold text-white">
            {avatarUrl ? (
              <img src={avatarUrl} alt={`${fullName} profile photo`} className="h-full w-full object-cover" />
            ) : (
              <span>{initials || "OG"}</span>
            )}
          </div>
          <input
            id="photo-upload"
            name="photo"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            style={{ display: "none" }}
            onChange={(event) => event.currentTarget.form?.requestSubmit()}
          />
          <button
            type="button"
            className="focus-ring rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            onClick={openPhotoUpload}
          >
            Change Photo
          </button>
        </form>
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <h2 className="text-[22px] font-bold text-slate-950">{fullName}</h2>
          <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-800">{roleLabel}</span>
          <p className="text-[14px] text-slate-500">{email}</p>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-slate-500 sm:w-[120px]">Image only. Maximum file size: 2MB.</p>
    </>
  );
}

export function SkillsForm({ initialSkills }: { initialSkills: string[] }) {
  return (
    <TagForm
      action={updateProfileSkills}
      fieldName="skills"
      initialItems={initialSkills}
      label="Skills"
      placeholder="Data Annotation, Audio Transcription, Swahili"
      submitLabel="Save Skills"
    />
  );
}

export function LanguagesForm({ initialLanguages }: { initialLanguages: string[] }) {
  return (
    <TagForm
      action={updateProfileLanguages}
      fieldName="languages"
      initialItems={initialLanguages}
      label="Languages"
      placeholder="English, Swahili"
      submitLabel="Save Languages"
    />
  );
}

export function PortfolioLinksForm({ initialLinks }: { initialLinks: string[] }) {
  return (
    <TagForm
      action={updateProfilePortfolioLinks}
      fieldName="portfolio_links"
      initialItems={initialLinks}
      label="Portfolio Links"
      placeholder="https://example.com/work-sample"
      submitLabel="Save Portfolio Links"
    />
  );
}

function TagForm({
  action,
  fieldName,
  initialItems,
  label,
  placeholder,
  submitLabel
}: {
  action: (formData: FormData) => void | Promise<void>;
  fieldName: string;
  initialItems: string[];
  label: string;
  placeholder: string;
  submitLabel: string;
}) {
  const [items, setItems] = useState(initialItems);
  const [input, setInput] = useState("");
  const serializedItems = useMemo(() => JSON.stringify(items), [items]);

  function addItem(item: string) {
    const nextItem = item.trim();
    if (!nextItem) return;
    setItems((current) => {
      if (current.some((currentItem) => currentItem.toLowerCase() === nextItem.toLowerCase())) return current;
      return [...current, nextItem];
    });
    setInput("");
  }

  return (
    <form action={action} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <label className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-700" htmlFor={`${fieldName}-input`}>
        {label}
      </label>
      <div className="mt-3 flex flex-wrap gap-2 rounded-md border border-slate-300 bg-white p-2">
        {items.map((item) => (
          <span key={item} className="inline-flex items-center gap-2 rounded-full bg-[#06b6d4] px-3 py-1 text-sm font-semibold text-slate-950">
            {item}
            <button
              type="button"
              aria-label={`Remove ${item}`}
              className="rounded-full p-0.5 hover:bg-white/25"
              onClick={() => setItems((current) => current.filter((currentItem) => currentItem !== item))}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        <input
          id={`${fieldName}-input`}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addItem(input);
            }
          }}
          placeholder={items.length ? `Add another ${label.toLowerCase()}` : placeholder}
          className="min-h-8 min-w-48 flex-1 border-0 bg-transparent px-1 text-sm text-slate-950 outline-none"
        />
      </div>
      <input type="hidden" name={fieldName} value={serializedItems} />
      <button type="submit" className="focus-ring mt-4 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
        {submitLabel}
      </button>
    </form>
  );
}

export function BioForm({ initialBio }: { initialBio: string }) {
  const [bio, setBio] = useState(initialBio);

  return (
    <form action={updateProfileBio} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <label className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-700" htmlFor="bio">
        About Me
      </label>
      <textarea
        id="bio"
        name="bio"
        maxLength={400}
        value={bio}
        onChange={(event) => setBio(event.target.value)}
        className="focus-ring mt-3 min-h-36 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-slate-950"
        placeholder="Write a short professional bio for project teams and reviewers."
      />
      <p className="mt-2 text-sm text-slate-500">{bio.length}/400</p>
      <button type="submit" className="focus-ring mt-4 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
        Save Bio
      </button>
    </form>
  );
}
