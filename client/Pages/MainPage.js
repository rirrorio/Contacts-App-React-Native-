import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import ButtonComponent from "../components/Button";

import favoritesLogo from "../assets/icons8-star-100.png";
import recentsLogo from "../assets/icons8-clock-90.png";
import contactsLogo from "../assets/icons8-contacts-100.png";
import keypadLogo from "../assets/icons8-keypad-90.png";
import voicemailLogo from "../assets/icons8-voicemail-100.png";
import addContactLogo from "../assets/icons8-plus-100.png";

const baseUrl = `https://contact.herokuapp.com/contact`;
export default function MainPage({ navigation }) {
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

  const renderAllContacts = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailPage", { id: item.id })}
      >
        <View style={styles.card}>
          <Text style={{ color: "white", fontSize: 18 }}>
            {item.firstName} {item.lastName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.contactsContainer}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <>
            <ScrollView>
              <TouchableOpacity
                style={styles.addContactButton}
                onPress={() => navigation.navigate("AddContact")}
              >
                <Image
                  source={addContactLogo}
                  style={{ height: 30, width: 30 }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                  marginBottom: 15,
                  fontSize: 40,
                }}
              >
                iBone
              </Text>

              <TextInput
                placeholder="Search"
                placeholderTextColor={"light grey"}
                style={styles.searchBar}
              ></TextInput>

              <TouchableOpacity style={styles.userProfile}>
                <Image
                  source={contactsLogo}
                  style={{ width: 70, height: 70 }}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text style={{ color: "white", fontSize: 25 }}>
                    Name Here
                  </Text>
                  <Text style={{ color: "white", fontSize: 15 }}>My Card</Text>
                </View>
              </TouchableOpacity>

              <FlatList
                data={contacts.sort((a, b) =>
                  a.firstName.localeCompare(b.firstName)
                )}
                renderItem={renderAllContacts}
                keyExtractor={(el) => el.id}
                key="2"
              />
            </ScrollView>
          </>
        )}
      </View>
      <View style={styles.iconContainer}>
        <ButtonComponent imageSource={favoritesLogo} caption="Favorites" />
        <ButtonComponent imageSource={recentsLogo} caption="Recents" />
        <ButtonComponent imageSource={contactsLogo} caption="Contacts" />
        <ButtonComponent imageSource={keypadLogo} caption="Keypad" />
        <ButtonComponent imageSource={voicemailLogo} caption="Voicemail" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  userProfile: {
    flexDirection: "row",
    paddingLeft: 5,
    marginTop: 10,
    marginBottom: 15,
  },
  contactsContainer: {
    color: "white",
    marginBottom: 50,
  },
  card: {
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  iconContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#161616",
    opacity: 0.8,
  },
  searchBar: {
    backgroundColor: "grey",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    opacity: 0.5,
  },
  addContactButton: {
    marginLeft: "92%",
    width: 30,
  },
});
