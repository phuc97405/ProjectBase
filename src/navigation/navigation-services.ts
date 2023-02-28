import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
  TabActions,
  NavigationState,
  PartialState,
} from '@react-navigation/native';
import {RootStackParamList} from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

class NavigationServices {
  currentScreen: string = '';
  pushTo = (routeName: string, params?: any): void => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(routeName, params));
    }
  };

  navigate = (routeName: any, params?: any): void => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(routeName, params);
    }
  };
  jumpTo = (routeName: string, params?: any): void => {
    if (navigationRef.isReady()) {
      const tabActions = TabActions.jumpTo(routeName, params);
      navigationRef.dispatch(tabActions);
    }
  };

  back = (): void => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(CommonActions.goBack());
    }
  };
  popToTop = () => {
    if (navigationRef.isReady()) {
      const popToTopAction = StackActions.popToTop();
      navigationRef.dispatch(popToTopAction);
    }
  };

  replace = (routeName: any, params?: any, index?: number) => {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: index || 0,
          routes: [{name: routeName, params}],
        }),
      );
    }
  };

  setParam = (params: any, route: string) => {
    if (navigationRef.isReady()) {
      if (route) {
        navigationRef.dispatch({
          ...CommonActions.setParams(params),
          source: route,
        });
      } else navigationRef.dispatch(CommonActions.setParams(params));
    }
  };

  getActiveRouteName(
    navigationState: NavigationState | PartialState<NavigationState>,
  ): string {
    const route = navigationState.routes[navigationState.index || 0];
    if (route.state) {
      return this.getActiveRouteName(route.state);
    }
    return route.name;
  }

  handleNavigationStateChange(state?: NavigationState): void {
    if (!state) {
      return;
    }
    const currentScreen = this.getActiveRouteName(state);
    this.currentScreen = currentScreen;
  }

  getParam = (route: any, key: string, defaultValue?: any) => {
    try {
      if (route) {
        const param = route.param[key];
        if (param) return param;
        return defaultValue;
      } else {
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  };
}

const navigationServices = new NavigationServices();
export {navigationServices};
