import { createStore } from 'vuex'
import {
  testData, testPosts, ColumnProps, PostProps,
} from './testData'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: false },
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'xiao' }
    },
  },
  getters: {
    biggerColumnsLen(state) {
      return state.columns.filter((c) => c.id > 2).length
    },
    getColumnById: (state) => (id: number) => state.columns.find((c) => c.id === id),
    getPostsByCid: (state) => (cid: number) => state.posts.filter((post) => post.columnId === cid),
  },
})

export default store
