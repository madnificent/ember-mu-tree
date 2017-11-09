import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createNode() {
      const record = this.get('store').createRecord('node', {
        title: this.get('newNodeName')
      });
      this.set('newNodeName', '');
      record.save().then( (item) => {
        this.send('refreshModel');
      } );
    }
  }
});
