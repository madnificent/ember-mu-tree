import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createNode() {
      const record = this.get('store').createRecord('node', {
        title: this.get('newNodeName')
      });
      this.set('newNodeName', '');
      record.save().then( () => {
        this.send('refreshModel');
      } );
    },
    sortEndAction(newSortedArray) {
      console.log('Done sorting');
      console.log(newSortedArray);
    }
  }
});
