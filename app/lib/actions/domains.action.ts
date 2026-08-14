import { getRequest, postRequest, deleteRequest } from '../service/apiRequests';
import type { ResponseType } from '@/app/lib/types/api-response.types';

export type Domain = {
  _id: string;
  hostname: string;
  type: string;
  status: 'pending' | 'verified' | 'failed';
  dnsTarget?: string | null;
  verificationAttempts?: number;
  isPrimary?: boolean;
  createdAt?: string;
  lastChecked?: string;
  lastError?: string | null;
};

export async function listDomains(): Promise<ResponseType<Domain[]>> {
  return getRequest<Domain[]>('/domains/school');
}

export async function createDomain(payload: { hostname: string; dnsTarget?: string }): Promise<ResponseType<Domain>> {
  return postRequest<Domain>('/domains', payload);
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
  verifyDomain,
  getDomain,
  removeDomain,
  setTenantDomain,
};

export default domainsAction;
