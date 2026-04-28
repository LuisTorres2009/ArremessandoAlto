import AsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage = o "localStorage" do React Native
// Salva dados no armazenamento interno do celular, mesmo depois de fechar o app

// ─── TOKEN JWT ────────────────────────────────────────────────────────────────

export async function salvarToken(token) {
  await AsyncStorage.setItem('token', token);
}

export async function pegarToken() {
  return await AsyncStorage.getItem('token');
}

export async function removerToken() {
  await AsyncStorage.removeItem('token');
}

// ─── DADOS DO JOGADOR (id, nome, email) ──────────────────────────────────────

export async function salvarJogador(jogador) {
  // Precisa converter pra texto porque o AsyncStorage só guarda strings
  await AsyncStorage.setItem('jogador', JSON.stringify(jogador));
}

export async function pegarJogador() {
  const dados = await AsyncStorage.getItem('jogador');
  // Converte de volta pra objeto, ou retorna null se não tiver nada
  return dados ? JSON.parse(dados) : null;
}

export async function removerJogador() {
  await AsyncStorage.removeItem('jogador');
}

// ─── LOGOUT (limpa tudo) ──────────────────────────────────────────────────────

export async function limparSessao() {
  await AsyncStorage.multiRemove(['token', 'jogador']);
}