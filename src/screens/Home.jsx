import React, { useState, useEffect } from "react";
import { SafeAreaView, TextInput, Image, Text, FlatList, ScrollView, TouchableOpacity, View, Dimensions, StatusBar, StyleSheet } from "react-native";
import BackHeader from "../component/backHeader";
import * as Color from '../constant/colors';
import home from '../assests/home.png';
import industry from '../assests/industry.png';
import vendorRegister from '../assests/vendorRegister.png';
import { Dropdown } from 'react-native-element-dropdown';
import { getAllDistrict, getAllState, getTown, getArea, Register } from "../allApi/getAllApi";


const windowWidth = Dimensions.get('window').width;

export default function Home(props) {

    const { params } = props.route;
    const [Index, setIndex] = useState('');
    const [indexVal, setIndexVal] = useState(false);
    const [states, setStates] = useState([]);
    const [district, setDistirct] = useState([]);
    const [town, setTown] = useState([]);
    const [area, setArea] = useState([]);
    const [State, setState] = useState({
        name: '',
        email: '',
        state: '',
        district: "",
        stateName: '',
        districtName: '',
        address: '',
        industry: '',
        town: '',
        townName: '',
        areaName: '',
        area: '',
        id: '',
        pincode: ''

    })
    const [errors, setErrors] = useState({});


    useEffect(() => {
        allStates();
    }, []);



    const allStates = async () => {
        const all = await getAllState();
        setStates(all);
    }

    const allDist = async (id) => {
        const dist = await getAllDistrict(id);
        setDistirct(dist);
    }

    const allTown = async (id) => {
        const town = await getTown(id);
        setTown(town);
    }

    const allArea = async (id) => {
        const area = await getArea(id);
        setArea(area);
    }


    const categoryList = [
        {
            image: home,
            name: 'Household Waste',
            id: 1

        },
        {
            image: industry,
            name: 'Industry Wastage',
            id: 2
        },
        {
            image: vendorRegister,
            name: 'Vendor Register',
            id: 3
        }
    ]


    const onRegister = async () => {
        if ((State.name || State.industry) && State.email && State.state && State.district && State.area && State.town && State.pincode && State.address !== '') {
            console.log("safdfasfasdfdsafasdfsa");

            const reg = await Register(State, params);
            if (reg.data) {
                props.navigation.navigate('Otp', { phone: params.phone, name: 'Register', id: reg.data.id })
            }
        } else {
            alert('Please fil all fields')
        }
    }

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
                        setState(prevState => ({
                            ...prevState,
                            id: item.id,
                        }))
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
                                    {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}

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
                                        placeholder={State.stateName ? State.stateName : 'State'}
                                        searchPlaceholder="Search..."
                                        value={State.state}
                                        itemTextStyle={{ color: Color.darkBlack }}
                                        onChange={item => {
                                            setState(prevState => ({
                                                ...prevState,
                                                state: item.id,
                                                stateName: item.name
                                            }))
                                            allDist(item.id)
                                        }
                                        }
                                    />
                                </View>
                                <View style={{ flex: 0.47 }}>
                                    <Text style={[styles.address, { color: Color.nameColor }]}>District</Text>
                                    <Dropdown
                                        style={[styles.dropdown, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: State.district ? 0 : '#F0F5FA' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={district}
                                        containerStyle={{ borderRadius: 15 }}
                                        maxHeight={300}
                                        labelField="name"
                                        valueField="id"
                                        placeholder={State.districtName ? State.districtName : 'District'}
                                        searchPlaceholder="Search..."
                                        value={State.district}
                                        itemTextStyle={{ color: Color.darkBlack }}
                                        onChange={item => {
                                            setState(prevState => ({
                                                ...prevState,
                                                district: item.id,
                                                districtName: item.name
                                            }))
                                            allTown(item.id)
                                        }
                                        }
                                    />
                                </View>
                            </View>
                            <View style={[styles.flexContainer, { justifyContent: 'space-between', marginTop: 10 }]}>
                                <View style={{ flex: 0.47 }}>
                                    <Text style={[styles.address, { color: Color.nameColor }]}>Town</Text>
                                    <Dropdown
                                        style={[styles.dropdown, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: State.town ? 0 : '#F0F5FA' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={town}
                                        containerStyle={{ borderRadius: 15 }}
                                        maxHeight={300}
                                        labelField="name"
                                        valueField="id"
                                        placeholder={State.townName ? State.townName : 'Town'}
                                        searchPlaceholder="Search..."
                                        value={State.town}
                                        itemTextStyle={{ color: Color.darkBlack }}
                                        onChange={item => {
                                            setState(prevState => ({
                                                ...prevState,
                                                town: item.id,
                                                townName: item.name
                                            }))
                                            allArea(item.id)
                                        }
                                        }
                                    />
                                </View>
                                <View style={{ flex: 0.47 }}>
                                    <Text style={[styles.address, { color: Color.nameColor }]}>Area</Text>
                                    <Dropdown
                                        style={[styles.dropdown, { borderWidth: 2, borderColor: '#EEEEEE', backgroundColor: State.area ? 0 : '#F0F5FA' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={area}
                                        containerStyle={{ borderRadius: 15 }}
                                        maxHeight={300}
                                        labelField="name"
                                        valueField="id"
                                        placeholder={State.areaName ? State.areaName : 'Area'}
                                        searchPlaceholder="Search..."
                                        value={State.area}
                                        itemTextStyle={{ color: Color.darkBlack }}
                                        onChange={item => {
                                            setState(prevState => ({
                                                ...prevState,
                                                area: item.id,
                                                areaName: item.name
                                            }))
                                        }
                                        }
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.address, { color: Color.nameColor, marginTop: 10 }]}>Pincode</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: State.pincode.length ? 0 : '#F0F5FA' }]}
                                    onChangeText={onChangeText('pincode')}
                                    value={State.pincode}
                                    placeholder="Enter your pincode"
                                />
                            </View>

                            <View >
                                <Text style={[styles.address, { color: Color.nameColor }]} >Address</Text>
                                <TextInput
                                    style={[styles.input, { height: 90, backgroundColor: State.address.length ? 0 : '#F0F5FA' }]}
                                    onChangeText={onChangeText('address')}
                                    value={State.address}
                                    placeholder="Enter your address"
                                    maxLength={200}
                                />
                            </View>
                            <TouchableOpacity onPress={() => onRegister()} style={styles.otpView}>
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