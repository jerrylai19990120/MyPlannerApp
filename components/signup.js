import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Avatar, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Signup = ({navigation})=>{

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirm, setConfirm] = React.useState('')

    const signup = ()=>{
        const request = new Request('http://127.0.0.1:8000/signup/', {
            method: 'post',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-type": "application/json"
            }
        })

        fetch(request).then(res => {
            if(res.status === 200){
                navigation.navigate('Home')
            }
        }).catch(err => console.log(err))
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
                    <Input placeholder="username" autoCapitalize={false} inputStyle={{color: 'white'}} leftIcon={<Icon name="user" size={16} color="white"/>} onChangeText={text=>setUsername(text)}/>
                    <Input placeholder="password" autoCapitalize={false} inputStyle={{color: 'white'}} secureTextEntry leftIcon={<Icon name="lock" size={16} color="white"/>} onChangeText={text=>setPassword(text)}/>
                    <Input placeholder="confirm password" autoCapitalize={false} inputStyle={{color: 'white'}} secureTextEntry leftIcon={<Icon name="lock" size={16} color="white"/>} onChangeText={text=>setConfirm(text)}/>
                    <Button type="outline" title="Sign up" onPress={()=>{signup()}} 
                        style={{marginTop: '8%'}} titleStyle={{color: 'white', fontWeight: "bold"}} buttonStyle={{borderColor: 'orange', borderWidth: 3}}/>
                    <View style={{flexDirection: 'row', marginTop: '3%'}}>
                        <Text style={{color: 'orange', fontWeight: 'bold'}}>Already have an account?</Text>
                        <Text style={{color: 'pink', fontWeight: 'bold', marginLeft: '6%'}} onPress={()=>{navigation.navigate("Login")}}>Log in</Text>
                    </View>
                    <Text style={{color: 'white', fontWeight: 'bold', alignSelf: 'center', marginTop: '54%'}} onPress={()=>{navigation.navigate("Welcome")}}>Cancel</Text>
                </View >
            </ImageBackground>
        </View>
    );
    
}