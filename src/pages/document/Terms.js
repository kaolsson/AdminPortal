import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Card, CardContent, Container, Typography } from '@material-ui/core';
import gtm from '../../lib/gtm';
import SmartMasterLogoBlueLarge from '../../components/SmartMasterLogoBlueLarge';

const Terms = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>MySmartMaster | Terms</title>
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
                    Terms and Conditions
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
                        These terms and Conditions (“Agreement”) set forth the general terms and conditions of your use of the
                        {' '}
                        <a target="_blank" rel="noreferrer noopener external nofollow" href="http://secure.mysmatmaster.com">secure.mysmatmaster.com</a>
                        {' '}
                        website (“Website”), “MySmartmaster” mobile application (“Mobile Application”) and any of their related products and services (collectively, “Services”). This Agreement is legally binding between you (“User”, “you” or “your”) and this Website operator and Mobile Application developer (“Operator”, “we”, “us” or “our”). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Services. By accessing and using the Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. You acknowledge that this Agreement is a contract between you and the Operator, even though it is electronic and is not physically signed by you, and it governs your use of the Services.
                    </p>
                    <div className="wpembed-index">
                        <h3>Table of Contents</h3>
                        <ol className="wpembed-index">
                            <li>
                                <a href="#accounts-and-membership">Accounts and membership</a>
                            </li>
                            <li>
                                <a href="#links-to-other-resources">Links to other resources</a>
                            </li>
                            <li>
                                <a href="#limitation-of-liability">Limitation of liability</a>
                            </li>
                            <li>
                                <a href="#indemnification">Indemnification</a>
                            </li>
                            <li>
                                <a href="#dispute-resolution">Dispute resolution</a>
                            </li>
                            <li>
                                <a href="#changes-and-amendments">Changes and amendments</a>
                            </li>
                            <li>
                                <a href="#acceptance-of-these-terms">Acceptance of these terms</a>
                            </li>
                            <li>
                                <a href="#contacting-us">Contacting us</a>
                            </li>
                        </ol>
                    </div>
                    <h2 id="accounts-and-membership">Accounts and membership</h2>
                    <p>If you create an account on the Services, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may, but have no obligation to, monitor and review new accounts before you may sign in and start using the Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.</p>
                    <h2 id="links-to-other-resources">Links to other resources</h2>
                    <p>Although the Services may link to other resources (such as websites, mobile applications, etc.), we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked resource, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their resources. We do not assume any responsibility or liability for the actions, products, services, and content of any other third parties. You should carefully review the legal statements and other conditions of use of any resource which you access through a link on the Services. Your linking to any other off-site resources is at your own risk.</p>
                    <h2 id="limitation-of-liability">Limitation of liability</h2>
                    <p>To the fullest extent permitted by applicable law, in no event will the Operator, its affiliates, directors, officers, employees, agents, suppliers or licensors be liable to any person for any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if the liable party has been advised as to the possibility of such damages or could have foreseen such damages. To the maximum extent permitted by applicable law, the aggregate liability of the Operator and its affiliates, officers, employees, agents, suppliers and licensors relating to the services will be limited to an amount no greater than one dollar or any amounts actually paid in cash by you to the Operator for the prior one month period prior to the first event or occurrence giving rise to such liability. The limitations and exclusions also apply if this remedy does not fully compensate you for any losses or fails of its essential purpose.</p>
                    <h2 id="indemnification">Indemnification</h2>
                    <p>You agree to indemnify and hold the Operator and its affiliates, directors, officers, employees, agents, suppliers and licensors harmless from and against any liabilities, losses, damages or costs, including reasonable attorneys’ fees, incurred in connection with or arising from any third party allegations, claims, actions, disputes, or demands asserted against any of them as a result of or relating to your Content, your use of the Services or any willful misconduct on your part.</p>
                    <h2 id="dispute-resolution">Dispute resolution</h2>
                    <p>The formation, interpretation, and performance of this Agreement and any disputes arising out of it shall be governed by the substantive and procedural laws of California, United States without regard to its rules on conflicts or choice of law and, to the extent applicable, the laws of United States. The exclusive jurisdiction and venue for actions related to the subject matter hereof shall be the courts located in California, United States, and you hereby submit to the personal jurisdiction of such courts. You hereby waive any right to a jury trial in any proceeding arising out of or related to this Agreement. The United Nations Convention on Contracts for the International Sale of Goods does not apply to this Agreement.</p>
                    <h2 id="changes-and-amendments">Changes and amendments</h2>
                    <p>We reserve the right to modify this Agreement or its terms related to the Services at any time at our discretion. When we do, we will send you an email to notify you. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.</p>
                    <p>An updated version of this Agreement will be effective immediately upon the posting of the revised Agreement unless otherwise specified. Your continued use of the Services after the effective date of the revised Agreement (or such other act specified at that time) will constitute your consent to those changes.</p>
                    <h2 id="acceptance-of-these-terms">Acceptance of these terms</h2>
                    <p>
                        You acknowledge that you have read this Agreement and agree to all its terms and conditions. By accessing and using the Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to access or use the Services.
                    </p>
                    <h2 id="contacting-us">Contacting us</h2>
                    <p>If you have any questions, concerns, or complaints regarding this Agreement, we encourage you to contact us using the details below:</p>
                    <p>
                        <a target="blank" rel="noreferrer noopener external nofollow" href="https://www.copper-wired.com/contact-page-cover">https://www.copper-wired.com/contact</a>
                        <br />
                        <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;contact@copper-wired.com" target="blank" rel="nofollow">contact@copper-wired.com</a>
                    </p>
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

export default Terms;
