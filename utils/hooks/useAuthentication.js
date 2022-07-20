import React, {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, collection, onSnapshot, arrayUnion, updateDoc } from "firebase/firestore";
// import db from "./firebase";

const auth = getAuth();
// const F6gfFNT5SBcaek0zlbklOrfMLmE2 = doc(db, 'Users', 'F6gfFNT5SBcaek0zlbklOrfMLmE2')
// const Users = collection(db, 'Users');

const docRef = doc(db, "Users", "F6gfFNT5SBcaek0zlbklOrfMLmE2", "name");
const docSnap = await getDoc(docRef);

export function useAuthentication() {
	const [user, setUser] = useState();
	const [userData, setUserData] = useState();

	useEffect(() => {
		const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User

			getDoc().then((docSnap) => {
				setUserData(userData);
				console.log("userData", userData)
			})

			console.log("Document data:", docSnap.data());

			// setUser(user);
		} else {
			// User is signed out
			setUser(undefined);
		}
		});

		return unsubscribeFromAuthStatusChanged;
	}, []);

	return {
		user
	};
}