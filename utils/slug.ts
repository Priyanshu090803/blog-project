export function generateSlug(title: string) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "") +
    "-" +
    Date.now().toString().slice(-4)
  );
}