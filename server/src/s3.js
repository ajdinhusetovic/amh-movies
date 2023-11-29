const dotenv = require('dotenv');
const { S3 } = require('aws-sdk');

dotenv.config({ path: './config.env' });

exports.s3Upload = async (file) => {
  const s3 = new S3();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
  };

  const result = await s3.upload(params).promise();
  return result;
};
