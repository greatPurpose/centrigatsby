import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Container from "../components/Container"
import Column, { Spacer } from "../components/Column"
import Grid from "../components/Grid";
import { RichTextRenderer } from "../components/helpers";

const IndexPage = () => (
  <Layout>
        <SEO title="Home" />
        <Container>
            <Grid staggered>
                <Column span={{ medium: 6, large: 4 }}>
                    <div>ABCD</div>
                </Column>
                <Spacer />
                <Column span={{ medium: 6, large: 7 }}>
                    <div></div>
                </Column>
            </Grid>
        </Container>
  </Layout>
)

export default IndexPage
