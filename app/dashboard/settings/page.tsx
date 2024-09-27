import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import SettingsCard from "./settings-card";

export default async function Settings() {
  const session = await auth();

  if (!session) redirect("/dashboard/settings");
  if (session) return <SettingsCard session={session} />;
}
