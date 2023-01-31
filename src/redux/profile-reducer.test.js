import profileReducer, { addPostActionCreator } from './ProfileReducer'

const state = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likeAmount: 4 },
    { id: 2, message: "It's my first post", likeAmount: 1 },
    { id: 3, message: "I'm learning react", likeAmount: 0 },
    { id: 4, message: 'Would you want to learn react?', likeAmount: 5 },
  ],
}

it('length of posts should be incremented', () => {
  // 1. test data
  const action = addPostActionCreator('something')

  // 2. action
  let newState = profileReducer({ state }, { action })

  //3. expectation
  expect(newState.posts.length).toBe(5)
})

it('message of new post should be correct', () => {
  // 1. test data
  const action = addPostActionCreator('something else')

  // 2. action
  let newState = profileReducer({ state }, { action })

  //3. expectation
  expect(newState.posts.message[5]).toBe('something else')
})
