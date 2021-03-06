import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  children: DS.hasMany('node', { inverse: 'parent' }),
  parent: DS.belongsTo('node', { inverse: 'children' }),
  index: DS.attr('number'),
  description: DS.attr('string'),
  done: DS.attr('boolean')
});
