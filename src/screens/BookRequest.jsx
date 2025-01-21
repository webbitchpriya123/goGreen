import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View,TextInput } from "react-native";
import * as Color from '../constant/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { gtAllMaterial, getVendor } from "../allApi/getAllApi";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";



export default function BookRequest(props) {
    const isFocused = useIsFocused();
    const [material, setMaterial] = useState([]);
    const [date, setDate] = useState(new Date());
    const [dateVal, setDateVal] = useState('');
    const [vendor, setVendor] = useState([]);
    const [vendorId, setVendorId] = useState('');
    const [showCalender, setShowCalender] = useState(false);
    const [materialId, setMaterialId] = useState('');
    const [weight , setWeight] =  useState('');

    useEffect(() => {
        allData();
    }, [isFocused]);

    const allData = async () => {
        const all = await gtAllMaterial();
        setMaterial(all);
        const vendor = await getVendor();
        setVendor(vendor);
    }

    const onChange = (event, selectedDate) => {
        if (event.type === "set") { // This ensures the user clicked 'OK' instead of dismissing the picker
            const currentDate = selectedDate || date;
            setDateVal(currentDate);
            setShowCalender(false); // Hide the DateTimePicker
        } else {
            setShowCalender(false); // Hide DateTimePicker if user dismisses it
        }
    };

    const onSubmit = () => {
        props.navigation.navigate('Success');
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.flex9}>
                <View style={styles.flexContainer}>
                    <TouchableOpacity style={{ flex: 0.3 }} onPress={() =>
                        props.navigation.goBack()
                    }>
                        <AntDesign name="left" color="black" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.book}>Book a Request</Text>
                </View>
                <View style={{ margin: 15 }}>
                    <Text style={[styles.address, { color: Color.nameColor }]}>Material Type</Text>
                    <Dropdown
                        style={[styles.dropdown, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: materialId ? 0 : '#F0F5FA' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={material}
                        containerStyle={{ borderRadius: 15 }}
                        maxHeight={300}
                        labelField="name"
                        valueField="id"
                        placeholder={materialId ? materialId : 'Select'}
                        searchPlaceholder="Search..."
                        value={materialId}
                        itemTextStyle={{ color: Color.darkBlack }}
                        onChange={item => {
                            setMaterialId(item.id)
                        }
                        }
                    />

                    <View style={styles.flex}>
                        <View style={styles.flex47}>
                            <Text style={[styles.address, { color: Color.nameColor, marginTop: 10 }]}>Date</Text>
                            <View style={[styles.dropdown, styles.flex, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: material ? 0 : '#F0F5FA' }]}
                            >
                                <Text>{dateVal ? moment(dateVal).format('DD/MM/YYYY') : 'dd/mm/yyyy'}</Text>
                                <TouchableOpacity onPress={() => setShowCalender(!showCalender)}>
                                    <AntDesign name="calendar" size={20} color={Color.black} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.flex47}>
                            <Text style={[styles.address, { color: Color.nameColor, marginTop: 10 }]}>Vendor Type</Text>
                            <Dropdown
                                style={[styles.dropdown, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: vendorId ? 0 : '#F0F5FA' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={vendor}
                                containerStyle={{ borderRadius: 15 }}
                                maxHeight={300}
                                labelField="name"
                                valueField="id"
                                placeholder={vendorId ? vendorId : 'Select'}
                                searchPlaceholder="Search..."
                                value={vendorId}
                                itemTextStyle={{ color: Color.darkBlack }}
                                onChange={item => {
                                    setVendorId(item.id)
                                }
                                }
                            />
                        </View>
                    </View>

                    <Text style={[styles.address, { color: Color.nameColor, marginTop: 10 }]}>Weight</Text>


                    <TextInput
                            style={styles.input}
                            placeholder={'weight'}
                            placeholderTextColor={'#7F8192'}
                            keyboardType="numeric"
                            value={weight}
                            onChangeText={(text)=>setWeight(text)}
                        />

                    
                </View>
            </View>
            {showCalender && (
                <DateTimePicker
                    testID="dateTime"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
            <View style={styles.flex1}>
                <TouchableOpacity onPress={() =>
                    onSubmit()
                } style={styles.submitView}>
                    <Text style={styles.submit}>Submit</Text>
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
    flexContainer:
        { flexDirection: 'row', alignItems: 'center', padding: 15 },
    book: { color: Color.border, fontSize: 16, fontWeight: '600', flex: 0.7 },
    dropdown: {
        height: 55,
        borderRadius: 10,
        paddingHorizontal: 8,
        borderWidth: 2,
        marginTop: 13,
    },
    placeholderStyle: {
        fontSize: 14,
        color: '#7F8192',
    },
    selectedTextStyle: {
        fontSize: 14,
        color: Color.black,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    address: { color: Color.black, fontWeight: '400', fontSize: 14 },
    flex: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    flex47: { flex: 0.47 },
    submitView: { borderRadius: 5, backgroundColor: Color.green, height: 55, marginHorizontal: 15, justifyContent: 'center' },
    submit: { color: Color.white, fontSize: 14, textAlign: 'center', fontWeight: '400' },
    flex9: { flex: 0.9 },
    flex1: { flex: 0.1 },
    input: {
        height: 55,
        padding: 10,
        borderRadius: 10,
        color: '#7F8192',
        marginTop: 12,
        backgroundColor: '#F5F6FA'
    },
})