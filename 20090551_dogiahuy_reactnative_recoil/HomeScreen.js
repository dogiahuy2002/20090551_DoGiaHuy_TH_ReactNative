import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, Pressable, TextInput } from 'react-native';


export default HomeScreen = ({navigation}) => {
  const [text, setText]= useState('');
  const handleChange = (event) => {
    setText(event.target.value);
  };

return(
    <View style={{flex:1}}>
          <View style={{flex:4, alignItems: 'center'}}>
              <Image 
                  source ={require("./Image95.png")}
                  style={{width:200, height: 200}}
              / >
                

          </View>
          <View style={{flex:2, marginTop:20,}}>
                <Text style={{textAlign:'center', color: "#8353E2", fontWeight:700, fontSize:24, width:390, height:72}}>
                 MANAGE YOUR TASK
                </Text>
          </View>
          <View style={{marginLeft: 20,justifyContent:'center', alignItems:'center', flexDirection:'row',width:334, height:43, borderWidth: 1, borderRadius: 15, borderColor:"#9095A0", alignContent:'center'}}>
          <Image 
                  source ={require("./Frame.png")}
                  style={{marginLeft:5, width:20, height: 20}}
               />
              <TextInput style={{marginLeft:5,width:334, height:43,  alignContent:'center', flexDirection:'row',  color: "#BCC1CA"
              
              }} placeholder= "Enter your name" value= {text} onChange={handleChange}>
                    
          </TextInput>
          </View>
          <View style={{flex:2, alignItems:"center", marginTop: 40}}>
              <Pressable 
                onPress={()=> navigation.navigate('Details', {tit : text})}
                style={{
                  width: 190,height: 44,
                  padding: 9,
                  borderRadius:12,
                  backgroundColor:"#00BDD6", 
                  color:"#FFFFFF", 
                  fontSize:16,
                  alignItems:'center'
                }}
              >
                GET STARTED ->
              </Pressable>
          </View>
    </View>

);
};