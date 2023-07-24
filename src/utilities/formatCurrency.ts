/* eslint-disable @typescript-eslint/no-unused-vars */
// Intl.NumberFormat để định dạng số thành chuỗi có định dạng tiền tệ.
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'VND',
  style: 'currency'
})

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number)
}
