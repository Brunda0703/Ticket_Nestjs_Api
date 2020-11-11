export declare class ProductsService {
    private products;
    insertProduct(Name: string, Age: number, Phone_num: string, Seat_No: number): string;
    getProducts(): any[];
    getSingleProduct(productId: string): any;
    updateProduct(productId: string, Name: string, Age: number, Phone_num: string, Seat_No: number): void;
    deleteProduct(prodId: string): void;
    private findProduct;
}
