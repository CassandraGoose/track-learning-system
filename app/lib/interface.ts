import { ReactNode } from 'react';

export interface Children {
  children?: ReactNode;
}

export interface PathwayProps {
  id: string;
  createdAt: Date;
  username: string;
  email: string;
  role: string;
  profileVisibility: boolean;
  pathways: Array<Pathway>;
}

export interface Pathway {
  id: number;
  createdAt: Date;
  title: string;
  description: string;
  contentArea: Array<ContentArea>;
}

export interface ContentArea {
  id: number;
  createdAt: Date;
  title: string;
  description: string;
  competencies: Array<Competency>;
}

export interface Competency {
  id: number;
  createdAt: Date;
  title: string;
  description: string;
  proofs: Array<Proof>;
}

export interface Proof {
  id: number;
  createdAt: Date;
  updatedAt: string;
  title: string;
  description: string;
  justification: string;
}
