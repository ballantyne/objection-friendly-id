# objection-friendly-id

## Usage

```bash
  npm install objection-friendly-id --save
```

Here is how to use this module with an objection model;

```javascript
  const FriendlyId  = require('objection-friendly-id');
  const Knex   = require('knex');
  const Model  = require('objection').Model;
  const assert = require('assert');

  const knex = Knex({
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    useNullAsDefault: true
  });

  Model.knex(knex);
  await knex.schema.createTable('document', (table) => {
    table.increments();
    table.string('name');
    table.string('slug');
  });

  var friendly = FriendlyId()

  class Document extends friendly(Model) {
    static get tableName () {
      return 'documents';
    }
  }

  await Document.query().insert({
    name: 'Liberate Hong Kong, revolution of our times', 
  });
  var documents = await Document.query().where('name', 'Liberate Hong Kong, revolution of our times');
  assert.equal(documents[0].slug, 'liberate-hong-kong-revolution-of-our-times');

  await Document.query().insert({
    name: '光复香港，时代革命', 
  });
  var documents = await Document.query().where('name', '光复香港，时代革命');
  assert.equal(documents[0].slug, 'guangfu-xianggang-shidai-geming');
```

Contributing
------------

If you'd like to contribute a feature or bugfix: Thanks! To make sure your fix/feature has a high chance of being included, please read the following guidelines:

1. Post a [pull request](https://github.com/ballantyne/objection-friendly-id/compare/).
2. Make sure there are tests! We will not accept any patch that is not tested.
   It's a rare time when explicit tests aren't needed. If you have questions
   about writing tests for objection-friendly-id, please open a
   [GitHub issue](https://github.com/ballantyne/objection-friendly-id/issues/new).

And once there are some contributors, then I would like to thank all of [the contributors](https://github.com/ballantyne/objection-friendly-id/graphs/contributors)!

License
-------

It is free software, and may be redistributed under the terms specified in the LICENSE file.

Copyright
-------
© 2019 Scott Ballantyne. See LICENSE for details.
