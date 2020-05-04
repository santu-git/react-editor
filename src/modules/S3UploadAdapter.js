import S3 from 'react-aws-s3';
//import S3 from 'aws-s3';
class S3UploadAdapter {

    constructor( loader ) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {

        return this.loader.file
            .then( file => new Promise( ( resolve, reject ) => {
                //console.log(file);
                this._initRequest(file);
                //this._initListeners( resolve, reject, file );
                //this._sendRequest( file );
            } ) );
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    // Initializes the XMLHttpRequest object using the URL passed to the constructor.
    _initRequest(file) {
      const config = {
        bucketName: 'scoutlive',
        //dirName: 'answers', /* optional */
        region: 'sgp1',
        accessKeyId: 'HYCDCKQDWEOHPWRFQE4P',
        secretAccessKey: '9GWAmxtF4+uR+cNyw28c+cV4q806ogDmu3q/SiybwGM',
        s3Url: 'https://sgp1.digitaloceanspaces.com', /* optional */
      }
      const s3Client = this.s3Client = new S3(config);
      const newFileName= Date.now();
      s3Client.uploadFile(file, newFileName).then(data => console.log(data)).catch(err => console.error(err))
    }
}

// ...

export default function S3UploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new S3UploadAdapter( loader );
    };
}
