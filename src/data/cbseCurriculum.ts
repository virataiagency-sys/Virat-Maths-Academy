export type ProblemType = 'NCERT Exercise' | 'NCERT Exemplar' | 'HOTS Problem' | 'Board Examination';

export interface CBSEProblem {
  id: string;
  exercise: string;
  type: ProblemType;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  hint: string;
  solution: string; // Comprehensive step-by-step NCERT aligned solution
  vedicShortcut: string; // Vedic / Speed check
}

export interface CBSEChapter {
  id: string;
  number: number;
  title: string;
  description: string;
  keyFormulas: string[];
  problems: CBSEProblem[];
}

export interface CBSEGradeBooks {
  grade: number;
  bookTitle: string;
  chapters: CBSEChapter[];
}

export const cbseBooksData: Record<number, CBSEGradeBooks> = {
  1: {
    grade: 1,
    bookTitle: "NCERT Joyful Mathematics & Math-Magic Class 1",
    chapters: [
      {
        id: "c1_ch1",
        number: 1,
        title: "Shapes and Space",
        description: "Spatial relationships: Inside/Outside, Bigger/Smaller, Top/Bottom, Rolling and Sliding 3D shapes.",
        keyFormulas: ["Round shapes roll (ball, wheel)", "Flat shapes slide (box, book)", "Corner / Edges counting"],
        problems: [
          {
            id: "c1_p1",
            exercise: "Ex 1.1 Q1",
            type: "NCERT Exercise",
            question: "Look at an apple and a wooden pencil box. Which object rolls easily down a slope and which slides?",
            difficulty: "Easy",
            hint: "Objects with curved surfaces roll, objects with flat faces slide.",
            solution: "1. The apple has a curved, spherical surface without flat corners. Therefore, it rolls down the slope smoothly.\n2. The wooden pencil box has flat rectangular faces and sharp edges. Therefore, it slides down the slope.",
            vedicShortcut: "Visual inspection: curved = roll, flat = slide."
          },
          {
            id: "c1_p2",
            exercise: "Ex 1.2 Q4",
            type: "NCERT Exemplar",
            question: "A star shape is formed by drawing two overlapping triangles. How many small outer triangular points does it have?",
            difficulty: "Medium",
            hint: "Count the points on the star going clockwise.",
            solution: "Step 1: Two overlapping equilateral triangles (one pointing up, one pointing down) form a hexagram (6-pointed star).\nStep 2: Counting the outer sharp tips: 1 (top), 2 (top-right), 3 (bottom-right), 4 (bottom), 5 (bottom-left), 6 (top-left).\nStep 3: Total outer points = 6.",
            vedicShortcut: "Pattern symmetry: 2 triangles × 3 vertices = 6 outer points."
          }
        ]
      },
      {
        id: "c1_ch2",
        number: 2,
        title: "Numbers from One to Nine",
        description: "Counting, number representation, grouping, more and less, zero concept.",
        keyFormulas: ["1 to 9 sequence", "0 means empty set / nothing left", "Successor (+1) and Predecessor (-1)"],
        problems: [
          {
            id: "c1_p3",
            exercise: "Ex 2.3 Q2",
            type: "NCERT Exercise",
            question: "There are 5 birds sitting on a tree branch. 2 birds fly away. How many birds remain on the branch?",
            difficulty: "Easy",
            hint: "Take away 2 from 5.",
            solution: "Step 1: Initial number of birds = 5.\nStep 2: Birds that flew away = 2.\nStep 3: Birds remaining = 5 - 2 = 3.\nAnswer: 3 birds remain on the branch.",
            vedicShortcut: "Abacus Soroban: 1 heaven bead (5) minus 2 earth beads = 3 earth beads active."
          }
        ]
      },
      {
        id: "c1_ch3",
        number: 3,
        title: "Addition & Subtraction within 20",
        description: "Combining sets, number pairs of 10, word problems, place value tens and ones.",
        keyFormulas: ["Part + Part = Whole", "Complement pairs of 10: (1,9), (2,8), (3,7), (4,6), (5,5)"],
        problems: [
          {
            id: "c1_p4",
            exercise: "Ex 3.4 Q1",
            type: "HOTS Problem",
            question: "Ravi has 7 marbles. His sister gives him some more marbles so that he now has 15 marbles. How many marbles did his sister give him?",
            difficulty: "Medium",
            hint: "7 + [what] = 15. Count up from 7 to 15 or subtract 15 - 7.",
            solution: "Step 1: Let the number of marbles given be x.\nStep 2: 7 + x = 15.\nStep 3: x = 15 - 7.\nStep 4: Using 10-friend complement: 15 - 5 = 10; 10 - 2 = 8.\nAnswer: His sister gave him 8 marbles.",
            vedicShortcut: "Paramitra (10-Friend complement): 7 needs 3 to make 10, and 15 is 5 more than 10. 3 + 5 = 8."
          }
        ]
      }
    ]
  },
  2: {
    grade: 2,
    bookTitle: "NCERT Joyful Mathematics Class 2",
    chapters: [
      {
        id: "c2_ch1",
        number: 1,
        title: "Counting in Groups & Bundles of Tens",
        description: "Bundles of 10 sticks, place value foundation (Tens and Ones), skip counting by 2, 5, 10.",
        keyFormulas: ["1 Ten = 10 Ones", "Number = (Tens × 10) + Ones"],
        problems: [
          {
            id: "c2_p1",
            exercise: "Ex 2.2 Q3",
            type: "NCERT Exercise",
            question: "Deepa collects 4 bundles of 10 pencils each and 6 loose pencils. How many total pencils does Deepa have?",
            difficulty: "Easy",
            hint: "4 bundles of 10 = 40. Then add 6.",
            solution: "Step 1: 4 bundles of 10 pencils = 4 × 10 = 40 pencils.\nStep 2: Loose single pencils = 6.\nStep 3: Total pencils = 40 + 6 = 46 pencils.\nAnswer: Deepa has 46 pencils.",
            vedicShortcut: "Abacus rod: Tens rod shows 4 lower beads, Units rod shows 1 upper (5) + 1 lower (1) = 6. Value = 46."
          }
        ]
      },
      {
        id: "c2_ch2",
        number: 2,
        title: "How Much Can You Carry? (Weights & Balances)",
        description: "Comparing heavy and light, standard weights, pan balance equilibrium.",
        keyFormulas: ["Equal weights balance the beam", "1 kg = 1000 grams"],
        problems: [
          {
            id: "c2_p2",
            exercise: "Ex 3.1 Q2",
            type: "HOTS Problem",
            question: "On a balance scale, 1 large pumpkin balances 6 mangoes. How many mangoes will balance 3 such pumpkins?",
            difficulty: "Medium",
            hint: "Each pumpkin equals 6 mangoes. Multiply 3 by 6.",
            solution: "Step 1: Weight of 1 pumpkin = Weight of 6 mangoes.\nStep 2: For 3 pumpkins, weight = 3 × 6 mangoes.\nStep 3: 3 × 6 = 18 mangoes.\nAnswer: 18 mangoes will balance 3 pumpkins.",
            vedicShortcut: "Direct proportion multiplication: 1P = 6M => 3P = 18M."
          }
        ]
      }
    ]
  },
  3: {
    grade: 3,
    bookTitle: "NCERT Math-Magic Class 3",
    chapters: [
      {
        id: "c3_ch1",
        number: 1,
        title: "Give and Take (3-digit Addition & Subtraction)",
        description: "Mental math strategies, adding/subtracting by splitting numbers into tens and ones.",
        keyFormulas: ["BODMAS foundation", "Splitting: a + b = a + (b₁ + b₂)", "Subtracting via adding complements"],
        problems: [
          {
            id: "c3_p1",
            exercise: "Ex 3.3 Q4",
            type: "NCERT Exercise",
            question: "A factory made 270 bulbs on the first day and 123 bulbs on the second day. How many bulbs did the factory make altogether?",
            difficulty: "Easy",
            hint: "Add the hundreds, tens, and ones separately: (200 + 100) + (70 + 20) + (0 + 3).",
            solution: "Step 1: Bulbs made on Day 1 = 270.\nStep 2: Bulbs made on Day 2 = 123.\nStep 3: Add column-wise:\n   Hundreds: 2 + 1 = 3 (300)\n   Tens: 7 + 2 = 9 (90)\n   Ones: 0 + 3 = 3 (3)\nStep 4: Total = 300 + 90 + 3 = 393 bulbs.\nAnswer: The factory made 393 bulbs altogether.",
            vedicShortcut: "Left-to-right mental addition: 270 + 100 = 370; 370 + 23 = 393."
          },
          {
            id: "c3_p2",
            exercise: "Ex 3.5 Q2",
            type: "HOTS Problem",
            question: "Find the difference between the largest 3-digit number and the smallest 3-digit number formed by the digits 4, 0, 7 using each digit only once.",
            difficulty: "Medium",
            hint: "Largest number puts biggest digits first. Smallest cannot start with 0.",
            solution: "Step 1: Largest 3-digit number with {7, 4, 0} = 740.\nStep 2: Smallest 3-digit number cannot start with 0, so starts with 4, followed by 0, then 7 = 407.\nStep 3: Subtract: 740 - 407.\nStep 4: 740 - 400 = 340. 340 - 7 = 333.\nAnswer: The difference is 333.",
            vedicShortcut: "Nikhilam subtraction: 740 - 407 = (7-4) hundreds, (40 - 07) = 300 + 33 = 333."
          }
        ]
      }
    ]
  },
  4: {
    grade: 4,
    bookTitle: "NCERT Math-Magic Class 4",
    chapters: [
      {
        id: "c4_ch1",
        number: 1,
        title: "Building with Bricks (3D Shapes & Floor Tessellations)",
        description: "Brick patterns, archways, counting faces, edges, vertices, calculating total brick costs.",
        keyFormulas: ["Cuboid has 6 faces, 12 edges, 8 vertices", "Cost = Unit Price × Quantity"],
        problems: [
          {
            id: "c4_p1",
            exercise: "Ex 1.2 Q6",
            type: "NCERT Exercise",
            question: "If 1000 special red bricks cost ₹3200, find the cost of: (a) 500 bricks, (b) 3000 bricks.",
            difficulty: "Medium",
            hint: "500 is half of 1000. 3000 is 3 times 1000.",
            solution: "Part (a):\nCost of 1000 bricks = ₹3200.\n500 bricks is half of 1000 bricks.\nCost of 500 bricks = 3200 / 2 = ₹1600.\n\nPart (b):\n3000 bricks is 3 times 1000 bricks.\nCost of 3000 bricks = 3 × 3200 = ₹9600.\nAnswer: (a) ₹1600, (b) ₹9600.",
            vedicShortcut: "Anurupyena (Proportionately): 500/1000 = 1/2 => ₹1600. 3000/1000 = 3 => ₹9600."
          }
        ]
      },
      {
        id: "c4_ch2",
        number: 2,
        title: "Halves and Quarters (Fractions)",
        description: "Fraction of a whole, equivalent fractions (1/2 = 2/4), fractions of collection, word problems.",
        keyFormulas: ["1/2 = Half, 1/4 = Quarter, 3/4 = Three Quarters", "Fraction of Quantity = (Numerator/Denominator) × Total"],
        problems: [
          {
            id: "c4_p2",
            exercise: "Ex 9.4 Q3",
            type: "NCERT Exemplar",
            question: "A mother pours 1 liter of juice into glasses. She gives 1/4 liter to Rohan and 1/2 liter to Priya. How many milliliters of juice are left in the jug?",
            difficulty: "Medium",
            hint: "1 liter = 1000 mL. 1/4 L = 250 mL, 1/2 L = 500 mL.",
            solution: "Step 1: Total juice = 1 liter = 1000 mL.\nStep 2: Rohan's share = 1/4 of 1000 mL = 1000 / 4 = 250 mL.\nStep 3: Priya's share = 1/2 of 1000 mL = 1000 / 2 = 500 mL.\nStep 4: Total juice given away = 250 mL + 500 mL = 750 mL.\nStep 5: Juice remaining = 1000 mL - 750 mL = 250 mL (or 1/4 liter).\nAnswer: 250 mL of juice is left.",
            vedicShortcut: "Fractional complement: 1 - (1/4 + 1/2) = 1 - 3/4 = 1/4 liter = 250 mL."
          }
        ]
      }
    ]
  },
  5: {
    grade: 5,
    bookTitle: "NCERT Math-Magic Class 5",
    chapters: [
      {
        id: "c5_ch1",
        number: 1,
        title: "The Fish Tale (Speed, Distance, Large Numbers)",
        description: "Large numbers in Indian system (Lakhs, Crores), speed, distance, time, loans and profit.",
        keyFormulas: ["Distance = Speed × Time", "Speed = Distance / Time", "1 Lakh = 100,000", "1 Crore = 10,000,000"],
        problems: [
          {
            id: "c5_p1",
            exercise: "Ex 1.3 Q2",
            type: "NCERT Exercise",
            question: "A motor boat goes at about 20 km in one hour. How far would it go in 3 and a half hours? And how long will it take to go 85 km?",
            difficulty: "Medium",
            hint: "Distance = 20 × 3.5. Time = Distance / Speed = 85 / 20.",
            solution: "Part 1: Distance in 3.5 hours:\nSpeed = 20 km/h, Time = 3.5 hours.\nDistance = Speed × Time = 20 × 3.5 = 70 km.\n\nPart 2: Time to cover 85 km:\nTime = Distance / Speed = 85 / 20 = 4.25 hours.\n0.25 hours = 0.25 × 60 minutes = 15 minutes.\nTime taken = 4 hours 15 minutes.\nAnswer: 70 km; 4 hours 15 minutes.",
            vedicShortcut: "Mental split: 20 × 3 = 60, 20 × 0.5 = 10 => 70 km. 85 ÷ 20 = 8.5 ÷ 2 = 4.25 hrs."
          }
        ]
      },
      {
        id: "c5_ch2",
        number: 2,
        title: "Be My Multiple, I'll Be Your Factor (LCM & HCF)",
        description: "Common multiples, factor trees, prime numbers, highest common factor, lowest common multiple.",
        keyFormulas: ["LCM(a, b) × HCF(a, b) = a × b", "Multiples of a number are infinite, factors are finite"],
        problems: [
          {
            id: "c5_p2",
            exercise: "Ex 6.3 Q1",
            type: "HOTS Problem",
            question: "Three bells toll together at intervals of 9, 12, and 15 minutes respectively. If they toll together now, after how many hours will they toll together again?",
            difficulty: "Challenging",
            hint: "Find the LCM of 9, 12, and 15, then convert minutes to hours.",
            solution: "Step 1: Prime factorisation:\n9 = 3²\n12 = 2² × 3\n15 = 3 × 5\nStep 2: LCM = 2² × 3² × 5 = 4 × 9 × 5 = 180 minutes.\nStep 3: Convert 180 minutes to hours: 180 / 60 = 3 hours.\nAnswer: They will toll together again after 3 hours.",
            vedicShortcut: "Vedic cross-ratio LCM: LCM(12, 15) = (12×15)/3 = 60. Then LCM(60, 9) = (60×9)/3 = 180 min = 3 hrs."
          }
        ]
      }
    ]
  },
  6: {
    grade: 6,
    bookTitle: "NCERT Mathematics Class 6",
    chapters: [
      {
        id: "c6_ch1",
        number: 1,
        title: "Knowing Our Numbers & Large Computations",
        description: "Estimation, brackets, Roman numerals, place value systems, large arithmetic operations.",
        keyFormulas: ["BODMAS rule", "Estimation to nearest 10, 100, 1000", "Roman Numerals: I, V, X, L, C, D, M"],
        problems: [
          {
            id: "c6_p1",
            exercise: "Ex 1.2 Q5",
            type: "NCERT Exercise",
            question: "Find the difference between the greatest and the least 5-digit number that can be written using the digits 6, 2, 7, 4, 3 each only once.",
            difficulty: "Medium",
            hint: "Greatest: 76432. Least: 23467. Subtract carefully.",
            solution: "Step 1: Greatest 5-digit number (descending order of digits) = 76,432.\nStep 2: Least 5-digit number (ascending order of digits) = 23,467.\nStep 3: Difference:\n    76432\n  - 23467\n  --------\n    52965\nAnswer: The difference is 52,965.",
            vedicShortcut: "Nikhilam subtraction: 76432 - 23467 = (76-23) thousand + (432 - 467) = 53000 - 35 = 52,965."
          }
        ]
      },
      {
        id: "c6_ch2",
        number: 6,
        title: "Integers & Operations on the Number Line",
        description: "Positive and negative numbers, zero, absolute value, integer rules of addition and subtraction.",
        keyFormulas: ["a + (-b) = a - b", "a - (-b) = a + b", "(-a) × (-b) = +ab"],
        problems: [
          {
            id: "c6_p2",
            exercise: "Ex 6.3 Q4",
            type: "NCERT Exercise",
            question: "Find the value of: (-7) - 8 - (-25)",
            difficulty: "Easy",
            hint: "Rewrite -(-25) as +25, then combine negatives.",
            solution: "Step 1: Rewrite the expression: (-7) - 8 + 25.\nStep 2: Combine negative integers: (-7) + (-8) = -15.\nStep 3: Combine with positive integer: -15 + 25 = 10.\nAnswer: 10.",
            vedicShortcut: "Two minus signs cancel to plus: -15 + 25 = +10."
          }
        ]
      },
      {
        id: "c6_ch3",
        number: 11,
        title: "Introduction to Algebra",
        description: "Patterns to algebraic rules, variables, expressions, simple linear equations by inspection.",
        keyFormulas: ["Variable represents unknown quantity", "Equation has LHS = RHS"],
        problems: [
          {
            id: "c6_p3",
            exercise: "Ex 11.5 Q1(b)",
            type: "NCERT Exercise",
            question: "Solve the equation: 5t = 60 by inspection and state the solution value.",
            difficulty: "Easy",
            hint: "Divide both sides by 5.",
            solution: "Step 1: Given equation: 5t = 60.\nStep 2: Divide both sides by 5:\nt = 60 / 5\nStep 3: 60 / 5 = 12.\nStep 4: Verification: 5 × 12 = 60 (LHS = RHS).\nAnswer: t = 12.",
            vedicShortcut: "Dividing by 5: double 60 (=120), shift decimal left 1 place => 12."
          }
        ]
      }
    ]
  },
  7: {
    grade: 7,
    bookTitle: "NCERT Mathematics Class 7",
    chapters: [
      {
        id: "c7_ch1",
        number: 4,
        title: "Simple Equations (Linear Equations in One Variable)",
        description: "Transposition method, setting up equations from word problems, balancing method.",
        keyFormulas: ["Transposition: + becomes -, × becomes ÷ on opposite side", "ax + b = c => x = (c - b)/a"],
        problems: [
          {
            id: "c7_p1",
            exercise: "Ex 4.3 Q1(b)",
            type: "NCERT Exercise",
            question: "Solve for t: 5t + 28 = 10",
            difficulty: "Medium",
            hint: "Transpose 28 to RHS, then divide by 5.",
            solution: "Step 1: Transpose 28 to the right-hand side (sign changes to negative):\n5t = 10 - 28\nStep 2: Simplify RHS:\n5t = -18\nStep 3: Divide both sides by 5:\nt = -18 / 5 = -3.6 (or -3 3/5).\nAnswer: t = -18/5 (or -3.6).",
            vedicShortcut: "Paravartya Yojayet (Transpose and Apply): t = (10 - 28) / 5 = -18/5 = -3.6."
          }
        ]
      },
      {
        id: "c7_ch2",
        number: 13,
        title: "Exponents and Powers",
        description: "Laws of exponents, scientific notation, expressing large numbers in standard form.",
        keyFormulas: ["aᵐ × aⁿ = aᵐ⁺ⁿ", "aᵐ / aⁿ = aᵐ⁻ⁿ", "(aᵐ)ⁿ = aᵐⁿ", "a⁰ = 1"],
        problems: [
          {
            id: "c7_p2",
            exercise: "Ex 13.2 Q2(ii)",
            type: "NCERT Exemplar",
            question: "Simplify and express in exponential form: ((5²)³ × 5⁴) ÷ 5⁷",
            difficulty: "Medium",
            hint: "Apply power of a power rule: (5²)³ = 5^(2×3) = 5⁶.",
            solution: "Step 1: Simplify (5²)³ using rule (aᵐ)ⁿ = aᵐⁿ:\n(5²)³ = 5^(2×3) = 5⁶.\nStep 2: Multiply by 5⁴ using rule aᵐ × aⁿ = aᵐ⁺ⁿ:\n5⁶ × 5⁴ = 5^(6 + 4) = 5¹⁰.\nStep 3: Divide by 5⁷ using rule aᵐ ÷ aⁿ = aᵐ⁻ⁿ:\n5¹⁰ ÷ 5⁷ = 5^(10 - 7) = 5³.\nStep 4: 5³ = 125.\nAnswer: 5³ (or 125).",
            vedicShortcut: "Exponent arithmetic: (2×3) + 4 - 7 = 6 + 4 - 7 = 3. Thus 5³ = 125."
          }
        ]
      }
    ]
  },
  8: {
    grade: 8,
    bookTitle: "NCERT Mathematics Class 8",
    chapters: [
      {
        id: "c8_ch1",
        number: 2,
        title: "Linear Equations in One Variable",
        description: "Variables on both sides, equations reducible to linear form, cross multiplication.",
        keyFormulas: ["(ax + b)/(cx + d) = m/n => n(ax + b) = m(cx + d)"],
        problems: [
          {
            id: "c8_p1",
            exercise: "Ex 2.6 Q1",
            type: "NCERT Exercise",
            question: "Solve the equation: (8x - 3) / (3x) = 2",
            difficulty: "Medium",
            hint: "Multiply both sides by 3x (cross-multiplication).",
            solution: "Step 1: Cross-multiply the denominator 3x with the RHS 2:\n8x - 3 = 2 × 3x\n8x - 3 = 6x\nStep 2: Transpose 6x to LHS and -3 to RHS:\n8x - 6x = 3\nStep 3: Simplify:\n2x = 3\nStep 4: Divide by 2:\nx = 3/2 (or 1.5).\nVerification: (8(1.5) - 3) / (3(1.5)) = (12 - 3) / 4.5 = 9 / 4.5 = 2 (Correct).\nAnswer: x = 3/2.",
            vedicShortcut: "Paravartya crosswise: 8x - 6x = 3 => 2x = 3 => x = 1.5."
          }
        ]
      },
      {
        id: "c8_ch2",
        number: 9,
        title: "Algebraic Expressions and Identities",
        description: "Monomials, binomials, polynomials, standard identities (a±b)², a²-b², (x+a)(x+b).",
        keyFormulas: [
          "(a + b)² = a² + 2ab + b²",
          "(a - b)² = a² - 2ab + b²",
          "a² - b² = (a + b)(a - b)"
        ],
        problems: [
          {
            id: "c8_p2",
            exercise: "Ex 9.5 Q2(i)",
            type: "NCERT Exercise",
            question: "Use the identity (x + a)(x + b) = x² + (a + b)x + ab to evaluate: 103 × 104 without direct long multiplication.",
            difficulty: "Medium",
            hint: "Write 103 as (100 + 3) and 104 as (100 + 4).",
            solution: "Step 1: Express numbers in terms of base 100:\n103 × 104 = (100 + 3)(100 + 4).\nStep 2: Here x = 100, a = 3, b = 4.\nStep 3: Apply the identity:\n(x + a)(x + b) = x² + (a + b)x + ab\n= 100² + (3 + 4) × 100 + (3 × 4)\n= 10,000 + 7 × 100 + 12\n= 10,000 + 700 + 12\n= 10,712.\nAnswer: 10,712.",
            vedicShortcut: "Vedic Nikhilam Base 100: Deviations (+3) and (+4). Cross-add: 103 + 4 = 107. Multiply: 3 × 4 = 12. Answer = 10712!"
          }
        ]
      }
    ]
  },
  9: {
    grade: 9,
    bookTitle: "NCERT Mathematics Class 9",
    chapters: [
      {
        id: "c9_ch1",
        number: 1,
        title: "Number Systems (Real Numbers & Radicals)",
        description: "Irrational numbers, real number line, laws of radicals, rationalising the denominator.",
        keyFormulas: ["Rationalisation factor for (√a ± √b) is (√a ∓ √b)", "(√a + √b)(√a - √b) = a - b"],
        problems: [
          {
            id: "c9_p1",
            exercise: "Ex 1.5 Q5(ii)",
            type: "NCERT Exercise",
            question: "Rationalise the denominator of: 1 / (√7 - √6)",
            difficulty: "Medium",
            hint: "Multiply numerator and denominator by the conjugate (√7 + √6).",
            solution: "Step 1: The conjugate of (√7 - √6) is (√7 + √6).\nStep 2: Multiply numerator and denominator by (√7 + √6):\n[1 × (√7 + √6)] / [(√7 - √6)(√7 + √6)]\nStep 3: Apply the identity (a - b)(a + b) = a² - b² in the denominator:\nDenominator = (√7)² - (√6)² = 7 - 6 = 1.\nStep 4: Result = (√7 + √6) / 1 = √7 + √6.\nAnswer: √7 + √6.",
            vedicShortcut: "Difference of squares denominator check: 7 - 6 = 1. Flip sign in numerator: √7 + √6."
          }
        ]
      },
      {
        id: "c9_ch2",
        number: 2,
        title: "Polynomials (Factor & Remainder Theorems)",
        description: "Zeroes of polynomials, Factor Theorem, Remainder Theorem, splitting middle term.",
        keyFormulas: ["If P(a) = 0, then (x - a) is a factor of P(x)", "Splitting middle term: ac product and b sum"],
        problems: [
          {
            id: "c9_p2",
            exercise: "Ex 2.4 Q4(i)",
            type: "NCERT Exemplar",
            question: "Factorise the quadratic polynomial: 12x² - 7x + 1",
            difficulty: "Challenging",
            hint: "Find two numbers whose product is 12 × 1 = 12 and sum is -7.",
            solution: "Step 1: We need two factors p and q such that:\nProduct p · q = a · c = 12 × 1 = 12\nSum p + q = b = -7.\nStep 2: The factors are -3 and -4 (since (-3) × (-4) = 12 and (-3) + (-4) = -7).\nStep 3: Split the middle term -7x:\n12x² - 3x - 4x + 1\nStep 4: Group terms:\n= 3x(4x - 1) - 1(4x - 1)\nStep 5: Factor out common binomial (4x - 1):\n= (4x - 1)(3x - 1).\nAnswer: (4x - 1)(3x - 1).",
            vedicShortcut: "Lopana Sthapanabhyam (Elimination & Retention): (4x - 1)(3x - 1)."
          }
        ]
      }
    ]
  },
  10: {
    grade: 10,
    bookTitle: "NCERT Mathematics Class 10",
    chapters: [
      {
        id: "c10_ch1",
        number: 1,
        title: "Real Numbers & Fundamental Theorem of Arithmetic",
        description: "Prime factorisation, HCF and LCM relations, proof of irrationality of √2, √3, √5.",
        keyFormulas: ["LCM(a, b) × HCF(a, b) = a × b", "Every composite number can be uniquely factorised into primes"],
        problems: [
          {
            id: "c10_p1",
            exercise: "Ex 1.2 Q2(i)",
            type: "NCERT Exercise",
            question: "Find the LCM and HCF of 26 and 91 and verify that LCM × HCF = Product of the two numbers.",
            difficulty: "Medium",
            hint: "26 = 2 × 13; 91 = 7 × 13.",
            solution: "Step 1: Prime factorisation:\n26 = 2 × 13\n91 = 7 × 13\nStep 2: HCF is the product of common prime factors with lowest power:\nHCF(26, 91) = 13.\nStep 3: LCM is the product of all prime factors with highest power:\nLCM(26, 91) = 2 × 7 × 13 = 182.\nStep 4: Verification:\nLCM × HCF = 182 × 13 = 2366.\nProduct of numbers = 26 × 91 = 2366.\nSince 2366 = 2366, the property is verified.",
            vedicShortcut: "Vedic cross-product verification: 26 × 91 = (26 × 100) - (26 × 9) = 2600 - 234 = 2366."
          }
        ]
      },
      {
        id: "c10_ch2",
        number: 4,
        title: "Quadratic Equations",
        description: "Standard form ax² + bx + c = 0, Discriminant D = b² - 4ac, nature of roots, quadratic formula.",
        keyFormulas: [
          "Quadratic Formula: x = (-b ± √D) / (2a)",
          "D > 0: Two distinct real roots",
          "D = 0: Two equal real roots",
          "D < 0: No real roots"
        ],
        problems: [
          {
            id: "c10_p2",
            exercise: "Ex 4.3 Q2(ii)",
            type: "Board Examination",
            question: "Find the roots of the quadratic equation: 2x² + x - 4 = 0 using the quadratic formula.",
            difficulty: "Medium",
            hint: "a = 2, b = 1, c = -4. D = 1² - 4(2)(-4).",
            solution: "Step 1: Identify coefficients:\na = 2, b = 1, c = -4.\nStep 2: Calculate Discriminant D:\nD = b² - 4ac = 1² - 4(2)(-4) = 1 + 32 = 33.\nSince D = 33 > 0, the equation has two distinct real roots.\nStep 3: Apply Quadratic Formula:\nx = (-b ± √D) / (2a)\nx = (-1 ± √33) / (2 × 2) = (-1 ± √33) / 4.\nAnswer: x = (-1 + √33)/4 and x = (-1 - √33)/4.",
            vedicShortcut: "Sanity check: Sum of roots = -b/a = -1/2. Product of roots = c/a = -4/2 = -2. Both match (-1±√33)/4."
          }
        ]
      },
      {
        id: "c10_ch3",
        number: 8,
        title: "Introduction to Trigonometry",
        description: "Trigonometric ratios (sin, cos, tan, cosec, sec, cot), standard angles (0°, 30°, 45°, 60°, 90°), identities.",
        keyFormulas: [
          "sin² θ + cos² θ = 1",
          "1 + tan² θ = sec² θ",
          "1 + cot² θ = cosec² θ"
        ],
        problems: [
          {
            id: "c10_p3",
            exercise: "Ex 8.4 Q5(i)",
            type: "Board Examination",
            question: "Prove the identity: (cosec θ - cot θ)² = (1 - cos θ) / (1 + cos θ)",
            difficulty: "Challenging",
            hint: "Convert cosec θ and cot θ to 1/sin θ and cos θ / sin θ.",
            solution: "LHS = (cosec θ - cot θ)²\nStep 1: Substitute cosec θ = 1/sin θ and cot θ = cos θ / sin θ:\n= (1/sin θ - cos θ/sin θ)² = [(1 - cos θ) / sin θ]²\nStep 2: Expand square:\n= (1 - cos θ)² / sin² θ\nStep 3: Use fundamental identity sin² θ = 1 - cos² θ:\n= (1 - cos θ)² / (1 - cos² θ)\nStep 4: Factorise denominator as (1 - cos θ)(1 + cos θ):\n= [(1 - cos θ)(1 - cos θ)] / [(1 - cos θ)(1 + cos θ)]\nStep 5: Cancel common term (1 - cos θ):\n= (1 - cos θ) / (1 + cos θ) = RHS.\nHence Proved.",
            vedicShortcut: "Test angle shortcut: Plug θ = 60°. cosec 60° = 2/√3, cot 60° = 1/√3. (1/√3)² = 1/3. RHS: (1 - 1/2)/(1 + 1/2) = (1/2)/(3/2) = 1/3 (Matches!)."
          }
        ]
      }
    ]
  },
  11: {
    grade: 11,
    bookTitle: "NCERT Mathematics Class 11",
    chapters: [
      {
        id: "c11_ch1",
        number: 5,
        title: "Complex Numbers & Quadratic Equations",
        description: "Imaginary unit i, modulus |z|, argument, polar form, solving quadratics with D < 0.",
        keyFormulas: ["i² = -1, i³ = -i, i⁴ = 1", "|a + ib| = √(a² + b²)", "(a + ib)(a - ib) = a² + b²"],
        problems: [
          {
            id: "c11_p1",
            exercise: "Ex 5.1 Q1",
            type: "NCERT Exercise",
            question: "Express the product (5i) × (-3/5 i) in standard complex form a + ib.",
            difficulty: "Easy",
            hint: "Multiply coefficients and remember i² = -1.",
            solution: "Step 1: Group coefficients and imaginary units:\n(5) × (-3/5) × (i × i)\nStep 2: Simplify coefficients: 5 × (-3/5) = -3.\nStep 3: Simplify i × i = i² = -1.\nStep 4: Multiply: (-3) × (-1) = 3.\nStep 5: In standard form a + ib: 3 + 0i.\nAnswer: 3 + 0i (where a = 3, b = 0).",
            vedicShortcut: "Direct inspection: 5 cancels with 5; -3 × (-1) = 3."
          }
        ]
      },
      {
        id: "c11_ch2",
        number: 7,
        title: "Permutations and Combinations",
        description: "Fundamental principle of counting, arrangements ⁿPᵣ, selections ⁿCᵣ, combinatorial proofs.",
        keyFormulas: ["ⁿPᵣ = n! / (n - r)!", "ⁿCᵣ = n! / [r! (n - r)!]", "ⁿCᵣ = ⁿCₙ₋ᵣ"],
        problems: [
          {
            id: "c11_p2",
            exercise: "Ex 7.4 Q1",
            type: "NCERT Exercise",
            question: "If ⁿC₈ = ⁿC₂, find the value of ⁿC₂ and n.",
            difficulty: "Medium",
            hint: "ⁿCₓ = ⁿCᵧ implies x = y or x + y = n.",
            solution: "Step 1: Use the property ⁿCₓ = ⁿCᵧ => x = y or x + y = n.\nStep 2: Here x = 8 and y = 2. Since 8 ≠ 2, we have:\n8 + 2 = n => n = 10.\nStep 3: Now evaluate ¹⁰C₂:\n¹⁰C₂ = (10 × 9) / (2 × 1) = 90 / 2 = 45.\nAnswer: n = 10, ¹⁰C₂ = 45.",
            vedicShortcut: "Combinatorial symmetry: 8 + 2 = 10. 10 × 9 / 2 = 45 in 2 seconds."
          }
        ]
      }
    ]
  },
  12: {
    grade: 12,
    bookTitle: "NCERT Mathematics Class 12 (Parts 1 & 2)",
    chapters: [
      {
        id: "c12_ch1",
        number: 4,
        title: "Determinants & Matrices",
        description: "Properties of determinants, minors, cofactors, adjoint, inverse A⁻¹ = adj(A)/|A|, Cramer's rule.",
        keyFormulas: [
          "A · adj(A) = |A| · I",
          "A⁻¹ = (1 / |A|) · adj(A) (when |A| ≠ 0)",
          "det(AB) = det(A) · det(B)"
        ],
        problems: [
          {
            id: "c12_p1",
            exercise: "Ex 4.5 Q5",
            type: "Board Examination",
            question: "Find the inverse of the 2×2 matrix A = [[2, -2], [4, 3]].",
            difficulty: "Medium",
            hint: "Compute |A| = ad - bc. Adjoint swaps main diagonal and negates off-diagonal.",
            solution: "Step 1: Calculate Determinant |A|:\n|A| = (2)(3) - (-2)(4) = 6 - (-8) = 6 + 8 = 14.\nSince |A| = 14 ≠ 0, A⁻¹ exists.\nStep 2: Find the Adjoint of A:\nFor 2×2 matrix [[a, b], [c, d]], adj(A) = [[d, -b], [-c, a]].\nadj(A) = [[3, 2], [-4, 2]].\nStep 3: Calculate inverse A⁻¹ = (1/|A|) · adj(A):\nA⁻¹ = (1/14) · [[3, 2], [-4, 2]] = [[3/14, 2/14], [-4/14, 2/14]] = [[3/14, 1/7], [-2/7, 1/7]].\nAnswer: (1/14) [[3, 2], [-4, 2]].",
            vedicShortcut: "2×2 inverse shortcut: 1/(ad - bc) × [[d, -b], [-c, a]] = 1/14 × [[3, 2], [-4, 2]]."
          }
        ]
      },
      {
        id: "c12_ch2",
        number: 7,
        title: "Integrals (Definite & Indefinite)",
        description: "Methods of integration: substitution, partial fractions, integration by parts (ILATE), definite properties.",
        keyFormulas: [
          "∫ (u · v) dx = u ∫ v dx - ∫ [u' (∫ v dx)] dx (ILATE rule)",
          "King's property: ∫[a to b] f(x) dx = ∫[a to b] f(a+b-x) dx"
        ],
        problems: [
          {
            id: "c12_p2",
            exercise: "Ex 7.2 Q3",
            type: "Board Examination",
            question: "Evaluate the indefinite integral: ∫ 1 / (x + x ln x) dx",
            difficulty: "Medium",
            hint: "Factor out x in the denominator, then let u = 1 + ln x.",
            solution: "Step 1: Factor out x in the denominator:\n∫ 1 / [x(1 + ln x)] dx.\nStep 2: Use method of substitution:\nLet u = 1 + ln x.\nStep 3: Differentiate with respect to x:\ndu/dx = 1/x => du = (1/x) dx.\nStep 4: Substitute in the integral:\n∫ (1/u) du = ln |u| + C.\nStep 5: Substitute back u = 1 + ln x:\n= ln |1 + ln x| + C.\nAnswer: ln |1 + ln x| + C.",
            vedicShortcut: "Inspection: Recognise form ∫ [f'(x) / f(x)] dx = ln |f(x)| + C where f(x) = 1 + ln x."
          }
        ]
      }
    ]
  }
};
