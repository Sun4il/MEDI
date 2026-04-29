import * as THREE from "three";

export const createThreeScene = (container) => {
  if (!container) {
    return null;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0x1c7d73, roughness: 0.35, metalness: 0.08 });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  const light = new THREE.DirectionalLight(0xffffff, 1.2);
  light.position.set(2, 2, 2);
  scene.add(light);

  camera.position.z = 4;

  const animate = () => {
    sphere.rotation.y += 0.01;
    sphere.rotation.x += 0.005;
    renderer.render(scene, camera);
    animationFrame = window.requestAnimationFrame(animate);
  };

  let animationFrame = window.requestAnimationFrame(animate);

  return {
    scene,
    camera,
    renderer,
    dispose() {
      window.cancelAnimationFrame(animationFrame);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.innerHTML = "";
    },
  };
};