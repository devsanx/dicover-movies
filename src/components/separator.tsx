import React from "react";
import { View } from "react-native";

interface SeparatorProps {
  width: number;
  height: number;
}

export const Separator = ({ width, height }: SeparatorProps) => {
  return <View style={{ width, height }} />;
};

Separator.defaultProps = {
  width: 0,
  height: 0,
};
