import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import * as Constants from "../constants";
import * as Components from "../components";
import * as Services from "../services";

const genersList = ["All", "Action", "Comedy", "Horror", "Romance"];

export const HomeScreen = ({ navigation }: any) => {
  const [activeGenere, setActiveGenere] = React.useState("All");
  const [nowPlayingMovies, setNowPlayingMovies] = React.useState<any>({});
  const [upcomingMovies, setUpcomingMovies] = React.useState<any>({});
  const [genres, setGenres] = React.useState([{ id: 10110, name: "All" }]);

  React.useEffect(() => {
    Services.getNowPlayingMovies().then((movieResponse: any) =>
      setNowPlayingMovies(movieResponse.data)
    );
    Services.getUpcomingMovies().then((movieResponse: any) =>
      setUpcomingMovies(movieResponse.data)
    );
    Services.getAllGenres().then((genreResponse: any) =>
      setGenres([...genres, ...genreResponse.data.genres])
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        style="auto"
        translucent={false}
        backgroundColor={Constants.Colors.BASIC_BACKGROUND}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Showing</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList
          data={genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Components.Separator width={20} />}
          ListHeaderComponent={() => <Components.Separator width={20} />}
          ListFooterComponent={() => <Components.Separator width={20} />}
          renderItem={({ item }) => (
            <Components.Genere
              genreName={item.name}
              active={item.name === activeGenere ? true : false}
              onPress={setActiveGenere}
            />
          )}
        />
      </View>
      <View>
        <FlatList
          data={nowPlayingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Components.Separator width={20} />}
          ListHeaderComponent={() => <Components.Separator width={20} />}
          ListFooterComponent={() => <Components.Separator width={20} />}
          renderItem={({ item }) => (
            <Components.Movie
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={false}
              onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
          )}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View>
        <FlatList
          data={upcomingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Components.Separator width={20} />}
          ListHeaderComponent={() => <Components.Separator width={20} />}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.BASIC_BACKGROUND,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    // fontFamily: FONTS.REGULAR,
  },
  headerSubTitle: {
    fontSize: 13,
    color: Constants.Colors.ACTIVE,
    // fontFamily: FONTS.BOLD,
  },
  genreListContainer: {
    paddingVertical: 10,
  },
});
