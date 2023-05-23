import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";

const baseUrl = `https://contact.herokuapp.com/contact`;
export default function DetailPage({ route }) {
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

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: contactDetail.photo }}
        style={styles.image}
        alt="Photo Here"
      />
      <Text style={styles.nameFont}>
        {contactDetail.firstName} {contactDetail.lastName}
      </Text>

      <View style={styles.credentialContainer}>
        <Text style={styles.DetailText}>
          Age : {contactDetail.age} {'\n'}
          Phone Number : Unknown {'\n'}
          Location : Unknown (not the honne song btw)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection:'column',
    backgroundColor: "black",
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
  credentialContainer:{
    flex:3,
    alignSelf: 'flex-start'
  },
  DetailText:{
    color:'white',
    fontSize:16,
    marginTop:50,
    marginLeft:20
  }

});
