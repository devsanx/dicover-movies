import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  Share,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as Constants from "../constants";
import * as Components from "../components";
import * as Services from "../services";

const { height, width } = Dimensions.get("window");

const setHeight = (h: number) => (height / 100) * h;
const setWidth = (w: number) => (width / 100) * w;

export const MovieScreen = ({ route, navigation }: any) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<any>({});
  const [isCastSelected, setIsCastSelected] = useState(true);

  useEffect(() => {
    Services.getMovieById(
      movieId,
      `${Constants.URLS.APPEND_TO_RESPONSE.VIDEOS},${Constants.URLS.APPEND_TO_RESPONSE.CREDITS},${Constants.URLS.APPEND_TO_RESPONSE.RECOMMENDATIONS},${Constants.URLS.APPEND_TO_RESPONSE.SIMILAR}`
    ).then((response: any) => setMovie(response?.data));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0.5)", "rgba(217, 217, 217, 0)"]}
        start={[0, 0.3]}
        style={styles.linearGradient}
      />
      <View style={styles.moviePosterImageContainer}>
        <Image
          style={styles.moviePosterImage}
          resizeMode="cover"
          source={{ uri: Services.getPoster(movie?.backdrop_path) }}
        />
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather
            name="chevron-left"
            size={35}
            color={Constants.Colors.WHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            Share.share({ message: `${movie?.title}\n\n${movie?.homepage}` })
          }
        >
          <Text style={styles.headerText}>Share</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.playButton}
        onPress={() =>
          Linking.openURL(Services.getVideo(movie.videos.results[0].key))
        }
      >
        <Ionicons
          name="play-circle-outline"
          size={70}
          color={Constants.Colors.WHITE}
        />
      </TouchableOpacity>
      <Components.Separator height={setHeight(37)} />
      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie?.original_title}
        </Text>
        <View style={styles.row}>
          <Ionicons name="heart" size={22} color={Constants.Colors.HEART} />
          <Text style={styles.ratingText}>{movie?.vote_average}</Text>
        </View>
      </View>
      <Text style={styles.genreText}>
        {movie?.genres?.map((genre: any) => genre?.name)?.join(", ")} |{" "}
        {movie?.runtime} Min
      </Text>
      <Text style={styles.genreText}>
        {Services.getLanguage(movie?.original_language)?.english_name}
      </Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overviewText}>{movie?.overview}</Text>
      </View>
      <View>
        <Text style={styles.castTitle}>Cast</Text>
        <View style={styles.castSubMenuContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(true)}
          >
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected
                  ? Constants.Colors.BLACK
                  : Constants.Colors.LIGHT_GRAY,
              }}
            >
              Cast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(false)}
          >
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected
                  ? Constants.Colors.LIGHT_GRAY
                  : Constants.Colors.BLACK,
              }}
            >
              Crew
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ marginVertical: 5 }}
          data={isCastSelected ? movie?.credits?.cast : movie?.credits?.crew}
          keyExtractor={(item) => item?.credit_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <Components.Separator width={20} />}
          ItemSeparatorComponent={() => <Components.Separator width={20} />}
          ListFooterComponent={() => <Components.Separator width={20} />}
          renderItem={({ item }) => (
            <Components.Cast
              originalName={item?.name}
              characterName={isCastSelected ? item?.character : item?.job}
              image={item?.profile_path}
            />
          )}
        />
      </View>
      <Text style={styles.extraListTitle}>Recommended Movies</Text>
      <FlatList
        data={movie?.recommendations?.results}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <Components.Separator width={20} />}
        ItemSeparatorComponent={() => <Components.Separator width={20} />}
        ListFooterComponent={() => <Components.Separator width={20} />}
        renderItem={({ item }) => (
          <Components.Movie
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.navigate("movie", { movieId: item.id })}
          />
        )}
      />
      <Text style={styles.extraListTitle}>Similar Movies</Text>
      <FlatList
        data={movie?.similar?.results}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <Components.Separator width={20} />}
        ItemSeparatorComponent={() => <Components.Separator width={20} />}
        ListFooterComponent={() => <Components.Separator width={20} />}
        renderItem={({ item }) => (
          <Components.Movie
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.navigate("movie", { movieId: item.id })}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.BASIC_BACKGROUND,
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: "center",
    position: "absolute",
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidth(145),
    height: setHeight(35),
  },
  linearGradient: {
    width: setWidth(100),
    height: setHeight(6),
    position: "absolute",
    top: 0,
    elevation: 9,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: Constants.Colors.WHITE,
    fontFamily: Constants.Fonts.BOLD,
  },
  playButton: {
    position: "absolute",
    top: 110,
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
  movieTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  movieTitle: {
    color: Constants.Colors.BLACK,
    fontFamily: Constants.Fonts.EXTRA_BOLD,
    fontSize: 18,
    width: setWidth(60),
  },
  ratingText: {
    marginLeft: 5,
    color: Constants.Colors.BLACK,
    fontFamily: Constants.Fonts.EXTRA_BOLD,
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  genreText: {
    color: Constants.Colors.LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingTop: 5,
    fontFamily: Constants.Fonts.BOLD,
    fontSize: 13,
  },
  overviewContainer: {
    backgroundColor: Constants.Colors.EXTRA_LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overviewTitle: {
    color: Constants.Colors.BLACK,
    fontFamily: Constants.Fonts.BOLD,
    fontSize: 18,
  },
  overviewText: {
    color: Constants.Colors.LIGHT_GRAY,
    paddingVertical: 5,
    fontFamily: Constants.Fonts.BOLD,
    fontSize: 13,
    textAlign: "justify",
  },
  castTitle: {
    marginLeft: 20,
    color: Constants.Colors.BLACK,
    fontFamily: Constants.Fonts.BOLD,
    fontSize: 18,
  },
  castSubMenuContainer: {
    marginLeft: 20,
    flexDirection: "row",
    marginVertical: 5,
  },
  castSubMenuText: {
    marginRight: 10,
    color: Constants.Colors.BLACK,
    fontFamily: Constants.Fonts.BOLD,
    fontSize: 13,
  },
  extraListTitle: {
    marginLeft: 20,
    color: Constants.Colors.BLACK,
    fontFamily: Constants.Fonts.BOLD,
    fontSize: 18,
    marginVertical: 8,
  },
});
