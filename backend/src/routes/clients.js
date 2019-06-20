import { Router } from 'express';
import validator from 'express-joi-validator';
import { Client } from '../models';
import clientJoi from '../schemas/joi/client';

const routes = Router();

routes.get(
  '/',
  async (req, res) => {
    res.status(200).json(await Client.find({}).exec());
  }
);

routes.post(
  '/',
  validator(clientJoi),
  async (req, res) => {
    let item = new Client({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      providers: req.body.providers,
    });
    await item.save();
    res.status(200).json(item);
  }
)

export default routes;