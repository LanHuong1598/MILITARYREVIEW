
import React, { Fragment, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from 'redux/storeConfig/store'
import { useSelector } from 'react-redux'
// ** International Language
import { IntlProviderWrapper } from './utils/context/Internationalization'
// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
import Loader from "react-loader-spinner";
import Router from "router/Router";
// ** Lazy load app
const LazyApp = lazy(() => import('./router/Router'))
ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Loader type="ThreeDots" color="#e81d1d" height="100" width="100" />}>
      <IntlProviderWrapper>
        <LazyApp />
      </IntlProviderWrapper>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);
