import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = `https://contact.herokuapp.com/contact`;
export default function DetailPage({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        setContacts(response.data.data);
      })
      // .then(console.log(contacts))
      .catch((error) => {
        console.log(error);
      })
      .finally(setLoading(false));
  }, []);

  const renderAllContacts = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.card}>
          <Text style={{ color: "white" }}>
            {item.firstName} {item.lastName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <FlatList
            data={contacts}
            renderItem={renderAllContacts}
            keyExtractor={(el) => el.id}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "black",
    color: "white",
  },
  card: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    marginBottom: 5,
    marginTop: 5,
  },
});
