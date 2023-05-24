import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Button(props) {
  return (
    <>
    <TouchableOpacity style={styles.iconContainer}>
        <Image source={props.imageSource} style={{width:30, height:30}}/>
        <Text style={{color:"grey", fontSize:10}}>{props.caption}</Text>
    </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems:"center",
  },
});
