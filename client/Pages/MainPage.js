import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import MainPageButton from "../components/MainPageButton";

import favoritesLogo from "../assets/icons8-star-100.png";
import recentsLogo from "../assets/icons8-clock-90.png";
import contactsLogo from "../assets/icons8-contacts-100.png";
import keypadLogo from "../assets/icons8-keypad-90.png";
import voicemailLogo from "../assets/icons8-voicemail-100.png";
import addContactLogo from "../assets/icons8-plus-100.png";

// import contactsLogo from '../assets/'
// import contactsLogo from '../assets/'

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
      <View>
        <TouchableOpacity style={styles.addContactButton}>
          <Image source={addContactLogo} style={{ height: 30, width: 30}} />
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
          <Image source={contactsLogo} style={{ width: 70, height: 70, }} />
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: "white", fontSize: 25 }}>Name Here</Text>
            <Text style={{ color: "white", fontSize: 15 }}>My Card</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.contactsContainer}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <>
            <FlatList
              data={contacts.sort((a, b) =>
                a.firstName.localeCompare(b.firstName)
              )}
              renderItem={renderAllContacts}
              keyExtractor={(el) => el.id}
            />
          </>
        )}
      </View>
      <View style={styles.iconContainer}>
        <MainPageButton imageSource={favoritesLogo} caption="Favorites" />
        <MainPageButton imageSource={recentsLogo} caption="Recents" />
        <MainPageButton imageSource={contactsLogo} caption="Contacts" />
        <MainPageButton imageSource={keypadLogo} caption="Keypad" />
        <MainPageButton imageSource={voicemailLogo} caption="Voicemail" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  userProfile: {
    flexDirection: "row",
    paddingLeft: 5,
    marginTop:10,
    marginBottom:15
  },
  contactsContainer: {
    color: "white",
  },
  card: {
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  iconContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor:'#161616',
    opacity:0.8
  },
  searchBar: {
    backgroundColor: "grey",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    opacity: 0.5,
  },
  addContactButton: {
    // backgroundColor:'green',
    marginLeft:"92%",
    width :30,
  },
});
