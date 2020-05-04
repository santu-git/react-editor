//import S3 from 'react-aws-s3';
import AWS from 'aws-sdk';
class SpacesUploadAdapter {

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
        dirName: 'answers', /* optional */
        region: 'sgp1',
        accessKeyId: 'HYCDCKQDWEOHPWRFQE4P',
        secretAccessKey: '9GWAmxtF4+uR+cNyw28c+cV4q806ogDmu3q/SiybwGM',
        baseUrl: 'https://sgp1.digitaloceanspaces.com', /* optional */
      }
      const spacesEndpoint = new AWS.Endpoint(config.region + '.digitaloceanspaces.com');
      const s3 = new AWS.S3({
      //AWS.config.update({
        endpoint: spacesEndpoint,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
      });
      console.log(s3);
      const currentTimstamp = Date.now();
      const params = {
        Bucket: 'scoutlive',
        Key: currentTimstamp.toString(),
        Body: file,
        ACL: "public-read"
      }

      /*var upload = new AWS.S3.ManagedUpload({
          params:{
            Bucket: 'scoutlive',
            Key: currentTimstamp.toString(),
            Body: file,
            ACL: "public-read"
          }
      });*/
      var upload = s3.upload(params)
      var promise = upload.promise();
      promise.then(
        function(data) {
          alert("Successfully uploaded photo.");
          //viewAlbum(albumName);
        },
        function(err) {
          console.log(err);
          //return alert("There was an error uploading your photo: ", err.message);
        }
      );
    }
}

// ...

export default function SpacesUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new SpacesUploadAdapter( loader );
    };
}
