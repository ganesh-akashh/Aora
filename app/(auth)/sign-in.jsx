import { View, Text, ScrollView, Image,Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import FormField from '../../components/FormField'
import { useState } from 'react'
import CustomButton from "../../components/CustomButton"
import { Link, router } from "expo-router"
import { signIn } from '../../lib/appwrite'
const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const submit = async () => {
    if (!form.email.length || !form.password.length) {
      Alert.alert('Error', 'Please fill in all the fields')
    }
    else {
      setIsLoading(true);
      try {
        const result = await signIn(form.email, form.password)
        router.replace('/home');
      } catch (error) {
        Alert.alert('Error', error.message)
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
      >
        <View className="w-full justify-center min-h-[85vh] px-6 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white mt-10 font-psemibold">Log in to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isLoading}
          />
          <View className="justify-center pt-5 gap-2 flex-row">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account ?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn