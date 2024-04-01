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
 * @prop {QuestionHelp[]} help
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

/**
 * @typedef {Object} QuizHistory
 * @prop {Question} question
 * @prop {string} answer
 * @prop {Date} date
 */

module.exports = {};