import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader } from "@/components/ui";
import { getPublishedModules } from "@/lib/data";
import { TRAINING_CATEGORIES } from "@/lib/types";

export default async function TrainingPage() {
  const modules = await getPublishedModules();

  return (
    <ProtectedPage>
      <PageHeader title="Training materials" eyebrow="Learn" />
      <div className="grid gap-8">
        {TRAINING_CATEGORIES.map((category) => {
          const categoryModules = modules.filter((module) => module.category === category);
          if (!categoryModules.length) return null;

          return (
            <section key={category}>
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-cyan-600" />
                <h2 className="text-xl font-bold text-slate-950">{category}</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {categoryModules.map((module) => (
                  <Link key={module.id} href={`/training/${module.id}`}>
                    <Card className="h-full transition hover:border-cyan-300 hover:shadow-md">
                      <div className="flex items-start justify-between gap-3">
                        <Badge>{module.category}</Badge>
                        {module.material_path ? <Badge tone="green">Material</Badge> : null}
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-slate-950">{module.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
        {!modules.length ? (
          <Card>
            <p className="text-slate-600">No published training materials are available yet.</p>
          </Card>
        ) : null}
      </div>
    </ProtectedPage>
  );
}
