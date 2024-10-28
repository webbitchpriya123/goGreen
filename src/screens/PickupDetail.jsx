import React, { useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Text, View, TouchableOpacity, FlatList, ScrollView } from "react-native";
import DetailHeader from "../component/detailHeader";
import * as Color from '../constant/colors';

export default function PickupDetail(props) {

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
            <DetailHeader props={props} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.schedule}>Your Schedule Date is 16/09/2024</Text>
                    <Text style={styles.wait}>Can you wait</Text>
                    <Text style={[styles.wait, { fontWeight: '400', fontSize: 13, lineHeight: 20 }]}>(or)</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('BookRequest')} style={styles.otpView}>
                        <Text style={styles.otp}>Book a Request</Text>
                    </TouchableOpacity>
                    <View style={[styles.flex, styles.flexContainer]}>
                        <TouchableOpacity onPress={() => setWasteData('daily')} style={styles.flex5}>
                            <Text style={[styles.waste, { color: walkData === 'daily' ? Color.orange : Color.grey }]} >Daily Waste</Text>
                            <View style={[styles.border, { backgroundColor: walkData === 'daily' ? Color.orange : Color.grey }]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setWasteData('bulk')} style={styles.flex5}>
                            <Text style={[styles.waste, { color: walkData === 'bulk' ? Color.orange : Color.grey }]}>Bulk Waste</Text>
                            <View style={[styles.border, { backgroundColor: walkData === 'bulk' ? Color.orange : Color.grey }]}></View>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={waste}
                        vertical
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => <View style={styles.viewContainer}>
                            <View style={styles.flexContainer}>
                                <Text style={styles.vendorId}>fdgdhf54747</Text>
                                <Text style={styles.status}>Pending</Text>
                            </View>
                            <Text style={styles.vendor}>Vendor - <Text style={[styles.vendor, styles.vendorDetail]}> Corporate</Text> </Text>
                            <Text style={styles.vendor}>Weight - <Text style={[styles.vendor, styles.vendorDetail]}> None</Text> </Text>
                            <View style={styles.flexContainer}>
                                <Text style={styles.vendor}>Pickup date - <Text style={[styles.vendor, styles.vendorDetail]}> Corporate</Text> </Text>
                                <Text style={styles.vendor}>Material type - <Text style={[styles.vendor, styles.vendorDetail]}> None</Text> </Text>
                            </View>
                        </View>}
                        keyExtractor={item => item.id}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Color.white
    },
    wait: { fontWeight: '600', fontSize: 14, color: '#3C2C2C', textAlign: 'center', lineHeight: 45 },
    schedule: { color: Color.white, backgroundColor: Color.orange, fontWeight: '700', fontSize: 16, alignSelf: 'center', paddingHorizontal: 10, borderRadius: 20, paddingVertical: 3, marginTop: 15 },
    otpView: { backgroundColor: '#67C306', width: '35%', marginVertical: 12, borderRadius: 10, alignSelf: 'center' },
    otp: { color: Color.white, padding: 10, textAlign: 'center', fontSize: 16 },
    border: { height: 1, backgroundColor: Color.orange, marginVertical: 15 },
    waste: { textAlign: 'center', color: Color.grey, fontSize: 13, fontWeight: '500' },
    flex5: { flex: 0.5 },
    flex: { marginHorizontal: 15, marginTop: 10, },
    vendor: { color: '#8C8A9D', fontSize: 12, fontFamily: '400', lineHeight: 25 },
    viewContainer: { padding: 13, height: 130, borderColor: '#F4F4F4', marginHorizontal: 15, borderWidth: 1, marginVertical: 10, backgroundColor: Color.white, elevation: 1 },
    flexContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    status: { backgroundColor: '#FFF6D5', fontSize: 12, fontWeight: '400', color: '#E0C536', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 },
    vendorId: { fontSize: 16, fontWeight: '500', color: Color.orange, lineHeight: 20 },
    vendorDetail: { color: Color.black, fontWeight: '600' }

})