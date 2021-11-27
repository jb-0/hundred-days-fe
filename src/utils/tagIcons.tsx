import * as React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PermittedTags } from '../types';

export const tagIcons: Record<PermittedTags, { label: string; icon: JSX.Element }> = {
  html: { label: 'HTML', icon: <FontAwesome5 name="html5" size={24} color="black" /> },
  css: { label: 'CSS', icon: <FontAwesome5 name="css3" size={24} color="black" /> },
  javascript: { label: 'JavaScript', icon: <Ionicons name="logo-javascript" size={24} color="black" /> },
  react: { label: 'React', icon: <FontAwesome5 name="react" size={24} color="black" /> },
  angular: { label: 'Angular', icon: <FontAwesome5 name="angular" size={24} color="black" /> },
  vue: { label: 'Vue', icon: <FontAwesome5 name="vuejs" size={24} color="black" /> },
  typescript: {
    label: 'TypeScript',
    icon: <MaterialCommunityIcons name="language-typescript" size={24} color="black" />,
  },
  node: { label: 'NodeJS', icon: <FontAwesome5 name="node-js" size={24} color="black" /> },
  python: { label: 'Python', icon: <FontAwesome5 name="python" size={24} color="black" /> },
};
