import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChatFaceData from '../services/ChatFaceData';
import { useNavigation } from '@react-navigation/native';

type ChatFaceItem = {
  id: number;
  name: string;
  image: string;
  primary: string;
  secondary: string;
};

export default function HomeScreen() {

  const navigation = useNavigation();
  const [chatFaceData, setChatFaceData] = useState<ChatFaceItem[]>([]);
  const [selectedChatFaceData, setSelectedChatFaceData] =
    useState<ChatFaceItem | null>(null);

  const onChatFacePress = (id: number) => {
    setSelectedChatFaceData(ChatFaceData[id-1])
  };

  useEffect(() => {
    setChatFaceData(ChatFaceData);
    setSelectedChatFaceData(ChatFaceData[0]);
  }, []);
  return (
    <View style={{alignItems: 'center', paddingTop: 90}}>
      {selectedChatFaceData && (
        <>
          <Text style={{color: selectedChatFaceData.primary, fontSize: 30}}>
            Hello
          </Text>
          <Text
            style={{
              color: selectedChatFaceData.primary,
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            I am {selectedChatFaceData.name}
          </Text>
          <Image
            source={{uri: selectedChatFaceData?.image}}
            style={{width: 150, height: 150, marginTop: 20}}
          />

          <Text style={{marginTop: 30, fontSize: 25}}>
            How can I help you ?
          </Text>
        </>
      )}
      <View
        style={{
          marginTop: 20,
          backgroundColor: '#F5F5F5',
          alignItems: 'center',
        }}>
        <FlatList
          data={chatFaceData}
          horizontal={true}
          style={{flexGrow: 0}}
          renderItem={({item}) =>
            selectedChatFaceData?.id != item.id && (
              <Pressable
                style={{margin: 15}}
                onPress={() => onChatFacePress(item.id)}>
                <Image
                  source={{uri: item.image}}
                  style={{width: 40, height: 40}}
                />
              </Pressable>
            )
          }
        />
        <Text style={{marginTop: 5, fontSize: 17, color: '#B0B0B0'}}>
          Choose Your Fav ChatBuddy
        </Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('chat', {selectedFace: selectedChatFaceData})} style={[{backgroundColor: selectedChatFaceData?.primary, padding: 17, width: Dimensions.get('screen').width*0.6, borderRadius: 100, alignItems: 'center', marginTop: 30}]}>
        <Text style={{ fontSize:16, color: '#fff'}}>Let's Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
