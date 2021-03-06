import React from 'react';
import {
  View
} from 'react-360';
import FunctionLanguage from './function/language';
import ScreenCarregando from './screen/carregando';

export default class PanelEsquerda extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      carregado: false,
      telaAnterior: null
    }
  }

  async componentDidMount() {
    await FunctionLanguage.prototype.trocarIdioma("en-us");
    global.PanelEsquerdaTelaAtual = "VAZIO";
    await this.setState({ carregado: true });

    
    // Codigo a baixo é responsavel por atualizar a tela e modificar a tela atual
    setInterval(async () => {
      if (global.PanelEsquerdaTelaAtual == "ATUALIZAR") {
        global.PanelEsquerdaTelaAtual = this.state.telaAnterior;
        await this.setState({ carregado: false, telaAnterior: global.PanelEsquerdaTelaAtual });
        setTimeout(async () => { await this.setState({ carregado: true }); }, 500)
      } else
      if (global.PanelEsquerdaTelaAtual !== this.state.telaAnterior) {
        this.setState({ telaAnterior: global.PanelEsquerdaTelaAtual });
      }
    }, 0);

  }

  render() {
    if (this.state.carregado == true) {
      switch (global.PanelEsquerdaTelaAtual) {
        case "ScreenRank":
          return (<View></View>);
        default:
          return (<View></View>);
      }

    } else {
      return (<ScreenCarregando></ScreenCarregando>);
    }
  }

};