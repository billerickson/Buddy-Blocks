# Security And Access Control

Buddy Blocks uses one parent session plus an optional child-mode cookie.

## API Rules

- Unauthenticated API requests return `401 not_authenticated`.
- Mutating API requests reject cross-origin `Origin` headers with `403 invalid_origin`.
- Parent APIs return `403 parent_reauth_required` when child mode is active.
- Child APIs allow the active child-mode child only; another child returns `403 child_locked`.
- Practice sets are scoped to the owning child and are not visible through another child's lesson API.

## Page Rules

- Unauthenticated protected pages redirect to `/login/`.
- Parent pages redirect to `/parent-gate/` when child mode is active.
- Unknown child pages redirect back to `/profiles/` and clear child mode.
- Dynamic kid pages are served through generic shells only after the requested child belongs to the signed-in parent.

Keep these behaviors covered in Worker tests when adding new parent-created content, new child routes, or new mutating APIs.
