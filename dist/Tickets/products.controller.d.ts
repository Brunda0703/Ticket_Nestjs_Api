import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    addTicket(prodName: string, prodAge: number, prodPhone_num: string, prodSeat_No: number): {
        id: any;
    };
    getAllTickets(): any;
    getTicket(prodId: string): any;
    updateTicket(prodId: string, prodName: string, prodAge: number, prodPhone_num: string, prodSeat_No: number): any;
    removeTicket(prodId: string): any;
}
