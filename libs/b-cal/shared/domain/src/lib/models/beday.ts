// Nornally I've defined types in a place like this, but I'm trying out the way the @ngrx schematic suggests
export interface Beday {
  id: number;
  name: string;
  abbreviation: string;
}

export type Bedays = Beday[];
