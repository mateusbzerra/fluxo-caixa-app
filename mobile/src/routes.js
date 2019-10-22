import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/Login';
import List from './pages/List';
import Add from './pages/Add';
export default createAppContainer(createSwitchNavigator({ Login, List, Add }));
