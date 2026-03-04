import { apiRequest } from './client';

export interface CreateObjectRequest { objectKey: string; objectName: string; description?: string }
export interface CreateAttributeRequest {
  attributeKey: string;
  attributeName: string;
  dataType: string;
  isRequired?: boolean;
  isUnique?: boolean;
  isPrimary?: boolean;
  isForeign?: boolean;
  referenceObjectId?: string;
}
export interface CreateRelationshipRequest {
  relationshipKey: string;
  parentObjectId: string;
  childObjectId: string;
  relationshipType: string;
}
export interface PublishSchemaRequest { versionNo: number; notes?: string; objectIds?: string[] }

export const createObject = (body: CreateObjectRequest) =>
  apiRequest('/meta/objects', { method: 'POST', body: JSON.stringify(body) });
export const createAttribute = (objectId: string, body: CreateAttributeRequest) =>
  apiRequest(`/meta/objects/${objectId}/attributes`, { method: 'POST', body: JSON.stringify(body) });
export const createRelationship = (body: CreateRelationshipRequest) =>
  apiRequest('/meta/relationships', { method: 'POST', body: JSON.stringify(body) });
export const publishSchema = (body: PublishSchemaRequest) =>
  apiRequest('/meta/schema/publish', { method: 'POST', body: JSON.stringify(body) });
