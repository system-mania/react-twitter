import { FiImage } from 'react-icons/fi';
import { useCallback, useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from 'firebaseApp';
import { useNavigate, useParams } from 'react-router-dom';
import { PostProps } from 'pages/home';

export default function PostEditForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();
  const handleFileUpload = () => {};
  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, 'posts', params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap?.id });
      setContent(docSnap?.data()?.content);
    }
  }, [params.id]);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (post) {
        const postRef = doc(db, 'posts', post.id);
        await updateDoc(postRef, {
          content: content,
        });
        navigate(`/posts/${post?.id}`);
        toast.success('포스트를 수정했습니다.');
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'content') {
      setContent(value);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [getPost, params.id]);

  return (
    <form action="" className="post-form" onSubmit={onSubmit}>
      <textarea
        name="content"
        id="content"
        className="post-form__textarea"
        required
        placeholder="What is happening?"
        onChange={onChange}
        value={content}
      />
      <div className="post-form__submit-area">
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
        </label>
        <input
          type="file"
          name="file-input"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <input type="submit" value="수정" className="post-form__submit-btn" />
      </div>
    </form>
  );
}
