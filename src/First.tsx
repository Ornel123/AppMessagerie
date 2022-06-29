import { Box, Button, Center, FormControl, Heading, Input, VStack } from "native-base";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Actions } from "react-native-router-flux";



const First = ()=>{
    return(
    <View>
        
        
        <Button  onPress={()=> Actions.Login()}>Login</Button>
            <TouchableOpacity onPress={()=> console.log('testtttt')} ><Text></Text></TouchableOpacity>

            
            <Button  onPress={()=> Actions.Accueil()}>Sign-up</Button>
            <TouchableOpacity onPress={()=> console.log('testtttt')} ><Text></Text></TouchableOpacity>

    </View>
       
    )
}

export default First;