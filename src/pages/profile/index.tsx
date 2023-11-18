import PostBox from 'components/posts/PostBox';
import AuthContext from 'context/AuthContext';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostProps } from 'pages/home';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PROFILE_DEFAULT_URL =
  'https://firebasestorage.googleapis.com/v0/b/react-twitter-3e8cd.appspot.com/o/J3GFtJ05N0MKcZEKIoeS0yOkTD22%2Flogo512.png?alt=media&token=5a9764f6-e7a0-4d8b-aa91-69d81c0b1c86';

export default function ProfilePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      let postRef = collection(db, 'posts');
      let PostQuery = query(
        postRef,
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      onSnapshot(PostQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostProps[]);
      });
    }
  }, [user]);

  return (
    <div className="home">
      <div className="home__top">
        <div className="home__title">Profile</div>
        <div className="profile">
          <img
            src={user?.photoURL || PROFILE_DEFAULT_URL}
            alt="profile"
            className="profile__image"
            width={100}
            height={100}
          />
          <button
            type="button"
            className="profile__btn"
            onClick={() => navigate('/profile/edit')}>
            프로필 수정
          </button>
        </div>
        <div className="profile__text">
          <div className="profile__name">{user?.displayName || '사용자님'}</div>
          <div className="profile__email">{user?.email}</div>
        </div>
        <div className="home__tabs">
          <div className="home__tab home__tab--active">For you</div>
          <div className="home__tab">Likes</div>
        </div>
        <div className="post">
          {posts.length > 0 ? (
            posts.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">게시글이 없습니다.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
