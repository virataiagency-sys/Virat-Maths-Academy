import { GradeCurriculum, GradeLevel, PillarType } from '../types/curriculum';
import { primaryGrades } from './grades/primaryGrades';
import { middleGrades } from './grades/middleGrades';
import { secondaryGrades } from './grades/secondaryGrades';
import { seniorGrades } from './grades/seniorGrades';

export const allGradesData: Record<GradeLevel, GradeCurriculum> = {
  ...primaryGrades,
  ...middleGrades,
  ...secondaryGrades,
  ...seniorGrades,
};

export const gradeList: GradeLevel[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const pillarList: { id: PillarType; name: string; icon: string; shortDesc: string }[] = [
  { id: 'basic_maths', name: 'Basic Maths', icon: 'Calculator', shortDesc: 'Arithmetic, Fractions, Geometry & Number Sense' },
  { id: 'algebra', name: 'Algebra', icon: 'Sparkles', shortDesc: 'Variables, Equations, Identities & Functions' },
  { id: 'abacus', name: 'Abacus (Soroban)', icon: 'Grid', shortDesc: 'Tactile Beads, Place Values & Flash Mental Anzan' },
  { id: 'vedic_maths', name: 'Vedic Maths', icon: 'Flame', shortDesc: 'Ancient Speed Sutras & Mental Calculation Hacks' },
];

export function getGradeCurriculum(grade: GradeLevel): GradeCurriculum {
  return allGradesData[grade];
}
