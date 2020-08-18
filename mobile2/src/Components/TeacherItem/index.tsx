import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlinIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: string;
    name: string;
    subject: string;
    whatsapp: string;
}

export interface TeacherItemProps {
    teacher: Teacher,
    favorited: boolean;
}

const  TeacherItem:React.FC<TeacherItemProps> = ({teacher, favorited}) => {
    const [isFavorite, setIsFavorite] = useState(favorited);

    function handleWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
        api.post('connections', {
            user_id: teacher.id,
        })
    }

    async function handleToggleFavorite() {
        console.log("handleToggleFavorite");
        //await AsyncStorage.setItem('favorites', JSON.stringify([]));
        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = [];

        console.log("favorites", favorites);

        if(favorites) favoritesArray = JSON.parse(favorites);
        
        console.log("favoritesArray", favoritesArray );
        

        if(isFavorite) {
            console.log("remove");
            //remove
            
                /*
            favoritesArray = favoritesArray.map((item:number) => {
                if(item != teacher.id) return item;
            });*/
            
            const favoriteIndex =  favoritesArray.findIndex((item: Teacher) => {
                return item.id === teacher.id
            });

                favoritesArray.splice(favoriteIndex, 1);
            
            console.log("favoritesArray", favoritesArray );
            await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
            setIsFavorite(false);

        } else {
            console.log("add");
            //add

            favoritesArray.push(teacher);
            console.log("favoritesArray", favoritesArray );
            await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
            setIsFavorite(true);


        }

    }

    return (
        <View style={styles.constainer}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>

                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}> R$ {teacher.cost}</Text>
                </Text>
                <View style={styles.buttonsContainer}>
                <RectButton 
                    style={[ 
                        styles.favoriteButton, 
                        isFavorite ? styles.favorited : {}]} 
                    onPress={handleToggleFavorite}>
                    { (isFavorite) 
                        ? <Image source={unfavoriteIcon} /> 
                        : <Image source={heartOutlinIcon} /> }
                    

                </RectButton>
                <RectButton style={styles.contactButton} onPress={handleWhatsapp}>
                    <Image source={whatsappIcon} />
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
                

            </View>
            </View>
            

        </View>
    )
}

export default TeacherItem;
