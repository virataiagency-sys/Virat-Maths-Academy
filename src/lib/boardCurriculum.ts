import { BoardType, BoardGradeBook, BOARD_METADATA } from '../types/boards';
import { cbseBooksData } from '../data/cbseCurriculum';
import { icseBooksData } from '../data/icseCurriculum';
import { stateBoardBooksData } from '../data/stateBoardCurriculum';

export function getBoardBook(board: BoardType, grade: number): BoardGradeBook {
  if (board === 'icse') {
    return icseBooksData[grade] || icseBooksData[10];
  }

  if (board === 'state_board') {
    return stateBoardBooksData[grade] || stateBoardBooksData[10];
  }

  // Default to CBSE
  const cbse = cbseBooksData[grade] || cbseBooksData[10];
  return {
    grade: cbse.grade,
    board: 'cbse',
    boardName: 'CBSE / NCERT',
    bookTitle: cbse.bookTitle,
    syllabusHighlights: [
      'NCERT Canonical Curriculum',
      'Exemplar HOTS Problem Formats',
      'CBSE All India Secondary / Senior School Examination',
      'National entrance examination foundation (JEE, NEET, Olympiads)'
    ],
    chapters: cbse.chapters.map((ch) => ({
      id: ch.id,
      number: ch.number,
      title: ch.title,
      description: ch.description,
      keyFormulas: ch.keyFormulas,
      problems: ch.problems.map((p) => ({
        id: p.id,
        exercise: p.exercise,
        type: p.type === 'NCERT Exercise' ? 'Textbook Exercise' : p.type === 'Board Examination' ? 'Board Examination' : 'Exemplar / HOTS',
        question: p.question,
        difficulty: p.difficulty,
        hint: p.hint,
        solution: p.solution,
        vedicShortcut: p.vedicShortcut
      }))
    }))
  };
}

export interface BoardComparisonSummary {
  grade: number;
  cbse: {
    title: string;
    focus: string;
    sampleChapter: string;
  };
  icse: {
    title: string;
    focus: string;
    sampleChapter: string;
  };
  state_board: {
    title: string;
    focus: string;
    sampleChapter: string;
  };
}

export function getBoardComparison(grade: number): BoardComparisonSummary {
  const cbse = getBoardBook('cbse', grade);
  const icse = getBoardBook('icse', grade);
  const state = getBoardBook('state_board', grade);

  return {
    grade,
    cbse: {
      title: cbse.bookTitle,
      focus: 'Conceptual algebraic rigor, NCERT standard theorems, and national entrance alignment.',
      sampleChapter: cbse.chapters[0]?.title || 'Number Systems'
    },
    icse: {
      title: icse.bookTitle,
      focus: 'Commercial Math (GST, Banking RD), Set theory, Matrices, Loci, and detailed proofs.',
      sampleChapter: icse.chapters[0]?.title || 'Commercial Mathematics'
    },
    state_board: {
      title: state.bookTitle,
      focus: 'Practical commercial arithmetic, Cramer’s Rule determinants, Synthetic division, and State Scholarship prep.',
      sampleChapter: state.chapters[0]?.title || 'Practical Mathematics'
    }
  };
}
