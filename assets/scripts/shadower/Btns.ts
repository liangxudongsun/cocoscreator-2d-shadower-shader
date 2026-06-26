import { _decorator, Component, find, Node, sp } from 'cc';
import { ZhuBaJie } from './ZhuBaJie';
import { 小游码匠八戒事件对象, 小游码匠八戒事件类型 } from './CoustmEvent';
const { ccclass, property } = _decorator;

@ccclass('Btns')
export class Btns extends Component {
   

    protected onLoad() {
        
    }

    start() {
        this.获取八戒动画Spine();
    }

    update(deltaTime: number) {
        
    }

    public 获取八戒动画Spine(): void {
        
    }

    public 走起来(): void {
        小游码匠八戒事件对象.emit(小游码匠八戒事件类型.走起来);
    }

    public 暂停(): void {
        小游码匠八戒事件对象.emit(小游码匠八戒事件类型.暂停);
    }

    public 攻击(): void {
        小游码匠八戒事件对象.emit(小游码匠八戒事件类型.攻击);
    }
}


