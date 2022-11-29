import * as sinon from 'sinon';

import * as chai from 'chai';

// @ts-ignore

import chaiHttp = require('chai-http');

import * as JWT from 'jsonwebtoken';

import { App } from '../app';

import { allTeams, teamById } from '../mocks/section02.test';

import { Response } from 'superagent';




chai.use(chaiHttp);




const { expect } = chai;




describe('Teste da rota Teams', () => {

  afterEach(sinon.restore);




  it('requesição feita com sucesso e retorna status 200', async () => {

    const httpResponse = await chai.request(App).get('/');

    expect(httpResponse.status).to.equal(200);

  });

  it('Rota GET /teams retorna todos os times', async () => {

    const httpResponse = await chai.request(App).get('/teams');

    expect(httpResponse.status).to.equal(200);

    expect(httpResponse.body).to.equal(allTeams);

  });

  it('Rota GET /:id retorna o time do ID fornecido', async () => {

    const httpResponse = await chai.request(App).get('/teams/2');

    expect(httpResponse.status).to.equal(200);

    expect(httpResponse.body).to.deep.equal(teamById);

  });

});