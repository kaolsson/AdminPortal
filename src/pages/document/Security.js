import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Card, CardContent, Container, Typography } from '@material-ui/core';
import gtm from '../../lib/gtm';
import SmartMasterLogoBlueLarge from '../../components/SmartMasterLogoBlueLarge';

const Security = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Security</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        <Container
          maxWidth="md"
          sx={{ py: '80px' }}
        >
          <Box
            sx={{
              mb: 8,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <RouterLink to="/">
              <SmartMasterLogoBlueLarge
                sx={{
                  height: 40,
                  width: 40
                }}
              />
            </RouterLink>
          </Box>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 4
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3
                }}
              >
                <div>
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                  >
                    Security
                  </Typography>
                </div>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3
                }}
              >
                <div>
                    <p>
                        With MySmartmaster, we take the responsibility of protecting your personal and business’s sensitive documents. MySmartmaster is designed with a architecture to make sure your information and digital assets are protected.
                    </p>
                    <p>
                        MySmartmaster has a security-first mindset, and we always make sure the security standards are met in all functions, todays, and future. No compromise is made. We can assure your peace of mind.
                    </p>
                    <div className="wpembed-index">
                        <h3>Table of Contents</h3>
                        <ol className="wpembed-index">
                            <li>
                                <a href="#your-data-is-Secure-while-in-Transit">Your Data is Secure While in Transit</a>
                            </li>
                            <li>
                                <a href="#your-data-is-secure-while-at-rest">Your Data is Secure While at Rest</a>
                            </li>
                            <li>
                                <a href="#how-your-data-is-stored">How Your Data is Stored</a>
                            </li>
                            <li>
                                <a href="#your-data-is-securely-backed-up">Your Data is Securely Backed Up</a>
                            </li>
                            <li>
                                <a href="#compliance-requirements">Compliance Requirements</a>
                            </li>
                            <li>
                                <a href="#your-role-in-protecting-your-assets">Your Role in Protecting Your Assets</a>
                            </li>
                            <li>
                                <a href="#contacting-us">Where Do I Report Security Concerns?</a>
                            </li>
                        </ol>
                    </div>
                    <h2 id="your-data-is-Secure-while-in-Transit">Your Data is Secure While in Transit</h2>
                    <p>All interactions with MySmartmaster occur over an encrypted channel. We employ SSL to protect your documents, passwords, and interactions with MySmartmaster from eavesdropping.</p>
                    <h2 id="your-data-is-secure-while-at-rest">Your Data is Secure While at Rest</h2>
                    <p>MySmartmaster encrypts your documents and all information stored in our databases at rest. The data is encrypted using AES-256.</p>
                    <h2 id="how-your-data-is-stored">How Your Data is Stored</h2>
                    <p>
                        SmartVault is designed to allow access to documents via authenticated logins. In other words, documents stored in SmartVault are only accessible if you log into the service or share the documents with another individual that must log into the service. SmartVault employs an Activity Log that you can use to review:
                    </p>
                    <ul>
                        <li>Who has been granted permissions to access documents?</li>
                        <li>Who has actually accessed documents?</li>
                    </ul>
                    <h2 id="your-data-is-securely-backed-up">Your Data is Securely Backed Up</h2>
                    <p>Your documents and metadata are always stored using highly redundant replicated storage.  Multiple copies of metadata and documents are stored in multiple geographical locations and backed up regularly to ensure data availability.</p>
                    <h2 id="compliance-requirements">Compliance Requirements</h2>
                    <p>Many of our customers face compliance pressure when it comes to managing sensitive customer information and documents. MySmartmaster security practices and Activity Log can support a document workflow that is complies with regulations like HIPAA, FINRA, SEC, and more.</p>
                    <h2 id="your-role-in-protecting-your-assets">Your Role in Protecting Your Assets</h2>
                    <p>Protecting your assets is a team effort between you and SmartVault, and we take this partnership very seriously. As such, we feel it is critical to help you do your part. Security is a tough balance between protection and efficiency. Just as military fortifications are very secure, they are hard to enter and exit. The additional procedures that secure the facility effectively slow down operations within. That being said, we want to provide you guidance on measures that you can take to improve your protection, and still meet your business needs.</p>
                    <h4>Here are some simple steps that every SmartVault user should employ:</h4>
                    <ul>
                        <li>Protect your session by signing out of the service when not in use</li>
                        <li>
                            Use good password practices, such as:
                            <ul>
                                <li>Using a strong password (lowercase, uppercase, numbers, symbols, etc.)</li>
                                <li>Changing your password every 90 days</li>
                                <li>Not using the same password you use at other sites or other computers</li>
                                <li>Not sharing your password with anyone, including SmartVault employees. (SmartVault employees are never allowed to ask you for your password.)</li>
                            </ul>
                        </li>
                        <li>Assess your own, unique data protection needs</li>
                    </ul>
                    <p>Further, we encourage our customers to assess their own, individual data protection needs. For example, if you require additional data protection beyond what the SmartVault service provides, you can use third-party encryption systems to encrypt documents before storing them in SmartVault.</p>
                    <h2 id="contacting-us">Where Do I Report Security Concerns?</h2>
                    <p>Our top priority is making MySmartmaster safe for all our users. While we’re very confident in our security technology, if you suspect a vulnerability, please submit using this online form:</p>
                    <p>
                        <a target="blank" rel="noreferrer noopener external nofollow" href="https://www.mysmartmaster/security/vulnerability-reporting">https://www.mysmartmaster/security/vulnerability-reporting</a>
                        <br />
                        <p>Please report all other security problems or questions to</p>
                        <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;security@mysmartmaster.com" target="blank" rel="nofollow">security@mysmartmaster.com</a>
                    </p>
                    <br />
                    <p>This document was last updated on August 27, 2022</p>
                    <p>(c) Copper Wired Consultancy LLC</p>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Security;
