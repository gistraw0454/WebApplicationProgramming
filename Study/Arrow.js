var rel1 = {
    name: 'zero',
    friend: ['nero','hero','xero'],
    logFriend: function(){
        var that= this;
        this.friend.forEach(function(friend){
            console.log(that.name,friend);
        });
    },
};
rel1.logFriend();

var rel2 = {
    name: 'zero',
    friend: ['nero','hero','xero'],
    logFriend(){
        this.friend.forEach(friend=>{
            console.log(this.name,friend);
        });
    },
};
rel2.logFriend();