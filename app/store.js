import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { useNavigation } from '@react-navigation/native'

const LoginStore = create((set) => ({
    isLoggedIn: 'LOGGED_OUT', default: 'LOGGED_OUT', enum: ['LOGGED_IN', 'LOGGED_OUT', 'NOT_VERIFIED', 'VERIFIED', 'NOT_REGISTERED'],
    isLoading: false,
    isObsecure: false,
    userToken: null,
    setUserToken: (newState) => set(() => ({userToken: newState})),
    setLoggedIn: (newState) => set((state) => ({ isLoggedIn: newState })),
    toggleObsecure: (newState) => set((state) => ({ isObsecure: newState })),
    toggleLoader: () => set((state) => ({ isLoading: !state.isLoading })),


}))

const SignupStore = create((set) => ({
    isLoading: false,
    isObsecure: false,
    toggleObsecure: (newState) => set((state) => ({ isObsecure: newState })),
    toggleLoader: (newState) => set((state) => ({ isObsecure: newState })),

}))

const RestaurantRegistrationStore = create((set) => ({
    isLoading: false,
    location: null,
    address: '',
    posstalCode: '',
    region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    },
    pin: {
        latitude: 37.78825,
        longitude: -122.4324,
    },
    setPin: (pin) => set((state) => ({ pin: pin })),
    setRegion: (region) => set((state) => ({ region: region })),
    setLocation: (location) => set((state) => ({ location: location })),
    setPostalCode: (postalCode) => set((state) => ({ postalCode: postalCode })),
    setAddress: (address) => set((state) => ({ address: address })),
    toggleLoader: () => set((state) => ({ isLoading: !state.isLoading })),
}))

const VerificationStore = create((set) => ({
    code: '',
    error: null,
    isLoading: false,
    email: '',
    setEmail: (newState) => set(() => ({ email: newState})),
    setError: (newState) => set(() => ({ error: newState})),
    setCode: (newState) => set((state) => ({ CODE: newState})),
    toggleLoader: () => set((state) => ({ isLoading: !state.isLoading })),
}))

const Restaurant = create((set) => ({
    restaurant: '',
    token: null,
    setToken: (token) => set((state) => ({ token: token })),
    setRestaurant: (newState) => set((state) => ({ restaurant: newState })),
}))

const AddFoodStore = create((set) => ({
    imageOne: null,
    imageTwo: null,
    imageThree: null,
    imageFour: null,
    imageList: [],
    setImageOne: (newState) => set((state) => ({imageOne: newState})),
    setImageTwo: (newState) => set((state) => ({imageTwo: newState})),
    setImageThree: (newState) => set((state) => ({imageThree: newState})),
    setImageFour: (newState) => set((state) => ({imageFour: newState})),
    addToList: (newState) => set((state) => ({ imageList: [...state.imageList, newState] })),
    resetImageStore: () => set(() => ({ 
        imageOne: null,
        imageTwo: null,
        imageThree: null,
        imageFour: null,
        imageList: [],  
    })),
}))

const FoodsDataStore = create((set) => ({
    categories: null,
    foodValue: '',
    foodDescription:'',
    foodPrice: '',
    preparationTime: '',
    foodTags: '',
    additiveTitle: '',
    additivePrice: '',
    additiveList: [],
    setAdditiveList: (newState) => set((state) => ({additiveList: newState})),
    setAdditivePrice: (newState) => set((state) => ({additivePrice: newState})),
    setAdditiveTitle: (newState) => set((state) => ({additiveTitle: newState})),
    setFoodTags: (newState) => set((state) => ({setFoodTags: newState})),
    setFoodValue: (newState) => set((state) => ({foodValue: newState})),
    setCategories: (newState) => set((state) => ({categories: newState})),
    setFoodPrice: (newState) => set((state) => ({foodPrice: newState})),
    setFoodDescription: (newState) => set((state) => ({foodDescription: newState})),
    setPreparationTime: (newState) => set((state) => ({preparationTime: newState})),
    resetState: () => set(() => ({
        categories: null,
        foodValue: '',
        foodDescription: '',
        foodPrice: '',
        preparationTime: '',
        foodTags: '',
        additiveTitle: '',
        additivePrice: '',
        additiveList: [],
      })),
}))
// const [additiveList, setAdditiveList] = useState([]);

const checkStatus = async () => {
    const isLoggedIn = LoginStatusStore((state) => state.isLoggedIn)
    const token = await AsyncStorage.getItem('token')
    const verification = await AsyncStorage.getItem('verification')

    console.log(verification);

    LoginStatusStore.getState().setToken(token)
    LoginStatusStore.getState().setVerification(verification)

    if (token !== null && verification === false) {
        LoginStatusStore.getState().setStatus('NOT_VERIFIED')
        console.log(isLoggedIn);
    } else {
        LoginStatusStore.getState().setStatus(false)
    }
}

const WithdrawalStore  = create((set) => ({
    cardHolder: '',
    bank : '',
    account: '',
    branch: '',
    amount: '',
    setCardHolder:(newState) => set((state) => ({cardHolder: newState})),
    setBank:(newState) => set((state) => ({bank: newState})),
    setAccount:(newState) => set((state) => ({account: newState})),
    setBranch:(newState) => set((state) => ({branch: newState})),
    setAmount:(newState) => set((state) => ({amount: newState})),
}))



export { LoginStore, RestaurantRegistrationStore, SignupStore, VerificationStore,WithdrawalStore, checkStatus, AddFoodStore, FoodsDataStore }