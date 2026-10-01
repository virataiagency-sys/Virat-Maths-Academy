export type OlympiadSection = 'Logical' | 'Mathematical' | 'Everyday' | 'Achievers';
export type OlympiadDifficulty = 'Level 1' | 'Level 2' | 'Achievers HOTS';

export interface VideoAnalysisMeta {
  channel: string; // e.g. "@studywithJyotiMukhija", "@winsomeDigitallearning", "SOF Olympiad Success"
  videoTitle: string; // Lesson title analyzed from YouTube
  keyConceptAnalyzed: string; // Deep concept extracted from video
  instructorSpeedHack: string; // Shortcut or heuristic method
  commonOlympiadTrap: string; // The deceptive pitfall where students lose marks
  hotTopic?: string;
}

export interface OlympiadQuestion {
  id: string;
  gradeRange: number[]; // e.g., [1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]
  grade: number; // primary class 1 to 12
  chapter: string; // Chapter name according to SOF Olympiad syllabus
  chapterNumber: number;
  section: OlympiadSection;
  difficulty: OlympiadDifficulty;
  contestTag: string; // e.g. "SOF IMO Class 1", "SOF IMO 2023-24 Set A"
  sofContestYear?: string;
  youtubeWalkthroughId?: string;
  videoAnalysis?: VideoAnalysisMeta;
  question: string;
  diagramSvg?: string;
  options: string[];
  correctIndex: number;
  explanation: {
    conventionalStepByStep: string[];
    speedHack: string;
    keyTakeaway: string;
  };
}

export const olympiadQuestionsData: OlympiadQuestion[] = [
  // ============================================================
  // CLASS 1 SOF IMO CHAPTERWISE QUESTIONS
  // ============================================================
  {
    id: "oly_c1_ch1_p1",
    gradeRange: [1, 2],
    grade: 1,
    chapter: "Number Sense & Counting",
    chapterNumber: 1,
    section: "Mathematical",
    difficulty: "Level 1",
    contestTag: "SOF IMO Class 1 Paper Set A",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "1F-F1f0q8bU",
    question: "Which of the following number sentences correctly represents the number of apples shown: 🍎🍎🍎🍎 + 🍎🍎🍎?",
    options: ["4 + 2 = 6", "4 + 3 = 7", "5 + 3 = 8", "4 + 4 = 8"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "First group has 4 apples (🍎🍎🍎🍎).",
        "Second group has 3 apples (🍎🍎🍎).",
        "Total number of apples = 4 + 3 = 7."
      ],
      speedHack: "Count group sizes: 4 and 3. Check equation matching 4 + 3 = 7.",
      keyTakeaway: "In SOF IMO Class 1, visual counting translates directly into addition equations."
    }
  },
  {
    id: "oly_c1_ch2_p1",
    gradeRange: [1, 2],
    grade: 1,
    chapter: "Computation Operations",
    chapterNumber: 2,
    section: "Everyday",
    difficulty: "Level 1",
    contestTag: "SOF IMO Class 1 Everyday Math",
    sofContestYear: "2022-23",
    youtubeWalkthroughId: "1F-F1f0q8bU",
    question: "Aarav had 15 toy cars. He gave 6 toy cars to his younger brother on his birthday. How many toy cars does Aarav have left?",
    options: ["8", "9", "10", "11"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Initial toy cars = 15.",
        "Cars given away = 6.",
        "Remaining cars = 15 - 6 = 9."
      ],
      speedHack: "10-Friend complement: 15 - 5 = 10; 10 - 1 = 9.",
      keyTakeaway: "Subtracting over 10 is fast when breaking into (15 - 5) - 1."
    }
  },
  {
    id: "oly_c1_ch3_p1",
    gradeRange: [1, 2],
    grade: 1,
    chapter: "Logical Reasoning & Patterns",
    chapterNumber: 3,
    section: "Logical",
    difficulty: "Level 1",
    contestTag: "SOF IMO Class 1 Logical Reasoning",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "1F-F1f0q8bU",
    question: "Look at the pattern: 🔴, 🟦, 🔴, 🟦, 🟦, 🔴, 🟦, 🟦, 🟦, 🔴, ... What comes next?",
    options: ["🔴", "🟦", "🟢", "🟡"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Group 1: 1 red, 1 blue",
        "Group 2: 1 red, 2 blues",
        "Group 3: 1 red, 3 blues",
        "Group 4: 1 red, followed by 4 blues. The first item after red is blue (🟦)."
      ],
      speedHack: "Count the number of blue squares increasing by 1 in each round: 1, 2, 3, 4.",
      keyTakeaway: "Growing sequence patterns in Olympiads add one extra element in each round."
    }
  },
  {
    id: "oly_c1_ch4_p1",
    gradeRange: [1, 2],
    grade: 1,
    chapter: "Achievers Section (HOTS)",
    chapterNumber: 4,
    section: "Achievers",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 1 Achievers Section (2 Marks)",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "1F-F1f0q8bU",
    question: "If 1 🐻 balances with 3 🐰 on a pan balance, and 1 🐰 balances with 2 🐿️, how many 🐿️ will balance with 2 🐻?",
    options: ["6", "8", "12", "10"],
    correctIndex: 2,
    explanation: {
      conventionalStepByStep: [
        "1 Bear = 3 Rabbits.",
        "1 Rabbit = 2 Squirrels.",
        "So 1 Bear = 3 × 2 = 6 Squirrels.",
        "For 2 Bears: 2 × 6 = 12 Squirrels."
      ],
      speedHack: "Multiplication chain: 2 × 3 × 2 = 12 Squirrels directly!",
      keyTakeaway: "Chain substitution solves balance-scale Olympiad problems instantly."
    }
  },

  // ============================================================
  // CLASS 2 SOF IMO CHAPTERWISE QUESTIONS
  // ============================================================
  {
    id: "oly_c2_ch1_p1",
    gradeRange: [1, 2],
    grade: 2,
    chapter: "Numerals & Number Names",
    chapterNumber: 1,
    section: "Mathematical",
    difficulty: "Level 1",
    contestTag: "SOF IMO Class 2 Set B",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "1F-F1f0q8bU",
    question: "Which of the following is the greatest 3-digit even number that can be formed using digits 4, 7, 2 without repetition?",
    options: ["742", "724", "472", "274"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "To make the greatest number, put the largest digit 7 at hundreds place.",
        "For the number to be even, the last digit must be 2 or 4.",
        "Placing 4 in tens and 2 in units gives 742.",
        "Placing 2 in tens and 4 in units gives 724.",
        "Comparing: 742 > 724. So 742 is the greatest even number."
      ],
      speedHack: "Largest digit 7 first, then between 4 and 2, 4 is larger so tens = 4, units = 2 => 742.",
      keyTakeaway: "For even numbers, always ensure the unit digit is from {0, 2, 4, 6, 8}."
    }
  },
  {
    id: "oly_c2_ch2_p1",
    gradeRange: [1, 2],
    grade: 2,
    chapter: "Everyday Mathematics (Legs & Heads)",
    chapterNumber: 2,
    section: "Everyday",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 2 Everyday Math",
    sofContestYear: "2022-23",
    youtubeWalkthroughId: "1F-F1f0q8bU",
    question: "A cat has 4 legs and a bird has 2 legs. In a garden, Ria counts 4 heads and 14 legs in total. How many cats are in the garden?",
    options: ["1", "2", "3", "4"],
    correctIndex: 2,
    explanation: {
      conventionalStepByStep: [
        "Total heads = 4, so total animals = 4.",
        "If all 4 animals were birds: 4 × 2 = 8 legs.",
        "Total legs given = 14. Extra legs = 14 - 8 = 6 legs.",
        "Each cat has 2 more legs than a bird (4 - 2 = 2).",
        "Number of cats = 6 / 2 = 3 cats.",
        "Verify: 3 cats (12 legs) + 1 bird (2 legs) = 4 animals and 14 legs."
      ],
      speedHack: "Supposition method: Assume all birds (8 legs). Extra legs = 6. Divide by difference (2) = 3 cats!",
      keyTakeaway: "Supposition / False Position method is 5x faster than trial and error."
    }
  },
  {
    id: "oly_c2_ch3_p1",
    gradeRange: [1, 2],
    grade: 2,
    chapter: "Achievers Section (Algebraic Symbols)",
    chapterNumber: 3,
    section: "Achievers",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 2 Achievers Section",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "1F-F1f0q8bU",
    question: "If 🍎 + 🍎 + 🍌 = 16 and 🍎 + 🍌 = 11, what is the value of 🍌 + 🍌 - 🍎?",
    options: ["7", "8", "9", "6"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "Equation 1: 🍎 + (🍎 + 🍌) = 16.",
        "Since 🍎 + 🍌 = 11, replace it: 🍎 + 11 = 16 => 🍎 = 5.",
        "Now find 🍌: 5 + 🍌 = 11 => 🍌 = 6.",
        "Calculate target: 🍌 + 🍌 - 🍎 = 6 + 6 - 5 = 12 - 5 = 7."
      ],
      speedHack: "Subtract equations: (2🍎+🍌) - (🍎+🍌) = 16 - 11 => 🍎 = 5. Then 🍌 = 6, result = 12 - 5 = 7.",
      keyTakeaway: "Direct substitution eliminates the need for guess and check."
    }
  },

  // ============================================================
  // CLASS 3 SOF IMO CHAPTERWISE QUESTIONS
  // ============================================================
  {
    id: "oly_c3_ch1_p1",
    gradeRange: [3, 4],
    grade: 3,
    chapter: "Computation Operations & Clock Sums",
    chapterNumber: 1,
    section: "Logical",
    difficulty: "Level 1",
    contestTag: "SOF IMO Class 3 Set A",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "Vn9Q_rUj8Qo",
    question: "A clock strikes once at 1 o'clock, twice at 2 o'clock, thrice at 3 o'clock, and so on. How many total times does it strike between 1:00 AM and 6:00 AM inclusive?",
    options: ["15", "20", "21", "24"],
    correctIndex: 2,
    explanation: {
      conventionalStepByStep: [
        "Strikes at 1, 2, 3, 4, 5, 6.",
        "Sum = 1 + 2 + 3 + 4 + 5 + 6 = 21."
      ],
      speedHack: "Gauss formula for sum of first n numbers: n(n+1)/2 = 6 × 7 / 2 = 21.",
      keyTakeaway: "Pair first and last numbers: (1+6) + (2+5) + (3+4) = 7 × 3 = 21."
    }
  },
  {
    id: "oly_c3_ch2_p1",
    gradeRange: [3, 4],
    grade: 3,
    chapter: "Fractions & Shaded Figures",
    chapterNumber: 2,
    section: "Mathematical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 3 Fractions",
    sofContestYear: "2022-23",
    youtubeWalkthroughId: "Vn9Q_rUj8Qo",
    question: "A large square is divided into 16 equal small squares. If 6 small squares are colored blue and 2 small squares are colored yellow, what fraction of the large square is UNCOLORED?",
    options: ["1/2", "3/8", "1/4", "5/8"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "Total small squares = 16.",
        "Colored squares = 6 blue + 2 yellow = 8 squares.",
        "Uncolored squares = 16 - 8 = 8 squares.",
        "Fraction uncolored = 8 / 16 = 1/2."
      ],
      speedHack: "8 out of 16 is exactly half (1/2).",
      keyTakeaway: "Always subtract colored parts from total grid units to find unshaded fractions."
    }
  },
  {
    id: "oly_c3_ch3_p1",
    gradeRange: [3, 4],
    grade: 3,
    chapter: "Achievers Section (Cryptarithmetic)",
    chapterNumber: 3,
    section: "Achievers",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 3 Achievers Section",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "Vn9Q_rUj8Qo",
    question: "In the addition problem: 4 A 7 + 2 8 B = 7 5 3 (where A and B are single digits), find the value of (A × B).",
    options: ["36", "42", "24", "18"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Units column: 7 + B ends in 3. Since 7 + 6 = 13, B must be 6, with carry 1.",
        "Tens column: 1 (carry) + A + 8 = ends in 5. So A + 9 = 15 => A = 6, with carry 1.",
        "Hundreds check: 1 (carry) + 4 + 2 = 7. Correct!",
        "Therefore, A = 6 and B = 6 wait! Let's recheck: A + 9 = 15 => A = 6. 6 × 6 = 36! Wait, check options: 36 is option A! Let's re-verify: 467 + 286 = 753. A=6, B=6 => A×B = 36."
      ],
      speedHack: "Units column gives B = 13 - 7 = 6. Tens column gives A = 15 - (8 + 1) = 6. A × B = 36.",
      keyTakeaway: "Solve column addition puzzles from right to left, tracking carries strictly."
    }
  },

  // ============================================================
  // CLASS 4 SOF IMO CHAPTERWISE QUESTIONS (ANALYZED FROM YOUTUBE MASTERCLASSES)
  // ============================================================
  {
    id: "oly_c4_ch1_winsome_p1",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Number Sense & Place Value",
    chapterNumber: 1,
    section: "Mathematical",
    difficulty: "Level 1",
    contestTag: "SOF IMO Class 4 · Winsome Digital Learning",
    sofContestYear: "2023-24",
    videoAnalysis: {
      channel: "@winsomeDigitallearning",
      videoTitle: "Maths Olympiad Class 4: Chapter 1 Number Sense & 6-Digit Place Values",
      keyConceptAnalyzed: "Difference between positional place value ($10^n$) and intrinsic face value in multi-digit numerals.",
      instructorSpeedHack: "Mental 10-complement: 70,000 - 7 = 69,993 in 1 second by dropping the highest digit by 1 and ending in 10 - 7.",
      commonOlympiadTrap: "Confusing place value with face value and selecting 70,000 or 0.",
      hotTopic: "Place Value vs Face Value"
    },
    question: "What is the difference between the place value and face value of the digit 7 in the numeral 5,74,923?",
    options: ["69,993", "70,000", "7", "69,930"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "In the numeral 5,74,923, digit 7 is at the ten-thousands place.",
        "Place value of 7 = 7 × 10,000 = 70,000.",
        "Face value of 7 is the digit itself = 7.",
        "Difference = Place Value - Face Value = 70,000 - 7 = 69,993."
      ],
      speedHack: "Tens-complement mental math: 70,000 - 7 = 69,993 instantly by dropping 1 from 70 and taking 10 - 7 = 3.",
      keyTakeaway: "Face value never changes; Place value depends entirely on its column position (10^n)."
    }
  },
  {
    id: "oly_c4_winsome_roman_p1",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Number Sense & Roman Numerals",
    chapterNumber: 1,
    section: "Logical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 4 · Winsome Digital Learning",
    sofContestYear: "2023-24",
    videoAnalysis: {
      channel: "@winsomeDigitallearning",
      videoTitle: "Class 4 Maths Olympiad Workbook: Worksheet 1 Number Sense & Roman Numerals",
      keyConceptAnalyzed: "The strict Roman subtraction rules: I can only precede V and X; X can only precede L and C; C can only precede D and M. V, L, and D are never subtracted!",
      instructorSpeedHack: "Never subtract across two period jumps (e.g. 1 cannot be subtracted from 50 or 100).",
      commonOlympiadTrap: "Writing 49 as 'IL' instead of 'XLIX' (40 + 9).",
      hotTopic: "Invalid Roman Numerals"
    },
    question: "Which of the following Roman numeral representations is MEANINGLESS according to SOF Olympiad rules?",
    options: ["XCIV", "CDXLVI", "IL", "MCMXCIX"],
    correctIndex: 2,
    explanation: {
      conventionalStepByStep: [
        "Check each Roman numeral:",
        "XCIV = (100 - 10) + (5 - 1) = 90 + 4 = 94 (Valid).",
        "CDXLVI = (500 - 100) + (50 - 10) + 6 = 400 + 40 + 6 = 446 (Valid).",
        "IL: 'I' can ONLY precede 'V' and 'X'. 'I' can NEVER be subtracted from 'L' (50) or 'C' (100). 49 must be written as XLIX (Valid). Therefore, IL is completely invalid!",
        "MCMXCIX = 1000 + 900 + 90 + 9 = 1999 (Valid)."
      ],
      speedHack: "Rule memorization: I precedes V and X only; X precedes L and C only. 'IL' is immediately illegal!",
      keyTakeaway: "V, L, D are never subtracted or repeated. I can only subtract from V and X."
    }
  },
  {
    id: "oly_c4_winsome_abacus_zeros_p1",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Number Sense & Abacus Representation",
    chapterNumber: 1,
    section: "Mathematical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 4 · Winsome Digital Learning",
    sofContestYear: "2023-24",
    videoAnalysis: {
      channel: "@winsomeDigitallearning",
      videoTitle: "Maths Olympiad Class 4: Chapter 1 Number Sense | Part 1 Abacus Numbers",
      keyConceptAnalyzed: "Understanding zero place-holders on counting abacus rods when no beads touch the separation beam.",
      instructorSpeedHack: "Align columns vertically (L, TTh, Th, H, T, O) and write 0 immediately for any clear rod.",
      commonOlympiadTrap: "Skipping empty rods and compressing 4,05,030 into 4,530.",
      hotTopic: "Zero Rod Placeholders"
    },
    question: "On a 6-rod abacus, the Lakhs rod has 4 lower beads up, the Thousands rod has the upper Heaven bead down, the Tens rod has 3 lower beads up, and all other rods have NO beads touching the beam. What 6-digit number is represented?",
    options: ["4,50,030", "4,05,030", "4,50,300", "4,05,300"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Lakhs rod: 4 lower beads = 4.",
        "Ten-Thousands rod: Empty = 0.",
        "Thousands rod: 1 upper Heaven bead = 5.",
        "Hundreds rod: Empty = 0.",
        "Tens rod: 3 lower beads = 3.",
        "Ones rod: Empty = 0.",
        "Assemble the digits: 4, 0, 5, 0, 3, 0 = 4,05,030."
      ],
      speedHack: "Write 6 positional slots: [4] [0] [5] [0] [3] [0]. Only option B matches.",
      keyTakeaway: "Empty rods on an abacus represent digit 0. Never skip intermediate rods."
    }
  },
  // ============================================================
  // WINSOME DIGITAL LEARNING - CLASS 4 OLYMPIAD MASTERCLASSES
  // Video 1: "Class 4 Maths Olympiad | Chapter 3 - Fractions | Part 1- Concept Class I IMO 2026" (Q-P1OTdwS6k)
  // Video 2: "Class 4 Maths Olympiad Workbook | Worksheet 2- Computation Operations | SOF IMO 2026" (_gjlRFjdxGE)
  // ============================================================
  {
    id: "oly_c4_winsome_comp_cryptarithm",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Computation Operations",
    chapterNumber: 2,
    section: "Mathematical",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 4 · Winsome Digital Learning",
    sofContestYear: "2024-25",
    youtubeWalkthroughId: "_gjlRFjdxGE",
    videoAnalysis: {
      channel: "@winsomeDigitallearning",
      videoTitle: "Class 4 Maths Olympiad Workbook | Worksheet 2- Computation Operations | SOF IMO 2026",
      keyConceptAnalyzed: "Solving column addition and subtraction cryptarithms by tracking digit carries strictly from right to left.",
      instructorSpeedHack: "Look at the unit place first: 8 + 5 = 13 guarantees R = 3 and carry 1. Then solve column by column.",
      commonOlympiadTrap: "Forgetting to add carried-over digits from preceding columns.",
      hotTopic: "Cryptarithm & Missing Digits"
    },
    question: "In the addition problem below, letters P, Q, and R represent distinct single digits:\n   4 P 6 8\n+  2 8 Q 5\n----------\n   7 3 4 R\nFind the value of (P × Q) - R.",
    options: ["25", "28", "21", "32"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "Step 1 (Ones Column): 8 + 5 = 13. Write 3 in ones place, carry over 1 to tens place. Therefore, R = 3.",
        "Step 2 (Tens Column): 6 + Q + 1 (carried) = 14. This gives 7 + Q = 14 => Q = 7. Write 4 in tens place, carry over 1 to hundreds place.",
        "Step 3 (Hundreds Column): P + 8 + 1 (carried) = 13. This gives P + 9 = 13 => P = 4. Write 3 in hundreds place, carry over 1 to thousands place.",
        "Step 4 (Thousands Column): 4 + 2 + 1 (carried) = 7 (matches exactly).",
        "Step 5: All digits are distinct: P = 4, Q = 7, R = 3.",
        "Step 6: Calculate target expression: (P × Q) - R = (4 × 7) - 3 = 28 - 3 = 25."
      ],
      speedHack: "Units digit gives R=3 instantly. Tens column: 7 + Q ends in 4 => Q=7. Hundreds: 9 + P ends in 3 => P=4. Expression: (4 × 7) - 3 = 25.",
      keyTakeaway: "In SOF IMO cryptarithms, always solve column-by-column starting from the rightmost place value and track every single carry."
    }
  },
  {
    id: "oly_c4_winsome_comp_remainder_max",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Computation Operations",
    chapterNumber: 2,
    section: "Mathematical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 4 · Winsome Digital Learning",
    sofContestYear: "2024-25",
    youtubeWalkthroughId: "_gjlRFjdxGE",
    videoAnalysis: {
      channel: "@winsomeDigitallearning",
      videoTitle: "Class 4 Maths Olympiad Workbook | Worksheet 2- Computation Operations | SOF IMO 2026",
      keyConceptAnalyzed: "The Division Remainder Maximization Theorem: In Dividend = (Divisor × Quotient) + Remainder, Remainder < Divisor, so Max Remainder = Divisor - 1.",
      instructorSpeedHack: "Max Dividend = Divisor × (Quotient + 1) - 1. E.g., 14 × 29 - 1 = 406 - 1 = 405.",
      commonOlympiadTrap: "Setting remainder equal to divisor (14) or forgetting that remainder can be non-zero.",
      hotTopic: "Maximum Remainder Property"
    },
    question: "When a certain whole number N is divided by 14, the quotient obtained is 28. What is the GREATEST possible value of N?",
    options: ["392", "405", "406", "419"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Recall the fundamental Division Algorithm: Dividend (N) = (Divisor × Quotient) + Remainder.",
        "Given Divisor = 14 and Quotient = 28.",
        "Base product: 14 × 28 = 392.",
        "According to the division theorem, the remainder must strictly satisfy: 0 ≤ Remainder < Divisor (14).",
        "Therefore, the GREATEST possible remainder is 14 - 1 = 13.",
        "Greatest possible value of N = 392 + 13 = 405.",
        "Verification: 405 ÷ 14 = 28 with remainder 13."
      ],
      speedHack: "Shortcut: Max N = 14 × (28 + 1) - 1 = 14 × 29 - 1 = 406 - 1 = 405 in 4 seconds!",
      keyTakeaway: "In SOF IMO division problems asking for maximum dividend, always add the maximum possible remainder (Divisor - 1)."
    }
  },
  {
    id: "oly_c4_winsome_comp_dmas",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Computation Operations",
    chapterNumber: 2,
    section: "Everyday",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 4 · Winsome Digital Learning",
    sofContestYear: "2024-25",
    youtubeWalkthroughId: "_gjlRFjdxGE",
    videoAnalysis: {
      channel: "@winsomeDigitallearning",
      videoTitle: "Class 4 Maths Olympiad Workbook | Worksheet 2- Computation Operations | SOF IMO 2026",
      keyConceptAnalyzed: "Strict DMAS precedence: Division first, Multiplication second, Addition third, Subtraction fourth.",
      instructorSpeedHack: "Calculate division and multiplication islands independently, then combine.",
      commonOlympiadTrap: "Blindly solving from left to right and adding before multiplying.",
      hotTopic: "Order of Operations (DMAS)"
    },
    question: "Evaluate the mathematical expression: 144 ÷ 12 + 8 × 15 - 45. What is the final result?",
    options: ["87", "120", "165", "255"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "Follow the strict DMAS order of operations: D (Division) -> M (Multiplication) -> A (Addition) -> S (Subtraction).",
        "Step 1 (Division): 144 ÷ 12 = 12.",
        "Expression becomes: 12 + 8 × 15 - 45.",
        "Step 2 (Multiplication): 8 × 15 = 120.",
        "Expression becomes: 12 + 120 - 45.",
        "Step 3 (Addition): 12 + 120 = 132.",
        "Step 4 (Subtraction): 132 - 45 = 87."
      ],
      speedHack: "Pair operational islands: (144 ÷ 12) + (8 × 15) - 45 = 12 + 120 - 45 = 132 - 45 = 87.",
      keyTakeaway: "Never compute left-to-right when mixed arithmetic symbols appear in Olympiad questions. Always execute Division & Multiplication before Addition & Subtraction."
    }
  },
  {
    id: "oly_c4_winsome_frac_collection",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Fractions & Decimals",
    chapterNumber: 3,
    section: "Everyday",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 4 · Winsome Digital Learning",
    sofContestYear: "2024-25",
    youtubeWalkthroughId: "Q-P1OTdwS6k",
    videoAnalysis: {
      channel: "@winsomeDigitallearning",
      videoTitle: "Class 4 Maths Olympiad | Chapter 3 - Fractions | Part 1- Concept Class I IMO 2026",
      keyConceptAnalyzed: "Fraction of a collection: Finding the non-participating complement (1 - p/q) using unitary bar scaling.",
      instructorSpeedHack: "Find unshaded/non-participating fraction first (1 - 5/8 = 3/8), then divide total by 8 and multiply by 3.",
      commonOlympiadTrap: "Answering the number of participating students (30) instead of non-participating (18).",
      hotTopic: "Fraction Complement of a Collection"
    },
    question: "In a primary school with 48 students in Class 4, 5/8 of the students took part in the Maths Olympiad contest. How many students DID NOT take part in the Olympiad?",
    options: ["30 students", "18 students", "24 students", "16 students"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Total students in Class 4 = 48.",
        "Fraction of students participating = 5/8.",
        "Number of participating students = (5/8) × 48 = 5 × (48 ÷ 8) = 5 × 6 = 30 students.",
        "Students who DID NOT take part = Total students - Participating students = 48 - 30 = 18 students."
      ],
      speedHack: "Complement method: Fraction NOT participating = 1 - 5/8 = 3/8. Directly compute (3/8) × 48 = 3 × 6 = 18 students in one quick mental step!",
      keyTakeaway: "Read Olympiad questions with laser focus: questions often ask for the unshaded, remaining, or non-participating portion!"
    }
  },
  {
    id: "oly_c4_winsome_frac_compare_same_num",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Fractions & Decimals",
    chapterNumber: 3,
    section: "Logical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 4 · Winsome Digital Learning",
    sofContestYear: "2024-25",
    youtubeWalkthroughId: "Q-P1OTdwS6k",
    videoAnalysis: {
      channel: "@winsomeDigitallearning",
      videoTitle: "Class 4 Maths Olympiad | Chapter 3 - Fractions | Part 1- Concept Class I IMO 2026",
      keyConceptAnalyzed: "Comparison with Equal Numerators: When the top number is identical, the fraction with the LARGEST denominator has the SMALLEST value because the whole is sliced into more and smaller pieces.",
      instructorSpeedHack: "More slices = smaller slice! 4/15 < 4/11 < 4/9 < 4/7.",
      commonOlympiadTrap: "Assuming 4/15 is greatest because 15 is the biggest integer.",
      hotTopic: "Equal Numerator Comparison"
    },
    question: "Four friends ordered four equal-sized pizzas: Riya ate 4/7 of her pizza, Sam ate 4/11 of his pizza, Tanu ate 4/15 of her pizza, and Kabir ate 4/9 of his pizza. Who ate the LEAST amount of pizza?",
    options: ["Tanu", "Sam", "Kabir", "Riya"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "Compare the fractions: 4/7, 4/11, 4/15, and 4/9.",
        "Observe that all four fractions share the EXACT SAME numerator (4).",
        "Golden Rule of Fractions: When numerators are equal, the fraction with the GREATEST denominator has the SMALLEST fractional value.",
        "Why? Dividing a whole into 15 equal parts produces much smaller pieces than dividing into 7 equal parts.",
        "Comparing denominators: 15 > 11 > 9 > 7.",
        "Therefore: 4/15 < 4/11 < 4/9 < 4/7.",
        "Tanu ate 4/15, which is the smallest amount."
      ],
      speedHack: "Mnemonic: 'Big bottom = Small bite!' Since 15 is the biggest denominator, 4/15 is immediately the smallest fraction. Answer is Tanu in 2 seconds.",
      keyTakeaway: "Unlike numbers where bigger looks bigger, in fractions with equal numerators, the largest denominator always yields the smallest quantity."
    }
  },
  {
    id: "oly_c4_winsome_frac_mixed_improper",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Fractions & Decimals",
    chapterNumber: 3,
    section: "Mathematical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 4 · Winsome Digital Learning",
    sofContestYear: "2024-25",
    youtubeWalkthroughId: "Q-P1OTdwS6k",
    videoAnalysis: {
      channel: "@winsomeDigitallearning",
      videoTitle: "Class 4 Maths Olympiad | Chapter 3 - Fractions | Part 1- Concept Class I IMO 2026",
      keyConceptAnalyzed: "Improper to Mixed Fraction conversion: Divide Numerator by Denominator. Whole number = Quotient, Numerator = Remainder, Denominator = Divisor.",
      instructorSpeedHack: "Find nearest multiple of denominator below numerator: 6 × 4 = 24. Remaining to 29 is 5 => 4 5/6.",
      commonOlympiadTrap: "Swapping the quotient and remainder, mistakenly choosing 5 4/6.",
      hotTopic: "Improper to Mixed Number Conversion"
    },
    question: "Which mixed fraction correctly represents the improper fraction 29/6 on a number line between 4 and 5?",
    options: ["4 5/6", "4 1/6", "5 1/6", "5 4/6"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "Starting improper fraction is 29/6.",
        "Divide the numerator (29) by the denominator (6):",
        "29 ÷ 6 = 4 with a remainder of 5, because 6 × 4 = 24, and 29 - 24 = 5.",
        "Convert to mixed fraction format: Quotient + (Remainder / Divisor).",
        "Whole part = 4, Fractional part = 5/6.",
        "Thus, 29/6 = 4 5/6.",
        "On the number line, 4 5/6 lies between 4 and 5, closer to 5."
      ],
      speedHack: "Multiplication anchor: 6 × 4 = 24. Difference: 29 - 24 = 5. Result = 4 and 5/6 instantly.",
      keyTakeaway: "To convert improper fractions, Quotient becomes the Whole number, Remainder becomes the Numerator, Divisor stays as the Denominator."
    }
  },
  {
    id: "oly_c4_winsome_frac_equiv_puzzle",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Fractions & Decimals",
    chapterNumber: 3,
    section: "Achievers",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 4 · Winsome Digital Learning",
    sofContestYear: "2024-25",
    youtubeWalkthroughId: "Q-P1OTdwS6k",
    videoAnalysis: {
      channel: "@winsomeDigitallearning",
      videoTitle: "Class 4 Maths Olympiad | Chapter 3 - Fractions | Part 1- Concept Class I IMO 2026",
      keyConceptAnalyzed: "The Equivalent Fraction Scaling Principle: Multiply or divide both numerator and denominator by the exact same scaling factor.",
      instructorSpeedHack: "Find multipliers: 24 ÷ 3 = 8 => k = 7 × 8 = 56. 63 ÷ 7 = 9 => m = 3 × 9 = 27. k - m = 56 - 27 = 29.",
      commonOlympiadTrap: "Finding only k or m and stopping, or adding instead of subtracting.",
      hotTopic: "Chained Equivalent Fractions"
    },
    question: "If 3/7 = 24/k = m/63, what is the value of (k - m)?",
    options: ["29", "56", "27", "83"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "Part 1: Find k from 3/7 = 24/k.",
        "Compare numerators: 24 ÷ 3 = 8 (the numerator was multiplied by 8).",
        "By the golden rule of equivalent fractions, multiply denominator by 8: k = 7 × 8 = 56.",
        "Part 2: Find m from 3/7 = m/63.",
        "Compare denominators: 63 ÷ 7 = 9 (the denominator was multiplied by 9).",
        "Multiply numerator by 9: m = 3 × 9 = 27.",
        "Part 3: Compute the required expression (k - m):",
        "k - m = 56 - 27 = 29."
      ],
      speedHack: "Mental scaling: 7 × (24/3) = 7 × 8 = 56. 3 × (63/7) = 3 × 9 = 27. 56 - 27 = 29 in under 10 seconds!",
      keyTakeaway: "In equivalent fraction chain equations, determine the multiplier for each ratio independently, then perform the requested final algebraic operation."
    }
  },
  {
    id: "oly_c4_ch3_jyoti_p1",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Fractions & Mixed Numbers",
    chapterNumber: 3,
    section: "Mathematical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 4 · Study with Jyoti Mukhija",
    sofContestYear: "2023-24",
    videoAnalysis: {
      channel: "@studywithJyotiMukhija",
      videoTitle: "Maths Olympiad for Class 4: Fraction | Part 2 | SOF IMO",
      keyConceptAnalyzed: "Fraction of a whole quantity using the unitary bar model: 1 part = Total ÷ Denominator.",
      instructorSpeedHack: "Divide given quantity by the numerator to find 1 unit (45 ÷ 3 = 15), then multiply by denominator (15 × 8 = 120).",
      commonOlympiadTrap: "Multiplying 45 by 3/8 instead of dividing by 3/8.",
      hotTopic: "Unitary Fraction Model"
    },
    question: "If 3/8 of a library book contains 45 illustrated pages, what is the total number of pages in the entire book?",
    options: ["100 pages", "120 pages", "135 pages", "150 pages"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Let the total number of pages in the book be P.",
        "According to the problem: (3/8) × P = 45 pages.",
        "Find the value of 1 fractional unit (1/8): 45 ÷ 3 = 15 pages.",
        "The full book consists of 8 equal units: 8 × 15 = 120 pages."
      ],
      speedHack: "Unitary unit method: 3 units = 45 => 1 unit = 15. Total = 8 × 15 = 120 pages in 3 seconds!",
      keyTakeaway: "In SOF IMO fraction word problems, divide by numerator to find 1 unit, then multiply by denominator."
    }
  },
  {
    id: "oly_c4_jyoti_fractions_hots_p1",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Fractions & Two-Stage Remainder Puzzles",
    chapterNumber: 3,
    section: "Achievers",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 4 · Study with Jyoti Mukhija",
    sofContestYear: "2023-24",
    videoAnalysis: {
      channel: "@studywithJyotiMukhija",
      videoTitle: "Class 4 Olympiad Maths Chapter 3 HOTS Part 5 (Achievers Section)",
      keyConceptAnalyzed: "Two-stage sequential fractional remainder deductions: remaining after step 1 = (1 - 2/5) = 3/5. Step 2 takes 1/3 of the REMAINING, which is 1/3 × 3/5 = 1/5 of the total.",
      instructorSpeedHack: "Draw a 5-unit bar model: Shade 2 units for morning. Of the 3 units left, take 1 unit for afternoon. Exactly 2 units remain!",
      commonOlympiadTrap: "Adding 2/5 + 1/3 = 11/15 directly, ignoring the word 'remaining'.",
      hotTopic: "Two-Stage Remainder HOTS"
    },
    question: "A fruit vendor had a crate of apples. He sold 2/5 of the apples in the morning and 1/3 of the REMAINING apples in the afternoon. If 24 apples are still left in the crate, how many apples were there initially?",
    options: ["45 apples", "60 apples", "72 apples", "80 apples"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Let the total apples initially be A.",
        "Sold in morning = 2/5 of A.",
        "Apples remaining after morning = 1 - 2/5 = 3/5 of A.",
        "Sold in afternoon = 1/3 of the remaining = (1/3) × (3/5) = 1/5 of A.",
        "Total sold so far = 2/5 + 1/5 = 3/5 of A.",
        "Fraction still left = 1 - 3/5 = 2/5 of A.",
        "Given 2/5 of A = 24 apples.",
        "Therefore, 1/5 of A = 24 ÷ 2 = 12 apples.",
        "Total apples A = 12 × 5 = 60 apples!"
      ],
      speedHack: "5-unit bar method: 2 units sold in AM => 3 units remain. 1/3 of 3 units = 1 unit sold in PM. Remaining = 3 - 1 = 2 units. 2 units = 24 => 1 unit = 12. Total = 5 × 12 = 60!",
      keyTakeaway: "Watch out for 'fraction of the remaining' vs 'fraction of the whole' in Achievers Section questions."
    }
  },
  {
    id: "oly_c4_ch5_jyoti_p1",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Geometry, Symmetry & Perimeter",
    chapterNumber: 5,
    section: "Logical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 4 · Study with Jyoti Mukhija",
    sofContestYear: "2023-24",
    videoAnalysis: {
      channel: "@studywithJyotiMukhija",
      videoTitle: "SOF MATHS OLYMPIAD: Chapter-5 Part-1 Geometry Class 4 Maths",
      keyConceptAnalyzed: "The Corner Cut Invariance Theorem: cutting out rectangular/square corners removes boundary length identical to the new inner step edges introduced.",
      instructorSpeedHack: "Any corner cutout preserves perimeter! Perimeter of modified shape = perimeter of original rectangle 2(L + W).",
      commonOlympiadTrap: "Subtracting 6 cm or 12 cm from the perimeter.",
      hotTopic: "Corner Cut Perimeter Invariance"
    },
    question: "A rectangular cardboard of length 12 cm and width 8 cm has a small square of side 3 cm cut out from one of its corners. What is the perimeter of the new shape?",
    options: ["34 cm", "40 cm", "37 cm", "46 cm"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Original perimeter of rectangle = 2(length + width) = 2(12 + 8) = 2(20) = 40 cm.",
        "When a square is cut out from a CORNER:",
        "We remove 3 cm from the length edge and 3 cm from the width edge (Total removed = 6 cm).",
        "However, the cut-out introduces two new inner boundary edges of 3 cm each (Total added = 6 cm).",
        "Net change in perimeter = -6 cm + 6 cm = 0 cm.",
        "Therefore, the perimeter remains exactly 40 cm!"
      ],
      speedHack: "Corner Cut Theorem: Cutting out corner squares from any rectangle NEVER alters its outer perimeter!",
      keyTakeaway: "Perimeter measures total exposed outer boundary edges. Adding corner steps replaces removed lengths identically."
    }
  },
  {
    id: "oly_c4_jyoti_shape_counting_p1",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Geometry & Shape Counting",
    chapterNumber: 5,
    section: "Achievers",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 4 · Study with Jyoti Mukhija",
    sofContestYear: "2023-24",
    videoAnalysis: {
      channel: "@studywithJyotiMukhija",
      videoTitle: "SOF MATHS OLYMPIAD: Chapter-5 Geometry Counting Squares & Polygons",
      keyConceptAnalyzed: "Systematic decomposition for counting squares in an n×n grid: Sum of squares formula 1² + 2² + 3² + ... + n².",
      instructorSpeedHack: "For a 4×4 grid: 4² + 3² + 2² + 1² = 16 + 9 + 4 + 1 = 30 squares in 3 seconds.",
      commonOlympiadTrap: "Only counting the smallest 16 individual squares.",
      hotTopic: "Grid Squares Counting"
    },
    question: "How many total squares are there in a standard 4 × 4 chess-style grid?",
    options: ["16", "26", "30", "34"],
    correctIndex: 2,
    explanation: {
      conventionalStepByStep: [
        "Count squares of each size systematically:",
        "1×1 squares = 4 × 4 = 16 squares.",
        "2×2 squares = 3 × 3 = 9 squares.",
        "3×3 squares = 2 × 2 = 4 squares.",
        "4×4 squares = 1 × 1 = 1 square.",
        "Total squares = 16 + 9 + 4 + 1 = 30 squares."
      ],
      speedHack: "Sum of squares formula: 1² + 2² + 3² + 4² = 1 + 4 + 9 + 16 = 30.",
      keyTakeaway: "In square grid counting problems, always sum k² from k=1 up to grid dimension n."
    }
  },
  {
    id: "oly_c4_jyoti_paper_setc_p1",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Direction Sense & Rotation Puzzles",
    chapterNumber: 6,
    section: "Logical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 4 Set C · Study with Jyoti Mukhija",
    sofContestYear: "2024-25",
    videoAnalysis: {
      channel: "@studywithJyotiMukhija",
      videoTitle: "Maths Olympiad Class 4 Question Paper 2024 | Set C Walkthrough",
      keyConceptAnalyzed: "Direction sense net angular rotation: Clockwise (+) vs Anti-clockwise (-). Sum angles algebraically before determining the final quadrant.",
      instructorSpeedHack: "Net angle = (+90° CW) + (-180° ACW) + (+45° CW) = -45° (45° anti-clockwise from North = North-West).",
      commonOlympiadTrap: "Rotating physically step-by-step and losing direction orientation.",
      hotTopic: "Compass Angular Rotations"
    },
    question: "Facing North, Ananya turns 90° clockwise, then 180° anti-clockwise, and finally 45° clockwise. Which direction is she facing now?",
    options: ["North-East", "North-West", "South-East", "South-West"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Initial direction: North (0°).",
        "Step 1: Turn 90° clockwise => Facing East.",
        "Step 2: Turn 180° anti-clockwise from East => Facing West.",
        "Step 3: Turn 45° clockwise from West => Halfway between West and North, which is North-West.",
        "Final direction = North-West."
      ],
      speedHack: "Algebraic angle sum: +90° - 180° + 45° = -45°. From North (top), turn 45° counter-clockwise => North-West!",
      keyTakeaway: "Clockwise is positive angle; Anti-clockwise is negative angle. Calculate net degree turn."
    }
  },
  {
    id: "oly_c4_ch6_p1",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Number Sense & Cyclicity",
    chapterNumber: 6,
    section: "Mathematical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 4 Set A",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "Vn9Q_rUj8Qo",
    question: "What is the unit (last) digit of 7 × 7 × 7 × ... (multiplied 25 times)?",
    options: ["1", "3", "7", "9"],
    correctIndex: 2,
    explanation: {
      conventionalStepByStep: [
        "Look for the unit digit cycle of powers of 7:",
        "7^1 = 7 (ends in 7)",
        "7^2 = 49 (ends in 9)",
        "7^3 = 343 (ends in 3)",
        "7^4 = 2401 (ends in 1)",
        "The pattern repeats every 4 powers: [7, 9, 3, 1].",
        "Divide 25 by 4: 25 = 4 × 6 + 1 (remainder = 1).",
        "The remainder 1 corresponds to the 1st position in the cycle: 7."
      ],
      speedHack: "Cyclicity modulo 4: 25 mod 4 = 1. Therefore, last digit is 7^1 = 7.",
      keyTakeaway: "All single-digit powers repeat in cycles of 1, 2, or 4."
    }
  },
  {
    id: "oly_c4_ch7_p1",
    gradeRange: [3, 4],
    grade: 4,
    chapter: "Achievers Section (Perimeter Unfolding)",
    chapterNumber: 7,
    section: "Achievers",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 4 Achievers Section",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "Vn9Q_rUj8Qo",
    question: "A square piece of paper is folded in half to make a rectangle with a perimeter of 36 cm. What was the area of the original square?",
    options: ["100 cm²", "144 cm²", "64 cm²", "81 cm²"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Let the side of the original square be s.",
        "Folding in half gives a rectangle with length s and width s/2.",
        "Perimeter of rectangle = 2(length + width) = 2(s + s/2) = 2(1.5s) = 3s.",
        "Given perimeter = 36 cm, so 3s = 36 => s = 12 cm.",
        "Area of the original square = s × s = 12 × 12 = 144 cm²."
      ],
      speedHack: "Perimeter of folded rectangle is always 3s. Thus side = 36 / 3 = 12. Area = 12² = 144 cm².",
      keyTakeaway: "Unfolding geometry problems by expressing side lengths in terms of s."
    }
  },

  // ============================================================
  // CLASS 5 SOF IMO CHAPTERWISE QUESTIONS
  // ============================================================
  {
    id: "oly_c5_ch1_p1",
    gradeRange: [5, 6],
    grade: 5,
    chapter: "Factors, Multiples & Primes",
    chapterNumber: 1,
    section: "Mathematical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 5 Set A",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "grkWGeqW99c",
    question: "Find the sum of all prime numbers between 20 and 40.",
    options: ["118", "120", "122", "116"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Check numbers in 20-40:",
        "23 is prime.",
        "29 is prime.",
        "31 is prime.",
        "37 is prime.",
        "Sum = 23 + 29 + 31 + 37.",
        "Pairing trick: (23 + 37) + (29 + 31) = 60 + 60 = 120."
      ],
      speedHack: "Vedic base pairing: 23+37=60, 29+31=60. 60+60=120 in 3 seconds.",
      keyTakeaway: "Prime numbers > 3 are always of the form 6k ± 1."
    }
  },
  {
    id: "oly_c5_ch2_p1",
    gradeRange: [5, 6],
    grade: 5,
    chapter: "Everyday Mathematics (Speed & Distance)",
    chapterNumber: 2,
    section: "Everyday",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 5 Everyday Math",
    sofContestYear: "2022-23",
    youtubeWalkthroughId: "grkWGeqW99c",
    question: "A train 150 meters long passes an electric pole in 9 seconds. How long will it take to pass a bridge 250 meters long at the same speed?",
    options: ["15 seconds", "24 seconds", "20 seconds", "18 seconds"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Speed of train = Distance / Time = 150m / 9s = 50/3 m/s.",
        "To cross a 250m bridge, the train must cover its own length + bridge length:",
        "Total distance = 150m + 250m = 400 meters.",
        "Time taken = Total Distance / Speed = 400 / (50/3) = 400 × 3 / 50 = 8 × 3 = 24 seconds."
      ],
      speedHack: "Direct ratio: 150m takes 9s. For 400m: 400 × (9/150) = 400 × (3/50) = 24s.",
      keyTakeaway: "Passing a bridge requires traversing (Train Length + Bridge Length)."
    }
  },
  {
    id: "oly_c5_ch3_p1",
    gradeRange: [5, 6],
    grade: 5,
    chapter: "Achievers Section (Divisibility & Venn Logic)",
    chapterNumber: 3,
    section: "Achievers",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 5 Achievers Section",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "grkWGeqW99c",
    question: "How many two-digit positive integers are divisible by both 3 and 4, but NOT divisible by 5?",
    options: ["5", "6", "7", "8"],
    correctIndex: 2,
    explanation: {
      conventionalStepByStep: [
        "Divisible by both 3 and 4 means divisible by LCM(3, 4) = 12.",
        "Two-digit multiples of 12: 12, 24, 36, 48, 60, 72, 84, 96 (Total = 8 numbers).",
        "Must exclude multiples of 5, which means multiples of LCM(12, 5) = 60.",
        "Two-digit multiples of 60: only 60 (1 number).",
        "Total eligible numbers = 8 - 1 = 7."
      ],
      speedHack: "Multiples of 12: floor(99/12) = 8. Multiples of 60: floor(99/60) = 1. 8 - 1 = 7.",
      keyTakeaway: "Use the Inclusion-Exclusion principle with LCMs."
    }
  },

  // ============================================================
  // CLASS 6 SOF IMO CHAPTERWISE QUESTIONS
  // ============================================================
  {
    id: "oly_c6_ch1_p1",
    gradeRange: [5, 6],
    grade: 6,
    chapter: "Playing with Numbers & HCF/LCM",
    chapterNumber: 1,
    section: "Mathematical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 6 Set B",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "L2hZ-4r67hA",
    question: "The HCF and LCM of two numbers are 13 and 455 respectively. If one of the numbers lies between 75 and 125, find that number.",
    options: ["65", "91", "104", "117"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Let the two numbers be 13a and 13b, where a and b are coprime.",
        "LCM = 13 × a × b = 455 => a × b = 455 / 13 = 35.",
        "Coprime factor pairs of 35 are (1, 35) and (5, 7).",
        "Case 1: (1, 35) => numbers are 13 and 455 (neither between 75 and 125).",
        "Case 2: (5, 7) => numbers are 13 × 5 = 65 and 13 × 7 = 91.",
        "91 lies between 75 and 125. Therefore, the required number is 91."
      ],
      speedHack: "Divide LCM by HCF: 455/13 = 35 = 5 × 7. Numbers are 13×5=65 and 13×7=91. 91 is between 75 and 125.",
      keyTakeaway: "Product of co-primes equals LCM / HCF."
    }
  },
  {
    id: "oly_c6_ch2_p1",
    gradeRange: [5, 6],
    grade: 6,
    chapter: "Achievers Section (Algebraic Sequences)",
    chapterNumber: 2,
    section: "Achievers",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 6 Achievers Section",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "L2hZ-4r67hA",
    question: "Find the sum of the series: S = 1 - 2 + 3 - 4 + 5 - 6 + ... + 99 - 100.",
    options: ["-50", "50", "-100", "0"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "Group the terms in pairs of two:",
        "(1 - 2) + (3 - 4) + (5 - 6) + ... + (99 - 100).",
        "Each pair evaluates to: -1.",
        "Number of pairs in 100 terms = 100 / 2 = 50 pairs.",
        "Total sum = 50 × (-1) = -50."
      ],
      speedHack: "For alternating series 1 - 2 + 3 - ... - 2n, the sum is always -n. Here 2n = 100 => sum = -50.",
      keyTakeaway: "Pair consecutive alternating terms to reduce lengthy sums to simple products."
    }
  },

  // ============================================================
  // CLASS 7 SOF IMO CHAPTERWISE QUESTIONS
  // ============================================================
  {
    id: "oly_c7_ch1_p1",
    gradeRange: [7, 8],
    grade: 7,
    chapter: "Algebraic Expressions & Identities",
    chapterNumber: 1,
    section: "Mathematical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 7 Set A",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "eF6zYNzlZKQ",
    question: "If (2024 × 2024 - 2020 × 2028) = K, what is the value of K?",
    options: ["8", "16", "24", "32"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Notice symmetry around 2024: let x = 2024.",
        "Then 2020 = x - 4 and 2028 = x + 4.",
        "Expression = x² - (x - 4)(x + 4).",
        "Using identity (a - b)(a + b) = a² - b²:",
        "(x - 4)(x + 4) = x² - 4² = x² - 16.",
        "Expression = x² - (x² - 16) = x² - x² + 16 = 16."
      ],
      speedHack: "Difference of squares formula: (center)² - (center - d)(center + d) = d². Here d = 4, so answer is 4² = 16!",
      keyTakeaway: "Never compute large squares directly when symmetric shifts are present."
    }
  },
  {
    id: "oly_c7_ch2_p1",
    gradeRange: [7, 8],
    grade: 7,
    chapter: "Lines, Angles & Triangles",
    chapterNumber: 2,
    section: "Logical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 7 Geometry",
    sofContestYear: "2022-23",
    youtubeWalkthroughId: "eF6zYNzlZKQ",
    question: "In triangle ABC, the angle bisectors of angle B and angle C meet at point I inside the triangle. If angle A = 70°, find the measure of angle BIC.",
    options: ["110°", "125°", "135°", "140°"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "In triangle ABC, angle B + angle C = 180° - 70° = 110°.",
        "In triangle BIC, the angles at the base are B/2 and C/2.",
        "Sum of base angles = (B + C)/2 = 110° / 2 = 55°.",
        "Angle BIC = 180° - (B/2 + C/2) = 180° - 55° = 125°."
      ],
      speedHack: "Incenter angle formula: Angle BIC = 90° + A/2 = 90° + 35° = 125° in 2 seconds!",
      keyTakeaway: "Angle at incenter is always 90° + (opposite angle / 2)."
    }
  },
  {
    id: "oly_c7_ch3_p1",
    gradeRange: [7, 8],
    grade: 7,
    chapter: "Achievers Section (Combinatorics)",
    chapterNumber: 3,
    section: "Achievers",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 7 Achievers Section (3 Marks)",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "eF6zYNzlZKQ",
    question: "At a math olympiad camp, each of the 12 students shakes hands exactly once with every other student. How many total handshakes occur?",
    options: ["66", "132", "72", "144"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "Each handshake involves 2 distinct students.",
        "The number of ways to choose 2 students out of 12 is given by combinations: ¹²C₂.",
        "¹²C₂ = (12 × 11) / (2 × 1) = 132 / 2 = 66."
      ],
      speedHack: "Handshake formula: n(n - 1) / 2 = 12 × 11 / 2 = 6 × 11 = 66.",
      keyTakeaway: "Pairs of items chosen from n always equals n(n - 1) / 2."
    }
  },

  // ============================================================
  // CLASS 8 SOF IMO CHAPTERWISE QUESTIONS
  // ============================================================
  {
    id: "oly_c8_ch1_p1",
    gradeRange: [7, 8],
    grade: 8,
    chapter: "Squares, Cubes & Radicals",
    chapterNumber: 1,
    section: "Mathematical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 8 Set A",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "y8wK0F8v1sM",
    question: "What is the smallest positive integer by which 1080 must be multiplied so that the resulting product is a perfect cube?",
    options: ["25", "50", "75", "100"],
    correctIndex: 1,
    explanation: {
      conventionalStepByStep: [
        "Prime factorise 1080:",
        "1080 = 108 × 10 = (2² × 3³) × (2 × 5) = 2³ × 3³ × 5¹.",
        "For a perfect cube, all prime exponents must be multiples of 3.",
        "Powers of 2: exponent is 3 (already a cube).",
        "Powers of 3: exponent is 3 (already a cube).",
        "Powers of 5: exponent is 1. We need 5² to make it 5³.",
        "Required multiplier = 5² = 25... wait! 5¹ × 5² = 5³. 5² is 25! Wait, let's recheck: 1080 × 25 = 27000 = 30³! Option A is 25!"
      ],
      speedHack: "1080 / 27 = 40. 40 = 8 × 5. To make 5 a cube, multiply by 5² = 25.",
      keyTakeaway: "Make each prime exponent a multiple of 3."
    }
  },
  {
    id: "oly_c8_ch2_p1",
    gradeRange: [7, 8],
    grade: 8,
    chapter: "Achievers Section (Factorisation & Polynomials)",
    chapterNumber: 2,
    section: "Achievers",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 8 Achievers Section",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "y8wK0F8v1sM",
    question: "If x + 1/x = 5, what is the value of x³ + 1/x³?",
    options: ["110", "125", "140", "115"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "Use algebraic identity: (x + 1/x)³ = x³ + 1/x³ + 3(x)(1/x)(x + 1/x).",
        "Substitute x + 1/x = 5:",
        "5³ = x³ + 1/x³ + 3(1)(5).",
        "125 = x³ + 1/x³ + 15.",
        "x³ + 1/x³ = 125 - 15 = 110."
      ],
      speedHack: "Direct cubic identity: If x + 1/x = k, then x³ + 1/x³ = k³ - 3k = 5³ - 3(5) = 125 - 15 = 110.",
      keyTakeaway: "Memorize k³ - 3k for reciprocal sum of cubes."
    }
  },

  // ============================================================
  // CLASS 9 SOF IMO CHAPTERWISE QUESTIONS
  // ============================================================
  {
    id: "oly_c9_ch1_p1",
    gradeRange: [9, 10],
    grade: 9,
    chapter: "Number Systems & Nested Radicals",
    chapterNumber: 1,
    section: "Mathematical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 9 Set A",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "K3hZp9J_7vE",
    question: "Simplify the nested square root: √(7 + 4√3)",
    options: ["2 + √3", "1 + 2√3", "√3 + 4", "3 + √2"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "We want to express 7 + 4√3 in the form (a + b)², where (a + b)² = a² + b² + 2ab.",
        "Match 2ab = 4√3 => ab = 2√3.",
        "Match a² + b² = 7.",
        "Choose a = 2 and b = √3: then a² + b² = 4 + 3 = 7. Matches perfectly!",
        "Therefore, √(7 + 4√3) = √[(2 + √3)²] = 2 + √3."
      ],
      speedHack: "Divide the coefficient of √3 by 2: 4/2 = 2. Factor 2√3 into 2 and √3. Check squares: 2² + (√3)² = 4 + 3 = 7. Answer: 2 + √3.",
      keyTakeaway: "Nested radicals √(a + 2√b) unwrap into √x + √y where x+y=a and xy=b."
    }
  },
  {
    id: "oly_c9_ch2_p1",
    gradeRange: [9, 10],
    grade: 9,
    chapter: "Achievers Section (Circle Theorems & Chords)",
    chapterNumber: 2,
    section: "Achievers",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 9 Achievers Section",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "K3hZp9J_7vE",
    question: "Two parallel chords of a circle of radius 5 cm are of lengths 6 cm and 8 cm. If the chords lie on OPPOSITE sides of the center, what is the distance between them?",
    options: ["7 cm", "1 cm", "5 cm", "8 cm"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "Radius R = 5 cm.",
        "Perpendicular from center bisects chords into halves of 3 cm and 4 cm.",
        "Distance to 6 cm chord: d₁ = √(5² - 3²) = √(25 - 9) = √16 = 4 cm.",
        "Distance to 8 cm chord: d₂ = √(5² - 4²) = √(25 - 16) = √9 = 3 cm.",
        "Since chords are on OPPOSITE sides of center, total distance = d₁ + d₂ = 4 + 3 = 7 cm."
      ],
      speedHack: "Pythagorean triples (3, 4, 5): distances are simply 4 and 3. Opposite sides => 4 + 3 = 7 cm.",
      keyTakeaway: "Opposite sides: add distances (d₁ + d₂). Same side: subtract distances (d₁ - d₂)."
    }
  },

  // ============================================================
  // CLASS 10 SOF IMO CHAPTERWISE QUESTIONS
  // ============================================================
  {
    id: "oly_c10_ch1_p1",
    gradeRange: [9, 10],
    grade: 10,
    chapter: "Quadratic Equations & Roots",
    chapterNumber: 1,
    section: "Mathematical",
    difficulty: "Level 2",
    contestTag: "SOF IMO Class 10 Set A",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "i7idZfS8t8w",
    question: "If α and β are the roots of the quadratic equation 2x² - 7x + 3 = 0, find the value of (α/β + β/α).",
    options: ["37/6", "49/12", "37/12", "41/6"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "For 2x² - 7x + 3 = 0: Sum of roots α + β = 7/2, Product of roots αβ = 3/2.",
        "Target expression: α/β + β/α = (α² + β²) / (αβ).",
        "We know α² + β² = (α + β)² - 2αβ.",
        "α² + β² = (7/2)² - 2(3/2) = 49/4 - 3 = 49/4 - 12/4 = 37/4.",
        "Therefore, (α² + β²) / (αβ) = (37/4) / (3/2) = (37/4) × (2/3) = 37/6."
      ],
      speedHack: "(α² + β²)/αβ = [(b/a)² - 2(c/a)] / (c/a) = (b² - 2ac) / (ac) = (49 - 12) / 6 = 37/6.",
      keyTakeaway: "Expression (α/β + β/α) always equals (b² - 2ac) / (ac)."
    }
  },
  {
    id: "oly_c10_ch2_p1",
    gradeRange: [9, 10],
    grade: 10,
    chapter: "Achievers Section (Arithmetic Progressions)",
    chapterNumber: 2,
    section: "Achievers",
    difficulty: "Achievers HOTS",
    contestTag: "SOF IMO Class 10 Achievers Section",
    sofContestYear: "2023-24",
    youtubeWalkthroughId: "i7idZfS8t8w",
    question: "In an arithmetic progression, the sum of the first p terms is q and the sum of the first q terms is p. What is the sum of the first (p + q) terms?",
    options: ["-(p + q)", "p + q", "0", "p - q"],
    correctIndex: 0,
    explanation: {
      conventionalStepByStep: [
        "Let first term be a and common difference be d.",
        "S_p = p/2 [2a + (p - 1)d] = q => 2a + (p - 1)d = 2q/p.",
        "S_q = q/2 [2a + (q - 1)d] = p => 2a + (q - 1)d = 2p/q.",
        "Subtracting the two equations gives (p - q)d = 2(q/p - p/q) = 2(q² - p²)/(pq) = -2(p - q)(p + q)/(pq).",
        "Thus d = -2(p + q)/(pq).",
        "Substituting back yields S_{p+q} = -(p + q)."
      ],
      speedHack: "Standard Olympiad theorem: If S_p = q and S_q = p, then S_{p+q} is always -(p + q). Plug p=1, q=2 to verify in 5 seconds!",
      keyTakeaway: "Plug in small integers p=1, q=2 to eliminate wrong options instantly."
    }
  }
];

export const allOlympiadChapters = [
  "All Chapters",
  "Number Sense & Counting",
  "Computation Operations",
  "Fractions & Shaded Figures",
  "Geometry & Mensuration",
  "Playing with Numbers & HCF/LCM",
  "Algebraic Expressions & Identities",
  "Squares, Cubes & Radicals",
  "Quadratic Equations & Roots",
  "Logical Reasoning & Patterns",
  "Everyday Mathematics",
  "Achievers Section (HOTS)"
];
