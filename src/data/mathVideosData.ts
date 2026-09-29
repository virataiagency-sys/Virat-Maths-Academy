export type VideoCategory = 'abacus' | 'vedic_maths' | 'algebra' | 'cbse_curriculum' | 'speed_maths' | 'sof_olympiad';

export interface MathVideoLesson {
  id: string;
  youtubeId: string;
  title: string;
  category: VideoCategory;
  classes: number[]; // Classes 1 to 12
  duration: string;
  instructor: string;
  channel: string;
  description: string;
  keyTakeaways: string[];
  timestamps?: { time: string; label: string }[];
  practiceChallenge: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  relatedTopicOrChapter?: string;
}

export const mathVideosData: MathVideoLesson[] = [
  // ABACUS MASTERY
  {
    id: "abacus_intro_basics",
    youtubeId: "1F-F1f0q8bU", // Abacus Basics for Beginners
    title: "Abacus (Soroban) Foundation: Anatomy, Reading & Finger Technique",
    category: "abacus",
    classes: [1, 2, 3, 4],
    duration: "11:45",
    instructor: "Master Kenji & Soroban Institute",
    channel: "Abacus Kids Academy",
    description: "Learn how the Japanese Soroban works: Beam, Lower Earth beads (value 1), Upper Heaven beads (value 5), and the strict finger technique (Right Thumb for lower beads, Right Index for upper bead).",
    keyTakeaways: [
      "Lower beads = 1 unit each; Upper bead = 5 units",
      "Right Thumb pushes Earth beads UP towards the separation beam",
      "Right Index finger pulls Heaven bead DOWN to beam and cleans it UP",
      "Zero position: all beads cleared away from the central calculating beam"
    ],
    timestamps: [
      { time: "00:00", label: "Introduction to the Soroban Frame" },
      { time: "02:15", label: "The Earth Beads & Heaven Beads" },
      { time: "05:30", label: "Proper Hand Posture and Pencil Hold" },
      { time: "08:45", label: "Representing Numbers 1 to 9 on One Rod" }
    ],
    practiceChallenge: {
      question: "On an Abacus rod, if the Heaven bead is touching the beam and 3 Earth beads are touching the beam, what number is represented?",
      options: ["3", "5", "8", "6"],
      correctIndex: 2,
      explanation: "Heaven bead = 5, and three Earth beads = 3. 5 + 3 = 8."
    },
    relatedTopicOrChapter: "Class 1-3 Numbers and Place Values"
  },
  {
    id: "abacus_5_10_complements",
    youtubeId: "Vn9Q_rUj8Qo", // 5 and 10 complements on Abacus
    title: "Abacus Complements: The Secret 5-Friend & 10-Friend Formulas",
    category: "abacus",
    classes: [2, 3, 4, 5],
    duration: "14:20",
    instructor: "Sensei Tanaka",
    channel: "Mental Math & Soroban Masters",
    description: "Master the fundamental complement formulas when a rod is full: 5-Friends (+4 = +5 - 1, +3 = +5 - 2) and 10-Friends (+9 = -1 + 10, +8 = -2 + 10).",
    keyTakeaways: [
      "5-Complements: 1 & 4 are friends, 2 & 3 are friends",
      "10-Complements: 9 & 1, 8 & 2, 7 & 3, 6 & 4, 5 & 5",
      "Direct addition vs. borrowing via upper bead vs. carrying to next rod",
      "Speed drills to build muscle memory without looking at fingers"
    ],
    timestamps: [
      { time: "00:00", label: "Why Do We Need Complements?" },
      { time: "03:10", label: "The 5-Friend Additions (+1, +2, +3, +4)" },
      { time: "07:45", label: "The 10-Friend Formula with Next-Rod Carry" },
      { time: "11:20", label: "Combo Rules: Adding 6, 7, 8, 9 with Borrowing" }
    ],
    practiceChallenge: {
      question: "You want to add 4 on a rod that already has 2 Earth beads up. How do you do it using 5-complements?",
      options: [
        "Push up 2 more beads",
        "Pull down Heaven bead (5) and push down 1 Earth bead (4 = +5 - 1)",
        "Clear all beads to zero",
        "Move to the tens rod directly"
      ],
      correctIndex: 1,
      explanation: "Since only 2 lower beads are available, use 5-friend: +4 = +5 (bring down Heaven bead) - 1 (remove 1 Earth bead)."
    },
    relatedTopicOrChapter: "Class 2-4 Addition & Mental Arithmetic"
  },
  {
    id: "abacus_mental_anzan",
    youtubeId: "F3_JbV8O_58", // Mental Abacus Anzan
    title: "Mental Math Anzan: Visualizing the Soroban in Mind",
    category: "abacus",
    classes: [3, 4, 5, 6, 7, 8],
    duration: "12:50",
    instructor: "Coach Ryu",
    channel: "Flash Anzan Championship",
    description: "How world memory and mental math champions visualize beads moving in their mind's eye to add 10 numbers in under 3 seconds.",
    keyTakeaways: [
      "Internalizing the physical Soroban into a 3D mental projector",
      "Micro-finger twitches that stimulate mental calculation pathways",
      "Transitioning from physical beads to flash mental arithmetic",
      "Daily 5-minute flash card routines for brain speed"
    ],
    practiceChallenge: {
      question: "What is 'Anzan' in the context of Soroban abacus training?",
      options: [
        "A wooden abacus frame",
        "Mental calculation by visualizing bead movement in the mind",
        "A type of division algorithm",
        "The highest belt rank in abacus"
      ],
      correctIndex: 1,
      explanation: "Anzan is the practice of performing high-speed mental calculations by visualizing a mental Soroban abacus."
    },
    relatedTopicOrChapter: "Class 4-8 Speed Arithmetic & Flash Math"
  },

  // VEDIC MATHS SUTRAS & SHORTCUTS
  {
    id: "vedic_ekadhikena_purvena",
    youtubeId: "grkWGeqW99c", // Vedic Maths Fast Multiplication & Squaring
    title: "Vedic Maths: Ekadhikena Purvena (Fast Squaring of Numbers Ending in 5)",
    category: "vedic_maths",
    classes: [4, 5, 6, 7, 8, 9, 10],
    duration: "10:15",
    instructor: "Dr. Gaurav Sharma",
    channel: "Vedic Mathematics Academy",
    description: "Learn the legendary sutra 'Ekadhikena Purvena' (By one more than the previous one). Square numbers like 35, 65, 85, 115 in under 2 seconds flat!",
    keyTakeaways: [
      "Rule: For (N5)², Left part = N × (N + 1), Right part = 25",
      "Examples: 35² = (3×4) | 25 = 1225; 85² = (8×9) | 25 = 7225",
      "Works for 3-digit numbers too: 115² = (11×12) | 25 = 13225",
      "Generalization to products where unit digits sum to 10 and tens digits are same"
    ],
    timestamps: [
      { time: "00:00", label: "The Meaning of Ekadhikena Purvena" },
      { time: "02:30", label: "2-Digit Numbers Ending in 5" },
      { time: "05:10", label: "3-Digit Expansion (105², 115², 125²)" },
      { time: "08:00", label: "Application to General Products like 43 × 47" }
    ],
    practiceChallenge: {
      question: "Using Ekadhikena Purvena, calculate 65² mentally:",
      options: ["4225", "3625", "4025", "4525"],
      correctIndex: 0,
      explanation: "First digit is 6. Multiply 6 × (6 + 1) = 6 × 7 = 42. Tag 25 at the end => 4225."
    },
    relatedTopicOrChapter: "Class 6-8 Squares and Square Roots"
  },
  {
    id: "vedic_nikhilam_base_multiplication",
    youtubeId: "1VpW5HkU_Qo", // Nikhilam Navatashcaramam Dashatah
    title: "Nikhilam Sutra: Base 100, 1000 & Sub-Base Multiplication",
    category: "vedic_maths",
    classes: [5, 6, 7, 8, 9, 10, 11, 12],
    duration: "16:40",
    instructor: "Vedic Scholar Rajeshwari",
    channel: "Ancient Indian Mathematics",
    description: "Sutra: 'Nikhilam Navatashcaramam Dashatah' (All from 9 and the last from 10). Multiply numbers close to 100 (e.g. 97 × 94 or 104 × 106) in a single mental step.",
    keyTakeaways: [
      "Deviation method: Find distance of both numbers from Base 100",
      "Left Part = Cross add or subtract (Number A + Deviation B)",
      "Right Part = Product of deviations (maintain 2 digits for base 100)",
      "Numbers above the base (108 × 105) vs. numbers below the base (98 × 96)"
    ],
    timestamps: [
      { time: "00:00", label: "The Philosophy of Reference Bases" },
      { time: "03:40", label: "Both Numbers Below Base: 96 × 92" },
      { time: "08:15", label: "Both Numbers Above Base: 104 × 107" },
      { time: "12:30", label: "Mixed Signs: One Above, One Below" }
    ],
    practiceChallenge: {
      question: "Multiply 98 × 95 using the Nikhilam method:",
      options: ["9310", "9410", "9210", "9510"],
      correctIndex: 0,
      explanation: "Deviations from 100: -2 and -5. Left part: 98 - 5 = 93. Right part: (-2) × (-5) = 10. Combine: 9310."
    },
    relatedTopicOrChapter: "Class 7-10 Speed Multiplication & Arithmetic"
  },
  {
    id: "vedic_urdhva_tiryagbhyam",
    youtubeId: "pUPmfg6U6tY", // Vertically and Crosswise
    title: "Urdhva Tiryagbhyam: Universal Vertically & Crosswise Multiplication",
    category: "vedic_maths",
    classes: [6, 7, 8, 9, 10, 11, 12],
    duration: "18:25",
    instructor: "Prof. S. R. Iyengar",
    channel: "Vedic Math Academy Global",
    description: "The crown jewel of Vedic Maths: Urdhva Tiryagbhyam (Vertically and Crosswise). Multiply ANY two numbers or polynomials in a single line from right to left.",
    keyTakeaways: [
      "Works universally on 2-digit, 3-digit, and N-digit numbers",
      "Pattern: Vertical -> Crosswise -> Vertical (I -> X -> I)",
      "Applies seamlessly to multiplying algebraic polynomials (ax + b)(cx + d)",
      "Eliminates writing multi-step intermediate paper calculations"
    ],
    practiceChallenge: {
      question: "Using crosswise multiplication on 23 × 14, what is the middle cross-sum term?",
      options: ["(2×4) + (3×1) = 11", "(2×1) + (3×4) = 14", "(2×3) + (1×4) = 10", "23 + 14 = 37"],
      correctIndex: 0,
      explanation: "Cross terms: (2 × 4) + (3 × 1) = 8 + 3 = 11."
    },
    relatedTopicOrChapter: "Class 8-10 Polynomials and Fast Arithmetic"
  },

  // ALGEBRA MASTERY
  {
    id: "algebra_basics_intro",
    youtubeId: "NybHckSEQBI", // Math Antics - What is Algebra?
    title: "Algebra Basics: What is Algebra & Why Do We Use Letters?",
    category: "algebra",
    classes: [5, 6, 7, 8],
    duration: "11:28",
    instructor: "Rob (Math Antics)",
    channel: "Math Antics",
    description: "An ultra-intuitive visual introduction to algebra. Learn why unknown numbers are called variables, how arithmetic turns into equations, and how to find hidden values.",
    keyTakeaways: [
      "Variables are placeholders for mystery numbers (like empty boxes)",
      "Coefficients: When a number is glued to a variable (4x means 4 times x)",
      "Equations represent a balance scale: left side MUST balance right side",
      "Doing the same operation to both sides keeps the scale perfectly balanced"
    ],
    timestamps: [
      { time: "00:00", label: "Arithmetic vs. Algebra" },
      { time: "02:45", label: "What is an Unknown Variable?" },
      { time: "06:10", label: "Algebraic Sentences & Terms" },
      { time: "09:30", label: "The Golden Rule of Balance" }
    ],
    practiceChallenge: {
      question: "In the expression 7x - 4, what is the coefficient of x?",
      options: ["-4", "7", "x", "3"],
      correctIndex: 1,
      explanation: "The coefficient is the numerical factor multiplying the variable x, which is 7."
    },
    relatedTopicOrChapter: "Class 6-7 Introduction to Algebra"
  },
  {
    id: "algebra_solving_equations_balance",
    youtubeId: "l3XzepN03KQ", // Math Antics - Solving Basic Equations
    title: "Solving Linear Equations: The Inverse Operation & Balance Method",
    category: "algebra",
    classes: [6, 7, 8, 9],
    duration: "13:08",
    instructor: "Rob (Math Antics)",
    channel: "Math Antics",
    description: "Master solving 1-step and 2-step linear equations using inverse operations (addition undoes subtraction, multiplication undoes division).",
    keyTakeaways: [
      "Isolating the variable is the ultimate goal",
      "Undo operations in reverse order of operations (undo + and - first)",
      "Whatever you do to one side of '=', you MUST do to the other",
      "Check your answer by plugging it back into the original equation"
    ],
    timestamps: [
      { time: "00:00", label: "Inverse Operations Review" },
      { time: "03:15", label: "One-Step Equations (+, -, ×, ÷)" },
      { time: "07:20", label: "Two-Step Equations (2x + 5 = 15)" },
      { time: "10:45", label: "Sanity Checking Your Solution" }
    ],
    practiceChallenge: {
      question: "Solve for x: 3x + 7 = 22",
      options: ["x = 3", "x = 5", "x = 7", "x = 9"],
      correctIndex: 1,
      explanation: "Subtract 7 from both sides: 3x = 15. Divide both sides by 3: x = 5."
    },
    relatedTopicOrChapter: "Class 7-8 Linear Equations in One Variable"
  },
  {
    id: "algebra_factoring_quadratics",
    youtubeId: "eF6zYNzlZKQ", // Factoring Quadratics
    title: "Factoring Quadratic Equations: The Product-Sum & AC Method",
    category: "algebra",
    classes: [8, 9, 10, 11],
    duration: "15:42",
    instructor: "Brian McLogan",
    channel: "Brian McLogan Math",
    description: "Never get stuck on quadratics ax² + bx + c = 0 again. Master the Product-Sum method, the X-box method, and the AC method for non-monic quadratics.",
    keyTakeaways: [
      "Find two numbers that multiply to c and add up to b",
      "When a > 1, use AC method: multiply a × c, split the middle term",
      "Difference of squares: a² - b² = (a - b)(a + b)",
      "Zero Product Property: If (x - p)(x - q) = 0, then x = p or x = q"
    ],
    timestamps: [
      { time: "00:00", label: "Standard Form ax² + bx + c = 0" },
      { time: "03:20", label: "When a = 1 (Simple Product-Sum)" },
      { time: "07:50", label: "When a > 1 (Splitting the Middle Term)" },
      { time: "12:10", label: "Common Traps with Negative Signs" }
    ],
    practiceChallenge: {
      question: "Factor the quadratic equation: x² - 5x + 6 = 0",
      options: ["(x - 2)(x - 3) = 0", "(x + 2)(x + 3) = 0", "(x - 1)(x - 6) = 0", "(x + 1)(x - 6) = 0"],
      correctIndex: 0,
      explanation: "We need two numbers that multiply to +6 and add to -5. Those numbers are -2 and -3. So (x - 2)(x - 3) = 0."
    },
    relatedTopicOrChapter: "Class 9-10 Quadratic Equations & Polynomials"
  },
  {
    id: "algebra_quadratic_formula_derivation",
    youtubeId: "i7idZfS8t8w", // Quadratic Formula
    title: "The Quadratic Formula & Discriminant Analysis Demystified",
    category: "algebra",
    classes: [9, 10, 11, 12],
    duration: "14:10",
    instructor: "Sal Khan",
    channel: "Khan Academy",
    description: "Understand where x = [-b ± √(b² - 4ac)] / (2a) comes from via completing the square, and how Discriminant D reveals real, equal, or imaginary roots.",
    keyTakeaways: [
      "Formula solves ANY quadratic, even when factoring is impossible with integers",
      "Discriminant D = b² - 4ac controls the root topology",
      "D > 0: Two distinct real roots; D = 0: One repeated real root; D < 0: Complex conjugate roots",
      "Vieta's Relations: Sum of roots α + β = -b/a, Product αβ = c/a"
    ],
    practiceChallenge: {
      question: "What is the discriminant D for the quadratic equation x² - 6x + 9 = 0?",
      options: ["36", "0", "-36", "18"],
      correctIndex: 1,
      explanation: "D = b² - 4ac = (-6)² - 4(1)(9) = 36 - 36 = 0. This means the equation has one repeated real root (x = 3)."
    },
    relatedTopicOrChapter: "Class 10 CBSE Chapter 4 Quadratic Equations"
  },

  // CBSE CLASS-WISE SYLLABUS MASTERCLASSES
  {
    id: "cbse_class10_real_numbers",
    youtubeId: "Ua0vIq7Vw98", // CBSE Class 10 Real Numbers Full Chapter
    title: "CBSE Class 10 Maths: Real Numbers & Fundamental Theorem of Arithmetic",
    category: "cbse_curriculum",
    classes: [9, 10],
    duration: "24:35",
    instructor: "Ashish Kumar",
    channel: "Vedantu Class 9 & 10",
    description: "Complete NCERT Class 10 Chapter 1 masterclass: Fundamental Theorem of Arithmetic, proving irrationality of √2, √3, √5, and HCF × LCM = a × b applications.",
    keyTakeaways: [
      "Every composite number can be uniquely expressed as a product of prime powers",
      "Contradiction proof method for showing √p is irrational",
      "Relation: HCF(a, b) × LCM(a, b) = a × b (valid strictly for two numbers)",
      "Frequent board examination question patterns and marking scheme tips"
    ],
    practiceChallenge: {
      question: "If HCF(306, 657) = 9, what is LCM(306, 657)?",
      options: ["22338", "18240", "24500", "20436"],
      correctIndex: 0,
      explanation: "LCM = (a × b) / HCF = (306 × 657) / 9 = 34 × 657 = 22338."
    },
    relatedTopicOrChapter: "Class 10 Chapter 1 Real Numbers"
  },
  {
    id: "cbse_class9_number_systems",
    youtubeId: "K_5H-2lS3wU", // CBSE Class 9 Number Systems
    title: "CBSE Class 9 Maths: Number Systems & Rationalizing Denominators",
    category: "cbse_curriculum",
    classes: [8, 9],
    duration: "22:15",
    instructor: "Harsh Priyam Sir",
    channel: "Vedantu 9th & 10th",
    description: "NCERT Class 9 Chapter 1: Rational vs Irrational numbers, decimal expansions (terminating and non-terminating repeating), representing numbers on number line, and rationalizing conjugates.",
    keyTakeaways: [
      "p/q form for non-terminating recurring decimals (e.g. 0.333... or 0.235...)",
      "Conjugate multiplication: multiply top and bottom by (√a - √b)",
      "Laws of rational exponents for real numbers"
    ],
    practiceChallenge: {
      question: "What is the simplest form of 1 / (√5 + √2) after rationalizing the denominator?",
      options: ["(√5 - √2) / 3", "(√5 + √2) / 3", "(√5 - √2) / 7", "√3"],
      correctIndex: 0,
      explanation: "Multiply numerator and denominator by conjugate (√5 - √2): (√5 - √2) / ((√5)² - (√2)²) = (√5 - √2) / (5 - 2) = (√5 - √2) / 3."
    },
    relatedTopicOrChapter: "Class 9 Chapter 1 Number Systems"
  },
  {
    id: "cbse_class12_matrices_determinants",
    youtubeId: "8eZ_Kx_Yh5o", // CBSE Class 12 Matrices & Determinants
    title: "CBSE Class 12 Maths: Matrices, Adjoint & Inverse Speed Mastery",
    category: "cbse_curriculum",
    classes: [11, 12],
    duration: "28:50",
    instructor: "Neha Agrawal",
    channel: "Mathematically Inclined",
    description: "NCERT Class 12 Chapter 3 & 4: Matrix operations, skew-symmetric matrices, cofactor matrices, computing A⁻¹ = (1/|A|) adj(A), and solving systems of linear equations via Matrix Method.",
    keyTakeaways: [
      "A · adj(A) = |A| · I",
      "|adj(A)| = |A|^(n - 1) for an n×n square matrix",
      "Shortcut for 2×2 adjoint: swap main diagonal, negate off diagonal",
      "Criteria for consistency: Unique solution when |A| ≠ 0"
    ],
    practiceChallenge: {
      question: "If A is a 3×3 square matrix with |A| = 4, what is the value of |adj(A)|?",
      options: ["4", "16", "64", "12"],
      correctIndex: 1,
      explanation: "Formula: |adj(A)| = |A|^(n-1). Here n = 3, so |adj(A)| = 4^(3-1) = 4² = 16."
    },
    relatedTopicOrChapter: "Class 12 Chapters 3 & 4 Matrices and Determinants"
  },
  {
    id: "cbse_class8_algebraic_expressions",
    youtubeId: "Y5J3qE_8L7g", // CBSE Class 8 Algebraic Expressions & Identities
    title: "CBSE Class 8 Maths: Algebraic Expressions & Standard Identities",
    category: "cbse_curriculum",
    classes: [7, 8],
    duration: "19:10",
    instructor: "Sana Ma'am",
    channel: "Vedantu Young Wonders",
    description: "NCERT Class 8 Chapter 9: Monomials, binomials, polynomials, addition and multiplication of expressions, and the 4 fundamental algebraic identities.",
    keyTakeaways: [
      "(a + b)² = a² + 2ab + b²",
      "(a - b)² = a² - 2ab + b²",
      "(a + b)(a - b) = a² - b²",
      "(x + a)(x + b) = x² + (a + b)x + ab"
    ],
    practiceChallenge: {
      question: "Evaluate 103 × 97 using an algebraic identity without direct multiplication:",
      options: ["9991", "9981", "9971", "10001"],
      correctIndex: 0,
      explanation: "Rewrite as (100 + 3)(100 - 3) = 100² - 3² = 10,000 - 9 = 9,991."
    },
    relatedTopicOrChapter: "Class 8 Chapter 9 Algebraic Expressions & Identities"
  },

  // SPEED MATHS & ARITHMETIC HACKS
  {
    id: "speed_maths_percentage_tricks",
    youtubeId: "mE4O2F6qf8c", // Percentage Tricks
    title: "Mental Percentage Shortcuts: X% of Y is Always Y% of X",
    category: "speed_maths",
    classes: [5, 6, 7, 8, 9, 10, 11, 12],
    duration: "09:40",
    instructor: "Fast Math Pro",
    channel: "Numberphile & Speed Math",
    description: "The reversible percentage property: 16% of 50 is impossible mentally, but 50% of 16 is instantly 8! Master 10%, 1%, 5%, and splitting percentages.",
    keyTakeaways: [
      "Reversibility: x% of y = y% of x (because (x × y)/100 = (y × x)/100)",
      "Benchmarking: Find 10% (shift 1 decimal), find 1% (shift 2 decimals)",
      "Fraction equivalents: 12.5% = 1/8, 16.67% = 1/6, 33.33% = 1/3, 25% = 1/4"
    ],
    practiceChallenge: {
      question: "Calculate 18% of 50 in your head:",
      options: ["9", "18", "7.5", "12"],
      correctIndex: 0,
      explanation: "Flip it: 18% of 50 = 50% of 18. Half of 18 is 9!"
    },
    relatedTopicOrChapter: "Class 7-8 Comparing Quantities & Percentages"
  },
  {
    id: "speed_maths_instant_square_roots",
    youtubeId: "e_3a4G7m4u8", // Fast Square Roots
    title: "Instant Square Roots of Perfect Squares in 3 Seconds",
    category: "speed_maths",
    classes: [6, 7, 8, 9, 10, 11, 12],
    duration: "11:55",
    instructor: "Guinness Record Trainer Anand",
    channel: "Super Speed Calculations",
    description: "Extract square roots of 4-digit and 5-digit perfect squares in under 3 seconds using unit digit analysis and ten's place bounding.",
    keyTakeaways: [
      "Unit digit mapping: 1 -> 1 or 9; 4 -> 2 or 8; 5 -> 5; 6 -> 4 or 6; 9 -> 3 or 7",
      "Strike out the last two digits and find the largest square below remaining number",
      "Compare with the middle number ending in 5 to resolve ambiguity"
    ],
    practiceChallenge: {
      question: "What is √3249?",
      options: ["53", "57", "47", "63"],
      correctIndex: 1,
      explanation: "Ends in 9 => unit digit is 3 or 7. Striking out 49 leaves 32. Largest square ≤ 32 is 5² (25). Test 55² = 3025. Since 3249 > 3025, √3249 = 57."
    },
    relatedTopicOrChapter: "Class 8 Chapter 6 Squares and Square Roots"
  },

  // SOF OLYMPIAD MATHS (IMO)
  {
    id: "sof_imo_class1_2_prep",
    youtubeId: "1F-F1f0q8bU",
    title: "SOF IMO Class 1 & 2: Math Olympiad Pattern & Number Sense Mastery",
    category: "sof_olympiad",
    classes: [1, 2],
    duration: "18:30",
    instructor: "Olympiad Champion Trainer Priya",
    channel: "SOF Olympiad Success",
    description: "Complete chapterwise preparation for Class 1 & 2 SOF IMO: Growing shape patterns, animal leg-counting supposition logic, place value comparison, and Achievers Section HOTS tricks.",
    keyTakeaways: [
      "Identify repeating vs. growing patterns in Section 1 (Logical Reasoning)",
      "Use the false position / supposition method for leg-and-head puzzle questions",
      "Read picture graphs with key scale multipliers (e.g. 1 🍎 = 5 apples)",
      "Time management: Solve Section 1 in 15 mins, leave 20 mins for Achievers"
    ],
    timestamps: [
      { time: "00:00", label: "Pattern Recognition & Sequences" },
      { time: "04:30", label: "Number Sense & Place Values" },
      { time: "09:15", label: "Shapes, Solids & Geometric Counting" },
      { time: "14:00", label: "Achievers Section 2-Mark HOTS Problems" }
    ],
    practiceChallenge: {
      question: "In a SOF Olympiad question: There are 5 tricycles and 3 bicycles in a park. What is the total number of wheels?",
      options: ["18", "21", "16", "24"],
      correctIndex: 1,
      explanation: "(5 tricycles × 3 wheels = 15) + (3 bicycles × 2 wheels = 6) = 15 + 6 = 21 wheels."
    },
    relatedTopicOrChapter: "SOF IMO Class 1-2 Computation & Patterns"
  },
  {
    id: "sof_imo_class3_4_reasoning",
    youtubeId: "Vn9Q_rUj8Qo",
    title: "SOF IMO Class 3 & 4: Paper Walkthrough & Achievers Section Shortcuts",
    category: "sof_olympiad",
    classes: [3, 4],
    duration: "21:40",
    instructor: "Master Coach Arvind",
    channel: "Olympiad Masterclass Hub",
    description: "Step-by-step solutions of actual SOF IMO previous year questions for Class 3 and 4: Cyclicity of unit digits, clock strike sums, perimeter unfolding, and coding-decoding puzzles.",
    keyTakeaways: [
      "Unit digit of powers repeats in cycles of 4 (e.g. 7²⁵ mod 4 = 1st cycle digit = 7)",
      "Gauss pairing formula: n(n + 1) / 2 for consecutive strike or page number sums",
      "Fractions shaded region trick: count equal sub-triangles or grid units",
      "Achievers questions carry double marks (2 marks each) – prioritize accuracy!"
    ],
    practiceChallenge: {
      question: "What is the unit digit of 3 × 3 × 3 ... (multiplied 21 times)?",
      options: ["1", "3", "7", "9"],
      correctIndex: 1,
      explanation: "Powers of 3 end in [3, 9, 7, 1] with period 4. 21 ÷ 4 leaves remainder 1. The 1st digit in cycle is 3."
    },
    relatedTopicOrChapter: "SOF IMO Class 3-4 Number Sense & Computation"
  },

  // @studywithJyotiMukhija - CLASS 4 MATHS OLYMPIAD
  {
    id: "sof_imo_c4_jyoti_fractions",
    youtubeId: "HQrdNSK1rxz",
    title: "SOF IMO Class 4: Chapter 3 Fractions & Mixed Numbers (Study with Jyoti Mukhija)",
    category: "sof_olympiad",
    classes: [4],
    duration: "23:15",
    instructor: "Jyoti Mukhija",
    channel: "@studywithJyotiMukhija",
    description: "Master Class 4 SOF Maths Olympiad Fractions with educator Jyoti Mukhija. Covers shaded figures, converting improper to mixed fractions, finding fractions of quantities, and solving Achievers Section HOTS problems.",
    keyTakeaways: [
      "Total equal partitions form the denominator; colored or shaded units form the numerator",
      "Convert mixed numbers: a b/c = (a × c + b) / c for fast fractional operations",
      "Cross-multiplication comparison: a/b > c/d if and only if a × d > b × c",
      "Find remaining unshaded area by subtracting given parts from the unit whole (1)"
    ],
    timestamps: [
      { time: "00:00", label: "Introduction to Class 4 Fractions in SOF IMO" },
      { time: "04:30", label: "Shaded Figures & Visual Region Fractions" },
      { time: "10:15", label: "Improper Fractions & Mixed Numbers Conversion" },
      { time: "16:40", label: "HOTS Achievers Section Fraction Puzzles" }
    ],
    practiceChallenge: {
      question: "If 3/8 of a book has 45 pages, how many total pages are in the book?",
      options: ["100 pages", "120 pages", "135 pages", "150 pages"],
      correctIndex: 1,
      explanation: "3 parts = 45 pages => 1 part = 45 / 3 = 15 pages. Total book = 8 parts = 8 × 15 = 120 pages."
    },
    relatedTopicOrChapter: "Class 4 Chapter 3 Fractions"
  },
  {
    id: "sof_imo_c4_jyoti_geometry",
    youtubeId: "HQrdNSK1rxz",
    title: "SOF IMO Class 4: Chapter 5 Geometry, Symmetry & Perimeter (Study with Jyoti Mukhija)",
    category: "sof_olympiad",
    classes: [4],
    duration: "21:40",
    instructor: "Jyoti Mukhija",
    channel: "@studywithJyotiMukhija",
    description: "Detailed Class 4 Maths Olympiad Geometry guide by Jyoti Mukhija: Finding perimeter of composite figures, lines of symmetry, counting hidden squares and triangles, and circle properties (radius vs. diameter).",
    keyTakeaways: [
      "Perimeter measures the outer boundary only; never add internal dividing segments",
      "Radius is half of diameter (r = d / 2); a circle has infinite lines of symmetry",
      "Tag regions systematically (1-piece, 2-piece, 4-piece) to count all polygons without omissions",
      "Removing a corner square from a rectangle leaves the perimeter unchanged"
    ],
    timestamps: [
      { time: "00:00", label: "Geometry Concepts & Circle Fundamentals" },
      { time: "05:10", label: "Lines of Symmetry in 2D Polygons" },
      { time: "11:20", label: "Counting Shapes: Hidden Squares & Triangles" },
      { time: "16:50", label: "Perimeter of Irregular & Composite Figures" }
    ],
    practiceChallenge: {
      question: "A rectangle of length 12 cm and width 8 cm has a square of side 3 cm cut out from one corner. What is the perimeter of the resulting shape?",
      options: ["34 cm", "40 cm", "37 cm", "46 cm"],
      correctIndex: 1,
      explanation: "Cutting a corner removes 2 sides of 3 cm but introduces 2 identical inner boundary edges of 3 cm. Total perimeter remains unchanged: 2(12 + 8) = 40 cm!"
    },
    relatedTopicOrChapter: "Class 4 Chapter 5 Geometry & Perimeter"
  },

  // @winsomeDigitallearning - CLASS 4 MATHS OLYMPIAD
  {
    id: "sof_imo_c4_winsome_number_sense",
    youtubeId: "grkWGeqW99c",
    title: "SOF IMO Class 4: Chapter 1 Number Sense & 6-Digit Place Values (Winsome Digital Learning)",
    category: "sof_olympiad",
    classes: [4],
    duration: "24:10",
    instructor: "Winsome Digital Learning Team",
    channel: "@winsomeDigitallearning",
    description: "Foundation Course for Class 4 Maths Olympiad by Winsome Digital Learning: 6-digit numbers, Indian vs. International place value periods, expanded form, numbers on an abacus, Roman numerals, and worksheet solving.",
    keyTakeaways: [
      "Place Value = Face Value × Place Weight (e.g. 7 in ten-thousands place = 70,000)",
      "International system groups digits in sets of 3: Ones, Thousands, Millions",
      "Roman numeral rules: I can only precede V and X; X can only precede L and C",
      "Reading abacus rods: count beads starting from rightmost unit place to leftmost"
    ],
    timestamps: [
      { time: "00:00", label: "Number Names & 6-Digit Numbers" },
      { time: "06:15", label: "Place Value vs. Face Value on Abacus" },
      { time: "12:30", label: "Indian & International Period Groupings" },
      { time: "18:45", label: "Roman Numerals & Worksheet 1 Solutions" }
    ],
    practiceChallenge: {
      question: "What is the difference between the place value and face value of digit 7 in the number 5,74,923?",
      options: ["69,993", "70,000", "7", "69,930"],
      correctIndex: 0,
      explanation: "Place value of 7 = 70,000. Face value of 7 = 7. Difference = 70,000 - 7 = 69,993."
    },
    relatedTopicOrChapter: "Class 4 Chapter 1 Number Sense"
  },
  {
    id: "sof_imo_c4_winsome_computation",
    youtubeId: "grkWGeqW99c",
    title: "SOF IMO Class 4: Chapter 2 Computation Operations & Divisibility (Winsome Digital Learning)",
    category: "sof_olympiad",
    classes: [4],
    duration: "27:45",
    instructor: "Winsome Digital Learning Team",
    channel: "@winsomeDigitallearning",
    description: "Complete chapter walkthrough for Class 4 Maths Olympiad Chapter 2 by Winsome Digital Learning: Multi-digit addition/subtraction with regrouping, division algorithm, remainders, and BODMAS precedence.",
    keyTakeaways: [
      "Division Algorithm Theorem: Dividend = (Divisor × Quotient) + Remainder",
      "Divisibility by 4: the number formed by the last two digits must be divisible by 4",
      "Divisibility by 8: the number formed by the last three digits must be divisible by 8",
      "BODMAS priority order: perform Division/Multiplication before Addition/Subtraction"
    ],
    timestamps: [
      { time: "00:00", label: "Addition & Subtraction Regrouping Strategies" },
      { time: "07:20", label: "Multiplication by 2-Digit Numbers" },
      { time: "14:10", label: "Division Algorithm, Quotients & Remainders" },
      { time: "21:30", label: "Olympiad Divisibility Rules & BODMAS Puzzles" }
    ],
    practiceChallenge: {
      question: "When a number is divided by 9, the quotient is 43 and the remainder is 5. What is the number?",
      options: ["387", "392", "382", "395"],
      correctIndex: 1,
      explanation: "Using Dividend = (Divisor × Quotient) + Remainder: (9 × 43) + 5 = 387 + 5 = 392."
    },
    relatedTopicOrChapter: "Class 4 Chapter 2 Computation Operations"
  },
  {
    id: "sof_imo_class5_masterclass",
    youtubeId: "grkWGeqW99c",
    title: "SOF IMO Class 5: Full Mock Paper Solving & Speed Tactics",
    category: "sof_olympiad",
    classes: [5, 6],
    duration: "26:15",
    instructor: "Rohan Sir & Olympiad Panel",
    channel: "Math Olympiad Pro",
    description: "In-depth chapterwise review for Class 5 SOF IMO: Prime number pairing between 20-40, LCM/HCF word problems, fractional area geometry, and speed arithmetic hacks.",
    keyTakeaways: [
      "Pair primes using symmetric complements: (23 + 37) + (29 + 31) = 60 + 60 = 120",
      "Bridges and train speed ratio: Total distance = Train Length + Bridge Length",
      "Unitary method with direct and inverse variation in everyday math",
      "Achievers Section carries 3 marks per question in Class 5-10!"
    ],
    practiceChallenge: {
      question: "A bell rings every 12 minutes, and another rings every 18 minutes. If they ring together at 9:00 AM, when will they ring together next?",
      options: ["9:24 AM", "9:36 AM", "9:48 AM", "10:00 AM"],
      correctIndex: 1,
      explanation: "LCM(12, 18) = 36 minutes. 9:00 AM + 36 minutes = 9:36 AM."
    },
    relatedTopicOrChapter: "SOF IMO Class 5 Factors, Multiples & Time"
  },
  {
    id: "sof_imo_class7_8_advanced",
    youtubeId: "eF6zYNzlZKQ",
    title: "SOF IMO Class 7 & 8: Algebraic Identities & Geometric Proofs",
    category: "sof_olympiad",
    classes: [7, 8],
    duration: "25:30",
    instructor: "Dr. Sandeep Gupta",
    channel: "Advanced Olympiad Mathematics",
    description: "Master high-difficulty SOF IMO problems for Class 7 & 8: Difference of squares symmetric center trick (2024² - 2020×2028), angle chasing in intersecting circles, and modular arithmetic.",
    keyTakeaways: [
      "Center-shift shortcut: (N)² - (N - d)(N + d) = d² in 1 second",
      "Cyclic quadrilaterals: opposite angles sum to 180°",
      "Linear equations with integer constraints (Diophantine equations)",
      "Inclusion-Exclusion counting for multi-condition divisibility"
    ],
    practiceChallenge: {
      question: "Compute (5000 × 5000 - 4995 × 5005) without long multiplication:",
      options: ["25", "50", "10", "100"],
      correctIndex: 0,
      explanation: "Using (N)² - (N - 5)(N + 5) = 5² = 25."
    },
    relatedTopicOrChapter: "SOF IMO Class 7-8 Algebraic Expressions & Number Theory"
  },
  {
    id: "sof_imo_class9_10_championship",
    youtubeId: "i7idZfS8t8w",
    title: "SOF IMO Class 9 & 10: HOTS Achievers Section & Level 2 Strategy",
    category: "sof_olympiad",
    classes: [9, 10],
    duration: "31:10",
    instructor: "Vikas Aggarwal (IMO Gold Medallist)",
    channel: "Olympiad Excellence Network",
    description: "Elite SOF IMO Level 2 and Achievers Section masterclass: Vieta's formulas for polynomials, similarity and Ptolemy's theorem, arithmetic progressions, and coordinate geometry shortcuts.",
    keyTakeaways: [
      "Use Vieta's relations to compute symmetric polynomials α² + β² = (α+β)² - 2αβ",
      "Power of a Point theorem for secant and tangent geometry",
      "AP common difference direct trick: d = (a_p - a_q) / (p - q)",
      "Strategic guessing and back-substitution on 4-option MCQs"
    ],
    practiceChallenge: {
      question: "If roots of x² - 8x + 12 = 0 are α and β, what is α² + β²?",
      options: ["40", "52", "64", "48"],
      correctIndex: 0,
      explanation: "α + β = 8, αβ = 12. α² + β² = (α + β)² - 2αβ = 8² - 2(12) = 64 - 24 = 40."
    },
    relatedTopicOrChapter: "SOF IMO Class 9-10 Quadratic Equations & Polynomials"
  }
];

export const videoCategories: { id: VideoCategory; label: string; icon: string; count: number }[] = [
  { id: 'all' as any, label: 'All Videos', icon: 'Sparkles', count: mathVideosData.length },
  { id: 'sof_olympiad', label: 'SOF IMO Olympiad', icon: 'Trophy', count: mathVideosData.filter(v => v.category === 'sof_olympiad').length },
  { id: 'abacus', label: 'Abacus (Soroban)', icon: 'Grid', count: mathVideosData.filter(v => v.category === 'abacus').length },
  { id: 'vedic_maths', label: 'Vedic Maths Sutras', icon: 'Flame', count: mathVideosData.filter(v => v.category === 'vedic_maths').length },
  { id: 'algebra', label: 'Algebra Visualizer', icon: 'Sliders', count: mathVideosData.filter(v => v.category === 'algebra').length },
  { id: 'cbse_curriculum', label: 'CBSE Masterclasses', icon: 'BookOpen', count: mathVideosData.filter(v => v.category === 'cbse_curriculum').length },
  { id: 'speed_maths', label: 'Speed Hacks & Mental Math', icon: 'Zap', count: mathVideosData.filter(v => v.category === 'speed_maths').length },
];
