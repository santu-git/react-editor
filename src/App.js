import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import SpacesUploadAdapterPlugin from './modules/SpacesUploadAdapter';
class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Using CKEditor 5 build in React</h2>
        <div className="App-editor-container">
          <CKEditor
            editor={ ClassicEditor }
            config={{
              extraPlugins: [SpacesUploadAdapterPlugin]
            }}
            onInit={ editor => {
              // You can store the "editor" and use when it is needed.

            } }
            onChange={ ( event, editor ) => {
              const data = editor.getData();
              console.log( { event, editor, data } );
            } }
            onBlur={ ( event, editor ) => {
              console.log( 'Blur.', editor );
            } }
            onFocus={ ( event, editor ) => {
              console.log( 'Focus.', editor );
            } }
          />
        </div>
        <div> I am SANTU</div>
      </div>
    );
  }
}

export default App;
