import express from "express";

import { connect } from "./mysql";

const app = express();
const port = process.env.PORT || 3000;

const db = connect();