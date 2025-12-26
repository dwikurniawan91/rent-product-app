export interface PriceBreakdown {
  dayCount: number;
  basePrice: number;
  rentDays: number;
  freeDays: number;
  subtotal: number;
  discount: number;
  discountPercentage: number;
  total: number;
}

/**
 * Calculate the number of days between two dates
 */
export function calculateDayCount(startDate: Date, endDate: Date): number {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/*
   Calculate price breakdown based on rental rules:
 */
export function calculatePriceBreakdown(
  pricePerDay: number,
  dayCount: number,
): PriceBreakdown {
  let rentDays = dayCount;
  let freeDays = 0;
  let subtotal = pricePerDay * dayCount;
  let discount = 0;
  let discountPercentage = 0;

  // Rent 2 days, free 1 day (applies on day 3)
  if (dayCount === 3) {
    rentDays = 2;
    freeDays = 1;
    subtotal = pricePerDay * rentDays;
  }
  // 10% discount for 7-13 days
  else if (dayCount >= 7 && dayCount <= 13) {
    discountPercentage = 10;
    discount = subtotal * 0.1;
  }
  // 20% discount for 14+ days
  else if (dayCount >= 14) {
    discountPercentage = 20;
    discount = subtotal * 0.2;
  }

  const total = subtotal - discount;

  return {
    dayCount,
    basePrice: pricePerDay,
    rentDays,
    freeDays,
    subtotal,
    discount,
    discountPercentage,
    total,
  };
}
