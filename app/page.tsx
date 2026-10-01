import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies();
  const saved = cookieStore.get("gpmb_locale")?.value;
  if (saved === "pt" || saved === "en") redirect(`/${saved}`);

  const acceptLanguage = (await headers()).get("accept-language")?.toLowerCase() ?? "";
  redirect(acceptLanguage.startsWith("en") ? "/en" : "/pt");
}
