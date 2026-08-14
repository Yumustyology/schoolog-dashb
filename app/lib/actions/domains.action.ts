import { getRequest, postRequest, deleteRequest, publicGetRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type DomainPurpose = 'website' | 'portal';

export type Domain = {
  _id: string;
  hostname: string;
  type: DomainPurpose;
  status: 'pending' | 'verified' | 'failed';
  dnsTarget?: string | null;
  verificationAttempts?: number;
  isPrimary?: boolean;
  createdAt?: string;
  lastChecked?: string;
  lastError?: string | null;
};

// Public (unauthenticated) lookup used by the root page to decide, for a given
// incoming custom-domain hostname, whether to render the tenant's public
// website or send the visitor into the portal/dashboard flow.
export type PublicDomainInfo = {
  hostname: string;
  type: DomainPurpose;
  verified: boolean;
  schoolSlug?: string;
};

export async function listDomains(): Promise<ResponseType<Domain[]>> {
  return getRequest<Domain[]>('/domains/school');
}

export async function createDomain(payload: {
  hostname: string;
  type: DomainPurpose;
  dnsTarget?: string;
}): Promise<ResponseType<Domain>> {
  return postRequest<Domain>('/domains', payload);
}

// Resolves a hostname to its configured purpose without requiring auth — called
// server-side from app/page.tsx on every request to a custom domain. Callers
// must treat a failed/empty lookup as "portal" (today's behavior) rather than
// blocking the request, since this endpoint may not exist on older backends.
export async function resolveDomainPublic(hostname: string): Promise<ResponseType<PublicDomainInfo>> {
  return publicGetRequest<PublicDomainInfo>('/domains/public', { hostname });
}

export async function verifyDomain(id: string): Promise<ResponseType<Domain>> {
  return getRequest<Domain>(`/domains/${id}/verify`);
}

export async function getDomain(id: string): Promise<ResponseType<Domain>> {
  return getRequest<Domain>(`/domains/${id}`);
}

export async function removeDomain(id: string): Promise<ResponseType<null>> {
  return deleteRequest<null>('/domains', id);
}

export async function setTenantDomain(payload: { tenantDomain: string }): Promise<ResponseType<null>> {
  return postRequest<null>('/domains/tenant', payload);
}

const domainsAction = {
  listDomains,
  createDomain,
  resolveDomainPublic,
  verifyDomain,
  getDomain,
  removeDomain,
  setTenantDomain,
};

export default domainsAction;
