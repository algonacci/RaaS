exports.handler = async function (event, context) {
	const Midtrans = require('midtrans-client');

	// initialize Midtrans client
	const midtrans = new Midtrans({
		isProduction: false,
		clientKey: 'YOUR_MIDTRANS_CLIENT_KEY',
		serverKey: 'YOUR_MIDTRANS_SERVER_KEY'
	});

	// get user data from request body
	const { id, amount } = JSON.parse(event.body);

	// create Midtrans transaction
	const transaction = await midtrans.createTransaction({
		transaction_details: {
			order_id: `RAAS-${id}-${+new Date()}`,
			gross_amount: amount
		},
		customer_details: {
			first_name: name,
			email
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
