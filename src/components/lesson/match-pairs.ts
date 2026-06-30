export function clearMatchForLeft(matchAnswer: Record<string, string>, left: string) {
  if (!matchAnswer[left]) return matchAnswer;

  const nextAnswer = { ...matchAnswer };
  delete nextAnswer[left];
  return nextAnswer;
}
