const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const client    = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Endpoint POST /login
module.exports.login = async (event) => {
  const body = JSON.parse(event.body || '{}');
  const { username, password } = body;

  if (username === 'admin' && password === '1234!') {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Login correcto', token: 'fake-jwt-token' }),
    };
  }
  return {
    statusCode: 401,
    body: JSON.stringify({ message: 'Credenciales incorrectas' }),
  };
};

// Endpoint GET /users
module.exports.users = async (event) => {
  const params = { TableName: process.env.USERS_TABLE };
  const data   = await docClient.send(new ScanCommand(params));
  return {
    statusCode: 200,
    body: JSON.stringify({ users: data.Items }),
  };
};
