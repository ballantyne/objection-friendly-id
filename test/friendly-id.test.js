var Friendly = require('../build');
const Knex = require('knex');
const Model = require('objection').Model;
const assert = require('assert');

describe('Objection', () => {
  describe('FriendlyId', () => {
    var knex;

    describe('using default options', () => {    
      beforeEach(async () => {
        knex = Knex({
          client: 'sqlite3',
          connection: {
            filename: ':memory:'
          },
          useNullAsDefault: true
        });

        Model.knex(knex);

        await knex.schema.createTable('documents', (table) => {
          table.increments('id').primary();
          table.string('name');
          table.string('slug');
        });
      })
      
      it('chinese', async () =>  {
        var friendly = Friendly({});

        class Document extends friendly(Model) {
          static get tableName () {
            return 'documents';
          }
        }

        await Document.query().insert({name: '光复香港，时代革命'})
        var documents = await Document.query().where({name: '光复香港，时代革命'});
        assert.equal(documents[0].slug, 'guangfu-xianggang-shidai-geming')
      });
    });
 
    describe('using custom options', () => {    
      beforeEach(async () => {
        knex = Knex({
          client: 'sqlite3',
          connection: {
            filename: ':memory:'
          },
          useNullAsDefault: true
        });

        Model.knex(knex);

        await knex.schema.createTable('documents', (table) => {
          table.increments('id').primary();
          table.string('name');
          table.string('friendly');
        });
      })     

      it('chinese', async () =>  {
        var friendly = Friendly({use: 'friendly'});

        class Document extends friendly(Model) {
          static get tableName () {
            return 'documents';
          }
        }

        await Document.query().insert({name: '光复香港，时代革命'})
        var documents = await Document.query().where({name: '光复香港，时代革命'});
        assert.equal(documents[0].friendly, 'guangfu-xianggang-shidai-geming')
      });
    });
   
    describe('pronunciation', () => {    
      beforeEach(async () => {
        knex = Knex({
          client: 'sqlite3',
          connection: {
            filename: ':memory:'
          },
          useNullAsDefault: true
        });

        Model.knex(knex);

        await knex.schema.createTable('documents', (table) => {
          table.increments('id').primary();
          table.string('name');
          table.string('friendly');
        });
      })     

      it('cantonese', async () =>  {
        var friendly = Friendly({pronunciation: 'cantonese', use: 'friendly'});

        class Document extends friendly(Model) {
          static get tableName () {
            return 'documents';
          }
        }

        await Document.query().insert({name: '光复香港，时代革命'})
        var documents = await Document.query().where({name: '光复香港，时代革命'});
        assert.equal(documents[0].friendly, 'gwongfuk-heunggong-sidoi-gaakming')
      });
    });

  })
})
