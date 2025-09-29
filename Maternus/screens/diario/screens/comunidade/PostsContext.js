import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const PostsContext = createContext();
const STORAGE_KEY = '@app_posts_v1';

// Usuário atual do app
const currentUser = "Você";

// Posts iniciais (com strings seguras e imagens para visualização)
const initialPosts = [
  {
    id: String(uuid.v4()),
    user: "Maria",
    text: "Primeiro post da comunidade! 🎉",
    liked: false,
    image: "https://placekitten.com/300/200",
    createdAt: new Date().toISOString()
  },
  {
    id: String(uuid.v4()),
    user: "João",
    text: "Adorei esse app 😍",
    liked: true,
    image: "https://placekitten.com/400/250",
    createdAt: new Date().toISOString()
  },
  {
    id: String(uuid.v4()),
    user: currentUser,
    text: "Meu post inicial 👋",
    liked: false,
    image: null,
    createdAt: new Date().toISOString()
  }
];

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Sanitização: garante strings e null seguros
          const sanitized = parsed.map(p => ({
            id: String(p.id),
            user: String(p.user ?? 'Anônimo'),
            text: String(p.text ?? ''),
            liked: !!p.liked,
            image: p.image ?? null,
            createdAt: String(p.createdAt ?? new Date().toISOString())
          }));
          setPosts(sanitized);
        } else {
          setPosts(initialPosts);
        }
      } catch (e) {
        console.warn('Erro ao carregar posts:', e);
        setPosts(initialPosts);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      } catch (e) {
        console.warn('Erro ao salvar posts:', e);
      }
    };
    save();
  }, [posts]);

  const addPost = (post) => {
    const prepared = {
      id: String(post.id || String(uuid.v4())),
      user: String(post.user ?? currentUser),
      text: String(post.text ?? ''),
      liked: !!post.liked,
      image: post.image ?? null,
      createdAt: String(post.createdAt ?? new Date().toISOString())
    };
    setPosts(prev => [prepared, ...prev]);
  };

  const editPost = (id, updatedContent) => {
    setPosts(prev => prev.map(p => {
      if (String(p.id) === String(id)) {
        return {
          ...p,
          text: String(updatedContent.text ?? p.text),
          image: updatedContent.image ?? p.image,
          liked: updatedContent.liked ?? p.liked
        };
      }
      return p;
    }));
  };

  const deletePost = (id) => {
    setPosts(prev => prev.filter(p => String(p.id) !== String(id)));
  };

  const toggleLike = (id) => {
    setPosts(prev => prev.map(p => (String(p.id) === String(id) ? { ...p, liked: !p.liked } : p)));
  };

  return (
    <PostsContext.Provider
      value={{
        posts: posts.map(p => ({
          ...p,
          text: p.text ?? '',
          user: p.user ?? 'Anônimo',
          image: p.image ?? null
        })),
        addPost,
        editPost,
        deletePost,
        toggleLike,
        currentUser
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
