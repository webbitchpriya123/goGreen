import React, { useState, useEffect } from "react";
import { SafeAreaView, TextInput, Image, Text, FlatList, ScrollView, TouchableOpacity, View, Dimensions, StatusBar, StyleSheet } from "react-native";
import BackHeader from "../component/backHeader";
import * as Color from '../constant/colors';
import home from '../assests/home.png';
import industry from '../assests/industry.png';
import vendorRegister from '../assests/vendorRegister.png';
import { Dropdown } from 'react-native-element-dropdown';
import { getAllState } from "../allApi/getAllApi";


const windowWidth = Dimensions.get('window').width;

export default function Home(props) {
    const [Index, setIndex] = useState('');
    const [indexVal, setIndexVal] = useState(false);
    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);
    const [town, setTown] = useState([]);
    const [area, setAreas] = useState([]);
    const [State, setState] = useState({
        name: '',
        email: '',
        state: '',
        country: '',
        stateName: '',
        countryName: '',
        address: '',
        industry: ''
    })

    useEffect(() => {
        allStates();
    }, []);

    const allStates = async () => {

        const all = await getAllState();

    }


    const categoryList = [
        {
            image: home,
            name: 'Household Waste'

        },
        {
            image: industry,
            name: 'Industry Wastage'
        },
        {
            image: vendorRegister,
            name: 'Vendor Register'
        }
    ]

    const onChangeText = (name) => (value) => {
        setState({
            ...State,
            [name]: value,
        });
    };

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar
                backgroundColor={Color.white}
            />
            <BackHeader props={props} />
            <View style={styles.horizontal}>
                <Text style={styles.links}>Select User Type</Text>
                <Text style={styles.content}>Lorem ipsum dolor sit amet, consectetur.</Text>
                <FlatList
                    data={categoryList}
                    horizontal
                    contentContainerStyle={{ width: windowWidth - 33, justifyContent: 'space-between' }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => <TouchableOpacity onPress={() => {
                        setIndex(index),
                            setIndexVal(true)
                    }} style={[styles.vendorView, { borderColor: Index === index ? '#FF9600' : '#DDDDDD' }]}>
                        <Image source={item.image} style={styles.imageStyle} />
                        <Text style={[styles.pickup, { marginLeft: 0, marginVertical: 10 }]}>{item.name}</Text>
                    </TouchableOpacity>}
                    keyExtractor={item => item.id}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                {indexVal ?
                    <>
                        <View style={styles.border}></View>
                        <View style={{ marginHorizontal: 15 }}>
                            <Text style={styles.address}>Address Details</Text>
                            <View style={{ marginTop: 15 }}>
                                <Text style={[styles.address, { color: Color.nameColor }]} >Full Name</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: State.name.length ? 0 : '#F0F5FA' }]}
                                    onChangeText={onChangeText('name')}
                                    value={State.name}
                                    placeholder="Enter your name"
                                />
                            </View>
                            {Index != 0 ?
                                <View>
                                    <Text style={[styles.address, { color: Color.nameColor }]}>Industry Name</Text>
                                    <TextInput
                                        style={[styles.input, { backgroundColor: State.industry.length ? 0 : '#F0F5FA' }]}
                                        onChangeText={onChangeText('industry')}
                                        value={State.industry}
                                        placeholder="Enter your industry name "
                                    />
                                </View> : null}
                            <View>
                                <Text style={[styles.address, { color: Color.nameColor }]}>Email</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: State.email.length ? 0 : '#F0F5FA' }]}
                                    onChangeText={onChangeText('email')}
                                    value={State.email}
                                    placeholder="Enter your email"
                                />
                            </View>
                            <View style={[styles.flexContainer, { justifyContent: 'space-between' }]}>
                                <View style={{ flex: 0.47 }}>
                                    <Text style={[styles.address, { color: Color.nameColor }]}>State</Text>
                                    <Dropdown
                                        style={[styles.dropdown, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: State.country || State.countryName ? 0 : '#F0F5FA' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={countries}
                                        containerStyle={{ borderRadius: 15 }}
                                        maxHeight={300}
                                        labelField="name"
                                        valueField="id"
                                        placeholder={State.countryName ? State.countryName : 'State'}
                                        searchPlaceholder="Search..."
                                        value={State.country}
                                        itemTextStyle={{ color: Color.darkBlack }}
                                        onChange={item => {
                                            setState(prevState => ({
                                                ...prevState,
                                                country: item.id
                                            }))
                                        }
                                        }
                                    />
                                </View>
                                <View style={{ flex: 0.47 }}>
                                    <Text style={[styles.address, { color: Color.nameColor }]}>District</Text>
                                    <Dropdown
                                        style={[styles.dropdown, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: State.state || State.stateName ? 0 : '#F0F5FA' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={states}
                                        containerStyle={{ borderRadius: 15 }}
                                        maxHeight={300}
                                        labelField="name"
                                        valueField="id"
                                        placeholder={State.stateName ? State.stateName : 'District'}
                                        searchPlaceholder="Search..."
                                        value={State.state}
                                        itemTextStyle={{ color: Color.darkBlack }}
                                        onChange={item => {
                                            setState(prevState => ({
                                                ...prevState,
                                                state: item.country_id
                                            }))
                                        }
                                        }
                                    />
                                </View>
                            </View>
                            <View style={[styles.flexContainer, { justifyContent: 'space-between', marginTop: 10 }]}>
                                <View style={{ flex: 0.47 }}>
                                    <Text style={[styles.address, { color: Color.nameColor }]}>Town</Text>
                                    <Dropdown
                                        style={[styles.dropdown, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: State.country || State.countryName ? 0 : '#F0F5FA' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={countries}
                                        containerStyle={{ borderRadius: 15 }}
                                        maxHeight={300}
                                        labelField="name"
                                        valueField="id"
                                        placeholder={State.countryName ? State.countryName : 'Town'}
                                        searchPlaceholder="Search..."
                                        value={State.country}
                                        itemTextStyle={{ color: Color.darkBlack }}
                                        onChange={item => {
                                            setState(prevState => ({
                                                ...prevState,
                                                country: item.id
                                            }))
                                        }
                                        }
                                    />
                                </View>
                                <View style={{ flex: 0.47 }}>
                                    <Text style={[styles.address, { color: Color.nameColor }]}>Area</Text>
                                    <Dropdown
                                        style={[styles.dropdown, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: State.state || State.stateName ? 0 : '#F0F5FA' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={states}
                                        containerStyle={{ borderRadius: 15 }}
                                        maxHeight={300}
                                        labelField="name"
                                        valueField="id"
                                        placeholder={State.stateName ? State.stateName : 'Area'}
                                        searchPlaceholder="Search..."
                                        value={State.state}
                                        itemTextStyle={{ color: Color.darkBlack }}
                                        onChange={item => {
                                            setState(prevState => ({
                                                ...prevState,
                                                state: item.country_id
                                            }))
                                        }
                                        }
                                    />
                                </View>
                            </View>

                            <View style={{ marginTop: 15 }}>
                                <Text style={[styles.address, { color: Color.nameColor }]} >Address</Text>
                                <TextInput
                                    style={[styles.input, { height: 90, backgroundColor: State.address.length ? 0 : '#F0F5FA' }]}
                                    onChangeText={onChangeText('name')}
                                    value={State.address}
                                    placeholder="Enter your address"
                                    maxLength={200}
                                />
                            </View>
                            <TouchableOpacity onPress={() => props.navigation.navigate('BookRequest')} style={styles.otpView}>
                                <Text style={styles.otp}>Submit</Text>
                            </TouchableOpacity>
                        </View></> : null}

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: { flex: 1, backgroundColor: Color.white },
    links: { color: Color.black, fontWeight: '400', fontSize: 16, textAlign: 'center', marginTop: 15 },
    pickup: { color: Color.pickup, marginLeft: 25, fontWeight: '500', fontSize: 14, textAlign: 'center' },
    flexContainer: { flexDirection: 'row', alignItems: 'center' },
    horizontal: { marginHorizontal: 15 },
    content: { fontWeight: '400', fontSize: 13, color: '#666666', textAlign: 'center', lineHeight: 30 },
    vendorView: { height: 120, width: windowWidth / 3 - 15, padding: 13, borderRadius: 10, marginTop: 20, borderWidth: 1 },
    border: { height: 1, backgroundColor: '#DBDBDB', marginVertical: 20 },
    imageStyle: { alignSelf: 'center', height: 40, width: 40, objectFit: 'contain' },
    input: {
        height: 55,
        marginVertical: 10,
        borderWidth: 2,
        padding: 10,
        borderColor: '#EEEEEE',
        borderRadius: 8,
        color: Color.black
    },
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
    otpView: { backgroundColor: '#67C306', width: '30%', marginVertical: 16, borderRadius: 10 },
    otp: { color: Color.white, padding: 13, textAlign: 'center', fontSize: 16 }
})