import React, { useEffect, useState } from "react";
import { SafeAreaView, Dimensions, StyleSheet, StatusBar, Text, View, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from "react-native";
import DetailHeader from "../component/detailHeader";
import * as Color from '../constant/colors';
import { bulkWaste } from "../allApi/getAllApi";
import moment from "moment";


const windowHeight = Dimensions.get('window').height;

export default function PickupDetail(props) {

    const [walkData, setWasteData] = useState('daily');
    const [wastage, setWastage] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true);
        bulk();
    }, [])

    const bulk = async () => {
        const bulk = await bulkWaste();
        if (bulk.data) {
            setLoad(false)
            setWastage(bulk.data);
        }
    }

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar
                backgroundColor={Color.white}
            />
            {load ?
                <View style={styles.loader}>
                    <ActivityIndicator size="small" color="#0000ff" style={{ justifyContent: 'center' }} />
                </View> : <>
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
                                <TouchableOpacity onPress={() => {
                                    setWasteData('bulk');
                                    bulk();

                                }} style={styles.flex5}>
                                    <Text style={[styles.waste, { color: walkData === 'bulk' ? Color.orange : Color.grey }]}>Bulk Waste</Text>
                                    <View style={[styles.border, { backgroundColor: walkData === 'bulk' ? Color.orange : Color.grey }]}></View>
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={wastage}
                                vertical
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => <View style={styles.viewContainer}>
                                    <View style={styles.flexContainer}>
                                        <Text style={styles.vendorId}>{item.request_id}</Text>
                                        <Text style={styles.status}>Pending</Text>
                                    </View>
                                    <Text style={styles.vendor}>Vendor - <Text style={[styles.vendor, styles.vendorDetail]}> {item.vendor_type}</Text> </Text>
                                    <Text style={styles.vendor}>Weight - <Text style={[styles.vendor, styles.vendorDetail]}> {item.approximate_weight}</Text> </Text>
                                    <View style={styles.flexContainer}>
                                        <Text style={styles.vendor}>Pickup date - <Text style={[styles.vendor, styles.vendorDetail]}>{moment(item.created_at).format('L')} { }</Text> </Text>
                                        <Text style={styles.vendor}>Material type - <Text style={[styles.vendor, styles.vendorDetail]}> {item.material_type}</Text> </Text>
                                    </View>
                                </View>}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </ScrollView></>}
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
    vendorDetail: { color: Color.black, fontWeight: '600' },
    loader:{ height: windowHeight, justifyContent: 'center' }

})