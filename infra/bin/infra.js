#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { gumboRecipeSite } = require('../lib/infra-stack');

const app = new cdk.App();
new gumboRecipeSite(app, 'GumboSite', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
});
