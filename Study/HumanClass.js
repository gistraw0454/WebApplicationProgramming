class Human{
    constructor(type = 'human'){this.type = type;}
    static isHuman(human){
        return human instanceof Human;
    }
    breathe(){
        alert('h-a-a-a-m');
    }
}

class Zero extends Human{
    constructor(type, firstname, lastname){
        super(type);
        this.firstname = firstname;
        this.lastname = lastname;
    }

    sayName(){
        super.breathe();
        alert(`${this.firstname} ${this.lastname}`);
    }
}

const newZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(newZero);