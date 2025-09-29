import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePosts } from './PostsContext';
import PostCard from './PostCard';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ComunidadeScreen() {
  const { posts } = usePosts();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      {/* Header da comunidade */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Comunidade</Text>
      </View>

      {/* Lista de posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PostCard post={item} onEdit={(post) => navigation.navigate('NovoPost', { editPost: post })} />
        )}
        contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
      />

      {/* Botão flutuante para novo post */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('NovoPost')}>
        <Ionicons name="add" size={34} color="#fff" />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9'
  },
  header: {
    height: 60,
    backgroundColor: '#FF69B4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4
  },
  backBtn: {
    marginRight: 12
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  fab: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
    backgroundColor: '#FF69B4',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4
  }
});
