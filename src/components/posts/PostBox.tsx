import AuthContext from 'context/AuthContext';
import { PostProps } from 'pages/home';
import { AiFillHeart } from 'react-icons/ai';
import { FaRegComment, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { toast } from 'react-toastify';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { storage } from 'firebaseApp';

interface PostBoxProps {
  post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const imageRef = ref(storage, post?.imageUrl);

  const handleDelete = async () => {
    if (window.confirm('해당 게시글을 삭제하시겠습니까')) {
      //스토리지에서 이미지 삭제

      if (post?.imageUrl) {
        await deleteObject(imageRef).catch((err) => {
          console.log(err);
        });
      }

      await deleteDoc(doc(db, 'posts', post?.id));
      toast.success('게시글이 삭제되었습니다');
      navigate('/');
    }
  };

  return (
    <div className="post__box" key={post?.id}>
      <Link to={`/posts/${post?.id}`}>
        <div className="post__box-profile">
          <div className="post__flex">
            {post?.profileUrl ? (
              <img
                src={post?.profileUrl}
                alt="profile"
                className="post__box-profile-img"
              />
            ) : (
              <FaUserCircle className="post__box-profile-icon"></FaUserCircle>
            )}
            <div className="post__email">{post?.email}</div>
            <div className="post__createdAt">{post?.createdAt}</div>
          </div>
          <div className="post__box-content">{post?.content}</div>
          {post?.imageUrl && (
            <div className="post__image-div">
              <img
                src={post?.imageUrl}
                alt="post img"
                className="post__img"
                width={100}
                height={100}
              />
            </div>
          )}
          <div className="post-form__hashtags-outputs">
            {post?.hashTags?.map((tag: string, index: number) => (
              <span className="post-form__hashtags-tag" key={index}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="post__box-footer">
        {user?.uid === post?.uid && (
          <button type="button" className="post__delete" onClick={handleDelete}>
            Delete
          </button>
        )}
        <>
          <button type="button" className="post__edit">
            <Link to={`/posts/edit/${post?.id}`}>Edit</Link>
          </button>
        </>
        <button type="button" className="post__likes">
          <AiFillHeart />
          {post?.likeCount || 0}
        </button>
        <button type="button" className="post_comments">
          <FaRegComment />
          {post?.comments?.length || 0}
        </button>
      </div>
    </div>
  );
}
