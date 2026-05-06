"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { updateProfileBio, updateProfileSkills } from "@/lib/actions";

export function SkillsForm({ initialSkills }: { initialSkills: string[] }) {
  const [skills, setSkills] = useState(initialSkills);
  const [input, setInput] = useState("");
  const serializedSkills = useMemo(() => JSON.stringify(skills), [skills]);

  function addSkill(skill: string) {
    const nextSkill = skill.trim();
    if (!nextSkill) return;
    setSkills((current) => {
      if (current.some((item) => item.toLowerCase() === nextSkill.toLowerCase())) return current;
      return [...current, nextSkill];
    });
    setInput("");
  }

  return (
    <form action={updateProfileSkills} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <label className="text-xs font-bold uppercase tracking-[0.12em] text-cyan-700" htmlFor="skill-input">
        Skills
      </label>
      <div className="mt-3 flex flex-wrap gap-2 rounded-md border border-slate-300 bg-white p-2">
        {skills.map((skill) => (
          <span key={skill} className="inline-flex items-center gap-2 rounded-full bg-[#06b6d4] px-3 py-1 text-sm font-semibold text-slate-950">
            {skill}
            <button
              type="button"
              aria-label={`Remove ${skill}`}
              className="rounded-full p-0.5 hover:bg-white/25"
              onClick={() => setSkills((current) => current.filter((item) => item !== skill))}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}
        <input
          id="skill-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addSkill(input);
            }
          }}
          placeholder={skills.length ? "Add another skill" : "Data Annotation, Audio Transcription, Swahili"}
          className="min-h-8 min-w-48 flex-1 border-0 bg-transparent px-1 text-sm text-slate-950 outline-none"
        />
      </div>
      <input type="hidden" name="skills" value={serializedSkills} />
      <button type="submit" className="focus-ring mt-4 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
        Save Skills
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
