import React from 'react';
import {
  AppRegistry,
  Image,
  View,
  staticAssetURL
} from 'react-360';
import estilo from '../style/estiloGlobal';
import LayoutQuadro from './quadro';
import LayoutTexto from './texto';
import ServiceLogin from '../service/login';
import ServiceUser from '../service/user';
import ScreenCarregando from '../screen/carregando';

export default class LayoutBarraPontos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      carregado: false,
      getUser: {}
    }
  }

  async componentDidMount() {
    global.LayoutBarraPontosJson = { pontosFeitos: '0', cssNovosPontos: { display: 'none' } };
    await this.atualizarPontos();
    await this.setState({ carregado: true });

    // Codigo a baixo é responsavel por atualizar a tela e modificar a tela atual
    setInterval(async () => {
      if (global.LayoutBarraPontos == "ATUALIZAR") {
        global.LayoutBarraPontos = "ATUALIZADO";
        await this.setState({ carregado: false });
        await this.atualizarPontos();
        await this.setState({ carregado: true });
      }
    }, 0);
  }

  async atualizarPontos() {
    if (global.UserLogado) {
      await this.setState({ carregado: false });
      let token = await ServiceLogin.prototype.getToken();
      let response = await ServiceUser.prototype.getUnico(token);
      let getUser = response.data;
      await this.setState({ getUser, carregado: true });
    }
  }

  async ganharPontos(quantidade) {
    console.log("global.BarraPontosReqOne",global.BarraPontosReqOne);
    console.log("global.LayoutBarraPontosJson",global.LayoutBarraPontosJson);
    if ((global.BarraPontosReqOne) && (global.UserLogado)) {
      global.BarraPontosReqOne = false;
      let token = await ServiceLogin.prototype.getToken();
      let response = await ServiceUser.prototype.putPonto(token, 'somar', quantidade);
      let body = response.data;
      let pontosFeitos = '+' + quantidade;
      global.LayoutBarraPontosJson = { pontosFeitos, cssNovosPontos: { color: '#7bf17b', display: 'flex' } };
      setTimeout(async () => {
        global.BarraPontosReqOne = true;
        global.LayoutBarraPontos = "ATUALIZAR";
      }, 500);
    }
  }

  async perderPontos(quantidade) {
    console.log("global.BarraPontosReqOne",global.BarraPontosReqOne);
    console.log("global.LayoutBarraPontosJson",global.LayoutBarraPontosJson);
    if ((global.BarraPontosReqOne) && (global.UserLogado)) {
      global.BarraPontosReqOne = false;
      let token = await ServiceLogin.prototype.getToken();
      let response = await ServiceUser.prototype.putPonto(token, 'subtrair', quantidade);
      let body = response.data;
      let pontosFeitos = '-' + quantidade;
      global.LayoutBarraPontosJson = { pontosFeitos, cssNovosPontos: { color: '#f15d59', display: 'flex' } };
      setTimeout(async () => {
        global.BarraPontosReqOne = true;
        global.LayoutBarraPontos = "ATUALIZAR";
      }, 500);
    }
  }

  render() {
    if (this.state.carregado) {
      if (!global.UserLogado) {
        return (<View></View>);
      } else {
        return (
          <LayoutQuadro style={estilo.prototype.global().quadroBarraPontos}>
            <View style={estilo.prototype.global().pontos}>
              <Image
                source={{ uri: staticAssetURL('icons/estrela.png') }}
                style={[estilo.prototype.global().tabelaItensIcons, { width: 60, height: 60 }]} />
              <LayoutTexto style={estilo.prototype.global().tabelaItens}>{this.state.getUser.pontos}</LayoutTexto>
              <LayoutTexto style={[estilo.prototype.global().tabelaItens, global.LayoutBarraPontosJson.cssNovosPontos]}>{global.LayoutBarraPontosJson.pontosFeitos}</LayoutTexto>
            </View>
          </LayoutQuadro>
        );
      }
    } else {
      return (<ScreenCarregando />)
    }
  }

};

AppRegistry.registerComponent('LayoutBarraPontos', () => LayoutBarraPontos);
