import { BoardGradeBook } from '../types/boards';

export const icseBooksData: Record<number, BoardGradeBook> = {
  1: {
    grade: 1,
    board: 'icse',
    boardName: 'ICSE / CISCE',
    bookTitle: 'ICSE Foundation Mathematics Class 1 (Selina / Goyal Brothers)',
    syllabusHighlights: [
      'Pre-number concepts: Inside/Outside, Far/Near, Top/Bottom',
      'Number families 1–99 with tens and units',
      'Ordinal numbers (1st to 10th) and comparison',
      'Basic geometric shapes and flat vs curved surfaces'
    ],
    chapters: [
      {
        id: 'icse_c1_ch1',
        number: 1,
        title: 'Number Concepts & Place Value (1 to 99)',
        description: 'Building strong number bonds, grouping objects into bundles of tens, and writing expanded notation.',
        keyFormulas: [
          '1 Ten = 10 Ones',
          'Two-digit number = (Tens × 10) + Ones',
          'Number Names from One to Ninety-Nine'
        ],
        boardHighlight: 'CISCE emphasizes hands-on structural grouping and number bond diagrams.',
        problems: [
          {
            id: 'icse_c1_p1',
            exercise: 'Selina Ex 1.2 Q3',
            type: 'Textbook Exercise',
            question: 'An abacus spike shows 4 beads on the Tens rod and 7 beads on the Units rod. What is the numeral and its expanded number bond?',
            difficulty: 'Easy',
            hint: 'Count beads on Tens rod (40) and Units rod (7).',
            solution: '1. 4 beads on Tens rod = 4 tens = 40.\n2. 7 beads on Units rod = 7 ones = 7.\n3. Combining them: 40 + 7 = 47 (Forty-Seven).\nExpanded form: 4 Tens + 7 Ones.',
            vedicShortcut: 'Read directly: Tens column is 4, units column is 7 -> 47.',
            boardInsight: 'ICSE Class 1 encourages writing both numeral and word form.'
          },
          {
            id: 'icse_c1_p2',
            exercise: 'Ex 1.4 Q5',
            type: 'Textbook Exercise',
            question: 'Arrange the numbers 38, 83, 49, 94 in ascending order. Which number has the largest value in the tens place?',
            difficulty: 'Medium',
            hint: 'Compare the tens digits first.',
            solution: 'Step 1: Tens digits are 3 (in 38), 8 (in 83), 4 (in 49), 9 (in 94).\nStep 2: Arranging from smallest to largest tens: 38 < 49 < 83 < 94.\nStep 3: The number with largest tens digit is 94 (Tens place = 9).',
            vedicShortcut: 'Sort by leftmost tens digit first: 3, 4, 8, 9.'
          }
        ]
      },
      {
        id: 'icse_c1_ch2',
        number: 2,
        title: 'Basic Shapes & Spatial Relationships',
        description: 'Identification of 2D plane figures (circle, rectangle, square, triangle) and 3D solid figures.',
        keyFormulas: ['Square has 4 equal straight sides', 'Circle has no corners or straight edges'],
        problems: [
          {
            id: 'icse_c1_p3',
            exercise: 'Selina Ex 3.1 Q2',
            type: 'Textbook Exercise',
            question: 'How many corners (vertices) do a triangle, a rectangle, and a circle have in total?',
            difficulty: 'Easy',
            hint: 'Triangle has 3, rectangle has 4, circle has 0.',
            solution: '1. Triangle has 3 corners.\n2. Rectangle has 4 corners.\n3. Circle is a curved closed shape with 0 corners.\nTotal = 3 + 4 + 0 = 7 corners.',
            boardInsight: 'Fundamental CISCE geometry testing corner count.'
          }
        ]
      }
    ]
  },

  2: {
    grade: 2,
    board: 'icse',
    boardName: 'ICSE / CISCE',
    bookTitle: 'ICSE New Guided Mathematics Class 2 (Oxford / Selina)',
    syllabusHighlights: [
      '3-digit numbers up to 999 with Hundreds place',
      'Roman numerals: I, V, X up to XII (Clock arithmetic)',
      'Addition and Subtraction with carrying and borrowing',
      'Indian currency coins and notes combinations'
    ],
    chapters: [
      {
        id: 'icse_c2_ch1',
        number: 1,
        title: '3-Digit Numbers & Roman Numerals',
        description: 'Place values (Hundreds, Tens, Ones), successor & predecessor, and Roman numerals for reading clocks.',
        keyFormulas: [
          'H T O (Hundreds, Tens, Ones)',
          'Roman Numerals: I=1, V=5, X=10',
          'Successor = Number + 1, Predecessor = Number - 1'
        ],
        boardHighlight: 'ICSE introduces Roman Numerals early for analog clock reading.',
        problems: [
          {
            id: 'icse_c2_p1',
            exercise: 'Concise Ex 2.3 Q4',
            type: 'Textbook Exercise',
            question: 'Write the Roman numeral for 9 and 12. If a clock hour hand points to IX and moves 2 hours forward, which Roman numeral does it point to?',
            difficulty: 'Medium',
            hint: '9 is IX (10 - 1). 12 is XII (10 + 2). Add 2 hours to 9.',
            solution: 'Step 1: Roman numeral for 9 = IX (one before ten).\nStep 2: Roman numeral for 12 = XII (ten plus two).\nStep 3: If hour hand is at IX (9 o\'clock) and moves forward 2 hours: 9 + 2 = 11 o\'clock.\nStep 4: 11 in Roman numerals is XI.',
            boardInsight: 'Signature ICSE integration of clock faces and Roman numerals.'
          }
        ]
      }
    ]
  },

  3: {
    grade: 3,
    board: 'icse',
    boardName: 'ICSE / CISCE',
    bookTitle: 'Understanding ICSE Mathematics Class 3 (M.L. Aggarwal)',
    syllabusHighlights: [
      '4-digit numbers up to 9,999 and face value vs place value',
      'Indian and International period systems (Thousands & Millions)',
      'Roman numerals up to L (50)',
      'Multiplication tables up to 15 with word problems'
    ],
    chapters: [
      {
        id: 'icse_c3_ch1',
        number: 1,
        title: '4-Digit Numbers & Comparative Place Values',
        description: 'Reading, writing, and comparing 4-digit numbers. Difference between place value and face value.',
        keyFormulas: [
          'Place Value = Face Value × Value of Place',
          'Face Value of a digit is the digit itself',
          '10 Hundreds = 1 Thousand'
        ],
        problems: [
          {
            id: 'icse_c3_p1',
            exercise: 'ML Aggarwal Ex 1.2 Q6',
            type: 'Textbook Exercise',
            question: 'In the number 7,874, find the difference between the place value of the two 7s.',
            difficulty: 'Medium',
            hint: 'First 7 is in Thousands place, second 7 is in Tens place.',
            solution: '1. First 7 is in Thousands place => Place value = 7 × 1000 = 7000.\n2. Second 7 is in Tens place => Place value = 7 × 10 = 70.\n3. Difference = 7000 - 70 = 6930.',
            vedicShortcut: '7000 - 70: Subtract 1 from 70 (69) and 100-70 = 30 -> 6930.',
            boardInsight: 'Classic ICSE place value difference question.'
          }
        ]
      }
    ]
  },

  4: {
    grade: 4,
    board: 'icse',
    boardName: 'ICSE / CISCE',
    bookTitle: 'ICSE Mathematics Class 4 (Frank Brothers / Selina)',
    syllabusHighlights: [
      'Factors, Multiples & Divisibility rules (2, 3, 5, 9, 10)',
      'Prime and Composite numbers, Prime Factorisation',
      'Unitary Method applied to real-life purchases',
      'Perimeter and Area of rectilinear figures'
    ],
    chapters: [
      {
        id: 'icse_c4_ch1',
        number: 1,
        title: 'Divisibility Rules & Prime Factors',
        description: 'Testing divisibility without actual division and decomposing into prime trees.',
        keyFormulas: [
          'Divisible by 3: Sum of digits is divisible by 3',
          'Divisible by 9: Sum of digits is divisible by 9',
          'Divisible by 5: Last digit is 0 or 5'
        ],
        problems: [
          {
            id: 'icse_c4_p1',
            exercise: 'Frank Ex 4.2 Q8',
            type: 'Textbook Exercise',
            question: 'Test whether 4,518 is divisible by 9 and by 3 using divisibility criteria, without long division.',
            difficulty: 'Easy',
            hint: 'Find sum of digits 4 + 5 + 1 + 8.',
            solution: 'Step 1: Sum of digits = 4 + 5 + 1 + 8 = 18.\nStep 2: Since 18 ÷ 9 = 2 (remainder 0), 4,518 is divisible by 9.\nStep 3: Since any number divisible by 9 is also divisible by 3, 4,518 is divisible by 3.',
            vedicShortcut: 'Digital root: 4+5+1+8 = 18 -> 1+8 = 9. Root 9 means divisible by both 3 and 9!'
          }
        ]
      }
    ]
  },

  5: {
    grade: 5,
    board: 'icse',
    boardName: 'ICSE / CISCE',
    bookTitle: 'Concise Mathematics Class 5 (Selina Publishers)',
    syllabusHighlights: [
      'Operations with Decimals & Fractional representations',
      'HCF and LCM by prime factorisation & common division',
      'Unitary Method with direct variations',
      'Angles: acute, right, obtuse, straight, reflex angles'
    ],
    chapters: [
      {
        id: 'icse_c5_ch1',
        number: 1,
        title: 'Decimals, Fractions & Unitary Method',
        description: 'Multi-step commercial word problems using direct proportion and decimal arithmetic.',
        keyFormulas: [
          'Cost of 1 unit = Total Cost ÷ Total Units',
          'Cost of n units = Cost of 1 unit × n',
          '1 kg = 1000 g, 1 litre = 1000 mL'
        ],
        problems: [
          {
            id: 'icse_c5_p1',
            exercise: 'Selina Ex 7.2 Q5',
            type: 'Textbook Exercise',
            question: 'If 12 metres of uniform cloth cost ₹1,560, what will be the cost of 7.5 metres of the same cloth?',
            difficulty: 'Medium',
            hint: 'Find cost of 1 metre first using Unitary Method.',
            solution: 'Step 1: Cost of 12 m of cloth = ₹1560.\nStep 2: Cost of 1 m of cloth = 1560 ÷ 12 = ₹130.\nStep 3: Cost of 7.5 m of cloth = 130 × 7.5 = ₹975.',
            vedicShortcut: '130 × 7.5 = (130 × 7) + (130 × 0.5) = 910 + 65 = ₹975.'
          }
        ]
      }
    ]
  },

  6: {
    grade: 6,
    board: 'icse',
    boardName: 'ICSE / CISCE',
    bookTitle: 'Essential ICSE Mathematics Class 6 (A. Das Gupta / Bharati Bhawan)',
    syllabusHighlights: [
      'Set Theory: Roster form, Set-Builder notation, Cardinality n(A)',
      'Integers: Directed numbers and operations on number lines',
      'Ratio, Proportion and Unitary Method',
      'Algebra: Fundamental concepts, operations and simple linear equations',
      'Geometry: Angles, Triangles, Ruler and compass constructions'
    ],
    chapters: [
      {
        id: 'icse_c6_ch1',
        number: 1,
        title: 'Introduction to Set Theory',
        description: 'Definition of set, elements (∈, ∉), Roster form, Set-builder form, Empty/Null set, Finite & Infinite sets.',
        keyFormulas: [
          'Roster/Tabular Form: A = {2, 4, 6, 8}',
          'Set-Builder Form: A = {x : x is an even natural number, x ≤ 8}',
          'Cardinal Number n(A) = count of distinct elements in set A',
          'Null/Empty Set: ∅ or {} with n(∅) = 0'
        ],
        boardHighlight: 'Set Theory is an iconic hallmark of the ICSE curriculum introduced from Class 6.',
        problems: [
          {
            id: 'icse_c6_p1',
            exercise: 'Selina Ex 6A Q4',
            type: 'Textbook Exercise',
            question: 'Write the set P = {x : x is a letter in the word "MATHEMATICS"} in roster form and find its cardinal number n(P).',
            difficulty: 'Easy',
            hint: 'Do not repeat letters in the roster set.',
            solution: 'Step 1: The distinct letters in "MATHEMATICS" are M, A, T, H, E, I, C, S.\nStep 2: In roster form: P = {M, A, T, H, E, I, C, S}.\nStep 3: Count the elements: there are 8 distinct letters.\nStep 4: Cardinal number n(P) = 8.',
            boardInsight: 'Repeating elements like M, A, T must not appear more than once in a set.'
          }
        ]
      }
    ]
  },

  7: {
    grade: 7,
    board: 'icse',
    boardName: 'ICSE / CISCE',
    bookTitle: 'Understanding ICSE Mathematics Class 7 (M.L. Aggarwal)',
    syllabusHighlights: [
      'Set Operations: Union (A ∪ B), Intersection (A ∩ B), Disjoint Sets & Venn Diagrams',
      'Commercial Arithmetic: Simple Interest, Profit, Loss & Discount',
      'Algebraic Expressions: Removal of brackets (BODMAS / Vinculum)',
      'Congruence of Triangles: SSS, SAS, ASA, RHS conditions'
    ],
    chapters: [
      {
        id: 'icse_c7_ch1',
        number: 1,
        title: 'Sets & Venn Diagrams',
        description: 'Universal set (U), Complement of a set (A\'), Union and Intersection with visual Venn diagram shading.',
        keyFormulas: [
          'A ∪ B = {x : x ∈ A or x ∈ B}',
          'A ∩ B = {x : x ∈ A and x ∈ B}',
          'If A ∩ B = ∅, sets A and B are Disjoint',
          'A\' = U - A (Complement of set A)'
        ],
        problems: [
          {
            id: 'icse_c7_p1',
            exercise: 'ML Aggarwal Ex 6.2 Q3',
            type: 'Textbook Exercise',
            question: 'If Universal Set U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, A = {2, 4, 6, 8, 10} and B = {4, 5, 6, 7}, find (A ∪ B), (A ∩ B), and (A ∪ B)\'.',
            difficulty: 'Medium',
            hint: 'Combine all elements for Union, take only shared elements for Intersection.',
            solution: '1. A ∪ B = {2, 4, 5, 6, 7, 8, 10}.\n2. A ∩ B = {4, 6}.\n3. (A ∪ B)\' = Elements in U not in (A ∪ B) = {1, 3, 9}.',
            boardInsight: 'Standard CISCE Class 7 set manipulation and complement question.'
          }
        ]
      }
    ]
  },

  8: {
    grade: 8,
    board: 'icse',
    boardName: 'ICSE / CISCE',
    bookTitle: 'Concise Mathematics Middle School Class 8 (Selina)',
    syllabusHighlights: [
      'Compound Interest using Step-by-Step annual interest method & formula A = P(1 + r/100)^n',
      'Factorisation: Grouping terms, Difference of two squares a² - b², Splitting middle term',
      'Linear Equations with fractional coefficients and word problems',
      'Polyhedra & Euler’s Formula: Faces + Vertices - Edges = 2 (F + V - E = 2)'
    ],
    chapters: [
      {
        id: 'icse_c8_ch1',
        number: 1,
        title: 'Compound Interest (Year-by-Year & Formula)',
        description: 'Understanding interest on interest. Computing CI by sequential annual simple interest steps before transitioning to the formula.',
        keyFormulas: [
          'Step method: Year 1 Principal P1 -> SI1 -> P2 = P1 + SI1',
          'Amount Formula: A = P(1 + R/100)^n',
          'Compound Interest CI = A - P'
        ],
        boardHighlight: 'ICSE specifically requires students to show both Year-by-Year table calculations and direct formulas.',
        problems: [
          {
            id: 'icse_c8_p1',
            exercise: 'Selina Ex 2A Q3',
            type: 'Textbook Exercise',
            question: 'Calculate the compound interest on ₹8,000 for 2 years at 10% per annum compounded annually using the year-by-year step method.',
            difficulty: 'Medium',
            hint: 'Find interest for Year 1, add to principal to get Year 2 principal.',
            solution: 'Year 1:\nPrincipal P1 = ₹8,000, Rate = 10%, Time = 1 year.\nInterest I1 = (8000 × 10 × 1) / 100 = ₹800.\nAmount at end of Year 1 = 8000 + 800 = ₹8,800.\n\nYear 2:\nPrincipal P2 = ₹8,800, Rate = 10%, Time = 1 year.\nInterest I2 = (8800 × 10 × 1) / 100 = ₹880.\nAmount at end of Year 2 = 8800 + 880 = ₹9,680.\n\nTotal Compound Interest = I1 + I2 = 800 + 880 = ₹1,680.',
            vedicShortcut: 'Effective CI rate for 2 years at 10% = 10 + 10 + (10×10)/100 = 21%. 21% of 8000 = ₹1,680!'
          }
        ]
      }
    ]
  },

  9: {
    grade: 9,
    board: 'icse',
    boardName: 'ICSE / CISCE',
    bookTitle: 'Concise Mathematics Class 9 (Selina Publishers)',
    syllabusHighlights: [
      'Pure & Mixed Surds and Rationalisation of Binomial Denominators',
      'Expansions of (a ± b ± c)², (a ± b)³, and Conditional Identities',
      'Logarithms: Laws of Logarithms (log mn = log m + log n, log m/n, log m^p)',
      'Simultaneous Linear Equations by Cross-Multiplication',
      'Coordinate Geometry: Distance formula, Midpoint formula and plotting graphs',
      'Statistics: Frequency polygon and Histogram for continuous distributions'
    ],
    chapters: [
      {
        id: 'icse_c9_ch1',
        number: 1,
        title: 'Logarithms (Fundamental Laws & Applications)',
        description: 'Definition of logarithm as inverse of exponent: if a^x = y, then log_a(y) = x. Standard laws and evaluating logarithmic expressions.',
        keyFormulas: [
          'log_a(m × n) = log_a(m) + log_a(n)',
          'log_a(m / n) = log_a(m) - log_a(n)',
          'log_a(m^p) = p · log_a(m)',
          'log_a(1) = 0, log_a(a) = 1, a^(log_a x) = x'
        ],
        boardHighlight: 'Logarithms is taught thoroughly in ICSE Class 9, unlike CBSE which defers it.',
        problems: [
          {
            id: 'icse_c9_p1',
            exercise: 'Selina Ex 9.2 Q4',
            type: 'Textbook Exercise',
            question: 'If log₁₀(2) = 0.3010 and log₁₀(3) = 0.4771, find the value of log₁₀(15) without using log tables.',
            difficulty: 'Medium',
            hint: 'Write 15 as (3 × 10) / 2.',
            solution: 'Step 1: Express 15 in terms of 2, 3, and 10:\n15 = (3 × 10) / 2.\nStep 2: Apply logarithm quotient and product laws:\nlog₁₀(15) = log₁₀(3 × 10 / 2) = log₁₀(3) + log₁₀(10) - log₁₀(2).\nStep 3: Substitute given values:\nlog₁₀(3) = 0.4771\nlog₁₀(10) = 1\nlog₁₀(2) = 0.3010\nStep 4: Compute: 0.4771 + 1 - 0.3010 = 1.4771 - 0.3010 = 1.1761.',
            boardInsight: 'Iconic ICSE Class 9 exam question requiring algebraic reformulation of log arguments.'
          }
        ]
      }
    ]
  },

  10: {
    grade: 10,
    board: 'icse',
    boardName: 'ICSE / CISCE',
    bookTitle: 'Concise Mathematics Class 10 (Selina Publishers) & Understanding ICSE Maths (M.L. Aggarwal)',
    syllabusHighlights: [
      'Commercial Math: Goods & Services Tax (GST) & Banking Recurring Deposit (RD)',
      'Shares & Dividends: Market Value, Face Value, Dividend Yield',
      'Algebra: Linear Inequations on number lines, Quadratic formula, Remainder & Factor Theorems',
      'Matrices: 2x2 order addition, scalar, matrix multiplication & solving for unknowns',
      'Geometry: Similarity of triangles, Loci (Equidistant locus), Tangent-Chord theorems',
      'Statistics: Ogive (Cumulative Frequency Curve) for Median & Quartiles, Step-Deviation Mean'
    ],
    chapters: [
      {
        id: 'icse_c10_ch1',
        number: 1,
        title: 'Goods and Services Tax (GST) & Commercial Mathematics',
        description: 'Intra-state (CGST + SGST) vs Inter-state (IGST) sales, input tax credit (ITC), and final tax liability payable to the government.',
        keyFormulas: [
          'Intra-state: CGST = Rate/2, SGST = Rate/2',
          'Inter-state: IGST = Full GST Rate',
          'Net GST Payable to Govt = Output GST - Input Tax Credit (ITC)',
          'Total Amount Paid by Consumer = Cost Price + GST'
        ],
        boardHighlight: 'Compulsory Section A question in every ICSE Class 10 Mathematics Board Examination.',
        problems: [
          {
            id: 'icse_c10_p1',
            exercise: 'ICSE 2024 Board Exam & Selina Ex 1.1 Q7',
            type: 'Board Examination',
            question: 'A dealer in Mumbai buys an article from a manufacturer in Mumbai at a marked price of ₹12,000 at a 20% discount. The dealer sells it to a consumer in Mumbai at the marked price. If GST rate is 18%, calculate: (i) Price paid by dealer including tax, (ii) Net CGST and SGST paid by dealer to the government.',
            difficulty: 'Medium',
            hint: 'Intra-state sale: divide 18% into 9% CGST and 9% SGST.',
            solution: 'Step 1: Dealer purchase price:\nDiscount = 20% of 12,000 = ₹2,400.\nDiscounted CP for dealer = 12,000 - 2,400 = ₹9,600.\nCGST paid by dealer (Input CGST) = 9% of 9,600 = ₹864.\nSGST paid by dealer (Input SGST) = 9% of 9,600 = ₹864.\nTotal Input Tax = ₹1,728.\nPrice paid by dealer = 9,600 + 1,728 = ₹11,328.\n\nStep 2: Dealer sells to consumer at ₹12,000:\nOutput CGST collected = 9% of 12,000 = ₹1,080.\nOutput SGST collected = 9% of 12,000 = ₹1,080.\n\nStep 3: Net Tax Paid by Dealer to Govt:\nNet CGST = Output CGST - Input CGST = 1080 - 864 = ₹216.\nNet SGST = Output SGST - Input SGST = 1080 - 864 = ₹216.\n(Total Net GST to Govt = ₹432).',
            vedicShortcut: 'Net tax is simply 18% of Dealer Profit margin! Profit = 12000 - 9600 = ₹2400. 18% of 2400 = ₹432 (CGST ₹216, SGST ₹216). Solved in 5 seconds!',
            boardInsight: 'Profit margin shortcut provides immediate verification on the ICSE exam sheet.'
          }
        ]
      },
      {
        id: 'icse_c10_ch2',
        number: 2,
        title: 'Banking: Recurring Deposit Accounts',
        description: 'Calculation of maturity value for monthly Recurring Deposit (RD) accounts using total qualifying sum of months.',
        keyFormulas: [
          'Total Qualifying Months N = n(n + 1) / 2',
          'Interest I = (P × n(n + 1) × r) / (2 × 12 × 100)',
          'Maturity Value MV = (P × n) + I'
        ],
        boardHighlight: 'Guaranteed 3-mark or 4-mark question in ICSE Section A.',
        problems: [
          {
            id: 'icse_c10_p2',
            exercise: 'ICSE 2023 Board & ML Aggarwal Ex 2.1 Q5',
            type: 'Board Examination',
            question: 'Mr. Richard deposits ₹800 per month in a recurring deposit account for 1½ years. If the rate of interest is 10% per annum, find the interest earned and the maturity value received by him.',
            difficulty: 'Medium',
            hint: 'Convert 1½ years into months: n = 1.5 × 12 = 18 months.',
            solution: 'Given: Monthly deposit P = ₹800, Time n = 18 months, Rate r = 10%.\n\nStep 1: Calculate Interest I:\nI = [P × n(n + 1) × r] / [2 × 12 × 100]\nI = [800 × 18 × 19 × 10] / [2400]\nNotice 800 / 2400 = 1/3.\nI = [18 × 19 × 10] / 3 = 6 × 19 × 10 = 114 × 10 = ₹1,140.\n\nStep 2: Total Sum Deposited = P × n = 800 × 18 = ₹14,400.\n\nStep 3: Maturity Value MV = (P × n) + I = 14,400 + 1,140 = ₹15,540.',
            vedicShortcut: 'Cancel 800 with 2400 to get 3 in denominator. 18 / 3 = 6. Then 6 × 19 = 114 -> ₹1,140 in seconds.'
          }
        ]
      },
      {
        id: 'icse_c10_ch3',
        number: 3,
        title: 'Matrices (2×2 Order Operations & Unknowns)',
        description: 'Matrix order, identity matrix I, addition, scalar multiplication, and non-commutative matrix product AB ≠ BA.',
        keyFormulas: [
          'Identity matrix I = [1 0; 0 1]',
          'Matrix multiplication condition: Columns of 1st = Rows of 2nd',
          'A² = A × A (never square individual elements!)'
        ],
        boardHighlight: 'Essential ICSE algebra topic not present in CBSE Class 10.',
        problems: [
          {
            id: 'icse_c10_p3',
            exercise: 'ICSE 2024 Board & Selina Ex 8.3 Q9',
            type: 'Board Examination',
            question: 'Given matrix A = [2 0; -1 7] and I = [1 0; 0 1], find matrix A² - 5A + 7I.',
            difficulty: 'Medium',
            hint: 'Compute A² as A × A using row-by-column multiplication.',
            solution: 'Step 1: Compute A² = [2 0; -1 7] × [2 0; -1 7]:\nRow 1: [2(2) + 0(-1), 2(0) + 0(7)] = [4, 0]\nRow 2: [-1(2) + 7(-1), -1(0) + 7(7)] = [-2 - 7, 0 + 49] = [-9, 49]\nSo A² = [4 0; -9 49].\n\nStep 2: Compute 5A = 5 × [2 0; -1 7] = [10 0; -5 35].\n\nStep 3: Compute 7I = 7 × [1 0; 0 1] = [7 0; 0 7].\n\nStep 4: Combine A² - 5A + 7I:\n[4 - 10 + 7, 0 - 0 + 0; -9 - (-5) + 0, 49 - 35 + 7]\n= [1, 0; -4, 21].',
            boardInsight: 'Frequent trap: writing A² as [4 0; 1 49] by squaring elements is strictly penalized.'
          }
        ]
      }
    ]
  },

  11: {
    grade: 11,
    board: 'icse',
    boardName: 'ISC / CISCE',
    bookTitle: 'ISC Mathematics Class 11 (O.P. Malhotra, S.K. Gupta - S. Chand)',
    syllabusHighlights: [
      'Complex Numbers: Polar form and triangle inequality',
      'Sequences & Series: Arithmetic-Geometric Progressions (AGP)',
      'Conic Sections: Parabola, Ellipse, Hyperbola equations & eccentricity',
      'Limits and First-Principles Derivatives'
    ],
    chapters: [
      {
        id: 'icse_c11_ch1',
        number: 1,
        title: 'Sequences & Series (AP, GP, & AGP)',
        description: 'Sum of n terms, sum of infinite GP (|r| < 1), and sum of Arithmetic-Geometric Series.',
        keyFormulas: [
          'Infinite GP Sum: S_∞ = a / (1 - r) for |r| < 1',
          'Sum of AP: S_n = n/2 [2a + (n-1)d]',
          'AGP: Multiply whole series by common ratio r and subtract'
        ],
        problems: [
          {
            id: 'icse_c11_p1',
            exercise: 'S. Chand Ex 11.4 Q6',
            type: 'Textbook Exercise',
            question: 'Find the sum to infinity of the series: 1 + 2/3 + 3/3² + 4/3³ + ... to infinity.',
            difficulty: 'Challenging',
            hint: 'This is an Arithmetico-Geometric Progression with a=1, d=1, r=1/3.',
            solution: 'Let S = 1 + 2/3 + 3/9 + 4/27 + ... (Equation 1)\nMultiply by r = 1/3:\n(1/3)S = 1/3 + 2/9 + 3/27 + ... (Equation 2)\n\nSubtract (2) from (1):\nS - (1/3)S = 1 + [2/3 - 1/3] + [3/9 - 2/9] + [4/27 - 3/27] + ...\n(2/3)S = 1 + 1/3 + 1/9 + 1/27 + ...\n\nThe right side is an infinite GP with a = 1, r = 1/3:\nSum of GP = 1 / (1 - 1/3) = 1 / (2/3) = 3/2.\n\nNow (2/3)S = 3/2 => S = (3/2) × (3/2) = 9/4 = 2.25.',
            boardInsight: 'Signature ISC Class 11 series derivation.'
          }
        ]
      }
    ]
  },

  12: {
    grade: 12,
    board: 'icse',
    boardName: 'ISC / CISCE',
    bookTitle: 'ISC Mathematics Class 12 (S. Chand / M.L. Aggarwal)',
    syllabusHighlights: [
      'Matrices & Determinants: Inverse by Adjoint & solving system using Matrix Inversion Method',
      'Calculus: Definite Integrals as limit of sum & Properties of Definite Integrals',
      'Differential Equations: Linear Differential Equation dy/dx + Py = Q with Integrating Factor IF = e^(∫P dx)',
      'Probability: Bayes’ Theorem and Probability Distributions'
    ],
    chapters: [
      {
        id: 'icse_c12_ch1',
        number: 1,
        title: 'Differential Equations & Integrating Factor',
        description: 'First order linear differential equations, finding integrating factor, and general solutions.',
        keyFormulas: [
          'Linear Form: dy/dx + P(x)·y = Q(x)',
          'Integrating Factor IF = e^(∫ P dx)',
          'General Solution: y × (IF) = ∫ [Q × (IF)] dx + C'
        ],
        problems: [
          {
            id: 'icse_c12_p1',
            exercise: 'ISC 2024 Board Exam & ML Aggarwal Ex 18.3 Q8',
            type: 'Board Examination',
            question: 'Solve the differential equation: dy/dx + (2/x)y = x³ given that y = 1 when x = 1.',
            difficulty: 'Challenging',
            hint: 'Identify P(x) = 2/x, Q(x) = x³.',
            solution: 'Step 1: Linear differential equation with P = 2/x, Q = x³.\nStep 2: Integrating Factor IF = e^(∫ 2/x dx) = e^(2 ln x) = e^(ln x²) = x².\nStep 3: General solution:\ny · (x²) = ∫ (x³ · x²) dx = ∫ x⁵ dx = x⁶/6 + C.\nSo y x² = x⁶/6 + C => y = x⁴/6 + C/x².\n\nStep 4: Using boundary condition y=1 when x=1:\n1 · 1² = 1⁶/6 + C => 1 = 1/6 + C => C = 5/6.\n\nStep 5: Particular solution:\ny x² = x⁶/6 + 5/6 => 6x²y = x⁶ + 5.',
            boardInsight: 'Standard 6-mark question in ISC Mathematics Paper 1.'
          }
        ]
      }
    ]
  }
};
