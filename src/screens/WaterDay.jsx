import React, { useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Text, View, TouchableOpacity, FlatList } from "react-native";
import * as Color from '../constant/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'



export default function WaterDay(props) {

    const [walkData, setWasteData] = useState('daily');
    const waste = [
        {
            vendor_id: 'BW00009752',
            vendor: 'SGD Traders',
            weight: '10kg - 15kg',
            material_type: 'Metal',
            status: 'Pending',
            request_date: '03/09/2024',
            estimate_date: '12/09/2024'
        },
        {
            vendor_id: 'BW00009297',
            vendor: 'SM Motors',
            weight: '14kg - 15kg',
            material_type: 'Metal',
            status: 'Pending',
            request_date: '06/09/2024',
            estimate_date: '15/09/2024'
        },
        {
            vendor_id: 'BW00009254',
            vendor: 'RK Spining mills',
            weight: '18kg - 39kg',
            material_type: 'Metal',
            status: 'Pending',
            request_date: '16/09/2024',
            estimate_date: '20/09/2024'
        },
        {
            vendor_id: 'BW00008976',
            vendor: 'SGD Traders',
            weight: '10kg - 15kg',
            material_type: 'Metal',
            status: 'Pending',
            request_date: '12/09/2024',
            estimate_date: '27/09/2024'
        }
    ]

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar
                backgroundColor={Color.white}
            />
            <View style={styles.container}>
                <View style={[styles.flexContainer, { justifyContent: 'space-between' }]}>
                    <TouchableOpacity onPress={() => props.props.navigation.goBack()}>
                        <AntDesign name="left" color="black" size={25} />

                    </TouchableOpacity>
                    <Text style={styles.pickup}>Water day calender</Text>
                    <Entypo name="dots-three-vertical" size={20} color={Color.border} />

                </View>
                <Text style={[styles.title, { marginVertical: 15 }]}>Upcoming</Text>
                <View style={styles.upcomeContainer}>
                    <View style={styles.flex2}>
                        <View style={styles.orangeContainer}>
                            <FontAwesome5 name="calendar" size={20} color={Color.white} style={{ alignSelf: 'center', marginTop: 8 }} />
                        </View>
                    </View>
                    <View style={{ flex: 0.8 }}>
                        <Text style={styles.date}>26, September, 2024</Text>
                        <View style={styles.flexContainer}>
                            <AntDesign name="clockcircle" size={20} color={Color.water} style={{ marginRight: 7 }} />
                            <Text style={styles.date}>12.00 - 16.00</Text>

                        </View>
                    </View>
                </View>
                <Text style={[styles.title, { marginTop: 15 }]}>Previous</Text>

                <FlatList
                    data={waste}
                    vertical
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                        <View style={[styles.upcomeContainer, { backgroundColor: '#D8D8D824', marginTop: 15 }]}>
                            <View style={{ flex: 0.2 }}>
                                <View style={styles.clock}>
                                    <FontAwesome5 name="calendar" size={20} color={Color.white} style={{ alignSelf: 'center', marginTop: 8 }} />
                                </View>
                            </View>
                            <View style={{ flex: 0.8 }}>
                                <Text style={styles.date}>26, September, 2024</Text>
                                <View style={styles.flexContainer}>
                                    <AntDesign name="clockcircle" size={20} color={Color.water} style={{ marginRight: 7 }} />
                                    <Text style={styles.date}>12.00 - 16.00</Text>

                                </View>
                            </View>
                        </View>
                    }
                    keyExtractor={item => item.id}
                />

            </View>


        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Color.white
    },
    container: { marginHorizontal: 15 },
    title: { fontWeight: '400', color: Color.black, fontSize: 16, lineHeight: 22 },
    flexContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    pickup: { color: Color.border, fontSize: 16, fontWeight: '600' },
    upcomeContainer: { backgroundColor: '#FF960024', flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 10 },
    orangeContainer: { backgroundColor: Color.orange, height: 40, width: 40, borderRadius: 10 },
    date: { fontWeight: '400', color: Color.water, fontSize: 12, lineHeight: 22 },
    clock: { backgroundColor: Color.water, height: 40, width: 40, borderRadius: 10 },
    flex2: { flex: 0.2 }


})