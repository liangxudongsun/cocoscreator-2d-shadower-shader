import { _decorator, Component, Node, tween, v3 } from 'cc';
import { 小游码匠八戒事件类型, 小游码匠八戒事件对象, 角色属性, 相机偏移X最大值 } from './CoustmEvent';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    相机: Node;
    相机是否可以走了: boolean = false;

    protected onLoad(): void {
        this.init();
    }

    start() {

    }

    update(deltaTime: number) {
        this.相机移动();
    }

    /**
     * @小游码匠
     * @初始化
     */
    private init(): void {
        this.initProperty();
        this.initEvent();
    }

    /**
     * @小游码匠
     * @初始化属性
     */
    private initProperty(): void {
        this.相机 = this.node.getChildByName('Camera');
        this.相机是否可以走了 = false;
    }
    
    /**
     * @小游码匠
     * @初始化事件
     */

    private initEvent(): void {
        小游码匠八戒事件对象.on(小游码匠八戒事件类型.走起来, this.走起来, this);
        小游码匠八戒事件对象.on(小游码匠八戒事件类型.暂停, this.暂停, this);
        小游码匠八戒事件对象.on(小游码匠八戒事件类型.攻击, this.攻击, this);
    }

    private 相机移动(): void {
        if(this.相机是否可以走了 && this.相机.position.x < 相机偏移X最大值) {
            this.相机.setPosition(this.相机.position.add(v3(角色属性.移动速度 * 1, 0, 0)));
        }
        
    }

    public 走起来(): void {
        this.相机是否可以走了 = true;
    }

    public 暂停(): void {
        this.相机是否可以走了 = false;
    }

    public 攻击(): void {
        // 处理攻击逻辑
        this.相机是否可以走了 = false;
        tween(this.相机)
        .to(.2, {position: this.相机.position.add(v3(0, 20, 0))}, {easing: 'backOut'})
        .to(.2, {position: this.相机.position.add(v3(0, -20, 0))}, {easing: 'backOut'})
        .to(.2, {position: this.相机.position.add(v3(0, 0, 0))}, {easing: 'backOut'})
        .start();
        
    }   
}


