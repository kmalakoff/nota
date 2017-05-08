import { observable } from 'mobx';
import Vote from './vote';

export default class VoteStore {
    @observable votes = [];
    @observable isLoading = true;

  constructor() {
        // this.transportLayer.onReceiveVoteUpdate(updatedVote => this.updateVoteFromServer(updatedVote));
    this.loadVotes();
  }

    /**
     * Fetches all vote's from the server
     */
  loadVotes() {
    this.isLoading = true;
    // this.transportLayer.fetchVotes().then((fetchedVotes) => {
    //   fetchedVotes.forEach(json => this.updateVoteFromServer(json));
    this.isLoading = false;
    // });
  }

    /**
     * Update a vote with information from the server. Guarantees a vote
     * only exists once. Might either construct a new vote, update an existing one,
     * or remove an vote if it has been deleted on the server.
     */
  updateVoteFromServer(json) {
    let vote = this.votes.find(x => x.id === json.id);
    if (!vote) {
      vote = new Vote(this, json.id);
      this.votes.push(vote);
    }
    if (json.isDeleted) {
      this.removeVote(vote);
    } else {
      vote.updateFromJson(json);
    }
  }

    /**
     * Creates a fresh vote on the client and server
     */
  createVote() {
    const vote = new Vote(this);
    this.votes.push(vote);
    return vote;
  }

    /**
     * A vote was somehow deleted, clean it from the client memory
     */
  removeVote(vote) {
    this.votes.splice(this.votes.indexOf(vote), 1);
    vote.dispose();
  }
}
