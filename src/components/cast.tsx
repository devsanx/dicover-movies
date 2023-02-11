import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import * as Constants from "../constants";
import * as Services from "../services";

interface CastProps {
  originalName: string;
  image: string;
  characterName: string;
}

export const Cast = ({ originalName, image, characterName }: CastProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={
          image ? { uri: Services.getPoster(image) } : Constants.Images.NO_IMAGE
        }
        resizeMode={image ? "cover" : "contain"}
        style={styles.image}
      />
      <Text style={styles.originalName} numberOfLines={2}>
        {originalName}
      </Text>
      <Text style={styles.characterName} numberOfLines={2}>
        {characterName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 120,
    width: 80,
    borderRadius: 10,
  },
  originalName: {
    width: 80,
    color: Constants.Colors.BLACK,
    fontFamily: Constants.Fonts.BOLD,
    fontSize: 12,
  },
  characterName: {
    width: 80,
    color: Constants.Colors.LIGHT_GRAY,
    fontFamily: Constants.Fonts.BOLD,
    fontSize: 10,
  },
});
