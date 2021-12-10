import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, FlatList } from 'react-native';

export default function Details({ route }) {

  const namePokemon = useState(route.params.item)

  const [pokemon, setPokemon] = useState([])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/ability/4`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setPokemon(data.effect_entries)
      })
  }, [])


  return (
    <View style={styles.container}>

      <Text style={styles.label}>{namePokemon}</Text>

      <Image
        style={styles.img}
        source={require('../../assets/pokebola.png')}
      />

      <Text style={styles.ability}> Habilidades: </Text>
      <FlatList
        data={pokemon}
        keyExtractor={(pokemon) => pokemon.effect}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.effect}>Efeito: {item.effect}</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  label: {
    marginTop: 60,
    fontSize: 30,
    color: "#F92E6A"
  },

  img: {
    width: 150,
    height: 150,
    marginTop: 30,
  },

  ability: {
    fontSize: 30,
    textAlign: 'center'

  },

  effect: {
    marginTop: 15,
    fontSize: 15,
    textAlign: 'left'
  }
})
