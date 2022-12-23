export interface Photo {
  id: number;
  path: string;
  tag: string;
}

export interface StateColumn {
  difficulty: number;
  coordinates: number[];
  tag: string;
}