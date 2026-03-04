import { apiRequest } from './client';

export interface CreateSubmissionRequest { formId: string; formVersionId: string; contextRecordId?: string }
export type SaveAnswerRequest =
  | { questionId: string; valueText: string }
  | { questionId: string; valueNumber: number }
  | { questionId: string; valueDate: string }
  | { questionId: string; valueDatetime: string }
  | { questionId: string; valueBool: boolean }
  | { questionId: string; valueRecordRef: string }
  | { questionId: string; valueFileId: string };

export const createSubmission = (body: CreateSubmissionRequest) =>
  apiRequest('/submissions', { method: 'POST', body: JSON.stringify(body) });
export const saveAnswer = (id: string, body: SaveAnswerRequest) =>
  apiRequest(`/submissions/${id}/answers`, { method: 'PUT', body: JSON.stringify(body) });
export const submitSubmission = (id: string) => apiRequest(`/submissions/${id}/submit`, { method: 'POST' });
