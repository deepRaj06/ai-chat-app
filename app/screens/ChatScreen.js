import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import GlobalApi from "./GlobalApi"; // 👈 import here

export default function ChatScreen() {

    const param = useRoute().params;
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedChatFace, setSelectedChatFace] = useState([])
    useEffect(() => {
        console.log(param?.selectedFace);
        setMessages([
            {
                _id: 1,
                text: 'Namastey 🙏 ' +param?.selectedFace.name+', How can I help you today!',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: param.selectedFace?.image,
                },
            },
        ])
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
        setLoading(true);
        if (messages[0].text) {
            // setLoading(false);
            getBardResp(messages[0].text)
        }
    }, []);

    const getBardResp = (msg) => {
        GlobalApi.getBardApi(msg).then(resp => {
            console.log("bot_resp", resp?.data?.answer);
            if (resp?.data?.answer) {
                const chatAPIResp = {
                    _id: Math.random() * (9999999 - 1),
                    text: 'Namastey 🙏 ' + resp?.data?.answer,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: param.selectedFace?.image,
                        // avatar: CHAT_BOT_FACE,
                    },
                }
                setMessages(previousMessages =>
                    GiftedChat.append(previousMessages, chatAPIResp),
                )
                setLoading(false);
            }
            else{
                setLoading(false);
                 const chatAPIResp = {
                    _id: Math.random() * (9999999 - 1),
                    text: 'Namastey 🙏 ' + 'Sorry, I cannot help with it',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: param.selectedFace?.image,
                        // avatar: CHAT_BOT_FACE,
                    },
                }
                 setMessages(previousMessages =>
                    GiftedChat.append(previousMessages, chatAPIResp),
                )
            }

        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <GiftedChat
                isTyping={loading}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})