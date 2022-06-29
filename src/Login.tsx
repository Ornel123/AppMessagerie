/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  NativeBaseProvider,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import UserSchema from '../../realm/realm';

const [realm, setRealm] = useState(null);
const [Users, setUsers] = useState<Realm.Object[]>([]);

const [email, setEmail] = useState<string>(' ');
const [password, setPassword] = useState<string>(' ');


const addUser = ()=>
{

    realm?.write(()=>
    {
        const UserTmp=realm.create('User',
        {
        _id:Math.random(),
        email:email,
        password:password
        }
        );
    )}


    setEmail('');
    setPassword('');
}; 
useEffect(() => {
  async () => {
    const realm = await Realm.open({
      path: 'myrealm',
      schema: [UserSchema],
    }).then(realm => {
      const Users = realm.objects('User');

      setUsers([...Users]);
      setRealm(realm);
    });
  };
}, []);

const Login = () => {
  return (
    <View>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}>
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs">
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'indigo.500',
                }}
                alignSelf="flex-end"
                mt="1">
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={() => Actions.Home()}>
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text font-Size="sm">I'm a new user.</Text>
              <Link
                onPress={() => Actions.SignUp()}
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                href="#">
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </View>
  );
};

export default Login;
