exports.handler = async function (event, context) {
	const Midtrans = require('midtrans-client');

	const midtrans = Midtrans({
		isProduction: false,
		clientKey: 'SB-Mid-client-4D6Sjyqb_V6nLMTS',
		serverKey: 'SB-Mid-server-9aIT88K9ON8u0DZRTcoYZHG-'
	});

	const { amount } = JSON.parse(event.body);

	// create Midtrans transaction
	const transaction = await midtrans.createTransaction({
		transaction_details: {
			order_id: `RAAS-1-${+new Date()}`,
			gross_amount: amount
		},
		credit_card: {
			secure: true
		}
	});

	// return the transaction redirect URL
	return {
		statusCode: 200,
		body: JSON.stringify({
			redirectUrl: transaction.redirect_url
		})
	};
};
