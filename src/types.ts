export interface User {
  id: string
  name: string
  avatarURL: string
  answers: { [qid: string]: 'optionOne' | 'optionTwo' }
  questions: string[]
}

export interface Question {
  id: string
  author: string
  timestamp: number
  optionOne: {
    votes: string[]
    text: string
  }
  optionTwo: {
    votes: string[]
    text: string
  }
}

export interface Users {
  [id: string]: User
}

export interface Questions {
  [id: string]: Question
}