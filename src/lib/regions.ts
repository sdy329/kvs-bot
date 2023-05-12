export class Region {
    public static readonly KY = new Region({
      name: 'KY',
      description: 'Kentucky',
      role: '1106216592498503750',
      emoji: '464676956428828682',
    });
    public static readonly NKY = new Region({
      name: 'Non-KY',
      description: 'Not a Kentucky team',
      role: '1106216611188310098',
      emoji: '464677474509389831',
    });

    private static readonly Values = [
      this.KY,
      this.NKY,
    ];
  
    public readonly name: string;
    public readonly description?: string;
    public readonly role: string;
    public readonly emoji: string;
    public readonly teamRegExp?: RegExp;
    public readonly teamExamples: string[];
    public readonly ids: number[];
  
    public constructor(
      data: Omit<Region, 'teamExamples' | 'ids'> & Partial<Region>
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
      return Region.Values;
    }
  }
  