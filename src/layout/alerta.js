import React from 'react';
import {
  AppRegistry,
  View,
  Text,
} from 'react-360';
import estilo from '../style/estiloGlobal';
import LayoutQuadro from './quadro';
import LayoutTexto from './texto';
import LayoutBotao from './botao';

export default class LayoutAlerta extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let botaoDisplayCSS = {};
    if ( (this.props.textoBotao) || (this.props.onClick)) {
      botaoDisplayCSS = {};
    } else {
      botaoDisplayCSS = {display: 'none'};
    }

    return (
      <LayoutQuadro style={[estilo.prototype.global().quadroAlerta, this.props.style]}>
        <View style={estilo.prototype.global().viewAlerta}>
          <LayoutTexto style={[estilo.prototype.global().h2, estilo.prototype.global().tituloAlerta]}>
            {this.props.titulo}
          </LayoutTexto>
        </View>
          {this.props.children}
        

        <View style={[estilo.prototype.global().botaoAlerta, botaoDisplayCSS]}>
          <LayoutBotao onClick={this.props.onClick}>
            {this.props.textoBotao}
          </LayoutBotao>
        </View>
      </LayoutQuadro>
    );
  }

};

AppRegistry.registerComponent('LayoutAlerta', () => LayoutAlerta);
