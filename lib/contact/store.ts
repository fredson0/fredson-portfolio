import type { ContactFormInput, ContactSubmission } from "@/lib/contact/schema";
import {
  listContactSubmissionsSupabase,
  markSubmissionAsReadSupabase,
  saveContactSubmissionSupabase,
} from "@/lib/contact/store-supabase";
import { isSupabaseConfigured } from "@/lib/contact/supabase";
import {
  listContactSubmissionsFile,
  markSubmissionAsReadFile,
  saveContactSubmissionFile,
} from "@/lib/contact/store-file";

function useSupabase() {
  return (
    process.env.CONTACT_STORAGE === "supabase" ||
    (process.env.CONTACT_STORAGE !== "file" && isSupabaseConfigured())
  );
}

export async function saveContactSubmission(
  input: ContactFormInput
): Promise<ContactSubmission> {
  if (useSupabase()) {
    return saveContactSubmissionSupabase(input);
  }

  return saveContactSubmissionFile(input);
}

export async function listContactSubmissions(): Promise<ContactSubmission[]> {
  if (useSupabase()) {
    return listContactSubmissionsSupabase();
  }

  return listContactSubmissionsFile();
}

export async function markSubmissionAsRead(id: string): Promise<boolean> {
  if (useSupabase()) {
    return markSubmissionAsReadSupabase(id);
  }

  return markSubmissionAsReadFile(id);
}

export function getActiveStorageProvider() {
  return useSupabase() ? "supabase" : "file";
}
