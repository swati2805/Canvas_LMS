


@startuml

// Abstract Class giving basic specification for how a Gumball Machine should look and behave.
abstract class GumballMachineBase {

    abstract void insertCash(int coin);
   abstract boolean hasEnoughMoneyForOneBall();
    abstract void turnCrank();
    abstract boolean denominationCheck(int insertedCoin);

}


// GumballMachine class has parameters for number of gumballs i.e. num_gumballs and cost per gumball
// i.e. costPerGumball in the below code.
//Functions for checking acceptable coin denominations(denominationCheck()), inserting cash(insertCash())
// and for checking if required money was inserted (hasEnoughMoneyForOneBall())
//for a gumball are written in a generic way so that two of the variation of GumballMachine i.e. variation_1 i.e.
// GumballMachine_1 for inserting a quarter(25 cents) per gumball and variation_2 i.e. GumballMachine_2 for inserting
// fifty cents(2 quarters)
// use the same class GumballMachine- just instantiated with different values of the parameter i.e. costPerGumball.
class GumballMachine extends GumballMachineBase
{

    private int num_gumballs;
    private int totalMoneyInserted;
    private int costPerGumball;

    //Constructor for initializing base parameters.
    public GumballMachine( int size, int costPerGumball )
    {
        // initialise instance variables
        this.num_gumballs = size;
        this.totalMoneyInserted = 0;
        this.costPerGumball = costPerGumball;
    }

    //Will check the required denominations of coins inserted in gumball machine
    boolean denominationCheck( int insertedCoin){
        if(insertedCoin == 25) {
            return true;
        }
        else {
            return false;
        }
    }

    //Will take coin insertion in the machine.
    //Also checks for correct denomination.
    //If correct denomination, function increments the total money inserted so far
    public void insertCash(int coin)
    {
        System.out.println("Money Inserted: "+coin);
        if (denominationCheck(coin)) {
            this.totalMoneyInserted += coin;
            if (!hasEnoughMoneyForOneBall()) {
                System.out.println("Insert More Cash");
                System.out.println("Total money inserted so far: "+this.totalMoneyInserted);
            }
        } else {
            System.out.println("Incorrect Denomination of inserted coin. Sorry can't return the money.");
        }
    }

    //Will check if the inserted cash has apt amount of money to purchase a gumball in the specific machine.
    public boolean hasEnoughMoneyForOneBall()
    {
        return (this.totalMoneyInserted >= this.costPerGumball);
    }

    //If there is "true" value for hasEnoughMoneyForOneBall then turn the crank to eject Gumball.
    public void turnCrank()
    {
        if ( hasEnoughMoneyForOneBall() )
        {
            if ( this.num_gumballs > 0 )
            {
                this.num_gumballs-- ;
                this.totalMoneyInserted -= this.costPerGumball;
                System.out.println( "Thanks for your purchase. Gumball Ejected!" ) ;
                System.out.println( "Total Credit Remaining: " + this.totalMoneyInserted);
            }
            else
            {
                System.out.println( "No More Gumballs!  Sorry, can't return your money." ) ;
            }
        }
        else
        {
            System.out.println( "Not enough money for a Gumball. Please insert more cash" ) ;
        }
    }
}

//GumballMachine_3 extends from GumballMachine class and overrides it's function denominationCheck()
//because it can accept various denominations like nickel, dime and quarter adding up to 50 Cents for each gumball.
//This(denominationCheck()) is the only different function in this machine - rest of the functions are generic and can e reused from parent
//Gumball machine class.
class GumballMachine_3 extends GumballMachine {

    public GumballMachine_3(int size, int costPerGumball) {
        super(size, costPerGumball);
    }

    boolean denominationCheck(int insertedCoin) {
        if ((insertedCoin == 25) || (insertedCoin == 10) || (insertedCoin == 5)) {
            return true;
        } else {
            return false;
        }
    }
}

//GumballMachine_4 is a variation of GumballMachine3 and extends it - it only takes $1 note as acceptable denomination - doesn't
// accepts anything else. Cost per Gumball in this machine is $5.
class GumballMachine_4 extends GumballMachine_3 {

    public GumballMachine_4(int size, int costPerGumball) {
        super(size, costPerGumball);
    }

    boolean denominationCheck(int insertedCoin) {
        if ((insertedCoin == 100)) {
            return true;
        } else {
            System.out.println("Can't accept less than $1 (100 cents)");
            return false;
        }
    }

}


@enduml


//Testing all the four variations of gumball machine designed.
public class GumBallProblem {
    public static void main(String args[]){

        //This is Gumball Machine 1 which accepts quarters only and cost per gumball is 1 quarter.
        GumballMachine gm1 = new GumballMachine(1, 25);

        //This is Gumball Machine 2 which accepts quarter only and cost per gumball is 2 quarters or 50 cents.
        GumballMachine gm2 = new GumballMachine(10, 50);

        //This is Gumball Machine 3 which accepts three denominations i.e. nickel, dime and quarters only and
        // cost per gumball is 50 cents.
        GumballMachine_3 gm3 = new GumballMachine_3(10, 50);

        //This is Gumball Machine 4 which accepts 1 dollar bill only and cost per gumball is 5 dollars.
        GumballMachine_4 gm4 = new GumballMachine_4(10, 500);

        //Testing gm1
        System.out.println("Testing Gumball Machine 1.\n");
        gm1.insertCash(25);
        gm1.turnCrank();
        gm1.insertCash(5);
        gm1.turnCrank();
        gm1.insertCash(25);
        gm1.turnCrank();

        //Testing gm2
        System.out.println("\nTesting Gumball Machine 2.\n");
        gm2.insertCash(25);
        gm2.insertCash(25);
        gm2.turnCrank();
        gm2.insertCash(50);
        gm2.turnCrank();


        //Testing gm3
        System.out.println("\nTesting Gumball Machine 3.\n");
        gm3.insertCash(25);
        gm3.insertCash(10);
        gm3.insertCash(10);
        gm3.insertCash(5);
        gm3.turnCrank();
        gm3.insertCash(1);
        gm1.turnCrank();

        //Testing gm4
        System.out.println("\nTesting Gumball Machine 4.\n");
        gm4.insertCash(25);
        gm4.turnCrank();
        gm4.insertCash(100);
        gm4.insertCash(100);
        gm4.insertCash(100);
        gm4.insertCash(100);
        gm4.insertCash(100);
        gm4.turnCrank();



    }
}
