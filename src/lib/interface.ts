import { ReactNode } from 'react';

export interface Children {
  children?: ReactNode;
}

export interface PathwayProps {
  id: string;
  createdAt: string;
  username: string;
  email: string;
  role: string;
  profileVisibility: boolean;
  pathways: [Pathway];
}

export interface Pathway {
  id: number;
  createdAt: Date;
  title: string;
  description: string;
  contentArea: [ContentArea] | [];
}

export interface ContentArea {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  competencies: [Competency];
}

export interface Competency {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  proofs: [Proof];
}

export interface Proof {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  justification: string;
}
