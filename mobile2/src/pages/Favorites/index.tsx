import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import styles from './styles';
import PageHeader from '../../Components/PageHeader';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem, { Teacher } from '../../Components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // quando a aba tiver ativa, no caso de tab navigations


function Favorits() {
    const [favorites, setFavorites] = useState([]);
    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response)  {
                const favoritedTeachers = JSON.parse(response);
                
                setFavorites(favoritedTeachers);
            }
        })
    }

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )
    return (
        <View style={styles.container} >
            <PageHeader title="Meus Proffys Favoritos"/>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >

                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={ teacher.id}
                            teacher={teacher}
                            favorited
                            />
                    )
                })}
                
            </ScrollView>
        </View>
    )
}

export default Favorits;