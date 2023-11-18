import { useContext, useEffect, useState } from 'react';
import PostBox from 'components/posts/PostBox';
import { PostProps } from 'pages/home';
import AuthContext from 'context/AuthContext';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from 'firebaseApp';

export default function SearchPage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tagQuery, setTagQuery] = useState<string>('');
  const { user } = useContext(AuthContext);

  const onChange = (e: any) => {
    setTagQuery(e?.target?.value?.trim());
  };

  useEffect(() => {
    if (user) {
      let postRef = collection(db, 'posts');
      let postQuery = query(
        postRef,
        // where('hashTags', 'array-contains-any', [tagQuery]), 얘가 도무지 작동을 안한다.
        orderBy('createdAt', 'desc')
      );

      onSnapshot(postQuery, (snapshot) => {
        let dataObj = snapshot?.docs?.map((doc) => ({
          ...doc?.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostProps[]);
      });
    }
  }, [user, tagQuery]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">
          <div className="home__title-text">Search</div>{' '}
        </div>
        <div className="home__search-div">
          <input
            className="home__search"
            placeholder="해시태그 검색"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="post">
        {posts?.length > 0 ? (
          posts?.map((post) => <PostBox post={post} key={post.id} />)
        ) : (
          <div className="post__no-posts">
            <div className="post__text">게시글이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}
