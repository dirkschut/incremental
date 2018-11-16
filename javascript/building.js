class Building{
    constructor(tempName){
        this.name = tempName;
        this.amount = 0;
        this.costsResource = [];
        this.costsAmount = [];
        this.producesResource = [];
        this.producesAmount = [];
    }

    getAmount(){
        return this.amount;
    }

    tryBuild(){

        for(var i = 0; i < this.costsResource.length; i++){
            if(window.resources[this.costsResource[i]].getAmount() < this.costsAmount[i]){
                console.log("can't build due to insufficient " + this.costsResource[i]);
                return false;
            }
        }

        for(var i = 0; i < this.costsResource.length; i++){
            window.resources[this.costsResource[i]].subtract(this.costsAmount[i]); 
        }

        this.amount++;
    }

    produce(){
        for(var i = 0; i < this.producesResource.length; i++){
            window.resources[this.producesResource[i]].increase(this.producesAmount[i] * this.amount);
        }
    }

    addResourceCost(resource, amount){
        this.costsResource.push(resource);
        this.costsAmount.push(amount);
    }

    addProduce(resource, amount){
        this.producesResource.push(resource);
        this.producesAmount.push(amount);
    }
}