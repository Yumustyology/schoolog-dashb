/** Where a logged-in user of a given audience type lands after authenticating. */
export function getDashboardPathForAudience(audience?: string | null): string {
  switch (audience) {
    case 'Platform_Admin':
      return '/super-admin';
    case 'Admin':
      return '/school';
    case 'Staff':
      return '/teacher';
    case 'Student':
      return '/student';
    // Guardian has no dashboard yet — fall through to the role-select screen.
    default:
      return '/';
  }
}
