class Resource{
    constructor(tempName, category){
        this.name = tempName;
        this.category = category;
        this.amount = 0;
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
        viewString += " (<span class='perSecond'>" + this.getPerSecond() + "</span>/s) " + this.name;
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
    CreateResource("CopperOre", "raw");
    CreateResource("TinOre", "raw");
    CreateResource("IronOre", "raw");
    CreateResource("Hides", "raw");

    CreateResource("Planks", "intermediate");
    CreateResource("CopperIngot", "intermediate");
    CreateResource("TinIngot", "intermediate");
    CreateResource("BronzeIngot", "intermediate");
    CreateResource("IronIngot", "intermediate");
    CreateResource("Leather", "intermediate");

    CreateResource("CopperWeapons", "tools");
    CreateResource("LeatherArmour", "tools");
    CreateResource("CopperArmour", "tools");
    CreateResource("IronArmour", "tools");
}

function CreateResource(name, category){
    resources[name] = new Resource(name, category);
}