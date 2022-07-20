import React, {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, collection, onSnapshot, arrayUnion, updateDoc } from "firebase/firestore";
import db from "../../firebase";

export function useAuthentication() {
	const [user, setUser] = useState();
	const [userData, setUserData] = useState();

	const auth = getAuth();

	useEffect(() => {
		const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User

			const uid = user.uid;

			//dataSnapshot = return of getting document
			getDoc(doc(db, "Users", uid)).then((dataSnapshot) => {
				console.log("print uid", uid)
				// console.log(db.users.uid.name)
				console.log(dataSnapshot.data())
            })

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