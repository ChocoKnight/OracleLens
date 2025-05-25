import express, { Request, Response } from "express";
import { Match } from '../models/match';
import MatchService from "../services/match-svc";

const router = express.Router();