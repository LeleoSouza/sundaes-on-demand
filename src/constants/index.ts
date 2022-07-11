interface Price<Type> {
  [scoops: string]: Type;
  toppings: Type;
}
export const PRICE: Price<number> = {
  scoops: 2,
  toppings: 1.5,
};
