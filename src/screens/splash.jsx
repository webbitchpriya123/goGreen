import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, TextInput, Image, Text, FlatList, ScrollView, TouchableOpacity, View, Dimensions, StatusBar, StyleSheet } from "react-native";
import Header from "../component/header";
import BannerView from '../component/bannerView';
import * as Color from '../constant/colors';
import homeBanner from '../assests/homebanner.png';
import water from '../assests/water.png';
import pickup from '../assests/pickup.png';
import Feather from 'react-native-vector-icons/Feather';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Login, userOtp } from "../allApi/getAllApi";
import { getUserId } from "../allApi/localStorage";
import { useIsFocused } from "@react-navigation/native";


const windowWidth = Dimensions.get('window').width;

export default function Splash(props) {
    const refRBSheet = useRef();
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState(false);
    const [code, setCode] = useState('');
    const [idVal, setIdVal] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        getId();
    }, [isFocused])

    const getId = async () => {
        const id = await getUserId();
        setIdVal(id)
    }

    const categoryList = [
        {
            image: pickup,
            name: 'Pickup Details'
        },
        {
            image: water,
            name: 'Water Day Details'
        }
    ]

    const otpLogin = async () => {
        const login = await Login(mobile);
        if (login.user === 'new_user') {
            props.navigation.navigate('Home', { phone: mobile })

        } else {
            props.navigation.navigate('Otp', { phone: mobile, id: login.data.id, name: 'Login' })
        }
    }

    const onCodeChage = async (cod) => {
        let login = await Login(mobile);
        const user = await userOtp(login.data.id, cod);
        alert(user.message);
    }

    const pickUp = (name) => {
        if (idVal) {
            props.navigation.navigate('PickUpDetail')

        } else {
            alert('please Login ')
        }
    }

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar
                backgroundColor={Color.white}
            />
            <View style={[styles.flex8, { flex: idVal ? 1 : mobile.length > 0 ? 0.7 : 0.8 }]}>
                <Header props={props} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <BannerView />
                    <View style={{ marginHorizontal: 15 }}>
                        <Text style={styles.links}>Links</Text>
                        <FlatList
                            data={categoryList}
                            horizontal
                            contentContainerStyle={{ width: windowWidth - 30, justifyContent: 'space-between' }}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => <TouchableOpacity onPress={() => {
                                pickUp('pickup');


                            }} style={[styles.vendorView, { backgroundColor: index === 0 ? '#EFD1A4' : '#EFA4A4' }]}>
                                <View style={styles.flex}>
                                    <Image source={item.image} style={{ marginTop: 15 }} />
                                    <View style={styles.arrowView}>
                                        <Feather name="arrow-up-right" size={25} color={Color.black} style={{ alignSelf: 'center' }} />
                                    </View>
                                </View>
                                <Text style={[styles.pickup, { marginLeft: 0, marginVertical: 10 }]}>{item.name}</Text>
                            </TouchableOpacity>}
                            keyExtractor={item => item.id}

                        />
                    </View>
                    <View style={{ marginHorizontal: 10, marginBottom: 40 }}>
                        <Image source={homeBanner} style={{ width: windowWidth - 15, marginTop: 10 }} />
                    </View>
                </ScrollView>
            </View>

            {!idVal ?
                <View style={[styles.flexBottom, { flex: mobile.length > 0 ? 0.32 : 0.18 }]}>
                    <View style={styles.bottomView}>
                        <Text style={styles.login}>{otp ? 'Verify OTP' : 'Login / Register'}</Text>
                    </View>
                    <View style={{ margin: 15 }}>
                        <Text style={styles.links}>{otp ? `OTP sent to mobile number : ${mobile}` : 'Enter mobile number'}</Text>
                        {otp ?
                            <View>
                                <OTPInputView
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    style={styles.otpContainer}
                                    pinCount={4}
                                    code={code}
                                    onCodeChanged={code => {
                                        setOtp(code)
                                    }}
                                />
                                <Text style={{ textAlign: 'center', marginTop: 7 }}>Resend OTP in 26 sec</Text>
                            </View>
                            :
                            <View style={[styles.flexContainer, { borderWidth: 1, borderColor: '#BBBBBB', marginTop: 10 }]}>
                                <Feather name="phone-call" size={25} color={Color.black} style={{ marginLeft: 6 }} />
                                <TextInput
                                    style={[styles.input]}
                                    onChangeText={(text) => setMobile(text)}
                                    value={mobile}
                                    maxLength={10}
                                    placeholder="Phone Number"
                                />
                            </View>}
                        {mobile.length && !otp ?
                            <TouchableOpacity
                                activeOpacity={0.3}
                                onPress={() => {
                                    otpLogin();
                                }} style={styles.otpView}>
                                <Text style={styles.otp}>{'Get Otp'}</Text>
                            </TouchableOpacity> : null}

                        {mobile.length && otp ?
                            <TouchableOpacity
                                activeOpacity={0.3}
                                onPress={() => {
                                    onCodeChage();
                                }} style={styles.otpView}>
                                <Text style={styles.otp}>{'Continue'}</Text>
                            </TouchableOpacity> : null}
                    </View>
                </View> : null}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: { flex: 1, backgroundColor: Color.white },
    links: { color: Color.black, fontWeight: '400', fontSize: 16 },
    flexContainer: { flexDirection: 'row', alignItems: 'center' },
    flex: { flexDirection: 'row', justifyContent: 'space-between', },
    input: { marginLeft: 7 },
    flex8: {
        flex: 0.7,
    },
    flexBottom: { justifyContent: 'center' },
    vendorView: { height: 120, width: windowWidth / 2 - 30, padding: 18, borderRadius: 10, marginTop: 7, },
    arrowView: { height: 40, width: 40, backgroundColor: Color.white, borderRadius: 7, justifyContent: 'center' },
    login: { textAlign: 'center', marginTop: 10, color: Color.white, fontWeight: '400', fontSize: 16 },
    bottomView: { backgroundColor: '#FF9600', borderTopRightRadius: 20, borderTopLeftRadius: 20, height: 40 },
    otpView: { backgroundColor: '#67C306', width: '30%', marginTop: 16, borderRadius: 10 },
    otp: { color: Color.white, padding: 13, textAlign: 'center', fontSize: 16 },
    otpContainer: {
        width: '60%',
        height: 60,
        alignSelf: "center",
    },
    underlineStyleBase: {
        width: 52,
        height: 52,
        borderRadius: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderWidth: 0,
        color: "black",
        fontSize: 25,
        borderColor: '#CDCDCD'
    },
})