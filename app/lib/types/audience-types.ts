export enum AudienceTypes {
  STUDENT = 'Student',
  STAFF = 'Staff',
  GUARDIAN = 'Guardian',
  ADMIN = 'Admin',
  // Top-level admin of a single school — not a platform-wide role.
  SUPER_ADMIN = 'Super_Admin',
  // True cross-school platform operator (Schoolog staff). This is the
  // value that gates access to /super-admin.
  PLATFORM_ADMIN = 'Platform_Admin',
}
