import type { ContactFormInput, ContactSubmission } from "@/lib/contact/schema";
import { getSupabaseAdmin } from "@/lib/contact/supabase";

type ContactRow = {
  id: string;
  name: string;
  email: string;
  organization: string;
  services: string;
  message: string;
  read: boolean;
  created_at: string;
};

function mapRow(row: ContactRow): ContactSubmission {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    organization: row.organization,
    services: row.services,
    message: row.message,
    read: row.read,
    createdAt: row.created_at,
  };
}

export async function saveContactSubmissionSupabase(
  input: ContactFormInput
): Promise<ContactSubmission> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("contact_submissions")
    .insert({
      name: input.name,
      email: input.email,
      organization: input.organization?.trim() || "",
      services: input.services,
      message: input.message,
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Falha ao salvar no Supabase.");
  }

  return mapRow(data as ContactRow);
}

export async function listContactSubmissionsSupabase(): Promise<ContactSubmission[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as ContactRow[]).map(mapRow);
}

export async function markSubmissionAsReadSupabase(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("contact_submissions")
    .update({ read: true })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}
