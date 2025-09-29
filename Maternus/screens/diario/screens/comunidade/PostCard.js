import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { usePosts } from './PostsContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PostCard({ post, onEdit }) {
  const { toggleLike, deletePost, currentUser } = usePosts();
  const isOwner = post.user === currentUser; // só o dono pode excluir


  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={32} color="#FF69B4" />
        <Text style={styles.user}>{String(post.user ?? 'Anônimo')}</Text>
      </View>

      <Text style={styles.text}>{String(post.text ?? '')}</Text>

      {post.image ? (
        <Image source={{ uri: String(post.image) }} style={styles.image} />
      ) : null}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => toggleLike(post.id)}>
          <Ionicons 
            name={post.liked ? 'heart' : 'heart-outline'} 
            size={22} 
            color={post.liked ? '#FF69B4' : 'gray'} 
          />
          <Text style={styles.actionText}>Curtir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={() => onEdit(post)}>
          <Ionicons name="create-outline" size={22} color="blue" />
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>

        {isOwner && (
          <TouchableOpacity style={styles.actionBtn} onPress={() => deletePost(post.id)}>
            <Ionicons name="trash-outline" size={22} color="tomato" />
            <Text style={styles.actionText}>Excluir</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  user: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 6,
    color: '#333'
  },
  text: {
    marginBottom: 10,
    fontSize: 15,
    color: '#444'
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 10
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14
  }
});
