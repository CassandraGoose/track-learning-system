export {}

declare global {
  interface PathwayProps {
    id: string;
    createdAt: string;
    username: string;
    email: string;
    role: string;
    profileVisibility: boolean;
    pathways: [Pathway];
  }
  
  interface Pathway {
    id: number;
    createdAt: string;
    title: string;
    description: string;
    contentArea: [ContentArea];
  }
  
  interface ContentArea {
    id: number;
    createdAt: string;
    title: string;
    description: string;
    competencies: [Competencies];
  }
  
  interface Competencies {
    id: number;
    createdAt: string;
    title: string;
    description: string;
    proofs: [Proof];
  }
  
  interface Proof {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    description: string;
    justification: string;
  }
}