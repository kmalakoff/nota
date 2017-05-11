import { observable } from 'mobx';
import Referendum from './referendum';

export default class ReferendumStore {
  @observable referendums = [];
  @observable isLoading = true;

  constructor() {
        // this.transportLayer.onReceiveReferendumUpdate(updatedReferendum => this.updateReferendumFromServer(updatedReferendum));
    this.loadReferendums();
  }

  /**
   * Fetches all referendum's from the server
   */
  loadReferendums() {
    this.isLoading = true;
    // this.transportLayer.fetchReferendums().then((fetchedReferendums) => {
    //   fetchedReferendums.forEach(json => this.updateReferendumFromServer(json));
    this.isLoading = false;
    // });
  }

    /**
     * Update a referendum with information from the server. Guarantees a referendum
     * only exists once. Might either construct a new referendum, update an existing one,
     * or remove an referendum if it has been deleted on the server.
     */
  updateReferendumFromServer(json) {
    let referendum = this.referendums.find(x => x.id === json.id);
    if (!referendum) {
      referendum = new Referendum(this, json.id);
      this.referendums.push(referendum);
    }
    if (json.isDeleted) {
      this.removeReferendum(referendum);
    } else {
      referendum.updateFromJson(json);
    }
  }

    /**
     * Creates a fresh referendum on the client and server
     */
  createReferendum() {
    const referendum = new Referendum(this);
    this.referendums.push(referendum);
    return referendum;
  }

    /**
     * A referendum was somehow deleted, clean it from the client memory
     */
  removeReferendum(referendum) {
    this.referendums.splice(this.referendums.indexOf(referendum), 1);
    referendum.dispose();
  }
}
