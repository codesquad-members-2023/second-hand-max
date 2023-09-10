import 'styled-components';
import { Theme } from '@design/designSystem';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
