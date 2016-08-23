import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/Application.react';
import AppUtils from './utils/AppUtils';

AppUtils.initializeImgArrangeArr();

// Render the main component into the dom
ReactDOM.render(<AppComponent />, document.getElementById('app'));
