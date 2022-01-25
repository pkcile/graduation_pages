const target = { 
    foo: 'bar',
    too: "test"
};

const handler = {
    get(trapTarget, property, receiver) { 
        console.log(trapTarget === target); 
        console.log(property); 
        console.log(receiver === proxy); 
        console.log(trapTarget, receiver);
    } 
}; 
const proxy = new Proxy(target, handler);
console.log(proxy.foo)