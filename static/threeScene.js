let scene, camera, renderer;
let particles = [];

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, 800/400, 0.1, 1000);
camera.position.z = 10;

renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 400);
document.getElementById("sceneContainer").appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(0.2,16,16);

for(let i=0;i<50;i++){
    const material = new THREE.MeshBasicMaterial();
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.x = (Math.random()-0.5)*10;
    sphere.position.y = (Math.random()-0.5)*10;
    sphere.position.z = (Math.random()-0.5)*10;

    scene.add(sphere);
    particles.push(sphere);
}

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
