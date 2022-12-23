import { Photo } from "./Photo";

export interface Board {
  id: number;
  url: string;
}

export interface columns {
  id: string;
  name: string;
  items: Photo[];
} 