import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { Text as NativeText, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import Animated from 'react-native-reanimated';

type StyledTextProps = {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'xxl';
  font?: 'bold' | 'regular' | 'medium' | 'semiBold' | 'light' | 'thin';
  variant?: 'text' | 'link' | 'primary' | 'secondary' | 'error';
  style?: StyleProp<TextStyle>;
  animated?: boolean;
  italic?: boolean;
};

/**
 * @returns Text component
 * @param children: React.ReactNode - text
 * @param size: xs | sm | md | lg
 * @param fonts: bold | regular | semibold | light
 * @param variant: text | link | primary | secondary | error
 * @param style: StyleProp<TextStyle> - custom style
 */

const StyledText = ({
  style,
  size = 'md',
  variant = 'text',
  font = 'regular',
  animated,
  italic,
  ...rest
}: StyledTextProps & NativeText['props']) => {
  const sizes: Record<NonNullable<StyledTextProps['size']>, number> = {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 24,
  };

  const fonts: Record<NonNullable<StyledTextProps['font']>, TextStyle['fontWeight']> = {
    bold: 'bold',
    regular: 'normal',
    medium: '500',
    semiBold: '600',
    light: '300',
    thin: '100',
  };

  const variants: Record<NonNullable<StyledTextProps['variant']>, string> = {
    text: Colors.palette.text,
    link: Colors.palette.secondary,
    primary: Colors.palette.primary,
    secondary: Colors.palette.secondary,
    error: Colors.palette.error,
  };

  const fontFamilies = () => {
    if (font === 'bold') {
      return 'SCProBold';
    } else if (font === 'semiBold') {
      return 'SCProSemiBold';
    } else if (font === 'medium') {
      return italic ? 'SCProMediumItalic' : 'SCProMedium';
    } else if (font === 'regular') {
      return 'SCProRegular';
    } else if (font === 'light') {
      return italic ? 'SCProLightItalic' : 'SCProLight';
    } else {
      if (italic) {
        return 'SCProItalic';
      }
    }
  };
  console.log(fontFamilies());
  if (animated) {
    return (
      <Animated.Text
        style={StyleSheet.compose(
          {
            fontSize: sizes[size],
            color: variants[variant],
            fontWeight: fonts[font],
            fontFamily: fontFamilies(),
          },
          style,
        )}
        {...rest}
      />
    );
  }

  return (
    <NativeText
      style={StyleSheet.compose(
        {
          fontSize: sizes[size],
          color: variants[variant],
          fontWeight: fonts[font],
        },
        style,
      )}
      {...rest}
    />
  );
};

export default StyledText;
