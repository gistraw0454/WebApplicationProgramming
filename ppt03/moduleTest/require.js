
module.exports = '날 찾아봐';

require('./var');
console.log('require.cache:',require.cache);
console.log('require.main:',require.main===module);
console.log(require.main.filename);