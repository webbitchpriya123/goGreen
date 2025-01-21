import React, { useState } from "react";
import { SafeAreaView, Image, Text, FlatList, ScrollView, TouchableOpacity, View, Dimensions, StatusBar, StyleSheet } from "react-native";
import Header from "../component/header";
import BannerView from '../component/bannerView';
import * as Color from '../constant/colors';
import pickUp from '../assests/pickup.png';
import vendor from '../assests/vendor.png';
import water from '../assests/water.png';
import Feather from 'react-native-vector-icons/Feather';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { userOtp, signUpOtp } from "../allApi/getAllApi";
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get('window').width;

export default function Otp(props) {
    const { params } = props.route;

    const [mobile, setMobile] = useState('');
    const [code, setCode] = useState('')
    const categoryList = [
        {
            image: vendor,
            name: 'Vendor Register'
        },
        {
            image: water,
            name: 'Water Day Details'
        }
    ]

    const onCodeChange = async () => {        
        if (params.name === 'Login') {
            const user = await userOtp(params.id, code);
            if (user.status === "true") {
                AsyncStorage.setItem("user_id", JSON.stringify(user.data.id));
                AsyncStorage.setItem("token", JSON.stringify(user.token.token))
                alert(user.message);
                setTimeout(() => {
                    props.navigation.navigate('Splash')
                }, 1200);
            } else {
                alert(user.message);
                setCode('')
            }
        } else {
            const user = await signUpOtp(params.id, code);
            if (user.status === true) {
                AsyncStorage.setItem("user_id", JSON.stringify(user.data.id));
                AsyncStorage.setItem("token", JSON.stringify(user.token.token))
                alert(user.message);
                setTimeout(() => {
                    props.navigation.navigate('Splash')
                }, 1200);
            } else {
                alert(user.message);
                setCode('')
            }
        }
    }
    return (
        <SafeAreaView style={styles.background}>
            <StatusBar
                backgroundColor={Color.white}
            />
            <View style={styles.flex8}>
                <Header />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <BannerView />
                    <View style={{ marginHorizontal: 15 }}>
                        <Text style={styles.links}>Links</Text>
                        <View style={[styles.flex, styles.flexContainer, styles.pickupView]}>
                            <View style={styles.flexContainer}>
                                <Image source={pickUp} />
                                <Text style={styles.pickup}>Pickup Details</Text>
                            </View>
                            <View style={styles.arrowView}>
                                <Feather name="arrow-up-right" size={25} color={Color.black} style={{ alignSelf: 'center' }} />
                            </View>
                        </View>
                        <FlatList
                            data={categoryList}
                            style={{ marginBottom: 40 }}
                            horizontal
                            contentContainerStyle={{ width: windowWidth - 30, justifyContent: 'space-between' }}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => <View style={[styles.vendorView, { backgroundColor: index === 0 ? '#EFD1A4' : '#EFA4A4' }]}>
                                <View style={styles.flex}>
                                    <Image source={item.image} style={{ marginTop: 15 }} />
                                    <View style={styles.arrowView}>
                                        <Feather name="arrow-up-right" size={25} color={Color.black} style={{ alignSelf: 'center' }} />
                                    </View>
                                </View>
                                <Text style={[styles.pickup, { marginLeft: 0, marginVertical: 10 }]}>{item.name}</Text>
                            </View>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </ScrollView>
            </View>
            <View style={styles.flexBottom}>
                <View style={styles.bottomView}>
                    <Text style={styles.login}>Verify OTP</Text>
                </View>
                <View style={{ margin: 15 }}>
                    <Text style={styles.links}>OTP sent to mobile number : {params.phone}</Text>
                    <OTPInputView
                        codeInputFieldStyle={styles.underlineStyleBase}
                        style={styles.otpContainer}
                        pinCount={4}
                        code={code}
                        onCodeChanged={code => {
                            // onCodeChage(code)
                            setCode(code)

                        }
                        }
                    />
                    <TouchableOpacity onPress={() => onCodeChange()} style={{ backgroundColor: '#67C306', width: '30%', marginTop: 16, borderRadius: 10, alignSelf: 'center' }}>
                        <Text style={{ color: Color.white, padding: 13, textAlign: 'center', fontSize: 16 }}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: { flex: 1, backgroundColor: Color.white },
    links: { color: Color.black, fontWeight: '400', fontSize: 16 },
    pickup: { color: Color.pickup, marginLeft: 25, fontWeight: '500', fontSize: 14 },
    flexContainer: { flexDirection: 'row', alignItems: 'center' },
    flex: { flexDirection: 'row', justifyContent: 'space-between', },
    input: { marginLeft: 7 },
    flex8: { flex: 0.7 },
    flexBottom: { flex: 0.3, justifyContent: 'center' },
    vendorView: { height: 120, width: windowWidth / 2 - 30, padding: 18, borderRadius: 10, marginTop: 7, },
    arrowView: { height: 40, width: 40, backgroundColor: Color.white, borderRadius: 7, justifyContent: 'center' },
    pickupView: { backgroundColor: '#EDCEF7', height: 70, borderRadius: 10, padding: 15, marginVertical: 15 },
    login: { textAlign: 'center', marginTop: 15, color: Color.white, fontWeight: '400', fontSize: 16 },
    bottomView: { backgroundColor: '#FF9600', borderTopRightRadius: 20, borderTopLeftRadius: 20, height: 50 },
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