export const PRODUCT_CATEGORIES = ['Dairy', 'Bakery', 'General', 'Snacks'] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const LOW_STOCK_THRESHOLD = 20;

export function localDateString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
