import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { supabase } from './supabase';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const tratarLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Email ou senha incorretos. Por favor, tente novamente.');
    } else {
      setError('');
      alert('Login realizado com sucesso!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Bem-vindo ao meu teste de autenticação com Supabase!</Text>
      <Text style={styles.subheader}>Faça seu login</Text>

      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        label="Senha"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button mode="contained" onPress={tratarLogin} style={styles.button}>
        Entrar
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('Cadastro')}
        style={styles.textButton}
      >
        Cadastro
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#063970',
  },
  button: {
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: '#1e90ff',
  },
  textButton: {
    marginVertical: 5,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
  },
});
