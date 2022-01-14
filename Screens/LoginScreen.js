import React, { useState,useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Input, Icon,Button } from 'react-native-elements';
import { auth } from './firebase1';


const LoginScreen = (props) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [secureText, setSecureText] = useState(true)

    const Login=()=>{
        auth.signInWithEmailAndPassword(name, password)
  .then((userCredential) => {
    // Signed in
    alert("welcome")
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            if (user) {
                props.navigation.replace('Chat')
            } else {
                props.navigation.canGoBack()
                && props.navigation.popToTop()
            }
        });

        return unsubscribe
    }, [])


    return (
        <View>
            <Input
            label="Mail"
                value={name}
                placeholder='User mail'
                leftIcon={
                    <Icon
                        type='material'
                        name='email'

                    />
                }
                onChangeText={txt => { setName(txt) }}
            />
            <Input
            label="Password"
                value={password}
                placeholder='Password'
                secureTextEntry={secureText}
                Icon={
                    <Text>Show</Text>
                }
                leftIcon={

                    <Icon

                        type='material'
                        name='lock'
                        size={24}
                        color='black'
                    />
                }
                rightIcon={
                    <TouchableOpacity onPress={() => {
                        console.log(secureText)
                        setSecureText(!secureText)
                    }}>
                        {secureText ?
                            <Text>show</Text> :
                            <Text>hide</Text>
                        }
                    </TouchableOpacity>
                }
                onChangeText={txt => { setPassword(txt) }}
            />
            <View>
            <Button
                title="Sign in"
                buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 85,
                  marginVertical: 10,
                }}
                titleStyle={{ color: 'white', marginHorizontal: 5 }}
                onPress={Login}
              />
               <Button
                title="Sign Up"
                buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 85,
                  marginVertical: 10,
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
                onPress={()=>props.navigation.navigate('SignUp')}
              />
            </View>
        </View>
    )
}

export default LoginScreen

