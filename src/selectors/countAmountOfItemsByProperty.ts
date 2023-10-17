const countAmountOfItemsByProperty = <T, K extends keyof T>(
  arr: T[],
  propertyToCountItems: K
): number => {
  const initialValue = 0;
  return (
    arr.reduce((accumulator, currentValue) => {
      const a = currentValue[propertyToCountItems];
      if (typeof a === "number") {
        return accumulator + a;
      } else {
        return accumulator;
      }
    }, initialValue) | 0
  );
};

export default countAmountOfItemsByProperty;
