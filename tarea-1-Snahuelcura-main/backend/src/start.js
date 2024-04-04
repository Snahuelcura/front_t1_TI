const util = require('util')
const exec = util.promisify(require('child_process').exec)

async function deploy () {
  const { stdout: output1 } = await exec('yarn install')
  console.log('installing dependencies...')
  console.log(output1)

 

  const { stdout: output3 } = await exec('yarn db:migrate:undo:all')
  console.log('undoing migrations...')
  console.log(output3)
  
  const { stdout: output4 } = await exec('yarn db:migrate')
  console.log('migrating database...')
  console.log(output4)


}
deploy()
