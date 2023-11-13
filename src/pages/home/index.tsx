import PostForm from 'components/posts/PostForm';
import PostBox from 'components/posts/PostBox';

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
}

const posts: PostProps[] = [
  {
    id: '1',
    email: 'test@test.com',
    content: 'Hello World',
    createdAt: '2023-09-01T12:00:00.000Z',
    uid: '123123',
  },
  {
    id: '2',
    email: 'test@test.com',
    content: 'Hello World',
    createdAt: '2023-09-01T12:00:00.000Z',
    uid: '123123',
  },
  {
    id: '3',
    email: 'test@test.com',
    content: 'Hello World',
    createdAt: '2023-09-01T12:00:00.000Z',
    uid: '123123',
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab--active">For you</div>
        <div className="home__tab">Following</div>
      </div>
      <PostForm />
      <div className="post">
        {posts?.map((post) => (
          <PostBox post={post} />
        ))}
      </div>
    </div>
  );
}
