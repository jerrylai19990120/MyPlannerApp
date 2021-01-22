import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Button, Input, Avatar} from 'react-native-elements';


export const Welcome = ({navigation})=>{

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
                    <View>
                        <Button type="outline" title="Log in" onPress={()=>{navigation.navigate('Login')}} 
                        style={{marginTop: '18%'}} titleStyle={{color: 'white', fontWeight: "bold"}} buttonStyle={{borderColor: 'orange', borderWidth: 3}}/>
                        <Button type="outline" title="Sign up" onPress={()=>{navigation.navigate('Signup')}} 
                        style={{marginTop: '8%'}} titleStyle={{color: 'white', fontWeight: 'bold'}} buttonStyle={{borderColor: 'orange', borderWidth: 3}}/>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );

}

