const $ = require('jquery');
const THREE = require('three');

class SceneManager {
  constructor(){
    this.objects = [];
    this.createScene();

    $(window).resize(() => {
      this.resize( $(window).width(), $(window).height() );
    })
  }

  resize(w,h){
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  createScene(){
    this.scene = new THREE.Scene();

    this.scene.fog = new THREE.FogExp2(0x151d1e, 0.04);
    // this.scene.fog = new THREE.FogExp2(0x151d1e, 1);

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    
    this.camera.position.z = 20;
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.alpha=true;

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x151d1e, 1);

    document.body.appendChild(this.renderer.domElement);

    this.render();
  }

  render(){
    requestAnimationFrame(() => {
      this.render();
    });
    
    this.objects.forEach((object) => {
      if(object.update){
        object.update(); 
      }
    });
    
    this.renderer.render(this.scene, this.camera);
  }

  add(mesh){
    this.objects.push(mesh);
    // this.scene.add(mesh.getMesh());
    this.scene.add(mesh);
  }
}
module.exports = SceneManager;