class BuildQueue{
    constructor(){
        this.queue = [];
        this.buildTicksRemain = 0;
    }

    enqueueBuilding(buildingName){
        if(buildings[buildingName] == null){
            console.log("Unknown buildingName: " + buildingName);
            return;
        }else{
            if(buildings[buildingName].canBuild()){
                this.queue.push(buildingName);
                buildings[buildingName].enqueueBuilding();
                this.buildTicksRemain = buildings[buildingName].getBuildTime();
            }
        }
    }

    tick(){
        if(this.queue.length > 0){
            if(this.buildTicksRemain != 0){
                this.buildTicksRemain--;
            }else{
                var building = this.queue.shift();
                buildings[building].dequeueBuilding();
                if(this.queue.length > 0){
                    var peek = this.queue.shift();
                    this.buildTicksRemain = buildings[peek].getBuildTime();
                    this.queue.unshift(peek);
                }
            }
        }
    }

    frame(){
        var viewString = "";

        this.queue.forEach(element => {
            viewString += "<li>" + element + "</li>";
        });

        $("#buildingQueueList").html(viewString);
    }
}