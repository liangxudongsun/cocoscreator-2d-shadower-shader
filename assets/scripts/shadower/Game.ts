import { _decorator, AudioClip, AudioSource, Component, Node, resources, sp, tween, Tween, v3 } from 'cc';
import { 小游码匠八戒事件类型, 小游码匠八戒事件对象, 角色属性, 相机偏移X最大值, 小游码匠游戏事件枚举 } from './CoustmEvent';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends Component {

    @property({type: AudioClip, displayName: '技能音效'})
    音效: AudioClip;
    相机: Node;
    相机是否可以走了: boolean = false;
    技能Spine: sp.Skeleton;

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
        this.node.scene.on(小游码匠游戏事件枚举.相机上下震动, this.相机震动, this);
    }

    private 相机移动(): void {
        if(this.相机是否可以走了 && this.相机.position.x < 相机偏移X最大值) {
            this.相机.setPosition(this.相机.position.add(v3(角色属性.移动速度 * 1, 0, 0)));
        }
    }

    public 相机震动(): void {
        this.getComponent(AudioSource).playOneShot(this.音效);
        Tween.stopAllByTarget(this.相机);
        const origin = this.相机.position.clone();
        tween(this.相机)
            .to(0.04, { position: v3(origin.x + 18, origin.y - 40, origin.z) }, { easing: 'quadOut' })
            .to(0.05, { position: v3(origin.x - 10, origin.y + 22, origin.z) }, { easing: 'sineOut' })
            .to(0.05, { position: v3(origin.x + 6, origin.y - 12, origin.z) }, { easing: 'sineOut' })
            .to(0.04, { position: v3(origin.x - 3, origin.y + 6, origin.z) }, { easing: 'sineOut' })
            .to(0.04, { position: v3(origin.x + 1, origin.y - 2, origin.z) }, { easing: 'sineOut' })
            .to(0.06, { position: origin }, { easing: 'sineOut' })

            .to(0.04, { position: v3(origin.x + 18, origin.y - 40, origin.z) }, { easing: 'quadOut' })
            .to(0.05, { position: v3(origin.x - 10, origin.y + 22, origin.z) }, { easing: 'sineOut' })
            .to(0.05, { position: v3(origin.x + 6, origin.y - 12, origin.z) }, { easing: 'sineOut' })
            .to(0.04, { position: v3(origin.x - 3, origin.y + 6, origin.z) }, { easing: 'sineOut' })
            .to(0.04, { position: v3(origin.x + 1, origin.y - 2, origin.z) }, { easing: 'sineOut' })
            .to(0.06, { position: origin }, { easing: 'sineOut' })

            .to(0.04, { position: v3(origin.x + 18, origin.y - 40, origin.z) }, { easing: 'quadOut' })
            .to(0.05, { position: v3(origin.x - 10, origin.y + 22, origin.z) }, { easing: 'sineOut' })
            .to(0.05, { position: v3(origin.x + 6, origin.y - 12, origin.z) }, { easing: 'sineOut' })
            .to(0.04, { position: v3(origin.x - 3, origin.y + 6, origin.z) }, { easing: 'sineOut' })
            .to(0.04, { position: v3(origin.x + 1, origin.y - 2, origin.z) }, { easing: 'sineOut' })
            .to(0.06, { position: origin }, { easing: 'sineOut' })

            .to(0.04, { position: v3(origin.x + 18, origin.y - 40, origin.z) }, { easing: 'quadOut' })
            .to(0.05, { position: v3(origin.x - 10, origin.y + 22, origin.z) }, { easing: 'sineOut' })
            .to(0.05, { position: v3(origin.x + 6, origin.y - 12, origin.z) }, { easing: 'sineOut' })
            .to(0.04, { position: v3(origin.x - 3, origin.y + 6, origin.z) }, { easing: 'sineOut' })
            .to(0.04, { position: v3(origin.x + 1, origin.y - 2, origin.z) }, { easing: 'sineOut' })
            .to(0.06, { position: origin }, { easing: 'sineOut' })

            .to(0.04, { position: v3(origin.x + 18, origin.y - 40, origin.z) }, { easing: 'quadOut' })
            .to(0.05, { position: v3(origin.x - 10, origin.y + 22, origin.z) }, { easing: 'sineOut' })
            .to(0.05, { position: v3(origin.x + 6, origin.y - 12, origin.z) }, { easing: 'sineOut' })
            .to(0.04, { position: v3(origin.x - 3, origin.y + 6, origin.z) }, { easing: 'sineOut' })
            .to(0.04, { position: v3(origin.x + 1, origin.y - 2, origin.z) }, { easing: 'sineOut' })
            .to(0.06, { position: origin }, { easing: 'sineOut' })
            .start();
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
    }   
}


