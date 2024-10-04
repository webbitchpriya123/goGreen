import React from "react";
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import headerImg from '../assests/header.png';
import * as Color from '../constant/colors';


export default function Header(props) {
    return (
        <SafeAreaView>
            <View style={styles.flexContainer}>
                <View style={styles.flex}>
                    <TouchableOpacity onPress={() => props.props.navigation.goBack()}>
                        <AntDesign name="arrowleft" color="black" size={25} />

                    </TouchableOpacity>
                    <Text style={styles.pickup}>Back</Text>
                </View>
                <Image source={headerImg} />

            </View>
            <View style={styles.border}></View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer:
        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 },
    notify: { backgroundColor: '#67C306', height: 35, width: 35, borderRadius: 30, justifyContent: 'center' },
    pickup: { color: Color.black, marginLeft: 15, fontWeight: '500', fontSize: 15 },
    border: { height: 1, backgroundColor: '#DBDBDB', marginVertical: 10 },
    flex: { flexDirection: 'row', alignItems: 'center' }

})