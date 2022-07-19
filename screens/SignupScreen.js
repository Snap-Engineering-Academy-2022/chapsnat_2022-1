import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {useState} from "react"

export default function LoginScreen({navigation}) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

    //why is there no parameter passed into getAuth?
	const auth = getAuth();
    

    //difference between async and await?
	async function handleSubmit() {
		console.log("handle submit envoked!!")

        //can control order of code; cannot use await unless it's inside async
        //async func won't activate until handleSubmit; otherwise it'd go in order , skipping handleSumbit
        //don't return until function is executed
		await createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			auth.currentUser = user;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message; //when errorMessage isn't being used. color fades to dark blue. when console.loged, turns to light blue
            console.log(errorCode, "<---- error code");
            console.log(errorMessage, "<--- error message")
		});
	}

    console.log("auth object", auth)
	return (
		<>  
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
                <Text>Already have an account? Login here</Text>
            </TouchableOpacity>
		</>
	)
}

const styles = StyleSheet.create({
	redirectBtn: {
		width:"80%",
		borderRadius:25,
		height:50,
		alignItems:"center",
		justifyContent:"center",
		marginTop:40,
		backgroundColor:"grey",
		color: "white"
	},
	inputView: {
		backgroundColor: "#FFC0CB",
		borderRadius: 30,
		width: "70%",
		height: 45,
		marginBottom: 20,
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
	bigBlue: {
		color: 'blue',
		fontWeight: 'bold',
		fontSize: 30,
		padding: 50
	}
})