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

    getResourceAmount(name){
        for(var i = 0; i < this.producesResource.length; i++){
            if(this.producesResource[i] == name){
                return this.producesAmount[i] * this.amount;
            }
        }
        return 0;
    }

    tryBuild(){

        for(var i = 0; i < this.costsResource.length; i++){
            if(resources[this.costsResource[i]].getAmount() < this.costsAmount[i]){
                console.log("can't build due to insufficient " + this.costsResource[i]);
                return false;
            }
        }

        for(var i = 0; i < this.costsResource.length; i++){
            resources[this.costsResource[i]].subtract(this.costsAmount[i]); 
        }

        this.amount++;
    }

    produce(){
        for(var i = 0; i < this.producesResource.length; i++){
            resources[this.producesResource[i]].increase(this.producesAmount[i] * this.amount);
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

function CreateBuildings(){
    CreateBuildingWoodcutter();
    CreateBuildingStonemason();
    CreateBuildingFarm();
}

function CreateBuildingWoodcutter(){
    buildings["Woodcutter"] = new Building("Woodcutter");
    buildings["Woodcutter"].addResourceCost("Wood", 10);
    buildings["Woodcutter"].addProduce("Wood", 1);
}

function CreateBuildingStonemason(){
    buildings["Stonemason"] = new Building("Stonemason");
    buildings["Stonemason"].addResourceCost("Wood", 100);
    buildings["Stonemason"].addResourceCost("Stone", 100);
    buildings["Stonemason"].addProduce("Stone", 1);
}

function CreateBuildingFarm(){
    buildings["Farm"] = new Building("Farm");
    buildings["Farm"].addResourceCost("Wood", 100);
    buildings["Farm"].addResourceCost("Food", 100);
    buildings["Farm"].addProduce("Food", 1);
}