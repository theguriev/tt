import { model, Schema } from 'mongoose';
import providerMongoose from './schemas/mongoose/provider';
import clientMongoose from './schemas/mongoose/client';

const Provider = model('Provider', new Schema(providerMongoose), 'providers');
const Client = model('Client', new Schema(clientMongoose), 'clients');

export { Provider, Client };