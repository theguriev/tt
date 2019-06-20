import { Router } from 'express';
import { Client } from '../models';
import validator from 'express-joi-validator';
import clientJoi from '../schemas/joi/client';

const routes = Router();

async function exists(id) {
  return (await Client.findById(id).exec()) !== null;
}

routes.put(
  '/:id',
  validator(clientJoi),
  async (req, res) => {
    if (!(await exists(req.params.id))) {
      res.status(500).json({ message: `${req.params.id} - client not found!` });
    }
    await Client.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          providers: req.body.providers,
        }
      }
    ).exec();
    res.status(200).json(await Client.findById(req.params.id).exec());
  }
);

routes.delete(
  '/:id',
  async (req, res) => {
    if (!(await exists(req.params.id))) {
      res.status(500).json({ message: `${req.params.id} - client not found!` });
    }
    res.status(200).json(await Client.deleteOne({ _id: req.params.id }));
  }
);

export default routes;