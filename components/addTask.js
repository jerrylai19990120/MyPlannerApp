import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Avatar, Input, Button, Header, Icon} from 'react-native-elements';
import DateTimePicker from "@react-native-community/datetimepicker";
import {Caption, TextInput} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

export const AddTask = ({navigation, owner})=>{

    const [date, setDate] = React.useState(new Date())
    const [desc, setDesc] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [finished, setFinished] = React.useState("false")

    const addTask = ()=>{

        const request = new Request('http://127.0.0.1:8000/addTask/',{
            method: 'post',
            body: JSON.stringify({
                owner: owner,
                title: title,
                desc: desc,
                date: `${date.getFullYear()}-${date.getMonth()+1<10?0:''}${date.getMonth()+1}-${date.getDate()<10?0:''}${date.getDate()}`,
                finished: finished
            }),
            headers: {
                Accept: "*/*",
                "Content-type": "application/json"
            }
        })


        fetch(request).then(res => {
            return res.json()
        }).then(json => {
            if(json.status==='added'){
                showMessage({
                    message: '',
                    description: 'Task added',
                    type: 'success',
                    duration: 1000
                })
                navigation.navigate('Home')
            }else{
                showMessage({
                    message: '',
                    description: 'Error occured',
                    type: 'danger',
                    duration: 1000
                })
            }
        }).catch(err => {
            console.log(err)
        })

    }

    return(
        <View style={{flex: 1}}>
            <Header
                    leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: ()=>{navigation.navigate('Home')}}}
                    containerStyle={{backgroundColor: 'orange'}}
            />
            <View style={{padding: '10%'}}>
                <View style={{marginTop: '2%'}}>
                        <Caption>Task name:</Caption>
                        <Input
                            placeholder='title'
                            onChangeText={text=>{setTitle(text)}}
                        />
                </View>
                <View style={{marginTop: '2%'}}>
                    <Caption style={{marginTop: '2%'}}>Describe your task:</Caption>
                    <TextInput style={{ backgroundColor: 'white', width: '98%', height: 130, alignSelf: 'center', borderRadius: 12, padding: '2%'}}
                            multiline
                            placeholder="Description"
                            onChangeText={text => {setDesc(text)}}
                    />
                </View>
                <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='datetime'
                            is24Hour={true}
                            display="spinner"
                            onChange={(event, selectedDate)=>{
                                setDate(selectedDate);
                            }}
                            minimumDate={new Date()}
                        />
                        <Button 
                            style={{marginTop: '18%'}}
                            type="outline"
                            title="Add a Task"
                            icon={
                                <Icon
                                    name="add"
                                    size={26}
                                    color="orange"
                                />
                            }
                            buttonStyle={{borderColor: 'orange', borderWidth: 3}}
                            titleStyle={{color: 'orange'}}
                            onPress={()=>{addTask()}}
                        />
            </View>
            
        </View>
    )
}