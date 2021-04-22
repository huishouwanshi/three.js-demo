import React from 'react'
import styles from './index.less';
import * as THREE from 'three'
//单独引入控制器 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { VTKLoader } from 'three/examples/jsm/loaders/VTKLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'


class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }
  componentDidMount() {
    this.init()
  }
  init = () => {

    //使用this是因为我们需要使用this.mount来渲染数据
    const scene = new THREE.Scene() //创建场景
    const camera = new THREE.PerspectiveCamera(75, this.mount.clientWidth / this.mount.clientHeight, 0.1, 1000);
    //创建相机  这些参数在官网中都有指出  第一个参数 75 -> 视野角度（单位：度）  第二个参数是长宽比 第三个是近截面 第四个是远截面
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    //创建渲染器。官网中有一个测试浏览器是否可以使用WebGL的方法，需要用到的可看一下
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    //这三个赋值是为了方便我们把创建立方体或者其他元素的方法拆分出去，不让代码显得太长
    renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    //将渲染器的长宽 设置为我们要显示的容器长宽
    camera.position.z = 5;
    // 我们生成的元素默认和相机的位置是重复的，我们需要将相机移开，这样我们才可以看到渲染的内容

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.minDistance = 10;
    controls.maxDistance = 0.5;
    controls.rotateSpeed = 5.0;
    this.controls = controls
    this.mount.appendChild(renderer.domElement);
    //将整个场景推入我们要显示的元素中

    //点光源
    var point = new THREE.PointLight(0xffffff);
    //点光源位置
    point.position.set(400, 200, 300);
    //点光源添加到场景中
    scene.add(point);
    //环境光源
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    this.createCube()
    this.createLine()
    this.animate()
  }
  //在场景创建好之后，我们需要在场景之中绘制我们需要的内容 我们按照官网先绘制一个立方体 cube，在 init之中引用 creatCube

  createCube = () => {
    const geometry = new THREE.BoxGeometry(1, 2, 1, 4);//绘制一个立方体，参数相当于定点位置 （three自带的对象）
    const geometry2 = new THREE.BoxGeometry(1, 2, 1, 4);//绘制一个立方体，参数相当于定点位置 （three自带的对象）

    const material = new THREE.MeshBasicMaterial({ color: '#3f6ed7' });
    //定义材质 我们这里用简单的颜色 ， 其他的属性可以写入对象，就可以更改材质
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = 2;
    const cube2 = new THREE.Mesh(geometry2, material);

    //我们用到网格将定义的材质用到定义的立方题上生成cube
    this.cube = cube //同样 为了方便我们在写方法的时候用到cube做此操作
    this.cube2 = cube2 //同样 为了方便我们在写方法的时候用到cube做此操作

    this.scene.add(cube);//将我们生成的cube放到场景中 
    this.scene.add(cube2);//将我们生成的cube放到场景中 

  }

  //定义线
  createLine = () => {
    //定义线的颜色及材质 
    const material = new THREE.LineBasicMaterial({
      color: 0x0000ff
    });

    //定义线的坐标 
    const points = [];
    points.push(new THREE.Vector3(- 1, 2, 1));
    points.push(new THREE.Vector3(0, 2, 1));
    points.push(new THREE.Vector3(1, 1, 1));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);
    this.line = line
    this.scene.add(line);
  }

  //此时我们看到的场景是一个静止的方块，为了显示出我们生成的是3d 的立方体 我们运用animate让他动起来 在init中引用
  animate = () => {
    requestAnimationFrame(this.animate); //像计时器一样重复的渲染
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01; // 立方体进行 的操作
    // this.cube2.rotation.x += 0.02;
    // this.cube2.rotation.y += 0.02; // 立方体进行 的操作
    this.controls.update();
    //控制器的实时更新
    this.renderer.render(this.scene, this.camera);
  }
  componentWillUnmount() {
    //    this.mount.removeChild(this.renderer.domElement)
  }
  render() {
    return (
      <div>
        <div
          id="canvas"
          style={{ width: '1300px', height: '700px', background: '#888' }}
          ref={(mount) => { this.mount = mount }}
        />
      </div>

    )
  }
}
export default Index