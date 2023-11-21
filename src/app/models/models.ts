export interface Box {
  id: number;
  color: string;
}

export interface Option {
  color: string;
  disabled: boolean;
}

export interface SubmittedAnswer {
  correctAnswers: number;
  submitted: Box[];
}
