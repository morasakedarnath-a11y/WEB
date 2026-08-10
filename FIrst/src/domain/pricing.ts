export interface PricedLine {
  unitPrice: number;
  quantity: number;
}

export function calculateBill(lines: PricedLine[], gstPercent: number) {
  const subtotal = lines.reduce((sum, line) => {
    if (line.unitPrice < 0 || line.quantity < 0) return sum;
    return sum + Math.round(line.unitPrice) * Math.floor(line.quantity);
  }, 0);
  const safeGstPercent = Math.max(0, gstPercent);
  const tax = Math.round((subtotal * safeGstPercent) / 100);

  return { subtotal, tax, total: subtotal + tax };
}
