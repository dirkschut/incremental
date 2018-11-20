class Resource{
    constructor(tempName, category){
        this.name = tempName;
        this.displayName = "";
        this.category = category;
        this.amount = 0;
        this.image = "";
    }

    setDisplayName(displayName){
        this.displayName = displayName;
        return this;
    }

    setImage(image){
        this.image = image;
        return this;
    }

    getDisplayName(){
        if(this.displayName == ""){
            return this.name;
        }
        return this.displayName;
    }

    getAmount(){
        return this.amount;
    }

    getName(){
        return this.name;
    }

    getCategory(){
        return this.category;
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

    updateView(){
        $("#" + this.name).children(".amount").text(this.amount);
        $("#" + this.name).children(".perSecond").text(this.getPerSecond() + "/s");
    }

    getViewString(){
        var userIsDoingClass = "userGatherButton ";
        var balance = "neutral";
        if(userResource == this.name){
            userIsDoingClass += "userDoing";
        }

        if(this.getPerSecond() > 0){
            balance = "positive";
        }else if(this.getPerSecond() < 0){
            balance = "negative";
        }

        var onClickWritten = "";

        if(this.category == "raw"){
            userIsDoingClass += " userCanDo";
            onClickWritten = "onclick=\"setUserResource('" + this.name + "')\"";
        }else{
            userIsDoingClass += " userCantDo";
        }

        var viewString = "<li id='" + this.name + "' class='resourceSquare " + userIsDoingClass + "' " + onClickWritten + ">";
        viewString += "<img class='resourcePicture' src='" + this.image + "'/>";
        viewString += " <span class='perSecond " + balance + "'>" + this.getPerSecond() + "/s</span> ";
        viewString += "<span class='amount'>" + this.amount + "</span>";
        viewString += "<div class='tooltip'>" + this.name + "<br />There will be more info here later.</div>";
        //viewString += " <button class='" + userIsDoingClass + "' " + onClickWritten + ">&nbsp;</button>";
        viewString += "</li>";
        return viewString;
    }

    getPerSecond(){
        var total = 0;

        Object.values(buildings).forEach(element => {
            total += element.getResourceAmount(this.name);
        });

        if(userResource == this.name){
            total++;
        }

        return total;
    }

    Load(){
        this.amount = parseInt(localStorage.getItem("resource_" + this.name + "_amount"));
    }

    Save(){
        localStorage.setItem("resource_" + this.name + "_amount", this.amount);
    }
};

function CreateResources(){
    CreateResource("Logs",  "raw").setImage(                                 "img/logs.png");
    CreateResource("Stone", "raw").setImage(                                 "img/stone.png");
    CreateResource("Food",  "raw").setImage(                                 "img/food.png");
    CreateResource("CopperOre", "raw").setDisplayName("Copper Ore").setImage("img/copperOre.png");
    CreateResource("TinOre", "raw").setDisplayName("Tin Ore").setImage(      "img/tinOre.png");
    CreateResource("IronOre", "raw").setDisplayName("Iron Ore").setImage(    "img/ironOre.png");
    CreateResource("Hides", "raw").setImage(                                 "img/hides.png");

    CreateResource("Planks", "intermediate").setImage(                       "img/planks.png");
    CreateResource("CopperIngot", "intermediate").setDisplayName("Copper Ingot");
    CreateResource("TinIngot", "intermediate").setDisplayName("Tin Ingot");
    CreateResource("BronzeIngot", "intermediate").setDisplayName("Bronze Ingot");
    CreateResource("IronIngot", "intermediate").setDisplayName("Iron Ingot");
    CreateResource("Leather", "intermediate");

    CreateResource("BronzeWeapons", "tools").setDisplayName("Bronze Weapons");
    CreateResource("IronWeapons", "tools").setDisplayName("Iron Weapons");
    
    CreateResource("LeatherArmour", "tools").setDisplayName("Leather Armour");
    CreateResource("BronzeArmour", "tools").setDisplayName("Bronze Armour");
    CreateResource("IronArmour", "tools").setDisplayName("Iron Armour");

    CreateResource("Peasant", "pop");
    CreateResource("Worker", "pop");
    CreateResource("Soldier", "pop");
}

function CreateResource(name, category){
    resources[name] = new Resource(name, category);
    return resources[name];
}