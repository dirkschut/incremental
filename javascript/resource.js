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

    updateView(){
        $("#" + this.name).children(".amount").text(this.amount);
        $("#" + this.name).children(".perSecond").text(this.getPerSecond());
    }

    getViewString(){
        var userIsDoingClass = "";
        if(userResource == this.name){
            userIsDoingClass = "userDoing";
        }

        var viewString = "<li id='" + this.name + "'>";
        viewString += "<span class='amount'>" + this.amount + "</span>"
        viewString += " (<span class='perSecond'>" + this.getPerSecond() + "</span>/s) " + this.name;
        viewString += " <span class='UserCanDo " + userIsDoingClass + "' onclick=\"setUserResource('" + this.name + "')\">&nbsp;</span>";
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
    CreateResource("Wood");
    CreateResource("Stone");
    CreateResource("Food");
    CreateResource("CopperOre");
    CreateResource("TinOre");
    CreateResource("IronOre");
    CreateResource("Hides");


    CreateResource("Planks");
    CreateResource("CopperIngot");
    CreateResource("TinIngot");
    CreateResource("BronzeIngot");
    CreateResource("IronIngot");
    CreateResource("Leather");

    CreateResource("CopperWeapons");
    CreateResource("LeatherArmour");
    CreateResource("CopperArmour");
    CreateResource("IronArmour");
}

function CreateResource(name){
    resources[name] = new Resource(name);
}