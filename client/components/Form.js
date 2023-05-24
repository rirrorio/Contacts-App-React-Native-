import { useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const baseUrl = `https://contact.herokuapp.com/contact`;

export default function Form() {
    const navigation=useNavigation()

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [photo, setPhoto] = useState("");

  const handleSubmit = () => {
    console.log("namadepan"+ firstName,"namaBelakang"+lastName,"umur"+Number(age),"foto"+photo)
    axios.post(baseUrl,
        {
        "firstName":firstName.toString(),
        "lastName":lastName.toString(),
        "age":Number(age),
        "photo":photo.toString()
    }
        )
    .then()
    .catch(err=>console.log(err))
    .finally(navigation.navigate("MainPage"))
  };

  return (
    <>
      <ScrollView>
        <TextInput
          placeholder="First Name"
          placeholderTextColor={"white"}
          style={styles.formInput}
          onChangeText={setFirstname}
          value={firstName}
        ></TextInput>
        <TextInput
          placeholder="Last Name"
          placeholderTextColor={"white"}
          style={styles.formInput}
          onChangeText={setLastName}
          value={lastName}
        ></TextInput>
        <TextInput
          placeholder="Age"
          placeholderTextColor={"white"}
          style={styles.formInput}
          onChangeText={setAge}
          value={age}
          keyboardType="number-pad"
        ></TextInput>
        <TextInput
          placeholder="Photo URL"
          placeholderTextColor={"white"}
          style={styles.formInput}
          onChangeText={setPhoto}
          value={photo}
        ></TextInput>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={{color:'white', fontSize:20, marginLeft:"35%"}}>Add Contact</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  formInput: {
    backgroundColor: "grey",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    marginTop: 50,
    opacity: 0.5,
    height: 50,
  },
  submitButton: {
    backgroundColor: "blue",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    marginTop: 50,
    opacity: 0.5,
    height: 30,
  }
})
