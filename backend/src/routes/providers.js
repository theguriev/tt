import { Router } from 'express';
import validator from 'express-joi-validator';
import { Provider } from '../models';
import providerJoi from '../schemas/joi/provider';

const routes = Router();

routes.get(
  '/',
  async (req, res) => {
    res.status(200).json(await Provider.find({}).exec());
  }
);

routes.post(
  '/',
  validator(providerJoi),
  async (req, res) => {
    let p = new Provider({ name: req.body.name });
    await p.save();
    res.status(200).json(p);
  }
)

export default routes;