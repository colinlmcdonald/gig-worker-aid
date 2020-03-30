import Head from "next/head";
import { Text, Heading, Flex, Box, Button, Link } from "rebass";
import App from "../components/App";
import IconGirl from "../assets/covergirl.svg";
import Paper from "../assets/paper.svg";
import Mento from "../assets/mentoo-logo.svg";
import Bulb from "../assets/idea.svg";
import Check from "../assets/check.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";

const Home = () => (
  <Box minHeight="100vh">
    <Head>
      <title>COVID-19 CA Benefits Tool</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <App>
      <Box mx={[4, 4, 5]} marginTop={[4, 2, 1]} marginBottom={5} p={[2, 5, 5]}>
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          <Box fontSize={[2, 3, 4]}>
            <Flex justifyContent="space-between">
              <Box width={[1, 1 / 2, 1 / 2]}>
                <Box width={[1, 1, 3 / 4]} sx={{ height: "100%" }}>
                  <Flex
                    flexDirection="column"
                    sx={{ height: "100%" }}
                    justifyContent="center"
                  >
                    <Heading fontSize={[4, 5, 6]}>COVID-19</Heading>
                    <Heading fontSize={[5, 5, 6]}>
                      California Benefits Tool
                    </Heading>
                    <Text marginTop={3}>
                      Use this tool to learn which benefits you qualify for if
                      you're impacted by COVID-19.
                    </Text>
                    <Box marginTop={4} width={[3 / 7]}>
                      <Link href="covid-quiz">
                        <Button
                          height={50}
                          sx={{ borderRadius: "0px", cursor: "pointer" }}
                        >
                          Take the Quiz
                        </Button>
                      </Link>
                    </Box>
                  </Flex>
                </Box>
              </Box>
              <Box width={[1 / 2]} flex="1" className="icon-girl-container">
                <Flex justifyContent="center">
                  <Box width={3 / 4} marginTop={[5]}>
                    <IconGirl className="icon-girl" />
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Box marginTop={[3, 4, 5]} mx={[0, 2, 3]} fontSize={[2, 2, 3]}>
              <Flex justifyContent="space-between" flexWrap="wrap" p={1}>
                <Box width={[1, 1, 1 / 3]} p={1} marginTop={[3, 3, 0]}>
                  <Box width={[1, 1, 4 / 5]}>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Paper
                        flex="1"
                        height="75px"
                        width="75px"
                        style={{ alignSelf: "flex-start" }}
                      />
                      <Flex marginLeft={3} flex="1" flexDirection="column ">
                        <Text flex="1" fontWeight="bold">
                          Discover your benefits
                        </Text>
                        <Text flex="1">
                          Learn if you're eligible for unemployment, paid family
                          leave, disability, or pandemic assistance.
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
                <Box width={[1, 1, 1 / 3]} p={1} marginTop={[3, 3, 0]}>
                  <Box width={[1, 1, 3 / 4]}>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Bulb
                        flex="1"
                        height="75px"
                        width="75px"
                        style={{ alignSelf: "flex-start" }}
                      />
                      <Flex marginLeft={3} flex="1" flexDirection="column ">
                        <Text flex="1" fontWeight="bold">
                          Start your application
                        </Text>
                        <Text flex="1">
                          Quickly complete your applications with our
                          step-by-step guides.
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
                <Box width={[1, 1, 1 / 3]} p={1} marginTop={[3, 3, 0]}>
                  <Box width={[1, 1, 3 / 4]}>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Check
                        flex="1"
                        height="75px"
                        width="75px"
                        style={{
                          alignSelf: "flex-start",
                          transform: "scale(1.3)"
                        }}
                      />
                      <Flex marginLeft={3} flex="1" flexDirection="column ">
                        <Text fontWeight="bold">Learn More</Text>
                        <Text>
                          For more info from the CA EDD, please click{" "}
                          <Link
                            href="https://www.edd.ca.gov/about_edd/coronavirus-2019.htm"
                            target="_blank"
                          >
                            here
                          </Link>
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            </Box>
            <Box marginTop={5}>
              <Box
                sx={{
                  borderTop: "1px solid rgba(0, 0, 0, 0.3)",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.3)"
                }}
                py={5}
              >
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box width={[1, 3 / 4, 1 / 2]} sx={{ textAlign: "center" }}>
                    <Text fontWeight="bold" marginBottom={3}>
                      Our Commitment to Privacy
                    </Text>
                    <Text>Your privacy is important.</Text>
                    <Text>
                      We are not collecting your answers or any personally
                      identifiable infomration about you with this tool.
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.3)"
                }}
                py={5}
              >
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box width={[1, 3 / 4, 1 / 2]} sx={{ textAlign: "center" }}>
                    <Text fontWeight="bold">Developed By</Text>
                    <Mento
                      height="85px"
                      width="280px"
                      style={{ transform: "translate(0px, -15px) scale(0.75)" }}
                    />
                    <Text>
                      This tool was created by Mento, a career support platform,
                      that's working to help people manage their job transitions
                      and their careers.
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
          <Flex justifyContent="center">
            <Box marginTop={5} width={[1, 3 / 4, 3 / 4]} fontSize={[1, 2, 3]}>
              <footer>
                <Text sx={{ fontStyle: "italic", textAlign: "center" }}>
                  This guide reflects our knowledge, beliefs, and suggestions as
                  of March 29, 2020, and should not be considered a replacement
                  for applicable laws, orders, regulations, policies, plans or
                  best practices (collectively, "Primary Materials"). Make sure
                  to refer to Primary Materials applicable to your personal
                  situation and consult with your counsel, benefit advisors,
                  financial advisors, and employer, as applicable, before making
                  decisions relating to your employment and healthcare. We do
                  everything we can to stay up to date, but we in no way make
                  any representations or warranties as to the accuracy of the
                  material contained herein, and, as such, you should not rely
                  on it. Lastly, nothing contained herein should be construed as
                  creating an attorney-client or other contractual relationship.
                </Text>
              </footer>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </App>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
      @media screen and (max-width: 1024px) {
        .icon-girl-container {
          display: none;
        }
      }

      @media screen and (max-width: 1424px) {
        .icon-girl {
          transform: scale(0.8);
        }
      }
    `}</style>
    <style jsx>{`
      .checkSquare path {
        fill: #256be1;
      }
    `}</style>
  </Box>
);

export default Home;
