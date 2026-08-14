export interface AcademicHoliday {
  // The backend assigns an id when one isn't supplied (see
  // year-calendar.service.ts's `h.id || uuidv4()`), so newly-added
  // holidays in the create/edit forms don't have one yet.
  id?: string;
  name: string;
  date: string;
  type: 'school' | 'public';
}

export interface AcademicYear {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  terms: AcademicTerm[];
  isActive: boolean;
  schoolId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type AcademicTerm = {
  // `_id`/`schoolId` are assigned by the backend once the term is
  // persisted. Client-side drafts (e.g. terms being built in the
  // Academic Year create form before submission) only have a local
  // `id` used as a React key, so these are optional here.
  _id?: string;
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  schoolId?: string;
  // is_deleted: boolean;
  isCurrentlyActive?: boolean;
  // createdAt: string;
  // updatedAt: string;
  holidays: AcademicHoliday[];
  // weekend_days_count: number;
};

export type TermSessionType = AcademicTerm;

export interface ITermSession extends AcademicTerm {}

export type AcademicTermsResponse = {
  status: 'success' | 'fail';
  message: string;
  data: AcademicTerm[];
  statusCode: number;
  meta?: {
    count: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};



export type SingleTermSessionResponse = {
  status: 'success' | 'fail';
  message: string;
  data: AcademicTerm;
  statusCode: number;
};

export type CreateTermSessionPayload = {
  name: string;
  startDate: string;
  endDate: string;
  isCurrentlyActive?: boolean;
  holidays?: string[];
};

export type UpdateTermSessionPayload = {
  name?: string;
  startDate?: string;
  endDate?: string;
  isCurrentlyActive?: boolean;
};

export type DeleteTermSessionResponse = {
  status: 'success' | 'fail';
  message: string;
  statusCode: number;
};


export interface CreateAcademicYearPayload {
  name: string;
  startDate: string;
  endDate: string;
  terms: AcademicTerm[];
  isActive: boolean;
}

export interface MessageStatusResponse {
  status: string;
  message: string;
}


export interface AcademicYearFormProps {
  mode: 'create' | 'edit';
  initialData?: AcademicYear;
  onSuccess?: () => void;
}