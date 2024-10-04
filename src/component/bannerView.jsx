import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import * as Color from '../constant/colors';
import bannerImg from '../assests/banner.png';




const bannerView = ({ props }) => {
    const [active, setActive] = useState(0);
    const isFocused = useIsFocused();
    const [like, setLike] = useState(false);
    const windowWidth = Dimensions.get('window').width;

    const banners = [
        {
            image:bannerImg
        },
        {
            image:bannerImg
        },
        {
            image:bannerImg
        }
    ]
    // useEffect(() => {
    //     loadStoredValue();
    // }, [isFocused]);

    // const loadStoredValue = async () => {
    //     const img = await getBanner();
    //     setBanner(img);
    // };
    const scrolls = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
            setActive(slide)
        }
    }

    // const onClick = async () => {
    //     const data = await addWishList(productDetail);
    //     if (data) {
    //         setLike(true)
    //         setVisible(true)
    //         setMessage(data.message)
    //     }
    // }

    return (
        <View>
            {banners?.length > 0 ?
                <View>
                    <ScrollView
                        pagingEnabled
                        horizontal
                        onScroll={scrolls}
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: 15, marginLeft: 5 }}
                    >
                        {banners.map((item, index) => (
                            <TouchableOpacity
                                onPress={() => { }
                                    // Linking.openURL(item.banner_link)
                                }>
                                <ImageBackground
                                    key={index}
                                    source={item.image }
                                    style={{ width: windowWidth -10, height: 180, borderRadius: 15, objectFit: 'fill' }}
                                >
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                        )}
                    </ScrollView>
                        <View style={styles.pagination}>
                            {banners.map((item, k) => (
                                <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
                                    •
                                </Text>
                            ))}
                        </View>
                </View> : null}
        </View>
    )

}

export default bannerView;

const styles = StyleSheet.create({
    pagination: {
        flexDirection: "row",
        // position: 'absolute',
        // bottom: -12,
        alignSelf: 'center'
    },
    dot: {
        color: '#E8E8E8',
        fontSize: 45,
    },
    activeDot: {
        color: "#FF9600",
        fontSize: 45
    },
    like: { elevation: 8, backgroundColor: Color.white, width: 40, borderRadius: 40, height: 40 }

})