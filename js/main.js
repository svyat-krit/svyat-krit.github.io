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

  const geometry = new THREE.BoxGeometry( 2, 2, 2 );
  const material = new THREE.MeshLambertMaterial({color: 0xffffff, ambient: 0x121212, emissive:0x121212});

  const cubeArray = [];

  for (let i = 0; i < 1000; i++) {
    const cube = new THREE.Mesh( geometry, material );

    cube.position.x = Math.random() * 400 * (Math.random() > 0.5 ? 1 : -1);
    cube.position.y = Math.random() * 400 * (Math.random() > 0.5 ? 1 : -1);
    cube.position.z = Math.random() * 400 * (Math.random() > 0.5 ? 1 : -1);
    
    cubeArray.push(cube); 

    scene.add( cube );
  }

  camera.position.y = 5;
  camera.position.z = 15;

  const controls = new THREE.OrbitControls( camera, renderer.domElement );

  function render() {
    requestAnimationFrame( render );

    for (let i = 0; i < cubeArray.length; i++) {
      cubeArray[i].rotation.x += Math.random() / 200;
      cubeArray[i].rotation.y += 0.001;
    }

    controls.update();
    renderer.render( scene, camera );
  }

  render();

  window.addEventListener("resize", () => {
    onWindowResize(camera, renderer, scene);
  });
  
  window.addEventListener("mousemove", (event) => {
    scene.position.x = (event.clientX - window.innerWidth / 2) / 20;
    scene.position.y = (event.clientY - window.innerHeight / 2) / 20;
  });
}

function onWindowResize(camera, renderer, scene) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.render( scene, camera );
}
