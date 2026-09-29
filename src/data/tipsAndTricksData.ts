export type TipCategory = 'basic_maths' | 'algebra' | 'abacus' | 'vedic_maths';
export type TipDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Speed-Hack' | 'Common Trap';

export interface ComprehensiveTip {
  id: string;
  gradeRange: number[]; // Classes 1 to 12
  pillar: TipCategory;
  difficulty: TipDifficulty;
  title: string;
  oneLiner: string;
  commonStudentDifficulty: string; // The specific struggle students face
  theStrategy: string;
  workedExample: {
    problem: string;
    conventionalWay: string;
    speedHackWay: string;
    timeSavedSeconds: number;
    visualAid?: string;
  };
  proWarning: string;
  drillQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  youtubeVideoId?: string; // YouTube Video for instant demonstration
}

export const masterTipsData: ComprehensiveTip[] = [
  // ==========================================
  // CLASS 1 TIPS & TRICKS
  // ==========================================
  {
    id: "tip_c1_abacus_heaven",
    gradeRange: [1, 2, 3],
    pillar: "abacus",
    difficulty: "Beginner",
    title: "The 'Heaven Bead 5' Rule",
    oneLiner: "Use the index finger for the 5-bead down, thumb for Earth beads up.",
    commonStudentDifficulty: "Primary students often use any finger randomly and get confused between adding 5 and adding 1.",
    theStrategy: "Always assign strict finger roles: Right Thumb ONLY moves 1-value lower beads UP to beam. Right Index finger moves 5-value upper bead DOWN to beam and UP to clear.",
    workedExample: {
      problem: "Compute 2 + 5 on the Soroban",
      conventionalWay: "Count 1, 2... then finger count 3, 4, 5, 6, 7.",
      speedHackWay: "Thumb pushes 2 lower beads UP. Index pushes upper 5-bead DOWN. Instant 7!",
      timeSavedSeconds: 4
    },
    proWarning: "Never use the thumb to pull down the heaven bead! It breaks physical dexterity.",
    drillQuestion: {
      question: "On a Soroban rod, if the top bead is touching the beam and two lower beads are touching the beam, what is the value?",
      options: ["3", "5", "7", "2"],
      correctIndex: 2,
      explanation: "Upper bead = 5, two lower beads = 2. Total = 5 + 2 = 7."
    },
    youtubeVideoId: "1F-F1f0q8bU"
  },
  {
    id: "tip_c1_paramitra",
    gradeRange: [1, 2, 3],
    pillar: "basic_maths",
    difficulty: "Beginner",
    title: "10-Friend Complement Trick (Paramitra)",
    oneLiner: "Every single digit has a perfect soulmate that sums to 10.",
    commonStudentDifficulty: "Finger counting when adding numbers over 10 (like 8 + 7).",
    theStrategy: "Ask: 'How much does 8 need to become 10?' It needs 2. Steal 2 from 7, leaving 5. Result is 10 + 5 = 15!",
    workedExample: {
      problem: "Add 9 + 6 mentally",
      conventionalWay: "Start at 9, count on fingers: 10, 11, 12, 13, 14, 15 (takes 5 seconds).",
      speedHackWay: "9 needs 1 to make 10. Take 1 from 6 to leave 5. Answer is 15!",
      timeSavedSeconds: 4
    },
    proWarning: "Don't count backwards! Always borrow from the smaller number to feed the larger.",
    drillQuestion: {
      question: "What is the 10-friend complement of 7?",
      options: ["2", "3", "4", "5"],
      correctIndex: 1,
      explanation: "7 + 3 = 10. 3 is the complement of 7."
    },
    youtubeVideoId: "Vn9Q_rUj8Qo"
  },
  {
    id: "tip_c1_doubles",
    gradeRange: [1, 2],
    pillar: "basic_maths",
    difficulty: "Beginner",
    title: "Doubles and Near-Doubles Mental Jump",
    oneLiner: "Memorize doubles (4+4=8) to solve near doubles (4+5 = 8+1 = 9) in a blink.",
    commonStudentDifficulty: "Struggling to compute single-digit addition without touching fingers.",
    theStrategy: "Anchor memory to doubles: 3+3=6, 4+4=8, 5+5=10, 6+6=12. For 6+7, compute 6+6 = 12, then add 1 = 13!",
    workedExample: {
      problem: "Compute 7 + 8",
      conventionalWay: "Count 7 fingers, then count 8 more fingers.",
      speedHackWay: "7 + 7 = 14. Plus 1 more = 15!",
      timeSavedSeconds: 6
    },
    proWarning: "Make sure you identify whether the second number is +1 or -1 from the double.",
    drillQuestion: {
      question: "Using near-doubles, what is 8 + 9?",
      options: ["16", "17", "18", "15"],
      correctIndex: 1,
      explanation: "8 + 8 = 16. 16 + 1 = 17."
    }
  },

  // ==========================================
  // CLASS 2 TIPS & TRICKS
  // ==========================================
  {
    id: "tip_c2_add_nine",
    gradeRange: [2, 3],
    pillar: "basic_maths",
    difficulty: "Beginner",
    title: "Adding 9 Shortcut: Add 10, Drop 1",
    oneLiner: "Never add 9 directly; add 10 to the tens digit, and subtract 1 from units.",
    commonStudentDifficulty: "Doing carry additions like 36 + 9 on paper.",
    theStrategy: "Because 9 = 10 - 1, to add 9 to any number: bump tens up by 1 and units down by 1!",
    workedExample: {
      problem: "Compute 47 + 9",
      conventionalWay: "Write column: 7 + 9 = 16, carry 1, 1 + 4 = 5 => 56.",
      speedHackWay: "47 + 10 = 57. Minus 1 = 56. Done in 1 second!",
      timeSavedSeconds: 8
    },
    proWarning: "When units digit is 0 (like 40 + 9), it's already trivial (49), no need to borrow.",
    drillQuestion: {
      question: "What is 68 + 9 using the Add 10, Drop 1 trick?",
      options: ["76", "77", "78", "79"],
      correctIndex: 1,
      explanation: "68 + 10 = 78. 78 - 1 = 77."
    }
  },
  {
    id: "tip_c2_skip_count",
    gradeRange: [2, 3, 4],
    pillar: "basic_maths",
    difficulty: "Beginner",
    title: "Skip-Counting Patterns (2s, 5s, 10s)",
    oneLiner: "Every multiple of 5 ends in 0 or 5; every multiple of 10 ends in 0.",
    commonStudentDifficulty: "Treating multiplication as isolated memorization rather than rhythmic repeated addition.",
    theStrategy: "Use clock dials (5, 10, 15, 20...) and paired shoe counting (2, 4, 6, 8...) to build instant number sense.",
    workedExample: {
      problem: "How many wheels on 6 tricycles?",
      conventionalWay: "3 + 3 + 3 + 3 + 3 + 3 slow addition.",
      speedHackWay: "Skip count by 3: 3, 6, 9, 12, 15, 18 wheels!",
      timeSavedSeconds: 10
    },
    proWarning: "Always verify the starting count base (0 vs 1).",
    drillQuestion: {
      question: "What is the 7th number when skip counting by 5 starting from 5?",
      options: ["30", "35", "40", "25"],
      correctIndex: 1,
      explanation: "5, 10, 15, 20, 25, 30, 35 (7 × 5 = 35)."
    }
  },

  // ==========================================
  // CLASS 3 TIPS & TRICKS
  // ==========================================
  {
    id: "tip_c3_eleven_sandwich",
    gradeRange: [3, 4, 5],
    pillar: "vedic_maths",
    difficulty: "Speed-Hack",
    title: "Instant 11 Multiplication Trick (The Sandwich Sum)",
    oneLiner: "Multiply any 2-digit number by 11 by sandwiching the sum of digits.",
    commonStudentDifficulty: "Writing two rows of long multiplication and adding with carries for simple 11x.",
    theStrategy: "Separate the two digits. Place their sum in the middle! If sum ≥ 10, carry 1 to the left.",
    workedExample: {
      problem: "Multiply 43 × 11",
      conventionalWay: "43 × 10 = 430, + 43 = 473 (or vertical column multiplication).",
      speedHackWay: "Split 4 and 3. Middle digit = 4 + 3 = 7. Result: 473!",
      timeSavedSeconds: 10
    },
    proWarning: "Watch out for carries! For 85 × 11, 8+5=13, so carry 1 to 8: 935, NOT 8135!",
    drillQuestion: {
      question: "What is 54 × 11?",
      options: ["544", "594", "584", "504"],
      correctIndex: 1,
      explanation: "5 _ 4 with (5 + 4 = 9) in the middle => 594."
    },
    youtubeVideoId: "grkWGeqW99c"
  },
  {
    id: "tip_c3_subtraction_from_base",
    gradeRange: [3, 4, 5],
    pillar: "vedic_maths",
    difficulty: "Speed-Hack",
    title: "Nikhilam Subtraction: Subtracting from 100, 1000, 10000",
    oneLiner: "Subtract all digits from 9, and the very last digit from 10. No borrowing!",
    commonStudentDifficulty: "Tangled in messy zero borrowing chains (e.g. 1000 - 364 turning into 9, 9, 10).",
    theStrategy: "Use Vedic sutra 'Nikhilam Navatashcaramam Dashatah': Subtract each digit from 9, and the rightmost non-zero digit from 10.",
    workedExample: {
      problem: "Compute 1000 - 647 in your head",
      conventionalWay: "Cross out 1 to make 0, change zeros to 9, 9, 10... high risk of arithmetic slip.",
      speedHackWay: "From 9: (9 - 6 = 3), (9 - 4 = 5). From 10: (10 - 7 = 3). Answer = 353!",
      timeSavedSeconds: 15
    },
    proWarning: "If there are trailing zeros (e.g. 1000 - 340), keep the 0 and apply the 'last from 10' to 4.",
    drillQuestion: {
      question: "What is 1000 - 428 using the Nikhilam rule?",
      options: ["572", "582", "672", "578"],
      correctIndex: 0,
      explanation: "9 - 4 = 5; 9 - 2 = 7; 10 - 8 = 2. Result = 572."
    },
    youtubeVideoId: "1VpW5HkU_Qo"
  },
  {
    id: "tip_c3_nine_finger",
    gradeRange: [3, 4],
    pillar: "basic_maths",
    difficulty: "Beginner",
    title: "The 9-Times Table Finger Magic",
    oneLiner: "Fold down finger N from the left; fingers to the left are tens, to the right are units.",
    commonStudentDifficulty: "Memorizing the 9x table and mixing up 9×6 and 9×7.",
    theStrategy: "Hold both hands in front of you. To compute 9 × 4: Fold your 4th finger (left index). Count: 3 fingers on the left, 6 fingers on the right. 3 and 6 make 36!",
    workedExample: {
      problem: "Compute 9 × 7",
      conventionalWay: "Reciting table 9, 18, 27, 36, 45, 54, 63.",
      speedHackWay: "Fold 7th finger. 6 fingers left, 3 fingers right. 63!",
      timeSavedSeconds: 8
    },
    proWarning: "Ensure you always count fingers from left to right, thumbs included.",
    drillQuestion: {
      question: "If you fold down the 8th finger, what number do the left and right fingers show?",
      options: ["64", "72", "81", "68"],
      correctIndex: 1,
      explanation: "7 fingers on the left, 2 on the right => 72 (9 × 8 = 72)."
    }
  },

  // ==========================================
  // CLASS 4 TIPS & TRICKS
  // ==========================================
  {
    id: "tip_c4_divide_by_five",
    gradeRange: [4, 5, 6],
    pillar: "basic_maths",
    difficulty: "Common Trap",
    title: "Dividing by 5: Double & Shift Decimal",
    oneLiner: "Never do long division by 5—just double the numerator and slide decimal 1 place left.",
    commonStudentDifficulty: "Doing painful long division with remainders for numbers like 340 / 5 or 124 / 5.",
    theStrategy: "Because 5 = 10 / 2, dividing by 5 is identical to multiplying by 2 and dividing by 10!",
    workedExample: {
      problem: "Compute 243 ÷ 5",
      conventionalWay: "5 into 24 is 4 rem 4, 5 into 43 is 8 rem 3, add decimal .6...",
      speedHackWay: "Double 243 = 486. Shift decimal left one place: 48.6!",
      timeSavedSeconds: 15
    },
    proWarning: "Make sure you shift the decimal LEFT, not right!",
    drillQuestion: {
      question: "What is 72 ÷ 5?",
      options: ["14.2", "14.4", "15.4", "12.4"],
      correctIndex: 1,
      explanation: "Double 72 to get 144, shift decimal left to get 14.4."
    }
  },
  {
    id: "tip_c4_multiply_by_25",
    gradeRange: [4, 5, 6],
    pillar: "basic_maths",
    difficulty: "Speed-Hack",
    title: "Multiplying by 25: Divide by 4, Multiply by 100",
    oneLiner: "Because 25 = 100 / 4, just divide by 4 and attach two zeros.",
    commonStudentDifficulty: "Multiplying large numbers by 25 using 2-digit column multiplication.",
    theStrategy: "Halve the number twice (which divides by 4), then tack on two zeros or handle remainder quarters (0.25=25, 0.5=50, 0.75=75).",
    workedExample: {
      problem: "Compute 48 × 25",
      conventionalWay: "48 × 25 with column multiplication taking 20 seconds.",
      speedHackWay: "48 ÷ 4 = 12. Tack on 00 => 1200!",
      timeSavedSeconds: 18
    },
    proWarning: "If there is a remainder: Remainder 1 adds 25, Remainder 2 adds 50, Remainder 3 adds 75.",
    drillQuestion: {
      question: "What is 36 × 25?",
      options: ["850", "900", "950", "800"],
      correctIndex: 1,
      explanation: "36 ÷ 4 = 9. Multiply by 100 => 900."
    }
  },

  // ==========================================
  // CLASS 5 TIPS & TRICKS
  // ==========================================
  {
    id: "tip_c5_ekadhikena_square_five",
    gradeRange: [5, 6, 7, 8],
    pillar: "vedic_maths",
    difficulty: "Speed-Hack",
    title: "Ekadhikena Purvena: Squares of Numbers Ending in 5",
    oneLiner: "Multiply first digit by (digit + 1), then tag 25 at the end.",
    commonStudentDifficulty: "Doing full 2-digit multiplication for 65 × 65, 85 × 85, etc.",
    theStrategy: "For any number n5: Left part = n × (n + 1). Right part is always 25.",
    workedExample: {
      problem: "Find 75² in your head",
      conventionalWay: "75 × 75 with columns: 5×5, 5×7, 7×5, 7×7... 25 seconds.",
      speedHackWay: "First digit is 7. Multiply 7 × (7+1) = 7 × 8 = 56. Tack on 25 => 5625!",
      timeSavedSeconds: 22
    },
    proWarning: "This specific shortcut ONLY works when the unit digit is 5.",
    drillQuestion: {
      question: "What is 95²?",
      options: ["9025", "8525", "9125", "9525"],
      correctIndex: 0,
      explanation: "9 × (9 + 1) = 9 × 10 = 90. Tag 25 => 9025."
    },
    youtubeVideoId: "grkWGeqW99c"
  },
  {
    id: "tip_c5_butterfly_fractions",
    gradeRange: [5, 6, 7],
    pillar: "basic_maths",
    difficulty: "Speed-Hack",
    title: "Butterfly Method: Adding & Comparing Fractions",
    oneLiner: "Cross multiply diagonals to get numerators, multiply bottom denominators.",
    commonStudentDifficulty: "Finding lowest common denominators (LCM) when adding simple fractions like 2/3 + 3/5.",
    theStrategy: "Draw diagonal wings: Multiply 2 × 5 = 10 (left antenna) and 3 × 3 = 9 (right antenna). Numerator is 10 + 9 = 19. Denominator is 3 × 5 = 15 => 19/15!",
    workedExample: {
      problem: "Which is larger: 5/8 or 7/11?",
      conventionalWay: "Convert both to decimals or find LCM of 8 and 11 (88).",
      speedHackWay: "Cross multiply: 5 × 11 = 55 vs 8 × 7 = 56. Since 56 > 55, 7/11 is larger!",
      timeSavedSeconds: 15
    },
    proWarning: "Always reduce the final fraction to simplest terms if common factors exist.",
    drillQuestion: {
      question: "Which fraction is bigger: 3/7 or 4/9?",
      options: ["3/7", "4/9", "They are equal", "Cannot determine"],
      correctIndex: 1,
      explanation: "Cross multiply: 3 × 9 = 27 vs 7 × 4 = 28. 28 > 27, so 4/9 > 3/7."
    }
  },

  // ==========================================
  // CLASS 6 TIPS & TRICKS
  // ==========================================
  {
    id: "tip_c6_negative_signs_debt",
    gradeRange: [6, 7],
    pillar: "algebra",
    difficulty: "Common Trap",
    title: "Subtracting Negatives: The Debt Model",
    oneLiner: "Subtracting a negative number is the exact same as adding a positive.",
    commonStudentDifficulty: "Students often write 7 - (-3) = 4 or get confused by the double negative sign.",
    theStrategy: "Think of negative numbers as debt. If someone SUBTRACTS (takes away) your DEBT (-3), you become RICHER (+3)!",
    workedExample: {
      problem: "Evaluate: -12 - (-15)",
      conventionalWay: "Confusing subtraction rules and writing -27 or -3.",
      speedHackWay: "Two dashes combine into a plus sign: -12 + 15 = +3.",
      timeSavedSeconds: 8
    },
    proWarning: "Two consecutive minus signs with no digit between them (e.g., -(-)) always merge to +.",
    drillQuestion: {
      question: "What is 8 - (-5)?",
      options: ["3", "-3", "13", "-13"],
      correctIndex: 2,
      explanation: "8 - (-5) = 8 + 5 = 13."
    },
    youtubeVideoId: "NybHckSEQBI"
  },
  {
    id: "tip_c6_hcf_lcm_ladder",
    gradeRange: [6, 7, 8],
    pillar: "basic_maths",
    difficulty: "Speed-Hack",
    title: "The L-Ladder Method for Instant HCF & LCM",
    oneLiner: "Divide both numbers simultaneously: Left column product is HCF, whole 'L' is LCM.",
    commonStudentDifficulty: "Drawing separate factor trees for each number and getting lost in prime groupings.",
    theStrategy: "Write numbers side-by-side. Divide by common prime factors until relatively prime. The left vertical column gives HCF. Multiply the left column AND bottom row in an 'L' shape to get LCM!",
    workedExample: {
      problem: "Find HCF and LCM of 24 and 36",
      conventionalWay: "24 = 2³ × 3, 36 = 2² × 3². Finding overlaps manually.",
      speedHackWay: "Divide both by 12: leaves 2 and 3. Left factor is 12 (HCF). Product of 12 × 2 × 3 = 72 (LCM)!",
      timeSavedSeconds: 20
    },
    proWarning: "Always stop for HCF when the remaining numbers share no common factor (coprime).",
    drillQuestion: {
      question: "If HCF(15, 20) = 5, what is their LCM using the L-method?",
      options: ["30", "60", "45", "100"],
      correctIndex: 1,
      explanation: "15 and 20 divided by 5 leaves 3 and 4. LCM = 5 × 3 × 4 = 60."
    }
  },

  // ==========================================
  // CLASS 7 TIPS & TRICKS
  // ==========================================
  {
    id: "tip_c7_freshmans_dream",
    gradeRange: [7, 8, 9],
    pillar: "algebra",
    difficulty: "Common Trap",
    title: "The Freshman's Dream Fallacy: (a + b)² ≠ a² + b²",
    oneLiner: "Never forget the middle term 2ab! (a + b)² = a² + 2ab + b².",
    commonStudentDifficulty: "Over 60% of middle school algebra errors come from dropping 2ab.",
    theStrategy: "Geometric memory hook: If you expand a square of side (a+b), you get four sections: a² square, b² square, and TWO rectangles each of area a×b.",
    workedExample: {
      problem: "Expand (x + 4)²",
      conventionalWay: "Common mistake: x² + 16 (INCORRECT).",
      speedHackWay: "Square first (x²), multiply both & double (2 × x × 4 = 8x), square second (16) => x² + 8x + 16.",
      timeSavedSeconds: 12
    },
    proWarning: "Always verify by plugging in x = 1: (1+4)² = 25. If you wrote x² + 16, 1+16 = 17 ≠ 25!",
    drillQuestion: {
      question: "What is (3x + 2)²?",
      options: ["9x² + 4", "9x² + 6x + 4", "9x² + 12x + 4", "6x² + 12x + 4"],
      correctIndex: 2,
      explanation: "(3x)² + 2(3x)(2) + 2² = 9x² + 12x + 4."
    },
    youtubeVideoId: "eF6zYNzlZKQ"
  },
  {
    id: "tip_c7_transposition_equations",
    gradeRange: [7, 8],
    pillar: "algebra",
    difficulty: "Speed-Hack",
    title: "Linear Equation Transposition: Cross the Equal Sign, Flip the Action",
    oneLiner: "+ becomes -, - becomes +, × becomes ÷, ÷ becomes × across the '=' border.",
    commonStudentDifficulty: "Writing duplicate operations on both sides and making sign errors.",
    theStrategy: "Treat '=' as a magical border control. Whenever a term steps across to the other side, its operation reverses automatically.",
    workedExample: {
      problem: "Solve 4x - 7 = 21",
      conventionalWay: "4x - 7 + 7 = 21 + 7, 4x = 28, 4x / 4 = 28 / 4.",
      speedHackWay: "Hop -7 across: 4x = 21 + 7 = 28. Hop ×4 across: x = 28 / 4 = 7!",
      timeSavedSeconds: 10
    },
    proWarning: "Always clear addition/subtraction BEFORE undoing multiplication/division on the variable.",
    drillQuestion: {
      question: "Solve 5x + 15 = 40 by transposition:",
      options: ["x = 5", "x = 11", "x = 7", "x = 3"],
      correctIndex: 0,
      explanation: "5x = 40 - 15 = 25 => x = 25 / 5 = 5."
    },
    youtubeVideoId: "l3XzepN03KQ"
  },
  {
    id: "tip_c7_percentage_multiplier",
    gradeRange: [7, 8, 9],
    pillar: "basic_maths",
    difficulty: "Speed-Hack",
    title: "The Decimal Multiplier for Percentages",
    oneLiner: "Increase by 20% means × 1.20; Decrease by 15% means × 0.85.",
    commonStudentDifficulty: "Calculating percentage increase in two long separate steps: find amount, then add back.",
    theStrategy: "Base is 1.00 (100%). For growth, add rate: +30% is × 1.3. For discount, subtract rate: -25% is × 0.75.",
    workedExample: {
      problem: "Find the price of a ₹800 jacket after a 20% discount",
      conventionalWay: "20% of 800 = 160. Then 800 - 160 = 640.",
      speedHackWay: "Discount is 20%, so you pay 80%. Compute 800 × 0.8 = ₹640 directly!",
      timeSavedSeconds: 12
    },
    proWarning: "Don't confuse a 5% discount (× 0.95) with a 50% discount (× 0.50)!",
    drillQuestion: {
      question: "What multiplier calculates a 15% price increase?",
      options: ["0.15", "1.15", "1.50", "0.85"],
      correctIndex: 1,
      explanation: "100% + 15% = 115% = 1.15."
    },
    youtubeVideoId: "mE4O2F6qf8c"
  },

  // ==========================================
  // CLASS 8 TIPS & TRICKS
  // ==========================================
  {
    id: "tip_c8_nikhilam_base_hundred",
    gradeRange: [8, 9, 10],
    pillar: "vedic_maths",
    difficulty: "Advanced",
    title: "Nikhilam Base 100 Multiplication",
    oneLiner: "Multiply numbers close to 100 by calculating their distance from 100.",
    commonStudentDifficulty: "Doing 3-digit multiplication like 96 × 93 or 104 × 107.",
    theStrategy: "Write deviations from 100: 96 is (-4), 93 is (-7). Cross-add: 96 - 7 = 89. Multiply deviations: (-4) × (-7) = 28. Result = 8928!",
    workedExample: {
      problem: "Multiply 98 × 97",
      conventionalWay: "Vertical long multiplication taking 30-40 seconds.",
      speedHackWay: "Deviations: -2, -3. Left part: 98 - 3 = 95. Right part: (-2) × (-3) = 06. Answer: 9506!",
      timeSavedSeconds: 28
    },
    proWarning: "Right hand side must have 2 digits for base 100 (e.g., 6 must be written as 06).",
    drillQuestion: {
      question: "What is 94 × 98 using Nikhilam method?",
      options: ["9212", "9112", "9312", "9208"],
      correctIndex: 0,
      explanation: "Deviations: -6 and -2. 94 - 2 = 92. (-6) × (-2) = 12. Answer = 9212."
    },
    youtubeVideoId: "1VpW5HkU_Qo"
  },
  {
    id: "tip_c8_instant_square_root",
    gradeRange: [8, 9, 10],
    pillar: "basic_maths",
    difficulty: "Speed-Hack",
    title: "Instant Square Roots of 4-Digit Perfect Squares",
    oneLiner: "Look at the last digit to find units, strike 2 digits, and find nearest square for tens.",
    commonStudentDifficulty: "Long division square root method taking up to 3 minutes per question.",
    theStrategy: "1. Match last digit: 9 ends in 3 or 7. 2. Cross out last 2 digits. 3. Remaining number bounded between square numbers gives tens digit!",
    workedExample: {
      problem: "Find √2209",
      conventionalWay: "Prime factorization or pairing long division.",
      speedHackWay: "Last digit 9 => units digit is 3 or 7. Striking 09 leaves 22. Nearest square ≤ 22 is 4² (16). Tens is 4. Test 45² = 2025. Since 2209 > 2025, root is 47!",
      timeSavedSeconds: 40
    },
    proWarning: "Only works when the problem specifies or guarantees an integer perfect square.",
    drillQuestion: {
      question: "What is √3136?",
      options: ["54", "56", "46", "66"],
      correctIndex: 1,
      explanation: "Ends in 6 (4 or 6). 31 is between 5² (25) and 6² (36), so tens is 5. 55² = 3025. 3136 > 3025, so root is 56."
    },
    youtubeVideoId: "e_3a4G7m4u8"
  },
  {
    id: "tip_c8_difference_of_squares",
    gradeRange: [8, 9],
    pillar: "algebra",
    difficulty: "Speed-Hack",
    title: "Difference of Squares: a² - b² = (a - b)(a + b)",
    oneLiner: "Compute difficult squared differences without ever squaring either number.",
    commonStudentDifficulty: "Squaring large numbers like 53² and 47² separately and subtracting on paper.",
    theStrategy: "Convert a² - b² into (a - b) × (a + b). The difference and sum are often round numbers!",
    workedExample: {
      problem: "Evaluate 55² - 45²",
      conventionalWay: "55² = 3025, 45² = 2025, 3025 - 2025 = 1000.",
      speedHackWay: "(55 - 45) × (55 + 45) = 10 × 100 = 1000. Instant!",
      timeSavedSeconds: 20
    },
    proWarning: "Only applies to MINUS (a² - b²). There is NO real factoring for a² + b².",
    drillQuestion: {
      question: "Evaluate 64² - 36²:",
      options: ["2800", "2600", "3000", "2400"],
      correctIndex: 0,
      explanation: "(64 - 36) × (64 + 36) = 28 × 100 = 2800."
    },
    youtubeVideoId: "Y5J3qE_8L7g"
  },

  // ==========================================
  // CLASS 9 TIPS & TRICKS
  // ==========================================
  {
    id: "tip_c9_conjugate_surds",
    gradeRange: [9, 10],
    pillar: "algebra",
    difficulty: "Speed-Hack",
    title: "Surd Conjugate Rationalization Shortcut",
    oneLiner: "For 1 / (√a + √b), if a - b = 1, the answer is simply √a - √b!",
    commonStudentDifficulty: "Writing multi-line algebraic steps for 1/(√3 + √2) or 1/(√8 - √7).",
    theStrategy: "When the radicands differ by 1 (like 7 and 6, or √5 and 2 where 2=√4), the denominator (√a)² - (√b)² simplifies to 1. Just flip the middle sign!",
    workedExample: {
      problem: "Simplify 1 / (√7 + √6)",
      conventionalWay: "Multiply numerator and denominator by (√7 - √6) and simplify 7 - 6.",
      speedHackWay: "Difference 7 - 6 = 1. Flip sign instantly: √7 - √6.",
      timeSavedSeconds: 15
    },
    proWarning: "If a - b ≠ 1 (like √5 + √2), remember to divide by the difference (3 in this case).",
    drillQuestion: {
      question: "What is 1 / (√10 - 3)? (Note: 3 = √9)",
      options: ["√10 + 3", "√10 - 3", "3 - √10", "(√10 + 3)/2"],
      correctIndex: 0,
      explanation: "3 = √9. Difference is 10 - 9 = 1. Flip sign: √10 + 3."
    },
    youtubeVideoId: "K_5H-2lS3wU"
  },
  {
    id: "tip_c9_urdhva_polynomials",
    gradeRange: [9, 10],
    pillar: "vedic_maths",
    difficulty: "Advanced",
    title: "Urdhva Tiryagbhyam for Polynomial Multiplication",
    oneLiner: "Multiply (ax + b)(cx + d) directly in one line using vertical and cross products.",
    commonStudentDifficulty: "Doing 4 separate multiplications and combining like terms with high risk of sign slips.",
    theStrategy: "Coefficient pattern: x² coefficient = a·c, x coefficient = a·d + b·c, constant = b·d.",
    workedExample: {
      problem: "Multiply (2x + 3)(4x - 5)",
      conventionalWay: "FOIL: 2x(4x) + 2x(-5) + 3(4x) + 3(-5) = 8x² - 10x + 12x - 15 = 8x² + 2x - 15.",
      speedHackWay: "x²: 2×4=8; x: (2×-5)+(3×4) = -10+12 = +2; Const: 3×-5 = -15 => 8x² + 2x - 15.",
      timeSavedSeconds: 15
    },
    proWarning: "Always attach signs to numbers when computing cross products.",
    drillQuestion: {
      question: "What is the x-coefficient in (3x + 2)(x + 4)?",
      options: ["10", "14", "12", "7"],
      correctIndex: 1,
      explanation: "Cross terms: (3 × 4) + (2 × 1) = 12 + 2 = 14."
    },
    youtubeVideoId: "pUPmfg6U6tY"
  },

  // ==========================================
  // CLASS 10 TIPS & TRICKS
  // ==========================================
  {
    id: "tip_c10_discriminant_check",
    gradeRange: [9, 10, 11],
    pillar: "algebra",
    difficulty: "Speed-Hack",
    title: "Discriminant D Speed Check for Quadratics",
    oneLiner: "Calculate b² - 4ac first to instantly know nature and sanity of roots.",
    commonStudentDifficulty: "Applying the full quadratic formula blindly and ending up with negatives under square roots.",
    theStrategy: "Check D = b² - 4ac in 3 seconds: If D < 0, STOP (no real roots). If D is a perfect square, factoring by integers will work!",
    workedExample: {
      problem: "Determine if 3x² + 5x - 2 = 0 can be factored cleanly",
      conventionalWay: "Guessing factor pairs endlessly for 2-3 minutes.",
      speedHackWay: "D = 25 - 4(3)(-2) = 25 + 24 = 49 = 7². Perfect square! Factors cleanly: (3x - 1)(x + 2) = 0.",
      timeSavedSeconds: 45
    },
    proWarning: "Pay attention to the sign of 'c'. If c is negative and a is positive, -4ac becomes POSITIVE.",
    drillQuestion: {
      question: "For equation 2x² - 4x + 2 = 0, what is the value of D?",
      options: ["16", "0", "-8", "8"],
      correctIndex: 1,
      explanation: "b² - 4ac = (-4)² - 4(2)(2) = 16 - 16 = 0 (Two equal real roots)."
    },
    youtubeVideoId: "i7idZfS8t8w"
  },
  {
    id: "tip_c10_vietas_formula",
    gradeRange: [10, 11],
    pillar: "algebra",
    difficulty: "Speed-Hack",
    title: "Vieta's Relations: Sum & Product of Roots",
    oneLiner: "For ax² + bx + c = 0: Sum α + β = -b/a, Product αβ = c/a.",
    commonStudentDifficulty: "Finding roots explicitly just to add or multiply them in board exam questions.",
    theStrategy: "Never find individual roots when a question asks for (α + β), (αβ), or (1/α + 1/β). Use 1/α + 1/β = (α + β) / (αβ) = (-b/a) / (c/a) = -b/c!",
    workedExample: {
      problem: "If α and β are roots of 2x² - 6x + 3 = 0, find 1/α + 1/β",
      conventionalWay: "Use quadratic formula to find α and β (with messy square roots), take reciprocal, and add.",
      speedHackWay: "1/α + 1/β = (α + β)/(αβ) = (6/2) / (3/2) = 3 / 1.5 = 2. Takes 4 seconds!",
      timeSavedSeconds: 50
    },
    proWarning: "Don't forget the negative sign on -b/a! If b is already negative (-6), -b becomes +6.",
    drillQuestion: {
      question: "For polynomial 3x² + 9x - 12 = 0, what is the product of roots?",
      options: ["-3", "-4", "4", "3"],
      correctIndex: 1,
      explanation: "Product = c / a = -12 / 3 = -4."
    },
    youtubeVideoId: "Ua0vIq7Vw98"
  },
  {
    id: "tip_c10_trig_hand_rule",
    gradeRange: [10, 11],
    pillar: "basic_maths",
    difficulty: "Speed-Hack",
    title: "Trigonometric Table Left-Hand Trick",
    oneLiner: "Assign fingers 0°, 30°, 45°, 60°, 90°. sin θ = √(fingers below)/2, cos θ = √(fingers above)/2.",
    commonStudentDifficulty: "Memorizing the 30-cell trigonometric table and confusing sin 60° with cos 30°.",
    theStrategy: "Hold left palm facing you: Thumb=0°, Index=30°, Middle=45°, Ring=60°, Pinky=90°. Fold the angle finger: sin = √(fingers below)/2; cos = √(fingers above)/2.",
    workedExample: {
      problem: "Find sin 60° and cos 60°",
      conventionalWay: "Reciting table row by row from memory.",
      speedHackWay: "Fold Ring finger (60°). Fingers below = 3 => sin 60° = √3/2. Fingers above = 1 => cos 60° = √1/2 = 1/2!",
      timeSavedSeconds: 15
    },
    proWarning: "tan θ is simply √(fingers below) / √(fingers above).",
    drillQuestion: {
      question: "Using the hand rule, what is sin 30°?",
      options: ["√3/2", "1/2", "1/√2", "0"],
      correctIndex: 1,
      explanation: "Fold index finger (30°). 1 finger below (thumb) => √1 / 2 = 1/2."
    }
  },

  // ==========================================
  // CLASS 11 TIPS & TRICKS
  // ==========================================
  {
    id: "tip_c11_powers_of_i",
    gradeRange: [11, 12],
    pillar: "algebra",
    difficulty: "Speed-Hack",
    title: "Complex Numbers: The Modulo 4 Cycle of i",
    oneLiner: "Divide the exponent of i by 4 and look at remainder: Rem 1 -> i, Rem 2 -> -1, Rem 3 -> -i, Rem 0 -> 1.",
    commonStudentDifficulty: "Expanding massive powers like i²⁰²⁶ by repeatedly squaring.",
    theStrategy: "i is cyclic with period 4: i¹=i, i²=-1, i³=-i, i⁴=1. For any iⁿ, check the remainder of n ÷ 4!",
    workedExample: {
      problem: "Evaluate i²⁴⁷",
      conventionalWay: "Dividing powers manually: i²⁴⁶ · i = (i²)¹²³ · i = (-1) · i = -i.",
      speedHackWay: "Look at last two digits: 47 ÷ 4 leaves remainder 3. i³ = -i!",
      timeSavedSeconds: 15
    },
    proWarning: "Only the last two digits of the exponent matter for divisibility by 4.",
    drillQuestion: {
      question: "What is the value of i¹⁰²?",
      options: ["1", "-1", "i", "-i"],
      correctIndex: 1,
      explanation: "102 ÷ 4 leaves remainder 2. i² = -1."
    }
  },
  {
    id: "tip_c11_combinations_symmetry",
    gradeRange: [11, 12],
    pillar: "basic_maths",
    difficulty: "Speed-Hack",
    title: "Combinations Symmetry: ⁿCᵣ = ⁿCₙ₋ᵣ",
    oneLiner: "Choosing r items from n is identical to choosing the (n - r) items to leave behind.",
    commonStudentDifficulty: "Calculating ¹⁰⁰C₉₈ using full factorial formulas.",
    theStrategy: "Always flip r to (n - r) if r > n/2. For ¹⁰C₈, compute ¹⁰C₂ = (10 × 9)/(2 × 1) = 45 in 2 seconds!",
    workedExample: {
      problem: "Evaluate ²⁰C₁₈",
      conventionalWay: "20! / (18! × 2!) written out on paper.",
      speedHackWay: "²⁰C₁₈ = ²⁰C₂ = (20 × 19) / 2 = 10 × 19 = 190!",
      timeSavedSeconds: 25
    },
    proWarning: "Remember to divide by r! in the denominator, don't stop at permutations ⁿPᵣ.",
    drillQuestion: {
      question: "What is ¹⁵C₁₄?",
      options: ["14", "15", "1", "105"],
      correctIndex: 1,
      explanation: "¹⁵C₁₄ = ¹⁵C₁ = 15."
    }
  },

  // ==========================================
  // CLASS 12 TIPS & TRICKS
  // ==========================================
  {
    id: "tip_c12_lhopitals_rule",
    gradeRange: [11, 12],
    pillar: "algebra",
    difficulty: "Advanced",
    title: "Calculus L'Hôpital's Rule & Differentiation Shortcut",
    oneLiner: "For indeterminate forms 0/0 or ∞/∞, differentiate numerator and denominator separately.",
    commonStudentDifficulty: "Getting stuck on complex algebraic rationalization in limit problems.",
    theStrategy: "Always confirm form is 0/0 or ∞/∞ first. Then take d/dx(top) / d/dx(bottom) directly.",
    workedExample: {
      problem: "Evaluate lim (x -> 0) of (sin 3x) / x",
      conventionalWay: "Multiply and divide by 3 to match standard limit formula.",
      speedHackWay: "At x=0, form is 0/0. d/dx(sin 3x) = 3 cos 3x. d/dx(x) = 1. Plug x=0: 3(1)/1 = 3.",
      timeSavedSeconds: 15
    },
    proWarning: "Do NOT use quotient rule! Differentiate numerator and denominator independently.",
    drillQuestion: {
      question: "Evaluate lim (x -> 0) of (e^(2x) - 1) / x",
      options: ["0", "1", "2", "e"],
      correctIndex: 2,
      explanation: "0/0 form. d/dx(e^(2x) - 1) = 2e^(2x). d/dx(x) = 1. At x=0, 2(1)/1 = 2."
    }
  },
  {
    id: "tip_c12_matrix_inverse_shortcut",
    gradeRange: [12],
    pillar: "algebra",
    difficulty: "Speed-Hack",
    title: "2×2 Matrix Inverse Adjoint Fast Swap",
    oneLiner: "Swap the main diagonal elements, negate the off-diagonal elements, divide by determinant.",
    commonStudentDifficulty: "Writing cofactors, transposing, and confusing signs in matrix inverses.",
    theStrategy: "For [[a, b], [c, d]]: adj(A) is [[d, -b], [-c, a]]. A⁻¹ = (1 / (ad - bc)) × [[d, -b], [-c, a]].",
    workedExample: {
      problem: "Find inverse of [[3, 5], [1, 2]]",
      conventionalWay: "Finding 4 cofactors C₁₁, C₁₂, C₂₁, C₂₂, transposing, dividing.",
      speedHackWay: "Det = (3)(2) - (5)(1) = 6 - 5 = 1. Swap diagonal [3, 2] -> [2, 3]. Negate [5, 1] -> [-5, -1]. Result: [[2, -5], [-1, 3]]!",
      timeSavedSeconds: 30
    },
    proWarning: "If determinant ad - bc = 0, STOP! Inverse does NOT exist.",
    drillQuestion: {
      question: "What is the adjoint of matrix [[4, 2], [3, 1]]?",
      options: ["[[1, -2], [-3, 4]]", "[[4, -2], [-3, 1]]", "[[-1, 2], [3, -4]]", "[[1, 2], [3, 4]]"],
      correctIndex: 0,
      explanation: "Swap main diagonal 4 and 1 -> [[1, _], [_, 4]]. Negate off-diagonal -> -2 and -3. Result: [[1, -2], [-3, 4]]."
    },
    youtubeVideoId: "8eZ_Kx_Yh5o"
  },
  {
    id: "tip_c12_kings_property_integrals",
    gradeRange: [12],
    pillar: "algebra",
    difficulty: "Advanced",
    title: "King's Rule in Definite Integrals: ∫ f(x)dx = ∫ f(a + b - x)dx",
    oneLiner: "Replace x with (lower + upper - x), add the two integrals 2I, and watch terms cancel to 1!",
    commonStudentDifficulty: "Attempting to integrate monstrous functions like sin⁴x / (sin⁴x + cos⁴x) from 0 to π/2.",
    theStrategy: "King's property: I = ∫[a, b] f(x) dx = ∫[a, b] f(a+b-x) dx. Adding I + I = 2I turns the integrand into 1! So 2I = b - a => I = (b - a)/2.",
    workedExample: {
      problem: "Evaluate ∫[0 to π/2] (√sin x) / (√sin x + √cos x) dx",
      conventionalWay: "Attempting integration by parts or trigonometric substitutions (impossible or extremely long).",
      speedHackWay: "Apply King's rule: sin(π/2 - x) = cos x. 2I = ∫[0 to π/2] 1 dx = π/2 => I = π/4!",
      timeSavedSeconds: 90
    },
    proWarning: "Always remember to divide by 2 at the end (because 2I was computed)!",
    drillQuestion: {
      question: "Evaluate ∫[0 to π/2] (sinⁿx) / (sinⁿx + cosⁿx) dx for any power n:",
      options: ["π/2", "π/4", "1", "0"],
      correctIndex: 1,
      explanation: "By King's Property, 2I = ∫[0 to π/2] 1 dx = π/2 - 0 => I = π/4."
    }
  }
];
