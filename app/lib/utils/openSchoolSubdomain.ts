type SchoolIdentifiable = { slug?: string | null; name?: string | null; tenant_domain?: string | null };

export const buildSchoolSubdomainUrl = (school: SchoolIdentifiable, opts?: { usePath?: string }) => {
  const identifier = (school.slug && school.slug.trim()) || (school.name && school.name.toLowerCase().replace(/\s+/g, '-')) || '';
  const safeId = school?.tenant_domain || identifier.toLowerCase().replace(/[^a-z0-9-]/g, '');

  const protocol = typeof window !== 'undefined' ? window.location.protocol : 'http:';
  const port = typeof window !== 'undefined' && window.location.port ? `:${window.location.port}` : '';
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

  let host: string;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    host = `${safeId}.localhost${port}`;
  } else {
    const parts = hostname.split('.');
    const base = parts.slice(-2).join('.');
    host = `${safeId}.${base}`;
  }

  const path = opts?.usePath ? opts.usePath : '';
  return `${protocol}//${host}${path}`;
};

export const openSchoolSubdomain = (school: SchoolIdentifiable, opts?: { usePath?: string; target?: string }) => {
  const url = buildSchoolSubdomainUrl(school, opts);
  if (typeof window !== 'undefined') {
    window.open(url, opts?.target || '_blank');
  }
};

export default openSchoolSubdomain;
