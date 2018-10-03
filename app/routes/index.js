import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model() {
    // sort seems to be broken in the backend when no indexes were
    // found, so we're executing this here for now.
    let self = this;
    return new Ember.RSVP.Promise( function(success, failure) {
      self
        .get('store')
        .query('node', { "filter[:has-no:parent]": "true" })
        .then( (items) => { console.log('hello'); success(items.sortBy('index')); } );
    } );
  },
  actions: {
    refreshModel() {
      this.refresh();
    }
  }
});
