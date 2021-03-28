const File = use('App/Models/File')
const Helpers = use('Helpers')
const Env = use('Env')

async function FileHandler(upload) {
  try {
    if (!upload) {
      return
    }

    const fileName = `${Date.now()}.${upload.subtype}`
    await upload.move(Helpers.publicPath('reward-pic'), {
      name: fileName,
    })
    if (!upload.moved()) {
      throw upload.error()
    }
    const file = await File.create({
      file: fileName,
      name: upload.clientName,
      type: upload.type,
      subtype: upload.subtype,
      path: `${Env.get('DEPLOY_URL')}/reward-pic/${fileName}`,
    })
    return file
  } catch (error) {
    console.log(error)
    return false
  }
}
module.exports = FileHandler
