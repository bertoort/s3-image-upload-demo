# S3 Image Upload Demo

The purpose of this repo is to demo uploading images from the client to [Amazon S3](https://aws.amazon.com/s3/).

### Client

The flow starts in the client with a [file input](https://github.com/berto/s3-image-upload-demo/blob/master/views/index.hbs).

With JavaScript, grab the value of the value of the input and send a [post request](https://github.com/berto/s3-image-upload-demo/blob/master/public/scripts/app.js) to the server.

### AWS

Before configuring the server, make sure to create the S3 Bucket and the correct permission settings.

Set the bucket policy to allow for adding and getting objects:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::bucketname",
                "arn:aws:s3:::bucketname/*"
            ]
        }
    ]
}
```

You can give permission to a specific user under `Principal`. In the example above, anybody has access.

Even if you want everyone to have access, you still need to create a user to generate an access key and secret.
Go to [Amazon IAM Management](https://aws.amazon.com/iam/) and create a user. Then give it full S3 permission access
and a key by going to Security Credentials -> Create Access Key.

### Server

After you get the key and secret, copy the `.env.example` to a `.env` file and add them to your project.

When the [file comes to the server](https://github.com/berto/s3-image-upload-demo/blob/master/routes/index.js
), [multer](https://github.com/expressjs/multer) parses the `multipart/form-data`,
`aws-sdk` sends the image to S3, and the server response with a `200` status. To send the image, the `aws-sdk` is configured with your key and secret and then points to the bucket you created.

The client then displays the images by making a `get` request to the server which resquests from S3 to get the urls.
