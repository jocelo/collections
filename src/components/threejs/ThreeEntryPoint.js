import React from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

const ThreeImageContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 25%;
`

class ThreeEntryPoint extends React.Component {
	constructor(props) {
		super(props);
		console.log('props', props);
		this.state = {
			cloudinaryUrl: 'https://res.cloudinary.com/mycollections/image/upload/v1531314948',
			leftFace: props.leftFace || 'empty',
			rightFace: props.rightFace || 'empty',
			frontFace: props.frontFace || 'empty',
			backFace: props.backFace || 'empty',
			topFace: props.topFace || 'empty',
			bottomFace: props.bottomFace  || 'empty'
		}
	}

	componentDidMount(){
		const that = this;
		var camera, scene, renderer;
			var mesh;
			init();
			animate();

			function init() {
				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 400;
				scene = new THREE.Scene();
				var loader = new THREE.TextureLoader();

				// mesh order:
				// 1) right face
				// 2) left face
				// 3) 
				// 4) 
				// 5) front face
				// 6) back facehttps://res.cloudinary.com/mycollections/image/upload/v1531314947/barbies/empty.jpg

				var materials = [ 
					new THREE.MeshBasicMaterial( { map: loader.load(`${that.state.cloudinaryUrl}/${that.state.rightFace}`)}),
					new THREE.MeshBasicMaterial( { map: loader.load(`${that.state.cloudinaryUrl}/${that.state.leftFace}`)}),
					new THREE.MeshBasicMaterial( { map: loader.load('https://res.cloudinary.com/mycollections/image/upload/v1542425269/three.png')}),
					new THREE.MeshBasicMaterial( { map: loader.load('https://res.cloudinary.com/mycollections/image/upload/v1542425269/four.png')}),
					new THREE.MeshBasicMaterial( { map: loader.load(`${that.state.cloudinaryUrl}/${that.state.frontFace}`)}),
					new THREE.MeshBasicMaterial( { map: loader.load(`${that.state.cloudinaryUrl}/${that.state.backFace}`)})
				];

				var geometry = new THREE.BoxBufferGeometry( 200, 400, 100 );

				mesh = new THREE.Mesh( geometry, materials );
				scene.add( mesh );
				renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
				// renderer.setClearColor( 0x000000, 0.5 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth*.5, window.innerHeight*.8 );
				document.getElementById('canvasElement').appendChild( renderer.domElement );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth*.5, window.innerHeight*.5 );
			}
			function animate() {
				requestAnimationFrame( animate );
				//mesh.rotation.x += 0.005;
				mesh.rotation.y += 0.01;
				renderer.render( scene, camera );
			}

	}
	render() {
		return <ThreeImageContainer id="canvasElement"></ThreeImageContainer>
	}
}

export default ThreeEntryPoint