import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import * as Color from '../constant/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';


export default function BookRequest(props) {
    const [material, setMaterial] = useState('');
    const [weight, setWeight] = useState('');
    const [date , setDate] =  useState('');
    const [vendor , setVendor] =  useState('');

    const countries = [

    ]

    return (
        <SafeAreaView style={styles.background}>
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

                {/* <View style={styles.cityView}>
                    <View style={{ flex: 0.47 }}>
                        <Text>Date</Text>

                    </View>
                    <View style={{ flex: 0.47 }}>
                        <Text>States</Text>
                        <Dropdown
                            style={[styles.dropdown, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: date ? 0 : '#F0F5FA' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={countries}
                            containerStyle={{ borderRadius: 15 }}
                            maxHeight={300}
                            labelField="name"
                            valueField="country_id"
                            placeholder={date ? date : 'Select'}
                            searchPlaceholder="Search..."
                            value={date}
                            itemTextStyle={{ color: Color.darkBlack }}
                            onChange={item => {
                                setState(prevState => ({
                                    ...prevState,
                                    state: item.country_id
                                }))
                                cityVal(item.country_id)
                            }
                            }
                        />
                    </View>
                </View> */}
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
})