export type ArithmeticOperation = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'square' | 'cube';

export interface OperationMethod {
  name: string;
  source: 'Standard' | 'Abacus Soroban' | 'Vedic Maths';
  tagline: string;
  steps: string[];
  workedExample: {
    input: string;
    result: string;
    explanation: string;
  };
}

export interface OperationDetail {
  id: ArithmeticOperation;
  title: string;
  symbol: string;
  tagline: string;
  colorScheme: {
    badge: string;
    border: string;
    bg: string;
    text: string;
    gradient: string;
  };
  overview: string;
  methods: OperationMethod[];
  visualModel: {
    type: 'beads' | 'numberline' | 'grid' | 'cube3d' | 'area';
    caption: string;
  };
  speedDrillDefaults: {
    rangeMin: number;
    rangeMax: number;
    secondArgMin?: number;
    secondArgMax?: number;
  };
}

export const arithmeticOperationsData: Record<ArithmeticOperation, OperationDetail> = {
  addition: {
    id: 'addition',
    title: 'Addition Mastery',
    symbol: '+',
    tagline: 'Combine numbers lightning-fast using 10-friends, column splitting & left-to-right flow',
    colorScheme: {
      badge: 'bg-emerald-100 text-emerald-800',
      border: 'border-emerald-200',
      bg: 'bg-emerald-50/50',
      text: 'text-emerald-700',
      gradient: 'from-emerald-600 via-teal-600 to-emerald-800'
    },
    overview: 'Mental addition works best from LEFT to RIGHT (hundreds first, then tens, then ones) or by rounding to the nearest friendly base (10, 50, 100) and adjusting.',
    methods: [
      {
        name: 'Vedic Shunyant (Rounding to Friendly Zeroes)',
        source: 'Vedic Maths',
        tagline: 'Round one number up to a multiple of 10, then subtract the difference.',
        steps: [
          'Identify which number is closest to a multiple of 10 or 100.',
          'Add the rounded base to the first number.',
          'Subtract the complement added in step 1.'
        ],
        workedExample: {
          input: '68 + 47',
          result: '115',
          explanation: 'Round 68 up to 70 (+2). Now add 70 + 47 = 117. Subtract the extra 2: 117 - 2 = 115!'
        }
      },
      {
        name: 'Left-to-Right Mental Column Split',
        source: 'Standard',
        tagline: 'Never carry on paper—add most significant digits first in your head.',
        steps: [
          'Add hundreds: 300 + 400 = 700.',
          'Add tens: 700 + (50 + 80) = 700 + 130 = 830.',
          'Add ones: 830 + (6 + 7) = 830 + 13 = 843.'
        ],
        workedExample: {
          input: '356 + 487',
          result: '843',
          explanation: '300 + 400 = 700. Add 50 + 80 = 130 => 830. Add 6 + 7 = 13 => 843.'
        }
      },
      {
        name: 'Soroban Small & Big Friends Bead Addition',
        source: 'Abacus Soroban',
        tagline: 'Use 5-complements (+4 = +5 - 1) and 10-complements (+8 = -2 + 10).',
        steps: [
          'If lower earth beads full, bring upper 5-bead down and subtract complement.',
          'If whole rod full, subtract 10-complement from rod and push 1 bead up on next left rod.'
        ],
        workedExample: {
          input: '7 + 8',
          result: '15',
          explanation: 'To add 8 on a rod displaying 7: 8 needs 2 to make 10. Subtract 2 earth beads from units rod, add 1 earth bead to tens rod => 15.'
        }
      }
    ],
    visualModel: {
      type: 'beads',
      caption: 'Soroban beads sliding into the reckoning beam: lower deck 1s and upper deck 5s.'
    },
    speedDrillDefaults: {
      rangeMin: 12,
      rangeMax: 99,
      secondArgMin: 11,
      secondArgMax: 89
    }
  },

  subtraction: {
    id: 'subtraction',
    title: 'Subtraction Mastery',
    symbol: '−',
    tagline: 'Eliminate borrow confusion with Nikhilam Sutra and complement addition',
    colorScheme: {
      badge: 'bg-rose-100 text-rose-800',
      border: 'border-rose-200',
      bg: 'bg-rose-50/50',
      text: 'text-rose-700',
      gradient: 'from-rose-600 via-pink-600 to-rose-800'
    },
    overview: 'Borrowing across zeroes (like 1000 - 367) is the #1 cause of arithmetic errors. Vedic Nikhilam converts subtraction from base powers into simple single-digit subtraction from 9 and 10.',
    methods: [
      {
        name: 'Nikhilam Navatashcaramam Dashatah (All from 9 and last from 10)',
        source: 'Vedic Maths',
        tagline: 'Subtract each digit from 9, and the last non-zero digit from 10.',
        steps: [
          'Check that base is 100, 1,000, 10,000, etc.',
          'Subtract every digit from left to right from 9.',
          'Subtract the final rightmost digit from 10.'
        ],
        workedExample: {
          input: '10,000 - 4,728',
          result: '5,272',
          explanation: '9 - 4 = 5 | 9 - 7 = 2 | 9 - 2 = 7 | 10 - 8 = 2 => 5,272 in 2 seconds!'
        }
      },
      {
        name: 'Equal Addition / Shopkeeper Change Method',
        source: 'Standard',
        tagline: 'Count UP from the subtracted number to the target.',
        steps: [
          'Start at the subtrahend.',
          'Hop up to next multiple of 10, then next 100, then target.',
          'Sum the hops.'
        ],
        workedExample: {
          input: '100 - 64',
          result: '36',
          explanation: 'Start at 64. Hop 6 to reach 70. Hop 30 to reach 100. Total hop = 6 + 30 = 36.'
        }
      }
    ],
    visualModel: {
      type: 'numberline',
      caption: 'Number line jumps showing positive complement distance from nearest base.'
    },
    speedDrillDefaults: {
      rangeMin: 40,
      rangeMax: 150,
      secondArgMin: 11,
      secondArgMax: 89
    }
  },

  multiplication: {
    id: 'multiplication',
    title: 'Multiplication Mastery',
    symbol: '×',
    tagline: 'Urdhva Tiryagbhyam (Vertically & Crosswise), base deviations & instant 11/99 shortcuts',
    colorScheme: {
      badge: 'bg-indigo-100 text-indigo-800',
      border: 'border-indigo-200',
      bg: 'bg-indigo-50/50',
      text: 'text-indigo-700',
      gradient: 'from-indigo-600 via-blue-600 to-indigo-900'
    },
    overview: 'Any two numbers can be multiplied in a single line without messy multiple-row additions using Vertically & Crosswise, or Nikhilam near powers of 10.',
    methods: [
      {
        name: 'Urdhva Tiryagbhyam (Vertically and Crosswise 2x2)',
        source: 'Vedic Maths',
        tagline: '3-step single line algorithm: Units vertical, Cross-multiply & sum, Tens vertical.',
        steps: [
          'Step 1: Multiply unit digits vertically (b × d). Keep unit, carry tens.',
          'Step 2: Cross-multiply and add (a × d + b × c) + carry. Keep unit, carry tens.',
          'Step 3: Multiply tens digits vertically (a × c) + carry.'
        ],
        workedExample: {
          input: '32 × 24',
          result: '768',
          explanation: 'Step 1: 2 × 4 = 8. Step 2: (3×4) + (2×2) = 12 + 4 = 16 (write 6, carry 1). Step 3: (3×2) + 1 = 7. Result: 768!'
        }
      },
      {
        name: 'Nikhilam Base 100 Multiplication',
        source: 'Vedic Maths',
        tagline: 'For numbers near 100, calculate deviations and cross-add.',
        steps: [
          'Find deviations from 100: e.g. 96 is (-4), 93 is (-7).',
          'Left side: Cross-add (96 - 7 = 89).',
          'Right side: Multiply deviations: (-4) × (-7) = 28.'
        ],
        workedExample: {
          input: '98 × 97',
          result: '9506',
          explanation: 'Deviations from 100: -2 and -3. Left: 98 - 3 = 95. Right: (-2) × (-3) = 06. Result = 9506.'
        }
      },
      {
        name: 'Doubling and Halving Strategy',
        source: 'Standard',
        tagline: 'When one number is even and the other ends in 5, halve the even and double the other.',
        steps: [
          'Halve the even number.',
          'Double the other number.',
          'Multiply the new friendly numbers.'
        ],
        workedExample: {
          input: '18 × 35',
          result: '630',
          explanation: 'Halve 18 = 9. Double 35 = 70. Now 9 × 70 = 630!'
        }
      }
    ],
    visualModel: {
      type: 'area',
      caption: '2D area array grid splitting tens and units crosswise.'
    },
    speedDrillDefaults: {
      rangeMin: 11,
      rangeMax: 99,
      secondArgMin: 3,
      secondArgMax: 25
    }
  },

  division: {
    id: 'division',
    title: 'Division Mastery',
    symbol: '÷',
    tagline: 'Divide by 5, 25, 9 in seconds; Paravartya flag division & divisibility tests',
    colorScheme: {
      badge: 'bg-amber-100 text-amber-800',
      border: 'border-amber-200',
      bg: 'bg-amber-50/50',
      text: 'text-amber-700',
      gradient: 'from-amber-600 via-orange-600 to-amber-800'
    },
    overview: 'Division is the inverse of multiplication. By converting tricky divisors like 5 or 25 into powers of 10 (10/2 or 100/4), long division becomes simple doubling.',
    methods: [
      {
        name: 'Dividing by 5: Double & Shift Decimal',
        source: 'Vedic Maths',
        tagline: 'Since 5 = 10 / 2, dividing by 5 is identical to multiplying by 2 then dividing by 10.',
        steps: [
          'Double the dividend (multiply by 2).',
          'Move the decimal point 1 place to the left.'
        ],
        workedExample: {
          input: '342 ÷ 5',
          result: '68.4',
          explanation: 'Double 342 = 684. Shift decimal 1 position left = 68.4!'
        }
      },
      {
        name: 'Dividing by 25: Quadruple & Shift 2 Decimals',
        source: 'Vedic Maths',
        tagline: 'Since 25 = 100 / 4, dividing by 25 equals multiplying by 4 and dividing by 100.',
        steps: [
          'Multiply by 4 (double twice).',
          'Shift decimal point 2 places to the left.'
        ],
        workedExample: {
          input: '180 ÷ 25',
          result: '7.2',
          explanation: '180 × 4 = 720. Shift 2 decimal places = 7.20 = 7.2!'
        }
      },
      {
        name: 'Paravartya Yojayet (Flag Division)',
        source: 'Vedic Maths',
        tagline: 'Synthetic single-line division by transposing the divisor digits.',
        steps: [
          'Separate the divisor into main base and flag digit.',
          'Divide by base, subtract product of quotient and flag from next dividend remainder.'
        ],
        workedExample: {
          input: '1234 ÷ 12',
          result: '102 R 10',
          explanation: '12 into 12 = 1 rem 0. 12 into 34 = 2 rem 10 => Quotient = 102, Remainder = 10.'
        }
      }
    ],
    visualModel: {
      type: 'grid',
      caption: 'Equal partition sharing grid.'
    },
    speedDrillDefaults: {
      rangeMin: 45,
      rangeMax: 500,
      secondArgMin: 2,
      secondArgMax: 12
    }
  },

  square: {
    id: 'square',
    title: 'Square (x²) Mastery',
    symbol: 'x²',
    tagline: 'Ekadhikena for numbers ending in 5, Yavadunam near 50/100 & Duplex (Dvandva) squaring',
    colorScheme: {
      badge: 'bg-purple-100 text-purple-800',
      border: 'border-purple-200',
      bg: 'bg-purple-50/50',
      text: 'text-purple-700',
      gradient: 'from-purple-600 via-violet-600 to-purple-900'
    },
    overview: 'Squaring a number means multiplying it by itself. Geometric decomposition into a² + 2ab + b² enables squaring ANY two-digit number mentally in under 3 seconds.',
    methods: [
      {
        name: 'Ekadhikena Purvena (Numbers ending in 5)',
        source: 'Vedic Maths',
        tagline: 'For (n5)², multiply n by (n + 1), then tag 25 at the end.',
        steps: [
          'Take all digits before 5 (let it be n).',
          'Multiply n by (n + 1).',
          'Attach 25 to the right.'
        ],
        workedExample: {
          input: '85²',
          result: '7,225',
          explanation: 'First part: 8 × (8 + 1) = 8 × 9 = 72. Second part: 25. Answer: 7225!'
        }
      },
      {
        name: 'Duplex Method (Dvandva Yoga) for ANY 2-digit number (ab)²',
        source: 'Vedic Maths',
        tagline: 'Formula: a² | 2ab | b² with standard carrying from right to left.',
        steps: [
          'Right part: b² (keep units, carry tens).',
          'Middle part: 2 × a × b + carry (keep units, carry tens).',
          'Left part: a² + carry.'
        ],
        workedExample: {
          input: '43²',
          result: '1,849',
          explanation: 'b² = 3² = 9. Middle = 2 × 4 × 3 = 24 (write 4, carry 2). Left = 4² + 2 = 16 + 2 = 18. Answer: 1849!'
        }
      },
      {
        name: 'Yavadunam (Base 50 Shortcut)',
        source: 'Vedic Maths',
        tagline: 'For numbers near 50: (25 ± d) | d².',
        steps: [
          'Find deviation d from 50 (e.g. 54 is +4).',
          'Left part: 25 + d = 25 + 4 = 29.',
          'Right part: d² = 4² = 16.'
        ],
        workedExample: {
          input: '54²',
          result: '2,916',
          explanation: 'Deviation from 50 is +4. Left: 25 + 4 = 29. Right: 4² = 16. Answer: 2916!'
        }
      }
    ],
    visualModel: {
      type: 'area',
      caption: 'Geometric square decomposed into a² square, b² square, and two ab rectangles.'
    },
    speedDrillDefaults: {
      rangeMin: 11,
      rangeMax: 99
    }
  },

  cube: {
    id: 'cube',
    title: 'Cube (x³) Mastery',
    symbol: 'x³',
    tagline: 'Anurupyena ratio method, 3D volume decomposition & 2-second cube root shortcut',
    colorScheme: {
      badge: 'bg-cyan-100 text-cyan-800',
      border: 'border-cyan-200',
      bg: 'bg-cyan-50/50',
      text: 'text-cyan-700',
      gradient: 'from-cyan-600 via-sky-600 to-cyan-900'
    },
    overview: 'A cube represents 3-dimensional volume: (a + b)³ = a³ + 3a²b + 3ab² + b³. Vedic ratio expansion (Anurupyena) makes mental cubing structured and rapid.',
    methods: [
      {
        name: 'Anurupyena (Ratio Cubing Method)',
        source: 'Vedic Maths',
        tagline: 'Write 4 terms in geometric progression with ratio b/a, double the middle two, and add.',
        steps: [
          'Row 1: a³ , a²b , ab² , b³.',
          'Row 2: Double the middle two terms (2a²b and 2ab²).',
          'Add column-wise from right to left with carrying.'
        ],
        workedExample: {
          input: '12³',
          result: '1,728',
          explanation: 'Here a=1, b=2. Ratio = 2. Row 1: 1, 2, 4, 8. Row 2: _, 4, 8, _. Add columns: 1 | (2+4=6) | (4+8=12, write 2 carry 1) | 8 => 1 | 7 | 2 | 8 = 1728!'
        }
      },
      {
        name: '2-Second Cube Root Inspection (Vilokanam)',
        source: 'Vedic Maths',
        tagline: 'Every single digit (0-9) maps to a unique ending digit when cubed!',
        steps: [
          'Notice unit digits: 1³->1, 4³->4, 5³->5, 6³->6, 9³->9, 0³->0 (Same!).',
          'Complements of 10: 2³->8, 8³->2, 3³->7, 7³->3 (Flipped!).',
          'Strike out last 3 digits. Find largest cube ≤ remaining group for tens digit.'
        ],
        workedExample: {
          input: 'Cube root of 17,576',
          result: '26',
          explanation: 'Ends in 6 => units digit is 6. Strike out 576. Leftover is 17. Largest cube ≤ 17 is 2³=8 (since 3³=27 is too big). Tens digit is 2. Answer is 26!'
        }
      }
    ],
    visualModel: {
      type: 'cube3d',
      caption: '3D volume block decomposition into a³ block, three a²b slabs, three ab² prisms, and b³ corner.'
    },
    speedDrillDefaults: {
      rangeMin: 2,
      rangeMax: 25
    }
  }
};
