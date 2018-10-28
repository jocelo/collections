import React, { Component } from 'react';
import backend from './backend';
import Header from './Header';
import { Grid, Panel, Row, Col } from 'react-bootstrap';
import FaIcon from '@fortawesome/react-fontawesome';
import { Image } from 'cloudinary-react';
import Dropzone from 'react-dropzone';

import '../css/images.scss';

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    this.uploadFile(files[i]); // call the function to upload the file
  }
}

class AddImages extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      originalTitle: '',
      dropZoneDisabled: false,
      photos: [
        { key: 1,
          cloudName: 'mycollections',
          publicId: 'barbies/barbie_1',
          width: 100,
          height: 100
        }, {
          key: 2,
          cloudName: 'mycollections',
          publicId: 'barbies/barbie_2',
          width: 100,
          height: 100
        }, {
          key: 3,
          cloudName: 'mycollections',
          publicId: 'barbies/barbie_3',
          width: 100,
          height: 100
        }
      ]
    };

    //this.uploadFile = this.uploadFile.bind(this);
  }

  onDrop(files) {
    console.log('caquita dropped');
    console.log(files);
    this.uploadFile(files[0]);
  }

  uploadFile(file) {
    const that = this;

    var url = `https://api.cloudinary.com/v1_1/mycollections/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    fd.append('upload_preset', 'default-preset');
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', file);
    console.log('sending this into space');
    xhr.send(fd);

    // Reset the upload progress bar
    // document.getElementById('progress').style.width = 0;
    
    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", function(e) {
      // var progress = Math.round((e.loaded * 100.0) / e.total);
      // document.getElementById('progress').style.width = progress + "%";
      document.getElementById('caquita-here').append('que pasa aqui');
    });

    xhr.onreadystatechange = function(e) {
      console.log('on ready state change');
      if (xhr.readyState === 4 && xhr.status === 200) {
        // File uploaded successfully
        var response = JSON.parse(xhr.responseText);
        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
        // var url = response.secure_url;
        // Create a thumbnail of the uploaded image, with 150px width
        // var tokens = url.split('/');
        // tokens.splice(-2, 0, 'w_150,c_scale');
        //var img = new Image(); // HTML5 Constructor
        //img.src = tokens.join('/');
        //img.alt = response.public_id;
        console.log('response from cloudinary', response);

        fetch(`${backend.addPicture}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            collection: 'barbies',
            public_id: response.public_id
          })
        })
        .then(_=>{
          return _.json();
        })
        .then(data=>{
          console.log('response from backend server', data);
          that.setState({
            photos: [...that.state.photos].concat({
              key: 4,
              cloudName: 'mycollections',
              publicId: response.public_id,
              width: 100,
              height: 100 })
          })
          console.log('adding another picture one:', that.state.photos);
        })
        .catch(err=>{
          console.log('ERROR>', err);
        });
      }
    }
  }

  componentDidMount() {
    fetch(`${backend.getCollection}${this.props.match.params.id}`)
    .then(_=>{
      return _.json();
    })
    .then(data=>{
      this.setState({
        originalTitle: data.name,
        category: data.category_name || 'No category'
      });
    })
    .catch(err=>{
      console.log('ERROR>', err);
    });

    fetch(`${backend.getPictures}`)
    .then(_=>{
      return _.json();
    })
    .then(data=>{
      console.log('this are the retrieved images', data);
    })
    .catch(err=>{
      console.log('ERROR>', err);
    });

/*
    document.getElementById("fileSelect").addEventListener("click", function(e) {
      if (document.getElementById("fileElem")) {
        document.getElementById("fileElem").click();
      }
      e.preventDefault();
    }, false);
*/
    function dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function dragover(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function drop(e) {
      e.stopPropagation();
      e.preventDefault();

      var dt = e.dataTransfer;
      var files = dt.files;

      handleFiles(files);
    }

    var dropbox = document.getElementById("dropzone-main");
    dropbox.addEventListener("dragenter", dragenter, false);
    dropbox.addEventListener("dragover", dragover, false);
    dropbox.addEventListener("drop", drop, false);
  }

  render() {
    return (
      <div>
        <Header />
        <Grid className="mt-5">
          <Panel bsStyle="info">
            <Panel.Heading>
              <Panel.Title componentClass="h3"><strong>{this.state.originalTitle}</strong> ({this.state.category}) </Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Row>
                <Col md={8}>
                  Drag images here
                  <Row>
                    <Col mdOffset={4} md={2}  className="img-placeholder-top"> <Image cloudName="mycollections" publicId="barbies/empty" width="120" height="70" crop="scale" /> </Col>
                  </Row>
                  <Row>
                    <Col mdOffset={2} md={2} className="img-placeholder-left"> <Image cloudName="mycollections" publicId="barbies/b_left" width="120" height="280" crop="scale" /> </Col>
                    <Col md={2} className="img-placeholder-front"> <Image cloudName="mycollections" publicId="barbies/b_front" width="150" height="280" crop="scale" /> </Col>
                    <Col md={2} className="img-placeholder-right"> <Image cloudName="mycollections" publicId="barbies/b_right" width="120" height="280" crop="scale" /> </Col>
                  </Row>
                  <Row>
                    <Col mdOffset={4} md={2} className="img-placeholder-bottom"> <Image cloudName="mycollections" publicId="barbies/empty" width="120" height="70" crop="scale" /> </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  More Pictures
                  <div id="caquita-here"></div>
                  <Row>
                    { this.state.photos.map(img=>(
                      <Col md={4} key={img.key} className="pt-3 main-image"> <Image cloudName={img.cloudName} publicId={img.publicId} width={img.width} height={img.height} crop="scale" /> </Col>
                    )) }
                    <Col md={4}>
                      <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone-main" id="dropzone-main">
                        <div className="dropzone-container">
                          <FaIcon icon="cloud-upload-alt" size="3x" />
                          <div>drop some files or click to select files</div>
                        </div>
                      </Dropzone>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Panel.Body>
            <Panel.Footer>
              <button><FaIcon icon={["fab","codepen"]} size="2x" className="mr-3" />view 3D</button>
            </Panel.Footer>
          </Panel>
        </Grid>
        <br /><br /><br /><br />
      </div>
    )
  }
}

export default AddImages;