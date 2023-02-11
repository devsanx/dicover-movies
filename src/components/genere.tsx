import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import * as Constants from "../constants";

const { width } = Dimensions.get("screen");
const setWidth = (w: number) => (width / 100) * w;

interface GenereProps {
  genreName: string;
  active: boolean;
  onPress: (genere: string) => void;
}

export const Genere = ({ genreName, active, onPress }: GenereProps) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: active
          ? Constants.Colors.ACTIVE
          : Constants.Colors.WHITE,
      }}
      activeOpacity={0.5}
      onPress={() => onPress(genreName)}
    >
      <Text
        style={{
          ...styles.genreText,
          color: active ? Constants.Colors.WHITE : Constants.Colors.BLACK,
        }}
      >
        {genreName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Constants.Colors.WHITE,
    paddingVertical: 8,
    elevation: 3,
    marginVertical: 2,
    width: setWidth(25),
  },
  genreText: {
    fontSize: 13,
    color: Constants.Colors.ACTIVE,
    fontFamily: Constants.Fonts.BOLD,
  },
});
