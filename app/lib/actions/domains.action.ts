/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  getRequestWithHeaders,
  postRequest,
  deleteRequest,
} from '../service/apiRequests';

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

export async function listDomains() {
  const res = await getRequestWithHeaders<any>('/domains/school');
  // support several response shapes: { data: { items: [] } } or { data: { items } } or { data: items }
  const items = res?.data?.data?.items ?? res?.data?.items ?? res?.data ?? [];
  return items as Domain[];
}

export async function createDomain(payload: { hostname: string; dnsTarget?: string }) {
  const res = await postRequest<any>('/domains', payload);
  return (res?.data?.data ?? res?.data) as Domain;
}

export async function verifyDomain(id: string) {
  const res = await getRequestWithHeaders<any>(`/domains/${id}/verify`);
  return (res?.data?.data ?? res?.data) as Domain;
}

export async function getDomain(id: string) {
  const res = await getRequestWithHeaders<any>(`/domains/${id}`);
  return (res?.data?.data ?? res?.data) as Domain;
}

export async function removeDomain(id: string) {
  const res = await deleteRequest('/domains', id);
  return res?.data;
}

export async function setTenantDomain(payload: { tenant_domain: string }) {
  const res = await postRequest('/domains/tenant', payload);
  return res?.data;
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
