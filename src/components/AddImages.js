import React, { Component } from 'react';
import backend from './backend';
import Header from './Header';
import { Grid, Panel, Row, Col } from 'react-bootstrap';
import FaIcon from '@fortawesome/react-fontawesome';
import { Image } from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import ThreeEntryPoint from './threejs/ThreeEntryPoint';

import '../css/images.scss';
import * as THREE from 'three';

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    this.uploadFile(files[i]); // call the function to upload the file
  }
}

class AddImages extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      show3d: false,
      collectionId: props.match.params.id,
      originalTitle: '',
      dropZoneDisabled: false,
      photos: [],
      model3d: {
        top_face: 'barbies/empty',
        right_face: 'barbies/b_right',
        bottom_face: 'barbies/empty',
        left_face: 'barbies/b_left',
        front_face: 'barbies/b_front'
      },
      IMGTYPE: {
        M_U: 'mass_upload',
        B_T: 'box_top_face',
        B_R: 'box_right_face',
        B_B: 'box_bottom_face',
        B_L: 'box_left_face',
        B_F: 'box_front_face'
      }
    };

    this.onDrop = this.onDrop.bind(this);
    this.deleteImg = this.deleteImg.bind(this);
    this.show3d = this.show3d.bind(this);
  }

  show3d() {
    this.setState({show3d: true});
  }

  hide3d() {
    this.setState({show3d: false});
  }

  onDrop(accepted, rejected, imgType) {
    this.uploadFile(accepted[0], imgType);
  }

  deleteImg(imgId) {
    if ( window.confirm('will delete image') ) {
      fetch(`${backend.deletePicture}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          imageId: imgId
        })
      })
      .then(_=>{
        if (_.status === 200) {
          document.getElementById(imgId).animate([
            { opacity: 1, }, 
            { opacity: 0, }
          ], { duration: 750 });

          setTimeout(()=>{
            document.getElementById(imgId).remove();
          },800);
        }
      })
      .catch(err=>{
        console.log('ERROR:', err)
      });
    }
  }

  uploadFile(file, imgType) {
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

        fetch(`${backend.addPicture}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            collection_id: that.state.collectionId,
            collection: 'barbies',
            public_id: response.public_id
          })
        })
        .then(_=>{
          return _.json();
        })
        .then(data=>{
          console.log('response from backend server', data);

          switch(imgType) {
            case that.state.IMGTYPE.M_U:
              that.setState({
                photos: [...that.state.photos].concat({
                  key: response._id,
                  cloudName: 'mycollections',
                  publicId: response.public_id,
                  width: 100,
                  height: 100 })
              });
              break;
            case that.state.IMGTYPE.B_F:
              that.setState({
                model3d:{ front_face: response.public_id }
              });
              break;
            default:
              break;
          }
        })
        .catch(err=>{
          console.log('ERROR>', err);
        });
      }
    }
  }

  componentDidMount() {
    document.addEventListener('click', (e)=>{
      if( e.target.nodeName === 'CANVAS' || Array.from(e.target.classList).indexOf('backdrop') >= 0 ) {
        this.hide3d();
      }
    });

    fetch(`${backend.getCollection}/${this.state.collectionId}`)
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
      console.log('ERROR:', err);
    });

    fetch(`${backend.getPictures}/${this.state.collectionId}`)
    .then(_=>{
      return _.json();
    })
    .then(data=>{
      this.setState({photos:
        data.map(img=>{
          return {
            key: img._id,
            cloudName: 'mycollections',
            publicId: img.public_id,
            width: 100,
            height: 100
          }
        })
      })
    })
    .catch(err=>{
      console.log('ERROR:', err);
    });

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
    const dropzoneRef = React.createRef();

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
                  <h3>Drag images here</h3>
                  <Row>
                    <Col mdOffset={4} md={2}  className="img-placeholder-top"> 
                      <Image cloudName="mycollections" publicId={this.state.model3d.top_face} width="120" height="70" crop="scale" /> 
                    </Col>
                  </Row>
                  <Row>
                    <Col mdOffset={2} md={2} className="img-placeholder-left"> 
                      <Image cloudName="mycollections" publicId={this.state.model3d.left_face} width="120" height="280" crop="scale" /> 
                      <div className="edit">
                        <Dropzone ref={dropzoneRef} onDrop={(accepted, rejected)=>this.onDrop(accepted, rejected, this.state.IMGTYPE.M_U)} style={{'display': 'none'}}>
                            <p>Drop files here.</p>
                        </Dropzone>
                        <button type="button" onClick={() => { dropzoneRef.current.open() }}>
                            <FaIcon icon="edit" size="3x" />
                        </button>
                      </div>
                    </Col>
                    <Col md={2} className="img-placeholder-front"> 
                      <Image cloudName="mycollections" publicId={this.state.model3d.front_face} width="150" height="280" crop="scale" /> 
                      <div className="edit">
                        <Dropzone ref={dropzoneRef} onDrop={(accepted, rejected)=>this.onDrop(accepted, rejected, this.state.IMGTYPE.B_F)} style={{'display': 'none'}}>
                            <p>Drop files here.</p>
                        </Dropzone>
                        <button type="button" onClick={() => { dropzoneRef.current.open() }}>
                            <FaIcon icon="cloud-upload-alt" size="2x" />
                        </button>
                      </div>
                    </Col>
                    <Col md={2} className="img-placeholder-right"> 
                      <Image cloudName="mycollections" publicId={this.state.model3d.right_face} width="120" height="280" crop="scale" /> 
                    </Col>
                  </Row>
                  <Row>
                    <Col mdOffset={4} md={2} className="img-placeholder-bottom"> 
                      <Image cloudName="mycollections" publicId={this.state.model3d.bottom_face} width="120" height="70" crop="scale" /> 
                    </Col>
                  </Row>
                </Col>
                <Col md={4}>
                  <h3>More Pictures</h3>
                  <Row>
                    { this.state.photos.map(img=>(
                      <Col md={4} key={img.key} id={img.publicId} className="pt-3 main-image"> 
                        <Image cloudName={img.cloudName} publicId={img.publicId} width={img.width} height={img.height} crop="scale" className="regular-image"/> 
                        <div className="edit-img">
                          <button type="button" onClick={()=>this.deleteImg(img.publicId)}>
                              <FaIcon icon="minus-circle" />
                          </button>
                        </div>
                      </Col>
                    )) }
                    <Col md={4}>
                      <Dropzone onDrop={(accepted, rejected)=>this.onDrop(accepted, rejected, this.state.IMGTYPE.M_U)} className="dropzone-main" id="dropzone-main">
                        <div className="dropzone-container">
                          <FaIcon icon="cloud-upload-alt" size="2x" />
                          <div>Drop images or click to select</div>
                        </div>
                      </Dropzone>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Panel.Body>
            <Panel.Footer>
              <button onClick={this.show3d}><FaIcon icon={["fab","codepen"]} size="2x" className="mr-3" />view 3D</button>
            </Panel.Footer>
          </Panel>
        </Grid>
        <br /><br /><br /><br />
        { this.state.show3d ? 
          <div className="backdrop">
            <ThreeEntryPoint frontFace={this.state.model3d.front_face} leftFace={this.state.model3d.left_face} rightFace={this.state.model3d.right_face} />
          </div>
         : null }
      </div>
    )
  }
}

export default AddImages;