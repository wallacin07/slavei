import {
  Image,
  StyleSheet,
  Platform,
  Text,
  View,
  FlatList,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

interface Character {
  id: number;
  name: string;
  image: string;
  gender: string;
}

export default function HomeScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<string>("1");

  const fetchCharacter = async (pageNumber: string) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${pageNumber}`
      );
      setCharacters(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar personagem", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter(page);
  }, []);

  const renderCharacter = ({ item }: { item: Character }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.gender}>{item.gender}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} color={"#40C618FF"} />
      </View>
    );
  }

  return <View style={{flex: 1}}>
    <View style={styles.InputContainer}>
      <Text></Text>
      <TextInput
      style={styles.input}
      value={page}
      onChangeText={(text) => setPage(text)}
      keyboardType="numeric"
      placeholder="Digite o numero da pagina"
      />
      <Button title="buscar" onPress={() => fetchCharacter(page)}/>
    </View>
    <FlatList data={characters} keyExtractor={(item) => item.id.toString()} renderItem={renderCharacter} contentContainerStyle={styles.list}/>
  </View>;
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2, //android
    shadowColor: "#000000", //sombra para IOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },

  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  gender: {
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    color: "#C6C6C6",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list:{
    padding:15
  },
  InputContainer:{
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F0F0F0"
  },
  input: {
    flex:1,
    height:40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight:8
  }
});
