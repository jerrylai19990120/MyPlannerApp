import React, {useEffect} from 'react';
import {View, Text, ImageBackground, ScrollView, RefreshControl} from 'react-native';
import {Avatar, Input, Button, Icon} from 'react-native-elements';
import {List} from 'react-native-paper';
import Swipeout from 'react-native-swipeout-mod';


export const Home = ({navigation, username, setUser})=>{

    const [pastTasks, setPastTasks] = React.useState([])
    const [currTasks, setCurrTasks] = React.useState([])
    const [upcomingTasks, setUpcomingTasks] = React.useState([])
    const [refresh, setRrefresh] = React.useState(false)
    const [tasks, setTasks] = React.useState([])
    
    const onRefresh = ()=>{
        setRrefresh(true);
        setTasks([])
        setPastTasks([])
        setCurrTasks([])
        setUpcomingTasks([])
        
        const request = new Request('http://127.0.0.1:8000/getTasks/', {
            method: 'post',
            body: JSON.stringify({
                username: username,
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-type": "application/json"
            }
        })

        fetch(request).then(res => {
            return res.text()
        }).then(text => {
            objs = text.split('}')
            objs.splice(-1, 1)
            
            for(let i=0;i<objs.length;i++){
                setTasks(old=>[...old, JSON.parse(objs[i].concat('}'))])
            }
        }).then(()=>{
            date = new Date()
            now = `${date.getFullYear()}-${date.getMonth()+1<10?0:''}${date.getMonth()+1}-${date.getDate()}`
            now = Date.parse(now)

            for(let i=0;i<tasks.length;i++){
                let task_date = Date.parse(tasks[i].date)
                if(task_date<now){
                    setPastTasks(old=>[...old, tasks[i]])
                }else if(task_date>now){
                    setUpcomingTasks(old=>[...old, tasks[i]])
                }else if(task_date===now){
                    setCurrTasks(old=>[...old, tasks[i]])
                }
            }
        })
        .then(()=>{
            setRrefresh(false)
        })
        .catch(err => console.log(err))
        
    }
    
    useEffect(()=>{
        setTasks([])
        setPastTasks([])
        setCurrTasks([])
        setUpcomingTasks([])
        
        const request = new Request('http://127.0.0.1:8000/getTasks/', {
            method: 'post',
            body: JSON.stringify({
                username: username,
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-type": "application/json"
            }
        })

        fetch(request).then(res => {
            return res.text()
        }).then(text => {
            objs = text.split('}')
            objs.splice(-1, 1)
            
            for(let i=0;i<objs.length;i++){
                setTasks(old=>[...old, JSON.parse(objs[i].concat('}'))])
            }
        }).then(()=>{
            date = new Date()
            now = `${date.getFullYear()}-${date.getMonth()+1<10?0:''}${date.getMonth()+1}-${date.getDate()}`
            now = Date.parse(now)

            for(let i=0;i<tasks.length;i++){
                let task_date = Date.parse(tasks[i].date)
                if(task_date<now){
                    setPastTasks(old=>[...old, tasks[i]])
                }else if(task_date>now){
                    setUpcomingTasks(old=>[...old, tasks[i]])
                }else if(task_date===now){
                    setCurrTasks(old=>[...old, tasks[i]])
                }
            }
        })
        .catch(err => console.log(err))

        
    }, [])

    const removeCurrTask = (index)=>{
        task_id = currTasks[index].id
        const request = new Request('http://127.0.0.1:8000/removeTask/', {
            method: 'delete',
            body: JSON.stringify({
                id: `${task_id}`
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-type": "application/json"
            }
        })
        setCurrTasks(currTasks.filter(item => item !== currTasks[index]))
        fetch(request).then(res => {
            return res.json()
        }).then(json => {
            if(parseInt(json.deleted)===0){
                showMessage({
                    message: '',
                    description: 'Error occured',
                    type: 'danger',
                    duration: 1000
                })
            }else{
                showMessage({
                    message: '',
                    description: 'Task removed',
                    type: 'success',
                    duration: 1000
                })
            }
        }).catch(err => console.log(err))
    }


    const removeFutureTask = (index)=>{
        task_id = upcomingTasks[index].id
        const request = new Request('http://127.0.0.1:8000/removeTask/', {
            method: 'delete',
            body: JSON.stringify({
                id: `${task_id}`
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-type": "application/json"
            }
        })
        setUpcomingTasks(upcomingTasks.filter(item => item !== upcomingTasks[index]));
        fetch(request).then(res => {
            return res.json()
        }).then(json => {
            if(parseInt(json.deleted)===0){
                showMessage({
                    message: '',
                    description: 'Error occured',
                    type: 'danger',
                    duration: 1000
                })
            }else{
                showMessage({
                    message: '',
                    description: 'Task removed',
                    type: 'success',
                    duration: 1000
                })
            }
        }).catch(err => console.log(err))
    }

    const addTask = ()=>{
        navigation.navigate('AddTask')
    }

    const logout = ()=>{
        setUser({
            username: '',
            loggedIn: false
        })
        navigation.navigate('Welcome')
    }

    return(
        <View style={{flex: 1, backgroundColor:'#DCDCDC'}}>
            <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh}/>}>
                <List.Section title="Tasks Reminder" style={{marginTop: '10%'}}>
                    <List.Accordion
                        theme={{colors: {primary:'#F70100'}}}
                        title="Past Tasks"
                        left={props => <List.Icon {...props} icon="calendar-refresh" />}>
                        {pastTasks.length===0?<List.Item title="No past tasks" left={props=><List.Icon {...props} icon="crystal-ball"/>}/>:
                            pastTasks.map((item, i)=>(
                                <List.Item title={item.title} description={item.desc} left={props=><List.Icon {...props} icon={item.finished?"check-underline-circle":"calendar-remove"}/>} right={()=>(<Text>{item.date}</Text>)}/>
                            ))
                        }
                    </List.Accordion>

                    <List.Accordion
                        theme={{colors: {primary:'#01B63A'}}}
                        title="Today's Tasks"
                        left={props => <List.Icon {...props} icon="calendar-star" />}>
                        {currTasks.length===0?<List.Item title="No tasks for today" left={props=><List.Icon {...props} icon="crystal-ball"/>}/>:
                            currTasks.map((item, i)=>(
                                <Swipeout right={[{text: 'Remove', backgroundColor: 'orange', onPress: ()=>{removeCurrTask(i)}}]}>
                                    <List.Item title={item.title} description={item.desc} left={props=><List.Icon {...props} icon={item.finished?"check-underline-circle":"clock-outline"}/>} right={()=>(<Text>{item.date}</Text>)}/>
                                </Swipeout>
                                
                            ))
                        }
                    </List.Accordion>
                    <List.Accordion
                        theme={{colors: {primary:'#43A6EA'}}}
                        title="Upcoming Tasks"
                        left={props => <List.Icon {...props} icon="calendar-clock" />}
                    >
                        {upcomingTasks.length===0?<List.Item title="No upcoming tasks" left={props=><List.Icon {...props} icon="crystal-ball"/>}/>:
                            upcomingTasks.map((item, i)=>(
                                <Swipeout right={[{text: 'Remove', backgroundColor: 'orange', onPress: ()=>{removeFutureTask(i)}}]}>
                                    <List.Item title={item.title} description={item.desc} left={props=><List.Icon {...props} icon="clock-outline"/>} right={()=>(<Text>{item.date}</Text>)}/>
                                </Swipeout>
                                
                            ))
                        }
                    </List.Accordion>
                </List.Section>
            </ScrollView>
            <View style={{padding: '10%'}}>
                    <Button 
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
                    <Button 
                        type="outline"
                        title="Log out"
                        icon={
                            <Icon
                                name="logout"
                                size={26}
                                color="orange"
                            />
                        }
                        style={{marginTop: '1%'}}
                        buttonStyle={{borderColor: 'orange', borderWidth: 3}}
                        titleStyle={{color: 'orange'}}
                        onPress={()=>{logout()}}
                    />
                </View>
        </View>
    )
}