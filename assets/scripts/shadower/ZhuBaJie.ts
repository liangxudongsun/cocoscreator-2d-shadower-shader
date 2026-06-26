import { _decorator, Component, Node, resources, sp, UITransform, v3 } from 'cc';
import { 八戒动画列表, 小游码匠Spine动画事件, 小游码匠八戒事件对象, 小游码匠八戒事件类型, 小游码匠游戏事件枚举, 相机偏移X最大值, 角色属性 } from './CoustmEvent';
import { Vec3 } from '../../../@cocos/creator-types/editor/packages/scene/@types/public';
const { ccclass, property } = _decorator;

@ccclass('ZhuBaJie')
export class ZhuBaJie extends Component {
   
    public 猪八戒Spine: sp.Skeleton;
    private isAttacking: boolean = false;
    private 可以走了吗: boolean = false;
    private 技能SkeletonData: sp.SkeletonData = null;

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
        this.猪八戒Spine = this.node.getComponent(sp.Skeleton);
        this.猪八戒Spine.timeScale = 角色属性.动画时间倍率;
        this.加载动态spine技能();
    }
    /**
     * @小游码匠
     * @初始化事件
     */
    public initEvent(): void {
         小游码匠八戒事件对象.on(小游码匠八戒事件类型.走起来, this.走起来, this);
         小游码匠八戒事件对象.on(小游码匠八戒事件类型.暂停, this.暂停, this);
         小游码匠八戒事件对象.on(小游码匠八戒事件类型.攻击, this.攻击, this);
         this.猪八戒Spine.setEventListener((trackEntry: sp.spine.TrackEntry, trackEvent: sp.spine.Event)=>{
             console.log(trackEntry, trackEvent.data.name);
             // 事件要定义在Spine中
             if(trackEvent.data.name === 小游码匠Spine动画事件.攻击震动) {
                this.node.scene.emit(小游码匠游戏事件枚举.相机上下震动);
                this.释放技能(this.node);
             }
         });
    }

    public 加载动态spine技能(): void {
        resources.load('spines/action', sp.SkeletonData, (err, skeletonData) => {
            if (err) {
                console.error(err);
                return;
            }
            this.技能SkeletonData = skeletonData;
        });
    }

    public 释放技能(目标节点: Node): void {
        if (!this.技能SkeletonData) {
            return;
        }
        const skillNode = new Node('SkillEffect');
        skillNode.layer = 目标节点.layer;
        skillNode.setParent(目标节点.parent);
        const 释放位置 = v3(目标节点.worldPosition.x + 200, 目标节点.worldPosition.y + 20, 0)
        skillNode.setWorldPosition(释放位置);
        skillNode.scale = v3(1.6, 1.6, 1.6);
        const spine = skillNode.addComponent(sp.Skeleton);
        spine.skeletonData = this.技能SkeletonData;
        const track = spine.setAnimation(0, 'action', false);
        spine.setTrackCompleteListener(track, () => {
            skillNode.destroy();
        });
    }

    private 更新位移(): void {
        if(this.可以走了吗 && this.node.position.x < 相机偏移X最大值) {
            this.node.setPosition(this.node.position.add(v3(角色属性.移动速度 * 1, 0.05, 0)));
        }
    }

    public 走起来(): void {
        this.可以走了吗 = true;
        this.猪八戒Spine.setAnimation(0, 八戒动画列表.走路, true);
        this.isAttacking = false;
    }

    public 暂停(): void {
        this.可以走了吗 = false;
        this.猪八戒Spine.setAnimation(0, 八戒动画列表.站停, true);
        this.isAttacking = false;
    }

    public 攻击(): void {
        this.可以走了吗 = false;
        if (this.isAttacking) {
            return;
        }

        this.isAttacking = true;
        const attackTrack = this.猪八戒Spine.setAnimation(0, 八戒动画列表.攻击, false);
        this.猪八戒Spine.setTrackCompleteListener(attackTrack, (e) => {
            this.isAttacking = false;
        });
        this.猪八戒Spine.addAnimation(0, 八戒动画列表.站停, true);
    }
}


