exports.handler = async function (event, context) {
	const Midtrans = require('midtrans-client');

	const snap = new Midtrans.Snap({
		isProduction: false,
		clientKey: 'SB-Mid-client-4D6Sjyqb_V6nLMTS',
		serverKey: 'SB-Mid-server-9aIT88K9ON8u0DZRTcoYZHG-'
	});

	const { id, amount } = JSON.parse(event.body);

	const parameters = {
		transaction_details: {
			order_id: `RaaS-${id}-${+new Date()}`,
			gross_amount: parseInt(amount)
		},
		credit_card: {
			secure: true
		}
	};

	snap
		.createTransaction(parameters)
		.then(function (transaction) {
			const { token, redirect_url } = transaction;
			console.log(`Token: ${token}`);
			console.log(`Redirect URL: ${redirect_url}`);
			console.log(donation);
			callback(null, {
				statusCode: 200,
				headers,
				body: JSON.stringify({
					url: redirect_url,
					params: parameters
				})
			});
		})
		.catch(function (err) {
			console.error(`Error: ${err.message}`);
			callback(null, {
				statusCode: 400,
				headers,
				body: JSON.stringify({ error: err.message })
			});
		});
};
