// client-side representation of class-grade entity for UI prototyping
import { classes as initialClasses } from '@/app/constants';

export type ClassGrade = typeof initialClasses[number];

// keep a local copy (mutable) for prototype/demo use
let classGrades: ClassGrade[] = [...initialClasses];

export function getClassGrades(): ClassGrade[] {
  return classGrades;
}

// reorder helper: move item from one index to another
export function reorderClassGrades(fromIndex: number, toIndex: number) {
  const copied = [...classGrades];
  const [moved] = copied.splice(fromIndex, 1);
  copied.splice(toIndex, 0, moved);
  classGrades = copied;
  return classGrades;
}

export function setClassGrades(newGrades: ClassGrade[]) {
  classGrades = [...newGrades];
}

const ClassGradeEntity = {
  getClassGrades,
  reorderClassGrades,
  setClassGrades,
};

export default ClassGradeEntity;
