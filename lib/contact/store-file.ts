import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import type { ContactFormInput, ContactSubmission } from "@/lib/contact/schema";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "contact-submissions.json");

type ContactStore = {
  submissions: ContactSubmission[];
};

async function ensureStore(): Promise<ContactStore> {
  try {
    const raw = await readFile(STORE_FILE, "utf8");
    const parsed = JSON.parse(raw) as ContactStore;

    if (!Array.isArray(parsed.submissions)) {
      return { submissions: [] };
    }

    return parsed;
  } catch {
    await mkdir(DATA_DIR, { recursive: true });
    const empty: ContactStore = { submissions: [] };
    await writeFile(STORE_FILE, JSON.stringify(empty, null, 2), "utf8");
    return empty;
  }
}

async function persistStore(store: ContactStore) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(STORE_FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function saveContactSubmissionFile(
  input: ContactFormInput
): Promise<ContactSubmission> {
  const store = await ensureStore();

  const submission: ContactSubmission = {
    ...input,
    organization: input.organization?.trim() || "",
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    read: false,
  };

  store.submissions.unshift(submission);
  await persistStore(store);

  return submission;
}

export async function listContactSubmissionsFile(): Promise<ContactSubmission[]> {
  const store = await ensureStore();
  return store.submissions;
}

export async function markSubmissionAsReadFile(id: string): Promise<boolean> {
  const store = await ensureStore();
  const submission = store.submissions.find((item) => item.id === id);

  if (!submission) {
    return false;
  }

  submission.read = true;
  await persistStore(store);
  return true;
}
