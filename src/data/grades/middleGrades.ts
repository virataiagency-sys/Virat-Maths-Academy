import { GradeCurriculum } from '../../types/curriculum';

export const middleGrades: Record<6 | 7 | 8, GradeCurriculum> = {
  6: {
    grade: 6,
    gradeTitle: 'Class 6: Integers, Variables & Mental Anzan',
    levelTier: 'Middle (Classes 6-8)',
    themeDescription: 'Mastering negative numbers on the number line, introductory algebra expressions, mental Soroban Anzan visualization, and Vedic multiplication with 9s.',
    pillars: {
      basic_maths: {
        pillar: 'basic_maths',
        pillarName: 'Basic Maths',
        tagline: 'Integers, Number Line, Rational Operations & Ratios',
        iconName: 'Calculator',
        flowchart: {
          title: 'How to Add and Subtract Integers with Signs',
          concept: 'The Sign Battleship Algorithm',
          realWorldExample: 'Example: (-7) + (+4) and (-5) - (-8)',
          nodes: [
            { id: '1', type: 'start', title: 'Check the Operation', description: 'Look at the two numbers and the operator in between.' },
            { id: '2', type: 'decision', title: 'Is it subtraction: a - (-b)?', description: 'Two minus signs together become a PLUS (+): -(-b) = +b.' },
            { id: '3', type: 'decision', title: 'Do the two numbers share the SAME sign?', description: 'Both positive or both negative?' },
            { id: '4', type: 'process', title: 'SAME Signs: Add & Keep', description: 'Add their absolute values together and keep their shared sign. (e.g. -3 + -4 = -7).' },
            { id: '5', type: 'process', title: 'DIFFERENT Signs: Subtract & Big Boss', description: 'Subtract smaller from larger. Give the answer the sign of the bigger absolute value! (e.g. -7 + 4 = -3).' },
            { id: '6', type: 'output', title: 'Final Signed Result', description: 'Answer has the correct magnitude and sign.' }
          ]
        },
        infographics: [
          {
            id: 'c6_bm_1',
            title: 'Integer Sign Multiplication & Division Matrix',
            subtitle: 'The foolproof sign laws of arithmetic',
            category: 'Integers',
            keyRule: 'Same signs produce POSITIVE; Opposite signs produce NEGATIVE',
            visualType: 'diagram',
            details: [
              { label: '(+) x (+) = (+)', value: 'Friends of friends are friends (+)' },
              { label: '(-) x (-) = (+)', value: 'Enemies of enemies are friends (+)' },
              { label: '(+) x (-) = (-)', value: 'Friends of enemies are enemies (-)' },
              { label: '(-) x (+) = (-)', value: 'Enemies of friends are enemies (-)' }
            ],
            mnemonicOrTakeaway: 'Count the negative signs! Odd number of minuses = NEGATIVE, Even number = POSITIVE!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c6_bm_t1',
            title: 'The Elevator Temperature Analogy',
            tagline: 'Never get confused about negative numbers again',
            difficulty: 'Easy',
            howItWorks: [
              'Positive (+) means moving UP floors or temperature warming up.',
              'Negative (-) means going into underground parking or freezing down.',
              'Starting at basement level -3, going up 5 floors: -3 + 5 = 2nd floor.'
            ],
            example: {
              question: 'Calculate (-8) + 12',
              steps: [
                'Start at -8 below zero.',
                'Move up 12 steps.',
                '-8 + 8 gets you to 0, then 4 more steps gets you to +4.'
              ],
              answer: '+4'
            },
            commonPitfall: 'Assuming that adding a negative makes the answer bigger.',
            timeSaved: 'Eliminates integer sign test errors.'
          }
        ],
        quiz: [
          {
            id: 'c6_bm_q1',
            question: 'What is (-15) - (-22)?',
            options: ['-37', '+7', '-7', '+37'],
            correctIndex: 1,
            hint: 'Minus a negative becomes a plus: -15 + 22.',
            explanation: '-15 + 22 = +7.',
            difficulty: 'Medium'
          },
          {
            id: 'c6_bm_q2',
            question: 'What is (-6) x (-8)?',
            options: ['-48', '+48', '-14', '+14'],
            correctIndex: 1,
            hint: 'Negative times negative is positive.',
            explanation: 'Two negative numbers multiplied yield a positive product: +48.',
            difficulty: 'Easy'
          }
        ]
      },

      algebra: {
        pillar: 'algebra',
        pillarName: 'Algebra & Patterns',
        tagline: 'Variables, Algebraic Expressions, Terms & Coefficients',
        iconName: 'Sparkles',
        flowchart: {
          title: 'How to Evaluate an Algebraic Expression',
          concept: 'Substitute given values for variables and follow BODMAS',
          realWorldExample: 'Example: Evaluate 3x^2 - 4x + 7 when x = 3',
          nodes: [
            { id: '1', type: 'start', title: 'Write the Expression', description: 'Expression: 3x^2 - 4x + 7.' },
            { id: '2', type: 'process', title: 'Substitute with Parentheses', description: 'Replace every x with (3): 3(3)^2 - 4(3) + 7.' },
            { id: '3', type: 'process', title: 'Compute Exponents First (BODMAS)', description: '3^2 = 9. Now we have: 3(9) - 4(3) + 7.' },
            { id: '4', type: 'process', title: 'Perform Multiplications', description: '3 x 9 = 27 and 4 x 3 = 12. Expression is: 27 - 12 + 7.' },
            { id: '5', type: 'output', title: 'Perform Addition and Subtraction', description: '27 - 12 = 15, then 15 + 7 = 22. Final value is 22.' }
          ]
        },
        infographics: [
          {
            id: 'c6_alg_1',
            title: 'Anatomy of an Algebraic Term',
            subtitle: 'Breaking down 7x^3',
            category: 'Algebra Basics',
            keyRule: 'Coefficient x Variable ^ Exponent',
            visualType: 'diagram',
            details: [
              { label: 'Coefficient (7)', value: 'The numerical multiplier in front of the variable' },
              { label: 'Variable (x)', value: 'The letter representing an unknown quantity' },
              { label: 'Exponent (3)', value: 'The power showing how many times variable is multiplied' },
              { label: 'Constant (e.g. +5)', value: 'A term with fixed numerical value and no variable' }
            ],
            mnemonicOrTakeaway: 'Coefficient is the captain, variable is the ship, power is the engine turbo!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c6_alg_t1',
            title: 'The Invisible "1" Rule',
            tagline: 'When a variable has no number in front, its coefficient is 1!',
            difficulty: 'Easy',
            howItWorks: [
              'x is actually 1x.',
              '-y is actually -1y.',
              'x^0 is 1.',
              'When adding x + x, you are doing 1x + 1x = 2x, NOT x^2!'
            ],
            example: {
              question: 'Simplify: 5x - x',
              steps: [
                'Remember: -x means -1x.',
                '5x - 1x = 4x.'
              ],
              answer: '4x'
            },
            commonPitfall: 'Thinking 5x - x = 5 (canceling the x entirely).',
            timeSaved: 'Prevents the most frequent variable subtraction error.'
          }
        ],
        quiz: [
          {
            id: 'c6_alg_q1',
            question: 'What is the coefficient of x in the term -9x?',
            options: ['9', '-9', 'x', '1'],
            correctIndex: 1,
            hint: 'The coefficient includes the sign in front of the number.',
            explanation: 'The numerical factor is -9.',
            difficulty: 'Easy'
          },
          {
            id: 'c6_alg_q2',
            question: 'Evaluate 2a + 3b if a = 4 and b = 5:',
            options: ['17', '23', '24', '14'],
            correctIndex: 1,
            hint: '2(4) + 3(5) = 8 + 15.',
            explanation: '2(4) + 3(5) = 8 + 15 = 23.',
            difficulty: 'Easy'
          }
        ]
      },

      abacus: {
        pillar: 'abacus',
        pillarName: 'Abacus (Soroban)',
        tagline: 'Mental Flash Abacus (Anzan) Visualization Technique',
        iconName: 'Grid',
        flowchart: {
          title: 'How to Practice Mental Abacus (Anzan)',
          concept: 'Projecting a virtual Soroban inside your mind eye',
          realWorldExample: 'Example: Mental addition of 4 numbers without touching an abacus',
          nodes: [
            { id: '1', type: 'start', title: 'Close Eyes / Soft Focus', description: 'Picture an empty Soroban beam floating in front of your forehead.' },
            { id: '2', type: 'process', title: 'Project First Number as Beads', description: 'See the beads physically move up and down on the mental rods.' },
            { id: '3', type: 'process', title: 'Apply Finger Twitches in the Air', description: 'Micro-move your thumb and forefinger as if touching physical beads.' },
            { id: '4', type: 'process', title: 'Retain Bead Positions', description: 'Do not remember numbers as digits! Keep the image of the beads locked.' },
            { id: '5', type: 'output', title: 'Snapshot Readout', description: 'Read the mental beads from left to right as your final answer.' }
          ]
        },
        infographics: [
          {
            id: 'c6_ab_1',
            title: 'The Dual Hemisphere Brain Effect',
            subtitle: 'Why Anzan masters can calculate faster than electronic calculators',
            category: 'Cognitive Science',
            keyRule: 'Left brain handles mathematical logic; Right brain visualizes bead imagery',
            visualType: 'comparison',
            details: [
              { label: 'Normal Calculation', value: 'Uses left hemisphere only (linear digits, easily overloaded working memory)' },
              { label: 'Anzan Mental Abacus', value: 'Fuses right-brain photographic memory with left-brain arithmetic' }
            ],
            mnemonicOrTakeaway: 'Do not memorize the numbers: see the beads snap!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c6_ab_t1',
            title: 'The Phantom Finger Technique',
            tagline: 'Move your fingers in the air while visualizing',
            difficulty: 'Medium',
            howItWorks: [
              'When practicing mental math, pinch and flick your physical fingers.',
              'The motor cortex activates muscle memory that sharpens the mental image.',
              'Japanese and world champions all use air-flicking during competitions!'
            ],
            example: {
              question: 'Add 2 + 5 + 1 mentally',
              steps: [
                'Thumb flicks up 2 beads.',
                'Forefinger pinches down upper 5 bead.',
                'Thumb flicks up 1 more bead.',
                'Mental image shows 1 top bead + 3 bottom beads = 8.'
              ],
              answer: '8'
            },
            commonPitfall: 'Translating beads back to Arabic digits between every step.',
            timeSaved: 'Unlocks superhuman mental math speeds.'
          }
        ],
        quiz: [
          {
            id: 'c6_ab_q1',
            question: 'What is the Japanese term for mental calculation using an imagined Soroban in the mind?',
            options: ['Sensei', 'Anzan', 'Shodo', 'Sudoku'],
            correctIndex: 1,
            hint: 'Starts with the letter A.',
            explanation: 'Anzan (暗算) means mental calculation using the mental abacus image.',
            difficulty: 'Easy'
          },
          {
            id: 'c6_ab_q2',
            question: 'In mental abacus, what cognitive strategy prevents working memory overload?',
            options: [
              'Writing down intermediate digits on paper',
              'Visualizing beads as spatial pictures rather than abstract numbers',
              'Saying the numbers aloud as loud as possible',
              'Counting backward on toes'
            ],
            correctIndex: 1,
            hint: 'The right brain processes images much faster than numbers.',
            explanation: 'Visualizing spatial bead snapshots offloads verbal working memory to spatial memory.',
            difficulty: 'Medium'
          }
        ]
      },

      vedic_maths: {
        pillar: 'vedic_maths',
        pillarName: 'Vedic Maths',
        tagline: 'Sutra: Ekanyunena Purvena (Multiplication by 9, 99, 999...)',
        iconName: 'Flame',
        flowchart: {
          title: 'How to Multiply Any Number by 99 or 999 in Seconds',
          concept: 'Sutra: By One Less than the Previous One',
          realWorldExample: 'Example: 46 x 99',
          nodes: [
            { id: '1', type: 'start', title: 'Verify Multiplier', description: 'Multiplier is a series of 9s (99, two digits).' },
            { id: '2', type: 'process', title: 'Left Part: Subtract 1', description: 'Take 46 and subtract 1: 46 - 1 = 45. (Left part is 45).' },
            { id: '3', type: 'process', title: 'Right Part: Apply Nikhilam to 46', description: 'Subtract 46 from 100 (All from 9, last from 10): 9 - 4 = 5, 10 - 6 = 4. (Right part is 54).' },
            { id: '4', type: 'output', title: 'Concatenate Left and Right', description: 'Left: 45 | Right: 54 -> Answer is 4,554! 46 x 99 = 4,554.' }
          ]
        },
        infographics: [
          {
            id: 'c6_vm_1',
            title: 'Ekanyunena Purvena Matrix',
            subtitle: 'Multiplication by 9s broken down into 2 clean halves',
            category: 'Speed Multiplication',
            keyRule: 'Left = Number - 1; Right = Complement of number from 9s base',
            visualType: 'steps',
            details: [
              { label: '7 x 9', value: '(7-1) | (9-6) = 63' },
              { label: '38 x 99', value: '(38-1) | (9-3)(10-8) = 3762' },
              { label: '542 x 999', value: '(542-1) | (9-5)(9-4)(10-2) = 541,458' },
              { label: '8,214 x 9999', value: '8213 | (9-8)(9-2)(9-1)(10-4) = 82,131,786' }
            ],
            mnemonicOrTakeaway: 'Subtract one from the front, find the complement for the back!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c6_vm_t1',
            title: 'What If the Number Has Fewer Digits than 9s?',
            tagline: 'Pad with leading zeros to maintain perfection',
            difficulty: 'Medium',
            howItWorks: [
              'Multiply 7 x 99:',
              'Think of 7 as 07.',
              'Left part: 07 - 1 = 06.',
              'Right part: 9 - 0 = 9, 10 - 7 = 3 (93).',
              'Answer: 693!'
            ],
            example: {
              question: 'Calculate 24 x 999',
              steps: [
                'Write 24 as 024.',
                'Left: 024 - 1 = 023.',
                'Right: 9-0=9, 9-2=7, 10-4=6 (976).',
                'Result: 23,976.'
              ],
              answer: '23,976'
            },
            commonPitfall: 'Forgetting to subtract 0 from 9 for the leading position.',
            timeSaved: 'Turns an 8-line long multiplication into a 3-second mental step.'
          }
        ],
        quiz: [
          {
            id: 'c6_vm_q1',
            question: 'What is 53 x 99 using Ekanyunena Purvena?',
            options: ['5247', '5347', '5257', '5147'],
            correctIndex: 0,
            hint: 'Left: 53 - 1 = 52. Right: 9 - 5 = 4, 10 - 3 = 7.',
            explanation: 'Left is 52, right is 47 => 5,247.',
            difficulty: 'Easy'
          },
          {
            id: 'c6_vm_q2',
            question: 'Calculate 315 x 999 in your head:',
            options: ['314,685', '314,684', '315,685', '314,785'],
            correctIndex: 0,
            hint: '315 - 1 = 314. Complements: 9-3=6, 9-1=8, 10-5=5.',
            explanation: '314 | 685 = 314,685.',
            difficulty: 'Medium'
          }
        ]
      }
    }
  },

  7: {
    grade: 7,
    gradeTitle: 'Class 7: Linear Equations, Powers & Urdhva Tiryagbhyam',
    levelTier: 'Middle (Classes 6-8)',
    themeDescription: 'Exponents laws, solving linear equations with balancing, decimal Soroban arithmetic, and the universal Vedic Vertically & Crosswise algorithm.',
    pillars: {
      basic_maths: {
        pillar: 'basic_maths',
        pillarName: 'Basic Maths',
        tagline: 'Powers & Exponents, Percentages & Simple Interest',
        iconName: 'Calculator',
        flowchart: {
          title: 'How to Simplify Expressions with Laws of Exponents',
          concept: 'The Exponent Rules Decision Hierarchy',
          realWorldExample: 'Example: Simplify (2^3 x 2^4) / 2^5',
          nodes: [
            { id: '1', type: 'start', title: 'Check the Bases', description: 'Are the bases identical? (Base is 2 for all terms).' },
            { id: '2', type: 'process', title: 'Product Law (Multiply Same Bases)', description: 'When multiplying: add exponents! 2^3 x 2^4 = 2^(3+4) = 2^7.' },
            { id: '3', type: 'process', title: 'Quotient Law (Divide Same Bases)', description: 'When dividing: subtract exponents! 2^7 / 2^5 = 2^(7-5) = 2^2.' },
            { id: '4', type: 'process', title: 'Evaluate Numeric Value', description: '2^2 = 2 x 2 = 4.' },
            { id: '5', type: 'output', title: 'Final Answer', description: 'The simplified result is 4.' }
          ]
        },
        infographics: [
          {
            id: 'c7_bm_1',
            title: 'The 6 Immutable Laws of Exponents',
            subtitle: 'The master cheatsheet of powers',
            category: 'Exponents',
            keyRule: 'Rules only apply when bases match or exponents match',
            visualType: 'diagram',
            details: [
              { label: 'Product Law', value: 'a^m x a^n = a^(m+n)' },
              { label: 'Quotient Law', value: 'a^m / a^n = a^(m-n)' },
              { label: 'Power of a Power', value: '(a^m)^n = a^(m x n)' },
              { label: 'Zero Power Law', value: 'a^0 = 1 (for any a != 0)' },
              { label: 'Negative Exponent', value: 'a^(-n) = 1 / (a^n)' },
              { label: 'Distributed Power', value: '(a x b)^n = a^n x b^n' }
            ],
            mnemonicOrTakeaway: 'Multiply bases -> ADD powers! Power over power -> MULTIPLY powers!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c7_bm_t1',
            title: 'Simple Interest 10% Benchmark Hack',
            tagline: 'Find Simple Interest (PRT/100) mentally in 5 seconds',
            difficulty: 'Medium',
            howItWorks: [
              'To find interest on $4,000 at 5% for 3 years:',
              'Step 1: 10% of 4000 = 400. So 5% is half = $200 per year.',
              'Step 2: Multiply by 3 years: 200 x 3 = $600 interest!'
            ],
            example: {
              question: 'Find SI for P=$6,000, R=8%, T=2 years',
              steps: [
                '1% of 6000 is 60.',
                '8% is 60 x 8 = 480 per year.',
                'For 2 years: 480 x 2 = $960.'
              ],
              answer: '$960'
            },
            commonPitfall: 'Forgetting to divide by 100 when using the traditional formula.',
            timeSaved: 'Solves exam interest questions without manual scrap work.'
          }
        ],
        quiz: [
          {
            id: 'c7_bm_q1',
            question: 'Simplify: (3^4 x 3^2) / 3^3',
            options: ['3^3 (27)', '3^2 (9)', '3^1 (3)', '3^9'],
            correctIndex: 0,
            hint: '4 + 2 - 3 = ?',
            explanation: '3^(4+2-3) = 3^3 = 27.',
            difficulty: 'Medium'
          },
          {
            id: 'c7_bm_q2',
            question: 'What is any non-zero number raised to the power 0 (e.g. 527^0)?',
            options: ['0', '1', '527', 'Undefined'],
            correctIndex: 1,
            hint: 'a^0 is always unity.',
            explanation: 'By exponent quotient laws a^m / a^m = a^(m-m) = a^0 = 1.',
            difficulty: 'Easy'
          }
        ]
      },

      algebra: {
        pillar: 'algebra',
        pillarName: 'Algebra & Patterns',
        tagline: 'Linear Equations in 1 Variable & Distributive Law',
        iconName: 'Sparkles',
        flowchart: {
          title: 'How to Solve Linear Equations with Brackets and Fractions',
          concept: 'Step-by-step pipeline for isolating the unknown variable',
          realWorldExample: 'Example: 3(x - 2) + 4 = 19',
          nodes: [
            { id: '1', type: 'start', title: 'Expand Brackets (Distributive Law)', description: 'Multiply 3 across (x - 2): 3x - 6 + 4 = 19.' },
            { id: '2', type: 'process', title: 'Combine Like Terms on LHS', description: '-6 + 4 = -2. Equation becomes: 3x - 2 = 19.' },
            { id: '3', type: 'process', title: 'Transpose Constants to RHS', description: 'Add 2 to both sides: 3x = 19 + 2 = 21.' },
            { id: '4', type: 'process', title: 'Isolate Variable (Divide by Coefficient)', description: 'Divide both sides by 3: x = 21 / 3.' },
            { id: '5', type: 'output', title: 'Check Solution in Original', description: 'x = 7. Verification: 3(7 - 2) + 4 = 3(5) + 4 = 19!' }
          ]
        },
        infographics: [
          {
            id: 'c7_alg_1',
            title: 'Distributive Property Rainbow',
            subtitle: 'a(b + c) = ab + ac',
            category: 'Algebra Rules',
            keyRule: 'The term outside multiplies EVERY term inside the parentheses',
            visualType: 'diagram',
            details: [
              { label: '2(x + 5)', value: '2x + 10' },
              { label: '-3(2x - 4)', value: '-6x + 12 (Watch the double negative!)' },
              { label: 'x(x + 7)', value: 'x^2 + 7x' }
            ],
            mnemonicOrTakeaway: 'The outside host must shake hands with every single guest inside the room!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c7_alg_t1',
            title: 'Cross-Multiplication for Fractional Equations',
            tagline: 'When two fractions are set equal: a/b = c/d => ad = bc',
            difficulty: 'Medium',
            howItWorks: [
              'If (2x + 1) / 3 = 5 / 2:',
              'Cross multiply: 2(2x + 1) = 3(5).',
              '4x + 2 = 15.',
              '4x = 13 => x = 13/4.'
            ],
            example: {
              question: 'Solve: x / 5 = 6 / 15',
              steps: [
                '15x = 5 x 6 = 30.',
                'x = 30 / 15 = 2.'
              ],
              answer: 'x = 2'
            },
            commonPitfall: 'Cross-multiplying when there is an extra term outside the fractions.',
            timeSaved: 'Clears fractions in a single stroke.'
          }
        ],
        quiz: [
          {
            id: 'c7_alg_q1',
            question: 'Solve for x: 4(x - 3) = 20',
            options: ['5', '8', '7', '2'],
            correctIndex: 1,
            hint: 'Divide by 4 first: x - 3 = 5, then add 3.',
            explanation: '4(x - 3) = 20 => x - 3 = 5 => x = 8.',
            difficulty: 'Easy'
          },
          {
            id: 'c7_alg_q2',
            question: 'Solve: 5x + 3 = 2x + 15',
            options: ['3', '4', '5', '6'],
            correctIndex: 1,
            hint: 'Transpose 2x to left (5x-2x) and 3 to right (15-3).',
            explanation: '3x = 12 => x = 4.',
            difficulty: 'Medium'
          }
        ]
      },

      abacus: {
        pillar: 'abacus',
        pillarName: 'Abacus (Soroban)',
        tagline: 'Decimal Arithmetic & Multi-Digit Soroban Positioning',
        iconName: 'Grid',
        flowchart: {
          title: 'How to Set and Calculate Decimals on Soroban',
          concept: 'Using the Unit Point Dot (Reckoning dot) as the decimal anchor',
          realWorldExample: 'Example: Calculate 14.5 + 3.2 on Soroban',
          nodes: [
            { id: '1', type: 'start', title: 'Locate Unit Dot', description: 'Identify the engraved reckoning white dot on the center beam as the decimal point (.)' },
            { id: '2', type: 'process', title: 'Set First Number (14.5)', description: 'Tens rod: 1 | Units rod: 4 | Tenths rod (right of dot): 5 (upper bead down).' },
            { id: '3', type: 'process', title: 'Add Integer Part (+3)', description: 'Add 3 to the Units rod (now 4 + 3 = 7).' },
            { id: '4', type: 'process', title: 'Add Decimal Part (+0.2)', description: 'Push 2 lower beads UP on the Tenths rod (5 + 2 = 7).' },
            { id: '5', type: 'output', title: 'Read the Decimals', description: 'Tens: 1, Units: 7, Tenths: 7 -> Answer is 17.7!' }
          ]
        },
        infographics: [
          {
            id: 'c7_ab_1',
            title: 'Soroban Unit Dots & Decimals',
            subtitle: 'The white unit markers on the wooden frame',
            category: 'Decimal Abacus',
            keyRule: 'Rods to the left of the dot are 1s, 10s, 100s; rods to the right are 0.1s, 0.01s',
            visualType: 'steps',
            details: [
              { label: 'Hundreds Rod (..)', value: 'Values x 100' },
              { label: 'Tens Rod (.)', value: 'Values x 10' },
              { label: 'Unit Rod [DOT]', value: 'Values x 1 (Decimal Point)' },
              { label: 'Tenths Rod', value: 'Values x 0.1' },
              { label: 'Hundredths Rod', value: 'Values x 0.01' }
            ],
            mnemonicOrTakeaway: 'The white dot anchors reality: left goes big, right goes tiny!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c7_ab_t1',
            title: 'Floating Decimal Technique',
            tagline: 'Calculate as pure whole numbers, insert decimal point at the very end',
            difficulty: 'Medium',
            howItWorks: [
              'To multiply 2.4 x 1.3 on abacus:',
              'Count decimal places: 1 + 1 = 2 decimal places.',
              'Multiply 24 x 13 as whole numbers on abacus = 312.',
              'Count back 2 places: 3.12!'
            ],
            example: {
              question: 'Calculate 0.6 x 0.7',
              steps: [
                'Multiply 6 x 7 = 42.',
                '1 decimal place + 1 decimal place = 2 decimals.',
                'Move 2 places left: 0.42.'
              ],
              answer: '0.42'
            },
            commonPitfall: 'Trying to manipulate fractions and decimals directly during rapid bead movements.',
            timeSaved: 'Prevents rod alignment confusion.'
          }
        ],
        quiz: [
          {
            id: 'c7_ab_q1',
            question: 'What is the white dot on the reckoning bar of a Soroban used for?',
            options: [
              'Decoration only',
              'Marker for the unit (ones) rod and decimal point separator',
              'Indicates the 1000s rod only',
              'Shows where to rest your thumb'
            ],
            correctIndex: 1,
            hint: 'It anchors the place value coordinate system.',
            explanation: 'The unit dot designates the units (ones) place, anchoring integers to the left and decimals to the right.',
            difficulty: 'Easy'
          },
          {
            id: 'c7_ab_q2',
            question: 'If rod to the right of the unit dot has the upper bead down, what decimal value does it represent?',
            options: ['0.05', '0.5', '5.0', '0.1'],
            correctIndex: 1,
            hint: 'First rod to the right of the decimal point is tenths (0.1). Upper bead is 5.',
            explanation: '5 tenths = 5 x 0.1 = 0.5.',
            difficulty: 'Medium'
          }
        ]
      },

      vedic_maths: {
        pillar: 'vedic_maths',
        pillarName: 'Vedic Maths',
        tagline: 'Sutra: Urdhva Tiryagbhyam (Vertically & Crosswise Multiplication)',
        iconName: 'Flame',
        flowchart: {
          title: 'How to Multiply Any 2-Digit Numbers in One Single Line',
          concept: 'Sutra: Vertically and Crosswise (The Universal Multiplication Algorithm)',
          realWorldExample: 'Example: 23 x 14',
          nodes: [
            { id: '1', type: 'start', title: 'Write Numbers Vertically', description: 'Write 23 above 14. Step count = 2n - 1 = 3 steps.' },
            { id: '2', type: 'process', title: 'Step 1: Vertical Right (Units)', description: 'Multiply right digits: 3 x 4 = 12. Write 2, carry 1.' },
            { id: '3', type: 'process', title: 'Step 2: Crosswise & Add (Middle)', description: 'Multiply crosswise: (2 x 4) + (3 x 1) = 8 + 3 = 11. Add carried 1: 11 + 1 = 12. Write 2, carry 1.' },
            { id: '4', type: 'process', title: 'Step 3: Vertical Left (Tens)', description: 'Multiply left digits: 2 x 1 = 2. Add carried 1: 2 + 1 = 3. Write 3.' },
            { id: '5', type: 'output', title: 'Assemble Digits', description: '3 | 2 | 2 -> 322! 23 x 14 = 322 in a single line.' }
          ]
        },
        infographics: [
          {
            id: 'c7_vm_1',
            title: 'Urdhva Tiryagbhyam 3-Stage Diagram',
            subtitle: 'The universal geometric arrow pattern for 2-digit multiplication',
            category: 'Universal Vedic Sutra',
            keyRule: 'Vertical -> Crosswise -> Vertical',
            visualType: 'diagram',
            details: [
              { label: 'Step 1: [ . | . ]', value: 'Multiply units digits straight down (a1 x b1)' },
              { label: 'Step 2: [ X ]', value: 'Cross-multiply tens and units and sum: (a0 x b1) + (a1 x b0)' },
              { label: 'Step 3: [ | . . ]', value: 'Multiply tens digits straight down (a0 x b0)' }
            ],
            mnemonicOrTakeaway: 'Straight down, cross like an X, straight down! Done in 1 line!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c7_vm_t1',
            title: 'Mental Crosswise Summation',
            tagline: 'Add the cross products simultaneously in your head',
            difficulty: 'Medium',
            howItWorks: [
              'In 31 x 21:',
              'Units: 1 x 1 = 1.',
              'Cross: (3 x 1) + (1 x 2) = 3 + 2 = 5.',
              'Tens: 3 x 2 = 6.',
              'Read immediately: 651!'
            ],
            example: {
              question: 'Calculate 21 x 32',
              steps: [
                'Right vertical: 1 x 2 = 2.',
                'Crosswise: (2 x 2) + (1 x 3) = 4 + 3 = 7.',
                'Left vertical: 2 x 3 = 6.',
                'Assemble: 672.'
              ],
              answer: '672'
            },
            commonPitfall: 'Forgetting to include the carried over tens digit in the crosswise sum.',
            timeSaved: 'Eliminates 3 lines of traditional school multiplication.'
          }
        ],
        quiz: [
          {
            id: 'c7_vm_q1',
            question: 'What is 31 x 23 using Urdhva Tiryagbhyam?',
            options: ['713', '723', '613', '733'],
            correctIndex: 0,
            hint: 'Units: 1x3=3. Cross: (3x3)+(1x2)=9+2=11 (1, carry 1). Tens: (3x2)+1=7.',
            explanation: 'Units: 3. Middle: 9 + 2 = 11 (carry 1). Left: 3 x 2 + 1 = 7. Result: 713.',
            difficulty: 'Medium'
          },
          {
            id: 'c7_vm_q2',
            question: 'What does the Sanskrit term "Urdhva Tiryagbhyam" translate to in English?',
            options: [
              'All from nine and last from ten',
              'Vertically and Crosswise',
              'By one more than the previous',
              'Transpose and apply'
            ],
            correctIndex: 1,
            hint: 'Urdhva = vertical, Tiryag = slanting/crosswise.',
            explanation: 'Urdhva means upright/vertically, and Tiryagbhyam means obliquely or crosswise.',
            difficulty: 'Easy'
          }
        ]
      }
    }
  },

  8: {
    grade: 8,
    gradeTitle: 'Class 8: Algebraic Identities & Duplex Squaring',
    levelTier: 'Middle (Classes 6-8)',
    themeDescription: 'Mastering $(a+b)^2, (a-b)^2, a^2-b^2$ identities, factoring quadratics, Abacus square root extraction, and the Vedic Duplex (Dwandwa Yoga) squaring method.',
    pillars: {
      basic_maths: {
        pillar: 'basic_maths',
        pillarName: 'Basic Maths',
        tagline: 'Squares & Roots, Cubes, Direct & Inverse Proportions',
        iconName: 'Calculator',
        flowchart: {
          title: 'How to Determine if a Proportion is Direct or Inverse',
          concept: 'Detecting if two quantities grow together or move in opposite directions',
          realWorldExample: 'Example: More workers taking fewer days to build a wall',
          nodes: [
            { id: '1', type: 'start', title: 'Identify the Two Variables', description: 'Variables: Number of workers (x) and Days to complete (y).' },
            { id: '2', type: 'decision', title: 'When x increases, does y increase or decrease?', description: 'If you hire MORE workers, will the job take MORE or FEWER days?' },
            { id: '3', type: 'process', title: 'Fewer Days -> Inverse Proportion', description: 'When one rises and the other falls: Product is constant (x1 . y1 = x2 . y2).' },
            { id: '4', type: 'process', title: 'Setup Constant Product Equation', description: 'Example: 6 workers take 10 days (6 x 10 = 60). How long do 12 workers take? 12 x y = 60.' },
            { id: '5', type: 'output', title: 'Solve for Unknown', description: 'y = 60 / 12 = 5 days.' }
          ]
        },
        infographics: [
          {
            id: 'c8_bm_1',
            title: 'Direct vs Inverse Variation',
            subtitle: 'The two foundational proportional relationships in science & math',
            category: 'Proportions',
            keyRule: 'Direct: Ratio is constant (y/x = k); Inverse: Product is constant (x . y = k)',
            visualType: 'comparison',
            details: [
              { label: 'Direct Variation', value: 'Distance vs Time at constant speed; Cost vs Quantity of apples (More apples = More cost)' },
              { label: 'Inverse Variation', value: 'Speed vs Time for fixed distance; Workers vs Time to finish a project (More speed = Less time)' }
            ],
            mnemonicOrTakeaway: 'Direct: divide to check k! Inverse: multiply to check k!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c8_bm_t1',
            title: 'Unit Digit Test for Perfect Square Roots',
            tagline: 'Instantly find square roots of 4-digit numbers',
            difficulty: 'Medium',
            howItWorks: [
              'To find sqrt(7744):',
              'Step 1: Last digit is 4. So the unit digit of root must be 2 or 8.',
              'Step 2: Ignore last 2 digits, look at 77.',
              'Step 3: 8^2 = 64 <= 77 < 9^2 = 81. Tens digit is 8.',
              'Step 4: 8 x 9 = 72. Since 77 > 72, pick the BIGGER unit digit (8).',
              'Square root is 88!'
            ],
            example: {
              question: 'Find square root of 5184',
              steps: [
                'Ends in 4 -> unit digit is 2 or 8.',
                '51 lies between 7^2 (49) and 8^2 (64) -> tens digit is 7.',
                'Compare: 7 x 8 = 56. 51 < 56, so pick smaller unit digit (2).',
                'Square root = 72.'
              ],
              answer: '72'
            },
            commonPitfall: 'Comparing with 7^2 instead of 7 x (7+1).',
            timeSaved: 'Finds square roots in 4 seconds without long division.'
          }
        ],
        quiz: [
          {
            id: 'c8_bm_q1',
            question: 'If 8 men can build a wall in 15 days, how many days will 12 men take (Inverse Proportion)?',
            options: ['10 days', '12 days', '20 days', '22.5 days'],
            correctIndex: 0,
            hint: '8 x 15 = 12 x days. Total work = 120 man-days.',
            explanation: '8 x 15 = 120. 120 / 12 = 10 days.',
            difficulty: 'Medium'
          },
          {
            id: 'c8_bm_q2',
            question: 'What is the square root of 7056 using the unit digit method?',
            options: ['74', '84', '86', '94'],
            correctIndex: 1,
            hint: 'Ends in 6 -> 4 or 6. 70 lies between 8^2=64 and 9^2=81. 8x9=72. 70 < 72.',
            explanation: 'Tens digit is 8. Since 70 < 72, unit digit is 4. Sqrt = 84.',
            difficulty: 'Medium'
          }
        ]
      },

      algebra: {
        pillar: 'algebra',
        pillarName: 'Algebra & Patterns',
        tagline: 'Standard Algebraic Identities & Factoring Quadratics',
        iconName: 'Sparkles',
        flowchart: {
          title: 'How to Factor a Quadratic Expression (Splitting the Middle Term)',
          concept: 'Factoring ax^2 + bx + c into (px + q)(rx + s)',
          realWorldExample: 'Example: Factor x^2 + 7x + 12',
          nodes: [
            { id: '1', type: 'start', title: 'Identify Coefficients', description: 'In x^2 + 7x + 12: a = 1, b = 7, c = 12.' },
            { id: '2', type: 'process', title: 'Find Product and Sum', description: 'Product a x c = 1 x 12 = 12. Sum b = 7.' },
            { id: '3', type: 'process', title: 'Search Factor Pairs of 12', description: 'Pairs: (1, 12), (2, 6), (3, 4). Which pair sums to 7? 3 + 4 = 7!' },
            { id: '4', type: 'process', title: 'Split Middle Term', description: 'Rewrite 7x as 3x + 4x: x^2 + 3x + 4x + 12.' },
            { id: '5', type: 'process', title: 'Factor by Grouping', description: 'x(x + 3) + 4(x + 3).' },
            { id: '6', type: 'output', title: 'Extract Common Binomial', description: '(x + 3)(x + 4). Factoring complete!' }
          ]
        },
        infographics: [
          {
            id: 'c8_alg_1',
            title: 'The Big 3 Algebraic Identities (Geometric Proof)',
            subtitle: 'Visual area model for polynomial expansions',
            category: 'Identities',
            keyRule: 'Represent expressions as areas of geometric squares and rectangles',
            visualType: 'formula',
            details: [
              { label: 'Identity 1', value: '(a + b)^2 = a^2 + 2ab + b^2' },
              { label: 'Identity 2', value: '(a - b)^2 = a^2 - 2ab + b^2' },
              { label: 'Identity 3 (Difference of Squares)', value: 'a^2 - b^2 = (a + b)(a - b)' },
              { label: 'Identity 4', value: '(x + a)(x + b) = x^2 + (a + b)x + ab' }
            ],
            mnemonicOrTakeaway: 'Never forget the middle term! (a+b)^2 is NOT a^2 + b^2!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c8_alg_t1',
            title: 'Difference of Squares Mental Arithmetic',
            tagline: 'Multiply numbers equidistant from a round number instantly',
            difficulty: 'Easy',
            howItWorks: [
              'Multiply 52 x 48:',
              '52 is 50 + 2, 48 is 50 - 2.',
              'Formula: (50 + 2)(50 - 2) = 50^2 - 2^2 = 2500 - 4 = 2496!'
            ],
            example: {
              question: 'Calculate 33 x 27 mentally',
              steps: [
                'Center is 30. Distance is 3.',
                '(30 + 3)(30 - 3) = 30^2 - 3^2.',
                '900 - 9 = 891.'
              ],
              answer: '891'
            },
            commonPitfall: 'Using this when the numbers are not symmetrically spaced.',
            timeSaved: 'Solves complex multiplications in 2 seconds.'
          }
        ],
        quiz: [
          {
            id: 'c8_alg_q1',
            question: 'Expand: (2x + 3y)^2',
            options: ['4x^2 + 9y^2', '4x^2 + 6xy + 9y^2', '4x^2 + 12xy + 9y^2', '2x^2 + 12xy + 3y^2'],
            correctIndex: 2,
            hint: '(a+b)^2 = a^2 + 2ab + b^2. Here 2ab = 2(2x)(3y) = 12xy.',
            explanation: '(2x)^2 + 2(2x)(3y) + (3y)^2 = 4x^2 + 12xy + 9y^2.',
            difficulty: 'Medium'
          },
          {
            id: 'c8_alg_q2',
            question: 'What is 105 x 95 calculated using the identity a^2 - b^2?',
            options: ['9975', '9985', '9925', '10075'],
            correctIndex: 0,
            hint: '(100 + 5)(100 - 5) = 100^2 - 5^2 = 10000 - 25.',
            explanation: '10,000 - 25 = 9,975.',
            difficulty: 'Easy'
          }
        ]
      },

      abacus: {
        pillar: 'abacus',
        pillarName: 'Abacus (Soroban)',
        tagline: 'Square Root Extraction via Traditional Soroban Pairing',
        iconName: 'Grid',
        flowchart: {
          title: 'How to Extract Square Roots on Soroban',
          concept: 'Digit-grouping and odd number subtraction method',
          realWorldExample: 'Example: Find sqrt(144) on Soroban',
          nodes: [
            { id: '1', type: 'start', title: 'Group Digits in Pairs', description: 'Group 144 from right: (1) and (44). There are 2 groups, so answer has 2 digits.' },
            { id: '2', type: 'process', title: 'First Group (1)', description: 'Largest square <= 1 is 1^2 = 1. First root digit is 1. Subtract 1 on radicand rod.' },
            { id: '3', type: 'process', title: 'Bring Down Next Pair', description: 'Remaining is 044.' },
            { id: '4', type: 'process', title: 'Double Current Root', description: 'Double 1 -> 2. Trial divisor is 2x.' },
            { id: '5', type: 'process', title: 'Test Next Digit', description: '22 x 2 = 44. Subtract 44 -> Remainder is 0.' },
            { id: '6', type: 'output', title: 'Result', description: 'Root is 12! sqrt(144) = 12.' }
          ]
        },
        infographics: [
          {
            id: 'c8_ab_1',
            title: 'Soroban Subtraction of Consecutive Odds',
            subtitle: 'The ancient algorithmic proof that every square is a sum of odds',
            category: 'Square Root Theorem',
            keyRule: 'n^2 = 1 + 3 + 5 + ... + (2n - 1)',
            visualType: 'steps',
            details: [
              { label: 'Square of 1', value: '1 (1 odd)' },
              { label: 'Square of 2', value: '1 + 3 = 4 (2 odds)' },
              { label: 'Square of 3', value: '1 + 3 + 5 = 9 (3 odds)' },
              { label: 'Square of 4', value: '1 + 3 + 5 + 7 = 16 (4 odds)' }
            ],
            mnemonicOrTakeaway: 'Subtract consecutive odd numbers on Soroban; count of subtractions is the exact square root!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c8_ab_t1',
            title: 'The Odd Number Subtraction Speed Drill',
            tagline: 'Find square roots of numbers under 100 without memorization',
            difficulty: 'Medium',
            howItWorks: [
              'To find sqrt(49):',
              '49 - 1 = 48 (1st)',
              '48 - 3 = 45 (2nd)',
              '45 - 5 = 40 (3rd)',
              '40 - 7 = 33 (4th)',
              '33 - 9 = 24 (5th)',
              '24 - 11 = 13 (6th)',
              '13 - 13 = 0 (7th)! Took exactly 7 subtractions -> sqrt is 7!'
            ],
            example: {
              question: 'Find sqrt(25) by odd subtraction',
              steps: [
                '25 - 1 = 24',
                '24 - 3 = 21',
                '21 - 5 = 16',
                '16 - 7 = 9',
                '9 - 9 = 0. Count = 5.'
              ],
              answer: '5'
            },
            commonPitfall: 'Skipping an odd number or subtracting even numbers.',
            timeSaved: 'Provides deep tactile proof of root calculation.'
          }
        ],
        quiz: [
          {
            id: 'c8_ab_q1',
            question: 'According to the odd number theorem used on abacus, 1 + 3 + 5 + 7 + 9 equals:',
            options: ['20', '25', '30', '36'],
            correctIndex: 1,
            hint: 'Count how many odd numbers are being added: 5 odds. 5^2 = ?',
            explanation: 'Sum of first 5 odd numbers = 5^2 = 25.',
            difficulty: 'Easy'
          },
          {
            id: 'c8_ab_q2',
            question: 'How many digits will the square root of a 4-digit number have?',
            options: ['1', '2', '3', '4'],
            correctIndex: 1,
            hint: 'Group the 4 digits in pairs from right: 2 pairs.',
            explanation: 'A 4-digit number groups into 2 pairs, producing a 2-digit square root.',
            difficulty: 'Easy'
          }
        ]
      },

      vedic_maths: {
        pillar: 'vedic_maths',
        pillarName: 'Vedic Maths',
        tagline: 'Sutra: Dwandwa Yoga (The Duplex Method for Instant Squaring)',
        iconName: 'Flame',
        flowchart: {
          title: 'How to Square Any 2-Digit Number Using Duplex (Dwandwa)',
          concept: 'Duplex rules: D(a) = a^2, D(ab) = 2ab',
          realWorldExample: 'Example: Square 34^2',
          nodes: [
            { id: '1', type: 'start', title: 'Write Partition Steps', description: 'For 2-digit number ab: Steps are D(a) | D(ab) | D(b).' },
            { id: '2', type: 'process', title: 'Step 1: Duplex of Units (b)', description: 'D(4) = 4^2 = 16. Write 6, carry 1.' },
            { id: '3', type: 'process', title: 'Step 2: Duplex of Both Digits (ab)', description: 'D(34) = 2 x 3 x 4 = 24. Add carried 1: 24 + 1 = 25. Write 5, carry 2.' },
            { id: '4', type: 'process', title: 'Step 3: Duplex of Tens (a)', description: 'D(3) = 3^2 = 9. Add carried 2: 9 + 2 = 11. Write 11.' },
            { id: '5', type: 'output', title: 'Assemble Digits', description: '11 | 5 | 6 -> 1,156! 34^2 = 1,156 in 2 seconds.' }
          ]
        },
        infographics: [
          {
            id: 'c8_vm_1',
            title: 'Dwandwa Yoga (Duplex) Rules Master Table',
            subtitle: 'The single most versatile squaring technique in mathematics',
            category: 'Duplex Method',
            keyRule: 'D of single digit is square; D of pair is twice their product',
            visualType: 'steps',
            details: [
              { label: 'Single digit: D(a)', value: 'a^2 (e.g. D(7) = 49)' },
              { label: '2 digits: D(ab)', value: '2 x a x b (e.g. D(35) = 2 x 3 x 5 = 30)' },
              { label: '3 digits: D(abc)', value: '2(ac) + b^2 (e.g. D(234) = 2(2x4) + 3^2 = 16 + 9 = 25)' }
            ],
            mnemonicOrTakeaway: 'Single digit squares itself, partners multiply and double!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c8_vm_t1',
            title: 'Squaring Numbers Near 50 in 1 Second',
            tagline: 'Special Vedic corollary for numbers 41 to 59',
            difficulty: 'Easy',
            howItWorks: [
              'Square 54:',
              'Difference from 50 is +4.',
              'Left part: 25 + 4 = 29.',
              'Right part: 4^2 = 16.',
              'Answer: 2,916!'
            ],
            example: {
              question: 'Calculate 47^2 mentally',
              steps: [
                'Difference from 50: -3.',
                'Left part: 25 - 3 = 22.',
                'Right part: (-3)^2 = 09.',
                'Combine: 2,209.'
              ],
              answer: '2,209'
            },
            commonPitfall: 'Writing 9 instead of two-digit 09 for the right part.',
            timeSaved: 'Instant mental square in under 1 second.'
          }
        ],
        quiz: [
          {
            id: 'c8_vm_q1',
            question: 'What is 32^2 using the Duplex method?',
            options: ['1024', '1014', '984', '1044'],
            correctIndex: 0,
            hint: 'D(3) | D(32) | D(2) => 9 | 2(3)(2)=12 | 4 => 9 | 12 | 4 => 1024.',
            explanation: '4 on right, 12 in middle (write 2, carry 1), 9 + 1 = 10 on left => 1,024.',
            difficulty: 'Medium'
          },
          {
            id: 'c8_vm_q2',
            question: 'Using the near-50 trick, what is 56^2?',
            options: ['3036', '3136', '3126', '3236'],
            correctIndex: 1,
            hint: '25 + 6 = 31 on left, 6^2 = 36 on right.',
            explanation: '25 + 6 = 31 | 6^2 = 36 => 3,136.',
            difficulty: 'Easy'
          }
        ]
      }
    }
  }
};
