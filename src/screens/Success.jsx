import React from "react";
import { SafeAreaView, View, TouchableOpacity, Text, StatusBar, StyleSheet, Image } from "react-native";
import * as Color from '../constant/colors';
import success from '../assests/success.png'

export default function Success(props) {
    return (
        <SafeAreaView style={styles.background}>
            <StatusBar
                backgroundColor={Color.white}
            />
            <View style={styles.container}>
                <Image source={success} />
                <Text style={styles.success}>Successful</Text>
                <Text style={styles.request}>Your request has been successfully
                    submitted!</Text>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.request}>Automatically redirect to homepage in</Text>
                <Text style={[styles.request, { color: Color.orange, marginBottom: 15 }]}>5 Seconds...</Text>
                <TouchableOpacity onPress={()=>props.navigation.navigate('Home')} style={styles.submitView}>
                    <Text style={styles.submit}>Done</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Color.white
    },
    submitView: { borderRadius: 5, backgroundColor: Color.green, height: 55, marginHorizontal: 15, justifyContent: 'center' },
    submit: { color: Color.white, fontSize: 14, textAlign: 'center', fontWeight: '400' },
    container: { flex: 0.8, alignSelf: 'center', justifyContent: 'center' },
    bottom: { flex: 0.2, justifyContent: 'center' },
    request: { color: Color.border, alignSelf: 'center', fontWeight: '400', fontSize: 12, lineHeight: 25 },
    success: { color: Color.orange, fontSize: 22, fontWeight: '600', textAlign: 'center', lineHeight: 35, marginTop: 10 }
})

