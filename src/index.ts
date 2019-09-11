import * as objection from 'objection/typings/objection';
import * as types from '../typings';
const chi = require('chi-doufu');

module.exports = (options:types.FriendlyIdOptions={}) => {
  options = Object.assign({
    field: 'name',
    use: 'slug'
  }, options)

  return (Model:objection.ModelClass<any>) => {
    return class extends Model {
      $beforeInsert(context:objection.QueryContext) {
        var self = this;
        const toResolve = super.$beforeInsert(context);
        return Promise.resolve(toResolve).then(() => {
          return self.populateSlug();
        });
      }

      $beforeUpdate(query:objection.ModelOptions, context:objection.QueryContext) {
        var self = this;
        const toResolve = super.$beforeUpdate(query, context);
        return Promise.resolve(toResolve).then(() => {
          return self.populateSlug();
        });
      }

      private generateSlug() {
        return chi(this[options.field], options);
      }

      private populateSlug() {
        return this[options.use] = this.generateSlug();
      } 
    }
  }  
}
