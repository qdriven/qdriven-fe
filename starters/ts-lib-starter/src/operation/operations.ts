export const sum = (a: number, b: number) => a + b;

export const addIt = function (a: number, ...addl: number[]) {
  let total: number = a;
  addl.forEach(num => {
    total = total + num;
  });
  return total;
};
