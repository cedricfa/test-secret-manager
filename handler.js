const AWS = require("aws-sdk")
const secretsManager = new AWS.SecretsManager()

module.exports.getSecret = async (event) => {
  const secretName = "myServerlessAppSecret"

  try {
    const secret = await secretsManager
      .getSecretValue({ SecretId: secretName })
      .promise()
    const secretValue = JSON.parse(secret.SecretString)

    return {
      statusCode: 200,
      body: secretValue,
    }
  } catch (error) {
    console.error(`Error retrieving secret: ${error}`)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error retrieving secret" }),
    }
  }
}
