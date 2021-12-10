import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default Home = ({ navigation }) => {

  const [pokemons, setPokemons] = useState([]);
  const [query, setQuery] = useState('');
  const [masterDataSource, setMasterDataSource] = useState([]);


  const Busca = (text) => {
    if (text) {
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.name
            ? item.name.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
      setPokemons(newData);
      setQuery(text);
    } else {
      setPokemons(masterDataSource);
      setQuery(text);
    }
  };

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setPokemons(data.results)
        setMasterDataSource(data.results)
      })
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ache seu pokemon</Text>

      <View style={styles.boxBuscarPoke}>
        <TextInput
          style={styles.input}
          placeholder="Buscar Pokemon"
          onChangeText={text => Busca(text)}
          value={query}
        />
      </View>

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon) => pokemon.name}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => {
          return (

            <View style={styles.boxPokemon}>
              <Image
                style={styles.img}
                source={require('../../assets/pokebola.png')}
              />

              <Text
                style={styles.description}
                onPress={() =>
                  navigation.navigate('Details', {
                    item: item.url,
                    item: item.name
                  })
                }
              >
                {item.name}
              </Text>
            </View>

          )
        }}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,

  },
  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  boxBuscarPoke: {
    width: '100%',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  input: {
    margin: 4,
    width: '90%',
    alignContent: "flex-start",
    backgroundColor: "#d3eaf0",
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 5,
    color: "#282b2db5",
  },

  btn: {
    marginTop: 5,
    width: '25%',
    height: '80%',
    borderRadius: 50,
    paddingTop: 10,
    backgroundColor: '#d3eaf0',
    alignSelf: 'center',
    marginBottom: 5,
  },
  txtBtn: {
    fontSize: 20,
    textAlign: 'center'
  },

  boxPokemon: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    width: 50,
    height: 50,
    marginTop: 30,
  },

  description: {
    width: "70%",
    height: 70,
    backgroundColor: "#d3eaf0",
    padding: 20,
    borderRadius: 50,
    color: "#282b2db5",
    fontSize: 20,
    textAlign: 'center'

  },

  txt: {
    fontSize: 30
  }
});
