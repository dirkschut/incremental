class Building{
    constructor(tempName){
        this.name = tempName;
        this.amount = 0;
        this.costsResource = [];
        this.costsAmount = [];
        this.producesResource = [];
        this.producesAmount = [];
        this.costExponent = 1.1;
    }

    getViewString(){
        var returnString = "<li id='" + this.name + "' class='building'><span class='buyBuilding' onclick = \"tryBuildBuilding('" + this.name + "')\"'>+</span>";
        returnString += " <span class='amount'>" + this.amount + "</span> ";
        returnString += this.name;
        returnString += "<div class='tooltip'>"

        var exponentCosts = this.getExponentCosts();
        for(var i = 0; i < exponentCosts.length; i++){
            var cost = exponentCosts[i]
            returnString += "<span class='" + this.costsResource[i] + "'>" + cost + "</span> " + this.costsResource[i] + "<br/>";
        }

        returnString += "</div>";
        returnString += "</li>";
        return returnString;
    }

    updateView(){
        $("#" + this.name).children(".amount").text(this.amount);
        var costExponents = this.getExponentCosts();
        for(var i = 0; i < this.costsAmount.length; i++){
            $("#" + this.name).children(".tooltip").children("." + this.costsResource[i]).text(costExponents[i]);
        }
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

    getExponentCosts(){
        var exponentArray = [];
        for(var i = 0; i < this.costsAmount.length; i++){
            exponentArray.push(Math.ceil(this.costsAmount[i] * Math.pow(this.costExponent, this.amount)));
        }
        return exponentArray;
    }

    setCostExponent(costExponent){
        this.costExponent = costExponent;
    }

    tryBuild(){
        var exponentCosts = this.getExponentCosts();

        for(var i = 0; i < this.costsResource.length; i++){
            if(resources[this.costsResource[i]].getAmount() < exponentCosts[i]){
                console.log("can't build due to insufficient " + this.costsResource[i]);
                return false;
            }
        }

        for(var i = 0; i < this.costsResource.length; i++){
            resources[this.costsResource[i]].subtract(exponentCosts[i]); 
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

function CreateBuilding(name){
    buildings[name] = new Building(name);
}

function CreateBuildingWithCostsAndProduction(name, costResources, costAmounts, producesResources, producesAmounts){
    CreateBuilding(name);

    for(var i = 0; i < costResources.length; i++){
        BuildingAddResourceCost(name, costResources[i], costAmounts[i]);
    }

    for(var i = 0; i < producesResources.length; i++){
        BuildingAddProduce(name, producesResources[i], producesAmounts[i]);
    }
}

function BuildingAddResourceCost(name, resource, amount){
    buildings[name].addResourceCost(resource, amount);
}

function BuildingAddProduce(name, resource, amount){
    buildings[name].addProduce(resource, amount);
}

function CreateBuildings(){
    CreateBuildingWoodcutter();
    CreateBuildingStonemason();
    CreateBuildingFarm();
    CreateBuildingCopperMine();
    CreateBuildingTinMine();
    CreateBuildingHousing();
}

function CreateBuildingWoodcutter(){
    CreateBuildingWithCostsAndProduction(
        "Woodcutter",
        ["Wood"],
        [10],
        ["Wood"],
        [1]
    );
}

function CreateBuildingStonemason(){
    CreateBuildingWithCostsAndProduction(
        "Stonemason",
        ["Wood", "Stone"],
        [100,    100],
        ["Stone"],
        [1]
    );
}

function CreateBuildingFarm(){
    CreateBuildingWithCostsAndProduction(
        "Farm",
        ["Wood", "Food"],
        [100,    100],
        ["Food"],
        [1]
    );
}

function CreateBuildingCopperMine(){
    CreateBuildingWithCostsAndProduction(
        "CopperMine",
        ["Wood", "Stone"],
        [250,    250],
        ["CopperOre"],
        [1]
    );
}

function CreateBuildingTinMine(){
    CreateBuildingWithCostsAndProduction(
        "TinMine",
        ["Wood", "Stone"],
        [250,    250],
        ["TinOre"],
        [1]
    );
}

function CreateBuildingHousing(){
    CreateBuildingWithCostsAndProduction(
        "Tent",
        ["Wood", "Hides"],
        ["100",  100],
        ["Peasant"],
        [1]
    );
}