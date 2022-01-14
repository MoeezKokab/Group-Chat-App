import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { auth, db } from './firebase1'
import * as ImagePicker from 'expo-image-picker';

const SignUp = (props) => {
    const [name, setname] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [photoURL, setPhotoURL] = useState('')
    const [secureText, setSecureText] = useState(true)
    const [upload, setUpload] = useState(false)



    const photoFromGallary = async () => {
        console.log("yes")
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            //aspect: [4, 3],
            quality: 1,
        })
        if (!result.cancelled) {
            let newfile = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test${result.uri.split(".")[1]}`
            }
            uploadHandler(newfile)
            // setModal(false)
        }
    }
    const photoFromCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            let newfile = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test${result.uri.split(".")[1]}`
            }
            uploadHandler(newfile)
        }
    }


    const uploadHandler = image => {
        console.log("yes")
        const data = new FormData()
        data.append('file', image)
        data.append("upload_preset", "employeeApp")
        data.append("clound_name", "dvrzs9jem")
        fetch("https://api.cloudinary.com/v1_1/dvrzs9jem/image/upload", {
            method: 'post',
            body: data
        }).then(res => res.json())
            .then((dt) => {
                console.log(dt)
                setPhotoURL(dt.url)

                alert("profile image is Upload")
                setUpload(true)


            }).catch(err => {
                console.log(err)
                Alert.alert("some thing is wrong")
            })

    }



    const signup = () => {
        auth.createUserWithEmailAndPassword(mail, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                //const user = firebase.auth().currentUser;

                user.updateProfile({
                    displayName: name,
                    photoURL: photoURL ? photoURL : "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                }).then(() => {
                    //props.navigation.replace("chat")
                    // Update successful
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                });
                props.navigation.popToTop()
            })
            .catch((error) => {

                var errorMessage = error.message;
                alert(errorMessage)
                // ..
            });

    }



    return (
        <View>
            <Input
                label="Name"
                value={name}
                placeholder='User name'
                leftIcon={
                    <Icon
                        type='material'
                        name='badge'

                    />
                }
                onChangeText={txt => { setname(txt) }}
            />
            <Input
                label="Mail"
                value={mail}
                placeholder='User mail'
                leftIcon={
                    <Icon
                        type='material'
                        name='email'

                    />
                }
                onChangeText={txt => setMail(txt)}
            />
            <Input
                label="Password"
                value={password}
                placeholder='password'
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
            <Input
                editable={false} 
                label="Profile"
                value={upload ? "Done" : ""}
                placeholder='User Profile'
                leftIcon={
                    <Icon
                        type='material'
                        name='add-a-photo'

                    />
                }
                
                rightIcon={
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={photoFromGallary}>
                            <Icon
                                style={{ marginEnd: 10 }}
                                type='material'
                                name='photo'

                            />

                        </TouchableOpacity>

                        <TouchableOpacity onPress={photoFromCamera}>
                            <Icon
                                style={{ marginEnd: 0 }}
                                type='material'
                                name='photo-camera'

                            />

                        </TouchableOpacity>

                    </View>
                }
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
                onPress={signup}
            />
           

        </View>
    )
}

export default SignUp
