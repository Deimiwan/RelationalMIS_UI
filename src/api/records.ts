import { apiRequest } from './client';

export interface RecordFilter { attributeId: string; operator: 'eq' | 'contains' | 'gt' | 'lt'; value: string | number }

export const getObjectRecords = (objectId: string, filters?: RecordFilter[]) => {
  const query = filters?.length ? `?filters=${encodeURIComponent(JSON.stringify(filters))}` : '';
  return apiRequest(`/objects/${objectId}/records${query}`);
};

export const getRecordById = (recordId: string) => apiRequest(`/records/${recordId}`);
