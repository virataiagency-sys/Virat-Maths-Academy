export type GlossaryCategory =
  | 'all'
  | 'arithmetic'
  | 'algebra'
  | 'geometry'
  | 'fractions'
  | 'speed_math'
  | 'advanced';

export type VisualType =
  | 'fraction_bar'
  | 'shape_triangle'
  | 'shape_circle'
  | 'coordinate_grid'
  | 'factor_tree'
  | 'balance_scale'
  | 'vedic_card'
  | 'abacus_beads'
  | 'number_line'
  | 'formula_card';

export interface GlossaryTerm {
  id: string;
  term: string;
  pronunciation?: string;
  category: 'arithmetic' | 'algebra' | 'geometry' | 'fractions' | 'speed_math' | 'advanced';
  minGrade: number;
  maxGrade: number;
  definition: string;
  simpleExplanation: string;
  formulaOrNotation?: string;
  example: string;
  visualType: VisualType;
  visualData?: Record<string, any>;
  tags: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // Primary & Middle Arithmetic
  {
    id: 'place_value',
    term: 'Place Value',
    pronunciation: '/pleɪs ˈvæl.juː/',
    category: 'arithmetic',
    minGrade: 1,
    maxGrade: 5,
    definition: 'The value represented by a digit in a number based on its positional order (units, tens, hundreds, thousands).',
    simpleExplanation: 'The room where a number sits decides how much it is worth. In 345, the 3 is in the hundreds room, so it means 300, not just 3!',
    formulaOrNotation: '345 = 300 + 40 + 5',
    example: 'In 4,821: 4 = thousands (4,000), 8 = hundreds (800), 2 = tens (20), 1 = ones (1).',
    visualType: 'number_line',
    visualData: { chunks: ['Thousands: 4,000', 'Hundreds: 800', 'Tens: 20', 'Units: 1'] },
    tags: ['place value', 'digits', 'numbers', 'primary', 'hundreds', 'tens']
  },
  {
    id: 'prime_number',
    term: 'Prime Number',
    pronunciation: '/praɪm ˈnʌm.bər/',
    category: 'arithmetic',
    minGrade: 4,
    maxGrade: 10,
    definition: 'A whole number strictly greater than 1 that cannot be formed by multiplying two smaller whole numbers; it has exactly two distinct factors: 1 and itself.',
    simpleExplanation: 'An unbreakable number. You cannot arrange 7 candies into equal rectangular rows without having leftover candies, except for a single row of 7!',
    formulaOrNotation: 'Factors of p = {1, p}',
    example: '2, 3, 5, 7, 11, 13, 17, 19, 23 (2 is the only even prime).',
    visualType: 'factor_tree',
    visualData: { number: 12, branchL: 2, branchR: 6, subL: 2, subR: 3, primeExample: '7 has only 1 × 7' },
    tags: ['prime', 'factors', 'integers', 'divisibility', 'number theory']
  },
  {
    id: 'lcm_hcf',
    term: 'LCM & HCF (GCD)',
    pronunciation: '/ˌɛl.siːˈɛm ænd ˌeɪtʃ.siːˈɛf/',
    category: 'arithmetic',
    minGrade: 4,
    maxGrade: 10,
    definition: 'LCM (Lowest Common Multiple) is the smallest positive integer divisible by both numbers. HCF (Highest Common Factor) is the greatest factor that divides both.',
    simpleExplanation: 'HCF is the biggest measuring stick that fits into both numbers evenly. LCM is the first train station where two different train schedules arrive at the exact same minute.',
    formulaOrNotation: 'HCF(a, b) × LCM(a, b) = a × b',
    example: 'For 12 and 18: HCF = 6, LCM = 36. Notice: 6 × 36 = 216 = 12 × 18.',
    visualType: 'formula_card',
    visualData: { title: 'Product Property', highlight: 'HCF(a, b) × LCM(a, b) = a × b', note: '12 & 18 ➔ HCF=6, LCM=36' },
    tags: ['lcm', 'hcf', 'gcd', 'greatest common divisor', 'multiples', 'factors']
  },

  // Fractions & Decimals
  {
    id: 'equivalent_fractions',
    term: 'Equivalent Fractions',
    pronunciation: '/ɪˈkwɪv.əl.ənt ˈfræk.ʃənz/',
    category: 'fractions',
    minGrade: 3,
    maxGrade: 8,
    definition: 'Two or more fractions that represent the exact same proportion or amount of a whole, despite having different numerators and denominators.',
    simpleExplanation: 'Cutting the same pizza into more slices doesn’t give you more pizza. Eating 1 slice of a 2-slice pizza is the exact same amount as eating 2 slices of a 4-slice pizza!',
    formulaOrNotation: 'a/b = (a × k)/(b × k)',
    example: '1/2 = 2/4 = 3/6 = 4/8 = 50%',
    visualType: 'fraction_bar',
    visualData: { bars: [{ num: 1, den: 2, label: '1/2' }, { num: 2, den: 4, label: '2/4' }, { num: 4, den: 8, label: '4/8' }] },
    tags: ['fractions', 'equivalent', 'numerator', 'denominator', 'parts']
  },
  {
    id: 'mixed_fraction',
    term: 'Mixed Number & Improper Fraction',
    pronunciation: '/mɪkst ˈnʌm.bər/',
    category: 'fractions',
    minGrade: 4,
    maxGrade: 8,
    definition: 'An improper fraction has a numerator larger than or equal to its denominator. A mixed number combines a whole integer and a proper fraction.',
    simpleExplanation: 'If each waffle has 4 squares and you eat 7 squares, you ate 1 full waffle plus 3 extra squares (1 ¾ waffles)!',
    formulaOrNotation: 'N/D = Q + R/D',
    example: '7/4 = 1 ¾ (7 divided by 4 equals 1 whole with 3 remaining).',
    visualType: 'fraction_bar',
    visualData: { bars: [{ num: 4, den: 4, label: '1 Whole' }, { num: 3, den: 4, label: '3/4 Extra' }] },
    tags: ['mixed numbers', 'improper fractions', 'division', 'remainders']
  },

  // Algebra
  {
    id: 'variable_expression',
    term: 'Variable & Algebraic Expression',
    pronunciation: '/ˈveə.ri.ə.bəl/',
    category: 'algebra',
    minGrade: 5,
    maxGrade: 10,
    definition: 'A variable is a symbol (usually x, y) representing an unknown or changing quantity. An expression combines numbers, variables, and operators without an equals sign.',
    simpleExplanation: 'A variable is like an unopened mystery gift box labeled "x". If the box has 3 marbles added to it, the total is "x + 3".',
    formulaOrNotation: 'Expression: 3x + 5 (No "=" sign)',
    example: 'In 3x + 5, if x = 4, the expression evaluates to 3(4) + 5 = 17.',
    visualType: 'balance_scale',
    visualData: { left: '3x + 5', right: '17', solution: 'x = 4' },
    tags: ['variable', 'algebra', 'expression', 'unknown', 'terms']
  },
  {
    id: 'linear_equation',
    term: 'Linear Equation',
    pronunciation: '/ˈlɪn.i.ər ɪˈkweɪ.ʒən/',
    category: 'algebra',
    minGrade: 6,
    maxGrade: 11,
    definition: 'An algebraic equation in which each term has an exponent of 1, graphing as a straight line on the Cartesian coordinate plane.',
    simpleExplanation: 'A balanced two-pan weight scale. Whatever you add, subtract, multiply, or divide on the left side, you must do to the right side to keep it level!',
    formulaOrNotation: 'ax + b = c  or  y = mx + c',
    example: '2x + 6 = 14 ➔ 2x = 8 ➔ x = 4.',
    visualType: 'balance_scale',
    visualData: { left: '2x + 6', right: '14', step: 'Subtract 6 ➔ 2x = 8 ➔ x = 4' },
    tags: ['linear equation', 'algebra', 'balance', 'solve for x', 'graph']
  },
  {
    id: 'quadratic_equation',
    term: 'Quadratic Equation & Discriminant',
    pronunciation: '/kwɒdˈræt.ɪk ɪˈkweɪ.ʒən/',
    category: 'algebra',
    minGrade: 9,
    maxGrade: 12,
    definition: 'A second-degree polynomial equation ax² + bx + c = 0. Its discriminant D = b² - 4ac determines whether roots are real, equal, or complex.',
    simpleExplanation: 'Equations shaped like parabolas (the curve of a thrown basketball). The discriminant D tells you how many times the ball crosses ground level (D > 0: two hits, D = 0: one bounce, D < 0: never hits ground).',
    formulaOrNotation: 'x = (-b ± √(b² - 4ac)) / (2a),  D = b² - 4ac',
    example: 'For x² - 5x + 6 = 0: D = 25 - 24 = 1 > 0 ➔ Roots are x = 2 and x = 3.',
    visualType: 'formula_card',
    visualData: { title: 'Shreedharacharya Formula', highlight: 'x = (-b ± √D) / 2a', note: 'D > 0: 2 real roots | D = 0: 1 real root | D < 0: imaginary' },
    tags: ['quadratic', 'roots', 'discriminant', 'parabola', 'class 10', 'cbse']
  },

  // Geometry
  {
    id: 'pythagorean_theorem',
    term: 'Pythagorean Theorem',
    pronunciation: '/paɪˌθæɡ.əˈriː.ən ˈθɪə.rəm/',
    category: 'geometry',
    minGrade: 7,
    maxGrade: 12,
    definition: 'In any right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two perpendicular sides.',
    simpleExplanation: 'If you walk 3 blocks east and 4 blocks north, the straight-line shortcut distance through the park is exactly 5 blocks (3² + 4² = 9 + 16 = 25 = 5²)!',
    formulaOrNotation: 'a² + b² = c²  (where c is hypotenuse)',
    example: 'Classic Pythagorean Triples: (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25).',
    visualType: 'shape_triangle',
    visualData: { a: 3, b: 4, c: 5, aLabel: 'Base: 3', bLabel: 'Height: 4', cLabel: 'Hypotenuse: 5' },
    tags: ['pythagoras', 'right triangle', 'hypotenuse', 'geometry', 'triangles']
  },
  {
    id: 'circle_properties',
    term: 'Circle (Radius, Diameter & Area)',
    pronunciation: '/ˈsɜː.kəl/',
    category: 'geometry',
    minGrade: 4,
    maxGrade: 10,
    definition: 'A closed 2D shape where all boundary points are equidistant from the center. The diameter is twice the radius; circumference is 2πr; area is πr².',
    simpleExplanation: 'If you spin on one foot with your arm stretched out, your fingertips draw a circle. Your arm length is the radius; the full wingspan across center is the diameter.',
    formulaOrNotation: 'd = 2r,  C = 2πr,  Area = πr²',
    example: 'For a circle with radius r = 7 cm: Diameter = 14 cm, Circumference = 2 × (22/7) × 7 = 44 cm, Area = (22/7) × 7² = 154 cm².',
    visualType: 'shape_circle',
    visualData: { radius: 7, diameter: 14, circumference: '44 cm', area: '154 cm²' },
    tags: ['circle', 'radius', 'diameter', 'circumference', 'area', 'pi']
  },
  {
    id: 'cartesian_plane',
    term: 'Cartesian Coordinate Plane',
    pronunciation: '/kɑːˈtiː.zi.ən pleɪn/',
    category: 'geometry',
    minGrade: 7,
    maxGrade: 12,
    definition: 'A 2D plane defined by a horizontal X-axis and vertical Y-axis intersecting perpendicularly at the origin (0, 0), dividing the space into 4 quadrants.',
    simpleExplanation: 'Like a city map grid where you give coordinates (Street, Avenue). Point (3, 2) means take 3 steps right along X, then 2 steps up along Y!',
    formulaOrNotation: '(x, y),  Origin = (0, 0)',
    example: 'Quadrant I (+, +), Quadrant II (-, +), Quadrant III (-, -), Quadrant IV (+, -).',
    visualType: 'coordinate_grid',
    visualData: { pointX: 3, pointY: 2, label: '(3, 2)' },
    tags: ['coordinates', 'cartesian plane', 'quadrants', 'x-axis', 'y-axis', 'graphs']
  },

  // Speed Math & Vedic Mathematics
  {
    id: 'nikhilam_sutra',
    term: 'Nikhilam Sutra (Base Multiplication)',
    pronunciation: '/nɪk-hɪ-ləm ˈsuː.trə/',
    category: 'speed_math',
    minGrade: 3,
    maxGrade: 12,
    definition: 'A core Vedic Mathematics formula ("All from 9 and the last from 10") used for instant mental multiplication of numbers close to powers of 10 (base 10, 100, 1000).',
    simpleExplanation: 'Instead of multiplying big clumsy numbers like 98 × 97, look at their deficit from 100 (-2 and -3). Cross subtract: 98 - 3 = 95. Multiply deficits: (-2) × (-3) = 06. Answer is 9506 in 3 seconds!',
    formulaOrNotation: '(Base - a)(Base - b) = [Base - (a+b)] | [a × b]',
    example: '96 × 94 ➔ Deficits (-4, -6) ➔ Left: 96 - 6 = 90 | Right: 4 × 6 = 24 ➔ Result = 9024.',
    visualType: 'vedic_card',
    visualData: { num1: 96, def1: '-4', num2: 94, def2: '-6', cross: '96 - 6 = 90', right: '4 × 6 = 24', total: '9024' },
    tags: ['vedic', 'nikhilam', 'speed math', 'base 100', 'mental multiplication']
  },
  {
    id: 'left_to_right_addition',
    term: 'Left-to-Right Mental Addition',
    pronunciation: '/lɛft tuː raɪt əˈdɪʃ.ən/',
    category: 'speed_math',
    minGrade: 2,
    maxGrade: 10,
    definition: 'A speed arithmetic technique where numbers are added by place value from highest power (hundreds first, then tens, then units), bypassing traditional memory carry fatigue.',
    simpleExplanation: 'When you buy things in a shop, you calculate the biggest rupee notes first! To add 458 + 325: (400 + 300 = 700) ➔ (50 + 20 = 70 ➔ 770) ➔ (8 + 5 = 13 ➔ 783).',
    formulaOrNotation: '458 + 325 = (400+300) + (50+20) + (8+5) = 783',
    example: '67 + 28 = (60+20) + (7+8) = 80 + 15 = 95.',
    visualType: 'vedic_card',
    visualData: { title: 'Left-to-Right Splitting', line1: '400 + 300 = 700', line2: '50 + 20 = 70  ➔ 770', line3: '8 + 5 = 13   ➔ 783' },
    tags: ['speed addition', 'left to right', 'mental math', 'arithmetic hack', 'carrying']
  },
  {
    id: 'abacus_compliments',
    term: 'Abacus Bead Complements (Friends)',
    pronunciation: '/ˈæb.ə.kəs ˈkɒm.plɪ.mənts/',
    category: 'speed_math',
    minGrade: 1,
    maxGrade: 8,
    definition: 'The fundamental Soroban complement rules: "Small Friends" (numbers summing to 5: 1+4, 2+3) and "Big Friends" (numbers summing to 10: 1+9, 2+8, 3+7, 4+6, 5+5) used for bead shifting.',
    simpleExplanation: 'When lower beads on the abacus run out, you call your "friends". Need to add 4 but only have 5-bead free? Put down 5 and take away 1 (4 = +5 - 1)!',
    formulaOrNotation: 'Small Friend: +4 = +5 - 1 | Big Friend: +9 = +10 - 1',
    example: 'On Soroban: To add 8 when unit rod has only 2 beads, activate 10 rod and subtract friend 2 (+10 - 2).',
    visualType: 'abacus_beads',
    visualData: { smallFriends: '1+4=5, 2+3=5', bigFriends: '1+9=10, 2+8=10, 3+7=10, 4+6=10, 5+5=10' },
    tags: ['abacus', 'soroban', 'friends', 'complements', 'beads', 'mental math']
  },

  // Higher Secondary & Advanced
  {
    id: 'trigonometric_ratios',
    term: 'Trigonometric Ratios (SOH CAH TOA)',
    pronunciation: '/ˌtrɪɡ.ə.nəˈmɛt.rɪk ˈreɪ.ʃi.oʊz/',
    category: 'geometry',
    minGrade: 9,
    maxGrade: 12,
    definition: 'Ratios of side lengths in a right-angled triangle relative to an acute angle θ: Sine (Opposite/Hypotenuse), Cosine (Adjacent/Hypotenuse), Tangent (Opposite/Adjacent).',
    simpleExplanation: 'Angles and distances locked in an unbreakable relationship. If you know the angle of the sun and the length of a building’s shadow, tangent gives you the skyscraper’s exact height without climbing it!',
    formulaOrNotation: 'sin θ = Opp/Hyp,  cos θ = Adj/Hyp,  tan θ = Opp/Adj',
    example: 'For a 30° angle: sin 30° = 1/2, cos 30° = √3/2, tan 30° = 1/√3. Identity: sin²θ + cos²θ = 1.',
    visualType: 'shape_triangle',
    visualData: { a: 'Adj (Base)', b: 'Opp (Perp)', c: 'Hypotenuse', angle: 'θ', formula: 'tan θ = Opp/Adj' },
    tags: ['trigonometry', 'sin', 'cos', 'tan', 'sohcahtoa', 'class 10', 'angles']
  },
  {
    id: 'probability_sample_space',
    term: 'Probability & Sample Space',
    pronunciation: '/ˌprɒb.əˈbɪl.ə.ti/',
    category: 'advanced',
    minGrade: 6,
    maxGrade: 12,
    definition: 'The quantitative measure of the likelihood that an event will occur, calculated as favorable outcomes divided by total sample space outcomes: P(E) = n(E) / n(S), ranging strictly from 0 to 1.',
    simpleExplanation: 'How lucky are you? If a bag has 1 gold coin and 3 silver coins (4 total), your chance of pulling gold blindly is 1 out of 4, or 25% (0.25).',
    formulaOrNotation: 'P(E) = Favorable / Total,  0 ≤ P(E) ≤ 1',
    example: 'Rolling a fair six-sided die: P(Even Number) = {2, 4, 6} / {1, 2, 3, 4, 5, 6} = 3/6 = 1/2 (50%).',
    visualType: 'formula_card',
    visualData: { title: 'Probability Bounds', highlight: '0 ≤ P(Event) ≤ 1', note: '0 = Impossible | 1 = Certain | Die even = 3/6 = 50%' },
    tags: ['probability', 'sample space', 'favorable outcomes', 'dice', 'cards', 'chance']
  },
  {
    id: 'derivative_slope',
    term: 'Derivative (Rate of Change)',
    pronunciation: '/dɪˈrɪv.ə.tɪv/',
    category: 'advanced',
    minGrade: 11,
    maxGrade: 12,
    definition: 'In calculus, the derivative dy/dx measures the instantaneous rate at which a function f(x) changes with respect to x, geometrically represented as the slope of the tangent line.',
    simpleExplanation: 'Your car speedometer! Average speed tells you how long the whole trip took, but the derivative tells you your exact speed at the precise millisecond you pass the camera.',
    formulaOrNotation: 'f\'(x) = dy/dx = lim(h→0) [f(x+h) - f(x)] / h',
    example: 'For f(x) = x²: dy/dx = 2x. At point x = 3, the instantaneous slope is 2(3) = 6.',
    visualType: 'formula_card',
    visualData: { title: 'Power Rule', highlight: 'd/dx [xⁿ] = n · xⁿ⁻¹', note: 'f(x) = x³ ➔ f\'(x) = 3x²' },
    tags: ['calculus', 'derivative', 'slope', 'rate of change', 'class 11', 'class 12']
  },
  {
    id: 'power_cyclicity',
    term: 'Units Digit Power Cyclicity',
    pronunciation: '/ˈpaʊ.ər saɪˈklɪs.ə.ti/',
    category: 'speed_math',
    minGrade: 6,
    maxGrade: 12,
    definition: 'In modular arithmetic, the units digit of powers of any integer repeats in regular cyclic orbits of period 1, 2, or 4 modulo 10.',
    simpleExplanation: 'Numbers follow a secret carousel clock. Powers of 7 end in: 7, 9, 3, 1, then repeat forever in cycles of 4! To find 7²⁵, just divide 25 by 4 (remainder 1 ➔ ends in 7).',
    formulaOrNotation: 'Exponent mod 4 = Orbit position',
    example: 'For 7^2026: 2026 ÷ 4 leaves remainder 2. 7² = 49 ➔ units digit is 9!',
    visualType: 'vedic_card',
    visualData: { title: 'Cyclicity Orbit for 7', line1: '7¹ = 7', line2: '7² = 9', line3: '7³ = 3', line4: '7⁴ = 1', total: 'Cycle length = 4' },
    tags: ['cyclicity', 'olympiad', 'units digit', 'modular arithmetic', 'speed math']
  }
];
