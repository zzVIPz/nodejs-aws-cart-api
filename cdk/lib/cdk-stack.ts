import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cartServiceLambda = new lambda.Function(this, 'CartServiceHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'build.handler',
      code: lambda.Code.fromAsset('../dist'),
      timeout: cdk.Duration.seconds(900),
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
