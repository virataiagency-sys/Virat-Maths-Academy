import { GradeCurriculum } from '../../types/curriculum';

export const primaryGrades: Record<1 | 2 | 3 | 4 | 5, GradeCurriculum> = {
  1: {
    grade: 1,
    gradeTitle: 'Class 1: Foundations of Numbers & Shapes',
    levelTier: 'Primary (Classes 1-5)',
    themeDescription: 'Building joyful number sense, tactile counting, single-rod Soroban bead awareness, and friendly bonds of 10.',
    pillars: {
      basic_maths: {
        pillar: 'basic_maths',
        pillarName: 'Basic Maths',
        tagline: 'Numbers 1-20, Addition, Subtraction & 2D Shapes',
        iconName: 'Calculator',
        flowchart: {
          title: 'How to Solve: Adding Two Numbers within 20',
          concept: 'Step-by-step counting on from the bigger number',
          realWorldExample: 'Example: 7 + 5',
          nodes: [
            { id: '1', type: 'start', title: 'Start Addition', description: 'Look at both numbers: 7 and 5.' },
            { id: '2', type: 'process', title: 'Find the Larger Number', description: 'Identify the bigger number: 7 is larger than 5.' },
            { id: '3', type: 'process', title: 'Keep Bigger Number in Mind', description: 'Lock "7" in your head. Do not count from 1!' },
            { id: '4', type: 'process', title: 'Open Fingers for Smaller Number', description: 'Show 5 fingers on your hand.' },
            { id: '5', type: 'process', title: 'Count Forward', description: 'Count forward from 7: 8, 9, 10, 11, 12.' },
            { id: '6', type: 'output', title: 'Final Sum', description: 'You landed on 12! So, 7 + 5 = 12.' }
          ]
        },
        infographics: [
          {
            id: 'c1_bm_1',
            title: 'Number Bonds to 10',
            subtitle: 'Pairs of numbers that make a full ten',
            category: 'Addition Mastery',
            keyRule: 'Any number plus its bond partner always totals 10',
            visualType: 'diagram',
            details: [
              { label: '1 + 9 = 10', value: 'One and Nine shine!' },
              { label: '2 + 8 = 10', value: 'Two and Eight skate!' },
              { label: '3 + 7 = 10', value: 'Three and Seven heaven!' },
              { label: '4 + 6 = 10', value: 'Four and Six mix!' },
              { label: '5 + 5 = 10', value: 'Five and Five high five!' }
            ],
            mnemonicOrTakeaway: 'Memorize these 5 pairs to make mental math lightning fast!'
          },
          {
            id: 'c1_bm_2',
            title: '2D Shape Explorer',
            subtitle: 'Sides and corners of simple plane figures',
            category: 'Geometry',
            keyRule: 'Corners are where two straight sides meet',
            visualType: 'steps',
            details: [
              { label: 'Circle', value: '0 straight sides, 0 corners (Smooth curve)' },
              { label: 'Triangle', value: '3 sides, 3 sharp corners' },
              { label: 'Square', value: '4 equal sides, 4 square corners' },
              { label: 'Rectangle', value: '4 sides (opposite equal), 4 corners' }
            ],
            mnemonicOrTakeaway: 'A circle rolls, a triangle points, a square stands proud!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c1_bm_t1',
            title: 'The Count-On Rocket',
            tagline: 'Never count from 1 when adding!',
            difficulty: 'Easy',
            howItWorks: [
              'Circle the bigger number first.',
              'Put the bigger number in your pocket or head.',
              'Tap your fingers only for the second smaller number.'
            ],
            example: {
              question: 'Calculate 3 + 9 mentally',
              steps: [
                'Bigger number is 9. Hold 9 in mind.',
                'Count forward 3 steps: 10, 11, 12.',
                'Answer is 12!'
              ],
              answer: '12'
            },
            commonPitfall: 'Counting 1, 2, 3... 4, 5, 6, 7, 8, 9, 10, 11, 12 wastes time and leads to miscounts.',
            timeSaved: 'Saves 10 seconds per calculation.'
          }
        ],
        quiz: [
          {
            id: 'c1_bm_q1',
            question: 'What is 8 + 6 using the count-on strategy?',
            options: ['13', '14', '15', '12'],
            correctIndex: 1,
            hint: 'Start at 8 and count 6 numbers forward: 9, 10, 11, 12, 13, 14.',
            explanation: '8 + 6 = 14. 8 + 2 gives 10, and 4 more gives 14.',
            difficulty: 'Easy'
          },
          {
            id: 'c1_bm_q2',
            question: 'Which shape has 3 sides and 3 corners?',
            options: ['Square', 'Circle', 'Triangle', 'Rectangle'],
            correctIndex: 2,
            hint: 'Think of a slice of pizza or a musical triangle!',
            explanation: 'A triangle always has exactly 3 straight edges and 3 corners.',
            difficulty: 'Easy'
          },
          {
            id: 'c1_bm_q3',
            question: 'What number makes 10 with 4? (4 + ? = 10)',
            options: ['5', '6', '7', '8'],
            correctIndex: 1,
            hint: 'Four and Six mix to make ten!',
            explanation: '4 + 6 = 10. 6 is the number bond partner of 4.',
            difficulty: 'Easy'
          }
        ]
      },

      algebra: {
        pillar: 'algebra',
        pillarName: 'Algebra & Patterns',
        tagline: 'Visual Patterns, Missing Values & Mystery Boxes',
        iconName: 'Sparkles',
        flowchart: {
          title: 'How to Solve: Missing Number Mystery Box',
          concept: 'Finding the hidden number in [ ? ] + 3 = 8',
          realWorldExample: 'Solve: ? + 3 = 8',
          nodes: [
            { id: '1', type: 'start', title: 'Look at the Mystery Box', description: 'We have: ? + 3 = 8' },
            { id: '2', type: 'process', title: 'Understand the Goal', description: 'A hidden number plus 3 gave us 8 total candies.' },
            { id: '3', type: 'decision', title: 'Use Reverse Action', description: 'What is the opposite of adding 3? Subtracting 3!' },
            { id: '4', type: 'process', title: 'Count Backwards', description: 'Start at 8 and step back 3: 7, 6, 5.' },
            { id: '5', type: 'output', title: 'Found the Missing Value', description: 'The mystery number is 5, because 5 + 3 = 8.' }
          ]
        },
        infographics: [
          {
            id: 'c1_alg_1',
            title: 'Pattern Detective: Repeat Rules',
            subtitle: 'Finding what comes next in an AB or ABC pattern',
            category: 'Visual Logic',
            keyRule: 'Look for the core repeating block that never changes',
            visualType: 'diagram',
            details: [
              { label: 'Pattern A-B', value: 'Star, Moon, Star, Moon, Star, [ ? ] -> Moon' },
              { label: 'Pattern A-A-B', value: 'Apple, Apple, Banana, Apple, Apple, [ ? ] -> Banana' },
              { label: 'Number Pattern', value: '1, 2, 3, 1, 2, 3, 1, 2, [ ? ] -> 3' }
            ],
            mnemonicOrTakeaway: 'Chant the pattern aloud like a song to hear the next piece!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c1_alg_t1',
            title: 'The Balance Scale Rule',
            tagline: 'The equal sign (=) is a seesaw that must stay flat',
            difficulty: 'Easy',
            howItWorks: [
              'Left side must weigh the exact same as the right side.',
              'If left side has 7, the right side MUST total 7.',
              'If right side has ? + 2 = 7, ask: what with 2 balances 7?'
            ],
            example: {
              question: 'Find box in: Box + 4 = 9',
              steps: [
                'Right side is 9.',
                'Left side already has 4.',
                'Need 5 more to balance: 5 + 4 = 9.'
              ],
              answer: '5'
            },
            commonPitfall: 'Adding the two visible numbers (4 + 9 = 13) instead of balancing.',
            timeSaved: 'Prevents the #1 beginner algebra mistake.'
          }
        ],
        quiz: [
          {
            id: 'c1_alg_q1',
            question: 'What comes next in the pattern: Red, Blue, Red, Blue, Red, ___?',
            options: ['Red', 'Blue', 'Green', 'Yellow'],
            correctIndex: 1,
            hint: 'The colors alternate one after another.',
            explanation: 'The pattern is Red, Blue repeating. After Red comes Blue.',
            difficulty: 'Easy'
          },
          {
            id: 'c1_alg_q2',
            question: 'Solve the mystery box: [ ? ] + 2 = 7',
            options: ['4', '5', '6', '9'],
            correctIndex: 1,
            hint: 'Take away 2 from 7: 7 - 2 = ?',
            explanation: '5 + 2 = 7. So the mystery box holds 5.',
            difficulty: 'Easy'
          }
        ]
      },

      abacus: {
        pillar: 'abacus',
        pillarName: 'Abacus (Soroban)',
        tagline: 'Single-Rod Soroban Anatomy: Heaven Bead & Earth Beads',
        iconName: 'Grid',
        flowchart: {
          title: 'How to Read a Single Soroban Rod',
          concept: 'Reading values from 0 to 9 on one unit rod',
          realWorldExample: 'Example: How to show number 7 on the abacus',
          nodes: [
            { id: '1', type: 'start', title: 'Start with Zero', description: 'Beams cleared: Upper bead UP, lower beads DOWN.' },
            { id: '2', type: 'decision', title: 'Is number 5 or bigger?', description: 'For 7: Yes, 7 has a 5 in it!' },
            { id: '3', type: 'process', title: 'Bring Upper Bead DOWN', description: 'Move the Heaven Bead down to touch the reckoning bar (+5).' },
            { id: '4', type: 'process', title: 'Calculate Remaining Units', description: '7 - 5 = 2. We need 2 more units.' },
            { id: '5', type: 'process', title: 'Push 2 Earth Beads UP', description: 'Move 2 lower beads up with your thumb to touch the bar.' },
            { id: '6', type: 'output', title: 'Rod Value is 7', description: '1 Upper Bead (5) + 2 Lower Beads (2) = 7.' }
          ]
        },
        infographics: [
          {
            id: 'c1_ab_1',
            title: 'Soroban Anatomy 101',
            subtitle: 'The Japanese Abacus framework',
            category: 'Abacus Basics',
            keyRule: 'A bead only has value when it touches the center beam (reckoning bar)!',
            visualType: 'abacus_bead',
            details: [
              { label: 'Heaven Bead (Upper Deck)', value: 'Worth 5. Moved down by index finger to activate.' },
              { label: 'Reckoning Bar (Center Beam)', value: 'The score line. Beads touching it are counted.' },
              { label: 'Earth Beads (Lower Deck)', value: '4 beads, each worth 1. Pushed up with thumb.' }
            ],
            visualData: {
              beadValue: 7
            },
            mnemonicOrTakeaway: 'Thumb pushes Earth beads UP (+), Index finger controls Heaven (5)!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c1_ab_t1',
            title: 'The Butterfly Finger Rule',
            tagline: 'Always use proper fingers for lightning abacus speed',
            difficulty: 'Easy',
            howItWorks: [
              'Use THUMB for pushing lower beads UP (+1, +2, +3, +4).',
              'Use INDEX FINGER for pulling lower beads DOWN (-1, -2, -3, -4).',
              'Use INDEX FINGER for both moving Upper Bead DOWN (+5) and UP (-5).'
            ],
            example: {
              question: 'Set number 6 on rod',
              steps: [
                'Pinch upper bead down (+5) with index finger.',
                'Push 1 lower bead up (+1) with thumb.',
                '5 + 1 = 6 active beads.'
              ],
              answer: '6'
            },
            commonPitfall: 'Using index finger to push lower beads up makes your hand slow down.',
            timeSaved: 'Prepares muscle memory for 100+ calculations/minute in higher classes.'
          }
        ],
        quiz: [
          {
            id: 'c1_ab_q1',
            question: 'How much is ONE Heaven bead (the top bead) worth on a Soroban rod?',
            options: ['1', '5', '10', '0'],
            correctIndex: 1,
            hint: 'The bead above the beam counts for five fingers on one hand.',
            explanation: 'The upper deck bead is worth 5 units.',
            difficulty: 'Easy'
          },
          {
            id: 'c1_ab_q2',
            question: 'To set the number 3 on an empty rod, what do you do?',
            options: [
              'Move the top bead down',
              'Push 3 lower beads up to the beam',
              'Push 4 lower beads up',
              'Move top bead down and 1 lower bead up'
            ],
            correctIndex: 1,
            hint: 'Each lower bead is worth 1. 3 lower beads = 3.',
            explanation: 'Pushing 3 earth beads up gives a value of 1 + 1 + 1 = 3.',
            difficulty: 'Easy'
          }
        ]
      },

      vedic_maths: {
        pillar: 'vedic_maths',
        pillarName: 'Vedic Maths',
        tagline: 'Sutra: Mitra Numbers (Complementary Friends of 10)',
        iconName: 'Flame',
        flowchart: {
          title: 'How to Find Mitra (Friend to 10)',
          concept: 'Finding how much a digit needs to reach a whole 10',
          realWorldExample: 'Example: What is the Mitra of 7?',
          nodes: [
            { id: '1', type: 'start', title: 'Pick any single digit', description: 'Let digit be 7.' },
            { id: '2', type: 'process', title: 'Think of 10 Fingers', description: 'Imagine holding up 10 fingers.' },
            { id: '3', type: 'process', title: 'Fold Down the Given Digit', description: 'Fold 7 fingers.' },
            { id: '4', type: 'output', title: 'Count Remaining Fingers', description: '3 fingers remain standing. 3 is the Mitra of 7!' }
          ]
        },
        infographics: [
          {
            id: 'c1_vm_1',
            title: 'Mitra Number Pairs',
            subtitle: 'The foundational Vedic concept of complements',
            category: 'Vedic Sutra Prep',
            keyRule: 'Two digits are Mitras if their sum is 10',
            visualType: 'diagram',
            details: [
              { label: '1 & 9', value: '1 needs 9' },
              { label: '2 & 8', value: '2 needs 8' },
              { label: '3 & 7', value: '3 needs 7' },
              { label: '4 & 6', value: '4 needs 6' },
              { label: '5 & 5', value: '5 needs itself' }
            ],
            mnemonicOrTakeaway: 'In Vedic math, whenever you subtract from 10, just name its Mitra!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c1_vm_t1',
            title: 'Instant Subtraction from 10',
            tagline: 'Never subtract 10 - 7 by counting down!',
            difficulty: 'Easy',
            howItWorks: [
              'Whenever a problem asks: 10 - X',
              'Immediately shout the Mitra of X!',
              '10 - 8 = 2 (Mitra of 8 is 2).'
            ],
            example: {
              question: 'Calculate 10 - 3 mentally',
              steps: [
                'Look at the number 3.',
                'The Mitra of 3 is 7.',
                '10 - 3 = 7 instantly.'
              ],
              answer: '7'
            },
            commonPitfall: 'Counting backwards 10, 9, 8, 7 is slow and prone to off-by-one errors.',
            timeSaved: 'Answer pops out in under 0.5 seconds.'
          }
        ],
        quiz: [
          {
            id: 'c1_vm_q1',
            question: 'What is the Vedic Mitra (friend to 10) of 8?',
            options: ['1', '2', '3', '8'],
            correctIndex: 1,
            hint: '8 + ? = 10',
            explanation: 'The Mitra of 8 is 2 because 8 + 2 = 10.',
            difficulty: 'Easy'
          },
          {
            id: 'c1_vm_q2',
            question: 'Using the Mitra trick, what is 10 - 6 in one second?',
            options: ['3', '4', '5', '6'],
            correctIndex: 1,
            hint: 'What is the friend of 6 to make 10?',
            explanation: 'Mitra of 6 is 4. So 10 - 6 = 4.',
            difficulty: 'Easy'
          }
        ]
      }
    }
  },

  2: {
    grade: 2,
    gradeTitle: 'Class 2: Place Values, Double Digits & 5-Friends',
    levelTier: 'Primary (Classes 1-5)',
    themeDescription: 'Mastering Tens and Ones, skip counting, 2-rod abacus representation, and Vedic left-to-right mental addition.',
    pillars: {
      basic_maths: {
        pillar: 'basic_maths',
        pillarName: 'Basic Maths',
        tagline: 'Place Value (Tens & Ones), Skip Counting & Addition with Regrouping',
        iconName: 'Calculator',
        flowchart: {
          title: 'How to Solve: 2-Digit Addition with Regrouping (Carry)',
          concept: 'Adding Tens and Ones column by column',
          realWorldExample: 'Example: 38 + 25',
          nodes: [
            { id: '1', type: 'start', title: 'Write in Columns', description: 'Tens: 3 & 2 | Ones: 8 & 5.' },
            { id: '2', type: 'process', title: 'Add Ones First', description: '8 + 5 = 13 ones.' },
            { id: '3', type: 'decision', title: 'Is Ones Sum 10 or Greater?', description: '13 >= 10? Yes! 13 is 1 ten and 3 ones.' },
            { id: '4', type: 'process', title: 'Write 3, Carry 1 to Tens', description: 'Write 3 in the ones answer box. Carry 1 above the Tens column.' },
            { id: '5', type: 'process', title: 'Add the Tens Column', description: 'Add carried 1 + 3 + 2 = 6 tens.' },
            { id: '6', type: 'output', title: 'Final Result', description: 'Tens: 6, Ones: 3. Total is 63.' }
          ]
        },
        infographics: [
          {
            id: 'c2_bm_1',
            title: 'Place Value Palace: Tens & Ones',
            subtitle: 'Understanding 2-digit numbers as bundles of 10',
            category: 'Number Systems',
            keyRule: '1 Ten = 10 individual units (Ones)',
            visualType: 'diagram',
            details: [
              { label: 'Number 47', value: '4 Tens (40) + 7 Ones (7)' },
              { label: 'Number 80', value: '8 Tens (80) + 0 Ones (0)' },
              { label: 'Number 99', value: '9 Tens (90) + 9 Ones (9)' }
            ],
            mnemonicOrTakeaway: 'The digit on the left is the Big Boss (bundle of 10s), the right is the loose change!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c2_bm_t1',
            title: 'Skip-Counting Frog Jump',
            tagline: 'Multiply effortlessly by chanting skip counts',
            difficulty: 'Easy',
            howItWorks: [
              'Skip counting by 2s: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 (All even numbers!).',
              'Skip counting by 5s: 5, 10, 15, 20, 25, 30 (Always ends in 0 or 5!).',
              'Skip counting by 10s: 10, 20, 30, 40, 50 (Just append 0!).'
            ],
            example: {
              question: 'Find 4 groups of 5',
              steps: [
                'Jump 4 times by 5: 5, 10, 15, 20.',
                'Landed on 20.'
              ],
              answer: '20'
            },
            commonPitfall: 'Mixing up odd/even endings when jumping by 5s.',
            timeSaved: 'Lays the bedrock for all multiplication tables.'
          }
        ],
        quiz: [
          {
            id: 'c2_bm_q1',
            question: 'What is the place value of the digit 7 in the number 74?',
            options: ['7', '70', '14', '4'],
            correctIndex: 1,
            hint: '7 is in the Tens column.',
            explanation: 'In 74, 7 stands for 7 tens, which equals 70.',
            difficulty: 'Easy'
          },
          {
            id: 'c2_bm_q2',
            question: 'Calculate: 47 + 28',
            options: ['65', '75', '74', '85'],
            correctIndex: 1,
            hint: '7 + 8 = 15 (write 5, carry 1). 1 + 4 + 2 = 7.',
            explanation: '47 + 28 = 75.',
            difficulty: 'Medium'
          }
        ]
      },

      algebra: {
        pillar: 'algebra',
        pillarName: 'Algebra & Patterns',
        tagline: 'Skip Patterns, Growing Sequences & True-False Equalities',
        iconName: 'Sparkles',
        flowchart: {
          title: 'How to Find the Next Number in a Growing Pattern',
          concept: 'Detecting the constant difference between terms',
          realWorldExample: 'Pattern: 4, 7, 10, 13, ?',
          nodes: [
            { id: '1', type: 'start', title: 'Inspect Neighbor Numbers', description: 'Compare 4 to 7, and 7 to 10.' },
            { id: '2', type: 'process', title: 'Find the Gap (Difference)', description: '7 - 4 = +3. Also 10 - 7 = +3.' },
            { id: '3', type: 'decision', title: 'Is the Gap Constant?', description: 'Yes! Every step adds 3.' },
            { id: '4', type: 'process', title: 'Apply Rule to Last Term', description: 'Add 3 to 13: 13 + 3 = 16.' },
            { id: '5', type: 'output', title: 'Solution', description: 'Next number in sequence is 16.' }
          ]
        },
        infographics: [
          {
            id: 'c2_alg_1',
            title: 'True or False Equalities',
            subtitle: 'Understanding equations as balanced truths',
            category: 'Equation Logic',
            keyRule: 'Both sides of = must equal the same total value',
            visualType: 'comparison',
            details: [
              { label: '5 + 3 = 6 + 2', value: 'TRUE! Both sides equal 8.' },
              { label: '9 - 4 = 10 - 5', value: 'TRUE! Both sides equal 5.' },
              { label: '7 + 2 = 8 + 3', value: 'FALSE! 9 is not equal to 11.' }
            ],
            mnemonicOrTakeaway: 'The equal sign is not an instruction to do something; it says "these two sides are twins"!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c2_alg_t1',
            title: 'The Make-Ten Equalizer',
            tagline: 'Borrow 1 or 2 to make a friendly ten',
            difficulty: 'Easy',
            howItWorks: [
              'When adding 9 + 6:',
              'Borrow 1 from 6 to give to 9 (making 9 into 10).',
              '6 becomes 5.',
              '10 + 5 = 15 instantly!'
            ],
            example: {
              question: 'Solve 8 + 7 mentally',
              steps: [
                '8 needs 2 to make 10.',
                'Take 2 from 7, leaving 5.',
                '10 + 5 = 15.'
              ],
              answer: '15'
            },
            commonPitfall: 'Forgetting to reduce the second number after borrowing.',
            timeSaved: 'Eliminates finger counting for numbers above 10.'
          }
        ],
        quiz: [
          {
            id: 'c2_alg_q1',
            question: 'Which number completes the sequence: 5, 10, 15, 20, ___?',
            options: ['22', '24', '25', '30'],
            correctIndex: 2,
            hint: 'The pattern is skip counting by 5.',
            explanation: '20 + 5 = 25.',
            difficulty: 'Easy'
          },
          {
            id: 'c2_alg_q2',
            question: 'Is this statement true or false: 12 + 4 = 10 + 6 ?',
            options: ['True (both are 16)', 'False (16 and 17)', 'False (both are 15)', 'Cannot tell'],
            correctIndex: 0,
            hint: 'Compute 12+4 and compute 10+6.',
            explanation: '12 + 4 = 16 and 10 + 6 = 16. Both sides balance, so it is True.',
            difficulty: 'Easy'
          }
        ]
      },

      abacus: {
        pillar: 'abacus',
        pillarName: 'Abacus (Soroban)',
        tagline: '2-Rod Values & Direct Bead Operations (No Carry)',
        iconName: 'Grid',
        flowchart: {
          title: 'How to Represent a 2-Digit Number on 2 Rods',
          concept: 'Rod 1 (Right) = Ones, Rod 2 (Left) = Tens',
          realWorldExample: 'Example: Set number 36 on Abacus',
          nodes: [
            { id: '1', type: 'start', title: 'Identify Place Values', description: '36 has 3 Tens and 6 Ones.' },
            { id: '2', type: 'process', title: 'Set Tens Rod (Left Rod)', description: 'Push 3 lower beads up on the Tens rod.' },
            { id: '3', type: 'process', title: 'Set Ones Rod (Right Rod)', description: 'On the Ones rod: pull upper bead down (5) and push 1 lower bead up (1).' },
            { id: '4', type: 'output', title: 'Read the Board', description: 'Tens rod shows 3, Ones rod shows 6 -> Value is 36!' }
          ]
        },
        infographics: [
          {
            id: 'c2_ab_1',
            title: 'Reading 2-Rod Values',
            subtitle: 'Tens Rod + Units Rod',
            category: 'Place Value Abacus',
            keyRule: 'Always read rods from LEFT to RIGHT, just like reading numbers in a book',
            visualType: 'steps',
            details: [
              { label: 'Tens Rod', value: 'Counts 10, 20, 30, 40, 50, 60, 70, 80, 90' },
              { label: 'Units Rod', value: 'Counts 1, 2, 3, 4, 5, 6, 7, 8, 9' },
              { label: 'Upper Bead on Tens Rod', value: 'Value = 50!' }
            ],
            mnemonicOrTakeaway: 'An upper bead on the left rod is 50, on the right rod is 5!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c2_ab_t1',
            title: 'Direct Movement (No Friends Needed)',
            tagline: 'When beads are free, move them directly',
            difficulty: 'Easy',
            howItWorks: [
              'If adding 2 to 1: check if 2 lower beads are free.',
              'Yes, 3 lower beads are waiting down.',
              'Push 2 lower beads directly UP with thumb.'
            ],
            example: {
              question: '21 + 13 on abacus',
              steps: [
                'Set 21: 2 tens, 1 unit.',
                'Add 13: Add 1 to tens rod (now 3 tens), add 3 to unit rod (now 4 units).',
                'Read answer: 34.'
              ],
              answer: '34'
            },
            commonPitfall: 'Trying to use complex formulas when direct beads are already available.',
            timeSaved: 'Keep it simple: direct first!'
          }
        ],
        quiz: [
          {
            id: 'c2_ab_q1',
            question: 'If the upper bead is down on the Tens rod and all other beads are away, what is the value?',
            options: ['5', '50', '55', '500'],
            correctIndex: 1,
            hint: 'The upper bead is worth 5. In the Tens rod, it is 5 tens.',
            explanation: 'An upper bead in the tens rod represents 5 tens = 50.',
            difficulty: 'Easy'
          },
          {
            id: 'c2_ab_q2',
            question: 'Direct addition: You have 2 beads up. You add 2 more lower beads. How many are active?',
            options: ['3', '4', '5', '6'],
            correctIndex: 1,
            hint: '2 + 2 = ?',
            explanation: '2 lower beads + 2 lower beads = 4 lower beads active.',
            difficulty: 'Easy'
          }
        ]
      },

      vedic_maths: {
        pillar: 'vedic_maths',
        pillarName: 'Vedic Maths',
        tagline: 'Left-to-Right Mental Addition & Sub-Base Complements',
        iconName: 'Flame',
        flowchart: {
          title: 'How to Add 2-Digit Numbers from Left to Right',
          concept: 'The Vedic natural mental calculation flow',
          realWorldExample: 'Example: 45 + 32',
          nodes: [
            { id: '1', type: 'start', title: 'Break into Tens and Ones', description: '45 = 40 + 5, and 32 = 30 + 2.' },
            { id: '2', type: 'process', title: 'Add Tens First (Left)', description: '40 + 30 = 70. Hold 70 in mind.' },
            { id: '3', type: 'process', title: 'Add Ones (Right)', description: '5 + 2 = 7.' },
            { id: '4', type: 'output', title: 'Combine Left and Right', description: '70 + 7 = 77! Mental calculation done without pencil.' }
          ]
        },
        infographics: [
          {
            id: 'c2_vm_1',
            title: 'Why Left-to-Right Addition?',
            subtitle: 'The natural way human brains process magnitude',
            category: 'Mental Math Science',
            keyRule: 'We read words from left to right, we should calculate numbers the same way',
            visualType: 'comparison',
            details: [
              { label: 'Traditional School Math', value: 'Right-to-left: Requires holding invisible carries in pencil' },
              { label: 'Vedic Mental Math', value: 'Left-to-right: Gives the big estimate immediately (40+30=70)' }
            ],
            mnemonicOrTakeaway: 'Think big numbers first, tack on the small numbers after!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c2_vm_t1',
            title: 'The Nearest-10 Snap Trick',
            tagline: 'Add to 19, 29, 39 by adding 20, 30, 40 and subtracting 1',
            difficulty: 'Easy',
            howItWorks: [
              'Adding 29 is the same as adding 30 and then subtracting 1.',
              'Example: 54 + 29 = 54 + 30 - 1 = 84 - 1 = 83.'
            ],
            example: {
              question: 'Calculate 63 + 19 mentally',
              steps: [
                'Add 20 instead of 19: 63 + 20 = 83.',
                'Subtract the extra 1: 83 - 1 = 82.'
              ],
              answer: '82'
            },
            commonPitfall: 'Adding 1 at the end instead of subtracting the borrowed 1.',
            timeSaved: 'Turns a hard carry calculation into a 1-second snap.'
          }
        ],
        quiz: [
          {
            id: 'c2_vm_q1',
            question: 'Solve mentally from left-to-right: 52 + 34 = ?',
            options: ['84', '86', '76', '96'],
            correctIndex: 1,
            hint: 'Tens: 50 + 30 = 80. Ones: 2 + 4 = 6.',
            explanation: '80 + 6 = 86.',
            difficulty: 'Easy'
          },
          {
            id: 'c2_vm_q2',
            question: 'Using the nearest-10 trick, calculate 45 + 19:',
            options: ['63', '64', '65', '54'],
            correctIndex: 1,
            hint: '45 + 20 = 65, then 65 - 1 = ?',
            explanation: '45 + 20 - 1 = 64.',
            difficulty: 'Easy'
          }
        ]
      }
    }
  },

  3: {
    grade: 3,
    gradeTitle: 'Class 3: Multiplication Tables & Little Friends of 5',
    levelTier: 'Primary (Classes 1-5)',
    themeDescription: '3-digit arithmetic, multiplication fundamentals, Soroban 5-complements (Little Friends), and Vedic base-100 subtraction.',
    pillars: {
      basic_maths: {
        pillar: 'basic_maths',
        pillarName: 'Basic Maths',
        tagline: 'Multiplication Tables, 3-Digit Operations & Division Basics',
        iconName: 'Calculator',
        flowchart: {
          title: 'How to Multiply by 9 on Your 10 Fingers',
          concept: 'Physical finger math algorithm for the 9-times table',
          realWorldExample: 'Example: 9 x 4',
          nodes: [
            { id: '1', type: 'start', title: 'Spread 10 Fingers', description: 'Place both hands flat in front of you, palms facing down.' },
            { id: '2', type: 'process', title: 'Fold the 4th Finger', description: 'Counting from left to right, bend finger #4 (left pointer finger).' },
            { id: '3', type: 'process', title: 'Count Fingers to the Left', description: 'Count fingers to the left of bent finger: 3 fingers.' },
            { id: '4', type: 'process', title: 'Count Fingers to the Right', description: 'Count fingers to the right of bent finger: 6 fingers.' },
            { id: '5', type: 'output', title: 'Read Left and Right Digits', description: 'Left: 3, Right: 6 -> Answer is 36! 9 x 4 = 36.' }
          ]
        },
        infographics: [
          {
            id: 'c3_bm_1',
            title: 'Multiplication as Repeated Addition',
            subtitle: 'The array and grouping model',
            category: 'Multiplication',
            keyRule: 'a x b means "a groups of b objects"',
            visualType: 'diagram',
            details: [
              { label: '3 x 4', value: '4 + 4 + 4 = 12 items' },
              { label: 'Commutative Law', value: '3 x 4 = 4 x 3 = 12 (Turning the grid sideways!)' },
              { label: 'Zero Property', value: 'Any number x 0 is always 0' }
            ],
            mnemonicOrTakeaway: 'Multiplying is just fast-forward adding!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c3_bm_t1',
            title: 'The Double-Double Trick for x4',
            tagline: 'Never memorize the 4-times table: just double twice!',
            difficulty: 'Easy',
            howItWorks: [
              'To multiply any number by 4:',
              'Step 1: Double the number (x2).',
              'Step 2: Double that result again (x2).'
            ],
            example: {
              question: 'Find 16 x 4 in your head',
              steps: [
                'Double 16: 16 x 2 = 32.',
                'Double 32: 32 x 2 = 64.'
              ],
              answer: '64'
            },
            commonPitfall: 'Doubling once and forgetting the second double.',
            timeSaved: 'Allows solving 25 x 4 = 100 in 1 second.'
          }
        ],
        quiz: [
          {
            id: 'c3_bm_q1',
            question: 'Using the Double-Double rule, what is 18 x 4?',
            options: ['64', '72', '76', '82'],
            correctIndex: 1,
            hint: 'Double 18 is 36. Double 36 is ?',
            explanation: '18 x 2 = 36. 36 x 2 = 72.',
            difficulty: 'Medium'
          },
          {
            id: 'c3_bm_q2',
            question: 'What is 345 + 286?',
            options: ['621', '631', '531', '641'],
            correctIndex: 1,
            hint: '5+6=11 (carry 1), 1+4+8=13 (carry 1), 1+3+2=6.',
            explanation: '345 + 286 = 631.',
            difficulty: 'Medium'
          }
        ]
      },

      algebra: {
        pillar: 'algebra',
        pillarName: 'Algebra & Patterns',
        tagline: 'Balance Scales with Weights & Missing Factors',
        iconName: 'Sparkles',
        flowchart: {
          title: 'How to Solve: Missing Factor in ? x 6 = 42',
          concept: 'Using division to undo multiplication',
          realWorldExample: 'Solve: Box x 6 = 42',
          nodes: [
            { id: '1', type: 'start', title: 'Identify Equation', description: 'Some number multiplied by 6 equals 42.' },
            { id: '2', type: 'process', title: 'Opposite of Multiplication', description: 'The inverse operation of multiplying by 6 is dividing by 6.' },
            { id: '3', type: 'process', title: 'Divide Total by Known Factor', description: '42 / 6 = ?' },
            { id: '4', type: 'process', title: 'Recall 6-Times Table', description: '6 x 7 = 42.' },
            { id: '5', type: 'output', title: 'Solution', description: 'The missing factor is 7.' }
          ]
        },
        infographics: [
          {
            id: 'c3_alg_1',
            title: 'The Fact Family Triangle',
            subtitle: 'How 3 numbers are forever connected',
            category: 'Algebraic Families',
            keyRule: 'Multiplication and division are two sides of the exact same coin',
            visualType: 'diagram',
            details: [
              { label: 'Apex: 24', value: 'Base Left: 4 | Base Right: 6' },
              { label: 'Fact 1', value: '4 x 6 = 24' },
              { label: 'Fact 2', value: '6 x 4 = 24' },
              { label: 'Fact 3', value: '24 / 6 = 4' },
              { label: 'Fact 4', value: '24 / 4 = 6' }
            ],
            mnemonicOrTakeaway: 'Know one triangle, and you know 4 math equations instantly!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c3_alg_t1',
            title: 'Isolate the Mystery Box',
            tagline: 'Move the known number across the equal sign by flipping its sign',
            difficulty: 'Medium',
            howItWorks: [
              'If box + 15 = 45, move +15 to other side as -15: box = 45 - 15 = 30.',
              'If box - 8 = 20, move -8 to other side as +8: box = 20 + 8 = 28.'
            ],
            example: {
              question: 'Solve for x: x - 14 = 36',
              steps: [
                'Add 14 to both sides: x = 36 + 14.',
                '36 + 14 = 50.',
                'x = 50.'
              ],
              answer: '50'
            },
            commonPitfall: 'Subtracting 14 from 36 instead of adding.',
            timeSaved: 'Sets the proper formal algebraic foundation early.'
          }
        ],
        quiz: [
          {
            id: 'c3_alg_q1',
            question: 'Find the missing number: [ ? ] x 8 = 56',
            options: ['6', '7', '8', '9'],
            correctIndex: 1,
            hint: 'Divide 56 by 8.',
            explanation: '7 x 8 = 56. So the missing number is 7.',
            difficulty: 'Easy'
          },
          {
            id: 'c3_alg_q2',
            question: 'Solve: [ ? ] + 125 = 200',
            options: ['65', '75', '85', '175'],
            correctIndex: 1,
            hint: '200 - 125 = ?',
            explanation: '200 - 125 = 75. So the missing number is 75.',
            difficulty: 'Medium'
          }
        ]
      },

      abacus: {
        pillar: 'abacus',
        pillarName: 'Abacus (Soroban)',
        tagline: 'Little Friends (+5 Complements Formulas)',
        iconName: 'Grid',
        flowchart: {
          title: 'How to Add When Lower Deck Is Full: Little Friend +4',
          concept: 'Formula: +4 = +5 - 1',
          realWorldExample: 'Example: You have 2 on the rod and need to add 4 (2 + 4 = 6)',
          nodes: [
            { id: '1', type: 'start', title: 'Inspect Lower Deck', description: 'Currently 2 beads are UP. Only 2 beads are left down.' },
            { id: '2', type: 'decision', title: 'Are 4 lower beads available?', description: 'No! Only 2 lower beads are free. We cannot do direct addition.' },
            { id: '3', type: 'process', title: 'Activate Little Friend Rule', description: 'Formula for +4: Bring Heaven bead (+5) down, remove 1 lower bead (-1).' },
            { id: '4', type: 'process', title: 'Execute Movement', description: 'Index finger pulls upper bead DOWN (+5). Index finger pushes 1 lower bead DOWN (-1).' },
            { id: '5', type: 'output', title: 'Verify Bead Count', description: 'Bead count: 1 upper (5) + 1 lower (1) = 6. 2 + 4 = 6!' }
          ]
        },
        infographics: [
          {
            id: 'c3_ab_1',
            title: 'The 4 Little Friends of 5',
            subtitle: 'Essential formulas when adding within 5',
            category: 'Abacus Complements',
            keyRule: 'Whenever lower beads fall short, borrow 5 and return the excess partner',
            visualType: 'steps',
            details: [
              { label: '+4 Formula', value: '+5 - 1 (Friend of 4 is 1)' },
              { label: '+3 Formula', value: '+5 - 2 (Friend of 3 is 2)' },
              { label: '+2 Formula', value: '+5 - 3 (Friend of 2 is 3)' },
              { label: '+1 Formula', value: '+5 - 4 (Friend of 1 is 4)' }
            ],
            mnemonicOrTakeaway: '4 needs 1, 3 needs 2! Bring down five, throw away the friend!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c3_ab_t1',
            title: 'The Subtraction Little Friends',
            tagline: 'When subtracting without enough lower beads: -4 = +1 - 5',
            difficulty: 'Medium',
            howItWorks: [
              'If you have 5 and want to subtract 1:',
              'Push 4 lower beads UP, move upper bead UP (-5).',
              'Formula: -1 = +4 - 5.'
            ],
            example: {
              question: 'Calculate 5 - 2 on abacus',
              steps: [
                'You have upper bead 5 touching beam.',
                'Friend of 2 is 3.',
                'Push 3 lower beads UP, push upper bead UP (-5).',
                'Result is 3 lower beads active.'
              ],
              answer: '3'
            },
            commonPitfall: 'Moving upper bead before pushing lower beads.',
            timeSaved: 'Makes subtraction as rhythmic as addition.'
          }
        ],
        quiz: [
          {
            id: 'c3_ab_q1',
            question: 'What is the Little Friend formula to add 3 on the abacus?',
            options: ['+3 = +5 - 2', '+3 = +5 - 3', '+3 = +10 - 7', '+3 = +5 - 1'],
            correctIndex: 0,
            hint: 'The complement of 3 to make 5 is 2.',
            explanation: '+3 = +5 - 2. Pull 5 down, push 2 down.',
            difficulty: 'Medium'
          },
          {
            id: 'c3_ab_q2',
            question: 'You have 4 on the abacus. You apply the formula +1 = +5 - 4. What is the final reading?',
            options: ['3', '4', '5', '6'],
            correctIndex: 2,
            hint: '4 + 1 = 5.',
            explanation: '4 + 1 = 5. The upper bead touches the beam alone.',
            difficulty: 'Easy'
          }
        ]
      },

      vedic_maths: {
        pillar: 'vedic_maths',
        pillarName: 'Vedic Maths',
        tagline: 'Sutra: Nikhilam Navatashcaramam Dashatah (All from 9, Last from 10)',
        iconName: 'Flame',
        flowchart: {
          title: 'How to Subtract Any Number from 100, 1000, 10000 in Seconds',
          concept: 'Sutra: All from 9 and the last from 10',
          realWorldExample: 'Example: 1000 - 357',
          nodes: [
            { id: '1', type: 'start', title: 'Inspect the Problem', description: 'Subtracting 357 from base 1000.' },
            { id: '2', type: 'process', title: 'Subtract First Digit from 9', description: 'First digit is 3: 9 - 3 = 6.' },
            { id: '3', type: 'process', title: 'Subtract Middle Digit from 9', description: 'Middle digit is 5: 9 - 5 = 4.' },
            { id: '4', type: 'process', title: 'Subtract Last Digit from 10', description: 'Last digit is 7: 10 - 7 = 3.' },
            { id: '5', type: 'output', title: 'Assemble Digits Left to Right', description: 'Digits are 6, 4, 3 -> Answer is 643! No borrowing across zeros.' }
          ]
        },
        infographics: [
          {
            id: 'c3_vm_1',
            title: 'Nikhilam Sutra Visualizer',
            subtitle: 'Say goodbye to messy borrowing across zeros',
            category: 'Vedic Sutras',
            keyRule: 'All digits subtracted from 9, except the very last non-zero digit which is subtracted from 10',
            visualType: 'diagram',
            details: [
              { label: 'Base 100: 100 - 48', value: '(9-4) | (10-8) = 52' },
              { label: 'Base 1000: 1000 - 642', value: '(9-6) | (9-4) | (10-2) = 358' },
              { label: 'Base 10000: 10000 - 4183', value: '(9-4) | (9-1) | (9-8) | (10-3) = 5817' }
            ],
            mnemonicOrTakeaway: '"All from nine, last from ten" — the most famous speed math sutra in the world!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c3_vm_t1',
            title: 'Instant Cashier Change Calculation',
            tagline: 'When paying with a $100 bill, give exact change in 1 second',
            difficulty: 'Easy',
            howItWorks: [
              'Bill total: $63.',
              'Customer gives $100.',
              'First digit from 9: 9 - 6 = 3.',
              'Last digit from 10: 10 - 3 = 7.',
              'Change: $37.'
            ],
            example: {
              question: 'Calculate 100 - 74',
              steps: [
                '9 - 7 = 2.',
                '10 - 4 = 6.',
                'Answer = 26.'
              ],
              answer: '26'
            },
            commonPitfall: 'Subtracting the first digit from 10 by accident.',
            timeSaved: 'Saves 20 seconds of messy cross-outs.'
          }
        ],
        quiz: [
          {
            id: 'c3_vm_q1',
            question: 'Using "All from 9, last from 10", what is 1000 - 482?',
            options: ['518', '528', '618', '418'],
            correctIndex: 0,
            hint: '9-4=5, 9-8=1, 10-2=8.',
            explanation: '9-4 = 5, 9-8 = 1, 10-2 = 8. Answer = 518.',
            difficulty: 'Easy'
          },
          {
            id: 'c3_vm_q2',
            question: 'What is 100 - 67 using Vedic Nikhilam?',
            options: ['23', '33', '43', '37'],
            correctIndex: 1,
            hint: '9-6 = 3, 10-7 = 3.',
            explanation: '9-6 = 3, 10-7 = 3. Answer is 33.',
            difficulty: 'Easy'
          }
        ]
      }
    }
  },

  4: {
    grade: 4,
    gradeTitle: 'Class 4: Big Friends (10-Complements) & Multiply by 11',
    levelTier: 'Primary (Classes 1-5)',
    themeDescription: '4-digit division, fractions fundamentals, Soroban 10-complements (Big Friends), and lightning Vedic multiplication by 11.',
    pillars: {
      basic_maths: {
        pillar: 'basic_maths',
        pillarName: 'Basic Maths',
        tagline: 'Long Division, Equivalent Fractions & Geometry Perimeters',
        iconName: 'Calculator',
        flowchart: {
          title: 'How to Find Equivalent Fractions (The Golden Rule)',
          concept: 'Multiply or divide top and bottom by the exact same non-zero number',
          realWorldExample: 'Example: Convert 3/4 to an equivalent fraction with denominator 12',
          nodes: [
            { id: '1', type: 'start', title: 'Inspect Starting Fraction', description: 'Fraction is 3/4. Target denominator is 12.' },
            { id: '2', type: 'process', title: 'Find Scaling Factor', description: '12 / 4 = 3. The bottom was multiplied by 3.' },
            { id: '3', type: 'process', title: 'Golden Rule of Fractions', description: 'Whatever you do to the bottom, you MUST do to the top!' },
            { id: '4', type: 'process', title: 'Multiply Numerator', description: '3 x 3 = 9.' },
            { id: '5', type: 'output', title: 'Resulting Fraction', description: '3/4 is equivalent to 9/12.' }
          ]
        },
        infographics: [
          {
            id: 'c4_bm_1',
            title: 'Fraction Pizza Model',
            subtitle: 'Numerator vs Denominator',
            category: 'Fractions',
            keyRule: 'Denominator = Total equal slices cut; Numerator = Slices you have eaten',
            visualType: 'diagram',
            details: [
              { label: 'Proper Fraction', value: 'Numerator < Denominator (e.g., 3/5 < 1 whole)' },
              { label: 'Improper Fraction', value: 'Numerator >= Denominator (e.g., 7/4 > 1 whole)' },
              { label: 'Mixed Fraction', value: 'Whole number + Fraction (e.g., 1 3/4)' }
            ],
            mnemonicOrTakeaway: 'Denominator is DOWN (bottom), Numerator is North (top)!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c4_bm_t1',
            title: 'The Butterfly Cross for Comparing Fractions',
            tagline: 'Instantly tell which fraction is bigger without common denominators',
            difficulty: 'Medium',
            howItWorks: [
              'Comparing 3/5 and 4/7:',
              'Cross-multiply: 3 x 7 = 21 (write over left fraction).',
              'Cross-multiply: 5 x 4 = 20 (write over right fraction).',
              'Since 21 > 20, 3/5 is strictly greater than 4/7!'
            ],
            example: {
              question: 'Which is bigger: 5/8 or 3/5?',
              steps: [
                'Left top x Right bottom: 5 x 5 = 25.',
                'Left bottom x Right top: 8 x 3 = 24.',
                '25 > 24, so 5/8 is larger!'
              ],
              answer: '5/8 is larger'
            },
            commonPitfall: 'Writing the cross-product under the fraction instead of above the numerator.',
            timeSaved: 'Solves fraction comparison in 3 seconds.'
          }
        ],
        quiz: [
          {
            id: 'c4_bm_q1',
            question: 'Which fraction is equivalent to 2/3?',
            options: ['4/6', '3/4', '4/9', '5/6'],
            correctIndex: 0,
            hint: 'Multiply numerator and denominator by 2.',
            explanation: '(2 x 2) / (3 x 2) = 4/6.',
            difficulty: 'Easy'
          },
          {
            id: 'c4_bm_q2',
            question: 'What is the remainder when 47 is divided by 5?',
            options: ['1', '2', '3', '4'],
            correctIndex: 1,
            hint: '5 x 9 = 45. How much is left over to 47?',
            explanation: '47 = 5 x 9 + 2. Remainder is 2.',
            difficulty: 'Easy'
          }
        ]
      },

      algebra: {
        pillar: 'algebra',
        pillarName: 'Algebra & Patterns',
        tagline: 'Inverse Operations & 2-Step Equations',
        iconName: 'Sparkles',
        flowchart: {
          title: 'How to Solve: 2-Step Equation (2x + 4 = 16)',
          concept: 'Reverse BODMAS / PEMDAS: Undo addition first, then multiplication',
          realWorldExample: 'Solve: 2x + 4 = 16',
          nodes: [
            { id: '1', type: 'start', title: 'Look at Operations on x', description: 'x is multiplied by 2, and then 4 is added.' },
            { id: '2', type: 'process', title: 'Undo Addition First', description: 'Subtract 4 from both sides: 16 - 4 = 12.' },
            { id: '3', type: 'process', title: 'New Equation', description: 'Now we have: 2x = 12.' },
            { id: '4', type: 'process', title: 'Undo Multiplication', description: 'Divide both sides by 2: 12 / 2 = 6.' },
            { id: '5', type: 'output', title: 'Solution', description: 'x = 6. Check: 2(6) + 4 = 12 + 4 = 16!' }
          ]
        },
        infographics: [
          {
            id: 'c4_alg_1',
            title: 'The Great Equation Mirror',
            subtitle: 'Rules of the equal sign balance',
            category: 'Algebra Rules',
            keyRule: 'Whatever operation you perform on the left, execute the identical operation on the right',
            visualType: 'steps',
            details: [
              { label: '+ Turns into -', value: 'x + 7 = 10 -> x = 10 - 7' },
              { label: '- Turns into +', value: 'x - 5 = 12 -> x = 12 + 5' },
              { label: 'x Turns into /', value: '3x = 21 -> x = 21 / 3' },
              { label: '/ Turns into x', value: 'x / 4 = 5 -> x = 5 x 4' }
            ],
            mnemonicOrTakeaway: 'Crossing the equal sign flips the operation to its opposite twin!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c4_alg_t1',
            title: 'Always Check Your Answer (The Plug-In Test)',
            tagline: 'Never leave an algebra test with an unverified answer',
            difficulty: 'Easy',
            howItWorks: [
              'Once you find x = 6:',
              'Plug 6 right back into the original question: 2(6) + 4.',
              '12 + 4 = 16. It matches! 100% confidence guaranteed.'
            ],
            example: {
              question: 'Check if x = 5 is solution to 3x - 2 = 13',
              steps: [
                'Substitute 5: 3(5) - 2.',
                '15 - 2 = 13.',
                'Left side equals Right side (13 = 13).'
              ],
              answer: 'Verified True'
            },
            commonPitfall: 'Rushing to the next question without the 5-second plug-in test.',
            timeSaved: 'Guarantees full marks on algebra homework.'
          }
        ],
        quiz: [
          {
            id: 'c4_alg_q1',
            question: 'Solve for x: 3x + 5 = 20',
            options: ['3', '5', '6', '7'],
            correctIndex: 1,
            hint: 'Subtract 5 first: 20 - 5 = 15. Then divide by 3.',
            explanation: '3x = 15 => x = 15 / 3 = 5.',
            difficulty: 'Medium'
          },
          {
            id: 'c4_alg_q2',
            question: 'If x / 4 = 8, what is x?',
            options: ['2', '12', '32', '24'],
            correctIndex: 2,
            hint: 'Multiply both sides by 4.',
            explanation: 'x = 8 x 4 = 32.',
            difficulty: 'Easy'
          }
        ]
      },

      abacus: {
        pillar: 'abacus',
        pillarName: 'Abacus (Soroban)',
        tagline: 'Big Friends (+10 Complements Formulas)',
        iconName: 'Grid',
        flowchart: {
          title: 'How to Add When Rod is Full: Big Friend +9',
          concept: 'Formula: +9 = -1 + 10 (Clear 1 on current rod, add 1 on tens rod)',
          realWorldExample: 'Example: You have 8 on rod, and add 9 (8 + 9 = 17)',
          nodes: [
            { id: '1', type: 'start', title: 'Inspect Unit Rod', description: 'Unit rod has 8 active beads. We need to add 9.' },
            { id: '2', type: 'decision', title: 'Are 9 beads available?', description: 'No! Max capacity of a rod is 9.' },
            { id: '3', type: 'process', title: 'Big Friend Formula', description: 'Friend of 9 is 1. Formula: +9 = -1 + 10.' },
            { id: '4', type: 'process', title: 'Execute on Units Rod', description: 'Remove 1 lower bead (-1) on the units rod.' },
            { id: '5', type: 'process', title: 'Execute on Tens Rod', description: 'Push 1 lower bead UP (+10) on the tens rod to the left.' },
            { id: '6', type: 'output', title: 'Read the Abacus', description: 'Tens rod: 1 | Units rod: 7 -> Answer is 17!' }
          ]
        },
        infographics: [
          {
            id: 'c4_ab_1',
            title: 'The Big Friends of 10 Table',
            subtitle: 'Formulas when carry over to the next rod is needed',
            category: 'Abacus Big Friends',
            keyRule: 'Subtract the complement from the current rod, push 1 bead UP on the left rod',
            visualType: 'steps',
            details: [
              { label: '+9 Formula', value: '-1 + 10 (Friend of 9 is 1)' },
              { label: '+8 Formula', value: '-2 + 10 (Friend of 8 is 2)' },
              { label: '+7 Formula', value: '-3 + 10 (Friend of 7 is 3)' },
              { label: '+6 Formula', value: '-4 + 10 (Friend of 6 is 4)' }
            ],
            mnemonicOrTakeaway: 'Kick the friend out downstairs, welcome ten upstairs next door!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c4_ab_t1',
            title: 'Simultaneous Two-Handed Abacus Action',
            tagline: 'Do the minus and plus at the exact same fraction of a second',
            difficulty: 'Medium',
            howItWorks: [
              'Right hand index finger removes the complement on units rod.',
              'Left hand thumb pushes the bead UP on the tens rod.',
              'Both hands strike simultaneously like playing piano!'
            ],
            example: {
              question: 'Do 7 + 8 on abacus',
              steps: [
                'Set 7 on unit rod.',
                '+8 formula: -2 + 10.',
                'Right index finger drops 2 beads on units; left thumb pushes 1 on tens.',
                'Reads 15 in half a second.'
              ],
              answer: '15'
            },
            commonPitfall: 'Doing it in two sluggish separate steps breaks calculation rhythm.',
            timeSaved: 'Doubles your speed in mental abacus competitions.'
          }
        ],
        quiz: [
          {
            id: 'c4_ab_q1',
            question: 'What is the Big Friend formula to add 7 on the abacus?',
            options: ['+7 = -3 + 10', '+7 = -2 + 10', '+7 = +5 + 2', '+7 = -7 + 10'],
            correctIndex: 0,
            hint: 'What is 10 - 7?',
            explanation: 'The complement of 7 is 3. So +7 = -3 + 10.',
            difficulty: 'Medium'
          },
          {
            id: 'c4_ab_q2',
            question: 'You have 9 on a rod. You add 9 using the formula -1 + 10. What is the value?',
            options: ['17', '18', '19', '20'],
            correctIndex: 1,
            hint: '9 - 1 = 8 on units rod, 1 on tens rod.',
            explanation: 'Tens rod = 1, Units rod = 8 => 18.',
            difficulty: 'Easy'
          }
        ]
      },

      vedic_maths: {
        pillar: 'vedic_maths',
        pillarName: 'Vedic Maths',
        tagline: 'Lightning Multiplication by 11 (The Sandwich Method)',
        iconName: 'Flame',
        flowchart: {
          title: 'How to Multiply Any 2-Digit Number by 11 in 2 Seconds',
          concept: 'Split the digits and sandwich their sum in the middle',
          realWorldExample: 'Example: 35 x 11',
          nodes: [
            { id: '1', type: 'start', title: 'Take the 2-Digit Number', description: 'Number is 35. Digits are 3 and 5.' },
            { id: '2', type: 'process', title: 'Open the Digits (The Bread)', description: 'Write 3 on the left and 5 on the right: 3 [ ? ] 5.' },
            { id: '3', type: 'process', title: 'Add the Two Digits (The Filling)', description: '3 + 5 = 8.' },
            { id: '4', type: 'decision', title: 'Is the sum less than 10?', description: '8 < 10? Yes! No carry needed.' },
            { id: '5', type: 'output', title: 'Sandwich the Sum', description: 'Place 8 in between: 385! 35 x 11 = 385.' }
          ]
        },
        infographics: [
          {
            id: 'c4_vm_1',
            title: 'Multiplying by 11: With and Without Carry',
            subtitle: 'The ultimate party trick of mental mathematics',
            category: 'Speed Multiplication',
            keyRule: 'Sum the adjacent digits and place in the center; if >= 10, carry 1 to the left',
            visualType: 'steps',
            details: [
              { label: 'No Carry: 43 x 11', value: '4 | (4+3) | 3 = 473' },
              { label: 'No Carry: 62 x 11', value: '6 | (6+2) | 2 = 682' },
              { label: 'With Carry: 78 x 11', value: '7 | (7+8=15) | 8 -> (7+1) | 5 | 8 = 858' },
              { label: 'With Carry: 89 x 11', value: '8 | (8+9=17) | 9 -> (8+1) | 7 | 9 = 979' }
            ],
            mnemonicOrTakeaway: 'Split the bread, butter the middle with their sum!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c4_vm_t1',
            title: 'Multiplying 3-Digit Numbers by 11',
            tagline: 'Extend the sandwich trick to any size number!',
            difficulty: 'Medium',
            howItWorks: [
              'Multiply 243 x 11:',
              'Keep first digit: 2.',
              'Add 1st + 2nd: 2 + 4 = 6.',
              'Add 2nd + 3rd: 4 + 3 = 7.',
              'Keep last digit: 3.',
              'Result: 2,673!'
            ],
            example: {
              question: 'Calculate 152 x 11',
              steps: [
                'First digit: 1.',
                '1 + 5 = 6.',
                '5 + 2 = 7.',
                'Last digit: 2.',
                'Assemble: 1,672.'
              ],
              answer: '1,672'
            },
            commonPitfall: 'Forgetting to add pairs sequentially from left to right.',
            timeSaved: 'Calculates in 3 seconds what takes 45 seconds on paper.'
          }
        ],
        quiz: [
          {
            id: 'c4_vm_q1',
            question: 'What is 54 x 11 using the sandwich method?',
            options: ['584', '594', '504', '544'],
            correctIndex: 1,
            hint: 'First digit 5, last digit 4, middle digit 5 + 4.',
            explanation: '5 | (5+4=9) | 4 = 594.',
            difficulty: 'Easy'
          },
          {
            id: 'c4_vm_q2',
            question: 'What is 67 x 11 (requires carry)?',
            options: ['727', '737', '6137', '747'],
            correctIndex: 1,
            hint: '6 + 7 = 13. Write 3 in middle, carry 1 to 6.',
            explanation: '6 | 13 | 7 => (6+1) | 3 | 7 = 737.',
            difficulty: 'Medium'
          }
        ]
      }
    }
  },

  5: {
    grade: 5,
    gradeTitle: 'Class 5: Factors, LCM/HCF & Ekadhikena Purvena',
    levelTier: 'Primary (Classes 1-5)',
    themeDescription: 'Prime factorization, decimals & unitary method, Soroban Family Friends (+6, +7, +8, +9 combinations), and Vedic squaring of numbers ending in 5.',
    pillars: {
      basic_maths: {
        pillar: 'basic_maths',
        pillarName: 'Basic Maths',
        tagline: 'Prime Factorization, HCF/LCM, Decimals & Unitary Method',
        iconName: 'Calculator',
        flowchart: {
          title: 'How to Find the HCF (Highest Common Factor) by Prime Factorization',
          concept: 'Find all common prime building blocks and multiply the lowest powers',
          realWorldExample: 'Example: Find HCF of 24 and 36',
          nodes: [
            { id: '1', type: 'start', title: 'Break 24 into Primes', description: '24 = 2 x 2 x 2 x 3 = (2^3) x (3^1).' },
            { id: '2', type: 'process', title: 'Break 36 into Primes', description: '36 = 2 x 2 x 3 x 3 = (2^2) x (3^2).' },
            { id: '3', type: 'decision', title: 'Identify Common Prime Bases', description: 'Both numbers share bases 2 and 3.' },
            { id: '4', type: 'process', title: 'Pick the Smallest Exponents', description: 'For base 2: min(3, 2) is 2^2 (4). For base 3: min(1, 2) is 3^1 (3).' },
            { id: '5', type: 'output', title: 'Multiply Selected Primes', description: 'HCF = 4 x 3 = 12. 12 is the largest number dividing both exactly.' }
          ]
        },
        infographics: [
          {
            id: 'c5_bm_1',
            title: 'HCF vs LCM: The Ultimate Clarification',
            subtitle: 'Highest Common Factor vs Lowest Common Multiple',
            category: 'Number Theory',
            keyRule: 'HCF is always <= the numbers; LCM is always >= the numbers!',
            visualType: 'comparison',
            details: [
              { label: 'HCF (Divisor)', value: 'The largest number that DIVIDES into both (Sharing pizza evenly)' },
              { label: 'LCM (Multiple)', value: 'The smallest number that both DIVIDE INTO (Synchronizing flashing traffic lights)' },
              { label: 'Golden Relationship', value: 'HCF(a, b) x LCM(a, b) = a x b' }
            ],
            mnemonicOrTakeaway: 'HCF shrinks down to fit inside; LCM grows up to catch both!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c5_bm_t1',
            title: 'The Division Ladder for Instant LCM & HCF',
            tagline: 'Calculate both LCM and HCF in a single unified diagram',
            difficulty: 'Medium',
            howItWorks: [
              'Write numbers side by side: [12, 18].',
              'Divide both by common prime 2 -> [6, 9].',
              'Divide both by common prime 3 -> [2, 3] (stop, no more common factors).',
              'HCF = Multiply side column (2 x 3 = 6).',
              'LCM = Multiply L-shape: 2 x 3 x 2 x 3 = 36!'
            ],
            example: {
              question: 'Find HCF and LCM of 12 and 18',
              steps: [
                'Left side common primes: 2 and 3. HCF = 6.',
                'Remaining bottom: 2 and 3.',
                'LCM = 6 x 2 x 3 = 36.'
              ],
              answer: 'HCF = 6, LCM = 36'
            },
            commonPitfall: 'Multiplying all numbers to find HCF instead of just the left column.',
            timeSaved: 'Cuts calculation time by 75%.'
          }
        ],
        quiz: [
          {
            id: 'c5_bm_q1',
            question: 'What is the HCF of 18 and 24?',
            options: ['3', '6', '12', '72'],
            correctIndex: 1,
            hint: 'What is the largest number dividing both 18 and 24?',
            explanation: 'Factors of 18: 1, 2, 3, 6, 9, 18. Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Greatest common is 6.',
            difficulty: 'Easy'
          },
          {
            id: 'c5_bm_q2',
            question: 'If HCF(a,b) = 4 and LCM(a,b) = 24, and one number is 8, what is the other number?',
            options: ['6', '12', '16', '20'],
            correctIndex: 1,
            hint: 'Formula: HCF x LCM = a x b. (4 x 24) = 8 x b.',
            explanation: '96 = 8 x b => b = 96 / 8 = 12.',
            difficulty: 'Medium'
          }
        ]
      },

      algebra: {
        pillar: 'algebra',
        pillarName: 'Algebra & Patterns',
        tagline: 'Algebraic Expressions, Like Terms & Word Problem Translation',
        iconName: 'Sparkles',
        flowchart: {
          title: 'How to Translate English Sentences into Algebra',
          concept: 'Dictionary of mathematical keywords',
          realWorldExample: 'Translate: "Seven more than three times a number is twenty-five"',
          nodes: [
            { id: '1', type: 'start', title: 'Define the Unknown Variable', description: 'Let the unknown number be represented by letter "n".' },
            { id: '2', type: 'process', title: 'Identify "Three times a number"', description: 'Three times n translates to 3n.' },
            { id: '3', type: 'process', title: 'Identify "Seven more than"', description: '"More than" means addition (+ 7): 3n + 7.' },
            { id: '4', type: 'process', title: 'Identify "Is twenty-five"', description: '"Is" translates to equal sign (= 25).' },
            { id: '5', type: 'output', title: 'Final Algebraic Equation', description: '3n + 7 = 25. Ready to solve!' }
          ]
        },
        infographics: [
          {
            id: 'c5_alg_1',
            title: 'Algebra Word Translator Guide',
            subtitle: 'How to decode word problems into equations',
            category: 'Math Language',
            keyRule: 'Words tell the mathematical operations in code',
            visualType: 'steps',
            details: [
              { label: 'Sum, More Than, Increased By', value: 'Addition (+)' },
              { label: 'Difference, Less Than, Decreased By', value: 'Subtraction (-)' },
              { label: 'Product, Times, Twice, Thrice', value: 'Multiplication (x)' },
              { label: 'Quotient, Shared, Divided By', value: 'Division (/)' },
              { label: 'Is, Equals, Results In, Yields', value: 'Equals (=)' }
            ],
            mnemonicOrTakeaway: 'Watch out for "less than": "5 less than x" means x - 5, NOT 5 - x!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c5_alg_t1',
            title: 'The Fruit Basket Rule for Like Terms',
            tagline: 'Apples only add to apples; bananas only add to bananas',
            difficulty: 'Easy',
            howItWorks: [
              'In 3x + 4y + 2x + 5:',
              'Combine x terms: 3x + 2x = 5x.',
              'Keep y terms: 4y.',
              'Keep pure number: 5.',
              'Simplified: 5x + 4y + 5 (You cannot add 5x and 4y together!).'
            ],
            example: {
              question: 'Simplify: 4a + 7b - 2a + 3b',
              steps: [
                'Group a terms: 4a - 2a = 2a.',
                'Group b terms: 7b + 3b = 10b.',
                'Combine: 2a + 10b.'
              ],
              answer: '2a + 10b'
            },
            commonPitfall: 'Writing 2a + 10b = 12ab (Never fuse unlike variables into multiplication!).',
            timeSaved: 'Prevents the universal middle school algebra blunder.'
          }
        ],
        quiz: [
          {
            id: 'c5_alg_q1',
            question: 'Simplify the expression: 6x + 8 - 2x + 4',
            options: ['8x + 12', '4x + 12', '4x + 4', '16x'],
            correctIndex: 1,
            hint: 'Group the x terms: 6x - 2x. Group the constants: 8 + 4.',
            explanation: '(6x - 2x) + (8 + 4) = 4x + 12.',
            difficulty: 'Easy'
          },
          {
            id: 'c5_alg_q2',
            question: 'Translate into an equation: "Five less than twice a number x is 19"',
            options: ['5 - 2x = 19', '2x - 5 = 19', '2x + 5 = 19', 'x / 2 - 5 = 19'],
            correctIndex: 1,
            hint: 'Twice a number is 2x. Five less than that is 2x - 5.',
            explanation: '2x - 5 = 19.',
            difficulty: 'Medium'
          }
        ]
      },

      abacus: {
        pillar: 'abacus',
        pillarName: 'Abacus (Soroban)',
        tagline: 'Family Friends (Combination Complements +6, +7, +8, +9)',
        iconName: 'Grid',
        flowchart: {
          title: 'How to Execute Combination Bead Movement (+6)',
          concept: 'When neither direct nor simple big friend works: +6 = +1 - 5 + 10',
          realWorldExample: 'Example: You have 5 on the rod and need to add 6 (5 + 6 = 11)',
          nodes: [
            { id: '1', type: 'start', title: 'Inspect Unit Rod', description: 'Bead 5 is DOWN (active). No other beads are active.' },
            { id: '2', type: 'decision', title: 'Can we do Big Friend (-4 + 10)?', description: 'No! There are 0 lower beads active to subtract 4 from!' },
            { id: '3', type: 'process', title: 'Activate Family Friend Rule', description: 'Formula for +6: Push 1 lower bead UP (+1), push upper bead UP (-5), push 1 tens bead UP (+10).' },
            { id: '4', type: 'process', title: 'Execute Simultaneous Move', description: '+1 on lower, -5 on upper, +1 on tens rod.' },
            { id: '5', type: 'output', title: 'Resulting Value', description: 'Tens: 1 | Units: 1 -> Reads 11!' }
          ]
        },
        infographics: [
          {
            id: 'c5_ab_1',
            title: 'The Family Friends Quartet',
            subtitle: 'The fusion of 5-complements and 10-complements',
            category: 'Advanced Soroban',
            keyRule: 'Used when subtracting the Big Friend requires breaking down 5',
            visualType: 'steps',
            details: [
              { label: '+6 Formula', value: '+1 - 5 + 10 (Add 1 lower, remove 5, add 10)' },
              { label: '+7 Formula', value: '+2 - 5 + 10 (Add 2 lower, remove 5, add 10)' },
              { label: '+8 Formula', value: '+3 - 5 + 10 (Add 3 lower, remove 5, add 10)' },
              { label: '+9 Formula', value: '+4 - 5 + 10 (Add 4 lower, remove 5, add 10)' }
            ],
            mnemonicOrTakeaway: 'Add the tail, kick the five, promote the ten!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c5_ab_t1',
            title: 'Mastering the 3-Way Family Motion',
            tagline: 'Turn 3 separate thoughts into 1 fluid flick of the hand',
            difficulty: 'Medium',
            howItWorks: [
              'Thumb pushes 1 bead up.',
              'Forefinger lifts upper bead up.',
              'Left hand thumb advances the tens rod.',
              'Practice with 5 + 6, 6 + 7, 7 + 8 drills.'
            ],
            example: {
              question: 'Execute 7 + 7 on abacus',
              steps: [
                'Set 7 (upper 5 + two lower 2).',
                'Add 7 formula: +2 - 5 + 10.',
                'Push 2 lower beads up (now 4 lower beads).',
                'Remove upper 5.',
                'Add 10 on tens rod.',
                'Result: 1 ten + 4 units = 14.'
              ],
              answer: '14'
            },
            commonPitfall: 'Forgetting to subtract the 5 upper bead.',
            timeSaved: 'Unlocks complete addition mastery of all numbers 1-99 on Soroban.'
          }
        ],
        quiz: [
          {
            id: 'c5_ab_q1',
            question: 'What is the combination (Family Friend) formula to add 8 on the abacus?',
            options: ['+8 = +3 - 5 + 10', '+8 = +2 - 5 + 10', '+8 = -2 + 10', '+8 = +5 + 3'],
            correctIndex: 0,
            hint: '8 = 5 + 3. So add 3, remove 5, add 10.',
            explanation: '+8 = +3 - 5 + 10 is the combination formula.',
            difficulty: 'Hard'
          },
          {
            id: 'c5_ab_q2',
            question: 'You have 6 on a rod. You add 7 using +2 - 5 + 10. What is the result?',
            options: ['12', '13', '14', '15'],
            correctIndex: 1,
            hint: '6 + 7 = ?',
            explanation: '6 + 7 = 13.',
            difficulty: 'Easy'
          }
        ]
      },

      vedic_maths: {
        pillar: 'vedic_maths',
        pillarName: 'Vedic Maths',
        tagline: 'Sutra: Ekadhikena Purvena (Squaring Numbers Ending in 5)',
        iconName: 'Flame',
        flowchart: {
          title: 'How to Square Any Number Ending in 5 in 1 Second',
          concept: 'Sutra: By One More than the Previous One',
          realWorldExample: 'Example: Calculate 75^2 (75 x 75)',
          nodes: [
            { id: '1', type: 'start', title: 'Identify Digits', description: 'Number is 75. Previous digit is 7, last digit is 5.' },
            { id: '2', type: 'process', title: 'Right-Hand Part of Answer', description: '5 x 5 is ALWAYS 25. Write 25 at the end: [ ? ] 25.' },
            { id: '3', type: 'process', title: 'Apply Ekadhikena (One More Than)', description: 'Previous digit is 7. One more than 7 is 8.' },
            { id: '4', type: 'process', title: 'Multiply Left Digits', description: 'Multiply 7 by (7 + 1): 7 x 8 = 56.' },
            { id: '5', type: 'output', title: 'Join Left and Right', description: 'Left: 56, Right: 25 -> Answer is 5,625! Calculated without scratch paper.' }
          ]
        },
        infographics: [
          {
            id: 'c5_vm_1',
            title: 'Ekadhikena Purvena Cheat Sheet',
            subtitle: 'Instant squares of all numbers ending in 5',
            category: 'Speed Squares',
            keyRule: 'Answer = n(n+1) | 25',
            visualType: 'steps',
            details: [
              { label: '15 x 15', value: '1 x 2 | 25 = 225' },
              { label: '25 x 25', value: '2 x 3 | 25 = 625' },
              { label: '35 x 35', value: '3 x 4 | 25 = 1,225' },
              { label: '45 x 45', value: '4 x 5 | 25 = 2,025' },
              { label: '65 x 65', value: '6 x 7 | 25 = 4,225' },
              { label: '85 x 85', value: '8 x 9 | 25 = 7,225' },
              { label: '105 x 105', value: '10 x 11 | 25 = 11,025' }
            ],
            mnemonicOrTakeaway: 'Multiply the head by its neighbor, tail is always twenty-five!'
          }
        ],
        tipsAndTricks: [
          {
            id: 'c5_vm_t1',
            title: 'Generalizing Ekadhikena: Units Adding to 10',
            tagline: 'Works on ANY two numbers if tens are same and units sum to 10!',
            difficulty: 'Medium',
            howItWorks: [
              'Multiply 43 x 47:',
              'Tens are both 4.',
              'Units: 3 + 7 = 10.',
              'Left part: 4 x (4+1) = 4 x 5 = 20.',
              'Right part: 3 x 7 = 21.',
              'Answer: 2,021!'
            ],
            example: {
              question: 'Calculate 62 x 68 mentally',
              steps: [
                'Tens digit is 6: 6 x 7 = 42.',
                'Units: 2 x 8 = 16.',
                'Combine: 4,216.'
              ],
              answer: '4,216'
            },
            commonPitfall: 'Using this trick when the units do NOT add up to 10.',
            timeSaved: 'Solves complex multiplications in 2 seconds flat.'
          }
        ],
        quiz: [
          {
            id: 'c5_vm_q1',
            question: 'What is 65^2 using Ekadhikena Purvena?',
            options: ['4125', '4225', '4325', '4525'],
            correctIndex: 1,
            hint: '6 x (6 + 1) = 6 x 7 = 42. End with 25.',
            explanation: '6 x 7 = 42, followed by 25 => 4,225.',
            difficulty: 'Easy'
          },
          {
            id: 'c5_vm_q2',
            question: 'Calculate 73 x 77 using the Vedic special units trick:',
            options: ['5621', '5521', '4921', '5631'],
            correctIndex: 0,
            hint: 'Tens: 7 x 8 = 56. Units: 3 x 7 = 21.',
            explanation: '7 x (7+1) = 56. 3 x 7 = 21. Total is 5,621.',
            difficulty: 'Medium'
          }
        ]
      }
    }
  }
};
