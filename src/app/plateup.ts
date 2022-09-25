import { Subject } from 'rxjs';
import { ListboxValueChangeEvent } from '@angular/cdk/listbox';

export interface Cuttable {

}
export interface Cookable {

}

export class Item {
    
}

export class Food extends Item {

}



export class Surface {
    public item:Item|null = null;
    public newItemAction:Subject<any> = new Subject();

    public getItem(item:Item|null):boolean {
        if (this.item !== null) return false;
        this.item = item;
        return true;
    }
    public giveItem():Item|null {
        return this.item;
    }
}

export class Cooker extends Surface {

    
    public override getItem(item:Item|null):boolean {
        let result = super.getItem(item);
        // Do cooking
        return result;
    }
    public override giveItem():Item|null {
        return super.giveItem();
    }
}

export class Cutter extends Surface {

}

export class Conveyor {
    public toConnection:Surface|null = null;
    public pushItem() {

    }
}

export class Grabber extends Conveyor {
    public fromConnection:Surface|null = null;
    public pullItem() {

    }
}

export class SmartGrabber extends Grabber {
    
}

export class LinkedElement<T> {
    public constructor(public element:T, public link:LinkedElement<T>|undefined = undefined) {}
}

export enum DIR {
    UP = 0,
    LEFT = 1,
    DOWN = 2,
    RIGHT = 3
}

export class Direction {
    public constructor(public orientation:DIR) {}
}

export class FloorPlanCell {
    public orientation:LinkedElement<DIR>|undefined;
    public hasComponent:boolean = false;
    private _componentData:iComponent|undefined;
    public constructor() {
        let right = new LinkedElement(DIR.RIGHT);
        let down = new LinkedElement(DIR.DOWN, right);
        let left = new LinkedElement(DIR.LEFT, down);
        let up = new LinkedElement(DIR.UP, left);
        right.link = up;
        this.orientation = right;
    }
    public set componentData(data:iComponent|undefined) {
        this._componentData = data;
        this.hasComponent = data !== undefined;
    }
    public get componentData():iComponent|undefined {
        return this._componentData;
    }
    public rotate(event:MouseEvent) {
        event.stopPropagation();
        this.orientation = this.orientation?.link;
        console.log(this.orientation);
    }
    public removeComponent(event:MouseEvent) {
        event.stopPropagation();
        this._componentData = undefined;
        this.hasComponent = false;
    }
}

export class FloorPlanWall {
    public x:string;
    public y:string;
    public w:string;
    public h:string;
    public constructor(x:number, y:number, w:number, h:number) {
        this.x = this.asPixel(x);
        this.y = this.asPixel(y);
        this.w = this.asPixel(w);
        this.h = this.asPixel(h);
    }
    private asPixel(value:number): string {
        return `${value}px`;
    }
    public hasWall:boolean = false;
    public toggleWall() {
        this.hasWall = !this.hasWall;
    }
}

export class FloorPlan {

    public _x:number = 16;
    public _y:number = 12;

    public x:number;
    public y:number;
    public w:number = 1200;
    public h:number;
    public c:number;

    public floor:Array<FloorPlanCell>;
    public vWall:Array<FloorPlanWall>;
    public hWall:Array<FloorPlanWall>;

    public constructor() {
        this.x = this._x;
        this.y = this._y;
        this.c = this.w / this.x;
        this.h = this.y * this.c;
        this.floor = Array(this.x * this.y).fill(null).map(()=> new FloorPlanCell());
        this.vWall = Array((this.x - 1) * this.y).fill(null).map((x, i)=> new FloorPlanWall(this.c * (Math.floor(i/this.y) + 1) - 5, this.c * (i%this.y), 10, this.c));
        this.hWall = Array(this.x * (this.y - 1)).fill(null).map((x, i)=> new FloorPlanWall(this.c * (i%this.x), this.c * (Math.floor(i/this.x) + 1) - 5, this.c, 10));
    }

    public resize() {
        this.x = this._x;
        this.y = this._y;
        this.c = this.w / this.x;
        this.h = this.y * this.c;
        this.floor = Array(this.x * this.y).fill(null).map(()=> new FloorPlanCell());
        this.vWall = Array((this.x - 1) * this.y).fill(null).map((x, i)=> new FloorPlanWall(this.c * (Math.floor(i/this.y) + 1) - 5, this.c * (i%this.y), 10, this.c));
        this.hWall = Array(this.x * (this.y - 1)).fill(null).map((x, i)=> new FloorPlanWall(this.c * (i%this.x), this.c * (Math.floor(i/this.x) + 1) - 5, this.c, 10));
    }
}

export interface iComponent {
    id:number;
    type:number;
    category:string;
    name:string;
    description:string;
    thumbnail:string;
    image:string;
}

export const CAT_LIST = ['Cooking', 'Kitchen', 'Dining room', 'Cleaning', 'Automation', 'Research', 'Footwear', 'Miscellaneous'];

export class ComponentList {
    public list:Array<iComponent> = [
        { id: 0, type: 1, category: CAT_LIST[0], name: 'Starter Hob', description: 'Just a pilot light', thumbnail: 'assets/thumbnail/starterhob.png', image: 'assets/image/starter_hob.png' },
        { id: 1, type: 1, category: CAT_LIST[0], name: 'Hob', description: 'Cooks Things!', thumbnail: 'assets/thumbnail/hob.png', image: 'assets/image/hob.png' },
        { id: 2, type: 1, category: CAT_LIST[0], name: 'Safety Hob', description: '	Cook it with kindness', thumbnail: 'assets/thumbnail/safetyhob.png', image: 'assets/image/safety_hob.png' },
        { id: 3, type: 1, category: CAT_LIST[0], name: 'Danger Hob', description: '10 minutes at 180 degrees... so 30 seconds at 3600 degrees?', thumbnail: 'assets/thumbnail/dangerhob.png', image: 'assets/image/danger_hob.png' },
        { id: 4, type: 1, category: CAT_LIST[0], name: 'Oven', description: 'Unforgettably easy to use', thumbnail: 'assets/thumbnail/oven.png', image: 'assets/image/oven.png' },
        { id: 5, type: 1, category: CAT_LIST[0], name: 'Microwave', description: 'When you\'re a pro chef you don\'t have to prove anything', thumbnail: 'assets/thumbnail/microwave.png', image: 'assets/image/microwave.png' },
        { id: 6, type: 1, category: CAT_LIST[0], name: 'Gas Limiter', description: 'Safety first, seared steaks later', thumbnail: 'assets/thumbnail/gaslimiter.png', image: 'assets/image/gas_limiter.png' },
        { id: 7, type: 1, category: CAT_LIST[0], name: 'Gas Override', description: 'Now you\'re cooking with (more) gas', thumbnail: 'assets/thumbnail/gasoverride.png', image: 'assets/image/gas_override.png' },

        { id: 8, type: 3, category: CAT_LIST[1], name: 'Starter Bin', description: 'Keeps all the things you\'ve decided you don\'t like', thumbnail: 'assets/thumbnail/starterbin.png', image: 'assets/image/bin.png' },
        { id: 9, type: 3, category: CAT_LIST[1], name: 'Bin', description: 'Keeps all the things you\'ve decided you don\'t like', thumbnail: 'assets/thumbnail/bin.png', image: 'assets/image/bin.png' },
        { id: 10, type: 3, category: CAT_LIST[1], name: 'Compactor Bin', description: 'Keeps all the things you\'ve decided you don\'t like', thumbnail: 'assets/thumbnail/compactorbin.png', image: 'assets/image/bin.png' },
        { id: 11, type: 3, category: CAT_LIST[1], name: 'Composter Bin', description: 'Keeps all the things you\'ve decided you don\'t like', thumbnail: 'assets/thumbnail/composterbin.png', image: 'assets/image/bin.png' },
        { id: 12, type: 3, category: CAT_LIST[1], name: 'Expanded Bin', description: 'Keeps all the things you\'ve decided you don\'t like', thumbnail: 'assets/thumbnail/expandedbin.png', image: 'assets/image/bin.png' },
        { id: 13, type: 3, category: CAT_LIST[1], name: 'Counter', description: 'The real unsung hero of any kitchen', thumbnail: 'assets/thumbnail/counter.png', image: 'assets/image/counter.png' },
        { id: 14, type: 3, category: CAT_LIST[1], name: 'Freezer', description: 'Sometimes it\'s nice to put things on ice', thumbnail: 'assets/thumbnail/freezer.png', image: 'assets/image/freezer.png' },
        { id: 15, type: 3, category: CAT_LIST[1], name: 'Workstation', description: 'Chop chop with the chopping', thumbnail: 'assets/thumbnail/workstation.png', image: 'assets/image/workstation.png' },
        { id: 16, type: 3, category: CAT_LIST[1], name: 'Preparation Station', description: 'Helpful for putting things in place!', thumbnail: 'assets/thumbnail/prepstation.png', image: 'assets/image/prep_station.png' },
        { id: 17, type: 3, category: CAT_LIST[1], name: 'Frozen Preparation Station', description: 'So cool that nobody will mind their food being cold', thumbnail: 'assets/thumbnail/frozenprepstation.png', image: 'assets/image/frozen_prep_station.png' },
        { id: 18, type: 3, category: CAT_LIST[1], name: 'Starter Plates', description: 'It\'s enough to get started', thumbnail: 'assets/thumbnail/starterplates.png', image: 'assets/image/starter_plates.png' },
        { id: 19, type: 3, category: CAT_LIST[1], name: 'Plates', description: 'More plates means less washing!', thumbnail: 'assets/thumbnail/plates.png', image: 'assets/image/plates.png' },
        { id: 20, type: 3, category: CAT_LIST[1], name: 'Auto Plater', description: 'One step closer to retirement', thumbnail: 'assets/thumbnail/autoplater.png', image: 'assets/image/auto_plater.png' },
        { id: 21, type: 3, category: CAT_LIST[1], name: 'Pot Stack', description: 'Spare pots for when you really want some soup', thumbnail: 'assets/thumbnail/potstack.png', image: 'assets/image/pot_stack.png' },
        { id: 22, type: 3, category: CAT_LIST[1], name: 'Serving Boards', description: 'Wood is naturally self cleaning', thumbnail: 'assets/thumbnail/servingboards.png', image: 'assets/image/serving_boards.png' },
        { id: 23, type: 3, category: CAT_LIST[1], name: 'Woks', description: 'Spare woks for when you\'ve burned all the others', thumbnail: 'assets/thumbnail/woks.png', image: 'assets/image/woks.png' },
        { id: 24, type: 3, category: CAT_LIST[1], name: 'Kitchen Floor Protector', description: 'It\'s cheap and a little bit squidgy', thumbnail: 'assets/thumbnail/kitchenfloorprotector.png', image: 'assets/image/kitchen_floor_protector.png' },
        { id: 25, type: 3, category: CAT_LIST[1], name: 'Rolling Pin', description: 'It\'s for rolling things', thumbnail: 'assets/thumbnail/rollingpin.png', image: 'assets/image/rolling_pin.png' },
        { id: 26, type: 3, category: CAT_LIST[1], name: 'Sharp Knife', description: 'A Sharp knife is a safe knife', thumbnail: 'assets/thumbnail/sharpknife.png', image: 'assets/image/sharp_knife.png' },
        
        { id: 27, type: 3, category: CAT_LIST[2], name: 'Dining Table', description: 'Seats up to four (possibly) happy customers', thumbnail: 'assets/thumbnail/diningtable.png', image: 'assets/image/dining_table.png' },
        { id: 28, type: 3, category: CAT_LIST[2], name: 'Bar Table', description: 'Seats one', thumbnail: 'assets/thumbnail/bartable.png', image: 'assets/image/bar_table.png' },
        { id: 29, type: 3, category: CAT_LIST[2], name: 'Metal Table', description: 'Seats up to four', thumbnail: 'assets/thumbnail/metaltable.png', image: 'assets/image/metal_table.png' },
        { id: 30, type: 3, category: CAT_LIST[2], name: 'Table - Simple Cloth', description: 'Seats two, opposite each other', thumbnail: 'assets/thumbnail/tablesimplecloth.png', image: 'assets/image/simple_cloth.png' },
        { id: 31, type: 3, category: CAT_LIST[2], name: 'Table - Fancy Cloth', description: 'Seats four in luxury', thumbnail: 'assets/thumbnail/tablefancycloth.png', image: 'assets/image/fancy_cloth.png' },
        { id: 32, type: 3, category: CAT_LIST[2], name: 'Breadsticks', description: 'Something to snack on while you wait', thumbnail: 'assets/thumbnail/breadsticks.png', image: 'assets/image/breadsticks.png' },
        { id: 33, type: 3, category: CAT_LIST[2], name: 'Candle Box', description: 'Everything tastes better by candlelight', thumbnail: 'assets/thumbnail/candlebox.png', image: 'assets/image/candle_box.png' },
        { id: 34, type: 3, category: CAT_LIST[2], name: 'Napkins', description: 'Now they can wipe up their own mess', thumbnail: 'assets/thumbnail/napkins.png', image: 'assets/image/napkins.png' },
        { id: 35, type: 3, category: CAT_LIST[2], name: 'Sharp Cutlery', description: 'Anything is better than nothing', thumbnail: 'assets/thumbnail/sharpcutlery.png', image: 'assets/image/sharp_cutlery.png' },
        { id: 36, type: 3, category: CAT_LIST[2], name: 'Specials Menu', description: 'It\'s the same, but with fancier names', thumbnail: 'assets/thumbnail/specialsmenu.png', image: 'assets/image/specials_menu.png' },
        { id: 37, type: 3, category: CAT_LIST[2], name: 'Supplies', description: 'It could be full of anything until you open it', thumbnail: 'assets/thumbnail/supplies.png', image: 'assets/image/supplies.png' },
        { id: 38, type: 3, category: CAT_LIST[2], name: 'Tray Stand', description: 'Twice the productivity', thumbnail: 'assets/thumbnail/traystand.png', image: 'assets/image/tray_stand.png' },
        { id: 39, type: 3, category: CAT_LIST[2], name: 'Coffee Table', description: 'Comfy and not being snowed on', thumbnail: 'assets/thumbnail/coffeetable.png', image: 'assets/image/coffee_table.png' },
        { id: 40, type: 3, category: CAT_LIST[2], name: 'Flower Pot', description: 'Lovely and magical, Bonus Patience, Change Order, Leave Happy', thumbnail: 'assets/thumbnail/flowerpot.png', image: 'assets/image/flower_pot.png' },

        { id: 41, type: 3, category: CAT_LIST[3], name: 'Starter Sink', description: 'Avoid that sinking feeling', thumbnail: 'assets/thumbnail/startersink.png', image: 'assets/image/starter_sink.png' },
        { id: 42, type: 3, category: CAT_LIST[3], name: 'Sink', description: 'Avoid that sinking feeling', thumbnail: 'assets/thumbnail/sink.png', image: 'assets/image/sink.png' },
        { id: 43, type: 3, category: CAT_LIST[3], name: 'Soaking Sink', description: 'This probably helps. Probably', thumbnail: 'assets/thumbnail/soakingsink.png', image: 'assets/image/soaking_sink.png' },
        { id: 44, type: 3, category: CAT_LIST[3], name: 'Power Sink', description: 'When normal amounts of water aren\'t enough', thumbnail: 'assets/thumbnail/powersink.png', image: 'assets/image/power_sink.png' },
        { id: 45, type: 3, category: CAT_LIST[3], name: 'Wash Basin', description: 'Pile \'em high and wash \'em clean', thumbnail: 'assets/thumbnail/washbasin.png', image: 'assets/image/washbasin.png' },
        { id: 46, type: 3, category: CAT_LIST[3], name: 'Dish Washer', description: 'You\'ll never know what you did without it', thumbnail: 'assets/thumbnail/dishwasher.png', image: 'assets/image/dishwasher.png' },
        { id: 47, type: 3, category: CAT_LIST[3], name: 'Mop', description: 'Like having a extra pair of hands', thumbnail: 'assets/thumbnail/mop.png', image: 'assets/image/mop.png' },
        { id: 48, type: 3, category: CAT_LIST[3], name: 'Lasting Mop', description: 'Hold this to clean spills instantly', thumbnail: 'assets/thumbnail/lastingmop.png', image: 'assets/image/lasting_mop.png' },
        { id: 49, type: 3, category: CAT_LIST[3], name: 'Fast Mop', description: 'Hold this to clean spills instantly', thumbnail: 'assets/thumbnail/fastmop.png', image: 'assets/image/mop.png' },
        { id: 50, type: 3, category: CAT_LIST[3], name: 'Robot Mop', description: 'Puff and the mess is gone!', thumbnail: 'assets/thumbnail/robotmop.png', image: 'assets/image/robot_mop.png' },
        { id: 51, type: 3, category: CAT_LIST[3], name: 'Floor Buffer', description: 'Everything is better if it\'s shiny', thumbnail: 'assets/thumbnail/floorbuffer.png', image: 'assets/image/floor_buffer.png' },
        { id: 52, type: 3, category: CAT_LIST[3], name: 'Robot Buffer', description: 'All the shine, all the time', thumbnail: 'assets/thumbnail/robotbuffer.png', image: 'assets/image/robot_buffer.png' },
        { id: 53, type: 3, category: CAT_LIST[3], name: 'Dish Rack', description: 'Put them here and wait for someone else to do it', thumbnail: 'assets/thumbnail/dishrack.png', image: 'assets/image/dish_rack.png' },
        { id: 54, type: 3, category: CAT_LIST[3], name: 'Scrubbing Brush', description: 'Wipe the floor, scrub the dishes, don\'t think about it too much', thumbnail: 'assets/thumbnail/scrubbingbrush.png', image: 'assets/image/scrubbing_brush.png' },

        { id: 55, type: 3, category: CAT_LIST[4], name: 'Conveyor', description: 'Automatically moves items', thumbnail: 'assets/thumbnail/conveyor.png', image: 'assets/image/conveyor.png' },
        { id: 56, type: 4, category: CAT_LIST[4], name: 'Grabber', description: 'Automatically takes items', thumbnail: 'assets/thumbnail/grabber.png', image: 'assets/image/grabber.png' },
        { id: 57, type: 5, category: CAT_LIST[4], name: 'Smart Grabber', description: 'Automatically takes items', thumbnail: 'assets/thumbnail/smartgrabber.png', image: 'assets/image/smart_grabber.png' },
        { id: 58, type: 3, category: CAT_LIST[4], name: 'Combiner', description: 'It\'s the personal touch that makes the dish', thumbnail: 'assets/thumbnail/combiner.png', image: 'assets/image/combiner.png' },
        { id: 59, type: 3, category: CAT_LIST[4], name: 'Portioner', description: 'There\'s a very complicated hidden mechanism', thumbnail: 'assets/thumbnail/portioner.png', image: 'assets/image/portioner.png' },
        { id: 60, type: 3, category: CAT_LIST[4], name: 'Mixer', description: 'Like having a extra pair of hands', thumbnail: 'assets/thumbnail/mixer.png', image: 'assets/image/mixer.png' },
        { id: 61, type: 3, category: CAT_LIST[4], name: 'Conveyor Mixer', description: 'Like having a extra pair of hands', thumbnail: 'assets/thumbnail/conveyormixer.png', image: 'assets/image/conveyor_mixer.png' },
        { id: 62, type: 3, category: CAT_LIST[4], name: 'Heated Mixer', description: 'Like having a extra pair of hands', thumbnail: 'assets/thumbnail/heatedmixer.png', image: 'assets/image/heated_mixer.png' },
        { id: 63, type: 2, category: CAT_LIST[4], name: 'Rapid Mixer', description: 'Like having a extra pair of hands', thumbnail: 'assets/thumbnail/rapidmixer.png', image: 'assets/image/rapid_mixer.png' },

        { id: 64, type: 2, category: CAT_LIST[5], name: 'Blueprint Cabinet', description: 'Just because you can\'t afford it doesn\'t mean you don\'t want it', thumbnail: 'assets/thumbnail/blueprintcabinet.png', image: 'assets/image/blueprint_cabinet.png' },
        { id: 65, type: 2, category: CAT_LIST[5], name: 'Research Desk', description: 'One of these please, except better', thumbnail: 'assets/thumbnail/researchdesk.png', image: 'assets/image/research_desk.png' },
        { id: 66, type: 2, category: CAT_LIST[5], name: 'Blueprint Desk', description: 'The best gifts are the ones you still have to pay for', thumbnail: 'assets/thumbnail/blueprintdesk.png', image: 'assets/image/blueprint_desk.png' },
        { id: 67, type: 2, category: CAT_LIST[5], name: 'Copying Desk', description: 'Two of these, please', thumbnail: 'assets/thumbnail/copyingdesk.png', image: 'assets/image/copying_desk.png' },
        { id: 68, type: 2, category: CAT_LIST[5], name: 'Discount Desk', description: 'One of these please, except cheaper', thumbnail: 'assets/thumbnail/discountdesk.png', image: 'assets/image/discount_desk.png' },

        { id: 69, type: 2, category: CAT_LIST[6], name: 'Trainers', description: 'This product does not endorse running in kitchens', thumbnail: 'assets/thumbnail/trainers.png', image: 'assets/image/trainers.png' },
        { id: 70, type: 2, category: CAT_LIST[6], name: 'Wellies', description: 'Comes in a very fetching yellow', thumbnail: 'assets/thumbnail/wellies.png', image: 'assets/image/wellies.png' },
        { id: 71, type: 2, category: CAT_LIST[6], name: 'Work Boots', description: 'Steel caps - usually underrated in a restaurant environment', thumbnail: 'assets/thumbnail/workboots.png', image: 'assets/image/work_boots.png' },

        { id: 72, type: 2, category: CAT_LIST[7], name: 'Booking Desk', description: 'Sometimes it\'s good to hurry things along', thumbnail: 'assets/thumbnail/bookingdesk.png', image: 'assets/image/booking_desk.png' },
        { id: 73, type: 2, category: CAT_LIST[7], name: 'Display Stand', description: 'How long has this food been here? Months?', thumbnail: 'assets/thumbnail/displaystand.png', image: 'assets/image/display_stand.png' },
        { id: 74, type: 2, category: CAT_LIST[7], name: 'Dumbwaiter', description: 'Connected together as if by magic', thumbnail: 'assets/thumbnail/dumbwaiter.png', image: 'assets/image/dumbwaiter.png' },
        { id: 75, type: 2, category: CAT_LIST[7], name: 'Fire Extinguisher', description: 'Maybe you just need less fire', thumbnail: 'assets/thumbnail/fireextinguisher.png', image: 'assets/image/fire_extinguisher.png' },
        { id: 76, type: 2, category: CAT_LIST[7], name: 'Ordering Terminal', description: 'Comes with a speedy-service guarantee', thumbnail: 'assets/thumbnail/orderingterminal.png', image: 'assets/image/ordering_terminal.png' },
        { id: 77, type: 2, category: CAT_LIST[7], name: 'Specials Terminal', description: 'Can interest you in something else, instead?', thumbnail: 'assets/thumbnail/specialsterminal.png', image: 'assets/image/specials_terminal.png' },
    ];
    public selection:any = undefined;
    public equals(value1:iComponent, value2:iComponent) {
        return value1.id === value2.id;
    }
    public change(event:ListboxValueChangeEvent<iComponent>) {
        this.selection = event.value[0];
    }
}



// Surface: 1
// Cooker: 2
// Coo 3
// 4
// Cutter: 2
// Conveyour: 3
// Grabber: 4
// SmartGrabber: 5