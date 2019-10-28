import React from 'react';
import {
  AppRegistry,
} from 'react-360';
import config from '../../config';



export default class ServiceUser extends React.Component {

  constructor(props) {
    super(props);
  }

  async getUnico(token) {
    return new Promise((resolve, reject) => {
      let url = `${config.api.host}/user/unico/${token}`;

      fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(async (response) => {
        let body = await response.json();

        if (response.status == 200) {
          resolve(body);
        } else {
          reject(response);
        }

      }).catch((erro) => {
        console.log(erro)
        reject(erro)
      })

    });
  }


};
AppRegistry.registerComponent('ServiceUser', () => ServiceUser);
