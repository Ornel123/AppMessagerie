import React, {useState} from 'react';
import {
  Actionsheet,
  Box,
  Button,
  Center,
  Fab,
  FormControl,
  Heading,
  Image,
  Input,
  useDisclose,
  VStack,
} from 'native-base';
import {Text, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const schema = yup.object().shape({
  nom: yup.string().required(),
  description: yup.string().min(8).required(),
});
const Modifier = ({ taches }) => {
  console.log(taches);
  const [tache, setData] = useState(taches);
  const [image, setImage] = useState(require('../Assets/icon.jpg'));

  const { setValue, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (data) => {
    console.log({ data });
    setData([{
    id: `${taches?.length}` + data.nom,
      fullName: data.nom,
      description: data.description,
      timeStamp: '12:47 PM',
      // statut: 'En cours!',
      avatarUrl: image,
    }, ...tache]);
    console.log('JSON.stringify(tache)');
    console.log(tache);
    
    setTaches([{
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fullName: data.nom,
      description: data.description,
      timeStamp: '12:47 PM',
      statut: 'En cours!',
      avatarUrl: image,
    }, ...tache]);
    // reset();
  };
//   useEffect(() => {
//     setValue()
//   }, []);
  const setTaches = async(data) => {
    AsyncStorage.setItem('taches', JSON.stringify(data));
    Actions.pop();
  }
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeExif: true,
      mediaType: 'photo',
    }).then(image => {
      setImage({uri: image.path});
      console.log(image);
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage({uri: image.path});
    });
  };
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <View style={{ padding: 5}}>
      <TouchableOpacity onPress={onOpen}>
        <Image
          source={image}
          style={{
            height: 90,
            width: 90,
            borderRadius: 20,
            marginTop: 20,
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>

      <FormControl.Label>Nom de la tache</FormControl.Label>
      <Input type="text" onChangeText={(val)=> setValue('nom', val)}/>
      <Text style={{ color: 'red' }}>{errors.nom?.message}</Text>
      <FormControl.Label>Description de la tache</FormControl.Label>
      <Input type="text" style={{marginTop: 40, alignSelf: 'center'}} onChangeText={(val)=> setValue('description', val)} />

      <Text style={{ color: 'red' }}>{errors.description?.message}</Text>
      <Button onPress={handleSubmit(onSubmitHandler)} style={{marginTop: 60}}>
        Ajouter
      </Button>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => {
              openCamera();
            }}>
            Camera
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              openGallery();
            }}>
            Fichiers
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      {/* <TouchableOpacity onPress={()=> console.log('testtttt')} style={{width:"30"}} ><Text>test</Text></TouchableOpacity> */}
    </View>
  );
};

export default Modifier;
