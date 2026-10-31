const base = () => process.env.SSLCOMMERZ_IS_LIVE === 'true'
  ? 'https://securepay.sslcommerz.com'
  : 'https://sandbox.sslcommerz.com'

export async function createSslSession(order) {
  const store_id = process.env.SSLCOMMERZ_STORE_ID
  const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD
  if (!store_id || !store_passwd) throw new Error('SSLCommerz credentials are not configured.')
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const params = new URLSearchParams({
    store_id, store_passwd,
    total_amount: (order.total / 100).toFixed(2),
    currency: 'BDT',
    tran_id: order.orderNumber,
    success_url: `${appUrl}/api/payments/sslcommerz/success`,
    fail_url: `${appUrl}/api/payments/sslcommerz/fail`,
    cancel_url: `${appUrl}/api/payments/sslcommerz/cancel`,
    ipn_url: `${appUrl}/api/payments/sslcommerz/ipn`,
    cus_name: order.customerName, cus_email: order.email,
    cus_add1: order.address, cus_city: order.city, cus_country: 'Bangladesh',
    cus_phone: order.phone,
    shipping_method: 'NO', product_name: 'TASTEVERSE food order',
    product_category: 'Food', product_profile: 'general',
    value_a: order.id
  })
  const response = await fetch(`${base()}/gwprocess/v4/api.php`, {
    method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:params.toString(), cache:'no-store'
  })
  const data = await response.json()
  if (!response.ok || data.status !== 'SUCCESS' || !data.GatewayPageURL) {
    throw new Error(data.failedreason || 'Could not initialize SSLCommerz payment.')
  }
  return data
}

export async function validateSslPayment(valId) {
  const params = new URLSearchParams({
    val_id: valId,
    store_id: process.env.SSLCOMMERZ_STORE_ID || '',
    store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD || '',
    format: 'json'
  })
  const response = await fetch(`${base()}/validator/api/validationserverAPI.php?${params}`, { cache:'no-store' })
  if (!response.ok) throw new Error('Payment validation request failed.')
  return response.json()
}
