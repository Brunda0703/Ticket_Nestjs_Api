import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    addProduct(prodName: string, prodAge: number, prodPhone_num: string, prodSeat_No: number): {
        id: string;
    };
    getAllProducts(): any[];
    getProduct(prodId: string): any;
    updateProduct(prodId: string, prodName: string, prodAge: number, prodPhone_num: string, prodSeat_No: number): any;
    removeProduct(prodId: string): any;
}
