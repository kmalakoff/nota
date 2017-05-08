import Votes from './votes';

export default class DataStore {
  constructor(options = {}, store) {
    this.votes = new Votes(options, store);
  }
}
