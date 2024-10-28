import AsyncStorage from "@react-native-async-storage/async-storage";

const getItem = async (key) => {
    try {
        const item = await AsyncStorage.getItem(key);
        return item;
    } catch (error) {
        console.error(`Error fetching ${key}:`, error);
    }
};

export const getFcm = () => getItem('fcm');
export const getUserId = () => getItem('user_id');
export const getToken = () => getItem('token');
