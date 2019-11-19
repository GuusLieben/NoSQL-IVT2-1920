export class Result<T> {
    err: any;
    res: T;


    constructor(err: any, res: T) {
        this.err = err;
        this.res = res;
    }
}
