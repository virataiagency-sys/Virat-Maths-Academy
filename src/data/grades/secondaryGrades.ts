import { GradeCurriculum } from '../../types/curriculum';

export const secondaryGrades: Record<9 | 10, GradeCurriculum> = {
  9: {
    grade: 9,
    gradeTitle: 'Class 9: Real Numbers, Polynomials & Nikhilam Base Math',
    levelTier: 'Secondary (Classes 9-10)',
    themeDescription: 'Irrational numbers, rationalizing denominators, polynomial factor theorem, multi-digit abacus division, and Vedic Nikhilam multiplication around base 100 & 1000.',
    pillars: {
      basic_maths: {
        pillar: 'basic_maths',
        pillarName: 'Basic Maths',
        tagline: 'Irrational Numbers, Rationalizing Denominators & Heron Formula',
        iconName: 'Calculator',
        flowchart: {
          title: 'How to Rationalize a Binomial Surd Denominator',
          concept: 'Multiplying by the conjugate to eliminate square roots from denominators',
          realWorldExample: 'Example: Rationalize 1 / (sqrt(5) - sqrt(2))',
          nodes: [
            { id: '1', type: 'start', title: 'Inspect Denominator', description: 'Denominator contains surds: (sqrt(5) - sqrt(2)).' },
            { id: '2', type: 'process', title: 'Find the Conjugate', description: 'Flip the middle sign: Conjugate is (sqrt(5) + sqrt(2)).' },
            { id: '3', type: 'process', title: 'Multiply Top & Bottom', description: 'Multiply numerator and denominator by the conjugate.' },
            { id: '4', type: 'process', title: 'Apply (a - b)(a + b) = a^2 - b^2 to Bottom', description: '(sqrt(5))^2 - (sqrt(2))^2 = 5 - 2 = 3. Denominator is now a clean integer (3)!' },
            { id: '5', type: 'output', title: 'Write Rationalized Form', description: '(sqrt(5) + sqrt(2)) / 3. Finished!' }
          ]
        },
        infographics: [
          {
            id: 'c9_bm_1',
            title: 'Real Number System Hierarchy',
            subtitle: 'From Natural Numbers to Irrationals',
            category: 'Number Systems',
            keyRule: 'Real Numbers (R) = Rational Numbers (Q) U Irrational Numbers (I)',
            visualType: 'steps',
            details: [
              { label: 'Natural Numbers (N)', value: '1, 2, 3, 4, ... (Counting numbers)' },
              { label: 'Whole Numbers (W)', value: '0, 1, 2, 3, ... (Natural numbers + 0)' },
              { label: 'Integers (Z)', value: '..., -2, -1, 0, 1, 2, ...' },
              { label: 'Rational Numbers (Q)', value: 'p/q form where q != 0 (Terminating or repeating decimals)' },
              { label: 'Irrational Numbers (I)', value: 'Non-terminating, non-repeating decimals (sqrt(2), pi, e)' }
            ],
            mnemonicOrTakeaway: 'If the decimal never ends and never repeats a pattern, it is IRRATIONAL!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c9_bm_t1',
            title: 'Heron Formula Semi-Perimeter Shortcut',
            tagline: 'Calculate triangle area without perpendicular heights',
            difficulty: 'Medium',
            howItWorks: [
              'Triangle with sides a, b, c:',
              'Step 1: s = (a + b + c) / 2.',
              'Step 2: Area = sqrt(s(s-a)(s-b)(s-c)).',
              'Pro-Tip: Factor each term under the square root before multiplying to avoid giant messy square roots!'
            ],
            example: {
              question: 'Find area of triangle with sides 13, 14, 15',
              steps: [
                's = (13 + 14 + 15) / 2 = 42 / 2 = 21.',
                's - a = 21 - 13 = 8; s - b = 21 - 14 = 7; s - c = 21 - 15 = 6.',
                'Area = sqrt(21 x 8 x 7 x 6) = sqrt((3x7) x (2^3) x 7 x (2x3)).',
                'Pair primes: sqrt(7^2 x 3^2 x 2^4) = 7 x 3 x 4 = 84 sq units.'
              ],
              answer: '84 sq units'
            },
            commonPitfall: 'Multiplying 21 x 8 x 7 x 6 = 7056 and getting stuck finding its square root.',
            timeSaved: 'Factorizing prime pairs directly under the root saves 5 minutes.'
          }
        ],
        quiz: [
          {
            id: 'c9_bm_q1',
            question: 'Which of the following is an irrational number?',
            options: ['0.333...', 'sqrt(9)', 'sqrt(7)', '22/7'],
            correctIndex: 2,
            hint: 'The square root of any non-perfect square is irrational.',
            explanation: 'sqrt(7) cannot be written as a fraction p/q; it is a non-terminating, non-repeating decimal.',
            difficulty: 'Easy'
          },
          {
            id: 'c9_bm_q2',
            question: 'What is the conjugate of (3 - sqrt(5)) used for rationalization?',
            options: ['3 - sqrt(5)', '3 + sqrt(5)', '-3 - sqrt(5)', 'sqrt(5) - 3'],
            correctIndex: 1,
            hint: 'Flip the sign in front of the radical.',
            explanation: 'The conjugate of (a - sqrt(b)) is (a + sqrt(b)).',
            difficulty: 'Easy'
          }
        ]
      },

      algebra: {
        pillar: 'algebra',
        pillarName: 'Algebra & Patterns',
        tagline: 'Polynomials, Remainder Theorem & Linear Graphs (ax+by+c=0)',
        iconName: 'Sparkles',
        flowchart: {
          title: 'How to Test if (x - a) is a Factor of Polynomial P(x)',
          concept: 'The Factor Theorem Algorithm',
          realWorldExample: 'Example: Is (x - 2) a factor of P(x) = x^3 - 3x^2 + 4?',
          nodes: [
            { id: '1', type: 'start', title: 'Set Divisor to Zero', description: 'Set x - 2 = 0 => x = 2.' },
            { id: '2', type: 'process', title: 'Substitute Value into P(x)', description: 'Compute P(2): P(2) = (2)^3 - 3(2)^2 + 4.' },
            { id: '3', type: 'process', title: 'Evaluate Numeric Expression', description: '8 - 3(4) + 4 = 8 - 12 + 4 = 0.' },
            { id: '4', type: 'decision', title: 'Is P(2) == 0?', description: 'Remainder is exactly zero!' },
            { id: '5', type: 'output', title: 'Conclusion by Factor Theorem', description: 'Since P(2) = 0, (x - 2) is GUARANTEED to be a factor of P(x).' }
          ]
        },
        infographics: [
          {
            id: 'c9_alg_1',
            title: 'Remainder Theorem vs Factor Theorem',
            subtitle: 'The two cornerstones of polynomial algebra',
            category: 'Polynomials',
            keyRule: 'If polynomial P(x) is divided by (x - a), remainder is P(a)',
            visualType: 'comparison',
            details: [
              { label: 'Remainder Theorem', value: 'Gives the remainder P(a) instantly without doing long polynomial division' },
              { label: 'Factor Theorem', value: 'Special case: If remainder P(a) = 0, then (x - a) is an exact factor' }
            ],
            mnemonicOrTakeaway: 'Plug in the root: If zero, it factors; if not zero, that value IS your remainder!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c9_alg_t1',
            title: 'Intercept Method for Graphing ax + by = c in 10 Seconds',
            tagline: 'Never create a large table of 5 points to graph a line',
            difficulty: 'Easy',
            howItWorks: [
              'To graph 2x + 3y = 6:',
              'Set y = 0: 2x = 6 => x = 3. Point is (3, 0).',
              'Set x = 0: 3y = 6 => y = 2. Point is (0, 2).',
              'Plot (3, 0) and (0, 2) on axes and draw straight line through them!'
            ],
            example: {
              question: 'Find x and y intercepts of 4x - 5y = 20',
              steps: [
                'Set y = 0: 4x = 20 => x = 5 -> (5, 0).',
                'Set x = 0: -5y = 20 => y = -4 -> (0, -4).'
              ],
              answer: 'Intercepts at (5, 0) and (0, -4)'
            },
            commonPitfall: 'Forgetting the negative sign on the y coefficient.',
            timeSaved: 'Graphs any linear equation in under 15 seconds.'
          }
        ],
        quiz: [
          {
            id: 'c9_alg_q1',
            question: 'What is the remainder when P(x) = 2x^3 - 5x + 3 is divided by (x - 1)?',
            options: ['0', '1', '2', '3'],
            correctIndex: 0,
            hint: 'Evaluate P(1): 2(1)^3 - 5(1) + 3.',
            explanation: 'P(1) = 2 - 5 + 3 = 0. Remainder is 0.',
            difficulty: 'Easy'
          },
          {
            id: 'c9_alg_q2',
            question: 'What is the degree of the polynomial 4x^3 - 7x^5 + 2x - 9?',
            options: ['3', '5', '1', '9'],
            correctIndex: 1,
            hint: 'The degree is the highest power of the variable.',
            explanation: 'The term with the highest power is -7x^5, so the degree is 5.',
            difficulty: 'Easy'
          }
        ]
      },

      abacus: {
        pillar: 'abacus',
        pillarName: 'Abacus (Soroban)',
        tagline: 'High-Throughput Multi-Digit Division on Soroban',
        iconName: 'Grid',
        flowchart: {
          title: 'How to Divide Multi-Digit Numbers on Soroban',
          concept: 'Quotient estimation, dividend subtraction, and leftward rod progression',
          realWorldExample: 'Example: 84 / 4 on Soroban',
          nodes: [
            { id: '1', type: 'start', title: 'Set Dividend on Right Rods', description: 'Set 84 on right rods: Tens rod = 8, Units rod = 4.' },
            { id: '2', type: 'process', title: 'Estimate First Quotient Digit', description: 'Divide first digit 8 by 4: 8 / 4 = 2.' },
            { id: '3', type: 'process', title: 'Set Quotient on Left Rod', description: 'Set 2 on quotient rod. Multiply 2 x 4 = 8.' },
            { id: '4', type: 'process', title: 'Subtract from Dividend', description: 'Subtract 8 from tens rod (now 0, remaining dividend is 4).' },
            { id: '5', type: 'process', title: 'Next Quotient Digit', description: '4 / 4 = 1. Set 1 on quotient rod. Subtract 4 from units rod.' },
            { id: '6', type: 'output', title: 'Read Quotient', description: 'Quotient rods show 2 and 1 -> 21! Remainder = 0.' }
          ]
        },
        infographics: [
          {
            id: 'c9_ab_1',
            title: 'Division Board Allocation',
            subtitle: 'Dividing the Soroban beam into functional zones',
            category: 'Division Layout',
            keyRule: 'Keep at least 2 blank rods between Divisor, Quotient, and Dividend to avoid collision',
            visualType: 'steps',
            details: [
              { label: 'Left Zone', value: 'Divisor memory or Quotient accumulation' },
              { label: 'Center Buffer', value: '2 clear empty rods (Air gap)' },
              { label: 'Right Zone', value: 'Active Dividend being chipped away' }
            ],
            mnemonicOrTakeaway: 'Quotient on the left, dividend on the right; meet in the middle!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c9_ab_t1',
            title: 'Over-Estimation Correction (Borrow-Back)',
            tagline: 'What to do when your trial quotient was 1 too big',
            difficulty: 'Hard',
            howItWorks: [
              'If subtracting quotient x divisor would require negative beads:',
              'Immediately reduce quotient bead by 1.',
              'Add back 1 divisor unit to the dividend rod.',
              'Takes 1 second to repair on Soroban!'
            ],
            example: {
              question: 'Dividing 72 by 8, guessed 10',
              steps: [
                '10 x 8 = 80 > 72. Too big!',
                'Reduce quotient to 9.',
                '9 x 8 = 72. Exactly balances.'
              ],
              answer: '9'
            },
            commonPitfall: 'Clearing the whole board and restarting from scratch.',
            timeSaved: 'Saves 30 seconds per division problem.'
          }
        ],
        quiz: [
          {
            id: 'c9_ab_q1',
            question: 'When dividing on an abacus, where is the final quotient typically formed?',
            options: [
              'To the left of the dividend',
              'Underneath the table',
              'On the exact same rod as the dividend',
              'On the farthest right rod only'
            ],
            correctIndex: 0,
            hint: 'Quotient builds towards the left while dividend is subtracted on the right.',
            explanation: 'Standard Soroban convention places the quotient on rods to the left of the dividend.',
            difficulty: 'Medium'
          },
          {
            id: 'c9_ab_q2',
            question: 'What is 96 divided by 3 performed on Soroban?',
            options: ['31', '32', '33', '34'],
            correctIndex: 1,
            hint: '9/3 = 3, 6/3 = 2.',
            explanation: '9/3 = 3 tens, 6/3 = 2 units => 32.',
            difficulty: 'Easy'
          }
        ]
      },

      vedic_maths: {
        pillar: 'vedic_maths',
        pillarName: 'Vedic Maths',
        tagline: 'Sutra: Nikhilam Multiplication (Above & Below Base 100/1000)',
        iconName: 'Flame',
        flowchart: {
          title: 'How to Multiply Numbers Near Base 100 in 3 Seconds',
          concept: 'Sutra: All from 9 and Last from 10 (Base Multiplication)',
          realWorldExample: 'Example: 104 x 107 (Both above base 100)',
          nodes: [
            { id: '1', type: 'start', title: 'Choose Base and Deviations', description: 'Base = 100 (2 zeros). Deviations: 104 is +4, 107 is +7.' },
            { id: '2', type: 'process', title: 'Cross-Add for Left Part', description: 'Cross add either pair: 104 + 7 = 111 (or 107 + 4 = 111). Left part = 111.' },
            { id: '3', type: 'process', title: 'Multiply Deviations for Right Part', description: 'Multiply deviations: (+4) x (+7) = +28. (Right part = 28).' },
            { id: '4', type: 'decision', title: 'Does right part have 2 digits (base zeros)?', description: 'Base 100 has 2 zeros; 28 has 2 digits. Perfect fit!' },
            { id: '5', type: 'output', title: 'Join Left and Right', description: 'Left: 111 | Right: 28 -> 11,128! 104 x 107 = 11,128.' }
          ]
        },
        infographics: [
          {
            id: 'c9_vm_1',
            title: 'Nikhilam Base Multiplication 3 Cases',
            subtitle: 'Near Base 100 (Numbers close to 100)',
            category: 'Base Multiplication',
            keyRule: 'Cross-add deviation to other number; multiply deviations for tail',
            visualType: 'steps',
            details: [
              { label: 'Case 1: Both Above Base', value: '103 x 106: (103+6) | (3x6) = 109 | 18 = 10,918' },
              { label: 'Case 2: Both Below Base', value: '96 x 93: (-4, -7) => (96-7) | (-4 x -7) = 89 | 28 = 8,928' },
              { label: 'Case 3: One Above, One Below', value: '104 x 97: (+4, -3) => (104-3) | (+4 x -3) = 101 | -12 = 10100 - 12 = 10,088' }
            ],
            mnemonicOrTakeaway: 'Cross add to get the head, multiply deviations to get the tail!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c9_vm_t1',
            title: 'Base 1000 Mental Giant Multiplication',
            tagline: 'Multiply 1,008 x 1,007 in your head',
            difficulty: 'Medium',
            howItWorks: [
              'Base 1000 has 3 zeros.',
              'Deviations: +8 and +7.',
              'Left part: 1008 + 7 = 1015.',
              'Right part: 8 x 7 = 56 -> Pad to 3 digits: 056!',
              'Answer: 1,015,056.'
            ],
            example: {
              question: 'Calculate 994 x 996 mentally',
              steps: [
                'Deviations: -6 and -4.',
                'Left: 994 - 4 = 990.',
                'Right: (-6) x (-4) = +24 -> 3 digits: 024.',
                'Answer: 990,024.'
              ],
              answer: '990,024'
            },
            commonPitfall: 'Writing 56 instead of 056 when the base has 3 zeros.',
            timeSaved: 'Calculates a 6-digit multiplication in 3 seconds.'
          }
        ],
        quiz: [
          {
            id: 'c9_vm_q1',
            question: 'What is 105 x 108 using Nikhilam base method?',
            options: ['11340', '11330', '11240', '11440'],
            correctIndex: 0,
            hint: '105 + 8 = 113. 5 x 8 = 40.',
            explanation: '105 + 8 = 113 on left; 5 x 8 = 40 on right => 11,340.',
            difficulty: 'Easy'
          },
          {
            id: 'c9_vm_q2',
            question: 'What is 97 x 94 using Nikhilam below base 100?',
            options: ['9118', '9128', '9018', '9218'],
            correctIndex: 0,
            hint: 'Deviations are -3 and -6. 97 - 6 = 91. (-3) x (-6) = 18.',
            explanation: '97 - 6 = 91. (-3) x (-6) = 18 => 9,118.',
            difficulty: 'Medium'
          }
        ]
      }
    }
  },

  10: {
    grade: 10,
    gradeTitle: 'Class 10: Quadratics, AP & Paravartya Yojayet',
    levelTier: 'Secondary (Classes 9-10)',
    themeDescription: 'The Quadratic Formula & Discriminant, Arithmetic Progressions, competitive abacus speed drills, and Vedic Paravartya Yojayet (Transpose and Apply).',
    pillars: {
      basic_maths: {
        pillar: 'basic_maths',
        pillarName: 'Basic Maths',
        tagline: 'Arithmetic Progressions (AP), Trigonometric Ratios & Euclid Algorithm',
        iconName: 'Calculator',
        flowchart: {
          title: 'How to Find the Sum of First n Terms of an AP',
          concept: 'Formula: S_n = (n/2)[2a + (n-1)d] or S_n = (n/2)[a + l]',
          realWorldExample: 'Example: Sum of first 20 terms of AP: 3, 7, 11, 15, ...',
          nodes: [
            { id: '1', type: 'start', title: 'Identify AP Parameters', description: 'First term a = 3, Common difference d = 7 - 3 = 4, Number of terms n = 20.' },
            { id: '2', type: 'process', title: 'Compute (n - 1)d', description: '(20 - 1) x 4 = 19 x 4 = 76.' },
            { id: '3', type: 'process', title: 'Add 2a', description: '2a = 2(3) = 6. Inside bracket: 6 + 76 = 82.' },
            { id: '4', type: 'process', title: 'Multiply by n/2', description: 'n/2 = 20 / 2 = 10. Multiply 10 x 82 = 820.' },
            { id: '5', type: 'output', title: 'Final Sum S_20', description: 'The sum of the first 20 terms is 820.' }
          ]
        },
        infographics: [
          {
            id: 'c10_bm_1',
            title: 'Trigonometric Ratios Hand Cheat Sheet',
            subtitle: 'Values of sin, cos, tan for standard angles (0, 30, 45, 60, 90)',
            category: 'Trigonometry',
            keyRule: 'sin(theta) = sqrt(fingers below) / 2',
            visualType: 'diagram',
            details: [
              { label: '0 deg', value: 'sin 0 = 0 | cos 0 = 1 | tan 0 = 0' },
              { label: '30 deg', value: 'sin 30 = 1/2 | cos 30 = sqrt(3)/2 | tan 30 = 1/sqrt(3)' },
              { label: '45 deg', value: 'sin 45 = 1/sqrt(2) | cos 45 = 1/sqrt(2) | tan 45 = 1' },
              { label: '60 deg', value: 'sin 60 = sqrt(3)/2 | cos 60 = 1/2 | tan 60 = sqrt(3)' },
              { label: '90 deg', value: 'sin 90 = 1 | cos 90 = 0 | tan 90 = Undefined' }
            ],
            mnemonicOrTakeaway: 'Counting fingers: 0, 1, 2, 3, 4! Take square root and divide by 2!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c10_bm_t1',
            title: 'The Gauss Sum Hack for Consecutive Integers',
            tagline: 'Sum 1 to 100 in 3 seconds without an AP formula',
            difficulty: 'Easy',
            howItWorks: [
              'Formula: n(n + 1) / 2.',
              'For 1 to 100: 100 x 101 / 2 = 50 x 101 = 5,050.',
              'For 1 to 50: 50 x 51 / 2 = 25 x 51 = 1,275.'
            ],
            example: {
              question: 'Find sum of first 40 positive integers',
              steps: [
                'n = 40.',
                '40 x 41 / 2 = 20 x 41 = 820.'
              ],
              answer: '820'
            },
            commonPitfall: 'Multiplying n x n instead of n x (n+1).',
            timeSaved: 'Saves 3 minutes on sequence summation.'
          }
        ],
        quiz: [
          {
            id: 'c10_bm_q1',
            question: 'What is the 10th term of the AP: 2, 5, 8, 11, ...?',
            options: ['27', '29', '30', '32'],
            correctIndex: 1,
            hint: 'a_n = a + (n-1)d. a = 2, d = 3, n = 10.',
            explanation: 'a_10 = 2 + (10 - 1)(3) = 2 + 27 = 29.',
            difficulty: 'Easy'
          },
          {
            id: 'c10_bm_q2',
            question: 'What is tan(45 degrees)?',
            options: ['0', '1/2', '1', 'sqrt(3)'],
            correctIndex: 2,
            hint: 'sin(45) / cos(45).',
            explanation: 'sin(45) = 1/sqrt(2) and cos(45) = 1/sqrt(2), so tan(45) = 1.',
            difficulty: 'Easy'
          }
        ]
      },

      algebra: {
        pillar: 'algebra',
        pillarName: 'Algebra & Patterns',
        tagline: 'Quadratic Equations, Discriminant & Nature of Roots',
        iconName: 'Sparkles',
        flowchart: {
          title: 'How to Determine the Nature of Roots of ax^2 + bx + c = 0',
          concept: 'The Discriminant Test: D = b^2 - 4ac',
          realWorldExample: 'Example: Determine roots of 2x^2 - 4x + 3 = 0',
          nodes: [
            { id: '1', type: 'start', title: 'Extract Coefficients', description: 'In 2x^2 - 4x + 3 = 0: a = 2, b = -4, c = 3.' },
            { id: '2', type: 'process', title: 'Calculate Discriminant D', description: 'D = b^2 - 4ac = (-4)^2 - 4(2)(3) = 16 - 24 = -8.' },
            { id: '3', type: 'decision', title: 'Test Sign of D', description: 'Is D > 0, D == 0, or D < 0?' },
            { id: '4', type: 'output', title: 'Branch: D < 0 (Negative)', description: 'D = -8 < 0 -> NO real roots exist (Roots are complex conjugates).' },
            { id: '5', type: 'output', title: 'Branch: D == 0 (Zero)', description: 'Two equal real roots: x = -b / (2a).' },
            { id: '6', type: 'output', title: 'Branch: D > 0 (Positive)', description: 'Two distinct real roots: x = (-b +- sqrt(D)) / (2a).' }
          ]
        },
        infographics: [
          {
            id: 'c10_alg_1',
            title: 'Quadratic Formula & Parabola Graphs',
            subtitle: 'How algebra connects to geometric curves',
            category: 'Quadratic Functions',
            keyRule: 'Roots are where the parabola crosses the x-axis',
            visualType: 'formula',
            details: [
              { label: 'Quadratic Formula', value: 'x = (-b +- sqrt(b^2 - 4ac)) / (2a)' },
              { label: 'D > 0', value: 'Parabola intersects x-axis at 2 distinct points' },
              { label: 'D = 0', value: 'Parabola vertex touches x-axis at exactly 1 point (tangent)' },
              { label: 'D < 0', value: 'Parabola floats entirely above or below x-axis (0 real intercepts)' }
            ],
            mnemonicOrTakeaway: 'The discriminant tells the future of the parabola before you even graph it!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c10_alg_t1',
            title: 'Vieta Formulas for Instant Root Checking',
            tagline: 'Sum and Product of Roots without solving the equation',
            difficulty: 'Medium',
            howItWorks: [
              'For ax^2 + bx + c = 0 with roots alpha and beta:',
              'Sum of roots: alpha + beta = -b / a.',
              'Product of roots: alpha x beta = c / a.',
              'Use this to verify factoring or find unknown coefficients instantly!'
            ],
            example: {
              question: 'Find sum and product of roots of 3x^2 - 9x + 6 = 0',
              steps: [
                'a = 3, b = -9, c = 6.',
                'Sum = -(-9) / 3 = 9 / 3 = 3.',
                'Product = 6 / 3 = 2.'
              ],
              answer: 'Sum = 3, Product = 2'
            },
            commonPitfall: 'Forgetting the negative sign in -b/a.',
            timeSaved: 'Verifies quadratic solutions in 3 seconds.'
          }
        ],
        quiz: [
          {
            id: 'c10_alg_q1',
            question: 'What is the nature of roots for the equation x^2 - 6x + 9 = 0?',
            options: [
              'Two distinct real roots',
              'Two equal real roots',
              'No real roots',
              'Infinite roots'
            ],
            correctIndex: 1,
            hint: 'Calculate D = b^2 - 4ac = (-6)^2 - 4(1)(9).',
            explanation: 'D = 36 - 36 = 0. When D = 0, the equation has two equal real roots (x = 3).',
            difficulty: 'Medium'
          },
          {
            id: 'c10_alg_q2',
            question: 'If sum of roots of 2x^2 + kx - 8 = 0 is 3, what is k?',
            options: ['-6', '6', '-3', '3'],
            correctIndex: 0,
            hint: 'Sum = -b/a => -k / 2 = 3.',
            explanation: '-k / 2 = 3 => -k = 6 => k = -6.',
            difficulty: 'Medium'
          }
        ]
      },

      abacus: {
        pillar: 'abacus',
        pillarName: 'Abacus (Soroban)',
        tagline: 'Competition Speed Drills & High-Speed Retention',
        iconName: 'Grid',
        flowchart: {
          title: 'How to Train for Flash Anzan (Auditory & Visual Math)',
          concept: 'Flashing numbers at 0.3-second intervals to achieve flow state',
          realWorldExample: 'Example: Summing 10 three-digit numbers in 3 seconds',
          nodes: [
            { id: '1', type: 'start', title: 'Calibrate Flash Duration', description: 'Start at 1.0 second per number, progressively ramp to 0.3s.' },
            { id: '2', type: 'process', title: 'Decouple Vocalization', description: 'Do NOT say number names in your throat! Internal speech is too slow.' },
            { id: '3', type: 'process', title: 'Direct Visual-Motor Trigger', description: 'The visual stimulus immediately triggers bead motion on mental rods.' },
            { id: '4', type: 'process', title: 'Persistence of Bead Image', description: 'Only hold the updated rod state; drop past numbers from working memory.' },
            { id: '5', type: 'output', title: 'Immediate Vocalization at Stop', description: 'When the sequence ends, read the final bead positions instantly.' }
          ]
        },
        infographics: [
          {
            id: 'c10_ab_1',
            title: 'Abacus Speed Milestones (Dan Grades)',
            subtitle: 'International Soroban and Anzan rank standards',
            category: 'Mastery Levels',
            keyRule: 'Kyu grades are student levels; Dan grades are master levels',
            visualType: 'steps',
            details: [
              { label: '10th - 1st Kyu', value: 'Fundamental single and double-digit operations' },
              { label: '1st - 3rd Dan', value: 'Adding ten 3-digit numbers in under 4 seconds' },
              { label: '5th - 10th Dan', value: 'World champion speed: 15 numbers of 3 digits flashed in 1.6 seconds!' }
            ],
            mnemonicOrTakeaway: 'The abacus is not a calculator; it is an instrument of human cognitive optimization.'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c10_ab_t1',
            title: 'Subitizing (Instant Group Recognition)',
            tagline: 'Recognize 6, 7, 8 beads in 10 milliseconds without counting',
            difficulty: 'Medium',
            howItWorks: [
              'Train your brain to recognize bead configurations instantly:',
              'Upper bead down alone = 5.',
              'Upper bead + 1 lower = 6.',
              'Upper bead + 2 lower = 7.',
              'Upper bead + 3 lower = 8.',
              'Full rod = 9.'
            ],
            example: {
              question: 'Identify upper bead down + 3 lower beads up',
              steps: [
                'Upper = 5.',
                'Lower = 3.',
                '5 + 3 = 8.'
              ],
              answer: '8'
            },
            commonPitfall: 'Counting 1, 2, 3 lower beads individually.',
            timeSaved: 'Enables subconscious processing.'
          }
        ],
        quiz: [
          {
            id: 'c10_ab_q1',
            question: 'What is "subitizing" in the context of advanced abacus training?',
            options: [
              'Subtracting using 10s complements',
              'Instantly perceiving the number of beads without counting them one by one',
              'Drawing the abacus on paper',
              'Cleaning the wooden frame with oil'
            ],
            correctIndex: 1,
            hint: 'From the Latin word for sudden: instant pattern recognition.',
            explanation: 'Subitizing is the rapid, accurate, and confident judgment of numbers performed at a glance without sequential counting.',
            difficulty: 'Medium'
          },
          {
            id: 'c10_ab_q2',
            question: 'Why do competitive Anzan masters suppress vocalizing number names during calculation?',
            options: [
              'It is against tournament rules to talk',
              'Inner speech is limited to ~4 words per second, while visual bead processing exceeds 20 operations per second',
              'It wastes lung oxygen',
              'It confuses the judges'
            ],
            correctIndex: 1,
            hint: 'Phonological loops in the brain are much slower than visual cognition.',
            explanation: 'Vocal/auditory verbal processing bottlenecks speed; bypassing words directly to spatial bead imagery allows superhuman speed.',
            difficulty: 'Hard'
          }
        ]
      },

      vedic_maths: {
        pillar: 'vedic_maths',
        pillarName: 'Vedic Maths',
        tagline: 'Sutra: Paravartya Yojayet (Transpose and Apply)',
        iconName: 'Flame',
        flowchart: {
          title: 'How to Divide by Numbers Near 100 Using Paravartya Yojayet',
          concept: 'Sutra: Transpose and Apply (Flipping signs of divisor deviations)',
          realWorldExample: 'Example: Divide 1452 by 112',
          nodes: [
            { id: '1', type: 'start', title: 'Write Divisor and Deviations', description: 'Divisor is 112 (Base 100). Deviation from 100 is +12.' },
            { id: '2', type: 'process', title: 'Transpose the Signs (Paravartya)', description: 'Flip signs of deviation: +1 and +2 become -1 and -2 (written as bar numbers 1_bar 2_bar).' },
            { id: '3', type: 'process', title: 'Partition Dividend', description: 'Base 100 has 2 zeros: Split 1452 into Quotient zone (14) and Remainder zone (52).' },
            { id: '4', type: 'process', title: 'Multiply Down and Add', description: 'Bring down 1. Multiply 1 by (-1, -2) = (-1, -2). Next column: 4 - 1 = 3.' },
            { id: '5', type: 'output', title: 'Read Quotient and Remainder', description: 'Quotient = 12, Remainder = 108 (or adjust for final balance).' }
          ]
        },
        infographics: [
          {
            id: 'c10_vm_1',
            title: 'Paravartya Yojayet in Algebraic Division',
            subtitle: 'Synthetic division before synthetic division was invented',
            category: 'Polynomial Division',
            keyRule: 'Transposing signs transforms hard division into simple multiplication and addition',
            visualType: 'steps',
            details: [
              { label: 'Linear Equation', value: 'ax + b = c => Transpose: x = (c - b) / a' },
              { label: 'Synthetic Polynomial', value: 'Dividing P(x) by (x - 2): Transpose divisor to +2 and multiply-add coefficients' }
            ],
            mnemonicOrTakeaway: 'Flip the signs at the gate, and the whole division becomes a walk in the park!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c10_vm_t1',
            title: 'Solving Systems of 2 Equations with Paravartya',
            tagline: 'Find x and y in 10 seconds without matrix determinants',
            difficulty: 'Medium',
            howItWorks: [
              'For: a1*x + b1*y = c1 and a2*x + b2*y = c2:',
              'x = (b1*c2 - b2*c1) / (b1*a2 - b2*a1).',
              'Mentally cross-multiply coefficients in 1 breath!'
            ],
            example: {
              question: 'Solve: 2x + 3y = 13 and x + 2y = 8',
              steps: [
                'Numerator for x: (3 x 8) - (2 x 13) = 24 - 26 = -2.',
                'Denominator: (3 x 1) - (2 x 2) = 3 - 4 = -1.',
                'x = -2 / -1 = 2.',
                'y = (13 - 2(2)) / 3 = 9 / 3 = 3.'
              ],
              answer: 'x = 2, y = 3'
            },
            commonPitfall: 'Swapping the order of terms in cross multiplication.',
            timeSaved: 'Cuts simultaneous equation solution time by 80%.'
          }
        ],
        quiz: [
          {
            id: 'c10_vm_q1',
            question: 'What is the English translation of the Vedic Sutra "Paravartya Yojayet"?',
            options: [
              'Vertically and crosswise',
              'Transpose and apply',
              'By one more than the previous',
              'Proportionately'
            ],
            correctIndex: 1,
            hint: 'Paravartya = transpose/reverse, Yojayet = apply/unite.',
            explanation: 'Paravartya Yojayet translates to "Transpose and Apply".',
            difficulty: 'Easy'
          },
          {
            id: 'c10_vm_q2',
            question: 'Solve for x in 5x - 7 = 3x + 13 using transposition:',
            options: ['8', '10', '12', '14'],
            correctIndex: 1,
            hint: '5x - 3x = 13 + 7.',
            explanation: '2x = 20 => x = 10.',
            difficulty: 'Easy'
          }
        ]
      }
    }
  }
};
