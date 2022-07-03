const { writeFile } = require('fs');
const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
  production: true,
  appInsightsConnectionString: '${process.env['AI_CONNECTION_STRING']}',
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
