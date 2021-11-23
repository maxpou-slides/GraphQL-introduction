import React from 'react';
import { Deck, Slide, Heading, Image, Text, ListItem,
  UnorderedList, Link, CodePane, indentNormalizer, Appear,
} from 'spectacle';
import material from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark';

import rmmImg from './img/rmm.png';
import beFeSchemaImg from './img/be-fe-schema.png';
import graphqllogoImg from './img/logo.png';

const theme = {
  colors: {
    primary: '#ECECED',
    secondary: '#ffdc4e',
    darkBg: "#3E4047",
    yellow: "#ffdc4e",
  },
  fontSizes: {
    header: '64px',
    paragraph: '28px'
  },
}

function App() {
  return (
    <Deck theme={theme}>
      <Slide backgroundColor="darkBg">
        <Heading style={{height: '30%', margin: 'auto'}}>An introduction to GraphQL</Heading>
      </Slide>
      {/* <Slide backgroundColor="darkBg">
        <Heading>RPC style</Heading>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>RPC style</Heading>
      </Slide> */}
      <Slide backgroundColor="darkBg">
        <Heading>REST Architectural Style</Heading>
        <Image src={rmmImg} alt="Richardson Maturity Model" style={{width: '70%', margin: '0 auto'}}/>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>LEVELS 0, 1 AND 2</Heading>
        <UnorderedList>
          <ListItem>Resource unicity</ListItem>
          <ListItem>Client use HTTP verbs</ListItem>
          <ListItem>Server use HTTP codes</ListItem>
          <ListItem>Content negotiation <br/>
          ➡ Use media types to describe WHAT is expect
          </ListItem>
        </UnorderedList>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>LEVEL 3: HATEOAS</Heading>
        <UnorderedList>
          <ListItem><em><b>H</b>ypertext <b>A</b>s <b>T</b>he <b>E</b>ngine <b>O</b>f <b>T</b>he <b>A</b>pplication <b>S</b>tate</em></ListItem>
          <ListItem>Resources are self-describing (discoverability) <br/>
          ➡ Use links to describe HOW the service is used</ListItem>
          <ListItem>Hypermedia formats (e.g., HAL, JSON-LD, HYDRA)</ListItem>
        </UnorderedList>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>LEVEL 3: HATEOAS</Heading>
        <CodePane
          theme={material}
          fontSize={18}
          language="js"
          showLineNumbers={false}
        >
        {indentNormalizer(`
{
  "id": "66",
  "title": "My order",
  "description": "My order description",
  "_links": {
    "self": {
      "href": "/orders/66"
    },
    // if I can't quote, there's no link!
    "quote": {
      "href": "/orders/66/quote",
    },
    "company": {
      "href": "/companies/5/"
    }
  }
}
        `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading style={{ margin: 0 }}>REST</Heading>
        <Text style={{margin: 0, padding: 0}}>Pros:</Text>
        <UnorderedList>
          <ListItem>👍 cache consistency (idempotent/safe HTTP method)</ListItem>
          <ListItem>👍 loose coupling</ListItem>
        </UnorderedList>
        <Text style={{margin: 0, padding: 0}}>Cons:</Text>
        <UnorderedList>
          <ListItem>👎 Heavier response</ListItem>
          <ListItem>👎 No "multi-GET"</ListItem>
          <ListItem>👎 Clients need to understand what links are about</ListItem>
          <ListItem><small> 👎 ...nobody understand REST! (...and it's ok)</small></ListItem>
        </UnorderedList>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading style={{ margin: 0 }}>HTTP API™</Heading>
        <Text style={{margin: 0, padding: 0}}>Pros:</Text>
        <UnorderedList>
          <ListItem>👍 cache consistency (idempotent/safe HTTP method)</ListItem>
          <ListItem>👍 easy way to communicate between back&front</ListItem>
        </UnorderedList>
        <Text style={{margin: 0, padding: 0}}>Cons:</Text>
        <UnorderedList>
          <ListItem>👎 Documentation</ListItem>
          <ListItem>👎 "multi-GET" / loose coupling tradeoff</ListItem>
        </UnorderedList>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>GraphQL</Heading>
        <Image src={graphqllogoImg} alt="GraphQL logo" style={{width: '30%', margin: '0 auto'}}/>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>🖇 Model 101</Heading>
        <CodePane
        fontSize={18}
        theme={material}
        language="graphql"
        autoFillHeight
        >
        {indentNormalizer(`
          type Order {
            title: String! # ! means required
            description: String
            company: Company
          }
          
          type Company {
            name: String!
            orders: [Order]
          }
        `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>🔎 Queries 101</Heading>
        <CodePane
        fontSize={18}
        language="graphql"
        theme={material}
        autoFillHeight
        >
        {indentNormalizer(`
          query GetOrdersAndCompanies {
            orders {
              title
              company {
                name
              }
            }
          }
        `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Appear priority={2}><Heading>🥳 1 call, only fetch what's needed</Heading></Appear>
        <Appear priority={0}>
          <CodePane
            fontSize={18}
            language="graphql"
            showLineNumbers={false}
            theme={material}
          >
            {indentNormalizer(`
              HTTP GET /orders/5

              # then...
              HTTP GET /materials/1
              HTTP GET /materials/2
              HTTP GET /materials/3
            `)}
          </CodePane>
        </Appear>
        <Appear priority={1}>
          <CodePane
            fontSize={18}
            language="graphql"
            theme={material}
            showLineNumbers={false}
          >
            {indentNormalizer(`
              query getOrder {
                order(id: "5") {
                  title
                  materials {
                    name
                  }
                }
              }
            `)}
          </CodePane>
        </Appear>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>🚀 GraphQL in action</Heading>
        <Image src={beFeSchemaImg} alt="App Schema" style={{width: '30%', margin: '20px auto'}} />
        <Link style={{margin: '0 auto'}} href="https://github.com/maxpou/nest-react-graphql">github.com/maxpou/nest-react-graphql</Link>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>⚙️ Focus: Queries params</Heading>
        <CodePane
          fontSize={12}
          language="graphql"
          autoFillHeight
          theme={material}
          showLineNumbers={false}
        >
          {indentNormalizer(`
            query getOrder($id: ID!) {
              order(id: $id) {
                title
                quotes {
                  company {
                    name
                  }
                }
              }
            }
            # QUERY_VARIABLES
            {
              "id": "60"
            }
          `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>💡 Focus: Directives</Heading>
        <CodePane
          fontSize={18}
          theme={material}
          language="ts"
          showLineNumbers={false}
          autoFillHeight
        >
        {indentNormalizer(`
        directive @deprecated(
          reason: String = "No longer supported"
        ) on FIELD_DEFINITION | ENUM_VALUE

        type Order {
          id: ID!
          orderId: String! @deprecated(reason: "Use \`id\` instead.")
          # ...
        }
        `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>😕 Caching</Heading>
        <UnorderedList>
          <Text>⚠️ Incompatible with:</Text>
          <ListItem>browser caching <small>(i.e service workers)</small></ListItem>
          <ListItem>reverse proxy <small>(i.e varnish)</small></ListItem>
        </UnorderedList>
        
        <Text>... we always query the same endpoint <small>(https://myapi.com/graphql)</small></Text>
        <Appear><Text>...But...</Text></Appear>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>🧠 Focus: Caching (FE w/ Apollo)</Heading>
        <Text margin={0}>Support fetch policy on the query level (cache first, network only...)
        {/* https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies */}
        <br />
        Internal cache out of the box</Text>
        <CodePane
          fontSize={12}
          language="graphql"
          showLineNumbers={false}
          // highlightRanges={[1, 3]}
          theme={material}
        >
          {indentNormalizer(`
          # will auto-update cache
          mutation {
            UpdateOrder(id: 3, name: "Updated order") { ... }
          }
          query {
            order(id: 3) {
              name
            }
          }
          `)}
        </CodePane>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>🧠 Focus: Caching (BE)</Heading>
        <CodePane
          fontSize={18}
          language="graphql"
          theme={material}
          showLineNumbers={false}
        >
          {indentNormalizer(`
            type Order {
              id: ID!
              title: String

              # maxAge: 30 => 30s
              quotes: [Quote!] @cacheControl(maxAge: 30)
              
              # PRIVATE => depends on the curent user logged in
              orderUnlockedByCurrentUser: Boolean! @cacheControl(maxAge: 10, scope: PRIVATE)
            }
          `)}
        </CodePane>
        <Text>❓ Can also be done dynamically in your NestJS resolver</Text>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>🤯 Focus: Preventing malicious querying</Heading>
        <CodePane
          fontSize={18}
          theme={material}
          language="graphql"
          showLineNumbers={false}
        >
        {indentNormalizer(`
query maliciousQuery {
  company(id: "some-id") {
    quotes(first: 99999) {
      company {
        quotes(first: 99999) {
          company {
            # ...repeat times 10000...
          }
        }
      }
    }
  }
}
        `)}
        </CodePane>
        <Link href="https://github.com/4Catalyzer/graphql-validation-complexity">👉 github.com/4Catalyzer/graphql-validation-complexity</Link>
      </Slide>
      <Slide backgroundColor="darkBg">
        <Heading>📚 Reading</Heading>
        <UnorderedList>
          <ListItem>
            <Link style={{margin: '0 auto'}} href="https://spec.graphql.org/October2021/">
              GraphQL spec
            </Link>
          </ListItem>
          <ListItem>
            <Link style={{margin: '0 auto'}} href="https://www.apollographql.com/docs/react/data/operation-best-practices/">
              GraphQL query best practices (apollographql.com)
            </Link>
          </ListItem>
        </UnorderedList>
      </Slide>
    </Deck>
  );
}
export default App;
