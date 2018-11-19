class Building{
    constructor(tempName){
        this.name = tempName;
        this.amount = 0;
        this.costsResource = [];
        this.costsAmount = [];
        this.producesResource = [];
        this.producesAmount = [];
        this.costExponent = 1.8;
        this.buildTime = 2;
        this.amountInQueue = 0;
    }

    getViewString(){
        var returnString = "<li id='" + this.name + "' class='building'><button class='buyBuilding' onclick = \"tryBuildBuilding('" + this.name + "')\"'>+</button>";
        returnString += " <span class='amount'>" + this.amount + "</span> ";
        returnString += this.name;

        returnString += "<div class='tooltip'>"
        returnString += "<b>Cost:</b><ul>";
        var exponentCosts = this.getExponentCosts();
        for(var i = 0; i < exponentCosts.length; i++){
            var cost = exponentCosts[i]
            returnString += "<li><span class='" + this.costsResource[i] + "'>" + cost + "</span> " + this.costsResource[i] + "</li>";
        }

        returnString += "</ul>  <hr /><b>Produces:</b><ul>"
        for(var i = 0; i < this.producesResource.length; i++){
            returnString += "<li>" + this.producesAmount[i] + " " +  resources[this.producesResource[i]].getDisplayName() + "</li>";
        }
        returnString += "</ul></div>";

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

    Load(){
        this.amount = parseInt(localStorage.getItem("building_" + this.name + "_amount"));
    }

    Save(){
        localStorage.setItem("building_" + this.name + "_amount", this.amount);
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
            exponentArray.push(Math.ceil(this.costsAmount[i] * Math.pow(this.costExponent, this.amount + this.amountInQueue)));
        }
        return exponentArray;
    }

    setCostExponent(costExponent){
        this.costExponent = costExponent;
    }

    getBuildTime(){
        return this.buildTime;
    }

    setBuildTime(buildTime){
        this.buildTime = buildTime;
    }

    canBuild(){
        var exponentCosts = this.getExponentCosts();

        for(var i = 0; i < this.costsResource.length; i++){
            if(resources[this.costsResource[i]].getAmount() < exponentCosts[i]){
                console.log("can't build due to insufficient " + this.costsResource[i]);
                return false;
            }
        }

        return true;
    }

    enqueueBuilding(){
        var exponentCosts = this.getExponentCosts();

        if(this.canBuild()){
            for(var i = 0; i < this.costsResource.length; i++){
                resources[this.costsResource[i]].subtract(exponentCosts[i]); 
            }
            this.amountInQueue++;
        }
    }

    dequeueBuilding(){
        this.amountInQueue--;
        this.amount++;
    }

    produce(){
        var canDo = true;
        for(var i = 0; i < this.producesResource.length; i++){
            if(resources[this.producesResource[i]].amount + this.producesAmount[i] < 0){
                canDo = false;
            }
        }

        if(!canDo){
            return false;
        }

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
    CreateBuildingMines();
    CreateBuildingFoundries();
    CreateBuildingLeather();
    CreateBuildingSmiths();
    CreateBuildingHousing();
}

function CreateBuildingWoodcutter(){
    CreateBuildingWithCostsAndProduction(
        "Woodcutter",
        ["Logs"],
        [10],
        ["Logs"],
        [1]
    );

    CreateBuildingWithCostsAndProduction(
        "Sawmill",
        ["Logs", "Stone"],
        [1000,   500],
        ["Planks", "Logs"],
        [1,        -1]
    );
}

function CreateBuildingStonemason(){
    CreateBuildingWithCostsAndProduction(
        "Stonemason",
        ["Logs", "Stone"],
        [100,    100],
        ["Stone"],
        [1]
    );
}

function CreateBuildingFarm(){
    CreateBuildingWithCostsAndProduction(
        "Farm",
        ["Logs", "Food"],
        [100,    100],
        ["Food"],
        [1]
    );
}

function CreateBuildingMines(){
    CreateBuildingWithCostsAndProduction(
        "CopperMine",
        ["Logs", "Stone"],
        [250,    250],
        ["CopperOre"],
        [1]
    );

    CreateBuildingWithCostsAndProduction(
        "TinMine",
        ["Logs", "Stone"],
        [250,    250],
        ["TinOre"],
        [1]
    );

    CreateBuildingWithCostsAndProduction(
        "IronMine",
        ["Logs", "Stone", "BronzeIngot"],
        [2500,   2000,    100],
        ["IronOre"],
        [1]
    );
}

function CreateBuildingFoundries(){
    CreateBuildingWithCostsAndProduction(
        "CopperFoundry",
        ["Planks", "Stone"],
        [2500,     5000],
        ["CopperIngot", "CopperOre"],
        [1,             -10]
    );
    
    CreateBuildingWithCostsAndProduction(
        "TinFoundry",
        ["Planks", "Stone"],
        [7500,     15000],
        ["TinIngot", "TinOre"],
        [1,             -10]
    );
    
    CreateBuildingWithCostsAndProduction(
        "BronzeFoundry",
        ["Planks", "Stone"],
        [10000,    25000],
        ["BronzeIngot", "CopperIngot", "TinIngot"],
        [1,             -10,           -10]
    );
    
    CreateBuildingWithCostsAndProduction(
        "IronFoundry",
        ["Planks", "Stone", "BronzeIngot"],
        [25000,    50000,   100],
        ["IronIngot", "IronOre"],
        [1,             -10]
    );
}

function CreateBuildingLeather(){
    CreateBuildingWithCostsAndProduction(
        "HuntingCabin",
        ["Planks", "Stone"],
        [100,      250],
        ["Hides", "Food"],
        [1,      1]
    );
    
    CreateBuildingWithCostsAndProduction(
        "Tannery",
        ["Planks", "Stone"],
        [1000,     2500],
        ["Leather", "Hides"],
        [1,         -10]
    );
}

function CreateBuildingSmiths(){
    CreateBuildingWithCostsAndProduction(
        "BronzeWeaponSmith",
        ["Planks", "Stone", "BronzeIngot"],
        [25000,    50000,   100],
        ["BronzeWeapons", "BronzeIngot"],
        [1,               -10]
    );
    
    CreateBuildingWithCostsAndProduction(
        "IronWeaponSmith",
        ["Planks", "Stone", "IronIngot"],
        [100000,   200000,  100],
        ["IronWeapons", "IronIngot"],
        [1,             -10]
    );

    CreateBuildingWithCostsAndProduction(
        "LeatherArmourer",
        ["Planks", "Stone", "Leather"],
        [25000,    50000,   1000],
        ["LeatherArmour", "Leather"],
        [1,               -100]
    );

    CreateBuildingWithCostsAndProduction(
        "BronzeArmourer",
        ["Planks", "Stone", "BronzeIngot"],
        [100000,   200000,  1000],
        ["BronzeArmour", "BronzeIngot"],
        [1,              -100]
    );

    CreateBuildingWithCostsAndProduction(
        "IronArmourer",
        ["Planks", "Stone", "IronIngot"],
        [500000,   1000000, 1000],
        ["IronArmour", "IronIngot"],
        [1,            -100]
    );
}

function CreateBuildingHousing(){
    CreateBuildingWithCostsAndProduction(
        "Tent",
        ["Logs", "Hides"],
        ["100",  100],
        ["Peasant", "Food"],
        [1,         -1]
    );
}