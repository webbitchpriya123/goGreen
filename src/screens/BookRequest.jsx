import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import * as Color from '../constant/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';



export default function BookRequest(props) {
    const [material, setMaterial] = useState('');
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState(new Date());
    const [dateVal, setDateVal] = useState('');
    const [showCalender, setShowCalender] = useState(false);

    const countries = [

    ]


    const onChange = (event, selectedDate) => {
        if (event.type === "set") { // This ensures the user clicked 'OK' instead of dismissing the picker
            const currentDate = selectedDate || date;
            setShow(false); // Hide the DateTimePicker
            const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;


            setDateVal(formattedDate);

        } else {
            setShow(false); // Hide DateTimePicker if user dismisses it
        }
    };




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
                        style={[styles.dropdown, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: material ? 0 : '#F0F5FA' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={countries}
                        containerStyle={{ borderRadius: 15 }}
                        maxHeight={300}
                        labelField="name"
                        valueField="id"
                        placeholder={material ? material : 'Select'}
                        searchPlaceholder="Search..."
                        value={material}
                        itemTextStyle={{ color: Color.darkBlack }}
                        onChange={item => {
                            setState(prevState => ({
                                ...prevState,
                                setMaterial: item.id
                            }))
                        }
                        }
                    />
                    <Text style={[styles.address, { color: Color.nameColor, marginTop: 10 }]}>Vendor Type</Text>
                    <Dropdown
                        style={[styles.dropdown, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: material ? 0 : '#F0F5FA' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={countries}
                        containerStyle={{ borderRadius: 15 }}
                        maxHeight={300}
                        labelField="name"
                        valueField="id"
                        placeholder={material ? material : 'Select'}
                        searchPlaceholder="Search..."
                        value={material}
                        itemTextStyle={{ color: Color.darkBlack }}
                        onChange={item => {
                            setState(prevState => ({
                                ...prevState,
                                setMaterial: item.id
                            }))
                        }
                        }
                    />
                    <View style={styles.flex}>
                        <View style={styles.flex47}>
                            <Text style={[styles.address, { color: Color.nameColor, marginTop: 10 }]}>Date</Text>
                            <View style={[styles.dropdown, styles.flex, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: material ? 0 : '#F0F5FA' }]}
                            >
                                <Text>dd/mm/yyyy</Text>
                                <TouchableOpacity onPress={() => setShowCalender(!showCalender)}>
                                    <AntDesign name="calendar" size={20} color={Color.black} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.flex47}>
                            <Text style={[styles.address, { color: Color.nameColor, marginTop: 10 }]}>Vendor Type</Text>
                            <Dropdown
                                style={[styles.dropdown, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: material ? 0 : '#F0F5FA' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={countries}
                                containerStyle={{ borderRadius: 15 }}
                                maxHeight={300}
                                labelField="name"
                                valueField="id"
                                placeholder={material ? material : 'Select'}
                                searchPlaceholder="Search..."
                                value={material}
                                itemTextStyle={{ color: Color.darkBlack }}
                                onChange={item => {
                                    setState(prevState => ({
                                        ...prevState,
                                        setMaterial: item.id
                                    }))
                                }
                                }
                            />
                        </View>
                    </View>

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
                <TouchableOpacity onPress={()=>props.navigation.navigate('Success')} style={styles.submitView}>
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
    flex1: { flex: 0.1 }
})