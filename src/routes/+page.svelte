<script>
	import { db } from '../firebase.js';
	import { collection, getDocs, addDoc } from 'firebase/firestore';
	import { onMount } from 'svelte';

	let retweets = [];

	const handleSubmit = async () => {
		const inputLink = document.getElementById('link-input').value;
		// const twitterRegex = /^https?:\/\/(www\.)?twitter\.com\/[^?/]+\/status\/(\d+)/;
		const twitterRegex = /^https?:\/\/(www\.)?twitter\.com\/\w{4,}\/status\/(\d+)/;
		// const twitterRegex = /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{4,}\/status\/\d{17}$/;
		// const twitterRegex = /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{4,}\/status\/\d{16,}$/;

		// const resMid = await fetch(`/.netlify/functions/payment`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'content-type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		id: 1,
		// 		amount: 10000
		// 	})
		// });
		// const midtransData = await resMid.json();
		// console.log(midtransData);
		// window.location.href = midtransData.url;

		if (twitterRegex.test(inputLink)) {
			try {
				const retweetsCollectionRef = collection(db, 'retweets');
				await addDoc(retweetsCollectionRef, {
					link: `https://twitter.com/${inputLink.match(/twitter\.com\/(.+?)\/status/)[1]}/status/${
						inputLink.match(twitterRegex)[2]
					}`,
					createdAt: new Date()
				});

				alert('Retweet added');
				document.getElementById('link-input').value = '';
				retweets = [];
				const querySnapshot = await getDocs(retweetsCollectionRef);
				querySnapshot.forEach((doc) => {
					const retweet = {
						id: doc.id,
						...doc.data()
					};

					retweets = [...retweets, retweet];
				});
				retweets.sort((a, b) => b.createdAt - a.createdAt);
			} catch (error) {
				console.error('Error adding Retweet:', error);
				alert('Error adding Retweet');
			}
		} else {
			alert('Please enter a valid Twitter link');
		}
	};

	onMount(async () => {
		const retweetsCollectionRef = collection(db, 'retweets');
		const querySnapshot = await getDocs(retweetsCollectionRef);

		querySnapshot.forEach((doc) => {
			const retweet = {
				id: doc.id,
				...doc.data()
			};

			retweets = [...retweets, retweet];
		});

		retweets.sort((a, b) => b.createdAt - a.createdAt);
	});
</script>

<head>
	<title>RaaS - Retweet as a Service</title>
</head>

<div class="container">
	<h1>RaaS</h1>
	<h2>Retweet as a Service</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="link-input">Link:</label>
		<input type="text" id="link-input" name="link-input" required />
		<button type="submit">Submit</button>
	</form>

	<div class="retweets">
		<h3 style="margin-top: 30px;">Tweets need to be retweet</h3>
		<p>👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇 👇</p>
		{#each retweets as retweet}
			<div class="retweet-container">
				<p><a href={retweet.link} target="_blank" rel="noopener">{retweet.link}</a></p>
				<a
					class="retweet-button"
					href={retweet.link.includes('/status/')
						? `https://twitter.com/intent/retweet?tweet_id=${retweet.link.split('/status/')[1]}`
						: '#'}
					target="_blank"
					rel="noopener">Retweet</a
				>
			</div>
		{/each}
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
		font-family: 'Open Sans', sans-serif;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	h1 {
		margin-top: 0;
		font-size: 48px;
		font-weight: 700;
		color: #1c1e21;
		text-align: center;
	}

	h2 {
		margin-top: 20px;
		font-size: 24px;
		font-weight: 400;
		color: #4d4d4d;
		text-align: center;
	}

	form {
		margin-top: 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	label {
		font-size: 16px;
		font-weight: 600;
		color: #1c1e21;
		margin-bottom: 10px;
	}

	input[type='text'] {
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 16px;
		width: 400px;
		max-width: 100%;
	}

	button[type='submit'] {
		margin-top: 10px;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		background-color: #0070f3;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	button[type='submit']:hover {
		background-color: #0054a8;
	}

	h3 {
		margin-top: 0;
		font-size: 24px;
		font-weight: 400;
		color: #1c1e21;
		text-align: center;
	}

	.retweet-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		padding: 10px;
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
	}

	.retweet-container a {
		text-decoration: none;
		color: #1da1f2;
	}

	.retweet-button {
		padding: 8px 16px;
		border: none;
		border-radius: 50px;
		margin-left: 10px; /* Add some margin to the left of the retweet button */
		background-color: #1da1f2;
		color: #fff !important;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		text-decoration: none;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	.retweet-button:hover {
		background-color: #0c8de4;
	}

	.retweet-button {
		padding: 8px 16px;
		border: none;
		border-radius: 50px;
		background-color: #1da1f2;
		color: #fff;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		text-decoration: none;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	.retweet-button:hover {
		background-color: #0c8de4;
	}

	.retweet-button:active {
		background-color: #0675bd;
	}
</style>
