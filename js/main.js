'use strict';

init();

function init() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer( { antialias: true } );

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const light = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
  light.position.set( 50, 50, 50 );
  scene.add( light );

  const geometry = new THREE.BoxGeometry( 5, 5, 5 );
  const material = new THREE.MeshLambertMaterial({color: 0xffffff, ambient: 0x121212, emissive:0x121212});
  const cube = new THREE.Mesh( geometry, material );

  scene.add( cube );

  camera.position.y = 5;
  camera.position.z = 15;

  const controls = new THREE.OrbitControls( camera, renderer.domElement );

  function render() {
    requestAnimationFrame( render );
    cube.rotation.x += 0.013;
    cube.rotation.y += 0.005;
    controls.update();
    renderer.render( scene, camera );
  }

  render();

  window.addEventListener("resize", () => {
    onWindowResize(camera, renderer, scene);
  });
}

function onWindowResize(camera, renderer, scene) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.render( scene, camera );
}
