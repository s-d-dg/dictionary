export interface Dictionary {
  a: string[];
  b: string[];
  c: string[];
  d: string[];
  e: string[];
  f: string[];
  g: string[];
  h: string[];
  i: string[];
  j: string[];
  k: string[];
  l: string[];
  m: string[];
  n: string[];
  o: string[];
  p: string[];
  q: string[];
  r: string[];
  s: string[];
  t: string[];
  u: string[];
  v: string[];
  w: string[];
  x: string[];
  y: string[];
  z: string[];
}

export const dictionaryObject = (): any => ({
  a: [],
  b: [],
  c: [],
  d: [],
  e: [],
  f: [],
  g: [],
  h: [],
  i: [],
  j: [],
  k: [],
  l: [],
  m: [],
  n: [],
  o: [],
  p: [],
  q: [],
  r: [],
  s: [],
  t: [],
  u: [],
  v: [],
  w: [],
  x: [],
  y: [],
  z: [],
});

export interface AllWordsDictionary {
  loading: boolean;
  dictionary: any;
  phrase: string;
  filteredWords: string[];
  error?: string;
}

export const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
