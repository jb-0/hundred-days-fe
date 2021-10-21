import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextProps } from '@ui-kitten/components';

interface ITranslatedTextProps extends TextProps {
  tKey: string;
}

const TranslatedText: React.FunctionComponent<ITranslatedTextProps> = ({ tKey, ...rest }: ITranslatedTextProps) => {
  const { t } = useTranslation();

  return (
    <Text {...rest}>
      <>{t(tKey)}</>
    </Text>
  );
};

export default TranslatedText;
