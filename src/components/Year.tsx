import { cacheLife } from "next/cache";

/** Current year, cached so it doesn't trip Cache Components' sync-IO check. */
export async function Year() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
