import Ember from 'ember';

export default Ember.Controller.extend({
  sortedItems: Ember.computed( 'model.[]', 'model.@each.index', function() {
    return this.get('model').sortBy('index');
  }),
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
    saveDone(item){
      console.log(`saving item ${item.get('title')}`);
      item.save();
    },
    sortEndAction(newSortedArray) {
      console.log('Done sorting');
      console.log(...arguments);
      console.log('Sorted object list');
      console.log(this.get('model').mapBy('title'));
      let items = this.get('model');
      if( !items[0].get('index') && items[0].get('index') !== 0 ) {
        items[0].set('index', 0);
      }
      for( let arrIdx = 1; arrIdx < items.length; arrIdx++ ){
        let currentItem = items[arrIdx];
        let prevItem = items[arrIdx - 1];

        if( ! currentItem.get('index') ) {
          Ember.set(currentItem, 'index', 0);
        }

        if( currentItem.get('index') <= prevItem.get('index') ) {
          if( items.length > arrIdx + 1 ){
            let nextItem = items[arrIdx + 1];
            if( nextItem.get('index') > prevItem.get('index') ){
              let newIndex = prevItem.get('index') + (((nextItem.get('index') + 0.0) - (prevItem.get('index') + 0.0)) / 2);
              Ember.set(currentItem, 'index', newIndex);
            } else {
              Ember.set(currentItem, 'index', prevItem.get('index') + 1);
            }
          } else {
            Ember.set(currentItem, 'index', prevItem.get('index') + 1);
          }
        }
      }

      items.forEach( (item) => item.save() );
    }
  }
});
