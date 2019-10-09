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
    addStep,
    update,
    remove
}

function find() {
    return db('schemes');
}

function findById() {
    return null;
}

function findSteps() {
    return null;
}

function add() {
    return null;
}

function addStep() {
    return null;
}

function update() {
    return null;
}

function remove() {
    return null;
}
