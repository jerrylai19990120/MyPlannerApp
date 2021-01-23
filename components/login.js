import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Avatar, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Login = ({navigation, setUser})=>{

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const login = ()=>{
        const request = new Request('http://127.0.0.1:8000/login/', {
            method: 'post',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                Accept: 'application/json, text/plain, */*',
                "Content-type": "application-json"
            }
        })

        fetch(request).then(res => {
            return res.json()
        }).then(json => {
            if(json.username===username){
                setUser({
                    username: username,
                    loggedIn: true
                })
                navigation.navigate("Home")
            }else{

            }
        })
    }

    return(
        <View style={{flex: 1}}>
            <ImageBackground source={{uri: 'https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}} style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
                <View style={{padding: '18%'}}> 
                    <Avatar 
                            size="xlarge"
                            rounded
                            source={require('../assets/logo.png')}
                            containerStyle={{alignSelf: 'center', marginBottom: "12%"}}
                        />
                    <Input placeholder="username" inputStyle={{color: 'white'}} autoCapitalize={false} onChangeText={text=>setUsername(text)} leftIcon={<Icon name="user" size={16} color="white"/>}/>
                    <Input secureTextEntry placeholder="password" inputStyle={{color: 'white'}} autoCapitalize={false} onChangeText={text=>setPassword(text)} leftIcon={<Icon name="lock" size={16} color="white"/>}/>
                    <Button type="outline" title="Log in" onPress={()=>{login()}} 
                        style={{marginTop: '8%'}} titleStyle={{color: 'white', fontWeight: "bold"}} buttonStyle={{borderColor: 'orange', borderWidth: 3}}/>
                    <View style={{flexDirection: 'row', marginTop: '3%'}}>
                        <Text style={{color: 'orange', fontWeight: 'bold'}}>Don't have an account?</Text>
                        <Text style={{color: 'pink', fontWeight: 'bold', marginLeft: '6%'}} onPress={()=>{navigation.navigate("Signup")}}>Join us</Text>
                    </View>
                    <Text style={{color: 'white', fontWeight: 'bold', alignSelf: 'center', marginTop: '54%'}} onPress={()=>{navigation.navigate("Welcome")}}>Cancel</Text>
                </View>
            </ImageBackground>
        </View>
    );

}