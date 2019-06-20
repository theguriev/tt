import { Router } from 'express';
import { Provider } from '../models';
import validator from 'express-joi-validator';
import providerJoi from '../schemas/joi/provider';

const routes = Router();

async function providerExists(id) {
  return (await Provider.findById(id).exec()) !== null;
}

routes.put(
  '/:id',
  validator(providerJoi),
  async (req, res) => {
    if (!(await providerExists(req.params.id))) {
      res.status(500).json({ message: `${req.params.id} - provider not found!` });
    }
    await Provider.findByIdAndUpdate(
      req.params.id,
      { $set: { name: req.body.name } }
    ).exec();
    res.status(200).json(await Provider.findById(req.params.id).exec());
  }
);

routes.delete(
  '/:id',
  async (req, res) => {
    if (!(await providerExists(req.params.id))) {
      res.status(500).json({ message: `${req.params.id} - provider not found!` });
    }
    res.status(200).json(await Provider.deleteOne({ _id: req.params.id }));
  }
);

export default routes;