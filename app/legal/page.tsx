import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LegalPage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Legal Agreements</h1>

      <Tabs defaultValue="terms">
        <TabsList className="mb-6">
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
          <TabsTrigger value="eula">EULA</TabsTrigger>
        </TabsList>

        <TabsContent value="terms">
          <Card>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
              <CardDescription>Last updated: March 9, 2023</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Acceptance of Terms</h3>
                <p>
                  By accessing or using the 2D2N fitness platform, website, and services (collectively, the "Services"),
                  you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may
                  not access or use the Services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">2. Description of Services</h3>
                <p>
                  2D2N provides a fitness community platform that offers workout programs, nutrition guidance, progress
                  tracking, and social features. The Services may include free and premium features, which may require
                  payment.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">3. User Accounts</h3>
                <p>
                  To access certain features of the Services, you must create an account. You are responsible for
                  maintaining the confidentiality of your account credentials and for all activities that occur under
                  your account. You agree to provide accurate and complete information when creating your account and to
                  update your information as necessary.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">4. Subscription and Payments</h3>
                <p>
                  4.1. Subscription Plans: 2D2N offers various subscription plans, including a free Basic plan and paid
                  Premium plans. The features available in each plan are described on our website.
                </p>
                <p>
                  4.2. Payment: By subscribing to a Premium plan, you authorize us to charge the applicable fees to your
                  designated payment method. All payments are non-refundable except as required by law or as explicitly
                  stated in these Terms.
                </p>
                <p>
                  4.3. Subscription Term and Renewal: Subscriptions automatically renew at the end of each billing
                  period unless canceled before the renewal date.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">5. User Content</h3>
                <p>
                  5.1. You retain ownership of any content you submit, post, or display on or through the Services
                  ("User Content").
                </p>
                <p>
                  5.2. By submitting User Content, you grant 2D2N a worldwide, non-exclusive, royalty-free license to
                  use, reproduce, modify, adapt, publish, translate, distribute, and display such content in connection
                  with providing the Services.
                </p>
                <p>
                  5.3. You are solely responsible for your User Content and the consequences of posting it. You
                  represent and warrant that you have all necessary rights to submit your User Content and that it does
                  not violate these Terms or any applicable laws.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">6. Prohibited Conduct</h3>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use the Services for any illegal purpose or in violation of any laws</li>
                  <li>
                    Post or transmit harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable
                    content
                  </li>
                  <li>
                    Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or
                    entity
                  </li>
                  <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
                  <li>Attempt to gain unauthorized access to any part of the Services</li>
                  <li>Use the Services to send unsolicited communications</li>
                  <li>Collect or harvest user information without consent</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">7. Intellectual Property</h3>
                <p>
                  The Services and all content and materials included on or within the Services, including text,
                  graphics, logos, images, and software, are the property of 2D2N or its licensors and are protected by
                  copyright, trademark, and other intellectual property laws.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">8. Disclaimer of Warranties</h3>
                <p>
                  THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                  IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, AND NON-INFRINGEMENT.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">9. Limitation of Liability</h3>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, 2D2N SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
                  DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM
                  YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">10. Health Disclaimer</h3>
                <p>
                  The information provided through the Services is for general informational purposes only and is not
                  intended as medical advice. Before starting any exercise program or making dietary changes, you should
                  consult with a healthcare professional.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">11. Termination</h3>
                <p>
                  2D2N may terminate or suspend your access to the Services at any time, with or without cause, and with
                  or without notice. Upon termination, your right to use the Services will immediately cease.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">12. Changes to Terms</h3>
                <p>
                  2D2N reserves the right to modify these Terms at any time. We will provide notice of significant
                  changes by posting the updated Terms on our website or through other communications. Your continued
                  use of the Services after such changes constitutes your acceptance of the new Terms.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">13. Governing Law</h3>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the United States,
                  without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">14. Contact Information</h3>
                <p>If you have any questions about these Terms, please contact us at legal@2d2n.com.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
              <CardDescription>Last updated: March 9, 2023</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Introduction</h3>
                <p>
                  This Privacy Policy explains how 2D2N ("we," "us," or "our") collects, uses, and shares your personal
                  information when you use our fitness platform, website, and services (collectively, the "Services").
                  By using the Services, you agree to the collection and use of information in accordance with this
                  policy.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">2. Information We Collect</h3>
                <p>
                  2.1. Information You Provide: We collect information you provide directly to us, such as when you
                  create an account, update your profile, use interactive features, make a purchase, request customer
                  support, or otherwise communicate with us. This may include:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Account information (name, email address, password, etc.)</li>
                  <li>Profile information (age, gender, height, weight, fitness goals, etc.)</li>
                  <li>Fitness and health data (workout history, nutrition logs, body measurements, etc.)</li>
                  <li>Payment information (credit card details, billing address, etc.)</li>
                  <li>Communications and feedback you provide</li>
                  <li>Photos and videos you upload</li>
                </ul>
                <p className="mt-2">
                  2.2. Information We Collect Automatically: When you use our Services, we automatically collect certain
                  information, including:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Device information (IP address, browser type, operating system, etc.)</li>
                  <li>Usage data (pages visited, features used, time spent, etc.)</li>
                  <li>Location information (with your permission)</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">3. How We Use Your Information</h3>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide, maintain, and improve our Services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices, updates, security alerts, and support messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Personalize your experience and deliver content and product offerings</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues, fraud, or illegal activities</li>
                  <li>Develop new products and services</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">4. Sharing of Information</h3>
                <p>We may share your information in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>With service providers who perform services on our behalf</li>
                  <li>With other users, according to your privacy settings</li>
                  <li>In connection with a business transaction (e.g., merger, acquisition, or sale)</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights, property, or safety, or that of our users or others</li>
                  <li>With your consent or at your direction</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">5. Your Choices</h3>
                <p>
                  5.1. Account Information: You can update your account information at any time by accessing your
                  account settings.
                </p>
                <p>
                  5.2. Privacy Settings: You can control the visibility of your profile and activity through your
                  privacy settings.
                </p>
                <p>
                  5.3. Marketing Communications: You can opt out of receiving promotional emails by following the
                  instructions in those emails or by adjusting your notification settings.
                </p>
                <p>
                  5.4. Cookies: Most web browsers are set to accept cookies by default. You can usually choose to set
                  your browser to remove or reject cookies.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">6. Data Security</h3>
                <p>
                  We take reasonable measures to help protect your personal information from loss, theft, misuse,
                  unauthorized access, disclosure, alteration, and destruction.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">7. Children's Privacy</h3>
                <p>
                  Our Services are not directed to children under 13, and we do not knowingly collect personal
                  information from children under 13. If we learn we have collected personal information from a child
                  under 13, we will delete that information.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">8. International Data Transfers</h3>
                <p>
                  We may transfer your personal information to countries other than the one in which you live. By using
                  the Services, you consent to the transfer of your personal information to these countries.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">9. Changes to This Privacy Policy</h3>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">10. Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us at privacy@2d2n.com.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cookies">
          <Card>
            <CardHeader>
              <CardTitle>Cookie Policy</CardTitle>
              <CardDescription>Last updated: March 9, 2023</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1. What Are Cookies</h3>
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit a
                  website. They are widely used to make websites work more efficiently and provide information to the
                  website owners.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">2. How We Use Cookies</h3>
                <p>We use cookies for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Essential cookies: These are necessary for the website to function properly.</li>
                  <li>Functionality cookies: These remember your preferences and settings.</li>
                  <li>Performance cookies: These help us understand how visitors interact with our website.</li>
                  <li>Analytics cookies: These help us measure and improve the performance of our website.</li>
                  <li>
                    Advertising cookies: These are used to deliver relevant advertisements and track ad campaign
                    performance.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">3. Types of Cookies We Use</h3>
                <p>3.1. Session Cookies: These are temporary cookies that are deleted when you close your browser.</p>
                <p>3.2. Persistent Cookies: These remain on your device until they expire or you delete them.</p>
                <p>3.3. First-Party Cookies: These are set by the website you are visiting.</p>
                <p>3.4. Third-Party Cookies: These are set by a domain other than the one you are visiting.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">4. Managing Cookies</h3>
                <p>
                  Most web browsers allow you to control cookies through their settings. You can usually find these
                  settings in the "Options" or "Preferences" menu of your browser. You can also use the "Help" feature
                  in your browser for more information.
                </p>
                <p>
                  Please note that if you choose to block or delete cookies, you may not be able to access certain
                  features of our website, and some functionality may not work as intended.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">5. Changes to This Cookie Policy</h3>
                <p>
                  We may update this Cookie Policy from time to time. We will notify you of any changes by posting the
                  new Cookie Policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">6. Contact Us</h3>
                <p>If you have any questions about this Cookie Policy, please contact us at privacy@2d2n.com.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eula">
          <Card>
            <CardHeader>
              <CardTitle>End User License Agreement (EULA)</CardTitle>
              <CardDescription>Last updated: March 9, 2023</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Introduction</h3>
                <p>
                  This End User License Agreement ("EULA") is a legal agreement between you and 2D2N for the use of our
                  software applications, including mobile applications, web applications, and any related services
                  (collectively, the "Software").
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">2. License Grant</h3>
                <p>
                  Subject to your compliance with this EULA, 2D2N grants you a limited, non-exclusive, non-transferable,
                  revocable license to download, install, and use the Software for your personal, non-commercial use.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">3. Restrictions</h3>
                <p>You agree not to, and you will not permit others to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    License, sell, rent, lease, assign, distribute, transmit, host, outsource, disclose, or otherwise
                    commercially exploit the Software
                  </li>
                  <li>Copy or use the Software for any purpose other than as permitted under this EULA</li>
                  <li>
                    Modify, make derivative works of, disassemble, decrypt, reverse compile, or reverse engineer any
                    part of the Software
                  </li>
                  <li>
                    Remove, alter, or obscure any proprietary notice (including any notice of copyright or trademark) of
                    2D2N or its affiliates, partners, suppliers, or licensors
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">4. Intellectual Property</h3>
                <p>
                  The Software and all content, features, and functionality thereof, including but not limited to all
                  information, software, text, displays, images, video, and audio, and the design, selection, and
                  arrangement thereof, are owned by 2D2N, its licensors, or other providers of such material and are
                  protected by copyright, trademark, patent, trade secret, and other intellectual property or
                  proprietary rights laws.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">5. Third-Party Services</h3>
                <p>
                  The Software may display, include, or make available third-party content or provide links to
                  third-party websites or services. You acknowledge and agree that 2D2N is not responsible for
                  third-party content, websites, or services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">6. Updates</h3>
                <p>
                  2D2N may from time to time develop patches, bug fixes, updates, upgrades, and other modifications to
                  improve the performance of the Software ("Updates"). You agree that 2D2N may automatically install
                  Updates without providing additional notice or receiving additional consent.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">7. Term and Termination</h3>
                <p>
                  This EULA shall remain in effect until terminated by you or 2D2N. 2D2N may, in its sole discretion, at
                  any time and for any or no reason, suspend or terminate this EULA with or without prior notice. This
                  EULA will terminate immediately, without prior notice from 2D2N, in the event that you fail to comply
                  with any provision of this EULA.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">8. Disclaimer of Warranties</h3>
                <p>
                  THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                  IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE, AND NON-INFRINGEMENT.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">9. Limitation of Liability</h3>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL 2D2N BE LIABLE FOR ANY INDIRECT, PUNITIVE,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR
                  LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR
                  USE OF OR INABILITY TO USE THE SOFTWARE.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">10. Governing Law</h3>
                <p>
                  This EULA shall be governed by and construed in accordance with the laws of the United States, without
                  regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">11. Changes to This EULA</h3>
                <p>
                  2D2N reserves the right to modify this EULA at any time. We will provide notice of significant changes
                  by posting the updated EULA on our website or through other communications. Your continued use of the
                  Software after such changes constitutes your acceptance of the new EULA.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">12. Contact Information</h3>
                <p>If you have any questions about this EULA, please contact us at legal@2d2n.com.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

