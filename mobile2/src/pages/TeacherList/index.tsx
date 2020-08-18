import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import PageHeader from '../../Components/PageHeader';
import TeacherItem, { Teacher } from '../../Components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';

import { Feather} from '@expo/vector-icons';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

//import {} from ''

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    

    const [isFilterVisible, setIsFiltersVisible] = useState(false);
    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response)  {
                const favoritedTeachers = JSON.parse(response);
                const favoritedIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })
                setFavorites(favoritedTeachers);
            }
        })
    }
    
    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )
    
    function handleFilter( ) {
        setIsFiltersVisible(!isFilterVisible);
    }


    async function handleSubmit() {
        loadFavorites();
        const data ={
            subject,
            weekDay,
            time
        }
        console.log(data);

       try{

        const response = await api.get('classes', {
            params: {
                subject,
                week_day:weekDay,
                time
            }
        });
        console.log("response");
        console.log(response.data);
        setTeachers(response.data);
        setIsFiltersVisible(false);
    }catch(err){
        console.log("response");
        console.log(err);
    }
        

    }
    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponiveis" 
                headerRight={(
                <BorderlessButton onPress={handleFilter}>
                    <Feather name="filter" size={20} color='#FFF' />
                </BorderlessButton>

            
            )}>
                {isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            placeholderTextColor="#c1bccc"
                            style={styles.input}
                            value={subject}
                            onChangeText={ text => setSubject(text)}
                            placeholder="qual é a matéria"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    placeholderTextColor="#c1bccc"
                                    style={styles.input}
                                    placeholder="qual é o dia?"
                                    value={weekDay}
                            onChangeText={ text => setWeekDay(text)}
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horario</Text>
                                <TextInput
                                    placeholderTextColor="#c1bccc"
                                    style={styles.input}
                                    placeholder="Qual horário??"
                                    value={time}
                            onChangeText={ text => setTime(text)}
                                />
                            </View>
                        </View>
                        <RectButton style={styles.subimitButton} onPress={handleSubmit}>
                            <Text style={styles.subimitButtonText}>Filtrar</Text>

                        </RectButton>
                    </View>)}
            </PageHeader>



            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher:Teacher) => {
                    return (
                    <TeacherItem key={teacher.id} teacher={teacher} 
                    favorited={favorites.includes(teacher.id)}/>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList;