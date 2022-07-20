import { Text, View, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {useState} from "react"

export default function LoginScreen({navigation}) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const auth = getAuth();

	async function handleSubmit() {
		console.log("handle submit envoked!!")

		await signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user; 
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
            console.log(errorCode, "<---- error code");
            console.log(errorMessage, "<--- error message")
		});
	}

	return (
		<>
        <View style={styles.container}>
			<Text style={styles.bigBlue}>Login Here</Text>
			<View style={styles.inputView}>
				<TextInput
					placeholder='Email'
					placeholderTextColor="#003f5c"
					onChangeText={(email) => setEmail(email)}
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
            <TouchableOpacity style={styles.redirectBtn} onPress={() => {
                navigation.navigate("Signup")
            }}>
                <Text>Don't have an account? Sign up here</Text>
            </TouchableOpacity>
			<TouchableOpacity style={styles.loginBtn} onPress={() => {
				handleSubmit();
			}}>
				<Text style={styles.loginText}>LOGIN</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
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