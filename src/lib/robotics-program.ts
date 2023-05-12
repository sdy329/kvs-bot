export class Program {
  public static readonly Vrc = new Program({
    name: 'VRC',
    description: 'VEX Robotics Competition',
    role: '1106207556268990494',
    emoji: '464676956428828682',
    teamRegExp: /^\d{1,5}[A-Z]?$/i,
    teamExamples: ['1', '12345A'],
    ids: [1],
  });
  public static readonly VexU = new Program({
    name: 'VEXU',
    description: 'VEX U college and university competition',
    role: '305392771324313610',
    emoji: '464677474509389831',
    teamRegExp: /^[A-Z]{2,5}\d{0,2}$/i,
    teamExamples: ['AB', 'ABCDE12'],
    ids: [4],
  });
  public static readonly Vaic = new Program({
    name: 'VAIC',
    description: 'VEX AI Competition',
    role: '706299363588177940',
    emoji: '811072718274691073',
    teamRegExp: /^(?:\d{1,5}[A-Z]?|[A-Z]{2,5}\d{0,2})$/i,
    teamExamples: ['1', '12345A', 'AB', 'ABCDE12'],
    ids: [48, 49],
  });
  public static readonly Viqc = new Program({
    name: 'VIQC',
    description: 'VEX IQ Competition',
    role: '197817210729791489',
    emoji: '464677535461146624',
    teamRegExp: /^\d{1,5}[A-Z]?$/i,
    teamExamples: ['1', '12345A'],
    ids: [41],
  });
  public static readonly None = new Program({
    name: 'None',
    role: '197817210729791489',
    emoji: '❓',
  });

  private static readonly Values = [
    this.Vrc,
    this.VexU,
    this.Vaic,
    this.Viqc,
    this.None,
  ];

  public readonly name: string;
  public readonly description?: string;
  public readonly role: string;
  public readonly emoji: string;
  public readonly teamRegExp?: RegExp;
  public readonly teamExamples: string[];
  public readonly ids: number[];

  public constructor(
    data: Omit<Program, 'teamExamples' | 'ids'> & Partial<Program>
  ) {
    this.name = data.name;
    this.description = data.description;
    this.role = data.role;
    this.emoji = data.emoji;
    this.teamRegExp = data.teamRegExp;
    this.teamExamples = data.teamExamples ?? [];
    this.ids = data.ids ?? [];
  }

  public static values() {
    return Program.Values;
  }
}
