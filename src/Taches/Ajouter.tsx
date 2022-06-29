import { Text, View, TouchableOpacity } from "react-native";
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
import React, {useState}  from "react";
import ImagePicker from 'react-native-image-crop-picker';


const Ajouter = ()=>{
    const [image, setImage] = useState(require('../Assets/icon.jpg'));
    const [nom, setNom] = useState('');
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
    return(
    <View>
        <Text>Ajouter</Text>
    </View>
    )
}

export default Ajouter;