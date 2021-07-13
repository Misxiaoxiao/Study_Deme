export interface ColumnProps {
  id: number;
  title: string;
  description: string;
  avatar?: string;
}

export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}

export const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1的专栏，有一段非常有意思的简介，可以更新一下',
    avatar: '',
  },
  {
    id: 2,
    title: 'test1的专栏',
    description: '这是test2的专栏，有一段非常有意思的简介，可以更新一下',
    avatar: '',
  },
  {
    id: 3,
    title: 'test1的专栏',
    description: '这是test3的专栏，有一段非常有意思的简介，可以更新一下',
    avatar: '',
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是test1的专栏，有一段非常有意思的简介，可以更新一下',
    avatar: '',
  },
]

export const testPosts: PostProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    content: 'Post volum promissa memini culus adeptione cupis; quem pollicitus est aversione aversi et',
    createdAt: '2020-05-20',
    columnId: 1,
  },
]
