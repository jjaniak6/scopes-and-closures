describe('global scope - scopes and closures', () => {
    test('should belong to the global scope', () => {
        // declare a variable MyNumber of type number, that should be available in the global scope (outside the MyMathLibrary object)
        // update the multiplyByTwo() method code to multiply the value of MyNumber by 2
        // make sure the MyMathLibrary.multiplyByTwo() method has been called

        let MyMathLibrary = {
            multiplyByTwo: (x) => {
                return x * 2;
            }
        }

        spyOnMultiplyByTwo = jest.spyOn(MyMathLibrary, "multiplyByTwo");
        let MyNumber = MyMathLibrary.multiplyByTwo(2.5);
        expect(MyNumber).toEqual(5);

        MyNumber = MyMathLibrary.multiplyByTwo(5); 
        expect(spyOnMultiplyByTwo).toHaveBeenCalled();
        expect(MyNumber).toEqual(10);
    })
})


describe('functional scope - scopes and closures', () => {
    test('should belong to the function scope', () => {
        // declare a variable MyNumber of type number (with an initial value of 9),
        // that should be available in the global scope (outside the MyMathLibrary object)
        // update the doMath() method code to make the MyNumber value equal 10 / hint: 
        //you just need to add one line of code.
        // make sure the MyMathLibrary.doMath() method has been called (with a proper parameter value)
        // make sure the addSix() and reduceFive() functions are NOT available in the global scope


        let MyMathLibrary = {
            doMath: function(arg) {
                MyNumber = addSix(arg); // WARNING: Do not modify this line!
                MyNumber = reduceFive(MyNumber);
                function addSix(arg) {
                    return arg + 6;
                };
                function reduceFive(arg) {
                    return arg - 5;
                }
            }
        };

        spyOnDoMath = jest.spyOn(MyMathLibrary, "doMath");

        // testing initial value
        var MyNumber = 9;
        expect(MyNumber).toEqual(9);

        MyMathLibrary.doMath(MyNumber);
        expect(spyOnDoMath).toHaveBeenCalled();

        // testing result value
    
        expect(MyNumber).toEqual(10);
        expect(typeof addSix).toEqual("undefined");
        expect(typeof reduceFive).toEqual("undefined");
    })

    test('should belong to the function scope - IIFE', () => {
        // declare a variable MyNumber of type number (with an initial value of 10), 
        // that should be available in the global scope (outside the MyMathLibrary object)
        // DO NOT modify the MyMathLibrary.doMath() method code
        // make sure the MyMathLibrary.doMath() method has NOT been called within the global scope
        // call the doSomeMoreMath() function but make sure it is not poluting the global scope (use IIFE)

        let MyMathLibrary = {
            doMath: function(arg) {
                MyNumber = addSix(arg);
            }
        }

        function addSix(arg) {
            return arg + 6;
        }

        var MyNumber = 10;
        
        (function doSomeMoreMath(){
            MyMathLibrary.doMath(MyNumber)
        })()

        spyOnDoMath = jest.spyOn(MyMathLibrary, "doMath");

        expect(spyOnDoMath).not.toHaveBeenCalled();

        // testing result value
        expect(MyNumber).toEqual(16);
        expect(typeof doSomeMoreMath).toEqual("undefined");

    })
})
