import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';

import awsConfig from './aws-exports';

import Application from './Application';

import './index.css';

Amplify.configure(awsConfig);

ReactDOM.render(<Application />, document.getElementById('root'));
