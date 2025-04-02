export const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 100 },
    data: { amount: "100" },
    type: "paymentInit",
  },
  {
    id: "2",
    position: { x: 50, y: 100 },
    data: { country: "United State", code: "US", currency: "$" },
    type: "paymentCountry",
  },
  {
    id: "3",
    position: { x: 80, y: 150 },
    data: { country: "India", code: "IN", currency: "₹" },
    type: "paymentCountry",
  },
  {
    id: "4",
    position: { x: 110, y: 300 },
    data: { name: "stripe", code: "st" },
    type: "paymentProvider",
  },
  {
    id: "5",
    position: { x: 110, y: 400 },
    data: { name: "paypal", code: "py" },
    type: "paymentProvider",
  },
];

export const initialEdges = [];
