export function getSiteUrl() {
  const fallbackUrl = "https://easy-chemistry.ru";
  const rawValue = process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl;

  try {
    return new URL(rawValue);
  } catch {
    return new URL(fallbackUrl);
  }
}
