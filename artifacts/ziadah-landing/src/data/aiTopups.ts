export interface AiTopup {
  points: number;
  price: number;
}

export const AI_TOPUPS: AiTopup[] = [
  { points: 150,   price: 300   },
  { points: 350,   price: 650   },
  { points: 700,   price: 1300  },
  { points: 1500,  price: 2800  },
  { points: 3000,  price: 5500  },
  { points: 6000,  price: 11000 },
  { points: 12000, price: 20000 },
];

export const parsePrice = (p: string | number): number =>
  typeof p === "number" ? p : parseInt(String(p).replace(/[^0-9]/g, ""), 10);

export const fmtPrice = (n: number): string =>
  n >= 1000 ? n.toLocaleString("en-US") : String(n);
