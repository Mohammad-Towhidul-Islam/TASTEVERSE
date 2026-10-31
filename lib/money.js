export const money = (amount) => `৳${(amount / 100).toLocaleString('en-BD', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
export const takaToPaisa = (taka) => Math.round(Number(taka) * 100)
