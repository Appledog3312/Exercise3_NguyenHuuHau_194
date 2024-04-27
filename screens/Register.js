import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'

const Register = () => {

    const [email, setEmail] =useState('')
    const [password, setPassWord] =useState('')
    const [passwordComfirm, setPassWordComfirm] =useState('')
    const handleCreateAccount= ()=>{

    }


  return (
    <View style={{flex:1, justifyContent:"center"}}>
      <TextInput 
        label={"Email"}
        value={email}
        onChangeText={setEmail}
      />
    <TextInput 
        label={"PassWord"}
        value={password}
        onChangeText={setPassWord}
        />
    <TextInput 
        label={"PassWordComfirm"}
        value={passwordComfirm}
        onChangeText={setPassWordComfirm}
        />
    <Button mode='contained' >
        Register
    </Button>
    </View>
  )
}

export default Register