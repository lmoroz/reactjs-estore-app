import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';
import App from './components/App';
import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';

const repo = (window.location.pathname.match(/\/.+\//)) ? `/${window.location.pathname.split('/')[1]}` : '';
const StorePickerPath = `${repo}/`;
const storePath = `${repo}/store/:storeId`;
console.log({
  StorePickerPath,
  storePath
});
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern={StorePickerPath} component={StorePicker} />
        <Match pattern={storePath} component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#main'));
