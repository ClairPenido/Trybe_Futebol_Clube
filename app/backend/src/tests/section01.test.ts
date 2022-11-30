import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as JWT from 'jsonwebtoken';
import App from '../app';
import { enterLogin, token, loginWithoutEmail, incorrectLogin } from '../mocks/section01.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota Login', () => {
  afterEach(sinon.restore);

  it('requesição feita com sucesso e retorna status 200', async () => {
    const httpResponse = await chai.request(App).get('/');
    expect(httpResponse.status).to.equal(200);
  });
  it('rota /login com o cadastro certo', async () => {
    const httpResponse = await chai.request(App).post('/login')
    .send(enterLogin);
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal({token: token});
  });
  it('imprime um erro quando email está ausente', async () => {
    const httpResponse = await chai.request(App).post('/login')
    .send(loginWithoutEmail);
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({
      'status': 400,
      'message': 'All fields must be filled'
    });
  });
  it('imprime um erro quando email está errado', async () => {
    const httpResponse = await chai.request(App).post('/login')
    .send(incorrectLogin);
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.deep.equal({
        'status': 401,
        'message': 'Incorrect email or password'
    });
  });
});