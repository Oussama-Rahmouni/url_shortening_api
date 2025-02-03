class CustomError extends Error{
    public status:number;
    public data:any;

    constructor(message:string, status:number, data:any =null){
        super(message)
        this.status=status;
        this.data = data;
    }
}

const handleError = ()=>{
    return new CustomError(message:string, status:number, data:any =nult)
}

export {CustomError, handleError}