import { apiRequest } from './client';

export interface CreateFormRequest { formKey: string; formName: string }
export interface CreateFormVersionRequest { versionNo: number; schemaVersionId: string }
export interface CreateQuestionRequest {
  questionKey: string;
  label: string;
  uiType: string;
  isRequired?: boolean;
  answerDataType?: string;
  targetObjectId?: string;
  targetAttributeId?: string;
  targetRelationshipId?: string;
  isContextSelector?: boolean;
  writesMode?: 'upsert' | 'append';
  sortOrder?: number;
  sectionId?: string;
}

export const createForm = (body: CreateFormRequest) => apiRequest('/forms', { method: 'POST', body: JSON.stringify(body) });
export const createFormVersion = (formId: string, body: CreateFormVersionRequest) =>
  apiRequest(`/forms/${formId}/versions`, { method: 'POST', body: JSON.stringify(body) });
export const createQuestion = (formId: string, versionId: string, body: CreateQuestionRequest) =>
  apiRequest(`/forms/${formId}/versions/${versionId}/questions`, { method: 'POST', body: JSON.stringify(body) });
export const publishFormVersion = (formId: string, versionId: string) =>
  apiRequest(`/forms/${formId}/versions/${versionId}/publish`, { method: 'POST' });
