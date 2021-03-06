import React from 'react';
import {
  AppRegistry,
  View,
} from 'react-360';
import ReactDOM from 'react-dom'
import LayoutBotoesEscolha from '../layout/botoesEscolha';
import FunctionVideo from './video';
import FunctionMusica from './musica';
import LayoutBarraPontos from '../layout/barraPontos';

const video = FunctionVideo.prototype.create();

export default class FunctionTimeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      videoAtual: "indoAteOPatinete",
      videoRodando: "",
      videoFinalizou: false,
    }
  }

  componentDestroy() {
    console.log("Componente destruido");
    var container = ReactDOM.findDOMNode(this).parentNode;
    ReactDOM.unmountComponentAtNode(container);
  }

  playVideoAtual(videoAtual, element) {
    let shelf = this;
    if (this.state.videoAtual !== this.state.videoRodando) {
      this.setState({ videoFinalizou: false, videoRodando: videoAtual });
      FunctionVideo.prototype.play("videos/" + videoAtual + ".mp4", "2D", 0, global.ConfigSomMuted);

      element.addListener('onVideoStatusChanged', (event) => {
        if (event.status == "finished") {
          shelf.setState({ videoFinalizou: true })
        }
      });
    }
  }

  componentDidUpdate() {
    this.playVideoAtual(this.state.videoAtual, video);
  }

  componentDidMount() {
    this.playVideoAtual(this.state.videoAtual, video);
  }

  render() {
    // cada case é um nome de video que retorna algo na tela depois de finalizado
    switch (this.state.videoAtual) {
      case "indoAteOPatinete":
        if (this.state.videoFinalizou === true) {
          return (<LayoutBotoesEscolha
            texto1={global.linguaAtual.FunctionTimeline.indoAteOPatinete.texto1}
            onClick1={() => { this.setState({ videoAtual: "celularRoubado", videoFinalizou: false }) }}
            texto2={global.linguaAtual.FunctionTimeline.indoAteOPatinete.texto2}
            onClick2={() => { this.setState({ videoAtual: "patineteDesbloqueado", videoFinalizou: false }) }} />)
        }



      case "celularRoubado":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.perderPontos('10');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaErrada.mp3');
          global.PanelFrenteTelaAtual = "ScreenFimDoJogo";
          return (<View></View>);
        }



      case "patineteDesbloqueado":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.ganharPontos('30');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaCerta.mp3');
          return (<LayoutBotoesEscolha
            texto1={global.linguaAtual.FunctionTimeline.patineteDesbloqueado.texto1}
            onClick1={() => { this.setState({ videoAtual: "tresRemadasAcertou", videoFinalizou: false }) }}
            texto2={global.linguaAtual.FunctionTimeline.patineteDesbloqueado.texto2}
            onClick2={() => { this.setState({ videoAtual: "umaRemadaErrou", videoFinalizou: false }) }} />)
        }



      case "umaRemadaErrou":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.perderPontos('30');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaErrada.mp3');
          global.PanelFrenteTelaAtual = "ScreenFimDoJogo";
          return (<View></View>);
        }



      case "tresRemadasAcertou":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.ganharPontos('50');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaCerta.mp3');
          return (<LayoutBotoesEscolha
            texto1={global.linguaAtual.FunctionTimeline.tresRemadasAcertou.texto1}
            onClick1={() => { this.setState({ videoAtual: "parouParaPedestrePassarContinuaParaIrEstacionar", videoFinalizou: false }) }}
            texto2={global.linguaAtual.FunctionTimeline.tresRemadasAcertou.texto2}
            onClick2={() => { this.setState({ videoAtual: "atropelouPedestre", videoFinalizou: false }) }} />)
        }



      case "atropelouPedestre":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.perderPontos('500');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaErrada.mp3');
          global.PanelFrenteTelaAtual = "ScreenFimDoJogo";
          return (<View></View>);
        }




      case "parouParaPedestrePassarContinuaParaIrEstacionar":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.ganharPontos('100');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaCerta.mp3');
          return (<LayoutBotoesEscolha
            texto1={global.linguaAtual.FunctionTimeline.parouParaPedestrePassarContinuaParaIrEstacionar.texto1}
            onClick1={() => { this.setState({ videoAtual: "estacionouErrado", videoFinalizou: false }) }}
            texto2={global.linguaAtual.FunctionTimeline.parouParaPedestrePassarContinuaParaIrEstacionar.texto2}
            onClick2={() => { this.setState({ videoAtual: "estacionouCerto", videoFinalizou: false }) }} />)
        }





      case "estacionouErrado":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.perderPontos('666');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaErrada.mp3');
          global.PanelFrenteTelaAtual = "ScreenFimDoJogo";
          return (<View></View>);
        }




      case "estacionouCerto":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.ganharPontos('100');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaCerta.mp3');
          return (<LayoutBotoesEscolha
            texto1={global.linguaAtual.FunctionTimeline.estacionouCerto.texto1}
            onClick1={() => { this.setState({ videoAtual: "pegouPatineteForaDoParque", videoFinalizou: false }) }}
            texto2={global.linguaAtual.FunctionTimeline.estacionouCerto.texto2}
            onClick2={() => { global.PanelFrenteTelaAtual = "ScreenCreditos" }} />)
        }



      case "pegouPatineteForaDoParque":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.ganharPontos('500');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaCerta.mp3');
          return (<LayoutBotoesEscolha
            texto1={global.linguaAtual.FunctionTimeline.pegouPatineteForaDoParque.texto1}
            onClick1={() => { this.setState({ videoAtual: "foiPraCiclovia", videoFinalizou: false }) }}
            texto2={global.linguaAtual.FunctionTimeline.pegouPatineteForaDoParque.texto2}
            onClick2={() => { this.setState({ videoAtual: "foiPraRuaPerdeu", videoFinalizou: false }) }} />)
        }




      case "foiPraRuaPerdeu":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.perderPontos('969');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaErrada.mp3');
          global.PanelFrenteTelaAtual = "ScreenFimDoJogo";
          return (<View></View>);
        }




      case "foiPraCiclovia":
        if (this.state.videoFinalizou === true) {
          let shelf = this;
          setTimeout(()=>{ shelf.setState({ videoAtual: "chegouNoPredio", videoFinalizou: false }); }, 500);
          return (<View></View>)
        }




      case "chegouNoPredio":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.ganharPontos('800');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaCerta.mp3');
          return (<LayoutBotoesEscolha
            texto1={global.linguaAtual.FunctionTimeline.chegouNoPredio.texto1}
            onClick1={() => { this.setState({ videoAtual: "subindoDeElevador", videoFinalizou: false }) }}
            texto2={global.linguaAtual.FunctionTimeline.chegouNoPredio.texto2}
            onClick2={() => { this.setState({ videoAtual: "subindoDeEscada", videoFinalizou: false }) }} />)
        }




      case "subindoDeElevador":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.ganharPontos('30');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaCerta.mp3');
          this.setState({ videoAtual: "recepcaoParabens", videoFinalizou: false });
          return (<View></View>)
        }



      case "subindoDeEscada":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.ganharPontos('300');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaCerta.mp3');
          let shelf = this;
          setTimeout(()=>{ shelf.setState({ videoAtual: "recepcaoParabens", videoFinalizou: false }); }, 500);
          return (<View></View>)
        }



      case "recepcaoParabens":
        if (this.state.videoFinalizou === true) {
          LayoutBarraPontos.prototype.ganharPontos('30000');
          FunctionMusica.prototype.efeitoSonoroRapido('audios/ScreenJogando/respostaCerta.mp3');
          global.PanelFrenteTelaAtual = "ScreenCreditos";
          return (<View></View>)
        }


      default:
        return (<View></View>);
    }
  }

};

AppRegistry.registerComponent('FunctionTimeline', () => FunctionTimeline);
