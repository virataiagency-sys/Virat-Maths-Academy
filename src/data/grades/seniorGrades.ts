import { GradeCurriculum } from '../../types/curriculum';

export const seniorGrades: Record<11 | 12, GradeCurriculum> = {
  11: {
    grade: 11,
    gradeTitle: 'Class 11: Complex Numbers, Binomial Theorem & Vinculum',
    levelTier: 'Senior (Classes 11-12)',
    themeDescription: 'Complex numbers and Euler form, Permutations & Combinations, Binomial Theorem expansions, and the powerful Vedic Vinculum (Bar number) method.',
    pillars: {
      basic_maths: {
        pillar: 'basic_maths',
        pillarName: 'Basic Maths',
        tagline: 'Permutations & Combinations, Geometric Progressions (GP) & Infinite Series',
        iconName: 'Calculator',
        flowchart: {
          title: 'How to Choose Between Permutation (nPr) and Combination (nCr)',
          concept: 'The Order Sensitivity Decision Algorithm',
          realWorldExample: 'Example: Selecting a 3-person committee vs awarding Gold, Silver, Bronze medals',
          nodes: [
            { id: '1', type: 'start', title: 'Read the Problem Statement', description: 'Analyze the selection of r items from a collection of n distinct items.' },
            { id: '2', type: 'decision', title: 'Does the ORDER or SEQUENCE of selection matter?', description: 'Does choosing Person A first and Person B second create a DIFFERENT outcome?' },
            { id: '3', type: 'process', title: 'ORDER MATTERS: Permutation (nPr)', description: 'Arrangements, passwords, race podiums, seat assignments. Formula: nPr = n! / (n - r)!' },
            { id: '4', type: 'process', title: 'ORDER DOES NOT MATTER: Combination (nCr)', description: 'Committees, pizza toppings, lottery draws, handshakes. Formula: nCr = n! / [r! (n - r)!]' },
            { id: '5', type: 'output', title: 'Compute Values with Factorials', description: 'Evaluate factorials, canceling common terms before multiplying.' }
          ]
        },
        infographics: [
          {
            id: 'c11_bm_1',
            title: 'Sum of Infinite Geometric Progression (GP)',
            subtitle: 'When an infinite series converges to a finite number',
            category: 'Sequences & Series',
            keyRule: 'S_infinity = a / (1 - r)  [strictly valid ONLY when |r| < 1]',
            visualType: 'formula',
            details: [
              { label: 'First term (a)', value: 'The starting value of the sequence' },
              { label: 'Common ratio (r)', value: 'Multiplier between consecutive terms (r = a_k+1 / a_k)' },
              { label: 'Convergence condition', value: '-1 < r < 1 (Terms shrink towards zero)' },
              { label: 'Example: 1/2 + 1/4 + 1/8 + ...', value: 'a = 1/2, r = 1/2 => S_inf = (1/2) / (1 - 1/2) = 1 whole!' }
            ],
            mnemonicOrTakeaway: 'Divide the first term by one minus the ratio: infinity captured in a tiny fraction!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c11_bm_t1',
            title: 'Symmetry Property of Combinations: nCr = nC(n-r)',
            tagline: 'Calculate giant combinations in 2 seconds',
            difficulty: 'Easy',
            howItWorks: [
              'To find 100C98:',
              'Do NOT compute 98 factorials!',
              'Use symmetry: 100C98 = 100C(100 - 98) = 100C2.',
              '100C2 = (100 x 99) / (2 x 1) = 50 x 99 = 4,950!'
            ],
            example: {
              question: 'Evaluate 20C18',
              steps: [
                '20C18 = 20C(20 - 18) = 20C2.',
                '(20 x 19) / (2 x 1) = 10 x 19 = 190.'
              ],
              answer: '190'
            },
            commonPitfall: 'Expanding factorials down to 1 manually.',
            timeSaved: 'Saves 5 minutes of tedious arithmetic.'
          }
        ],
        quiz: [
          {
            id: 'c11_bm_q1',
            question: 'How many different 3-letter codes can be formed from the word MATHS if no repetition is allowed?',
            options: ['10', '20', '60', '120'],
            correctIndex: 2,
            hint: 'n = 5 letters, r = 3 letters. Order matters: 5P3.',
            explanation: '5P3 = 5! / (5 - 3)! = 5 x 4 x 3 = 60.',
            difficulty: 'Medium'
          },
          {
            id: 'c11_bm_q2',
            question: 'What is the sum of the infinite series: 6 + 2 + 2/3 + 2/9 + ...?',
            options: ['8', '9', '10', '12'],
            correctIndex: 1,
            hint: 'a = 6, r = 2/6 = 1/3. S_inf = a / (1 - r).',
            explanation: 'S_inf = 6 / (1 - 1/3) = 6 / (2/3) = 6 x 3/2 = 9.',
            difficulty: 'Medium'
          }
        ]
      },

      algebra: {
        pillar: 'algebra',
        pillarName: 'Algebra & Patterns',
        tagline: 'Complex Numbers, Euler Identity & Binomial Theorem',
        iconName: 'Sparkles',
        flowchart: {
          title: 'How to Expand a Binomial (x + y)^n Using Pascal Triangle',
          concept: 'The Binomial Theorem Pipeline: (x + y)^n = sum(nCk * x^(n-k) * y^k)',
          realWorldExample: 'Example: Expand (2x - 3)^4',
          nodes: [
            { id: '1', type: 'start', title: 'Find Row n of Pascal Triangle', description: 'For n = 4, coefficients are: 1, 4, 6, 4, 1.' },
            { id: '2', type: 'process', title: 'Write Decreasing Powers of First Term', description: '(2x)^4, (2x)^3, (2x)^2, (2x)^1, (2x)^0.' },
            { id: '3', type: 'process', title: 'Write Increasing Powers of Second Term', description: '(-3)^0, (-3)^1, (-3)^2, (-3)^3, (-3)^4.' },
            { id: '4', type: 'process', title: 'Multiply Triplets Term by Term', description: 'Term 1: 1 * 16x^4 * 1 = 16x^4. Term 2: 4 * 8x^3 * (-3) = -96x^3. Term 3: 6 * 4x^2 * 9 = 216x^2, etc.' },
            { id: '5', type: 'output', title: 'Assemble Complete Polynomial', description: '16x^4 - 96x^3 + 216x^2 - 216x + 81.' }
          ]
        },
        infographics: [
          {
            id: 'c11_alg_1',
            title: 'The Complex Plane (Argand Diagram) & i Powers',
            subtitle: 'z = x + iy = r(cos theta + i sin theta) = r e^(i theta)',
            category: 'Complex Numbers',
            keyRule: 'Multiplying by i rotates any vector in the complex plane 90 degrees counter-clockwise!',
            visualType: 'diagram',
            details: [
              { label: 'i^1 = i', value: '90 degree rotation' },
              { label: 'i^2 = -1', value: '180 degree rotation (Points opposite on real axis)' },
              { label: 'i^3 = -i', value: '270 degree rotation' },
              { label: 'i^4 = +1', value: '360 degree full revolution back to home' },
              { label: 'Modulus |z|', value: 'sqrt(x^2 + y^2) (Distance from origin)' }
            ],
            mnemonicOrTakeaway: 'Powers of i repeat in a 4-step circle: i, -1, -i, 1!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c11_alg_t1',
            title: 'Instant Remainder of Powers of i',
            tagline: 'Evaluate i^2026 in 1 second',
            difficulty: 'Easy',
            howItWorks: [
              'Divide the exponent by 4 and look ONLY at the remainder:',
              'Remainder 0 => 1.',
              'Remainder 1 => i.',
              'Remainder 2 => -1.',
              'Remainder 3 => -i.',
              'For i^2026: 26 / 4 leaves remainder 2. Therefore i^2026 = i^2 = -1!'
            ],
            example: {
              question: 'Evaluate i^75',
              steps: [
                '75 / 4 = 18 with remainder 3.',
                'i^75 = i^3 = -i.'
              ],
              answer: '-i'
            },
            commonPitfall: 'Dividing the entire four-digit number manually instead of just the last 2 digits.',
            timeSaved: 'Instant 1-second exam score.'
          }
        ],
        quiz: [
          {
            id: 'c11_alg_q1',
            question: 'What is the modulus of the complex number z = 3 - 4i?',
            options: ['1', '5', '7', '25'],
            correctIndex: 1,
            hint: '|z| = sqrt(a^2 + b^2) = sqrt(3^2 + (-4)^2).',
            explanation: '|z| = sqrt(9 + 16) = sqrt(25) = 5.',
            difficulty: 'Easy'
          },
          {
            id: 'c11_alg_q2',
            question: 'What is the value of i^102?',
            options: ['1', '-1', 'i', '-i'],
            correctIndex: 1,
            hint: '102 / 4 leaves remainder 2. i^2 = ?',
            explanation: '102 mod 4 = 2. i^2 = -1.',
            difficulty: 'Easy'
          }
        ]
      },

      abacus: {
        pillar: 'abacus',
        pillarName: 'Abacus (Soroban)',
        tagline: 'Cognitive Architecture & Working Memory Offloading',
        iconName: 'Grid',
        flowchart: {
          title: 'How Soroban Maps to the Human Visual Cortex',
          concept: 'Bi-hemispheric neural coupling for high-capacity calculations',
          realWorldExample: 'Example: Mental storage of 12-digit intermediate numbers',
          nodes: [
            { id: '1', type: 'start', title: 'Input Stream (Sensory)', description: 'Auditory or visual numbers stream in at high baud rate.' },
            { id: '2', type: 'process', title: 'Encoding to Spatial Coordinate', description: 'Each decimal digit is mapped to a specific rod index and bead cluster.' },
            { id: '3', type: 'process', title: 'Visuo-Spatial Sketchpad Buffer', description: 'Brain parietal-occipital network maintains high-contrast bead image.' },
            { id: '4', type: 'process', title: 'Zero Carry Propagation Latency', description: 'Bead movements resolve arithmetic in parallel rather than serial arithmetic.' },
            { id: '5', type: 'output', title: 'Retrieval', description: 'Instantaneous readout without digit reversal or fatigue.' }
          ]
        },
        infographics: [
          {
            id: 'c11_ab_1',
            title: 'Human Working Memory vs Anzan Spatial Array',
            subtitle: 'Overcoming Miller Law (The Magical Number 7 +- 2)',
            category: 'Cognitive Science',
            keyRule: 'Spatial chunking allows holding 16+ digits simultaneously',
            visualType: 'comparison',
            details: [
              { label: 'Miller Law Limit', value: 'Verbal phonological loop crashes at 7 +- 2 digits' },
              { label: 'Soroban Bead Chunking', value: 'Each rod represents a complete state (0-9) as 1 unified gestalt shape' },
              { label: 'Result', value: 'Grandmasters calculate 10-digit multiplications entirely in mental memory' }
            ],
            mnemonicOrTakeaway: 'When digits become pictures, human memory expands tenfold.'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c11_ab_t1',
            title: 'The Static Grid Anchor Drill',
            tagline: 'Keep the frame anchored even when numbers change furiously',
            difficulty: 'Hard',
            howItWorks: [
              'Picture the outer black wooden frame and the central horizontal beam as immovable.',
              'Only the bi-conical beads slide.',
              'If the frame floats or wobbles, your mental calculation resets.',
              'Anchor the frame to your desk surface in your imagination.'
            ],
            example: {
              question: 'Anchoring 5-digit number: 48,219',
              steps: [
                'Lock frame.',
                'Rod 5: 4 beads. Rod 4: 5+3 beads. Rod 3: 2 beads. Rod 2: 1 bead. Rod 1: 5+4 beads.',
                'Scan left to right.'
              ],
              answer: 'Locked 48,219'
            },
            commonPitfall: 'Allowing the imagined abacus to spin or translate in mental space.',
            timeSaved: 'Prevents mid-calculation memory loss.'
          }
        ],
        quiz: [
          {
            id: 'c11_ab_q1',
            question: 'What psychological limit on working memory does Soroban visualization overcome through visual chunking?',
            options: ['Weber Law', 'Miller Law (7 +- 2 chunks)', 'Moore Law', 'Newton First Law'],
            correctIndex: 1,
            hint: 'Named after George A. Miller (1956).',
            explanation: 'Miller Law states normal verbal working memory holds 7 +- 2 items; Anzan circumvents this by using spatial chunking in the visuo-spatial sketchpad.',
            difficulty: 'Medium'
          },
          {
            id: 'c11_ab_q2',
            question: 'Which brain region shows heightened fMRI activation in Soroban mental champions compared to normal calculators?',
            options: [
              'Right superior parietal lobule and occipital visual cortex',
              'Broca area for speech only',
              'Olfactory bulb',
              'Brainstem'
            ],
            correctIndex: 0,
            hint: 'Regions associated with spatial visualization and 3D imagery.',
            explanation: 'Neuroimaging studies confirm master abacus calculators utilize right-hemisphere visuo-spatial neural networks.',
            difficulty: 'Hard'
          }
        ]
      },

      vedic_maths: {
        pillar: 'vedic_maths',
        pillarName: 'Vedic Maths',
        tagline: 'Sutra: The Vinculum Method (Negative Digit Mathematics)',
        iconName: 'Flame',
        flowchart: {
          title: 'How to Convert Large Digits (>5) into Vinculum (Bar) Numbers',
          concept: 'Transforming numbers to use only small digits 0, 1, 2, 3, 4, 5',
          realWorldExample: 'Example: Convert 289 into Vinculum notation',
          nodes: [
            { id: '1', type: 'start', title: 'Identify Digits Greater than 5', description: 'In 289: digits 8 and 9 are large (>5). High digits cause heavy carries.' },
            { id: '2', type: 'process', title: 'Apply Nikhilam to the Large Digits', description: 'For consecutive large digits 89: All from 9, last from 10: 9 - 8 = 1, 10 - 9 = 1. Write with bar: 1_bar 1_bar.' },
            { id: '3', type: 'process', title: 'Increment the Left Neighbor by 1', description: 'Left neighbor of 89 is 2. Add 1: 2 + 1 = 3.' },
            { id: '4', type: 'output', title: 'Assemble Vinculum Number', description: '3 1_bar 1_bar (Which means: 300 - 11 = 289!).' },
            { id: '5', type: 'process', title: 'Why is this awesome?', description: 'Multiplying with 3, -1, -1 never generates carries!' }
          ]
        },
        infographics: [
          {
            id: 'c11_vm_1',
            title: 'Vinculum Conversion Table',
            subtitle: 'Replacing messy carries with clean subtractions',
            category: 'Vinculum Numbers',
            keyRule: 'Digit d (>5) becomes (10 - d) with a bar over it; add 1 to the preceding digit',
            visualType: 'steps',
            details: [
              { label: '9 becomes', value: '1 1_bar (10 - 1 = 9)' },
              { label: '8 becomes', value: '1 2_bar (10 - 2 = 8)' },
              { label: '7 becomes', value: '1 3_bar (10 - 3 = 7)' },
              { label: '198 becomes', value: '2 0 2_bar (200 - 2 = 198)' },
              { label: '3,889 becomes', value: '4 1_bar 1_bar 1_bar (4000 - 111 = 3889)' }
            ],
            mnemonicOrTakeaway: 'Bar numbers eliminate carries during polynomial and matrix multiplications!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c11_vm_t1',
            title: 'Carry-Free Long Multiplication with Vinculum',
            tagline: 'Multiply 198 x 289 without a single carry over 5',
            difficulty: 'Hard',
            howItWorks: [
              '198 = 2 0 2_bar.',
              '289 = 3 1_bar 1_bar.',
              'Every digit is now 0, 1, 2, or 3.',
              'Cross-multiply with tiny numbers, then de-vinculate at the end!'
            ],
            example: {
              question: 'De-vinculate: 3 2_bar 4',
              steps: [
                '3 2_bar 4 = 300 - 20 + 4.',
                '300 - 20 = 280.',
                '280 + 4 = 284.'
              ],
              answer: '284'
            },
            commonPitfall: 'Forgetting that the bar digit represents a subtraction (-).',
            timeSaved: 'Eliminates 90% of arithmetic scratch errors in senior high school algebra.'
          }
        ],
        quiz: [
          {
            id: 'c11_vm_q1',
            question: 'What regular number does the vinculum number 4 2_bar represent?',
            options: ['42', '38', '40', '32'],
            correctIndex: 1,
            hint: '4 tens minus 2 units: 40 - 2.',
            explanation: '4 2_bar = 40 - 2 = 38.',
            difficulty: 'Easy'
          },
          {
            id: 'c11_vm_q2',
            question: 'Convert the number 189 into Vinculum notation:',
            options: ['2 1_bar 1_bar', '1 1_bar 1_bar', '2 2_bar 1_bar', '2 1_bar 9'],
            correctIndex: 0,
            hint: 'All from 9, last from 10 on 89 => 1 1. Add 1 to preceding digit 1 => 2.',
            explanation: '89 converts to 1_bar 1_bar with 1 carried to the hundreds place (1 + 1 = 2) => 2 1_bar 1_bar (200 - 11 = 189).',
            difficulty: 'Medium'
          }
        ]
      }
    }
  },

  12: {
    grade: 12,
    gradeTitle: 'Class 12: Matrices, Calculus Algebra & Vedic Cross Determinants',
    levelTier: 'Senior (Classes 11-12)',
    themeDescription: 'Matrices & Determinants, Calculus derivatives & integration by parts, vector cross-products, and Vedic Urdhva Tiryagbhyam applied to 3x3 matrices and differential shortcuts.',
    pillars: {
      basic_maths: {
        pillar: 'basic_maths',
        pillarName: 'Basic Maths',
        tagline: 'Vectors (Dot & Cross Product), 3D Geometry & Bayes Theorem',
        iconName: 'Calculator',
        flowchart: {
          title: 'How to Compute the Vector Cross Product (a x b)',
          concept: 'Determinant formulation of vector cross product yielding a perpendicular vector',
          realWorldExample: 'Example: Find cross product of a = 2i + 3j - k and b = i - j + 2k',
          nodes: [
            { id: '1', type: 'start', title: 'Set up 3x3 Matrix', description: 'Row 1: Unit vectors [i, j, k]. Row 2: Vector a [2, 3, -1]. Row 3: Vector b [1, -1, 2].' },
            { id: '2', type: 'process', title: 'Expand Along Row 1 (i Component)', description: 'i * det([3, -1; -1, 2]) = i * [(3)(2) - (-1)(-1)] = i * [6 - 1] = +5i.' },
            { id: '3', type: 'process', title: 'Expand Along Row 1 (j Component with Negative)', description: '-j * det([2, -1; 1, 2]) = -j * [(2)(2) - (-1)(1)] = -j * [4 + 1] = -5j.' },
            { id: '4', type: 'process', title: 'Expand Along Row 1 (k Component)', description: '+k * det([2, 3; 1, -1]) = k * [(2)(-1) - (3)(1)] = k * [-2 - 3] = -5k.' },
            { id: '5', type: 'output', title: 'Assemble Perpendicular Vector', description: 'a x b = 5i - 5j - 5k. Perpendicular to both a and b!' }
          ]
        },
        infographics: [
          {
            id: 'c12_bm_1',
            title: 'Vector Dot Product vs Cross Product',
            subtitle: 'Scalar projection vs Perpendicular area vector',
            category: 'Vector Algebra',
            keyRule: 'Dot product yields a SCALAR (number); Cross product yields a VECTOR (direction)',
            visualType: 'comparison',
            details: [
              { label: 'Dot Product: a . b', value: '|a||b| cos(theta) = a_x*b_x + a_y*b_y + a_z*b_z' },
              { label: 'Orthogonality Test', value: 'If a . b = 0, vectors are strictly PERPENDICULAR (90 deg)' },
              { label: 'Cross Product: a x b', value: '|a||b| sin(theta) * n_hat (Right hand rule)' },
              { label: 'Parallel Test', value: 'If a x b = 0, vectors are strictly PARALLEL (Collinear)' }
            ],
            mnemonicOrTakeaway: 'Dot gives a dot (scalar value); Cross gives an arrow across space!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c12_bm_t1',
            title: 'Bayes Theorem Denominator Shortcut (Total Probability Law)',
            tagline: 'Structure the probability tree to avoid calculation traps',
            difficulty: 'Medium',
            howItWorks: [
              'Formula: P(A1 | B) = [P(B | A1) P(A1)] / P(B).',
              'Denominator P(B) is always the sum of all path products: P(B|A1)P(A1) + P(B|A2)P(A2).',
              'Calculate all path products first; the required path is just one branch divided by the whole tree!'
            ],
            example: {
              question: 'Bag 1 (3R, 2B) and Bag 2 (2R, 4B). Pick bag at random, draw Red. Prob from Bag 1?',
              steps: [
                'Branch 1: (1/2) * (3/5) = 3/10 = 0.30.',
                'Branch 2: (1/2) * (2/6) = 1/6 = 0.1667.',
                'Total Red: 3/10 + 1/6 = (9 + 5)/30 = 14/30.',
                'P(Bag 1 | Red) = (9/30) / (14/30) = 9/14.'
              ],
              answer: '9/14'
            },
            commonPitfall: 'Forgetting to multiply the prior probabilities P(A1) and P(A2).',
            timeSaved: 'Solves complex probability questions in 90 seconds.'
          }
        ],
        quiz: [
          {
            id: 'c12_bm_q1',
            question: 'If two non-zero vectors a and b satisfy a . b = 0, what is the angle between them?',
            options: ['0 degrees', '45 degrees', '90 degrees (Perpendicular)', '180 degrees'],
            correctIndex: 2,
            hint: 'cos(theta) = 0 when theta = ?',
            explanation: 'a . b = |a||b|cos(theta) = 0 => cos(theta) = 0 => theta = 90 degrees.',
            difficulty: 'Easy'
          },
          {
            id: 'c12_bm_q2',
            question: 'What is i x j (cross product of unit vectors along x and y)?',
            options: ['0', '1', 'k', '-k'],
            correctIndex: 2,
            hint: 'Right hand rule: curling fingers from x to y points in z direction.',
            explanation: 'By the right hand circular rule i x j = k, j x k = i, k x i = j.',
            difficulty: 'Easy'
          }
        ]
      },

      algebra: {
        pillar: 'algebra',
        pillarName: 'Algebra & Patterns',
        tagline: 'Matrices, Determinants, Inverse & Calculus Derivative Rules',
        iconName: 'Sparkles',
        flowchart: {
          title: 'How to Find the Inverse of a 2x2 Matrix A = [a, b; c, d]',
          concept: 'Formula: A^(-1) = (1 / det(A)) * [d, -b; -c, a]',
          realWorldExample: 'Example: Find inverse of A = [4, 7; 2, 6]',
          nodes: [
            { id: '1', type: 'start', title: 'Write Matrix Elements', description: 'a = 4, b = 7, c = 2, d = 6.' },
            { id: '2', type: 'process', title: 'Calculate Determinant det(A)', description: 'det(A) = ad - bc = (4)(6) - (7)(2) = 24 - 14 = 10.' },
            { id: '3', type: 'decision', title: 'Is det(A) == 0?', description: 'det(A) = 10 != 0. Matrix is non-singular, inverse exists!' },
            { id: '4', type: 'process', title: 'Form Adjoint Matrix adj(A)', description: 'Swap main diagonal: 4 and 6 become 6 and 4. Negate off-diagonal: 7 and 2 become -7 and -2. adj(A) = [6, -7; -2, 4].' },
            { id: '5', type: 'output', title: 'Multiply by 1 / det(A)', description: 'A^(-1) = (1/10) * [6, -7; -2, 4] = [0.6, -0.7; -0.2, 0.4].' }
          ]
        },
        infographics: [
          {
            id: 'c12_alg_1',
            title: 'Master Calculus Derivative Rules',
            subtitle: 'The essential transformation toolkit of analysis',
            category: 'Calculus Algebra',
            keyRule: 'd/dx transforms functions into their instantaneous slope functions',
            visualType: 'formula',
            details: [
              { label: 'Product Rule', value: 'd/dx [u . v] = u . v\' + v . u\'' },
              { label: 'Quotient Rule', value: 'd/dx [u / v] = (v . u\' - u . v\') / v^2' },
              { label: 'Chain Rule', value: 'd/dx [f(g(x))] = f\'(g(x)) . g\'(x)' },
              { label: 'Integration by Parts', value: 'integral(u dv) = u v - integral(v du)  [ILATE rule]' }
            ],
            mnemonicOrTakeaway: 'Quotient: Low d-High minus High d-Low, over the square of what is below!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c12_alg_t1',
            title: 'The DI (Tabular) Method for Integration by Parts',
            tagline: 'Integrate x^3 * e^(2x) in 20 seconds without 4 pages of algebra',
            difficulty: 'Hard',
            howItWorks: [
              'Make two columns: D (Differentiate) and I (Integrate).',
              'D column: x^3 -> 3x^2 -> 6x -> 6 -> 0 (stop at zero!).',
              'I column: e^(2x) -> (1/2)e^(2x) -> (1/4)e^(2x) -> (1/8)e^(2x) -> (1/16)e^(2x).',
              'Connect with alternating signs (+, -, +, -) diagonally and sum!'
            ],
            example: {
              question: 'Integrate x^2 * sin(x) dx',
              steps: [
                'D column: x^2, 2x, 2, 0.',
                'I column: sin(x), -cos(x), -sin(x), cos(x).',
                'Pair diagonally: (+)(x^2)(-cos x) + (-)(2x)(-sin x) + (+)(2)(cos x).',
                'Answer: -x^2 cos(x) + 2x sin(x) + 2 cos(x) + C.'
              ],
              answer: '-x^2 cos(x) + 2x sin(x) + 2 cos(x) + C'
            },
            commonPitfall: 'Forgetting to alternate signs (+, -, +, -).',
            timeSaved: 'Replaces 4 recursive integration steps with 1 clean table.'
          }
        ],
        quiz: [
          {
            id: 'c12_alg_q1',
            question: 'What is the determinant of matrix A = [3, 5; 2, 4]?',
            options: ['2', '12', '10', '22'],
            correctIndex: 0,
            hint: 'det = (3 x 4) - (5 x 2).',
            explanation: 'det(A) = 12 - 10 = 2.',
            difficulty: 'Easy'
          },
          {
            id: 'c12_alg_q2',
            question: 'Using the ILATE rule for Integration by Parts, which function takes priority to be chosen as "u"?',
            options: ['Algebraic', 'Inverse Trigonometric', 'Exponential', 'Logarithmic'],
            correctIndex: 1,
            hint: 'ILATE starts with "I".',
            explanation: 'I stands for Inverse Trigonometric functions (followed by Logarithmic, Algebraic, Trigonometric, Exponential).',
            difficulty: 'Medium'
          }
        ]
      },

      abacus: {
        pillar: 'abacus',
        pillarName: 'Abacus (Soroban)',
        tagline: 'Computational Logic, Binary Logic Gates & Hardware Registers',
        iconName: 'Grid',
        flowchart: {
          title: 'How Soroban Bi-Quinary Architecture Influenced Modern Computers',
          concept: 'Bi-quinary coded decimal (1 bead of weight 5, 4 beads of weight 1)',
          realWorldExample: 'Example: How IBM 650 mainframe stored decimal numbers in memory',
          nodes: [
            { id: '1', type: 'start', title: 'Bi-Quinary Number Representation', description: 'Each decimal digit (0-9) represented by 2 bits: 1 binary (0 or 5) + 1 quinary (0-4).' },
            { id: '2', type: 'process', title: 'Mechanical Error Detection', description: 'Exactly one quinary bead and one binary bead active: any other state is a hardware fault!' },
            { id: '3', type: 'process', title: 'Hardware Register Pipeline', description: 'Rods function identically to CPU accumulator shift registers.' },
            { id: '4', type: 'output', title: 'Computational Legacy', description: 'The Soroban was the physical blueprint for 20th century hardware computer design.' }
          ]
        },
        infographics: [
          {
            id: 'c12_ab_1',
            title: 'Soroban Bi-Quinary vs Modern Computer Binary',
            subtitle: 'From wooden rods to silicon logic gates',
            category: 'Computer Science',
            keyRule: 'Soroban uses Base-10 via bi-quinary (2-5) encoding; Computers use Base-2 (0 and 1)',
            visualType: 'comparison',
            details: [
              { label: 'Soroban Heaven Bead', value: '1 bit with weight 5 (0 or 1)' },
              { label: 'Soroban Earth Beads', value: '4 bits of weight 1 (0 to 4 tally)' },
              { label: 'IBM 650 Mainframe', value: 'Used bi-quinary vacuum tubes directly inspired by abacus logic' },
              { label: 'Speed Comparison', value: 'In 1946, Kiyoshi Matsuzaki (Soroban) defeated US Army electric calculator in an official speed match!' }
            ],
            mnemonicOrTakeaway: 'The abacus is humanity first digital computer.'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c12_ab_t1',
            title: 'Mental Floating Point Normalization',
            tagline: 'Handle scientific notation (e.g. 3.4 x 10^7) on Soroban rods',
            difficulty: 'Hard',
            howItWorks: [
              'Separate the mantissa from the exponent.',
              'Calculate mantissa on the central 5 rods.',
              'Track exponent mentally as an integer counter.',
              'Recombine mantissa x 10^exponent at the final answer!'
            ],
            example: {
              question: '(4.0 x 10^5) x (2.5 x 10^3)',
              steps: [
                'Mantissa: 4.0 x 2.5 = 10.0 = 1.0 x 10^1.',
                'Exponents: 5 + 3 + 1 = 9.',
                'Answer: 1.0 x 10^9.'
              ],
              answer: '1.0 x 10^9'
            },
            commonPitfall: 'Trying to shift physical rods 8 times across the board.',
            timeSaved: 'Solves physics and engineering calculations with ease.'
          }
        ],
        quiz: [
          {
            id: 'c12_ab_q1',
            question: 'What numerical coding system is physically embodied by the Soroban abacus (1 upper bead = 5, 4 lower beads = 1)?',
            options: ['Pure Binary', 'Bi-quinary coded decimal', 'Hexadecimal', 'Octal'],
            correctIndex: 1,
            hint: 'Bi (two states: 0 or 5) + Quinary (five states: 0 to 4).',
            explanation: 'The Soroban uses the bi-quinary system (a 2-5 mixed base system).',
            difficulty: 'Medium'
          },
          {
            id: 'c12_ab_q2',
            question: 'Which famous historical early computer used bi-quinary representation inspired by abacus logic in its vacuum tube registers?',
            options: ['IBM 650', 'Apple II', 'Commodore 64', 'PlayStation 1'],
            correctIndex: 0,
            hint: 'The world first mass-produced mainframe computer from the 1950s.',
            explanation: 'The IBM 650 magnetic drum computer used bi-quinary coding for reliable decimal computation.',
            difficulty: 'Hard'
          }
        ]
      },

      vedic_maths: {
        pillar: 'vedic_maths',
        pillarName: 'Vedic Maths',
        tagline: 'Sutra: Urdhva Tiryagbhyam for 3x3 Determinants & Fast Calculus',
        iconName: 'Flame',
        flowchart: {
          title: 'How to Evaluate 3x3 Matrix Determinants via Vedic Cross-Multiplication (Sarrus Simplified)',
          concept: 'Sutra: Vertically and Crosswise extended to 3 dimensions',
          realWorldExample: 'Example: det([1, 2, 3; 4, 5, 6; 7, 8, 9]) = 0',
          nodes: [
            { id: '1', type: 'start', title: 'Write Matrix with First 2 Columns Appended', description: 'Write columns 1, 2, 3, then repeat columns 1 and 2 to the right.' },
            { id: '2', type: 'process', title: 'Multiply Downward Diagonals (+)', description: 'Multiply along 3 down-right diagonals and sum: (1*5*9) + (2*6*7) + (3*4*8) = 45 + 84 + 96 = 225.' },
            { id: '3', type: 'process', title: 'Multiply Upward Diagonals (-)', description: 'Multiply along 3 up-right diagonals and sum: (7*5*3) + (8*6*1) + (9*4*2) = 105 + 48 + 72 = 225.' },
            { id: '4', type: 'output', title: 'Subtract Upward from Downward', description: 'Determinant = 225 - 225 = 0. Evaluated without cofactor co-expansion!' }
          ]
        },
        infographics: [
          {
            id: 'c12_vm_1',
            title: 'Vedic Quotient Rule Shortcut for Calculus Derivatives',
            subtitle: 'Cross-multiplying derivatives: d/dx [ (ax + b) / (cx + d) ]',
            category: 'Calculus Speed Hacks',
            keyRule: 'Derivative of linear rational function is det([a, b; c, d]) / (cx + d)^2',
            visualType: 'formula',
            details: [
              { label: 'General Formula', value: 'd/dx [ (ax + b)/(cx + d) ] = (ad - bc) / (cx + d)^2' },
              { label: 'Example: (3x + 4)/(2x + 5)', value: 'ad - bc = (3)(5) - (4)(2) = 15 - 8 = 7' },
              { label: 'Instant Derivative', value: '7 / (2x + 5)^2  (Done in 1 second without full quotient rule!)' }
            ],
            mnemonicOrTakeaway: 'Determinant on top, square of denominator on bottom!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c12_vm_t1',
            title: 'Vedic Instant Partial Fraction Coefficients',
            tagline: 'Cover-Up method (Heaviside/Vedic Paravartya)',
            difficulty: 'Medium',
            howItWorks: [
              'To decompose (5x + 1) / [(x - 1)(x + 2)] into A/(x-1) + B/(x+2):',
              'To find A: Cover up (x - 1), plug x = 1 into the rest: [5(1) + 1] / (1 + 2) = 6 / 3 = 2. So A = 2!',
              'To find B: Cover up (x + 2), plug x = -2: [5(-2) + 1] / (-2 - 1) = -9 / -3 = 3. So B = 3!',
              'Decomposition: 2/(x-1) + 3/(x+2) in 5 seconds flat!'
            ],
            example: {
              question: 'Find A in 1 / [(x - 3)(x - 5)] = A/(x - 3) + B/(x - 5)',
              steps: [
                'Cover (x - 3), set x = 3.',
                '1 / (3 - 5) = 1 / -2 = -1/2.',
                'A = -1/2.'
              ],
              answer: 'A = -1/2'
            },
            commonPitfall: 'Plugging the root into the covered term itself (division by zero).',
            timeSaved: 'Saves 3 minutes per partial fraction problem.'
          }
        ],
        quiz: [
          {
            id: 'c12_vm_q1',
            question: 'What is the derivative of f(x) = (4x + 1)/(3x + 2) using the Vedic determinant shortcut?',
            options: ['5 / (3x + 2)^2', '7 / (3x + 2)^2', '8 / (3x + 2)^2', '11 / (3x + 2)^2'],
            correctIndex: 0,
            hint: 'Numerator = ad - bc = (4)(2) - (1)(3).',
            explanation: 'ad - bc = 8 - 3 = 5. Derivative is 5 / (3x + 2)^2.',
            difficulty: 'Medium'
          },
          {
            id: 'c12_vm_q2',
            question: 'In the Cover-Up method for partial fractions (5x - 2)/[(x - 2)(x + 1)], what is the coefficient above (x - 2)?',
            options: ['8/3', '7/3', '2/3', '5/3'],
            correctIndex: 0,
            hint: 'Cover (x - 2) and substitute x = 2 into [5x - 2] / (x + 1).',
            explanation: '[5(2) - 2] / (2 + 1) = (10 - 2) / 3 = 8/3.',
            difficulty: 'Medium'
          }
        ]
      }
    }
  }
};
