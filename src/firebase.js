import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDQIBbB4qgARcPsWEPp7CBeEixAu0IoHVc',
	authDomain: 'raas-58bdd.firebaseapp.com',
	projectId: 'raas-58bdd',
	storageBucket: 'raas-58bdd.appspot.com',
	messagingSenderId: '460863430481',
	appId: '1:460863430481:web:10ad977b1ce13c1c27bd70'
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();
