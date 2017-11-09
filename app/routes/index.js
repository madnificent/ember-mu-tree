import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model() {
    return this.get('store').query('node', { "filter[:has-no:parent]": "true" });
  },
  actions: {
    refreshModel() {
      this.refresh();
    }
  }
});
