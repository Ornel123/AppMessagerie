import AsyncStorage from '@react-native-community/async-storage';
import {
  Avatar,
  Box,
  Fab,
  HStack,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Spacer,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Share, Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { SwipeListView } from 'react-native-swipe-list-view';

const Profile = () => {
  var tab = '';
  const [data, setData] = useState([
    // {
    //   id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    //   fullName: 'Afreen Khan',
    //   timeStamp: '12:47 PM',
    //   recentText: 'Good Day!',
    //   avatarUrl:
    //     'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    // }
  ]);
  useEffect(() => {
    getTaches();
  }, []);

  const getTaches = async() => {
    tab = await AsyncStorage.getItem('taches');
    if (tab !== null) {
      setData(JSON.parse(tab));
    }
    console.log(tab);
  }
  const setTaches = async(data) => {
    AsyncStorage.setItem('taches', JSON.stringify(data));
  }

  function Basic() {
    const [mode, setMode] = useState('Basic');

    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };

    const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = data.filter(item => item.fullName !== rowKey);
      //   const prevIndex = data.findIndex(item => item.key === rowKey);
      // newData.splice(prevIndex, 1);
      setData(newData);
      setTaches(newData);
    };

    const onRowDidOpen = rowKey => {
      console.log('This row opened', rowKey);
    };

    const renderItem = ({item, index}) => (
      <Box>
        <Pressable
          onPress={() => console.log('You touched me')}
          _dark={{
            bg: 'coolGray.800',
          }}
          _light={{
            bg: 'white',
          }}>
          <Box pl="4" pr="5" py="2">
            <HStack alignItems="center" space={3}>
              <Avatar
                size="48px"
                source={item.avatarUrl}
              />
              <VStack>
                <Text style={{fontWeight: 'bold'}}>{item.fullName}</Text>
                <Text>{item.description}</Text>
              </VStack>
              <Spacer />
              {/* <Text>{item.statut}</Text> */}
            </HStack>
          </Box>
        </Pressable>
      </Box>
    );

    const renderHiddenItem = (data1, rowMap) => (
      <HStack flex="1" pl="2">
        <Pressable
          w="45"
          ml="auto"
          bg="gray.200"
          justifyContent="center"
          onPress={() => {
            Share.share({message: data1.item.fullName});
          }}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" margin={0}>
          <Image
            source={require('../Assets/share.png')}
            style={{height: 30, width: 30, borderRadius: 20}}
          />
          </VStack>
        </Pressable>

        <Pressable
          w="45"
          justifyContent="center"
          onPress={() =>  Actions.Modifier({ taches: data.filter(item => item.fullName !== data1.item.fullName),
            currentTaches: data.filter(item => item.fullName == data1.item.fullName) })}
        >
          <VStack alignItems="center" margin={0}>
          <Image
            source={require('../Assets/modifier.png')}
            style={{height: 30, width: 30}}
            resizeMode={'contain'}
          />
          </VStack>
        </Pressable>
        <Pressable
          w="45"
          bg="gray.200"
          justifyContent="center"
          onPress={() => deleteRow(rowMap, data1.item.fullName)}
          _pressed={{
            opacity: 0.5,
          }}>
          <VStack alignItems="center" margin={0}>
          <Image
            source={require('../Assets/supprimer.png')}
            style={{height: 30, width: 30}}
            resizeMode={'contain'}
          />
          </VStack>
        </Pressable>
      </HStack>
    );

    return (
      <Box bg="gray.200" safeArea flex="1">
        <SwipeListView
          data={data}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-130}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
      </Box>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Box
        _dark={{
          bg: 'coolGray.800',
        }}
        _light={{
          bg: 'white',
        }}
        flex="1"
        safeAreaTop
        maxW="400px"
        w="100%">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Basic />
        </ScrollView>
      </Box>
      <Fab
        onPress={() => {
          // console.log("test")
          Actions.Ajout({ taches: data });
        }}
        renderInPortal={false}
        shadow={2}
        size="sm"
        placement="bottom-right"
        icon={
          // <Icon name="plus" size="4"/>}
          <Image
            source={require('../Assets/button.png')}
            style={{height: 30, width: 30, borderRadius: 20}}
          />
        }
      />
      <Fab
        onPress={() => {
          getTaches();
        }}
        renderInPortal={false}
        shadow={2}
        size="sm"
        placement="bottom-left" 
      />
    </View>
  );
};

export default Profile;
