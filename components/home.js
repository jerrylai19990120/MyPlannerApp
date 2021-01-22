import React, {useEffect} from 'react';
import {View, Text, ImageBackground, ScrollView, RefreshControl} from 'react-native';
import {Avatar, Input, Button, Icon} from 'react-native-elements';
import {List} from 'react-native-paper';
import Swipeout from 'react-native-swipeout-mod';


export const Home = ({navigation})=>{

    const [pastTasks, setPastTasks] = React.useState([])
    const [currTasks, setCurrTasks] = React.useState([])
    const [upcomingTasks, setUpcomingTasks] = React.useState([])
    const [refresh, setRrefresh] = React.useState(false)
    
    const onRefresh = ()=>{
        setRrefresh(true);
        
        setRrefresh(false)
    }
    /*{
            title: "task 1",
            desc: "desc",
            date: "2019-10-10",
            finished: true
        }*/
    useEffect(()=>{
        setPastTasks([])
        setCurrTasks([])
        setUpcomingTasks([])
        

    }, [])

    const removeTask = (index)=>{

    }

    const addTask = ()=>{

    }

    const logout = ()=>{

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
                                <Swipeout right={[{text: 'Remove', backgroundColor: 'orange', onPress: ()=>{removeTask(i)}}]}>
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
                                <Swipeout right={[{text: 'Remove', backgroundColor: 'orange', onPress: ()=>{removeTask(i)}}]}>
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