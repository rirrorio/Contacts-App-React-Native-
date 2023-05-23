import { Button, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = `https://contact.herokuapp.com/contact`
export default function DetailPage({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  const getAllContacts=()=>{
    axios.get(baseUrl)
    .then(response=>{
      setContacts(response.data.data)
    })
    .then(console.log(contacts.length))
    .catch(error=>{
      console.log(error)
    })
    .finally(setLoading(false))
  }

  return (
    <View>
      <Text>this is mainpage</Text>
      <Button
        title="fetch contacts"
        onPress={() => {getAllContacts()}}
      ></Button>
    </View>
  );
}

//   const styles = StyleSheet.create({});
