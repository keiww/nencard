const EMPTY_STORE = {
  level: 0, // 0,1,2,3,4,5
  finished: []
}

const LOCAL_STORE_KEY = 'REMBMER_WORDS'

export let db = {}

export const initStore = (data) => {
  db = data
}

const getLocalStore = () => {
  let data
  const jsonString = window.localStorage.getItem(LOCAL_STORE_KEY)
  if (!jsonString) {
    data = EMPTY_STORE
    updateLocalStore(data)
  } else {
    data = JSON.parse(jsonString)
  }
  return data
}

const updateLocalStore = (data) => {
  window.localStorage.setItem(LOCAL_STORE_KEY, JSON.stringify(data))
}

export const getFinishedWordsIds = () => {
  const store = getLocalStore()
  return store.finished
}

export const getFinishPercent = () => {
  if (db) {
    return Math.ceil(1 - getFinishedWordsIds().length / db.length) * 100
  } else {
    return 100
  }
}

export const finishWord = (word) => {
  const store = getLocalStore()
  store.finished.push(word.uuid)
  updateLocalStore(store)
}

export const getRandomWord = () => {
  return db[Math.floor(Math.random() * db.length)]
}

export const getRandomColor = () => {
  const colors = ['#d11141', '#f37736', '#78ad3b', '#0392cf', '#0e9aa7', '#2a4d69', '#283655', '#4b3832']
  const color = colors[Math.floor(Math.random() * colors.length)]
  return color
}
