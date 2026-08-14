# Department Backend Handover

## Overview
This document describes the backend work required to support the new school departments module and the updated subject linking flow in the school dashboard.

The frontend now includes:
- A new school-side page at `/school/departments` for creating and managing departments.
- A subject link modal that can link a subject to a class grade in one of three modes: `general`, `departmental`, or `elective`.
- A departmental dropdown displayed when the user selects `Departmental` in the subject link modal.

## Data model
### Department
A new `Department` entity should be created.

Fields:
- `_id` (string / ObjectId)
- `schoolId` (string / ObjectId)
- `name` (string)
- `code` (string)
- `description` (string)
- `status` (string) — `Active` or `Inactive`
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### Initial seed departments
Each school should be initialized with three default departments that users can edit or delete:

1. **Science** (code: `SCI`)
   - Description: Science subjects and lab streams.
   - Status: Active
2. **Arts** (code: `ART`)
   - Description: Humanities and creative subjects.
   - Status: Active
3. **Commerce** (code: `COM`)
   - Description: Business and finance streams.
   - Status: Active

These seed departments should be created automatically when a school is initialized or first accesses the departments page. Users have full permission to edit or delete these departments.

### Subject department link data
The subject linking flow should capture:
- `subjectId`
- `classGradeId`
- `linkMode` (`general` | `departmental` | `elective`)
- `departmentId` (optional, required only for `departmental` links)
- `schoolId`
- `createdAt`
- `updatedAt`

This can be modeled as a separate subject link collection/table or as a nested property inside the subject document/record. The backend should support queries by subject, class grade, and department.

## API endpoints
### Departments
- `GET /departments?schoolId=<id>`
  - Returns department list for the current school.
- `POST /departments`
  - Create a new department.
  - Required body: `name`, `code`, `schoolId`.
  - Optional: `description`, `status`.
- `PUT /departments/:id`
  - Update department metadata.
- `DELETE /departments/:id`
  - Remove or soft-delete a department.

### Subject / linking endpoints
- `GET /subjects/:subjectId`
  - Return subject details and current link metadata.
- `POST /subjects/:subjectId/link`
  - Link the subject to a class grade and optionally a department.
  - Body fields:
    - `classGradeId`
    - `linkMode` (`general` | `departmental` | `elective`)
    - `departmentId` (required when `linkMode` is `departmental`)
- `GET /subjects/:subjectId/links`
  - (Optional) Return all link records for a subject.

## Backend behavior and validation
- When `linkMode` is `departmental`, the backend must validate that the provided `departmentId` exists and belongs to the same school.
- When `linkMode` is `general` or `elective`, `departmentId` should be ignored or omitted.
- Subject links should only be created when `classGradeId` is provided.
- Add server-side permissions so only school admins with the correct role can create/edit departments and subject links.

## Changes to existing modules
### Subject module
- Extend the subject link payload to support `linkMode` and optional `departmentId`.
- If the UI passes department information, store that relationship for departmental subject access.

### School module
- Add a new departments service / controller.
- Add department persistence and retrieval logic.
- Expose the new endpoint in the school dashboard API.

## Frontend / API contract notes
- The UI currently expects the department dropdown to provide a simple department identifier.
- The new page and modal are UI-first; backend should support these flows with consistent `Department` data and correct validation.

## Summary
This module introduces a first-class `Department` resource and ties it into subject linking. Backend work should deliver:
1. Department CRUD support.
2. Subject link handling with `general`, `departmental`, and `elective` modes.
3. Validation for departmental links and school ownership.
4. Support for listing departments in the school dashboard.
