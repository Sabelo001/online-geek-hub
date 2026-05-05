import { Send, UploadCloud } from "lucide-react";
import { acknowledgeScholarDocument, sendScholarDocument, uploadScholarDocument } from "@/lib/actions";
import { requireProfile } from "@/lib/auth";
import { getProfiles, getScholarDocuments, getScholarDocumentSignedUrl } from "@/lib/data";
import type { Profile, ScholarDocument } from "@/lib/types";
import { ProtectedPage } from "@/components/protected-page";
import { Badge, Card, PageHeader, Select, TextInput } from "@/components/ui";

type DocumentWithUrl = ScholarDocument & {
  downloadUrl: string | null;
};

function firstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function formatDate(date: string | null) {
  if (!date) return "Not set";
  return new Date(date).toLocaleDateString();
}

function scholarName(document: ScholarDocument) {
  return document.profiles?.full_name ?? document.profiles?.email ?? "Scholar";
}

function senderName(document: ScholarDocument) {
  return document.sender?.full_name ?? document.sender?.email ?? "Admin";
}

async function withDownloadUrls(documents: ScholarDocument[]): Promise<DocumentWithUrl[]> {
  return Promise.all(
    documents.map(async (document) => {
      const signedUrl = await getScholarDocumentSignedUrl(document);
      return { ...document, downloadUrl: signedUrl.url };
    })
  );
}

function DownloadButton({ document }: { document: DocumentWithUrl }) {
  if (!document.downloadUrl) {
    return (
      <button type="button" disabled className="rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-400">
        Download
      </button>
    );
  }

  return (
    <a
      href={document.downloadUrl}
      className="focus-ring inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
    >
      Download
    </a>
  );
}

function DocumentRows({ documents }: { documents: DocumentWithUrl[] }) {
  return (
    <Card>
      <h2 className="text-xl font-bold text-slate-950">My Documents</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-3 pr-4">Filename</th>
              <th className="py-3 pr-4">Type</th>
              <th className="py-3 pr-4">Date</th>
              <th className="py-3 pr-4">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {documents.map((document) => (
              <tr key={document.id}>
                <td className="py-4 pr-4 font-semibold text-slate-950">{document.filename}</td>
                <td className="py-4 pr-4 text-slate-600">{document.type}</td>
                <td className="py-4 pr-4 text-slate-600">{formatDate(document.acknowledged_at ?? document.created_at)}</td>
                <td className="py-4 pr-4">
                  <DownloadButton document={document} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!documents.length ? <p className="py-4 text-sm text-slate-500">No uploaded or acknowledged documents yet.</p> : null}
      </div>
    </Card>
  );
}

function AgreementCard({ document }: { document: DocumentWithUrl }) {
  const acknowledgeAction = acknowledgeScholarDocument.bind(null, document.id);
  const acknowledged = Boolean(document.acknowledged_at);

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-950">{document.filename}</h3>
          <p className="mt-2 text-sm text-slate-600">Sent by {senderName(document)}</p>
          <p className="mt-1 text-sm text-slate-500">Date sent: {formatDate(document.created_at)}</p>
        </div>
        <Badge tone={acknowledged ? "green" : "amber"}>{acknowledged ? "Acknowledged" : "Pending"}</Badge>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <DownloadButton document={document} />
        {acknowledged ? (
          <button type="button" disabled className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-400">
            Acknowledged
          </button>
        ) : (
          <form action={acknowledgeAction}>
            <button className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              View and Acknowledge
            </button>
          </form>
        )}
      </div>
    </Card>
  );
}

function Agreements({ documents }: { documents: DocumentWithUrl[] }) {
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-950">Agreements</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {documents.map((document) => (
          <AgreementCard key={document.id} document={document} />
        ))}
        {!documents.length ? (
          <Card>
            <p className="text-slate-600">No agreements have been sent yet.</p>
          </Card>
        ) : null}
      </div>
    </section>
  );
}

function UploadDocumentCard() {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <UploadCloud className="h-5 w-5 text-cyan-700" />
        <h2 className="text-xl font-bold text-slate-950">Upload Document</h2>
      </div>
      <form action={uploadScholarDocument} encType="multipart/form-data" className="mt-4 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Document
          <TextInput name="document" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Document type
          <Select name="type" required defaultValue="ID Document">
            <option>ID Document</option>
            <option>Certificate</option>
            <option>Portfolio</option>
            <option>Other</option>
          </Select>
        </label>
        <p className="text-sm text-slate-500">PDF, DOC, or DOCX only. Max 10MB.</p>
        <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 sm:w-fit">
          <UploadCloud className="h-4 w-4" />
          Upload
        </button>
      </form>
    </Card>
  );
}

function SendDocumentCard({ scholars }: { scholars: Profile[] }) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Send className="h-5 w-5 text-cyan-700" />
        <h2 className="text-xl font-bold text-slate-950">Send Document</h2>
      </div>
      <form action={sendScholarDocument} encType="multipart/form-data" className="mt-4 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Document title
          <TextInput name="title" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Upload file
          <TextInput name="document" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">
          Recipients
          <Select name="recipient_mode" defaultValue="all">
            <option value="all">All scholars</option>
            <option value="specific">Specific scholars selected below</option>
          </Select>
        </label>
        <fieldset className="grid gap-2">
          <legend className="text-sm font-semibold text-slate-700">Specific scholars</legend>
          <div className="grid gap-2 rounded-md border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2 lg:grid-cols-3">
            {scholars.map((scholar) => (
              <label key={scholar.id} className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" name="scholar_ids" value={scholar.id} className="h-4 w-4 accent-cyan-500" />
                <span>{scholar.full_name}</span>
              </label>
            ))}
            {!scholars.length ? <p className="text-sm text-slate-500">No scholars are available yet.</p> : null}
          </div>
        </fieldset>
        <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 sm:w-fit">
          <Send className="h-4 w-4" />
          Send to Scholars
        </button>
      </form>
    </Card>
  );
}

function AdminUploadedDocumentsTable({ documents }: { documents: DocumentWithUrl[] }) {
  return (
    <Card>
      <h2 className="text-xl font-bold text-slate-950">Scholar Uploaded Documents</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-3 pr-4">Scholar</th>
              <th className="py-3 pr-4">Filename</th>
              <th className="py-3 pr-4">Type</th>
              <th className="py-3 pr-4">Date</th>
              <th className="py-3 pr-4">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {documents.map((document) => (
              <tr key={document.id}>
                <td className="py-4 pr-4 font-semibold text-slate-950">{scholarName(document)}</td>
                <td className="py-4 pr-4 text-slate-600">{document.filename}</td>
                <td className="py-4 pr-4 text-slate-600">{document.type}</td>
                <td className="py-4 pr-4 text-slate-600">{formatDate(document.created_at)}</td>
                <td className="py-4 pr-4">
                  <DownloadButton document={document} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!documents.length ? <p className="py-4 text-sm text-slate-500">No scholar-uploaded documents yet.</p> : null}
      </div>
    </Card>
  );
}

export default async function DocumentsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const profile = await requireProfile();
  const documents = await withDownloadUrls(await getScholarDocuments(profile));
  const message = firstParam(params.message);
  const error = firstParam(params.error);

  if (profile.role === "admin") {
    const profiles = await getProfiles();
    const scholars = profiles.filter((item) => item.role === "trainee");
    const scholarUploads = documents.filter((document) => !document.sent_by_admin);

    return (
      <ProtectedPage>
        <PageHeader title="Documents" eyebrow="Files and Agreements" />
        {error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        {message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{message}</p> : null}
        <div className="grid gap-6">
          <SendDocumentCard scholars={scholars} />
          <AdminUploadedDocumentsTable documents={scholarUploads} />
        </div>
      </ProtectedPage>
    );
  }

  const myDocuments = documents.filter((document) => !document.sent_by_admin || document.acknowledged_at);
  const agreements = documents.filter((document) => document.sent_by_admin);

  return (
    <ProtectedPage>
      <PageHeader title="Documents" eyebrow="Files and Agreements" />
      {error ? <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      {message ? <p className="mb-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-800">{message}</p> : null}
      <div className="grid gap-6">
        <DocumentRows documents={myDocuments} />
        <Agreements documents={agreements} />
        <UploadDocumentCard />
      </div>
    </ProtectedPage>
  );
}
