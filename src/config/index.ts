import { StatusBar, Platform, Dimensions } from 'react-native';
import utils from '~/utils';

//屏幕宽高
const {width, height} = Dimensions.get('window');
//状态栏高度
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? (utils.isIphoneX() ? 44 : 20) : StatusBar.currentHeight;

const JISUKEY = '62871647e0add123'

export {
  width,
  height,
  STATUSBAR_HEIGHT,
  JISUKEY
}