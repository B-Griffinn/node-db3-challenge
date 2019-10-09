// Imports
const knex = require('knex'); // knex library
const knexConfig = require('../knexfile.js'); //our knex file is our configuration
const db = knex(knexConfig.development);


// export the model fucntions
module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');
}

/**
 - `findById(id)`:
  - Expects a scheme `id` as its only parameter.
  - Resolve to a single scheme object.
  - On an invalid `id`, resolves to `null`.
 */
function findById(id) {
    return db('schemes')
    .where({id}).first();
}

/**
 - `findSteps(id)`:
  - Expects a scheme `id`.
  - Resolves to an array of all correctly ordered step for the given scheme: `[ { id: 17, scheme_name: 'Find the Holy Grail', step_number: 1, instructions: 'quest'}, { id: 18, scheme_name: 'Find the Holy Grail', step_number: 2, instructions: '...and quest'}, etc. ]`.
  - This array should include the `scheme_name` _not_ the `scheme_id`.
 */
function findSteps(id) {
    return db('steps as s')
    .join('schemes as sc', 's.scheme_id', 'sc.id')
    .select('s.id', 'sc.scheme_name', 's.step_number', 's.instructions')
    .where('s.scheme_id', '=', id)
    .orderBy('s.step_number')
}

/**
 `add(scheme)`:
  - Expects a scheme object.
  - Inserts scheme into the database.
  - Resolves to the newly inserted scheme, including `id`.
 */
function add(schemeData) {
    return db('schemes').insert(schemeData)
    .then(id => {
        return findById(id[0])
    })
}

// function addStep() {
//     return null;
// }

/*
`update(changes, id)`:
  - Expects a changes object and an `id`.
  - Updates the scheme with the given id.
  - Resolves to the newly updated scheme object.

  my SQL:
    UPDATE schemes
    SET scheme_name = "New Name"
    WHERE id = 5
*/
// id = req.params.id
// obj = req.body
function update(obj, id) {
    return db('schemes')
    .update('scheme_name', obj.scheme_name)
    .where({id})
    .then(() => {
        return findById(id)
    })
}

/*
`remove(id)`:
  - Removes the scheme object with the provided id.
  - Resolves to the removed scheme
  - Resolves to `null` on an invalid id.
  - (Hint: Only worry about removing the `scheme`. The database is configured to automatically remove all associated steps.)
*/
function remove() {
    return null;
}
