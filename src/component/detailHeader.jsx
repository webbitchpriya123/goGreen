import React from "react";
import { SafeAreaView, TouchableOpacity,View, Text, StyleSheet } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Color from '../constant/colors';


export default function DetailHeader(props) {
    return (
        <SafeAreaView>
            <View style={styles.flexContainer}>
                <TouchableOpacity onPress={()=>props.props.navigation.goBack()}>
                <AntDesign name="left" color="black" size={25} />

                </TouchableOpacity>
                <Text style={styles.pickup}>Pickup Details</Text>
                <AntDesign name="infocirlceo" size={25} color={Color.border} />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexContainer:
        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 },
    notify: { backgroundColor: '#67C306', height: 35, width: 35, borderRadius: 30, justifyContent: 'center' },
    border: { height: 1, backgroundColor: '#DBDBDB', marginVertical: 10 },
    pickup:{ color: Color.border, fontSize: 16, fontWeight: '600' }

})