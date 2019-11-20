export class Result {

    constructor(private readonly err: any, private readonly res: any) {
    }

    get error(): any {
        return this.err;
    }

    get result(): any {
        return this.res;
    }
}
