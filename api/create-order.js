export default async function handler(req, res) {
  try {
    const clientId = process.env.CASHFREE_CLIENT_ID;
    const clientSecret = process.env.CASHFREE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.status(500).json({
        error: "Cashfree credentials are missing in Vercel"
      });
    }

    const response = await fetch(
      "https://sandbox.cashfree.com/pg/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "x-api-version": "2025-01-01",
          "x-client-id": clientId,
          "x-client-secret": clientSecret
        },
        body: JSON.stringify({
          order_id: "CB_" + Date.now(),
          order_amount: 99,
          order_currency: "INR",
          customer_details: {
            customer_id: "campusboost_customer",
            customer_phone: "9999999999"
          }
        })
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
