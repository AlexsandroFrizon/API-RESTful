import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import axios from "axios";
export default function App() {
  const [data, setData] = useState([]);
  const Item = ({ data }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{data}</Text>
    </View>
  );
  async function listUsers() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  // A cada renderização do componente, o hook useEffect
  //executa a função listUsers().
  useEffect(() => {
    listUsers();
  }, []);
  const renderItem = ({ item }) => (
    <Item data={item.username + " : " + item.name} />
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Consulta à API
        JSONPlaceholder</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#77AAFF",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 14,
  },
  header: {
    backgroundColor: "#89BBDD",
    textAlign: "center",
    padding: 20,
  },
  error: {
    color: "#FF0000",
    fontSize: 14,
    textAlign: "center",
  },
});    