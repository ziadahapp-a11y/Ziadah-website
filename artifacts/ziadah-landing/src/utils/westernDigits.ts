/** تحويل الأرقام العربية/الفارسية والرموز الشائعة إلى شكل إنجليزي (0–9، %، . ،) */
const EASTERN = "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
const WESTERN = "0123456789";
const PERSIAN = "\u06f0\u06f1\u06f2\u06f3\u06f4\u06f5\u06f6\u06f7\u06f8\u06f9";

export function toWesternDigits(input: string): string {
  let s = input;
  for (let i = 0; i < 10; i++) {
    s = s.split(EASTERN[i]!).join(WESTERN[i]!);
    s = s.split(PERSIAN[i]!).join(WESTERN[i]!);
  }
  s = s.split("\u066a").join("%");
  s = s.split("\u066b").join(".");
  s = s.split("\u066c").join(",");
  return s;
}
