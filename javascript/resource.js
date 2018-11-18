class Resource{
    constructor(tempName, category){
        this.name = tempName;
        this.displayName = "";
        this.category = category;
        this.amount = 0;
    }

    setDisplayName(displayName){
        this.displayName = displayName;
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
        $("#" + this.name).children(".perSecond").text(this.getPerSecond());
    }

    getViewString(){
        var userIsDoingClass = "";
        if(userResource == this.name){
            userIsDoingClass += "userDoing";
        }

        var onClickWritten = "";

        if(this.category == "raw"){
            userIsDoingClass += " userCanDo";
            onClickWritten = "onclick=\"setUserResource('" + this.name + "')\"";
        }else{
            userIsDoingClass += " userCantDo";
        }

        var viewString = "<li id='" + this.name + "'>";
        viewString += "<span class='amount'>" + this.amount + "</span>"
        viewString += " (<span class='perSecond'>" + this.getPerSecond() + "</span>/s) " + this.getDisplayName();
        viewString += " <span class='" + userIsDoingClass + "' " + onClickWritten + ">&nbsp;</span>";
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
};

function CreateResources(){
    CreateResource("Wood", "raw");
    CreateResource("Stone", "raw");
    CreateResource("Food", "raw");
    CreateResource("CopperOre", "raw").setDisplayName("Copper Ore");
    CreateResource("TinOre", "raw").setDisplayName("Tin Ore");
    CreateResource("IronOre", "raw").setDisplayName("Iron Ore");
    CreateResource("Hides", "raw");

    CreateResource("Planks", "intermediate");
    CreateResource("CopperIngot", "intermediate").setDisplayName("Copper Ingot");
    CreateResource("TinIngot", "intermediate").setDisplayName("Tin Ingot");
    CreateResource("BronzeIngot", "intermediate").setDisplayName("Bronze Ingot");
    CreateResource("IronIngot", "intermediate").setDisplayName("Iron Ingot");
    CreateResource("Leather", "intermediate");

    CreateResource("CopperWeapons", "tools").setDisplayName("Copper Weapons");
    CreateResource("LeatherArmour", "tools").setDisplayName("Leather Armour");
    CreateResource("CopperArmour", "tools").setDisplayName("Copper Armour");
    CreateResource("IronArmour", "tools").setDisplayName("Iron Armour");
}

function CreateResource(name, category){
    resources[name] = new Resource(name, category);
    return resources[name];
}