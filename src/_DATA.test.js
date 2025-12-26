import { describe, test, expect } from 'vitest'
import { _saveQuestion, _saveQuestionAnswer } from './_Data.js'

describe('_DATA.js', () => {
  describe('_saveQuestion', () => {
    test('should return the saved question with all expected fields when correctly formatted data is passed', async () => {
      const question = {
        optionOneText: 'Option One',
        optionTwoText: 'Option Two',
        author: 'sarahedo'
      }

      const result = await _saveQuestion(question)

      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('timestamp')
      expect(result).toHaveProperty('author', 'sarahedo')
      expect(result).toHaveProperty('optionOne')
      expect(result.optionOne).toHaveProperty('votes')
      expect(result.optionOne).toHaveProperty('text', 'Option One')
      expect(result).toHaveProperty('optionTwo')
      expect(result.optionTwo).toHaveProperty('votes')
      expect(result.optionTwo).toHaveProperty('text', 'Option Two')
      expect(Array.isArray(result.optionOne.votes)).toBe(true)
      expect(Array.isArray(result.optionTwo.votes)).toBe(true)
    })

    test('should return an error if incorrect data is passed', async () => {
      const invalidQuestion = {
        optionOneText: 'Option One',
        author: 'sarahedo'
        // missing optionTwoText
      }

      await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
        "Please provide optionOneText, optionTwoText, and author"
      )
    })
  })

  describe('_saveQuestionAnswer', () => {
    test('should return true and save the answer when correctly formatted data is passed', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: 'vthrdm985a262al8qx3do',
        answer: 'optionOne'
      }

      const result = await _saveQuestionAnswer(answerData)

      expect(result).toBe(true)
    })

    test('should return an error if incorrect data is passed', async () => {
      const invalidAnswerData = {
        authedUser: 'sarahedo',
        qid: 'vthrdm985a262al8qx3do'
        // missing answer
      }

      await expect(_saveQuestionAnswer(invalidAnswerData)).rejects.toEqual(
        "Please provide authedUser, qid, and answer"
      )
    })
  })
})
