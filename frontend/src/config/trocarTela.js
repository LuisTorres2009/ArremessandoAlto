import { CommonActions } from '@react-navigation/native';

export function trocarTela(navigation, nome, params, direcao = 'direita') {
  navigation.push(nome, { ...params, direcao });

  setTimeout(() => {
    navigation.dispatch((state) => {
      const topo = state.routes[state.index];
      if (topo.name !== nome || state.routes.length <= 1) return CommonActions.reset(state);
      return CommonActions.reset({ ...state, index: 0, routes: [topo] });
    });
  }, 700);
}

// Mesmo efeito, entrando pela esquerda (ex.: sair da conta).
export function reiniciarPara(navigation, nome, params) {
  trocarTela(navigation, nome, params, 'esquerda');
}