import { ReactNode } from 'react';

export interface Children {
  children?: ReactNode;
}

export interface Person {
  id: string,
  username: string,
  firstName: string,
  lastName: string,
  bio: string,
  email: string, 
  proofs: Array<Proof>,
  pathways: Array<Pathway>,
}

export interface PathwayProps {
  id: string;
  createdAt: string | Date;
  username: string;
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
  role: string;
  profileVisibility: boolean;
  pathways: Array<Pathway>;
}

export interface Pathway {
  id: number;
  createdAt: string | Date;
  title: string;
  description: string;
  approved: boolean;
  contentAreas: Array<ContentArea>;
}

export interface ContentArea {
  id: number;
  createdAt: string | Date;
  title: string;
  competencies: Array<Competency>;
}

export interface Competency {
  id: number;
  createdAt: string | Date;
  title: string;
  description: string;
  proofs?: Array<Proof>;
}

export interface Proof {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  title: string;
  description: string;
  justification: string;
}
