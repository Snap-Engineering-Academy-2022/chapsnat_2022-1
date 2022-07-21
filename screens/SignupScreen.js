import { Text, View, TextInput, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from "react"
import { doc, setDoc } from "firebase/firestore"; 
import db from "../firebase";
import { useCardAnimation } from '@react-navigation/stack';
import { useAuthentication } from '../utils/hooks/useAuthentication';

export default function LoginScreen({navigation}) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const { user, userData } = useAuthentication();

    //why is there no parameter passed into getAuth?
	const auth = getAuth();
    

    //difference between async and await?
	async function handleSubmit() {
		console.log("handle submit envoked!!")

        //can control order of code; cannot use await unless it's inside async
        //async func won't activate until handleSubmit; otherwise it'd go in order , skipping handleSumbit
        //don't return until function is executed	  
		createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			auth.currentUser = user;
			console.log("making a new user on firestroe");
        setDoc(doc(db, "Users", user.uid), {
          // make sure to change these to match the fields on your firestore!
          name: user.email,
          pronouns: "she / her",
        });
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message; //when errorMessage isn't being used. color fades to dark blue. when console.loged, turns to light blue
            console.log(errorCode, "<---- error code");
            console.log(errorMessage, "<--- error message")

			console.log("Error when signing up new user:".error);
		});
	}

    console.log("auth object", auth)
	return (
		<>  
		<View style = {styles.container}>
			<Image source={require("../assets/signup.png")} style={styles.logo} />
            {/* styles.___ connects each component to the StyleSheet below*/}
			<Text style={styles.bigBlue}>Signup Here</Text>
			<View style={styles.inputView}>
				<TextInput
					placeholder='Email'
					placeholderTextColor="#003f5c"
                    // does (email) get passed into createUserWithEmailAndPass? what happens after?
					onChangeText={(email) => setEmail(email)} //setEmail resets email every time you input character from email
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					placeholder='Password'
					secureTextEntry={true}
					placeholderTextColor="#003f5c"
					onChangeText={(password) => setPassword(password)}
				/>
			</View>
            {/* after pressing loginBtn, call the handleSubmit() function */}
			<TouchableOpacity style={styles.loginBtn} onPress={() => {
				handleSubmit();
			}}>
				<Text style={styles.loginText}>Signup</Text>
			</TouchableOpacity>
            <TouchableOpacity style={styles.redirectBtn} onPress={() => {
                    navigation.navigate("Login") 
                }}>
                <Text style={styles.redirectText}>Already have an account? Login here</Text>
            </TouchableOpacity>
		</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
	logo: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 100,
		width: 190,
		resizeMode: 'contain',
	},
	redirectBtn: {
		width:"80%",
		borderRadius:25,
		height:50,
		alignItems:"center",
		justifyContent:"center",
		marginTop:40,
		backgroundColor:"#0096FF",
		color: "white"
	},
	redirectText: {
		color: 'white',
	},
	inputView: {
		backgroundColor: "#fff",
		borderRadius: 30,
		width: "70%",
		height: 45,
		marginBottom: 20,
        justifyContent: 'center',
		alignItems: "center",
	},
	TextInput: {
		height: 50,
		flex: 1,
		padding: 10,
		marginLeft: 20,
	},
	loginBtn: {
		width:"80%",
		borderRadius:25,
		height:50,
		alignItems:"center",
		justifyContent:"center",
		marginTop:40,
		backgroundColor:"#FF1493",
	},
	loginText: {
		color: 'white',
	},
	bigBlue: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 30,
		padding: 50
	}
})