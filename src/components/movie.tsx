import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
  ImageBackground,
} from "react-native";
import * as Constants from "../constants";
import { Ionicons } from "@expo/vector-icons";
import * as Services from "../services";

interface MovieProps {
  title: string;
  poster: string;
  language: string;
  voteAverage: string;
  voteCount: number;
  size: number;
  heartLess: boolean;
  onPress: any;
}

export const Movie = ({
  title,
  poster,
  language,
  voteAverage,
  voteCount,
  size,
  heartLess,
  onPress,
}: MovieProps) => {
  const [liked, setLiked] = React.useState(false);
  const [voteCountValue, setVoteCountValue] = React.useState(voteCount);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ImageBackground
        style={{ ...styles.container, width: 230 * size, height: 340 * size }}
        imageStyle={{ borderRadius: 12 }}
        source={{ uri: Services.getPoster(poster) }}
      >
        <View style={{ ...styles.imdbContainer, paddingVertical: 3 * size }}>
          <Image
            source={Constants.Images.IMDB}
            resizeMode="cover"
            style={{ ...styles.imdbImage, height: 20 * size, width: 50 * size }}
          />
          <Text
            style={{
              ...styles.imdbRating,
              marginRight: 5 * size,
              fontSize: 14 * size,
            }}
          >
            {voteAverage}
          </Text>
        </View>
        {!heartLess ? (
          <TouchableNativeFeedback
            onPress={() => {
              setLiked(!liked);
              setVoteCountValue(
                liked ? voteCountValue - 1 : voteCountValue + 1
              );
            }}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={25 * size}
              color={liked ? Constants.Colors.HEART : Constants.Colors.WHITE}
              style={{ position: "absolute", bottom: 10, left: 10 }}
            />
          </TouchableNativeFeedback>
        ) : null}
      </ImageBackground>
      <View>
        <Text
          style={{ ...styles.movieTitle, width: 230 * size }}
          numberOfLines={3}
        >
          {title}
        </Text>
        <View style={styles.movieSubTitleContainer}>
          <Text style={styles.movieSubTitle}>
            {Services.getLanguage(language)?.english_name}
          </Text>
          <View style={styles.rowAndCenter}>
            <Ionicons
              name="heart"
              size={17 * size}
              color={Constants.Colors.HEART}
              style={{ marginRight: 5 }}
            />
            <Text style={styles.movieSubTitle}>{voteCountValue}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 340,
    width: 230,
    borderRadius: 12,
    elevation: 5,
    marginVertical: 2,
  },
  movieTitle: {
    fontFamily: Constants.Fonts.EXTRA_BOLD,
    color: Constants.Colors.GRAY,
    paddingVertical: 2,
    marginTop: 5,
    width: 230,
  },
  movieSubTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  movieSubTitle: {
    fontSize: 12,
    fontFamily: Constants.Fonts.REGULAR,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  imdbContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: Constants.Colors.YELLOW,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 12,
    paddingVertical: 3,
  },
  imdbImage: {
    height: 20,
    width: 50,
    borderBottomLeftRadius: 5,
  },
  imdbRating: {
    marginRight: 5,
    color: Constants.Colors.HEART,
    fontFamily: Constants.Fonts.EXTRA_BOLD,
  },
});

Movie.defaultProps = {
  size: 1,
  heartLess: true,
};
