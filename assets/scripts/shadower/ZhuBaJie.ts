import { _decorator, Component, Node, sp, v3 } from 'cc';
import { 八戒动画列表, 小游码匠八戒事件对象, 小游码匠八戒事件类型, 相机偏移X最大值, 角色属性 } from './CoustmEvent';
const { ccclass, property } = _decorator;

@ccclass('ZhuBaJie')
export class ZhuBaJie extends Component {
   
    public zbjSpine: sp.Skeleton;
    private isAttacking: boolean = false;
    private 可以走了吗: boolean = false;

    protected onLoad(): void {
       this.init();
    }

    start() {

    }

    update(deltaTime: number) {
        this.更新位移();
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
        this.zbjSpine = this.node.getComponent(sp.Skeleton);
        this.zbjSpine.timeScale = 角色属性.动画时间倍率;
    }
    /**
     * @小游码匠
     * @初始化事件
     */
    public initEvent(): void {
         小游码匠八戒事件对象.on(小游码匠八戒事件类型.走起来, this.走起来, this);
         小游码匠八戒事件对象.on(小游码匠八戒事件类型.暂停, this.暂停, this);
         小游码匠八戒事件对象.on(小游码匠八戒事件类型.攻击, this.攻击, this);
    }

    private 更新位移(): void {
        if(this.可以走了吗 && this.node.position.x < 相机偏移X最大值) {
            this.node.setPosition(this.node.position.add(v3(角色属性.移动速度 * 1, 0.05, 0)));
        }
    }

    public 走起来(): void {
        this.可以走了吗 = true;
        this.zbjSpine.setAnimation(0, 八戒动画列表.走路, true);
        this.isAttacking = false;
    }

    public 暂停(): void {
        this.可以走了吗 = false;
        this.zbjSpine.setAnimation(0, 八戒动画列表.站停, true);
        this.isAttacking = false;
    }

    public 攻击(): void {
        this.可以走了吗 = false;
        if (this.isAttacking) {
            return;
        }

        this.isAttacking = true;
        const attackTrack = this.zbjSpine.setAnimation(0, 八戒动画列表.攻击, false);
        this.zbjSpine.setTrackCompleteListener(attackTrack, (e) => {
            console.log(e.animation.name);
            this.isAttacking = false;
        });
        this.zbjSpine.addAnimation(0, 八戒动画列表.站停, true);
    }
}


