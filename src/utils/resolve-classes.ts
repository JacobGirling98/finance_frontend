export const resolveClasses = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};
