import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import axios from "axios";

import ButtonComponent from "../components/Button";

import messageLogo from "../assets/icons8-message-100.png";
import callLogo from "../assets/icons8-message-100.png";
import videoCallLogo from "../assets/icons8-video-call-100.png";
import mailLogo from "../assets/icons8-mail-100.png";
import deleteLogo from "../assets/icons8-delete-100.png";
import editLogo from "../assets/icons8-edit-104.png";
const baseUrl = `https://contact.herokuapp.com/contact`;

export default function DetailPage({ route, navigation }) {
  const { id } = route.params;
  const [isloading, setloading] = useState(true);
  const [contactDetail, setContactDetail] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + `/${id}`)
      .then((result) => setContactDetail(result.data.data))
      .catch((error) => console.log(error))
      .finally(setloading(false));
  }, []);

  const handleDelete= ()=>{
    // console.log(id)
    axios.delete(baseUrl+`/${id}`)
    .then(navigation.navigate("MainPage"))
    .catch(err=>console.log(err))
  }

  return (
    <>
      <View style={styles.container}>
        {isloading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <>
            <Image
              source={{ uri: contactDetail.photo }}
              style={styles.image}
              alt="Photo Here"
            />
            <Text style={styles.nameFont}>
              {contactDetail.firstName} {contactDetail.lastName}
            </Text>

            <View style={styles.buttonContainer}>
              <ButtonComponent
                style={styles.button}
                imageSource={messageLogo}
                caption={"message"}
              />
              <ButtonComponent imageSource={callLogo} caption={"call"} />
              <ButtonComponent imageSource={videoCallLogo} caption={"video"} />
              <ButtonComponent imageSource={mailLogo} caption={"mail"} />
            </View>

            <View style={styles.credentialContainer}>
              <Text style={styles.DetailText}>
                Age : {contactDetail.age} {"\n"}
                Phone Number : Unknown {"\n"}
                Location : Unknown (not the honne song btw)
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <ButtonComponent
                style={styles.button}
                imageSource={editLogo}
                caption={"edit"}
              />
              <ButtonComponent imageSource={deleteLogo} caption={"delete"} onPress={handleDelete} />
            </View>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    marginTop: 50,
    height: 200,
    width: 200,
    borderWidth: 1,
    borderRadius: 100,
  },
  nameFont: {
    color: "white",
    textAlign: "left",
    fontSize: 22,
  },
  credentialContainer: {
    alignSelf: "flex-start",
  },
  DetailText: {
    color: "white",
    fontSize: 16,
    marginTop: 50,
    marginLeft: 20,
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
