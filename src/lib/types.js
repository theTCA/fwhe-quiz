/**
 * @typedef {Object} Catalog
 * @prop {string} name
 * @prop {Question[]} questions
 */

/**
 * @typedef {Object} Question
 * @prop {number} id
 * @prop {string} question
 * @prop {Choice[]} choices
 * @prop {number | null} image
 * @prop {string[]} tags
 * @prop {QuestionHelp[]} helps
 * @prop {string} [catalog]
 */

/**
 * @typedef {Object} Choice
 * @prop {string} text
 * @prop {boolean} answer
 */

/**
 * @typedef {Object} QuestionHelp
 * @prop {string} name
 * @prop {number} page
 */

module.exports = {};
