import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as JWT from 'jsonwebtoken';
import App from '../app';
import { allMatches, inProgressMatches } from '../mocks/section03.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota Teams', () => {
  afterEach(sinon.restore);

  it('requesição feita com sucesso e retorna status 200', async () => {
    const httpResponse = await chai.request(App).get('/');
    expect(httpResponse.status).to.equal(200);
  });
  it('Rota GET /matches retorna todas as partidas', async () => {
    const httpResponse = await chai.request(App).get('/matches');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.equal(allMatches);
  });
  it('Rota GET /matches?inProgress=true retorna as partidas em andamento', async () => {
    const httpResponse = await chai.request(App).get('/matches?inProgress=true');
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse).to.equal(inProgressMatches);
  });
});