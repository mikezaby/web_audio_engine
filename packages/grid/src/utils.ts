export const getPatchIdFromUrl = (): number | null => {
  const url = window.location.pathname;
  const match = url.match(/\/patch\/([^/]+)/);
  return match ? Number(match[1]) : null;
};
