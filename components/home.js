import React, {useEffect} from 'react';
import {View, Text, ImageBackground, ScrollView, RefreshControl} from 'react-native';
import {Avatar, Input, Button} from 'react-native-elements';
import {List} from 'react-native-paper';


export const Home = ({navigation})=>{

    const [pastTasks, setPastTasks] = React.useState([])
    const [currTasks, setCurrTasks] = React.useState([])
    const [upcomingTasks, setUpcomingTasks] = React.useState([])
    const [refresh, setRrefresh] = React.useState(false)
    
    const onRefresh = ()=>{
        setRrefresh(true);
        
        setRrefresh(false)
    }

    useEffect(()=>{
        setPastTasks([])
        setCurrTasks([])
        setUpcomingTasks([])
        setPastTasks(old=>[...old, {
            title: "task 1",
            desc: "desc",
            date: "2019-10-10",
            finished: true
        }])
        setCurrTasks(old=>[...old, {
            title: "task 1",
            desc: "desc",
            date: "2019-10-10",
            finished: true
        }])
        setUpcomingTasks(old=>[...old, {
            title: "task 1",
            desc: "desc",
            date: "2019-10-10",
            finished: true
        }])



    }, [])

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
                                <List.Item title={item.title} description={item.desc} left={props=><List.Icon {...props} icon={item.finished?"check-underline-circle":"clock-outline"}/>} right={()=>(<Text>{item.date}</Text>)}/>
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
                                <List.Item title={item.title} description={item.desc} left={props=><List.Icon {...props} icon="clock-outline"/>} right={()=>(<Text>{item.date}</Text>)}/>
                            ))
                        }
                    </List.Accordion>
                </List.Section>
            </ScrollView>
        </View>
    )
}