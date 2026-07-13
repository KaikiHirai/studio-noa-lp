export type Stat = {
  value: string;
  label: string;
  note?: string;
};

export type Worry = {
  text: string;
};

export type Reason = {
  no: string;
  title: string;
  lead: string;
  body: string;
  image: { src: string; alt: string };
};

export type Voice = {
  initial: string;
  age: number;
  job: string;
  period: string;
  quote: string;
  image: { src: string; alt: string };
};

export type Trainer = {
  name: string;
  role: string;
  license: string;
  comment: string;
  image: { src: string; alt: string };
};

export type Plan = {
  name: string;
  count: string;
  price: string;
  note: string;
  featured?: boolean;
  badge?: string;
};

export type FlowStep = {
  no: string;
  title: string;
  body: string;
  time?: string;
};

export type FaqItem = {
  q: string;
  a: string;
};
