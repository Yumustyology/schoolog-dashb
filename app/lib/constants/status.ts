export enum StatusEnum {
  WITHDRAWN = 'withdrawn',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  LEFT = 'left',
  TRANSFERRED = 'transferred',
  TERMINATED = 'terminated',
  RETIRED = 'retired',
  DECEASED = 'deceased',
  GRADUATED = 'graduated',
  DEMOTED = 'demoted',
  PROMOTED = 'promoted',
  PROBATION = 'probation',
  REINSTATED = 'reinstated',
  RESIGNED = 'resigned',
  EXPELLED = 'expelled',
  PENDING_APPROVAL = 'pending_approval',
  REJECTED = 'rejected',
}

/**
 * Map a status string (case-insensitive) to Tailwind text+background classes.
 * Returns a single string with both classes.
 */
export function getStatusClass(status?: string): string {
  if (!status) return 'text-gray-600 bg-gray-200';
  const s = String(status).toLowerCase();
  switch (s) {
    case StatusEnum.ACTIVE:
      return 'text-primary bg-primary1';
    case StatusEnum.GRADUATED:
    case StatusEnum.PROMOTED:
      return 'text-[#2F80ED] bg-[#2F80ED14]';
    case StatusEnum.SUSPENDED:
    case StatusEnum.PROBATION:
      return 'text-[#F2994A] bg-[#F2994A14]';
    case StatusEnum.LEFT:
    case StatusEnum.WITHDRAWN:
    case StatusEnum.RESIGNED:
    case StatusEnum.TERMINATED:
    case StatusEnum.DECEASED:
    case StatusEnum.EXPELLED:
      return 'text-[#EB5757] bg-[#EB575714]';
    default:
      return 'text-gray-600 bg-gray-200';
  }
}
