import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from 'dotenv';

dotenv.config();

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cartServiceLambda = new lambda.Function(this, 'CartServiceHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'build.handler',
      code: lambda.Code.fromAsset('../dist'),
      timeout: cdk.Duration.seconds(900),
      environment: {
        DB_HOST: process.env.DB_HOST ?? '',
        DB_PORT: process.env.DB_PORT ?? '',
        DB_NAME: process.env.DB_NAME ?? '',
        DB_USER: process.env.DB_USER ?? '',
        DB_PASS: process.env.DB_PASSWORD ?? '',
      },
    });

    const api = new apigateway.LambdaRestApi(this, 'CartServiceApi', {
      handler: cartServiceLambda,
      proxy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization'],
      },
    });

    new cdk.CfnOutput(this, 'cartUrl', {
      value: api.url,
    });
  }
}
