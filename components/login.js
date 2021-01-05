import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Avatar, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Login = ({navigation})=>{

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const login = ()=>{

    }

    return(
        <View style={{flex: 1}}>
            <ImageBackground source={{uri: 'https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}} style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
                <View style={{padding: '18%'}}> 
                    <Avatar 
                            size="xlarge"
                            rounded
                            source={{uri: 'data:image/jpeg;base64,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'}}
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