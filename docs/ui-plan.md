# Separate React UI Plan for Relational MIS Backend

This document defines a standalone frontend application that integrates with the existing backend and enforces role/permission visibility in the UI.

## Confirmed decisions

- Post-login route: `Login -> Dashboard`
- Feature visibility is permission-driven and role-aware
- Users have exactly one role
- Unauthorized features are hidden (not disabled)
- No object/record scope filtering by role
- Preferred stack: React

## Backend permission surface

- `submission.write`
- `submission.submit`
- `object.read`
- `object.write`
- `attribute.write`
- `relationship.write`
- `schema.publish`
- `form.write`
- `form.publish`

## Authentication integration

- Use backend `POST /auth/login`
- On app boot:
  1. Resolve authenticated user from token
  2. Fetch effective access from `GET /auth/me/access`
  3. Build navigation/widgets from permission map

### `GET /auth/me/access` contract

- Auth required: `Authorization: Bearer <accessToken>`
- Response:
  - `user`: `{ user_id, email, status }`
  - `role`: `{ role_id, role_name } | null`
  - `permissions`: `string[]` (sorted permission keys)

Example:

```json
{
  "user": { "user_id": "<uuid>", "email": "admin@test.com", "status": "active" },
  "role": { "role_id": "<uuid>", "role_name": "Architect" },
  "permissions": ["attribute.write", "object.write", "relationship.write"]
}
```

## Troubleshooting visibility issues

If logged in as architect/admin but **Build Objects** is not visible:

1. Check UI feature mapping
   - Build Objects must be gated by `object.write`
   - Do not gate by role-name string matching
2. Verify backend effective access
   - Call `GET /auth/me/access` using the same token
   - Confirm `permissions` includes `object.write`
3. Verify DB role/permission mapping
   - A misspelled role label does not matter if permissions are correct
4. Confirm backend endpoint protection
   - `POST /meta/objects` requires `object.write`
