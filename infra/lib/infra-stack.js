const cdk = require('@aws-cdk/core');
const s3 = require('@aws-cdk/aws-s3');
const s3deploy = require('@aws-cdk/aws-s3-deployment');
const route53 = require('@aws-cdk/aws-route53');

class gumboRecipeSite extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const gumboSite = new s3.Bucket(this, 'gumbo-bucket', {
      bucketName: 'gumbo.cmm.sh',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'gumbo.html'
    });

    const deployment = new s3deploy.BucketDeployment(this, 'gumbo-deploy', {
      sources: [s3deploy.Source.asset('../site')],
      destinationBucket: gumboSite
    });

    const hostedZone = route53.HostedZone.fromLookup(this, 'baseZone', {
      domainName: 'cmm.sh'
    })

    const cName = new route53.CnameRecord(this, 'gumbo.baseZone', {
      zone: hostedZone,
      recordName: 'gumbo',
      domainName: gumboSite.bucketWebsiteDomainName
    })
  }
}

module.exports = { gumboRecipeSite }
