import Ember from 'ember';

export default Ember.Component.extend({
  isOpen: false,
  store: Ember.inject.service(),
  actions: {
    toggleOpen() {
      this.toggleProperty('isOpen');
    },
    createNode() {
      const record = this.get('store').createRecord('node', {
        title: this.get('newNodeName'),
        parent: this.get('node')        
      });
      this.set('newNodeName', '');
      record.save().then( (item) => {
        this.get('children').pushObject(item);
        this.send('refreshModel');
        alert(`Created record ${record.get('name')}`);
      } );
    }
  }
});
