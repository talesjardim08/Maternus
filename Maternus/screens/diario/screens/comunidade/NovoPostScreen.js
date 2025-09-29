import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { usePosts } from './PostsContext';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NovoPostScreen() {
  const { addPost, editPost, currentUser } = usePosts();
  const navigation = useNavigation();
  const route = useRoute();

  const editData = route.params?.editPost;

  const [text, setText] = useState(String(editData?.text ?? ''));
  const [image, setImage] = useState(editData?.image ?? null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permita acesso à galeria para escolher imagens.');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!text && !image) return; // evita criar post vazio

    if (editData) {
      editPost(editData.id, { text, image });
    } else {
      addPost({
        id: uuid.v4(),
        user: currentUser,
        text,
        image,
        liked: false,
        createdAt: new Date().toISOString()
      });
    }
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{String(editData ? 'Editar Post' : 'Novo Post')}</Text>
      </View>

      {/* Texto do post */}
      <TextInput
        placeholder="Escreva algo..."
        value={text}
        onChangeText={setText}
        style={styles.input}
        multiline
      />

      {/* Botão para escolher imagem */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Ionicons name="image-outline" size={24} color="#FF69B4" />
        <Text style={{ color: '#FF69B4', marginLeft: 5 }}>Escolher imagem</Text>
      </TouchableOpacity>

      {/* Preview da imagem */}
      {image && <Image source={{ uri: String(image) }} style={styles.image} />}

      {/* Botão de salvar */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>{String(editData ? 'Salvar alterações' : 'Compartilhar')}</Text>
      </TouchableOpacity>

    </ScrollView>
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
  input: {
    margin: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top'
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10
  },
  image: {
    width: '90%',
    height: 220,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 16
  },
  saveBtn: {
    backgroundColor: '#FF69B4',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    alignItems: 'center',
    marginTop: 10
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
