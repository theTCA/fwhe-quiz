/**
 * @typedef {Object} Catalog
 * @prop {string} name
 * @prop {Array<Question>} questions
 */

/**
 * @typedef {Object} Question
 * @prop {number} id
 * @prop {string} question
 * @prop {Array<Choice>} choices
 * @prop {number | null} image
 * @prop {Array<string>} tags
 * @prop {Array<QuestionHelp>} help
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

/**
 * @typedef {Object} Help
 * @prop {string} name
 * @prop {string} description
 * @prop {string} file
 * @prop {string} source
 * @prop {string} group
 */

module.exports = {};
