import { StyleSheet } from 'react-native';

const estilosGlobais = StyleSheet.create({
  tela: {
    flex: 1,
    paddingTop: 50,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 30,
    marginTop: 10,
  },
  titulo: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  icone: {
    width: 50,
    height: 50,
  }});

export default estilosGlobais;