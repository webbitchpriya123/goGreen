import React from "react";
import { SafeAreaView,View, Image, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import headerImg from '../assests/header.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Color from '../constant/colors';


export default function Header (props){
    return(
        <SafeAreaView>
            <View style={styles.flexContainer}>
                <TouchableOpacity >
                <AntDesign name="menuunfold" color="black" size={25}/>

                </TouchableOpacity>
                <Image source={headerImg}  />
                <View style={styles.notify}>
                <Ionicons name="notifications-outline" size={25} color={Color.white}  style={{alignSelf:'center'}}/>
                </View>
            </View>
            <View style={styles.border}></View>

        </SafeAreaView>
    )
}

const styles =  StyleSheet.create({
    flexContainer:
    {flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:15},
    notify:{backgroundColor:'#67C306',height:35,width:35,borderRadius:30,justifyContent:'center'},
    border:{ height: 1, backgroundColor: '#DBDBDB', marginVertical: 10 }

})