import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import config from "../../site-config";

export default () => (
  <Layout>
    <Helmet title={`Articles | ${config.siteTitle}`} />
    <h1>Articles</h1>
  </Layout>
)
