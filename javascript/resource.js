class Resource{
    constructor(tempName){
        this.name = tempName;
        this.amount = 0;
    }

    getAmount(){
        return this.amount;
    }

    getName(){
        return this.name;
    }

    increase(amount){
        this.amount += amount;
    }

    subtract(amount){
        this.amount -= amount;
        if(amount < 0){
            amount = 0;
        }
    }
};