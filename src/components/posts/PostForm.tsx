import { FiImage } from 'react-icons/fi';
import { useContext, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import AuthContext from 'context/AuthContext';
import { db, storage } from 'firebaseApp';
import { v4 as uuidv4 } from 'uuid';
import {
  ref,
  getStorage,
  uploadString,
  getDownloadURL,
} from 'firebase/storage';

export default function PostForm() {
  const [content, setContent] = useState<string>('');
  const [hashTag, setHashTag] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<string | null>('');
  const [tags, setTags] = useState<string[]>([]);
  const { user } = useContext(AuthContext);
  const handleFileUpload = (e: any) => {
    const {
      target: { files },
    } = e;

    const file = files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onloadend = (e: any) => {
      const { result } = e?.currentTarget;
      setImageFile(result);
    };
  };
  const onSubmit = async (e: any) => {
    setIsSubmitting(true);
    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);
    e.preventDefault();
    try {
      //이미지 먼저 업로드
      let imageUrl = '';
      if (imageFile) {
        const data = await uploadString(storageRef, imageFile, 'data_url');
        imageUrl = await getDownloadURL(data?.ref);
      }

      //업로드한 이미지의 다운로드 url을 업데이트

      await addDoc(collection(db, 'posts'), {
        content: content,
        createdAt: new Date()?.toLocaleDateString('ko', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        email: user?.email,
        uid: user?.uid,
        hashTags: tags,
        imageUrl: imageUrl,
      });
      setTags([]);
      setHashTag('');
      setContent('');
      toast.success('포스트가 작성되었습니다.');
      setIsSubmitting(false);
      setImageFile(null);
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

  const onChangeHashTag = (e: any) => {
    setHashTag(e?.target?.value);
  };

  const removeTag = (tag: string) => {
    setTags(tags?.filter((val) => val !== tag));
  };

  const handleKeyUp = (e: any) => {
    if (e.keyCode === 32 && e.target.value.trim() !== '') {
      if (tags?.includes(e.target.value.trim())) {
        toast.error('이미 존재하는 태그입니다.');
        return;
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag('');
      }
    }
  };

  const handleDeleteImage = () => {
    setImageFile(null);
  };

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
      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="post-form__hashtags-tag"
              onClick={() => removeTag(tag)}>
              #{tag}
            </span>
          ))}
        </span>

        <input
          className="post-form__input"
          name="hashtag"
          id="hashtag"
          placeholder="해시태그 + 스페이스바 입력"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp}
          value={hashTag}
        />
      </div>
      <div className="post-form__submit-area">
        <div className="post-form__image-area">
          <label htmlFor="file-input" className="post-form__file">
            <FiImage className="post-form__file-icon" />
          </label>
          <input
            type="file"
            name="file-input"
            id="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          {imageFile && (
            <div className="post-form__attachment">
              <img src={imageFile} alt="attachment" width={100} height={100} />
              <button
                className="post-form__clear-btn"
                type="button"
                onClick={handleDeleteImage}>
                Clear
              </button>
            </div>
          )}
        </div>
        <input
          type="submit"
          value="Tweet"
          className="post-form__submit-btn"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
