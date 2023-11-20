import { useRecoilValue } from 'recoil';
import { languageState } from 'atom';
import TRASLATIONS from 'constants/language';

export default function useTranslation() {
  const lang = useRecoilValue(languageState);

  return (key: keyof typeof TRASLATIONS) => {
    return TRASLATIONS[key][lang];
  };
}
