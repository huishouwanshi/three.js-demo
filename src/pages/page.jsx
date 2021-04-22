import React from 'react'
import styles from './index.less';
import * as THREE from 'three'
//单独引入控制器 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';


class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }

    }
    componentDidMount() {
        this.init()
    }


    init = () => {

        const scene = new THREE.Scene();
        //背景图
        const Textrueloader = new THREE.TextureLoader().setPath('/static/img/');
        // 加载一个资源
        var texture = Textrueloader.load(
            // 资源URL
            'draw.jpg',
            // onLoad回调
            function (texture) {
                // in this example we create the material when the texture is loaded
                const material = new THREE.MeshBasicMaterial({
                    map: texture
                });
            },
            // 目前暂不支持onProgress的回调
            undefined,
            // onError回调
            function (err) {
                console.error('An error happened.');
            }
        );
        scene.background = texture
        // 背景色
        // scene.background = new THREE.Color(0x999999);
        //半球灯
        const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        //平行光
        //const light = new THREE.DirectionalLight(0xffffff, 1);
        //环境光
        //const light = new THREE.AmbientLight(0x404040); // soft white light

        scene.add(light);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        //相机距离
        camera.position.z = 10;
        scene.add(camera);

        //网格线
        const grid = new THREE.GridHelper(50, 50, 0xffffff, 0x555555);
        //scene.add(grid);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            precision: 'highp',
            //    alpha:true
        });

        renderer.setPixelRatio(this.mount.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.appendChild(renderer.domElement);

        const gemBackMaterial = new THREE.MeshPhysicalMaterial({
            map: null,
            color: 0x0000ff,
            metalness: 1,
            roughness: 0,
            opacity: 0.5,
            side: THREE.BackSide,
            transparent: true,
            envMapIntensity: 5,
            premultipliedAlpha: true
            // TODO: Add custom blend mode that modulates background color by this materials color.
        });
        const gemFrontMaterial = new THREE.MeshPhysicalMaterial({
            map: null,
            color: 0x0000ff,
            metalness: 0,
            roughness: 0,
            opacity: 0.25,
            side: THREE.FrontSide,
            transparent: true,
            envMapIntensity: 10,
            premultipliedAlpha: true
        });

        // const loader = new OBJLoader()
        // loader.setPath('/static/obj/')
        // loader.load('emerald.obj', (obj) => {
        //     obj.traverse( function ( child ) {

        //         if ( child instanceof THREE.Mesh ) {
        //             child.material = gemBackMaterial;
        //             const second = child.clone();
        //             second.material = gemFrontMaterial;
        //             const parent = new THREE.Group();
        //             parent.add( second );
        //             parent.add( child );
        //             parent.position.set(0, 1, 0)
        //             parent.scale.set(0.2,0.2,0.2)
        //             scene.add( parent );
        //         }

        //     } );
        //     console.log(obj, 'obj');
        //     obj.position.set(-3, 0, 0)
        //     obj.scale.set(0.1, 0.1, 0.1)
        //     scene.add(obj)
        // })

        // const loader = new GLTFLoader().setPath('/static/obj/');
        // const dracoLoader = new DRACOLoader();
        // dracoLoader.setDecoderPath('/public/draco/');
        // loader.setDRACOLoader(dracoLoader);
        // loader.load('model.gltf', (obj) => {
        //   //  this.changeFbx(obj.scene, 0x3f67ed)
        //     console.log(obj, 'obj');
        //     //obj.position.set(0, 0, 0)
        //     //obj.scale.set(10,10, 10)
        //     obj.transparent = false;
        //     obj.alphaTest = 0.9;
        //     scene.add(obj.scene)

        // }
        // )


        const loader = new FBXLoader()
        loader.setPath('/static/obj/')

        // loader.load('wan.fbx', (obj) => {
        //   obj.traverse(function (child) {
        //         if (child instanceof THREE.Mesh) {
        //             child.material =new THREE.MeshPhongMaterial({
        //                 color:0x0000ff,
        //                 specular:0x4488ee,
        //                 shininess:12
        //             });//材质对象
        //         }
        //     })
        //     console.log(obj, 'obj');
        //     obj.position.set(0, -7, 0)
        //     obj.scale.set(0.1, 0.1, 0.1)
        //     scene.add(obj)
        // })
        loader.load('1products.fbx', (obj) => {
            this.changeFbx(obj, 0x0000ff)
            console.log(obj, 'obj');
            obj.position.set(-3, 1, 0)
            obj.scale.set(0.5, 0.5, 0.5)
            scene.add(obj)
        })
        loader.load('2transaction.fbx', (obj) => {
            this.changeFbx(obj, 0xff00ff)
            console.log(obj, 'obj');
            obj.position.set(0, 1, 0)
            obj.scale.set(0.5, 0.5, 0.5)
            scene.add(obj)
        })
        loader.load('3crosscenter.fbx', (obj) => {
            this.changeFbx(obj, 0x00FFFF)
            console.log(obj, 'obj');
            obj.position.set(3, 1, 0)
            obj.scale.set(0.5, 0.5, 0.5)
            scene.add(obj)
        })
        loader.load('4workflow.fbx', (obj) => {
            this.changeFbx(obj, 0x00FF7F)
            console.log(obj, 'obj');
            obj.position.set(6, 1, 0)
            obj.scale.set(0.5, 0.5, 0.5)
            scene.add(obj)
        })
        loader.load('5ruleengine.fbx', (obj) => {
            this.changeFbx(obj, 0xDC143C)
            console.log(obj, 'obj');
            obj.position.set(-3, 4, 0)
            obj.scale.set(0.5, 0.5, 0.5)
            scene.add(obj)
        })
        loader.load('6quota.fbx', (obj) => {
            this.changeFbx(obj, 0x8A2BE2)
            console.log(obj, 'obj');
            obj.position.set(0, 4, 0)
            obj.scale.set(0.5, 0.5, 0.5)
            scene.add(obj)
        })
        loader.load('7inline.fbx', (obj) => {
            this.changeFbx(obj, 0xFFFF00)
            console.log(obj, 'obj');
            obj.position.set(3, 4, 0)
            obj.scale.set(0.5, 0.5, 0.5)
            scene.add(obj)
        })
        loader.load('8outreach.fbx', (obj) => {
            this.changeFbx(obj, 0x00FF00)
            console.log(obj, 'obj');
            obj.position.set(6, 4, 0)
            obj.scale.set(0.5, 0.5, 0.5)
            scene.add(obj)
        })
        //加入线段
        const material = new THREE.LineBasicMaterial({
            color: 0xffffff
        });

        const points = [];
        points.push(new THREE.Vector3(-1.5, 1, 0));
        points.push(new THREE.Vector3(-0.5, 1, 0));
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        scene.add(line);

        const points1 = [];
        points1.push(new THREE.Vector3(1, 1, 0));
        points1.push(new THREE.Vector3(2, 1, 0));
        const geometry1 = new THREE.BufferGeometry().setFromPoints(points1);
        const line1 = new THREE.Line(geometry1, material);
        scene.add(line1);











        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.scene = scene
        const controls = new OrbitControls(camera, renderer.domElement);
        this.controls = controls
        this.controls.addEventListener('change', this.render);
        this.controls.update();

        this.mount.addEventListener('resize', this.nWindowResize);
        this.animate()
        //  this.createCube()
        // this.createCubes(6, 'box')
        // this.createCubes(6, 'ss')
        // this.createServices()
    }

    //动态场景
    onWindowResize = () => {

        this.camera.aspect = this.mount.innerWidth / this.mount.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.mount.innerWidth, this.mount.innerHeight);
        this.renderer.sortObjects = false;
        this.cylinder.renderOrder = 1;
        this.controls.handleResize();


    }

    changeFbx = (obj, color) => {
        obj.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                console.log(child.name, child.name.indexOf('球体'));
                if (child.name.indexOf('球体') > -1) {
                    child.material =
                        new THREE.LineDashedMaterial({
                            linewidth: 1,
                            scale: 1,
                            dashSize: 3,
                            gapSize: 1,
                            color: color, transparent: true,
                            opacity: 0.3
                        });
                }

            }

        })
    }


    //动画
    animate = () => {
        requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    //编写生成模型的工厂函数
    createCubes = (num, type) => {
        //定义物体材质及颜色
        const boxMaterial = new THREE.MeshToonMaterial({ color: '#3f6ed7' });
        //根据传入的数量，生成一个数组
        const cubes = new Array(num).fill('')
        // 遍历数组生成
        if (type === 'box') {

            for (let i = 1; i < cubes.length + 1; i++) {
                let item = cubes[i];
                item = new THREE.BoxGeometry(1, 2, 1, 4);//绘制一个立方体，参数相当于定点位置 （three自带的对象）
                item = new THREE.Mesh(item, boxMaterial);
                item.position.y = 1;
                item.position.x = i * 2;
                //item.position.z =i*2
                this.scene.add(item);//将我们生成的cube放到场景中 
            }
        } else {
            for (let i = 1; i < cubes.length + 1; i++) {
                var material4 = new THREE.MeshBasicMaterial({
                    color: 0x00ff00,
                    transparent: true,
                    opacity: 0.5,
                });
                let item = cubes[i];
                item = new THREE.SphereGeometry(0.5, 10, 10);
                item = new THREE.Mesh(item, material4);
                item.position.y = 4;
                item.position.x = i * 2;
                //item.position.z =i*2
                this.scene.add(item);//将我们生成的cube放到场景中 
            }
        }
    }

    //生成服务节点函数
    createServices = (num = 1, type = '1products') => {
        //定义物体材质及颜色
        const boxMaterial = new THREE.LineDashedMaterial({
            linewidth: 1,
            scale: 1,
            dashSize: 3,
            gapSize: 1,
            color: 0x3f67ed, transparent: true,
            opacity: 0.9
        });
        //根据传入的数量，生成一个数组
        const cubes = new Array(num).fill('')
        // 遍历数组生成
        const loader = new FBXLoader()
        loader.setPath('/static/obj/')
        loader.load(`${type}.fbx`, (obj) => {
            obj.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material = boxMaterial
                }
            })
            obj.position.set(0, 0, 0)
            obj.scale.set(0.01, 0.01, 0.01)
            this.scene.add(obj)
        })
    }

    render() {
        return (
            <div>
                <div
                    id="canvas"
                    style={{ width: '1300px', height: '700px' }}
                    ref={(mount) => { this.mount = mount }}
                />
            </div >
        )
    }
}
export default Page