import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

const ImageSelector = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await MediaLibrary.requestPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "사용 허가",
        "이미지를 등록하기 위해서 사용 권한이 필요합니다.",
        [{ text: "확인" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(image);

    const img = {
      uri: image.uri,
      type: image.type,
      name: image.uri.split("/").pop(),
    };

    setPickedImage(img);
    props.onImagePicked(img);
  };

  return (
    <View style={styles.imagePickerContainer}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>사진을 선택해주세요.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage.uri }} />
        )}
      </View>
      <Button title="이미지 선택" onPress={takeImageHandler} />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  imagePickerContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  imagePreview: {
    width: "100%",
    height: 250,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
