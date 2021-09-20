import { AppService } from '../services/app.service';
import { ItemInt } from "../../../share/interfaces/Item";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    root(): {
        items: ItemInt[];
    };
    getData(filter: boolean): Array<ItemInt>;
}
