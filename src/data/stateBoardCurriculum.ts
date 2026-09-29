import { BoardGradeBook } from '../types/boards';

export const stateBoardBooksData: Record<number, BoardGradeBook> = {
  1: {
    grade: 1,
    board: 'state_board',
    boardName: 'State Board / SCERT',
    bookTitle: 'State Board Mathematics Class 1 (Balbharati / SCERT)',
    syllabusHighlights: [
      'Concrete object counting: seeds, beads, and tamarind stones',
      'Numbers 1 to 50 in digits and regional number words',
      'Local currency coins: ₹1, ₹2, ₹5, ₹10 identification',
      'Comparing sizes: Big / Small (Motha / Chhota), Heavy / Light'
    ],
    chapters: [
      {
        id: 'state_c1_ch1',
        number: 1,
        title: 'Counting & Place Grouping (Tens & Units Bundles)',
        description: 'Counting practical local objects in bundles of 10 (Katta / Gathadi) and loose units.',
        keyFormulas: [
          '1 Bundle (Dashaak) = 10 sticks or beads',
          'Loose units (Ekak) = count 1 to 9'
        ],
        boardHighlight: 'State Board pedagogy utilizes tactile bundling to firmly establish decimal place value.',
        problems: [
          {
            id: 'state_c1_p1',
            exercise: 'State Textbook Ex 1.2 Q1',
            type: 'Textbook Exercise',
            question: 'Radha has 3 bundles of 10 matchsticks each and 5 loose matchsticks. How many total matchsticks does she have?',
            difficulty: 'Easy',
            hint: 'Count 3 tens (10, 20, 30) and add 5.',
            solution: '1. 3 bundles of 10 sticks = 3 Tens = 30 sticks.\n2. 5 loose sticks = 5 Units = 5 sticks.\n3. Total matchsticks = 30 + 5 = 35 (Thirty-Five sticks).',
            vedicShortcut: '3 in tens place and 5 in units place -> 35 directly.'
          }
        ]
      }
    ]
  },

  2: {
    grade: 2,
    board: 'state_board',
    boardName: 'State Board / SCERT',
    bookTitle: 'State Board Mathematics Class 2 (SCERT / Textbook Bureau)',
    syllabusHighlights: [
      'Numbers up to 100 with expanded notation',
      'Indian calendar months (Chaitra, Vaishakh, etc.) alongside Gregorian months',
      'Measurement of length using Handspans (Vith) and Paces (Pagal)',
      'Addition and subtraction word problems of local bazaar transactions'
    ],
    chapters: [
      {
        id: 'state_c2_ch1',
        number: 1,
        title: 'Local Bazaar Transactions & Measurement',
        description: 'Using coins and notes to buy fruits and vegetables in local weekly markets (Haat / Mandi).',
        keyFormulas: [
          '₹1 = 100 Paise',
          'Two ₹5 coins = One ₹10 note',
          'Five ₹10 notes = One ₹50 note'
        ],
        problems: [
          {
            id: 'state_c2_p1',
            exercise: 'Balbharati Ex 2.4 Q3',
            type: 'Practical / Field Math',
            question: 'Suresh buys 1 kg of fresh jaggery (Gud) for ₹45 at the village market. He gives a ₹50 note to the shopkeeper. Which coin will he receive as change?',
            difficulty: 'Easy',
            hint: 'Subtract 45 from 50.',
            solution: '1. Amount given to shopkeeper = ₹50.\n2. Price of jaggery = ₹45.\n3. Change received = 50 - 45 = ₹5.\nHe will receive one ₹5 coin in return.',
            boardInsight: 'Emphasizes practical commercial literacy for rural and urban learners.'
          }
        ]
      }
    ]
  },

  3: {
    grade: 3,
    board: 'state_board',
    boardName: 'State Board / SCERT',
    bookTitle: 'State Board Mathematics Class 3 (SCERT)',
    syllabusHighlights: [
      '4-digit numbers up to 9,999 and place value expansion',
      'Multiplication tables from 2 to 15 with skip-counting rhythms',
      'Time reading on 12-hour clocks and calendar problems',
      'Perimeter of agricultural fields and rectangular classrooms'
    ],
    chapters: [
      {
        id: 'state_c3_ch1',
        number: 1,
        title: 'Multiplication Tables & Word Problems',
        description: 'Mastering multiplication as repeated addition applied to planting crops in equal rows.',
        keyFormulas: [
          'Total Plants = Number of Rows × Plants per Row',
          'Commutative property: a × b = b × a'
        ],
        problems: [
          {
            id: 'state_c3_p1',
            exercise: 'State Textbook Ex 3.2 Q5',
            type: 'Textbook Exercise',
            question: 'A farmer plants mango saplings in an orchard. He creates 12 rows with 8 saplings in each row. How many mango saplings did he plant in total?',
            difficulty: 'Easy',
            hint: 'Multiply 12 by 8.',
            solution: 'Number of rows = 12.\nSaplings per row = 8.\nTotal saplings planted = 12 × 8 = 96 saplings.',
            vedicShortcut: '12 × 8 = (10 × 8) + (2 × 8) = 80 + 16 = 96.'
          }
        ]
      }
    ]
  },

  4: {
    grade: 4,
    board: 'state_board',
    boardName: 'State Board / SCERT',
    bookTitle: 'State Board Mathematics Class 4 (SCERT / Balbharati)',
    syllabusHighlights: [
      '5-digit numbers up to 99,999 and regional numbering styles',
      'Division with quotients and remainders in agricultural distribution',
      'Units of measurement: Litre (L) & Millilitre (mL), Kilogram (kg) & Gram (g)',
      'Pictographs and tally charts of village demographics'
    ],
    chapters: [
      {
        id: 'state_c4_ch1',
        number: 1,
        title: 'Measurement of Weight & Capacity in Trade',
        description: 'Conversions between kilograms, grams, litres and millilitres for agricultural yield weighing.',
        keyFormulas: [
          '1 Kilogram (kg) = 1,000 Grams (g)',
          '1 Litre (L) = 1,000 Millilitres (mL)',
          'Half kg (Ardha Kilo) = 500 g, Quarter kg (Pav Kilo) = 250 g'
        ],
        problems: [
          {
            id: 'state_c4_p1',
            exercise: 'Balbharati Ex 6.1 Q4',
            type: 'Textbook Exercise',
            question: 'A dairy cooperative collects 8 litres 750 mL of milk in the morning and 6 litres 500 mL in the evening. What is the total volume of milk collected in the day?',
            difficulty: 'Medium',
            hint: 'Add millilitres first. If over 1,000 mL, carry 1 litre over.',
            solution: 'Step 1: Morning = 8 L 750 mL\nStep 2: Evening = 6 L 500 mL\nStep 3: Add mL: 750 + 500 = 1,250 mL = 1 L 250 mL.\nStep 4: Add Litres: 8 + 6 + 1 (carry) = 15 Litres.\nTotal collection = 15 Litres 250 mL (15.250 L).',
            boardInsight: 'Regional state boards focus heavily on local cooperative dairy and grain trade arithmetic.'
          }
        ]
      }
    ]
  },

  5: {
    grade: 5,
    board: 'state_board',
    boardName: 'State Board / SCERT',
    bookTitle: 'State Board Mathematics & Primary Scholarship Prep Class 5',
    syllabusHighlights: [
      'State Primary Scholarship Examination (Class 5 Shishyavritti / Navodaya pattern)',
      'Fractions: Like, Unlike, Proper, Improper, and Mixed fractions',
      'Angles: Right angle, Acute, Obtuse, and Parallel & Perpendicular lines',
      'Area of Rectangle and Square with field plots'
    ],
    chapters: [
      {
        id: 'state_c5_ch1',
        number: 1,
        title: 'State Scholarship Problem Solving (HOTS & Speed Tests)',
        description: 'Tricky questions designed for State Scholarship examinations, testing logical pattern decoding and speed calculation.',
        keyFormulas: [
          'Perimeter of Rectangle = 2(Length + Breadth)',
          'Area of Rectangle = Length × Breadth',
          'Speed = Distance ÷ Time'
        ],
        boardHighlight: 'Every State Board emphasizes competitive Scholarship tests at Class 5 level.',
        problems: [
          {
            id: 'state_c5_p1',
            exercise: 'State Scholarship Exam 2024 Model Q12',
            type: 'Scholarship / Competitive',
            question: 'The perimeter of a rectangular farm plot is 120 metres. If its length is 40 metres, find its breadth and its total area in square metres.',
            difficulty: 'Medium',
            hint: 'Perimeter = 2(L + B) = 120 => L + B = 60.',
            solution: 'Step 1: Semi-perimeter = Perimeter ÷ 2 = 120 ÷ 2 = 60 metres.\nStep 2: Length (L) = 40 m.\nBreadth (B) = Semi-perimeter - L = 60 - 40 = 20 metres.\nStep 3: Area = Length × Breadth = 40 × 20 = 800 sq metres.',
            vedicShortcut: 'Semi-perimeter is 60. 60 - 40 = 20. 40 × 20 = 800 sq m in 3 seconds!',
            boardInsight: 'Common State Scholarship exam question testing semi-perimeter inversion.'
          }
        ]
      }
    ]
  },

  6: {
    grade: 6,
    board: 'state_board',
    boardName: 'State Board / SCERT',
    bookTitle: 'State Board Mathematics Class 6 (SCERT)',
    syllabusHighlights: [
      'Basic Concepts in Geometry: Points, Lines, Planes, Angles, and Parallel lines',
      'Integers: Directed numbers and addition/subtraction rules',
      'HCF and LCM by Factorisation and Division method',
      'Bar Graphs of regional crop yield and monsoon rainfall'
    ],
    chapters: [
      {
        id: 'state_c6_ch1',
        number: 1,
        title: 'HCF & LCM (Highest Common Factor & Least Common Multiple)',
        description: 'Prime factorisation, vertical division ladders, and solving practical distribution problems.',
        keyFormulas: [
          'Product of two numbers = HCF × LCM',
          'HCF divides both numbers completely',
          'LCM is the smallest multiple divisible by both'
        ],
        problems: [
          {
            id: 'state_c6_p1',
            exercise: 'State Textbook Ex 5.2 Q3',
            type: 'Textbook Exercise',
            question: 'Two ropes measuring 48 metres and 60 metres are to be cut into pieces of equal maximum length. What will be the maximum length of each piece, and how many total pieces will be obtained?',
            difficulty: 'Medium',
            hint: 'Find the HCF of 48 and 60.',
            solution: 'Step 1: Find HCF of 48 and 60:\nPrime factors of 48 = 2 × 2 × 2 × 2 × 3 = 2⁴ × 3.\nPrime factors of 60 = 2 × 2 × 3 × 5 = 2² × 3 × 5.\nCommon factors = 2² × 3 = 4 × 3 = 12.\nSo maximum length of each piece = 12 metres (HCF).\n\nStep 2: Number of pieces:\nFrom 48 m rope: 48 ÷ 12 = 4 pieces.\nFrom 60 m rope: 60 ÷ 12 = 5 pieces.\nTotal pieces = 4 + 5 = 9 pieces.',
            vedicShortcut: 'Difference between 60 and 48 is 12. 12 divides both 48 and 60. HCF is immediately 12!'
          }
        ]
      }
    ]
  },

  7: {
    grade: 7,
    board: 'state_board',
    boardName: 'State Board / SCERT',
    bookTitle: 'State Board Mathematics Class 7 (SCERT / Textbook Bureau)',
    syllabusHighlights: [
      'Direct and Inverse Proportion (Variation in speed, time and labor)',
      'Joint Bar Graphs and Statistical comparisons',
      'Bank Interest: Simple Interest on agricultural loans and saving accounts',
      'Pythagorean Triplet verification and right-angled triangles'
    ],
    chapters: [
      {
        id: 'state_c7_ch1',
        number: 1,
        title: 'Direct & Inverse Variation in Real-World Tasks',
        description: 'Solving proportional relationships where variables increase together (direct) or inversely (e.g. laborers vs days).',
        keyFormulas: [
          'Direct Variation: x / y = constant k (x₁/y₁ = x₂/y₂)',
          'Inverse Variation: x × y = constant k (x₁ × y₁ = x₂ × y₂)'
        ],
        problems: [
          {
            id: 'state_c7_p1',
            exercise: 'Balbharati Ex 9.1 Q4',
            type: 'Textbook Exercise',
            question: '15 workers take 8 days to harvest a field of sugarcane. If only 10 workers are available, how many days will they take to harvest the same field?',
            difficulty: 'Medium',
            hint: 'Fewer workers take more days => Inverse Variation: Workers × Days = Constant.',
            solution: 'Step 1: Identify variation type:\nAs the number of workers decreases, the time taken increases proportionally.\nThis is an Inverse Variation.\n\nStep 2: Formula: W₁ × D₁ = W₂ × D₂\n15 × 8 = 10 × D₂\n120 = 10 × D₂\nD₂ = 120 / 10 = 12 days.\nTherefore, 10 workers will take 12 days to harvest the field.',
            vedicShortcut: 'Total work = 15 × 8 = 120 man-days. Days for 10 workers = 120 / 10 = 12 days.'
          }
        ]
      }
    ]
  },

  8: {
    grade: 8,
    board: 'state_board',
    boardName: 'State Board / SCERT',
    bookTitle: 'State Board Mathematics & NMMS Scholarship Class 8',
    syllabusHighlights: [
      'NMMS (National Means-cum-Merit Scholarship) exam syllabus',
      'Parallel Lines & Transversals: Alternate, Corresponding & Interior angles',
      'Factorisation of Polynomials and algebraic fractions',
      'Discount & Commission (Adat / Commission Agent, Rebate)',
      'Surface Area and Volume of Cylinder and Cuboid'
    ],
    chapters: [
      {
        id: 'state_c8_ch1',
        number: 1,
        title: 'Discount & Commission (Agricultural Marketing Arithmetic)',
        description: 'Calculating marked price, cash discount, agent commission (Adat), and net realization for farmers.',
        keyFormulas: [
          'Discount = Marked Price - Selling Price',
          'Discount % = (Discount / Marked Price) × 100',
          'Commission Amount = (Commission % / 100) × Total Sales Value'
        ],
        boardHighlight: 'State boards place high curricular emphasis on agricultural commission and APMC market math.',
        problems: [
          {
            id: 'state_c8_p1',
            exercise: 'State Textbook Ex 9.2 Q3',
            type: 'Practical / Field Math',
            question: 'A farmer sold grain through a commission agent (Adatya) for ₹1,20,000 in the APMC market. If the agent charges a commission of 2.5%, find the commission earned by the agent and the net amount received by the farmer.',
            difficulty: 'Medium',
            hint: 'Calculate 2.5% of 1,20,000 and subtract.',
            solution: 'Step 1: Total sales value = ₹1,20,000.\nCommission rate = 2.5%.\n\nStep 2: Commission = (2.5 / 100) × 1,20,000\n= 2.5 × 1,200 = ₹3,000.\n\nStep 3: Net amount received by farmer:\n= Total Sales - Commission\n= 1,20,000 - 3,000 = ₹1,17,000.\nAgent earns ₹3,000 and the farmer receives ₹1,17,000.',
            vedicShortcut: '1% of 1,20,000 is 1,200. 2% is 2,400. 0.5% is 600. Commission = 2,400 + 600 = ₹3,000!'
          }
        ]
      }
    ]
  },

  9: {
    grade: 9,
    board: 'state_board',
    boardName: 'State Board / SCERT',
    bookTitle: 'State Board Mathematics Part 1 (Algebra) & Part 2 (Geometry) Class 9',
    syllabusHighlights: [
      'Real Numbers, Surds, and Operations on Surds',
      'Polynomials: Synthetic Division Method & Remainder Theorem',
      'Linear Equations in Two Variables: Elimination & Substitution',
      'Circles: Incircle and Circumcircle constructions',
      'Coordinate Geometry: Quadrants, Signs and plotting'
    ],
    chapters: [
      {
        id: 'state_c9_ch1',
        number: 1,
        title: 'Polynomials & Synthetic Division Method',
        description: 'Dividing higher-degree polynomials by linear divisors (x - a) using the compact Synthetic Division coefficients format.',
        keyFormulas: [
          'Dividend = Divisor × Quotient + Remainder',
          'Synthetic Division: Use root x = a and coefficients row',
          'Degree of Quotient = Degree of Dividend - 1'
        ],
        boardHighlight: 'Synthetic Division is a signature topic taught in State Board Class 9.',
        problems: [
          {
            id: 'state_c9_p1',
            exercise: 'State Board Part 1 Ex 3.3 Q2',
            type: 'Textbook Exercise',
            question: 'Divide the polynomial (2x⁴ + 3x³ + 4x - 2x²) by (x + 2) using the Synthetic Division method. State the quotient and the remainder.',
            difficulty: 'Challenging',
            hint: 'Write in standard index form first: 2x⁴ + 3x³ - 2x² + 4x + 0. Divisor x + 2 => use -2.',
            solution: 'Step 1: Write dividend in standard form with descending powers and zero coefficients:\n2x⁴ + 3x³ - 2x² + 4x + 0.\nCoefficient form: (2, 3, -2, 4, 0).\n\nStep 2: Divisor is x + 2 => root is -2.\n\nStep 3: Synthetic Division row steps:\nDivisor: -2 |  2    3    -2     4     0\n            |      -4     2     0    -8\n            ---------------------------\n               2   -1     0     4 |  -8 (Remainder)\n\nStep 4: Quotient in coefficient form = (2, -1, 0, 4).\nQuotient polynomial = 2x³ - x² + 4.\nRemainder = -8.',
            boardInsight: 'Students often forget the constant term 0 when converting to coefficient form.'
          }
        ]
      }
    ]
  },

  10: {
    grade: 10,
    board: 'state_board',
    boardName: 'State Board / SCERT',
    bookTitle: 'State Board SSC Mathematics Part 1 (Algebra) & Part 2 (Geometry) Class 10',
    syllabusHighlights: [
      'Linear Equations: Cramer’s Rule Determinant Method |a b; c d| = ad - bc',
      'Quadratic Equations: Factorisation, Completing the Square & Sridharacharya Formula',
      'Arithmetic Progression: Finding t_n, S_n, and applications in recurring savings',
      'Financial Planning: GST on Services, Tax Invoice, Shares and Mutual Funds (NAV)',
      'Probability: Sample space S, events, and tree diagrams',
      'Geometry: Similarity of triangles, Theorem of Geometric Mean, Circle tangent segments'
    ],
    chapters: [
      {
        id: 'state_c10_ch1',
        number: 1,
        title: 'Linear Equations in Two Variables & Cramer’s Determinant Rule',
        description: 'Solving simultaneous equations ax + by = c using determinants D, Dx, Dy and Cramer’s Rule.',
        keyFormulas: [
          'Determinant D = |a₁ b₁; a₂ b₂| = a₁b₂ - a₂b₁',
          'Determinant Dx = |c₁ b₁; c₂ b₂| = c₁b₂ - c₂b₁',
          'Determinant Dy = |a₁ c₁; a₂ c₂| = a₁c₂ - a₂c₁',
          'Cramer\'s Rule: x = Dx / D, y = Dy / D (provided D ≠ 0)'
        ],
        boardHighlight: 'Compulsory question in SSC State Board examinations across India.',
        problems: [
          {
            id: 'state_c10_p1',
            exercise: 'SSC Board Exam 2024 & Balbharati Ex 1.3 Q3(ii)',
            type: 'Board Examination',
            question: 'Solve the simultaneous equations using Cramer’s Rule: 4x + 3y - 4 = 0 and 6x = 8 - 5y.',
            difficulty: 'Medium',
            hint: 'Rearrange into standard form ax + by = c first: 4x + 3y = 4 and 6x + 5y = 8.',
            solution: 'Step 1: Write equations in standard form ax + by = c:\n4x + 3y = 4  (Equation 1)\n6x + 5y = 8  (Equation 2)\n\nStep 2: Calculate Determinant D:\nD = |4  3|\n    |6  5|\n= (4 × 5) - (3 × 6) = 20 - 18 = 2.\nSince D ≠ 0, a unique solution exists.\n\nStep 3: Calculate Determinant Dx (replace x-column with constants 4, 8):\nDx = |4  3|\n     |8  5|\n= (4 × 5) - (3 × 8) = 20 - 24 = -4.\n\nStep 4: Calculate Determinant Dy (replace y-column with constants 4, 8):\nDy = |4  4|\n     |6  8|\n= (4 × 8) - (4 × 6) = 32 - 24 = 8.\n\nStep 5: Apply Cramer\'s Rule:\nx = Dx / D = -4 / 2 = -2.\ny = Dy / D = 8 / 2 = 4.\n\nSolution is (x, y) = (-2, 4).',
            vedicShortcut: 'Check D: 20-18=2. Dx: 20-24=-4 => x=-2. Dy: 32-24=8 => y=4. Done in 15 seconds!',
            boardInsight: 'Cramer’s rule requires precise arrangement into ax + by = c before computing minors.'
          }
        ]
      },
      {
        id: 'state_c10_ch2',
        number: 2,
        title: 'Financial Planning: GST, Shares & Mutual Funds',
        description: 'Preparation of GST Tax Invoices for services, calculating Brokerage with GST, and Net Asset Value (NAV) of Mutual Funds.',
        keyFormulas: [
          'Total GST = CGST + SGST (CGST = SGST = GST Rate / 2)',
          'Brokerage = (Brokerage Rate / 100) × Market Value of Shares',
          'Total Cost of 1 Share = Market Value + Brokerage + GST on Brokerage'
        ],
        boardHighlight: 'Unique practical finance module included in SSC State Board syllabus.',
        problems: [
          {
            id: 'state_c10_p2',
            exercise: 'SSC Board Exam 2023 & Balbharati Ex 4.2 Q2',
            type: 'Board Examination',
            question: 'Amol purchased 50 shares of face value ₹100 for market value ₹120 each. The company declared a dividend of 15%. Calculate: (i) Total investment made by Amol, (ii) Total dividend received by him, (iii) Rate of return on his investment.',
            difficulty: 'Medium',
            hint: 'Dividend is ALWAYS calculated on Face Value, never on Market Value!',
            solution: 'Step 1: Total Investment:\nNumber of shares = 50, Market Value (MV) = ₹120.\nInvestment = 50 × 120 = ₹6,000.\n\nStep 2: Total Dividend:\nFace Value (FV) = ₹100, Dividend % = 15%.\nDividend on 1 share = 15% of ₹100 = ₹15.\nTotal Dividend for 50 shares = 50 × 15 = ₹750.\n\nStep 3: Rate of Return:\nRate of Return = (Total Dividend / Total Investment) × 100\n= (750 / 6000) × 100\n= 75 / 6 = 12.5%.\nAmol\'s rate of return is 12.5%.',
            vedicShortcut: 'Rate of return = (15 / 120) × 100 = (1 / 8) × 100 = 12.5% in 2 seconds flat!'
          }
        ]
      }
    ]
  },

  11: {
    grade: 11,
    board: 'state_board',
    boardName: 'State Board / SCERT',
    bookTitle: 'State Board Mathematics & Statistics Part 1 & 2 Class 11',
    syllabusHighlights: [
      'Angle and Its Measurement (Radian to Degree conversions: 1 rad = 180°/π)',
      'Trigonometry I & II: Compound angles, Factorisation and Defactorisation formulas',
      'Determinants and Matrices: Cramer’s rule for 3×3 systems',
      'Limits and Continuity of algebraic, trigonometric and exponential functions'
    ],
    chapters: [
      {
        id: 'state_c11_ch1',
        number: 1,
        title: 'Trigonometric Factorisation & Defactorisation Formulas',
        description: 'Transforming sum or difference of sines and cosines into products and vice versa.',
        keyFormulas: [
          'sin C + sin D = 2 sin((C+D)/2) cos((C-D)/2)',
          'sin C - sin D = 2 cos((C+D)/2) sin((C-D)/2)',
          'cos C + cos D = 2 cos((C+D)/2) cos((C-D)/2)',
          'cos C - cos D = -2 sin((C+D)/2) sin((C-D)/2)'
        ],
        problems: [
          {
            id: 'state_c11_p1',
            exercise: 'State Board Part 1 Ex 3.4 Q4',
            type: 'Textbook Exercise',
            question: 'Prove the identity: (sin 5x - sin 3x) / (cos 5x + cos 3x) = tan x.',
            difficulty: 'Medium',
            hint: 'Apply sin C - sin D on numerator and cos C + cos D on denominator.',
            solution: 'Step 1: Numerator:\nsin 5x - sin 3x = 2 cos((5x + 3x)/2) sin((5x - 3x)/2)\n= 2 cos(4x) sin(x).\n\nStep 2: Denominator:\ncos 5x + cos 3x = 2 cos((5x + 3x)/2) cos((5x - 3x)/2)\n= 2 cos(4x) cos(x).\n\nStep 3: Divide Numerator by Denominator:\n[2 cos(4x) sin(x)] / [2 cos(4x) cos(x)]\nCancel 2 cos(4x):\n= sin(x) / cos(x) = tan(x) = RHS. (Hence Proved).',
            boardInsight: 'Standard 3-mark identity verification question in Class 11 annual exams.'
          }
        ]
      }
    ]
  },

  12: {
    grade: 12,
    board: 'state_board',
    boardName: 'State Board / SCERT',
    bookTitle: 'State Board HSC Mathematics & Statistics Part 1 & 2 Class 12',
    syllabusHighlights: [
      'Mathematical Logic: Truth tables, Logical Equivalence, Duality and Switching Circuits',
      'Matrices: Inversion Method & Reduction Method for solving simultaneous equations',
      'Trigonometric Functions: General solutions, Sine Rule, Cosine Rule and Projection Rule',
      'Pair of Straight Lines: Homogeneous equation ax² + 2hxy + by² = 0 and condition for parallel/perpendicular',
      'Differential Equations: Order, Degree, Variable Separable and Linear DE',
      'Probability Distributions: Probability Mass Function (p.m.f) and Binomial Distribution'
    ],
    chapters: [
      {
        id: 'state_c12_ch1',
        number: 1,
        title: 'Mathematical Logic & Switching Circuits',
        description: 'Symbolic logic, negation, conjunction, disjunction, implication, double implication, and circuit simplification.',
        keyFormulas: [
          'Implication Law: p → q ≡ ~p ∨ q',
          'Negation of Implication: ~(p → q) ≡ p ∧ ~q',
          'De Morgan’s Laws: ~(p ∧ q) ≡ ~p ∨ ~q and ~(p ∨ q) ≡ ~p ∧ ~q',
          'Switches in series: p ∧ q; Switches in parallel: p ∨ q'
        ],
        boardHighlight: 'Unique topic featured extensively in State Board HSC examination with 8 guaranteed marks.',
        problems: [
          {
            id: 'state_c12_p1',
            exercise: 'HSC Board Exam 2024 & State Textbook Part 1 Ex 1.4 Q2',
            type: 'Board Examination',
            question: 'Without using truth tables, prove the logical equivalence: (p ∨ q) ∧ (p ∨ ~q) ≡ p. State the logical algebra laws used at each step.',
            difficulty: 'Medium',
            hint: 'Use the Distributive Law in reverse: take (p ∨) common.',
            solution: 'LHS = (p ∨ q) ∧ (p ∨ ~q)\n\nStep 1: Apply Distributive Law (factoring out p ∨):\n≡ p ∨ (q ∧ ~q)       [By Distributive Law]\n\nStep 2: Since q and ~q cannot both be true simultaneously:\n≡ p ∨ F             [By Complement Law: q ∧ ~q ≡ F]\n\nStep 3: Anything ORed with False is the statement itself:\n≡ p                 [By Identity Law: p ∨ F ≡ p]\n\n= RHS. (Hence Proved).',
            boardInsight: 'State board examiners strictly award 1 mark for each law named in brackets.'
          }
        ]
      }
    ]
  }
};
