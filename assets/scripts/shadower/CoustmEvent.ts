import { EventTarget } from 'cc'

export const 小游码匠八戒事件对象 = new EventTarget();

export enum 小游码匠游戏事件枚举 {
    相机上下震动="相机上下震动",
}

export enum 小游码匠八戒事件类型 {
    走起来 = '走起来',
    暂停 = '暂停',
    攻击 = '攻击'
}

export enum 小游码匠Spine动画事件 {
    攻击震动 = 'onAttacked',
}

export enum 八戒动画列表 {
    站停 = 'idle',
    走路 = 'run',
    攻击 = 'attack'
}

export const 角色属性 = {
    移动速度: 5,
    攻击速度: 1,
    攻击范围: 1,
    攻击力: 1,
    防御力: 1,
    生命值: 1,
    魔法值: 1,
    魔法值恢复速度: 1,
    魔法值消耗速度: 1,
    动画时间倍率: 1,
}

export const 相机偏移X最大值: number = 2200;